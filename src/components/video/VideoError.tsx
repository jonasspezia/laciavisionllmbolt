import { AlertCircle } from 'lucide-react';
import { VideoErrorProps } from './types';

export const VideoError = ({ message }: VideoErrorProps) => {
  return (
    <div className="rounded-lg bg-red-50 p-4 text-red-800 text-center">
      <AlertCircle className="w-6 h-6 mx-auto mb-2" />
      <p>{message}</p>
    </div>
  );
};
