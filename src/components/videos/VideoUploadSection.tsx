import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Loader2 } from "lucide-react";
import { VideoUploadCard } from "./VideoUploadCard";
import { VideoRecorder } from "./VideoRecorder";
import { ChecklistSelector } from "./ChecklistSelector";
import { useVideoUpload } from "@/hooks/useVideoUpload";
import type { ChecklistTemplate } from "@/types/checklist";

interface VideoUploadSectionProps {
  checklists: ChecklistTemplate[];
  onUploadComplete: () => void;
  userId: string;
}

export function VideoUploadSection({ 
  checklists, 
  onUploadComplete, 
  userId 
}: VideoUploadSectionProps) {
  const {
    selectedFile,
    isAnalyzing,
    videoUrl,
    selectedChecklist,
    setSelectedChecklist,
    handleFileSelect,
    handleAnalysis
  } = useVideoUpload(userId, onUploadComplete);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <VideoUploadCard
          selectedFile={selectedFile}
          videoUrl={videoUrl}
          onFileSelect={handleFileSelect}
        />
        <Card className="bg-white/5 border-white/10 overflow-hidden">
          <CardHeader className="border-b border-white/10 bg-white/5 px-6">
            <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Gravação de Vídeo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <VideoRecorder />
          </CardContent>
        </Card>
      </div>

      {selectedFile && (
        <ChecklistSelector
          checklists={checklists}
          selectedChecklist={selectedChecklist}
          onChecklistChange={setSelectedChecklist}
        />
      )}

      <div className="flex gap-4">
        <Button
          onClick={handleAnalysis}
          disabled={!selectedFile || !selectedChecklist || isAnalyzing}
          className="flex-1 h-14 text-base font-medium bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg transition-all duration-300 gap-3 disabled:from-gray-600 disabled:to-gray-700"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Analisando vídeo...</span>
            </>
          ) : (
            <>
              <Video className="h-6 w-6" />
              <span>Iniciar Análise Inteligente</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
