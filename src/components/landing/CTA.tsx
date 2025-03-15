import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <section 
      className="py-20 bg-gradient-to-br from-[rgba(0,20,40,0.9)] to-[rgba(1,25,44,0.95)] backdrop-blur-sm text-white"
      role="region"
      aria-label="Call to action section"
    >
      <div className="container mx-auto px-4">
        <div 
          className="text-center max-w-2xl mx-auto glass-panel p-8 transition-all duration-500 ease-in-out
            hover:shadow-[0_0_30px_rgba(70,198,143,0.3)] 
            hover:bg-gradient-to-r hover:from-[rgba(70,198,143,0.1)] hover:to-[rgba(21,188,198,0.1)]
            group relative overflow-hidden"
        >
          {/* Glow effect overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
            bg-[radial-gradient(circle_at_center,rgba(70,198,143,0.15)_0%,transparent_70%)]
            animate-pulse pointer-events-none" 
          />
          
          <h2 className="text-3xl font-bold mb-6 text-gradient-primary glow-primary relative z-10
            group-hover:scale-105 transition-transform duration-500">
            Pronto para transformar suas avaliações?
          </h2>
          
          <p className="mb-8 text-gray-50 relative z-10
            group-hover:text-white transition-colors duration-500">
            Junte-se a outros professores que já estão usando nossa plataforma
            para avaliar seus alunos de forma mais eficiente.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white 
              relative z-10 group-hover:scale-105"
            aria-label="Criar conta gratuita"
            onClick={() => handleNavigation('/auth/signup')}
          >
            Criar conta gratuita
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
