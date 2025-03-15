import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { VideoPreview } from "./VideoPreview";

interface VideoUploadCardProps {
  selectedFile: File | null;
  videoUrl: string | null;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VideoUploadCard({ selectedFile, videoUrl, onFileSelect }: VideoUploadCardProps) {
  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-white/5">
        <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Upload de Vídeo
        </CardTitle>
      </CardHeader>
      {!selectedFile ? (
        <CardContent className="p-0">
          <label
            htmlFor="video-upload"
            className="group h-full aspect-video rounded-xl border-2 border-dashed border-white/20 hover:border-primary/60 bg-white/5 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:bg-white/[0.07]"
          >
            <div className="p-8 rounded-full bg-white/5 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
              <Upload className="h-14 w-14 text-white/40 group-hover:text-primary" />
            </div>
            <span className="text-lg font-medium text-white/70 group-hover:text-white">
              Clique para fazer upload
            </span>
            <Input
              type="file"
              accept="video/*"
              onChange={onFileSelect}
              className="hidden"
              id="video-upload"
              aria-label="Selecionar vídeo para upload"
            />
          </label>
        </CardContent>
      ) : (
        <CardContent className="p-0 aspect-video">
          <VideoPreview videoUrl={videoUrl} />
        </CardContent>
      )}
    </Card>
  );
}
