import { Video, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVideoRecording } from "@/hooks/useVideoRecording";

export const VideoRecorder = () => {
  const {
    isRecording,
    videoRef,
    startRecording,
    stopRecording,
    handleDiscardVideo,
    videoUrl,
    selectedFile
  } = useVideoRecording();

  return (
    <>
      {videoUrl || isRecording ? (
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              playsInline
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ) : (
        <button
          onClick={startRecording}
          className="group w-full aspect-video rounded-xl border-2 border-dashed border-white/10 hover:border-primary/40 bg-white/[0.02] backdrop-blur-sm flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:bg-white/[0.05]"
        >
          <div className="p-8 rounded-full bg-white/5 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
            <Video className="h-14 w-14 text-white/60 group-hover:text-primary" />
          </div>
          <span className="text-lg font-medium text-white/70 group-hover:text-white">Gravação de Vídeo</span>
        </button>
      )}
      
      {(isRecording || videoUrl || selectedFile) && (
        <div className="w-full flex gap-2 mt-4">
          {isRecording && (
            <Button
              onClick={stopRecording}
              className="flex-1 h-12 gap-2 bg-red-500 hover:bg-red-600"
            >
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              Parar Gravação
            </Button>
          )}
          {(videoUrl || selectedFile) && (
            <Button
              variant="destructive"
              onClick={handleDiscardVideo}
              className="flex-1 h-12 gap-2"
            >
              <Trash2 className="h-5 w-5" />
              Descartar Vídeo
            </Button>
          )}
        </div>
      )}
    </>
  );
};
