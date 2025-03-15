import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";

interface VideoUploadButtonProps {
  isUploading: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VideoUploadButton({ isUploading, onFileChange }: VideoUploadButtonProps) {
  console.log("[VideoUploadButton] Rendering with isUploading:", isUploading);
  
  const handleClick = () => {
    console.log("[VideoUploadButton] Upload button clicked");
    document.getElementById("video-upload")?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("[VideoUploadButton] File selected:", event.target.files?.[0]?.name);
    onFileChange(event);
  };

  return (
    <div className="flex gap-2">
      <Button
        disabled={isUploading}
        onClick={handleClick}
        className="bg-primary hover:bg-primary/90"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Enviar Vídeo
          </>
        )}
      </Button>
      <input
        type="file"
        id="video-upload"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
