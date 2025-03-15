import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/ui/loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, isLoading, isConnected } = useAuth();
  const navigate = useNavigate();
  const [checkCount, setCheckCount] = useState(0);
  const MAX_CHECK_ATTEMPTS = 3;

  useEffect(() => {
    // If not connected, continue trying for a limited time
    if (!isConnected && checkCount <= MAX_CHECK_ATTEMPTS) {
      const timer = setTimeout(() => {
        setCheckCount(prev => prev + 1);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isConnected, checkCount]);

  useEffect(() => {
    // Only redirect if not loading, connected, and no session
    if (!isLoading && isConnected && !session) {
      navigate("/auth/login");
    }
  }, [session, isLoading, navigate, isConnected]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading size={24} />
      </div>
    );
  }

  // Allow offline access after exhausting connection attempts
  const isOfflineAccess = !isConnected && checkCount > MAX_CHECK_ATTEMPTS;

  if (isOfflineAccess) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-shrink-0 p-4 bg-gray-800">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Problema de conexão</AlertTitle>
            <AlertDescription>
              Não foi possível conectar ao servidor. Algumas funcionalidades estarão limitadas.
            </AlertDescription>
          </Alert>
        </div>
        {children}
      </div>
    );
  }

  return session || isOfflineAccess ? <>{children}</> : null;
};
