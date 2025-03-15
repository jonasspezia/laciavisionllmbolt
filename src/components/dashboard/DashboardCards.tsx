import { motion } from "framer-motion";
import { Profile } from "@/types/supabase";
import { Users, Video, CheckSquare, BarChart3, Building2, GraduationCap, School } from "lucide-react";

interface DashboardCardsProps {
  profile: Profile;
  stats: {
    totalVideos: number;
    pendingAnalyses: number;
    completedAnalyses: number;
    averageScore?: number;
  };
}

export const DashboardCards = ({ profile, stats }: DashboardCardsProps) => {
  const getRoleSpecificCards = () => {
    switch (profile.role) {
      case 'admin':
        return [
          {
            title: "Instituições",
            value: "---",
            icon: Building2,
            description: "Total de instituições"
          },
          {
            title: "Usuários",
            value: "---",
            icon: Users,
            description: "Total de usuários"
          },
          {
            title: "Vídeos Totais",
            value: stats.totalVideos,
            icon: Video,
            description: "Todos os vídeos"
          },
          {
            title: "Análises Realizadas",
            value: stats.completedAnalyses,
            icon: BarChart3,
            description: "Total de análises"
          }
        ];
      case 'institution_admin':
        return [
          {
            title: "Professores",
            value: "---",
            icon: School,
            description: "Professores ativos"
          },
          {
            title: "Alunos",
            value: "---",
            icon: GraduationCap,
            description: "Alunos matriculados"
          },
          {
            title: "Vídeos Enviados",
            value: stats.totalVideos,
            icon: Video,
            description: "Da instituição"
          },
          {
            title: "Performance Média",
            value: stats.averageScore?.toFixed(1) || "---",
            icon: BarChart3,
            description: "Média institucional"
          }
        ];
      case 'professor':
        return [
          {
            title: "Alunos Ativos",
            value: "---",
            icon: Users,
            description: "Meus alunos"
          },
          {
            title: "Vídeos Pendentes",
            value: stats.pendingAnalyses,
            icon: Video,
            description: "Aguardando análise"
          },
          {
            title: "Análises Completas",
            value: stats.completedAnalyses,
            icon: CheckSquare,
            description: "Avaliações realizadas"
          },
          {
            title: "Média da Turma",
            value: stats.averageScore?.toFixed(1) || "---",
            icon: BarChart3,
            description: "Performance média"
          }
        ];
      case 'student':
        return [
          {
            title: "Meus Vídeos",
            value: stats.totalVideos,
            icon: Video,
            description: "Vídeos enviados"
          },
          {
            title: "Em Análise",
            value: stats.pendingAnalyses,
            icon: CheckSquare,
            description: "Aguardando feedback"
          },
          {
            title: "Análises Completas",
            value: stats.completedAnalyses,
            icon: BarChart3,
            description: "Com feedback"
          },
          {
            title: "Minha Média",
            value: stats.averageScore?.toFixed(1) || "---",
            icon: BarChart3,
            description: "Performance individual"
          }
        ];
      default:
        return [];
    }
  };

  const cards = getRoleSpecificCards();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="glass-card p-6 group"
        >
          <div className="flex flex-col space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-white/80">
                  {card.title}
                </h3>
                <p className="mt-1 text-xs text-white/60">
                  {card.description}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                <card.icon className="w-4 h-4 text-[#15bcc6]" />
              </div>
            </div>
            
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-white">
                {card.value}
              </span>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#46c68f]/20 to-[#15bcc6]/20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
