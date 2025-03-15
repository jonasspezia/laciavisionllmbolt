import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";
import { z } from "zod";
import { motion } from "framer-motion";

const emailSchema = z.string().email({ message: "Email inválido" });

const EmailCapture = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      emailSchema.parse(email);
      console.log("Captured email:", email);

      toast({
        title: "Sucesso!",
        description: "Você foi inscrito em nossa newsletter.",
        duration: 5000,
      });

      setEmail("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, insira um email válido.",
        duration: 5000,
      });
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-16 overflow-hidden isolate"
      role="region"
      aria-label="Inscrição na newsletter"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-neural-start/20 via-neural-middle/10 to-neural-end/5 animate-gradient" />
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(70,198,143,0.1),transparent_70%)] 
            animate-pulse opacity-75"
          style={{ animation: "pulse 4s infinite" }}
        />
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(21,188,198,0.1),transparent_70%)] 
            animate-pulse opacity-75"
          style={{ animation: "pulse 4s infinite reverse" }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col md:flex-row gap-3 items-end justify-center 
              glass-panel p-4 md:p-6 rounded-xl border border-white/10
              shadow-xl hover:shadow-2xl transition-shadow duration-300
              backdrop-blur-md bg-white/5 relative overflow-hidden group"
            role="form"
            aria-label="Formulário de inscrição na newsletter"
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-neural-start/10 via-neural-middle/5 to-neural-end/10 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            <div className="flex-1 min-w-0 relative">
              <label htmlFor="email" className="sr-only">Email profissional</label>
              <Input
                id="email"
                type="email"
                placeholder="Seu email profissional"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-neural-start/20 text-white placeholder:text-gray-400
                  h-11 transition-all duration-300 focus:ring-2 focus:ring-neural-start/30"
                required
                aria-required="true"
                aria-invalid={email !== "" && !emailSchema.safeParse(email).success}
                aria-describedby={email !== "" && !emailSchema.safeParse(email).success ? "email-error" : undefined}
              />
              {email !== "" && !emailSchema.safeParse(email).success && (
                <span id="email-error" className="sr-only">Email inválido</span>
              )}
            </div>

            <Button
              type="submit"
              className="h-11 bg-neural-start/90 hover:bg-neural-middle transition-all duration-300 
                text-white whitespace-nowrap px-6 relative overflow-hidden
                hover:shadow-[0_0_15px_rgba(70,198,143,0.3)] group
                focus:ring-2 focus:ring-neural-start focus:ring-offset-2"
              aria-label="Inscrever-se na newsletter"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neural-start/20 to-neural-middle/20 
                transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Inscrever-se</span>
            </Button>
          </motion.form>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xs text-gray-400 text-center mt-3"
            role="note"
          >
            Receba as últimas atualizações sobre avaliação médica. Cancele quando quiser.
          </motion.p>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="particle-container">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-neural-start/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default EmailCapture;
