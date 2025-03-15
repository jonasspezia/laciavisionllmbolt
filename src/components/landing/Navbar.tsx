import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-[rgba(0,20,40,0.95)] border-b border-white/20"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-xl font-bold text-white hover:text-primary transition-colors flex items-center gap-2"
              aria-label="Video Checker Pro Home"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img src="https://i.postimg.cc/CKH9jbSX/logolaciaestaaaa.png" alt="LaciaVisionLLM Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Button 
              variant="ghost"
              onClick={() => handleNavigation('/')}
              className="text-white hover:text-white/90"
            >
              Início
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('features')}
              className="text-white hover:text-white/90"
            >
              Recursos
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/privacy-policy')}
              className="text-white hover:text-white/90"
            >
              Privacidade
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/terms-of-service')}
              className="text-white hover:text-white/90"
            >
              Termos
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleNavigation('/auth/login')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Login
            </Button>
            <Button 
              onClick={() => handleNavigation('/auth/signup')}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
            >
              Criar conta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden p-2 text-white hover:text-white/90"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-[rgba(0,20,40,0.98)] border-t border-white/20"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-white/90"
              onClick={() => handleNavigation('/')}
            >
              Início
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-white/90"
              onClick={() => scrollToSection('features')}
            >
              Recursos
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-white/90"
              onClick={() => handleNavigation('/privacy-policy')}
            >
              Privacidade
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-white/90"
              onClick={() => handleNavigation('/terms-of-service')}
            >
              Termos
            </Button>
            <div className="space-y-2 pt-2 border-t border-white/20">
              <Button 
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={() => handleNavigation('/auth/login')}
              >
                Login
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                onClick={() => handleNavigation('/auth/signup')}
              >
                Criar conta
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;
