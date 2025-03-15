import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { VideoItem } from "@/types/video";
import debounce from "lodash/debounce";

export function useVideos(userId: string | undefined) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { toast } = useToast();
  const itemsPerPage = 9;

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
      setCurrentPage(1);
    }, 500),
    []
  );

  const loadVideos = async () => {
    if (!userId) return;

    try {
      setIsLoadingVideos(true);
      
      let query = supabase
        .from('videos')
        .select('*', { count: 'exact' })
        .eq('created_by', userId)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('file_name', `%${searchQuery}%`);
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
      if (endDate) {
        query = query.lte('created_at', new Date(endDate.setHours(23, 59, 59, 999)).toISOString());
      }

      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;

      if (error) throw error;

      if (count !== null) {
        setTotalPages(Math.ceil(count / itemsPerPage));
      }

      const formattedVideos: VideoItem[] = (data || []).map(video => ({
        ...video,
        analysis_feedback: video.analysis_feedback as VideoItem['analysis_feedback']
      }));

      setVideos(formattedVideos);
    } catch (error) {
      console.error('Erro ao carregar vídeos:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar vídeos",
        description: "Não foi possível carregar seus vídeos. Por favor, verifique sua conexão e tente novamente."
      });
    } finally {
      setIsLoadingVideos(false);
    }
  };

  return {
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
    loadVideos,
    itemsPerPage
  };
}
