import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  isLoaded: boolean;
}

const Hero = ({ isLoaded }: HeroProps) => {
  return (
    <section 
      className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40"
      role="banner"
      aria-label="Hero section"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span 
            className="px-3 py-1 text-sm font-semibold bg-primary/10 text-primary rounded-full backdrop-blur-sm inline-block mb-6"
            role="text"
            aria-label="Tagline"
          >
            Revolucione sua avaliação prática com IA
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Análise Inteligente de Vídeos para Avaliações Médicas
          </h1>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
            Utilize inteligência artificial multimodal para avaliar exames práticos através de vídeos,
            tornando o processo mais eficiente, preciso e padronizado.
          </p>
          <div 
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
            role="group"
            aria-label="Call to action buttons"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover backdrop-blur-sm shadow-lg shadow-primary/20 group"
              aria-label="Começar agora"
            >
              Começar agora
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 text-white"
              aria-label="Saiba mais"
            >
              Saiba mais
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
