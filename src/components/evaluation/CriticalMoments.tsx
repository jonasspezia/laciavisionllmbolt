import { Button } from "@/components/ui/button";
import { CriticalMoment } from "@/types/evaluation";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface CriticalMomentsProps {
  moments?: CriticalMoment[];
  onMomentClick: (timestamp: number) => void;
}

export const CriticalMoments = ({ moments = [], onMomentClick }: CriticalMomentsProps) => {
  if (!moments.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Momentos Críticos</h3>
      <div className="space-y-2">
        {moments.map((moment, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => onMomentClick(moment.timestamp)}
          >
            {moment.type === 'positive' ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            )}
            <span className="text-sm">{moment.observation}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
