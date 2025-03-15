import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeFileName, VIDEO_ALLOWED_TYPES, MAX_VIDEO_SIZE } from "@/utils/videoUtils";

interface AnalysisResult {
  overall_score: number;
  efficiency_score: number;
  technical_score: number;
  safety_score: number;
  analysis_feedback: {
    general: string;
    strengths: string[];
    improvements: string[];
  };
  resumoGeral: string;
}

async function parseAnalysisResponse(text: string): Promise<AnalysisResult> {
  const lines = text.split('\n');
  const scores = {
    overall: 0,
    efficiency: 0,
    technical: 0,
    safety: 0
  };
  
  let strengths: string[] = [];
  let improvements: string[] = [];
  let general = '';
  let resumo = '';

  for (const line of lines) {
    if (line.includes('Pontuação Geral:')) {
      scores.overall = parseFloat(line.split(':')[1]) || 0;
    } else if (line.includes('Eficiência:')) {
      scores.efficiency = parseFloat(line.split(':')[1]) || 0;
    } else if (line.includes('Técnica:')) {
      scores.technical = parseFloat(line.split(':')[1]) || 0;
    } else if (line.includes('Segurança:')) {
      scores.safety = parseFloat(line.split(':')[1]) || 0;
    } else if (line.includes('Ponto Forte:')) {
      strengths.push(line.split(':')[1].trim());
    } else if (line.includes('Melhoria:')) {
      improvements.push(line.split(':')[1].trim());
    } else if (line.includes('Feedback Geral:')) {
      general = line.split(':')[1].trim();
    } else if (!line.includes(':')) {
      resumo += line + '\n';
    }
  }

  return {
    overall_score: scores.overall,
    efficiency_score: scores.efficiency,
    technical_score: scores.technical,
    safety_score: scores.safety,
    analysis_feedback: {
      general: general || 'Análise concluída com sucesso',
      strengths: strengths.length > 0 ? strengths : ['Procedimento realizado'],
      improvements: improvements
    },
    resumoGeral: resumo.trim()
  };
}

async function uploadVideoApiFile(file: File, apiKey: string): Promise<string | null> {
  try {
    console.log("Iniciando upload para API File...");
    
    // 1. Iniciar upload resumível
    const responseStart = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/upload/v1beta/files?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          "X-Goog-Upload-Protocol": "resumable",
          "X-Goog-Upload-Command": "start",
          "X-Goog-Upload-Header-Content-Length": file.size.toString(),
          "X-Goog-Upload-Header-Content-Type": file.type,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          file: { 
            display_name: file.name,
            mime_type: file.type
          }
        })
      }
    );

    console.log("Resposta do início do upload:", responseStart);

    if (!responseStart.ok) {
      const errorText = await responseStart.text();
      console.error("Erro no início do upload:", errorText);
      throw new Error(`Falha ao iniciar upload: ${errorText}`);
    }

    const uploadUrl = responseStart.headers.get("x-goog-upload-url");
    if (!uploadUrl) {
      throw new Error("URL de upload não recebida");
    }

    console.log("URL de upload obtida:", uploadUrl);

    // 2. Upload do arquivo
    const responseUpload = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        "Content-Type": file.type,
        "Content-Length": file.size.toString(),
        "X-Goog-Upload-Offset": "0",
        "X-Goog-Upload-Command": "upload, finalize"
      },
      body: await file.arrayBuffer()
    });

    console.log("Resposta do upload:", responseUpload);

    if (!responseUpload.ok) {
      const errorText = await responseUpload.text();
      console.error("Erro no upload:", errorText);
      throw new Error(`Falha no upload do arquivo: ${errorText}`);
    }

    const fileInfo = await responseUpload.json();
    console.log("Informações do arquivo:", fileInfo);

    const fileUri = fileInfo?.file?.uri;
    const fileName = fileInfo?.file?.name;

    if (!fileUri || !fileName) {
      throw new Error("URI ou nome do arquivo não recebidos");
    }

    // 3. Verificar status do arquivo
    let attempts = 0;
    const maxAttempts = 12; // 1 minuto (5s * 12)
    let fileState = "PROCESSING";

    while (attempts < maxAttempts && fileState === "PROCESSING") {
      console.log(`Verificando estado do arquivo, tentativa ${attempts + 1}...`);
      
      const checkResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/files/${fileName}?key=${apiKey}`
      );
      
      if (!checkResponse.ok) {
        const errorText = await checkResponse.text();
        console.error("Erro ao verificar status:", errorText);
        throw new Error(`Falha ao verificar status do arquivo: ${errorText}`);
      }

      const checkInfo = await checkResponse.json();
      console.log("Status do arquivo:", checkInfo.state);
      fileState = checkInfo.state;

      if (fileState === "ACTIVE") {
        return fileUri;
      }
      
      if (fileState === "FAILED") {
        throw new Error("Processamento do arquivo falhou");
      }

      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    }

    throw new Error("Timeout aguardando processamento do arquivo");

  } catch (error) {
    console.error("Erro no upload para API File:", error);
    throw error;
  }
}

async function analyzeVideoGeminiApi(fileUri: string, apiKey: string, checklistItems: any[]): Promise<string> {
  const modelName = "gemini-1.5-pro";
  console.log("Iniciando análise com Gemini...");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: `Analise este vídeo seguindo o checklist abaixo:
                ${checklistItems.map(item => `${item.order_index}. ${item.description}`).join('\n')}
                
                Forneça uma análise estruturada com:
                1. Pontuação Geral: (0-10)
                2. Eficiência: (0-10)
                3. Técnica: (0-10)
                4. Segurança: (0-10)
                
                Feedback Geral:
                Pontos Fortes:
                Melhorias Necessárias:
                
                Por fim, um resumo detalhado.`
              },
              {
                fileData: {
                  mimeType: "video/mp4",
                  fileUri
                }
              }
            ]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 32,
            topP: 0.8,
            maxOutputTokens: 8192
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_ONLY_HIGH"
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na análise: ${await response.text()}`);
    }

    const result = await response.json();
    console.log("Resposta da análise:", result);

    let analysisText = "";
    if (result.candidates?.[0]?.content?.parts) {
      for (const part of result.candidates[0].content.parts) {
        if (part.text) {
          analysisText += part.text + "\n";
        }
      }
    }

    if (!analysisText) {
      throw new Error("Resposta da análise vazia");
    }

    return analysisText.trim();
  } catch (error) {
    console.error("Erro na análise Gemini:", error);
    throw error;
  }
}

