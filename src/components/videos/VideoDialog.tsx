import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoDialogProps {
  selectedVideo: string | null;
  onClose: () => void;
}

export function VideoDialog({ selectedVideo, onClose }: VideoDialogProps) {
  if (!selectedVideo) return null;

  return (
    <Dialog open={!!selectedVideo} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl p-0 bg-gray-900 border-gray-800">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <video
            src={`https://pvfrynqcarvlorflzdqi.supabase.co/storage/v1/object/public/bucketdolacia/${selectedVideo}`}
            className="w-full max-h-[70vh] object-contain rounded-lg"
            controls
            autoPlay
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
