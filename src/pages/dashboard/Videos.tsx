import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Video, Upload, History } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/ui/loading";
import { VideoPreview } from "@/components/videos/VideoPreview";
import { VideosList } from "@/components/videos/VideosList";
import { VideoAnalysisCard } from "@/components/videos/VideoAnalysisCard";
import { VideoSearchFilters } from "@/components/videos/VideoSearchFilters";
import { DeleteVideoDialog } from "@/components/videos/DeleteVideoDialog";
import { VideoUploadSection } from "@/components/videos/VideoUploadSection";
import { VideoItem } from "@/types/video";
import { motion } from "framer-motion";
import { useVideos } from "@/hooks/useVideos";
import type { ChecklistTemplate } from "@/types/checklist";

export default function Videos() {
  const [checklists, setChecklists] = useState<ChecklistTemplate[]>([]);
  const [selectedVideoForAnalysis, setSelectedVideoForAnalysis] = useState<VideoItem | null>(null);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [selectedVideoForPreview, setSelectedVideoForPreview] = useState<string | null>(null);
  const [videoToDelete, setVideoToDelete] = useState<VideoItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();

  const {
    videos,
    setVideos,
    isLoadingVideos,
    currentPage,
    setCurrentPage,
    totalPages,
    statusFilter,
    setStatusFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    debouncedSearch,
    loadVideos
  } = useVideos(user?.id);

  useEffect(() => {
    loadChecklists();
  }, [user]);

  useEffect(() => {
    loadVideos();
  }, [user, currentPage, statusFilter, startDate, endDate]);

  const loadChecklists = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('checklist_templates')
        .select('*')
        .eq('status', 'active');

      if (error) throw error;
      setChecklists(data || []);
    } catch (error) {
      console.error('Erro ao carregar checklists:', error);
    }
  };

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideoForAnalysis(video);
  };

  const handleVideoPreview = (videoPath: string) => {
    setSelectedVideoForPreview(videoPath);
    setIsVideoDialogOpen(true);
  };

  const handleDeleteVideo = async () => {
    if (!videoToDelete) return;

    try {
      setIsDeleting(true);

      const { error: analysisError } = await supabase
        .from('video_analyses')
        .delete()
        .eq('video_id', videoToDelete.id);

      if (analysisError) throw analysisError;

      const { error: storageError } = await supabase.storage
        .from('videos')
        .remove([videoToDelete.file_path]);

      if (storageError) throw storageError;

      const { error: videoError } = await supabase
        .from('videos')
        .delete()
        .eq('id', videoToDelete.id);

      if (videoError) throw videoError;

      setVideos(videos.filter(v => v.id !== videoToDelete.id));
      setVideoToDelete(null);
      
      if (selectedVideoForAnalysis?.id === videoToDelete.id) {
        setSelectedVideoForAnalysis(null);
      }

    } catch (error) {
      console.error('Erro ao excluir vídeo:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="py-8 px-6 max-w-[1400px] mx-auto">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-lg overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 p-8 border-b border-white/10"
        >
          <div className="p-3 rounded-xl bg-white/5">
            <Video className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl font-semibold text-white">
              Vídeos Analisados
            </h1>
            <p className="text-sm text-white/60">
              Grave, faça upload e analise seus vídeos com IA avançada
            </p>
          </div>
        </motion.div>

        <div className="p-8">
          <Tabs defaultValue="upload" className="space-y-8">
            <div className="flex justify-center px-4">
              <TabsList className="w-full max-w-md bg-white/5 border border-white/10 p-1 flex gap-2">
                <TabsTrigger 
                  value="upload" 
                  className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none bg-transparent text-white/70 border border-transparent hover:border-white/20 px-6 py-3 rounded-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Upload className="h-5 w-5" />
                    <span className="font-medium">Nova Gravação</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="list" 
                  className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none bg-transparent text-white/70 border border-transparent hover:border-white/20 px-6 py-3 rounded-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-3">
                    <History className="h-5 w-5" />
                    <span className="font-medium">Histórico</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upload" className="space-y-8 px-4">
              <VideoUploadSection 
                checklists={checklists} 
                onUploadComplete={loadVideos}
                userId={user?.id || ''}
              />
            </TabsContent>

            <TabsContent value="list" className="space-y-6 px-4">
              <VideoSearchFilters
                onSearchChange={(e) => debouncedSearch(e.target.value)}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                startDate={startDate}
                endDate={endDate}
                onDateChange={(range) => {
                  setStartDate(range?.from ?? null);
                  setEndDate(range?.to ?? null);
                }}
              />

              {isLoadingVideos ? (
                <div className="flex items-center justify-center py-12">
                  <Loading className="w-8 h-8 text-primary" />
                </div>
              ) : videos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Video className="w-16 h-16 text-white/20" />
                  <p className="text-white/60 text-center">
                    Nenhum vídeo encontrado
                  </p>
                </div>
              ) : (
                <VideosList
                  videos={videos}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  onVideoClick={handleVideoClick}
                  onVideoPreview={handleVideoPreview}
                  selectedVideoId={selectedVideoForAnalysis?.id}
                  onDeleteVideo={setVideoToDelete}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </Card>

      <Dialog 
        open={isVideoDialogOpen} 
        onOpenChange={setIsVideoDialogOpen}
      >
        <DialogContent className="max-w-4xl bg-gray-900/95 border-white/10">
          {selectedVideoForPreview && (
            <div className="aspect-video">
              <VideoPreview videoUrl={selectedVideoForPreview} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {selectedVideoForAnalysis?.analysis_feedback && (
        <div className="mt-8">
          <VideoAnalysisCard video={selectedVideoForAnalysis} />
        </div>
      )}

      <DeleteVideoDialog
        isOpen={!!videoToDelete}
        isDeleting={isDeleting}
        onClose={() => setVideoToDelete(null)}
        onConfirm={handleDeleteVideo}
      />
    </div>
  );
}
