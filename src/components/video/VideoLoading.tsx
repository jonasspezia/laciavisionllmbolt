import { Loader2 } from 'lucide-react';
import { VideoLoadingProps } from './types';

export const VideoLoading = ({ message = 'Carregando vídeo médico...' }: VideoLoadingProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90">
      <div className="text-center space-y-2">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        <p className="text-sm text-gray-200">{message}</p>
      </div>
    </div>
  );
};
