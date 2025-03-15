import { useState, useEffect } from 'react';
import { VideoAnalysisMarker } from '@/types/avaliacao';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AnalysisScores {
  technique: number;
  safety: number;
  efficiency: number;
  overall: number;
}

interface AnalysisResult {
  markers: VideoAnalysisMarker[];
  scores: AnalysisScores;
  feedback: string;
}

export const useVideoAnalysis = (videoUrl: string, checklistType: string) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const analyzeVideo = async () => {
      try {
        setLoading(true);
        console.log('Iniciando análise do vídeo:', videoUrl);
        
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('Usuário não autenticado');
        }

        const { data, error } = await supabase.functions.invoke('analyze-video', {
          body: {
            video_uri: videoUrl,
            student_id: user.id,
            user_id: user.id,
            checklist: [{ description: checklistType, procedure_name: checklistType }],
            prompt: `Você é LACia, Avaliadora de Competências Médicas da UCPel.
            Analise este vídeo do procedimento ${checklistType}.
            
            Forneça:
            1. Marcadores de momentos importantes com:
               - Timestamp
               - Tipo (technique/safety/efficiency/critical)
               - Descrição detalhada
               - Score (0-1)
            
            2. Avaliação geral com scores (0-10):
               - Técnica
               - Segurança
               - Eficiência
               - Score geral
            
            3. Feedback detalhado usando a técnica do diamante:
               - Pontos positivos
               - Áreas de melhoria
               - Recomendações específicas
               - Reflexões para o estudante`
          }
        });

        if (error) {
          console.error('Erro na análise:', error);
          throw error;
        }

        if (!data) {
          throw new Error('Nenhum dado retornado da análise');
        }

        console.log('Resposta da análise:', data);

        // Processar resposta do Gemini
        const result: AnalysisResult = {
          markers: data.markers?.map((m: any) => ({
            id: crypto.randomUUID(),
            timestamp: m.timestamp,
            type: m.type as VideoAnalysisMarker['type'],
            description: m.description,
            score: m.score
          })) ?? [],
          scores: {
            technique: data.scores?.technique ?? 0,
            safety: data.scores?.safety ?? 0,
            efficiency: data.scores?.efficiency ?? 0,
            overall: data.scores?.overall ?? 0
          },
          feedback: data.feedback ?? 'Análise não disponível'
        };

        setAnalysis(result);
        
        toast({
          title: 'Análise concluída',
          description: 'O vídeo foi analisado com sucesso.',
        });
      } catch (error) {
        console.error('Erro na análise do vídeo:', error);
        toast({
          title: 'Erro na análise',
          description: 'Não foi possível analisar o vídeo.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    if (videoUrl) {
      analyzeVideo();
    }
  }, [videoUrl, checklistType, toast]);

  return { analysis, loading };
};
