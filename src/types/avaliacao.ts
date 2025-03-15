// Video Upload and Analysis Types
export interface VideoUpload {
  id: string;
  user_id: string;
  filename: string;
  gcs_path: string;
  content_type: string;
  size: number;
  created_at: string;
}

export interface AvaliacaoRequest {
  video_uri: string;
  matricula: string;
  checklist_id: string;
}

// Video Analysis Types
export interface VideoAnalysisMarker {
  id: string;
  timestamp: number;
  type: 'technique' | 'safety' | 'efficiency' | 'critical';
  description: string;
  score?: number;
}

// Video Player Types
export interface VideoQualityConfig {
  width: number;
  height: number;
  bitrate: number;
  label: string;
}

export interface VideoPlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  error: string | null;
  quality?: 'low' | 'medium' | 'high';
  playbackRate?: number;
}

export interface VideoPlayerEvents {
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
  onMarkerClick?: (marker: VideoAnalysisMarker) => void;
  onAnalysisComplete?: (data: any) => void;
}

export interface VideoPlayerControls {
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

export interface VideoPlayerProps extends VideoPlayerEvents, VideoPlayerControls {
  src: string;
  poster?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  markers?: VideoAnalysisMarker[];
}

// Video Reference Types
export interface MediaRecorderRef {
  current: MediaRecorder | null;
}

export interface VideoRef {
  current: HTMLVideoElement | null;
}

export interface ChunksRef {
  current: BlobPart[];
}
