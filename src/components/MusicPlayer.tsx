import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  albumArt?: string;
}

interface MusicPlayerProps {
  currentTrack?: Track;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const MusicPlayer = ({ 
  currentTrack, 
  isPlaying = false, 
  onPlayPause, 
  onNext, 
  onPrevious 
}: MusicPlayerProps) => {
  const [progress, setProgress] = useState([30]);
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-card border-t border-border p-3 sm:p-4 shadow-player">
        <div className="flex items-center justify-center text-muted-foreground">
          <p className="text-xs sm:text-sm">🎵 Choose a song to start your musical journey!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-card border-t border-border p-3 sm:p-4 shadow-player">
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="flex items-center gap-3 mb-2">
          {/* Track Info */}
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex-shrink-0 flex items-center justify-center">
            {currentTrack.albumArt ? (
              <img 
                src={currentTrack.albumArt} 
                alt={currentTrack.title}
                className="w-full h-full rounded-lg object-cover"
              />
            ) : (
              <span className="text-sm">🎵</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm text-foreground truncate">{currentTrack.title}</p>
            <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
          
          {/* Mobile Controls */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onPrevious}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              onClick={onPlayPause}
              className="bg-gradient-primary hover:bg-primary/90 w-8 h-8 rounded-full transition-bounce"
            >
              {isPlaying ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3 ml-0.5" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={onNext}>
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Progress Bar */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatTime(Math.floor((progress[0] / 100) * currentTrack.duration))}</span>
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="flex-1"
          />
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center gap-4 max-w-7xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex-shrink-0 flex items-center justify-center">
            {currentTrack.albumArt ? (
              <img 
                src={currentTrack.albumArt} 
                alt={currentTrack.title}
                className="w-full h-full rounded-lg object-cover"
              />
            ) : (
              <span className="text-lg">🎵</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-foreground truncate">{currentTrack.title}</p>
            <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className="flex-shrink-0"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onPrevious}>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button 
              onClick={onPlayPause}
              className="bg-gradient-primary hover:bg-primary/90 w-10 h-10 rounded-full transition-bounce"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={onNext}>
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full text-xs text-muted-foreground">
            <span>{formatTime(Math.floor((progress[0] / 100) * currentTrack.duration))}</span>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="flex-1"
            />
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};