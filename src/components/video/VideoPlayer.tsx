import { useEffect, useRef, useReducer } from 'react';
import { cn } from "@/lib/utils";
import { VideoPlayerProps } from '@/types/avaliacao';
import { videoReducer, initialState } from './videoReducer';
import { useToast } from '@/components/ui/use-toast';
import { VideoError } from './VideoError';
import { VideoLoading } from './VideoLoading';
import { VideoControls } from './VideoControls';
import { VideoMarkers } from './VideoMarkers';
import { Slider } from '@/components/ui/slider';
import { QUALITY_CONFIGS, FRAME_TIME } from './types';

export const VideoPlayer = ({
  src,
  poster,
  onLoad,
  className,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  width = '100%',
  height = 'auto',
  quality = 'high',
  onError,
  onProgress,
  onTimeUpdate,
  onEnded,
  markers = [],
  onMarkerClick,
  onAnalysisComplete
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackState, dispatch] = useReducer(videoReducer, initialState);
  const { toast } = useToast();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const configureQuality = async () => {
      try {
        if ('connection' in navigator) {
          const connection = (navigator as any).connection;
          if (connection) {
            const effectiveType = connection.effectiveType;
            const downlink = connection.downlink;

            if (effectiveType === '4g' && downlink >= 5) {
              dispatch({ type: 'SET_QUALITY', payload: 'high' });
            } else if (effectiveType === '4g' || effectiveType === '3g') {
              dispatch({ type: 'SET_QUALITY', payload: 'medium' });
            } else {
              dispatch({ type: 'SET_QUALITY', payload: 'low' });
            }
          }
        }
      } catch (error) {
        console.error('Error configuring video quality:', error);
      }
    };

    configureQuality();

    const handleLoadedMetadata = () => {
      dispatch({ type: 'SET_DURATION', payload: video.duration });
      dispatch({ type: 'SET_LOADING', payload: false });
      onLoad?.();
    };

    const handleTimeUpdate = () => {
      dispatch({ type: 'SET_TIME', payload: video.currentTime });
      onTimeUpdate?.(video.currentTime);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const progress = (video.buffered.end(0) / video.duration) * 100;
        onProgress?.(progress);
      }
    };

    const handleError = () => {
      const errorMessage = 'Erro ao carregar o vídeo. Por favor, tente novamente.';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      onError?.(new Error(errorMessage));
      toast({
        title: "Erro no vídeo",
        description: errorMessage,
        variant: "destructive"
      });
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', onEnded);
    video.addEventListener('play', () => dispatch({ type: 'SET_PLAYING', payload: true }));
    video.addEventListener('pause', () => dispatch({ type: 'SET_PLAYING', payload: false }));

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('play', () => dispatch({ type: 'SET_PLAYING', payload: true }));
      video.removeEventListener('pause', () => dispatch({ type: 'SET_PLAYING', payload: false }));
    };
  }, [onLoad, onTimeUpdate, onProgress, onError, onEnded, toast]);

  const handleFrameByFrame = (direction: 'forward' | 'backward') => {
    if (videoRef.current) {
      const newTime = videoRef.current.currentTime + (direction === 'forward' ? FRAME_TIME : -FRAME_TIME);
      videoRef.current.currentTime = Math.max(0, Math.min(newTime, playbackState.duration));
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (playbackState.isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  if (playbackState.error) {
    return <VideoError message={playbackState.error} />;
  }

  return (
    <div 
      className={cn(
        "relative rounded-lg overflow-hidden bg-gray-900",
        className
      )}
      style={{ width, height }}
    >
      {playbackState.isLoading && <VideoLoading />}

      <video
        ref={videoRef}
        className={cn(
          "w-full h-full object-contain",
          playbackState.isLoading ? "opacity-0" : "opacity-100",
          "transition-opacity duration-300"
        )}
        poster={poster}
        preload="metadata"
        playsInline
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={false}
      >
        <source
          src={`${src}?quality=${quality}`}
          type="video/mp4"
          media={`(min-width: ${QUALITY_CONFIGS[quality].width}px)`}
        />
        {Object.entries(QUALITY_CONFIGS).map(([q, config]) => (
          <source
            key={q}
            src={`${src}?quality=${q}`}
            type="video/mp4"
            media={`(max-width: ${config.width - 1}px)`}
          />
        ))}
      </video>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
        <div className="relative w-full h-10 mb-2">
          <Slider
            value={[playbackState.currentTime]}
            max={playbackState.duration}
            step={FRAME_TIME}
            onValueChange={([value]) => {
              if (videoRef.current) {
                videoRef.current.currentTime = value;
              }
            }}
            className="absolute inset-0"
          />
          <VideoMarkers
            markers={markers}
            currentTime={playbackState.currentTime}
            duration={playbackState.duration}
            onMarkerClick={onMarkerClick}
          />
        </div>

        <VideoControls
          isPlaying={playbackState.isPlaying}
          currentTime={playbackState.currentTime}
          duration={playbackState.duration}
          volume={playbackState.volume}
          onPlayPause={togglePlayPause}
          onFrameStep={handleFrameByFrame}
          onVolumeChange={(value) => {
            dispatch({ type: 'SET_VOLUME', payload: value });
            if (videoRef.current) {
              videoRef.current.volume = value;
            }
          }}
          onFullscreen={() => videoRef.current?.requestFullscreen()}
          onTimeChange={(time) => {
            if (videoRef.current) {
              videoRef.current.currentTime = time;
            }
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
