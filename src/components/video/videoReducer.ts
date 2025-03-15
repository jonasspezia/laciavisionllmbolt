import { VideoPlaybackState, VideoQualityConfig } from '@/types/avaliacao';

export type VideoAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_QUALITY'; payload: 'low' | 'medium' | 'high' }
  | { type: 'SET_PLAYBACK_RATE'; payload: number };

export const initialState: VideoPlaybackState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isLoading: true,
  error: null,
  quality: 'high',
  playbackRate: 1
};

export function videoReducer(state: VideoPlaybackState, action: VideoAction): VideoPlaybackState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'SET_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_QUALITY':
      return { ...state, quality: action.payload };
    case 'SET_PLAYBACK_RATE':
      return { ...state, playbackRate: action.payload };
    default:
      return state;
  }
}