export function useVideoUpload(userId: string, onUploadComplete: () => void) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedChecklist, setSelectedChecklist] = useState<string>("");
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_VIDEO_SIZE) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 2GB"
      });
      return;
    }

    if (!VIDEO_ALLOWED_TYPES.includes(file.type as any)) {
      toast({
        variant: "destructive",
        title: "Formato não suportado",
        description: "Por favor, use um dos formatos: MP4, MPEG, MOV, AVI, FLV, MPG, WEBM, WMV, 3GPP"
      });
      return;
    }

    setSelectedFile(file);
    setVideoUrl(URL.createObjectURL(file));
  };

  const handleAnalysis = async () => {
    if (!selectedFile || !userId) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Selecione um vídeo e faça login"
      });
      return;
    }

    if (!selectedChecklist) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Selecione um checklist"
      });
      return;
    }

    setIsAnalyzing(true);
    setIsUploading(true);
    setUploadProgress(10);

    try {
      // 1. Obter API key
      const { data: settings, error: settingsError } = await supabase
        .from('settings')
        .select()
        .eq('key', 'GEMINI_API_KEY')
        .single();

      if (settingsError || !settings) {
        throw new Error('API key não encontrada');
      }

      setUploadProgress(20);

      // 2. Upload para API File
      console.log("Iniciando upload para API File...");
      const fileUri = await uploadVideoApiFile(selectedFile, settings.value);
      if (!fileUri) {
        throw new Error('Falha no upload do vídeo');
      }
      
      setUploadProgress(50);

      // 3. Buscar dados do checklist
      const { data: checklist, error: checklistError } = await supabase
        .from('checklist_templates')
        .select('*, checklist_items(*)')
        .eq('id', selectedChecklist)
        .single();

      if (checklistError || !checklist) {
        throw new Error('Erro ao buscar checklist');
      }

      setUploadProgress(70);

      // 4. Analisar com Gemini
      const analysisText = await analyzeVideoGeminiApi(
        fileUri,
        settings.value,
        checklist.checklist_items
      );

      setUploadProgress(90);

      // 5. Salvar resultado
      const { error: saveError } = await supabase
        .from('video_analyses')
        .insert({
          user_id: userId,
          video_uri: fileUri,
          status: 'completed',
          analysis_result: analysisText,
          procedure_name: checklist.name
        });

      if (saveError) {
        throw saveError;
      }

      setUploadProgress(100);
      toast({
        title: "Sucesso",
        description: "Análise concluída!"
      });

      onUploadComplete();

    } catch (error) {
      console.error('Erro:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao processar vídeo"
      });
    } finally {
      setIsAnalyzing(false);
      setIsUploading(false);
      setUploadProgress(0);
      setSelectedFile(null);
      setVideoUrl(null);
      setSelectedChecklist("");
    }
  };

  return {
    selectedFile,
    isAnalyzing,
    isUploading,
    uploadProgress,
    videoUrl,
    selectedChecklist,
    setSelectedChecklist,
    handleFileSelect,
    handleAnalysis
  };
}
