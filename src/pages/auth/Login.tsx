import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import { motion } from "framer-motion";
import Footer from "@/components/landing/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Attempting login for email:", email);

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        
        let errorMessage = "Erro ao fazer login.";
        
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Email ou senha incorretos.";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "Por favor, confirme seu email antes de fazer login.";
        } else if (error.message.includes("Invalid email")) {
          errorMessage = "O email fornecido é inválido.";
        } else if (error.status === 429) {
          errorMessage = "Muitas tentativas de login. Por favor, aguarde alguns minutos.";
        }
        
        toast({
          variant: "destructive",
          title: "Erro no login",
          description: errorMessage,
        });
        return;
      }

      if (data?.user) {
        console.log("Login successful, user:", data.user.email);
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Unexpected login error:", error);
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[rgba(0,20,40,1)] to-[rgba(1,25,44,1)]">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass-panel p-8 md:p-10 space-y-8 relative overflow-hidden">
            <div className="text-center space-y-6">
              <img
                src="https://i.postimg.cc/CKH9jbSX/logolaciaestaaaa.png"
                alt="LaciaVisionLLM Logo"
                className="h-16 mx-auto"
              />
              <div className="space-y-2">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#46c68f] via-[#15bcc6] to-[#46c68f] bg-clip-text text-transparent"
                >
                  LaciaVisionLLM
                </motion.h2>
                <p className="text-sm text-gray-400">
                  Faça login na sua conta
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    placeholder="seu@email.com"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-300">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => handleNavigation('/auth/reset-password')}
                  className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  Esqueceu sua senha?
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

              <p className="text-center text-sm text-gray-400">
                Não tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => handleNavigation('/auth/signup')}
                  className="font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  Criar conta
                </button>
              </p>
            </form>

            <div className="flex items-center justify-center space-x-6 pt-4 mt-6 border-t border-white/10">
              <img
                src="https://i.postimg.cc/fRZXKtYX/favicon.png"
                alt="Teledoc Logo"
                className="h-8 opacity-75 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://i.postimg.cc/7Y5yFjYP/logo-ucpel-512x512.png"
                alt="UCPEL Logo"
                className="h-8 opacity-75 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
