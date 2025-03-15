import { Progress } from "@/components/ui/progress";

interface MetricsDisplayProps {
  technical: number;
  safety: number;
  efficiency: number;
}

export const MetricsDisplay = ({ technical, safety, efficiency }: MetricsDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Técnica</span>
          <span>{technical}%</span>
        </div>
        <Progress value={technical} className="h-2" />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Segurança</span>
          <span>{safety}%</span>
        </div>
        <Progress value={safety} className="h-2" />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Eficiência</span>
          <span>{efficiency}%</span>
        </div>
        <Progress value={efficiency} className="h-2" />
      </div>
    </div>
  );
};
