import { useEffect, useState } from "react";
import { AlertCircle, WifiOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";

export function ConnectionStatus() {
  const { isConnected } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setShowAlert(true);
    } else if (showAlert) {
      // Only set timer if the alert is currently shown
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isConnected, showAlert]);

  if (!showAlert) return null;

  return (
    <Alert 
      variant={isConnected ? "default" : "destructive"} 
      className="mb-4 animate-in fade-in slide-in-from-top duration-500"
    >
      {isConnected ? (
        <>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Conexão restaurada</AlertTitle>
          <AlertDescription>
            A conexão com o servidor foi restabelecida.
          </AlertDescription>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4" />
          <AlertTitle>Modo offline</AlertTitle>
          <AlertDescription>
            Você está trabalhando no modo offline. Algumas funcionalidades podem estar limitadas.
          </AlertDescription>
        </>
      )}
    </Alert>
  );
}
