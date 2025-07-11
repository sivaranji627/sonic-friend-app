import { Play, Pause, Heart, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  albumArt?: string;
  isPlaying?: boolean;
}

interface SongCardProps {
  song: Song;
  onPlay?: (song: Song) => void;
  onTogglePlayPause?: (song: Song) => void;
  showAlbumArt?: boolean;
  isLiked?: boolean;
  onLike?: (songId: string) => void;
}

export const SongCard = ({ 
  song, 
  onPlay, 
  onTogglePlayPause, 
  showAlbumArt = true, 
  isLiked = false,
  onLike 
}: SongCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayClick = () => {
    if (song.isPlaying) {
      onTogglePlayPause?.(song);
    } else {
      onPlay?.(song);
    }
  };

  return (
    <Card 
      className="group p-4 shadow-card hover:shadow-glow transition-smooth cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !song.isPlaying && onPlay?.(song)}
    >
      <div className="flex items-center gap-4">
        {/* Album Art */}
        {showAlbumArt && (
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center overflow-hidden">
              {song.albumArt ? (
                <img 
                  src={song.albumArt} 
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl">🎵</span>
              )}
            </div>
            
            {/* Play/Pause Overlay */}
            {(isHovered || song.isPlaying) && (
              <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayClick();
                  }}
                  className="bg-white/90 hover:bg-white text-black w-8 h-8 rounded-full transition-bounce"
                >
                  {song.isPlaying ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3 ml-0.5" />
                  )}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-smooth">
            {song.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
        </div>

        {/* Duration and Actions */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onLike?.(song.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-smooth"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          
          <span className="text-sm min-w-[40px] text-right">
            {formatDuration(song.duration)}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-smooth"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};