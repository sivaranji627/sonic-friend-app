import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SongCard } from "@/components/SongCard";
import { Playlist } from "@/components/Playlist";
import { UserLogin } from "@/components/UserLogin";
import { AIAssistant } from "@/components/AIAssistant";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Heart, Settings, Music, ListMusic } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-music.jpg";

// Sample data
const sampleSongs = [
  {
    id: "1",
    title: "Golden Sparrow",
    artist: "G.V. Prakash, Dhanush",
    duration: 240,
    albumArt: undefined,
    isPlaying: false,
    src: "https://drive.google.com/uc?export=download&id=1-g1Bn1-YFbzQzlX-1jPzwcu2alJlvgbP"
  },
  {
    id: "2", 
    title: "Thodu Vaanam",
    artist: "Harris Jayaraj",
    duration: 220,
    albumArt: undefined,
    isPlaying: false,
    src: "https://drive.google.com/uc?export=download&id=11QtqWOUJKc1WNo23Ec7oqrzTnhJaJRmo"
  }
];

const samplePlaylists = [
  {
    title: "Chill Vibes",
    songs: [],
    coverImage: undefined
  },
  {
    title: "Workout Energy",
    songs: [],
    coverImage: undefined
  },
  {
    title: "Focus Flow",
    songs: [],
    coverImage: undefined
  }
];

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState(sampleSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState(sampleSongs);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [userPlaylists, setUserPlaylists] = useState(samplePlaylists);
  const [likedPlaylists, setLikedPlaylists] = useState<string[]>([]);

  const handleLoginStatusChange = (isLoggedIn: boolean, username?: string) => {
    setUserLoggedIn(isLoggedIn);
    setCurrentUser(username || "");
  };

  const handlePlaySong = (song: any) => {
    // Update current track
    setCurrentTrack(song);
    setIsPlaying(true);
    
    // Update song playing states
    setSongs(prev => prev.map(s => ({
      ...s,
      isPlaying: s.id === song.id
    })));
  };

  const handleTogglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLikeSong = (songId: string) => {
    setLikedSongs(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const handleAddToPlaylist = (song: any, playlistTitle: string) => {
    setUserPlaylists(prev => 
      prev.map(playlist => 
        playlist.title === playlistTitle
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist
      )
    );
  };

  const handleLikePlaylist = (title: string) => {
    setLikedPlaylists(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-sm sm:text-lg font-bold text-primary-foreground">M</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-bold text-foreground">Melodify</h1>
            </div>
            
            <div className="hidden sm:block">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            <div className="flex items-center gap-2">
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
              <UserLogin onLoginStatusChange={handleLoginStatusChange} />
            </div>
          </div>
          
          {/* Mobile Search Bar */}
          <div className="sm:hidden mt-3">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-20"></div>
        <img 
          src={heroImage} 
          alt="Music Hero"
          className="w-full h-48 sm:h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-lg">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-lg">Welcome to Melodify</h2>
            <p className="text-sm sm:text-lg md:text-xl opacity-90 drop-shadow">Your AI-powered music companion awaits! 🎶</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8">
            <TabsTrigger value="discover" className="text-xs sm:text-sm">Discover</TabsTrigger>
            <TabsTrigger value="playlists" className="text-xs sm:text-sm">Playlists</TabsTrigger>
            <TabsTrigger value="library" className="text-xs sm:text-sm">Library</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6 sm:space-y-8">
            {/* Featured Songs */}
            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Trending Now</h3>
               <div className="grid gap-4">
                 {(searchQuery ? filteredSongs : songs).map((song) => (
                    <SongCard
                      key={song.id}
                      song={song}
                      onPlay={handlePlaySong}
                      onTogglePlayPause={handleTogglePlayPause}
                      isLiked={likedSongs.includes(song.id)}
                      onLike={handleLikeSong}
                      context="library"
                      onAddToLibrary={(song) => {
                        console.log('Adding to library:', song.title);
                      }}
                      onRemoveFromLibrary={(song) => {
                        console.log('Removing from library:', song.title);
                      }}
                    />
                  ))}
               </div>
            </section>

            {/* Quick Playlists */}
            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Made for You</h3>
              <Card className="p-6 sm:p-8 text-center shadow-card">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-primary mx-auto flex items-center justify-center">
                    <Music className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-medium text-foreground">No Personalized Playlists Yet</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Start listening to music and we'll create personalized playlists just for you!
                  </p>
                </div>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="playlists" className="space-y-6 sm:space-y-8">
            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Your Playlists</h3>
              <Card className="p-6 sm:p-8 text-center shadow-card">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-primary mx-auto flex items-center justify-center">
                    <ListMusic className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-medium text-foreground">No Playlists Yet</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Create your first playlist to organize your favorite songs!
                  </p>
                </div>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="library" className="space-y-6 sm:space-y-8">
            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Your Music Library</h3>
              
              {/* Liked Songs Section */}
              {likedSongs.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Liked Songs ({likedSongs.length})
                  </h4>
                  <div className="space-y-4">
                    {songs.filter(song => likedSongs.includes(song.id)).map(song => (
                      <SongCard
                        key={song.id}
                        song={song}
                        onPlay={handlePlaySong}
                        onTogglePlayPause={handleTogglePlayPause}
                        isLiked={true}
                        onLike={handleLikeSong}
                        context="liked"
                        onAddToPlaylist={(song) => {
                          // Add to first playlist as example
                          handleAddToPlaylist(song, samplePlaylists[0].title);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Rest of Library */}
              <Card className="p-6 sm:p-8 text-center shadow-card">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-primary mx-auto flex items-center justify-center">
                    <Music className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-medium text-foreground">Start Building Your Library</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Like songs, create playlists, and let our AI assistant help you discover amazing music!
                  </p>
                </div>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </main>

      {/* Music Player */}
      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handleTogglePlayPause}
        onNext={() => {
          const currentIndex = songs.findIndex(s => s.id === currentTrack?.id);
          const nextSong = songs[(currentIndex + 1) % songs.length];
          handlePlaySong(nextSong);
        }}
        onPrevious={() => {
          const currentIndex = songs.findIndex(s => s.id === currentTrack?.id);
          const prevSong = songs[(currentIndex - 1 + songs.length) % songs.length];
          handlePlaySong(prevSong);
        }}
      />

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default Index;