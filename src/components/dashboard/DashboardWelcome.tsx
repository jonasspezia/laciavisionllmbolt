import React from 'react';
import { motion } from 'framer-motion';
import { CircuitBoard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Profile } from '@/types/supabase';
import { SignupLogos } from '@/components/auth/signup/SignupLogos';
import { StarField } from '@/components/effects/StarField';
import { useNavigate } from 'react-router-dom';

interface DashboardWelcomeProps {
  profile: Profile;
}

const DashboardWelcome: React.FC<DashboardWelcomeProps> = ({ profile }) => {
  const navigate = useNavigate();

  const handleStartInteraction = () => {
    navigate('/dashboard/videos');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-6 z-20"
      >
        <motion.button
          onClick={() => navigate('/dashboard')}
          whileHover={{ 
            scale: 1.02,
            filter: "brightness(1.1)"
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 30
          }}
          className="focus:outline-none"
        >
          <motion.img
            src="https://i.postimg.cc/MGS2jT0X/logo-laciavisionllm-512x512.png"
            alt="LaciaVisionLLM Logo"
            className="h-10 w-10 object-contain"
            animate={{
              filter: ["brightness(1)", "brightness(1.08)", "brightness(1)"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: "drop-shadow(0 0 8px rgba(155, 135, 245, 0.2))"
            }}
          />
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center space-y-12 max-w-3xl mx-auto px-4 pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-8"
        >
          <h1 className="text-6xl font-bold tracking-tight">
            <motion.span 
              className="bg-gradient-to-r from-primary via-secondary to-neural-end bg-clip-text text-transparent inline-block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% auto' }}
            >
              Bem-vindo ao LaciaVision
            </motion.span>
            <motion.span 
              className="text-white/90 font-light text-4xl mt-6 block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.6
              }}
            >
              {profile.full_name}
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="pt-4"
          >
            <SignupLogos />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.8,
            duration: 0.6
          }}
          className="pt-8"
        >
          <Button
            size="lg"
            onClick={handleStartInteraction}
            className="bg-gradient-to-r from-neural-start to-neural-middle hover:opacity-90 text-white font-medium py-8 px-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg backdrop-blur-sm"
          >
            <CircuitBoard className="h-6 w-6" />
            <span>Iniciar Interação por Voz</span>
          </Button>
        </motion.div>

        <motion.div
          className="fixed -z-10 inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <StarField />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(70,198,143,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(21,188,198,0.08),transparent_50%)]" />
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle at center, rgba(70,198,143,0.03), rgba(21,188,198,0.03), transparent 70%)'
            }}
          />
          <motion.div 
            className="absolute inset-0 backdrop-blur-[100px] bg-background/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default DashboardWelcome;
