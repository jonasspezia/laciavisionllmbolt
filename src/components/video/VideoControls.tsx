import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Maximize, Volume2 } from 'lucide-react';
import { VideoControlsProps } from './types';

export const VideoControls = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  onPlayPause,
  onFrameStep,
  onVolumeChange,
  onFullscreen,
  onTimeChange
}: VideoControlsProps) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 100);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFrameStep('backward')}
          className="text-white hover:bg-white/20"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onPlayPause}
          className="text-white hover:bg-white/20"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFrameStep('forward')}
          className="text-white hover:bg-white/20"
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2 ml-4">
          <Volume2 className="h-4 w-4 text-white" />
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            className="w-24"
            onValueChange={([value]) => onVolumeChange(value / 100)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-white">
        <span className="text-sm font-medium">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onFullscreen}
          className="text-white hover:bg-white/20"
        >
          <Maximize className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
