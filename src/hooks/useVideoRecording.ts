import { useState, useRef, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface UseVideoRecordingReturn {
  isRecording: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  handleDiscardVideo: () => void;
  videoUrl: string | null;
  selectedFile: File | null;
}

export const useVideoRecording = (): UseVideoRecordingReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const createVideoFromBlob = useCallback((blob: Blob) => {
    const timestamp = new Date().toISOString();
    const file = new File([blob], `recording-${timestamp}.webm`, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    setSelectedFile(file);
    setVideoUrl(url);
  }, []);

  const checkMediaRecorderSupport = useCallback(() => {
    if (!window.MediaRecorder) {
      throw new Error('Seu navegador não suporta gravação de vídeo. Por favor, tente usar um navegador mais recente como Chrome, Firefox ou Safari.');
    }
  }, []);

  const getMediaOptions = useCallback(() => {
    const options: MediaStreamConstraints = {
      audio: true,
      video: {
        width: { ideal: 1280, max: 1920 },
        height: { ideal: 720, max: 1080 },
        facingMode: 'user'
      }
    };
    return options;
  }, []);

  const requestPermissions = useCallback(async () => {
    try {
      checkMediaRecorderSupport();

      const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (result.state === 'denied') {
        throw new Error('Permissão de câmera foi negada. Por favor, habilite o acesso à câmera nas configurações do seu navegador.');
      }

      const audioResult = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      if (audioResult.state === 'denied') {
        throw new Error('Permissão de microfone foi negada. Por favor, habilite o acesso ao microfone nas configurações do seu navegador.');
      }
    } catch (error) {
      console.error('Erro ao verificar permissões:', error);
      throw error;
    }

    try {
      const mediaOptions = getMediaOptions();
      const stream = await navigator.mediaDevices.getUserMedia(mediaOptions);
      return stream;
    } catch (error: any) {
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        throw new Error('Por favor, permita o acesso à câmera e microfone para gravar o vídeo.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        throw new Error('Nenhuma câmera ou microfone encontrado. Por favor, conecte um dispositivo e tente novamente.');
      } else {
        throw new Error(`Erro ao acessar dispositivos de mídia: ${error.message || 'Erro desconhecido'}`);
      }
    }
  }, []);

  const setupMediaRecorder = useCallback((stream: MediaStream) => {
    const options = {
      mimeType: 'video/webm;codecs=vp8,opus',
      videoBitsPerSecond: 2500000, // 2.5 Mbps
      audioBitsPerSecond: 128000 // 128 kbps
    };

    const recorder = new MediaRecorder(stream, options);

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    recorder.onstop = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      createVideoFromBlob(blob);
      setRecordedChunks([]);
    };

    return recorder;
  }, [createVideoFromBlob]);

  const startRecording = async () => {
    try {
      const stream = await requestPermissions();
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(console.error);
      }

      const recorder = setupMediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start(1000);
      setIsRecording(true);

      toast({
        title: "Gravação iniciada",
        description: "Câmera e microfone ativados com sucesso."
      });
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error);
      toast({
        variant: "destructive",
        title: "Erro de gravação",
        description: error instanceof Error 
          ? error.message 
          : "Não foi possível iniciar a gravação. Verifique as permissões do navegador e tente novamente."
      });
    }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
      
      toast({
        title: "Gravação finalizada",
        description: "Seu vídeo foi gravado com sucesso."
      });
    }
  }, [mediaRecorder, toast]);

  const handleDiscardVideo = useCallback(() => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    
    setSelectedFile(null);
    setVideoUrl(null);
    setRecordedChunks([]);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    
    setIsRecording(false);
    
    toast({
      title: "Vídeo descartado",
      description: "O vídeo foi descartado com sucesso."
    });
  }, [videoUrl, mediaRecorder, toast]);

  return {
    isRecording,
    videoRef,
    startRecording,
    stopRecording,
    handleDiscardVideo,
    videoUrl,
    selectedFile
  };
};
