import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { VideoItem } from "@/types/video";

interface VideoAnalysisCardProps {
  video: VideoItem;
}

export function VideoAnalysisCard({ video }: VideoAnalysisCardProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardContent className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ScoreCard
            label="Nota Geral"
            value={video.overall_score}
            color="primary"
          />
          <ScoreCard
            label="Eficiência"
            value={video.efficiency_score}
            color="secondary"
          />
          <ScoreCard
            label="Técnica"
            value={video.technical_score}
            color="#46c68f"
          />
          <ScoreCard
            label="Segurança"
            value={video.safety_score}
            color="#15bcc6"
          />
        </div>

        {video.analysis_result?.resumoGeral && (
          <FeedbackCard
            title="Resumo Geral"
            content={video.analysis_result.resumoGeral}
          />
        )}

        {video.analysis_feedback && (
          <div className="space-y-6">
            {video.analysis_feedback.general && (
              <FeedbackCard
                title="Feedback Geral"
                content={video.analysis_feedback.general}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {video.analysis_feedback.strengths && (
                <PointsList
                  title="Pontos Fortes"
                  items={video.analysis_feedback.strengths}
                  color="primary"
                />
              )}
              {video.analysis_feedback.improvements && (
                <PointsList
                  title="Pontos para Melhorar"
                  items={video.analysis_feedback.improvements}
                  color="secondary"
                />
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ScoreCardProps {
  label: string;
  value?: number;
  color: string;
}

function ScoreCard({ label, value, color }: ScoreCardProps) {
  return (
    <Card className="bg-white/5 border-white/10 p-4">
      <h4 className="text-sm font-medium text-white/60">{label}</h4>
      <p className={`text-2xl font-bold text-${color} mt-1`}>
        {value?.toFixed(1) || '-'}/10
      </p>
    </Card>
  );
}

interface FeedbackCardProps {
  title: string;
  content: string;
}

function FeedbackCard({ title, content }: FeedbackCardProps) {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-white/80 leading-relaxed">
        {content}
      </CardContent>
    </Card>
  );
}

interface PointsListProps {
  title: string;
  items: string[];
  color: string;
}

function PointsList({ title, items, color }: PointsListProps) {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2 text-white/80"
            >
              <span className={`text-${color} mt-1`}>•</span>
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
