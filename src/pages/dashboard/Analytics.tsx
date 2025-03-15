import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, Calendar, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Analysis {
  id: string;
  created_at: string;
  overall_score: number | null;
  technical_score: number | null;
  safety_score: number | null;
  efficiency_score: number | null;
  status: string;
}

export default function Analytics() {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalyses = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('video_analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading analyses:', error);
        return;
      }

      setAnalyses(data || []);
      setLoading(false);
    };

    loadAnalyses();
  }, [user]);

  // Calcular métricas
  const completedAnalyses = analyses.filter(a => a.status === 'completed');
  const totalAnalyses = completedAnalyses.length;
  const averageScore = completedAnalyses.reduce((acc, curr) => 
    acc + (curr.overall_score || 0), 0) / (totalAnalyses || 1);
  const progressPercentage = totalAnalyses > 0 
    ? Math.round((completedAnalyses.filter(a => (a.overall_score || 0) >= 7).length / totalAnalyses) * 100)
    : 0;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8 px-6 md:px-8 py-8">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Histórico de Avaliações
        </h2>
        <p className="text-base text-white/60 tracking-wide leading-relaxed">
          Acompanhe seu progresso e evolução ao longo do tempo
        </p>
      </motion.header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div variants={item}>
          <div className="glass-card p-6 group hover:bg-white/[0.03] transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-white/90">
                  Avaliações Realizadas
                </h3>
                <p className="text-sm text-white/60">
                  Total acumulado
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                <BarChart3 className="w-5 h-5 text-[#15bcc6]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white tracking-tight">
              {totalAnalyses}
            </p>
            <div className="mt-4 h-0.5 bg-gradient-to-r from-[#46c68f]/20 to-[#15bcc6]/20" />
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="glass-card p-6 group hover:bg-white/[0.03] transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-white/90">
                  Média Geral
                </h3>
                <p className="text-sm text-white/60">
                  Performance média
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                <TrendingUp className="w-5 h-5 text-[#46c68f]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white tracking-tight">
              {averageScore.toFixed(1)}
            </p>
            <div className="mt-4 h-0.5 bg-gradient-to-r from-[#46c68f]/20 to-[#15bcc6]/20" />
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="glass-card p-6 group hover:bg-white/[0.03] transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-white/90">
                  Progresso
                </h3>
                <p className="text-sm text-white/60">
                  Metas alcançadas
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                <Target className="w-5 h-5 text-[#15bcc6]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white tracking-tight">
              {progressPercentage}%
            </p>
            <div className="mt-4 h-0.5 bg-gradient-to-r from-[#46c68f]/20 to-[#15bcc6]/20" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-8"
      >
        <h3 className="text-xl font-medium text-white/90 mb-6">
          Histórico de Análises
        </h3>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse-slow text-white/60">
              Carregando análises...
            </div>
          </div>
        ) : analyses.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-white/40 mx-auto" />
              <p className="text-white/60">
                Nenhuma análise realizada ainda
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-4 hover:bg-white/[0.03]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-5 h-5 text-white/40" />
                    <div>
                      <p className="text-sm font-medium text-white/90">
                        {format(new Date(analysis.created_at), "dd 'de' MMMM',' yyyy", { locale: ptBR })}
                      </p>
                      <p className="text-xs text-white/60">
                        {analysis.status === 'completed' ? 'Análise concluída' : 'Em processamento'}
                      </p>
                    </div>
                  </div>
                  {analysis.overall_score !== null && (
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-xs text-white/60">Técnica</p>
                        <p className="text-sm font-medium text-white/90">{analysis.technical_score?.toFixed(1) || '-'}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-white/60">Segurança</p>
                        <p className="text-sm font-medium text-white/90">{analysis.safety_score?.toFixed(1) || '-'}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-white/60">Eficiência</p>
                        <p className="text-sm font-medium text-white/90">{analysis.efficiency_score?.toFixed(1) || '-'}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-white/60">Geral</p>
                        <p className="text-sm font-medium text-white/90">{analysis.overall_score?.toFixed(1) || '-'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
