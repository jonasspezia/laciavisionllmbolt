import { Button } from "@/components/ui/button";
import { Loader2, BarChart2 } from "lucide-react";

interface AnalyzeButtonProps {
  onAnalyze: () => void;
  isAnalyzing: boolean;
  isSelected: boolean;
  disabled: boolean;
}

export function AnalyzeButton({ 
  onAnalyze, 
  isAnalyzing, 
  isSelected,
  disabled 
}: AnalyzeButtonProps) {
  return (
    <Button
      className="w-full"
      onClick={onAnalyze}
      disabled={disabled}
    >
      {isAnalyzing && isSelected ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Analisando...
        </>
      ) : (
        <>
          <BarChart2 className="h-4 w-4 mr-2" />
          Analisar com LACia
        </>
      )}
    </Button>
  );
}
