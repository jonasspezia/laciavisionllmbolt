import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import { TermsDialog } from "@/components/auth/TermsDialog";
import { SignupForm } from "@/components/auth/signup/SignupForm";
import { SignupHeader } from "@/components/auth/signup/SignupHeader";
import { SignupLogos } from "@/components/auth/signup/SignupLogos";
import { SignupBackground } from "@/components/auth/signup/SignupBackground";
import Footer from "@/components/landing/Footer";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);
  const [signupData, setSignupData] = useState<{
    email: string;
    password: string;
    fullName: string;
  } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { scrollY } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "50%"]);
  const formOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleSignup = async (email: string, password: string, fullName: string) => {
    console.log("[Signup] Process initiated", { email, fullName });
    setSignupData({ email, password, fullName });
    console.log("[Signup] Opening terms dialog...");
    setTermsDialogOpen(true);
  };

  const handleAcceptTerms = async () => {
    if (!signupData) {
      console.error("[Signup] No signup data available");
      return;
    }
    
    setIsLoading(true);
    console.log("[Signup] Terms accepted, proceeding with account creation...");
    
    try {
      console.log("[Signup] Preparing signup data:", {
        email: signupData.email,
        fullName: signupData.fullName,
        metadata: {
          full_name: signupData.fullName,
          role: "professor"
        }
      });

      const { error: signUpError, data } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            full_name: signupData.fullName,
            role: "professor" as const
          },
        },
      });

      if (signUpError) throw signUpError;

      // Fazer login automaticamente após o cadastro
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: signupData.email,
        password: signupData.password,
      });

      if (signInError) throw signInError;

      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo ao sistema.",
      });
      
      handleNavigation('/dashboard');
      
    } catch (error: any) {
      console.error("[Signup] Full error:", {
        error,
        message: error.message,
        details: error.details,
        hint: error.hint,
        stack: error.stack
      });
      
      let errorMessage = "Ocorreu um erro ao criar sua conta.";
      
      if (error.message?.includes("duplicate key")) {
        errorMessage = "Este email já está cadastrado.";
      } else if (error.message?.includes("invalid email")) {
        errorMessage = "O email fornecido é inválido.";
      } else if (error.message?.includes("password")) {
        errorMessage = "A senha deve ter pelo menos 6 caracteres.";
      }
      
      toast({
        variant: "destructive",
        title: "Erro",
        description: errorMessage,
      });
    } finally {
      console.log("[Signup] Process completed");
      setIsLoading(false);
      setTermsDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[rgba(0,20,40,1)] to-[rgba(1,25,44,1)]">
      <Navbar />
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SignupBackground backgroundY={backgroundY} />
      </div>
      
      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ opacity: formOpacity }}
          className="w-full max-w-md"
        >
          <div className="glass-panel p-8 md:p-10 space-y-8 relative overflow-hidden">
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            <SignupHeader />
            <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
            <SignupLogos />
          </div>
        </motion.div>
      </main>

      <Footer />

      <TermsDialog
        open={termsDialogOpen}
        onOpenChange={setTermsDialogOpen}
        onAccept={handleAcceptTerms}
      />
    </div>
  );
}
