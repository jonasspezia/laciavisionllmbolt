import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface WorkflowStepProps {
  phase: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  index: number;
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.4,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export const WorkflowStep = ({ phase, title, description, icon: Icon, color, index }: WorkflowStepProps) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`flex items-center gap-8 ${
        index % 2 === 0 ? 'justify-start' : 'justify-end'
      }`}
    >
      <div className={`glass-panel p-8 max-w-lg backdrop-blur-md bg-white/[0.02] rounded-xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:bg-white/[0.04] transition-all duration-500 ${
        index % 2 === 0 ? 'ml-0' : 'mr-0'
      }`}>
        <div className="flex items-center gap-4 mb-4">
          <motion.div 
            className="w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{ 
              backgroundColor: `${color}10`,
              boxShadow: `0 0 20px ${color}20`
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Icon className="w-7 h-7" style={{ color }} />
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                boxShadow: [
                  `0 0 0 0px ${color}10`,
                  `0 0 0 15px ${color}00`
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.div>
          <span className="text-[#46c68f]/80 text-sm font-medium tracking-wider">
            {phase}
          </span>
        </div>
        <h3 className="text-2xl font-semibold text-white/90 mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-400/90 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
