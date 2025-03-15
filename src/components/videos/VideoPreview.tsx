interface VideoPreviewProps {
  videoUrl: string;
}

export const VideoPreview = ({ videoUrl }: VideoPreviewProps) => {
  return (
    <div className="mt-4">
      <video
        key={videoUrl}
        src={videoUrl}
        controls
        className="w-full rounded-lg border bg-gray-50 dark:bg-gray-900"
        aria-label="Preview do vídeo selecionado"
      />
    </div>
  );
};
