import { VideoControls } from "./VideoControls";
import { useRef, useState } from "react";

interface VideoPlayerProps {
  filePath: string;
}

export function VideoPlayer({ filePath }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
    }
  };

  const handleTimeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  return (
    <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative shadow-lg">
      <video
        ref={videoRef}
        src={`https://pvfrynqcarvlorflzdqi.supabase.co/storage/v1/object/public/bucketdolacia/${filePath}`}
        className="w-full h-full object-cover"
        preload="metadata"
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent">
        <VideoControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          onPlayPause={handleVideoClick}
          onVolumeChange={handleVolumeChange}
          onTimeChange={handleTimeChange}
        />
      </div>
    </div>
  );
}
