import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, ChevronLeft, ChevronRight, Maximize2, Play, Clock, Calendar, Check, AlertCircle, Trash2 } from "lucide-react";
import { VideoItem } from "@/types/video";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";

interface VideosListProps {
  videos: VideoItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onVideoClick: (video: VideoItem) => void;
  onVideoPreview: (videoPath: string) => void;
  selectedVideoId?: string;
  onDeleteVideo: (video: VideoItem) => void;
}

export const VideosList = ({
  videos,
  currentPage,
  totalPages,
  onPageChange,
  onVideoClick,
  onVideoPreview,
  selectedVideoId,
  onDeleteVideo
}: VideosListProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4" />;
      case 'processing':
        return <Clock className="h-4 w-4 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-400';
      case 'processing':
        return 'bg-blue-500/10 text-blue-400';
      case 'error':
        return 'bg-red-500/10 text-red-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  const formatScore = (score: number | undefined | null): string => {
    if (score === undefined || score === null) return '-';
    return score.toFixed(1);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div role="status" aria-live="polite" className="space-y-8">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Lista de vídeos"
      >
        {videos.map((video) => (
          <motion.div 
            key={video.id}
            variants={item}
            className={`glass-card group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${
              selectedVideoId === video.id 
                ? 'bg-primary/5 ring-1 ring-primary/40' 
                : ''
            }`}
            role="listitem"
            onClick={() => onVideoClick(video)}
          >
            <div className="aspect-video bg-gray-900/40 flex items-center justify-center relative group overflow-hidden rounded-t-xl">
              {video.thumbnail_url ? (
                <>
                  <img
                    src={video.thumbnail_url}
                    alt={`Thumbnail do vídeo ${video.file_name}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <video
                    src={video.file_path}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    preload="none"
                    muted
                    loop
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                </>
              ) : (
                <Video className="h-12 w-12 text-white/20" aria-hidden="true" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-primary hover:scale-110 transition-all duration-300 backdrop-blur-sm bg-black/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    onVideoPreview(video.file_path);
                  }}
                  aria-label="Visualizar vídeo"
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-medium truncate text-white/90">
                  {video.file_name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-white/40" />
                  <time className="text-sm text-white/60">
                    {format(new Date(video.created_at), "d 'de' MMMM',' yyyy", { locale: ptBR })}
                  </time>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full ${getStatusColor(video.status)}`}>
                  {getStatusIcon(video.status)}
                  <span>{video.status.charAt(0).toUpperCase() + video.status.slice(1)}</span>
                </span>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/60 hover:text-red-500 hover:bg-red-500/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteVideo(video);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Excluir vídeo</span>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border-white/10 text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <span className="text-sm text-white/60">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border-white/10 text-white"
        >
          Próxima
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
