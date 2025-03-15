import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    // Garante que a página carregue no topo
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#002046] to-[#1a365d]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center pt-24 pb-16">
        <div className="glass-panel p-8 max-w-md w-full mx-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <h1 className="text-8xl font-bold text-gradient-primary glow-primary">
              404
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              Oops! Página não encontrada
            </p>
            <p className="text-gray-300 text-sm mb-6">
              A página que você está procurando pode ter sido removida ou não existe.
            </p>
            <Button 
              onClick={() => handleNavigation('/')}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
            >
              Voltar para o Início
            </Button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
