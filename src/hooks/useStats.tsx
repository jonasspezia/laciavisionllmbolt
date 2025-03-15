import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/supabase';

interface Stats {
  totalVideos: number;
  pendingAnalyses: number;
  completedAnalyses: number;
  averageScore?: number;
}

export const useStats = (profile: Profile | null) => {
  const [stats, setStats] = useState<Stats>({
    totalVideos: 0,
    pendingAnalyses: 0,
    completedAnalyses: 0,
    averageScore: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        if (!profile?.id) return;

        // 1. Primeiro buscar os vídeos do usuário
        const { data: videos } = await supabase
          .from('video_uploads')
          .select('*')
          .eq('user_id', profile.id);

        const videoData = videos || [];
        
        // 2. Depois buscar análises relacionadas a estes vídeos
        const videoIds = videoData.map(v => v.id);
        
        const { data: analyses } = await supabase
          .from('video_analyses')
          .select('*')
          .in('video_id', videoIds);

        const analysisData = analyses || [];

        // Calcular estatísticas
        const totalVideos = videoData.length;
        const pendingAnalyses = videoData.filter(v => v.status === 'processing').length;
        const completedAnalyses = analysisData.filter(a => a.status === 'completed').length;

        // Calcular média dos scores válidos
        const validScores = analysisData
          .filter(a => a.status === 'completed' && typeof a.overall_score === 'number')
          .map(a => a.overall_score)
          .filter((score): score is number => score !== null);
        
        const averageScore = validScores.length > 0 ? 
          validScores.reduce((a, b) => a + b, 0) / validScores.length : 
          0;

        setStats({
          totalVideos,
          pendingAnalyses,
          completedAnalyses,
          averageScore
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
  }, [profile]);

  return stats;
};
