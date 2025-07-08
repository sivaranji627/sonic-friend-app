import { useState } from "react";
import { Play, Pause, Plus, Heart, MoreHorizontal, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SongCard } from "./SongCard";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  albumArt?: string;
  isPlaying?: boolean;
}

interface PlaylistProps {
  title: string;
  songs: Song[];
  coverImage?: string;
  totalDuration?: number;
  onPlaySong?: (song: Song) => void;
  onTogglePlayPause?: (song: Song) => void;
  isCompact?: boolean;
}

export const Playlist = ({ 
  title, 
  songs, 
  coverImage, 
  totalDuration,
  onPlaySong, 
  onTogglePlayPause,
  isCompact = false 
}: PlaylistProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const calculateTotalDuration = () => {
    if (totalDuration) return totalDuration;
    return songs.reduce((acc, song) => acc + song.duration, 0);
  };

  const handlePlayAll = () => {
    if (songs.length > 0) {
      setIsPlaying(!isPlaying);
      onPlaySong?.(songs[0]);
    }
  };

  if (isCompact) {
    return (
      <Card className="p-4 shadow-card hover:shadow-glow transition-smooth">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-primary flex-shrink-0 flex items-center justify-center overflow-hidden">
            {coverImage ? (
              <img src={coverImage} alt={title} className="w-full h-full object-cover" />
            ) : (
              <Music className="h-8 w-8 text-primary-foreground" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {songs.length} songs • {formatTotalDuration(calculateTotalDuration())}
            </p>
          </div>

          <Button
            onClick={handlePlayAll}
            size="sm"
            className="bg-gradient-primary hover:bg-primary/90 rounded-full"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Playlist Header */}
      <div className="flex items-end gap-6 p-6 bg-gradient-card rounded-lg shadow-card">
        <div className="w-48 h-48 rounded-lg bg-gradient-primary flex-shrink-0 flex items-center justify-center overflow-hidden shadow-glow">
          {coverImage ? (
            <img src={coverImage} alt={title} className="w-full h-full object-cover" />
          ) : (
            <Music className="h-20 w-20 text-primary-foreground" />
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Playlist</p>
            <h1 className="text-4xl font-bold text-foreground mt-2">{title}</h1>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{songs.length} songs</span>
            <span>•</span>
            <span>{formatTotalDuration(calculateTotalDuration())}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={handlePlayAll}
              size="lg"
              className="bg-gradient-primary hover:bg-primary/90 rounded-full px-8 shadow-glow transition-bounce"
            >
              {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2 ml-0.5" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsLiked(!isLiked)}
              className="rounded-full"
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            
            <Button variant="ghost" size="lg" className="rounded-full">
              <Plus className="h-6 w-6" />
            </Button>
            
            <Button variant="ghost" size="lg" className="rounded-full">
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="space-y-2">
        {songs.map((song, index) => (
          <div key={song.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/30 transition-smooth group">
            <span className="text-muted-foreground text-sm w-8 text-center group-hover:hidden">
              {index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPlaySong?.(song)}
              className="w-8 h-8 rounded-full hidden group-hover:flex"
            >
              {song.isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
            </Button>
            
            <SongCard
              song={song}
              onPlay={onPlaySong}
              onTogglePlayPause={onTogglePlayPause}
              showAlbumArt={false}
            />
          </div>
        ))}
      </div>

      {songs.length === 0 && (
        <div className="text-center py-12">
          <Music className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No songs yet</h3>
          <p className="text-muted-foreground">Start adding songs to build your perfect playlist!</p>
        </div>
      )}
    </div>
  );
};