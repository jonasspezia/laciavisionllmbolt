import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChecklistTemplate } from "@/types/database";
import { VideoStatus } from "./VideoStatus";
import { VideoPlayer } from "./VideoPlayer";
import { AnalyzeButton } from "./AnalyzeButton";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface Timestamp {
  time: string;
  description: string;
}

function hasTimestampShape(item: unknown): item is Timestamp {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.time === 'string' &&
    typeof candidate.description === 'string'
  );
}

function parseTimestamp(json: Json): Timestamp | null {
  if (hasTimestampShape(json)) {
    return json;
  }
  return null;
}

function parseGeminiResponse(json: Json): { text: string } | null {
  if (
    json &&
    typeof json === 'object' &&
    'text' in json &&
    typeof (json as any).text === 'string'
  ) {
    return { text: (json as any).text };
  }
  return null;
}

interface Analysis {
  id: string;
  video_id: string;
  created_at: string;
  created_by: string | null;
  overall_score: number | null;
  safety_score: number | null;
  technique_score: number | null;
  efficiency_score: number | null;
  feedback: string[] | null;
  timestamps: Array<Timestamp> | null;
  gemini_response: {
    text: string;
  } | null;
  status: string | null;
  user_id: string | null;
}

interface VideoCardProps {
  video: {
    id: string;
    file_name: string;
    file_path: string;
    status: string;
  };
  onPlayClick: (filePath: string) => void;
  onAnalyze: (videoPath: string, videoId: string, studentId?: string) => void;
  isAnalyzing: boolean;
  selectedVideoId: string | null;
  selectedChecklistId: string;
  setSelectedChecklistId: (id: string) => void;
  checklists: ChecklistTemplate[];
  getVideoStatusColor: (status: string) => string;
}

export function VideoCard({
  video,
  onPlayClick,
  onAnalyze,
  isAnalyzing,
  selectedVideoId,
  selectedChecklistId,
  setSelectedChecklistId,
  checklists,
  getVideoStatusColor
}: VideoCardProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [studentId, setStudentId] = useState<string>("");

  const { data: analyses } = useQuery({
    queryKey: ['video-analyses', video.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('video_analyses')
        .select('*')
        .eq('video_id', video.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data ?? []).map(analysis => {
        const timestamps = Array.isArray(analysis.timestamps)
          ? analysis.timestamps
              .map(parseTimestamp)
              .filter((t): t is Timestamp => t !== null)
          : null;

        const feedback = Array.isArray(analysis.feedback)
          ? analysis.feedback
              .filter((item): item is string => typeof item === 'string')
          : null;

        const geminiResponse = analysis.gemini_response
          ? parseGeminiResponse(analysis.gemini_response)
          : null;

        return {
          ...analysis,
          feedback,
          timestamps,
          gemini_response: geminiResponse
        } as Analysis;
      });
    },
    enabled: video.status === 'analyzed'
  });

  const lastAnalysis = analyses?.[0];

  return (
    <Card className="bg-white/5 border-white/10 relative group hover:bg-white/10 transition-colors">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="truncate flex-1 mr-2">{video.file_name}</div>
          <div className="flex items-center gap-2">
            {video.status === 'analyzed' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAnalysis(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                title="Ver análise completa"
              >
                <FileText className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPlayClick(video.file_path)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <VideoStatus 
          status={video.status} 
          getVideoStatusColor={getVideoStatusColor} 
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <VideoPlayer filePath={video.file_path} />
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId" className="text-white">Matrícula do Aluno (Opcional)</Label>
              <Input
                id="studentId"
                placeholder="Digite a matrícula do aluno"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checklist" className="text-white">Checklist</Label>
              <Select 
                value={selectedChecklistId} 
                onValueChange={setSelectedChecklistId}
              >
                <SelectTrigger id="checklist" className="w-full bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Selecione um checklist" />
                </SelectTrigger>
                <SelectContent>
                  {checklists.map((checklist) => (
                    <SelectItem key={checklist.id} value={checklist.id}>
                      {checklist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <AnalyzeButton
              onAnalyze={() => onAnalyze(video.file_path, video.id, studentId)}
              isAnalyzing={isAnalyzing}
              isSelected={selectedVideoId === video.id}
              disabled={isAnalyzing || !selectedChecklistId || video.status === 'analyzing'}
            />
          </div>
        </div>
      </CardContent>

      <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
        <DialogContent className="sm:max-w-4xl bg-gray-800 border-gray-700 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Histórico de Análises</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {lastAnalysis && (
              <div className="text-white">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Pontuação Geral</h4>
                    <div className="text-2xl">{lastAnalysis.overall_score || 'N/A'}</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Segurança</h4>
                    <div className="text-2xl">{lastAnalysis.safety_score || 'N/A'}</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Técnica</h4>
                    <div className="text-2xl">{lastAnalysis.technique_score || 'N/A'}</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Eficiência</h4>
                    <div className="text-2xl">{lastAnalysis.efficiency_score || 'N/A'}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {lastAnalysis.feedback && lastAnalysis.feedback.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Feedbacks</h4>
                      <ul className="list-disc pl-4 space-y-2">
                        {lastAnalysis.feedback.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {lastAnalysis.timestamps && lastAnalysis.timestamps.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Momentos Importantes</h4>
                      <ul className="list-disc pl-4 space-y-2">
                        {lastAnalysis.timestamps.map((item, index) => (
                          <li key={index}>
                            {item.time}: {item.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Análise Detalhada</h4>
                    <div className="whitespace-pre-wrap bg-white/5 p-4 rounded-lg">
                      {lastAnalysis.gemini_response?.text || "Nenhum detalhe disponível"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
