import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
  let scores = {
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

async function uploadVideoApiFile(videoFile: File, apiKey: string): Promise<string | null> {
  const baseUrl = "https://generativelanguage.googleapis.com/v1beta";
  
  try {
    const headersStart = {
      "X-Goog-Upload-Protocol": "resumable",
      "X-Goog-Upload-Command": "start",
      "X-Goog-Upload-Header-Content-Length": videoFile.size.toString(),
      "X-Goog-Upload-Header-Content-Type": videoFile.type,
      "Content-Type": "application/json"
    };
    
    const dataStart = JSON.stringify({
      file: { display_name: videoFile.name }
    });

    console.log("Iniciando upload resumível...");
    const responseStart = await fetch(
      `${baseUrl}/upload/v1beta/files?key=${apiKey}`,
      {
        method: 'POST',
        headers: headersStart,
        body: dataStart
      }
    );

    if (!responseStart.ok) {
      throw new Error(`Falha no início do upload: ${await responseStart.text()}`);
    }

    const uploadUrl = responseStart.headers.get("x-goog-upload-url");
    if (!uploadUrl) {
      throw new Error("URL de upload não recebida");
    }

    const headersUpload = {
      "Content-Length": videoFile.size.toString(),
      "X-Goog-Upload-Offset": "0",
      "X-Goog-Upload-Command": "upload, finalize"
    };

    console.log("Enviando bytes do vídeo...");
    const responseUpload = await fetch(uploadUrl, {
      method: 'PUT',
      headers: headersUpload,
      body: await videoFile.arrayBuffer()
    });

    if (!responseUpload.ok) {
      throw new Error(`Falha no upload do vídeo: ${await responseUpload.text()}`);
    }

    const fileInfo = await responseUpload.json();
    const fileUri = fileInfo?.file?.uri;
    const fileName = fileInfo?.file?.name;

    if (!fileUri || !fileName) {
      throw new Error("Informações do arquivo não recebidas");
    }

    console.log(`Vídeo enviado com sucesso! File URI: ${fileUri}`);

    let maxAttempts = 12; // 1 minuto (5s * 12)
    while (maxAttempts > 0) {
      const responseGetFile = await fetch(
        `${baseUrl}/files/${fileName}?key=${apiKey}`
      );
      
      if (!responseGetFile.ok) {
        throw new Error(`Falha ao verificar status: ${await responseGetFile.text()}`);
      }

      const fileInfoCheck = await responseGetFile.json();
      const state = fileInfoCheck?.state;

      if (state === "ACTIVE") {
        console.log("Vídeo pronto para análise.");
        return fileUri;
      } else if (state === "FAILED") {
        throw new Error("Processamento do vídeo falhou");
      }

      console.log(`Vídeo em processamento. Status: ${state}. Aguardando...`);
      await new Promise(resolve => setTimeout(resolve, 5000)); // 5 segundos
      maxAttempts--;
    }

    throw new Error("Timeout aguardando processamento do vídeo");

  } catch (error) {
    console.error("Erro no upload do vídeo:", error);
    return null;
  }
}

async function analyzeVideoGeminiApi(
  fileUri: string, 
  apiKey: string, 
  checklistItems: any[]
): Promise<string> {
  const modelName = "gemini-1.5-pro";
  const prompt = `
Analise este vídeo seguindo o checklist abaixo. 
Forneça uma análise estruturada com os seguintes elementos:

1. Pontuação Geral: (0-10)
2. Eficiência: (0-10)
3. Técnica: (0-10)
4. Segurança: (0-10)

Feedback Geral: Forneça um resumo geral da performance

Pontos Fortes:
- Liste os principais pontos positivos observados

Melhorias Necessárias:
- Liste as áreas que precisam de melhorias

Por fim, forneça um resumo detalhado da execução.

Checklist para avaliação:
${checklistItems.map(item => `${item.order_index}. ${item.description}`).join('\n')}
`;

  try {
    console.log("Iniciando análise do vídeo...");
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { fileData: { mimeType: "video/mp4", fileUri } }
            ]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 32,
            topP: 0.8,
            maxOutputTokens: 8192,
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
      throw new Error(`Falha na análise: ${await response.text()}`);
    }

    const responseJson = await response.json();
    let analysisText = "";

    if (responseJson.candidates) {
      for (const candidate of responseJson.candidates) {
        if (candidate.content?.parts) {
          for (const part of candidate.content.parts) {
            if (part.text) {
              analysisText += part.text + "\n";
            }
          }
        }
      }
    }

    return analysisText.trim();

  } catch (error) {
    console.error("Erro na análise do vídeo:", error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const videoFile = formData.get('file') as File;
    const videoId = formData.get('videoId');
    const checklistDataRaw = formData.get('checklistData');

    if (!videoFile || !videoId || !checklistDataRaw) {
      throw new Error('Missing required fields');
    }

    let checklistData;
    try {
      checklistData = JSON.parse(checklistDataRaw.toString());
      console.log('Debug - Checklist data parsed successfully');
    } catch (parseError) {
      console.error('Debug - Checklist parse error:', parseError);
      throw new Error('Failed to parse checklist data');
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não está configurada');
    }

    const fileUri = await uploadVideoApiFile(videoFile, apiKey);
    if (!fileUri) {
      throw new Error('Falha no upload do vídeo');
    }

    const analysisText = await analyzeVideoGeminiApi(
      fileUri, 
      apiKey, 
      checklistData.checklist_items
    );

    const analysisResult = await parseAnalysisResponse(analysisText);

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: updateError } = await supabaseAdmin
      .from('video_analyses')
      .insert({
        video_id: videoId,
        status: 'completed',
        analysis_result: analysisText,
        checklist_data: checklistData,
        completed_at: new Date().toISOString(),
        overall_score: analysisResult.overall_score,
        efficiency_score: analysisResult.efficiency_score,
        technical_score: analysisResult.technical_score,
        safety_score: analysisResult.safety_score,
        analysis_feedback: analysisResult.analysis_feedback
      });

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Análise concluída com sucesso',
        result: analysisResult
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Debug - Fatal error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : undefined,
        details: error instanceof Error ? error.cause : undefined
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
