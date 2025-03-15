import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isConnected: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  // Check connection status
  const checkConnection = async () => {
    try {
      const { error } = await supabase.from('profiles').select('id').limit(1);
      const newConnectionStatus = !error;
      
      // Only update state if connection status changed
      if (newConnectionStatus !== isConnected) {
        setIsConnected(newConnectionStatus);
        
        if (error) {
          console.error("Database connection error:", error);
        }
      }
    } catch (error) {
      setIsConnected(false);
      console.error("Connection check error:", error);
    }
  };

  useEffect(() => {
    // Initial connection check
    checkConnection();

    // Set up periodic connection checks (every minute)
    const connectionInterval = setInterval(checkConnection, 60000);

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Session retrieval error:", error);
      }
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      if (event === 'SIGNED_OUT') {
        toast({
          title: "Logout realizado",
          description: "Até logo!"
        });
      } else if (event === 'USER_UPDATED') {
        toast({
          title: "Perfil atualizado",
          description: "Suas informações foram atualizadas com sucesso."
        });
      }
    });

    return () => {
      clearInterval(connectionInterval);
      subscription?.unsubscribe();
    };
  }, [toast, isConnected]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: "Não foi possível fazer logout. Por favor, tente novamente."
      });
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, isLoading, isConnected, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
