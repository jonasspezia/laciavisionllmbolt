import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import { motion } from "framer-motion";
import Footer from "@/components/landing/Footer";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Sua senha foi atualizada com sucesso.",
      });
      navigate("/auth/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message,
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
          className="w-full max-w-md space-y-6 glass-panel p-8"
        >
          <div className="text-center space-y-6">
            <img
              src="https://i.postimg.cc/CKH9jbSX/logolaciaestaaaa.png"
              alt="LaciaVisionLLM Logo"
              className="h-16 mx-auto"
            />
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#46c68f] via-[#15bcc6] to-[#46c68f] bg-clip-text text-transparent"
            >
              LaciaVisionLLM
            </motion.h2>
            <p className="mt-2 text-sm text-gray-400">
              Digite sua nova senha
            </p>
          </div>

          <form onSubmit={handleUpdatePassword} className="mt-8 space-y-6">
            <div>
              <Label htmlFor="password" className="text-gray-300">Nova senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 bg-white/5 border-white/10 text-white"
                placeholder="••••••••"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Atualizando senha..." : "Atualizar senha"}
            </Button>
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
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
