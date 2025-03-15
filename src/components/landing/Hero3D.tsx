import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNeuralScene } from './three/useNeuralScene';
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

interface Hero3DProps {
  isLoaded: boolean;
}

const Hero3D = ({ isLoaded }: Hero3DProps) => {
  const { containerRef, canvasRef } = useNeuralScene();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      const offset = 80;
      const elementPosition = featuresSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
      role="banner"
      aria-label="Hero section"
    >
      {/* Canvas com loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 animate-pulse" />
      )}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
          isLoaded ? 'opacity-90' : 'opacity-0'
        }`}
        style={{ 
          background: 'linear-gradient(to bottom right, rgba(0,20,40,1), rgba(1,25,44,1))',
          mixBlendMode: 'overlay' 
        }}
      />
      
      {/* Microluminescence overlay with enhanced animations */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(70, 198, 143, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(21, 188, 198, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 60%, rgba(70, 198, 143, 0.15) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="px-4 py-2 text-sm font-semibold bg-primary/20 text-primary rounded-full backdrop-blur-[1px] inline-block mb-6 shadow-lg shadow-primary/10 cursor-pointer
              min-h-[44px] flex items-center justify-center"
            aria-label="Banner destacado"
          >
            A Nova Era da Avaliação Médica
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 [text-wrap:balance] text-white tracking-tight px-2 md:px-0"
          >
            Desbloqueie o Poder da 
            <motion.span 
              className="bg-gradient-to-r from-primary via-secondary to-neural-end bg-clip-text text-transparent block mt-2"
              style={{
                textShadow: '0 0 3px rgba(70,198,143,0.2)',
                filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Avaliação Médica Inteligente
            </motion.span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-base md:text-lg text-white leading-relaxed drop-shadow-lg font-medium px-4 md:px-0"
          >
            Imagine avaliar habilidades médicas com precisão milimétrica. Nossa IA não apenas observa, 
            ela compreende, analisa e oferece insights que transformam a maneira como você ensina medicina.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4 md:px-0"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-auto"
            >
              <Button 
                size={isMobile ? "lg" : "default"}
                className="w-full sm:w-auto min-h-[44px] min-w-[44px] text-base md:text-lg py-6 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                onClick={() => handleNavigation('/auth/signup')}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Começar agora
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-auto"
            >
              <Button 
                size={isMobile ? "lg" : "default"}
                variant="outline" 
                className="w-full sm:w-auto min-h-[44px] min-w-[44px] text-base md:text-lg py-6 px-8 border-white/20 text-white hover:bg-white/10"
                onClick={handleScrollToFeatures}
              >
                Saiba mais
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero3D;
