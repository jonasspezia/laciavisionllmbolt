import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SignupFormProps {
  onSubmit: (email: string, password: string, fullName: string) => void;
  isLoading: boolean;
}

export function SignupForm({ onSubmit, isLoading }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, fullName);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-gray-300">Nome completo</Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="mt-1 bg-white/5 border-white/10 text-white"
            placeholder="Seu nome completo"
            disabled={isLoading}
          />
        </div>

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

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Criando conta..." : "Criar conta"}
      </Button>

      <p className="text-center text-sm text-gray-400">
        Já tem uma conta?{" "}
        <Button
          type="button"
          variant="link"
          onClick={() => handleNavigation('/auth/login')}
          className="px-0 min-h-0 text-primary hover:text-primary/90"
        >
          Entrar
        </Button>
      </p>
    </form>
  );
}
