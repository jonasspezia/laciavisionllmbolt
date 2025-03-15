import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useVideoAnalysis } from "@/hooks/useVideoAnalysis";
import VideoPlayer from "./VideoPlayer";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface ScoreItemProps {
  label: string;
  value: number;
  color: string;
}

const ScoreItem = ({ label, value, color }: ScoreItemProps) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm text-muted-foreground">{value}/10</span>
    </div>
    <Progress
      value={value * 10}
      className={`h-2 ${color === 'primary' ? 'bg-primary' : `bg-${color}-500`}`}
    />
  </div>
);

const AnalysisSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="w-full h-[400px] rounded-lg" />
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

interface VideoAnalysisProps {
  videoUrl: string;
  checklistType: string;
}

export const VideoAnalysis = ({
  videoUrl,
  checklistType
}: VideoAnalysisProps) => {
  const { analysis, loading } = useVideoAnalysis(videoUrl, checklistType);
  const { toast } = useToast();

  if (loading) {
    return <AnalysisSkeleton />;
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="space-y-6">
      <VideoPlayer
        src={videoUrl}
        markers={analysis.markers}
        onMarkerClick={(marker) => {
          toast({
            title: `Momento ${marker.type}`,
            description: marker.description
          });
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <ScoreItem
              label="Técnica"
              value={analysis.scores.technique}
              color="yellow"
            />
            <ScoreItem
              label="Segurança"
              value={analysis.scores.safety}
              color="blue"
            />
            <ScoreItem
              label="Eficiência"
              value={analysis.scores.efficiency}
              color="green"
            />
            <ScoreItem
              label="Score Geral"
              value={analysis.scores.overall}
              color="primary"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-line">{analysis.feedback}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoAnalysis;
