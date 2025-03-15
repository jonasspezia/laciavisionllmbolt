import { VideoAnalysisMarker, VideoQualityConfig } from '@/types/avaliacao';

export interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onFrameStep: (direction: 'forward' | 'backward') => void;
  onVolumeChange: (value: number) => void;
  onFullscreen: () => void;
  onTimeChange: (time: number) => void;
}

export interface VideoMarkersProps {
  markers: VideoAnalysisMarker[];
  currentTime: number;
  duration: number;
  onMarkerClick: (marker: VideoAnalysisMarker) => void;
}

export interface VideoErrorProps {
  message: string;
}

export interface VideoLoadingProps {
  message?: string;
}

export const QUALITY_CONFIGS: Record<'high' | 'medium' | 'low', VideoQualityConfig> = {
  high: { width: 1920, height: 1080, bitrate: 5000000, label: 'HD' },
  medium: { width: 1280, height: 720, bitrate: 2500000, label: 'SD' },
  low: { width: 854, height: 480, bitrate: 1000000, label: 'Low' }
};

export const FRAME_TIME = 1/30; // 30fps
