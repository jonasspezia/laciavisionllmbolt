import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { VideoAnalysisMarker } from '@/types/avaliacao';

interface VideoAnalyzerProps {
  videoUrl?: string;
  onAnalysisComplete?: (markers: VideoAnalysisMarker[]) => void;
}

const demoMarkers: VideoAnalysisMarker[] = [
  {
    id: '1',
    timestamp: 15.5,
    type: 'technique',
    description: 'Técnica de assepsia correta',
    score: 1
  },
  {
    id: '2',
    timestamp: 45.2,
    type: 'safety',
    description: 'Manuseio seguro do equipamento',
    score: 1
  },
  {
    id: '3',
    timestamp: 78.3,
    type: 'critical',
    description: 'Atenção à esterilidade necessária',
    score: 0
  }
];

export const VideoAnalyzer = ({
  videoUrl = '/videos/procedure.mp4',
  onAnalysisComplete
}: VideoAnalyzerProps) => {
  const [isReady, setIsReady] = useState(false);
  const { toast } = useToast();

  const handleVideoError = (error: Error) => {
    toast({
      title: "Erro na análise",
      description: "Não foi possível carregar o vídeo do procedimento médico.",
      variant: "destructive"
    });
  };

  const handleVideoProgress = (progress: number) => {
    console.log(`Progresso do carregamento: ${progress}%`);
  };

  const handleMarkerDetected = (marker: VideoAnalysisMarker) => {
    toast({
      title: `Momento ${marker.type} detectado`,
      description: marker.description,
      variant: marker.type === 'critical' ? 'destructive' : 'default'
    });
  };

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Análise de Procedimento Médico
      </h2>
      
      <VideoPlayer
        src={videoUrl}
        poster="/thumbnails/procedure.jpg"
        onLoad={() => {
          setIsReady(true);
          onAnalysisComplete?.(demoMarkers);
        }}
        onError={handleVideoError}
        onProgress={handleVideoProgress}
        quality="high"
        className="rounded-lg shadow-lg"
        markers={demoMarkers}
        onMarkerClick={handleMarkerDetected}
      />

      {isReady && (
        <div className="mt-4 space-y-4">
          <p className="text-gray-600">
            Vídeo carregado e pronto para análise.
          </p>
        </div>
      )}
    </Card>
  );
};

export default VideoAnalyzer;
