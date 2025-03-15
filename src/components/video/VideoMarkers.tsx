import { cn } from "@/lib/utils";
import { VideoAnalysisMarker } from "@/types/avaliacao";
import { VideoMarkersProps } from "./types";

export const VideoMarkers = ({ markers, currentTime, duration, onMarkerClick }: VideoMarkersProps) => {
  return (
    <div className="relative w-full h-8 bg-secondary/20 rounded-full">
      {markers.map((marker) => {
        const position = (marker.timestamp / duration) * 100;
        const isActive = Math.abs(currentTime - marker.timestamp) < 0.5;

        return (
          <button
            key={marker.id}
            className={cn(
              'absolute w-2 h-6 -mt-3 rounded-full transform -translate-x-1/2 transition-all',
              {
                'bg-red-500': marker.type === 'critical',
                'bg-yellow-500': marker.type === 'technique',
                'bg-blue-500': marker.type === 'safety',
                'bg-green-500': marker.type === 'efficiency',
                'scale-125': isActive
              }
            )}
            style={{ left: `${position}%` }}
            onClick={() => onMarkerClick(marker)}
            title={marker.description}
          >
            <span className="sr-only">
              {marker.type} marker: {marker.description}
            </span>
          </button>
        );
      })}
      
      {/* Current time indicator */}
      <div
        className="absolute w-1 h-full bg-primary rounded-full transition-all transform -translate-x-1/2"
        style={{ left: `${(currentTime / duration) * 100}%` }}
      />
    </div>
  );
};
