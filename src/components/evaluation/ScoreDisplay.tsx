import { Progress } from "@/components/ui/progress";

interface ScoreDisplayProps {
  total: number;
  percentage: number;
}

export const ScoreDisplay = ({ total, percentage }: ScoreDisplayProps) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>Pontuação Total: {total}</span>
        <span>{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
