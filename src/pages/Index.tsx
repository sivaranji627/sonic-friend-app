import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SongCard } from "@/components/SongCard";
import { Playlist } from "@/components/Playlist";
import { UserLogin } from "@/components/UserLogin";
import { AIAssistant } from "@/components/AIAssistant";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    songs: sampleSongs.slice(0, 3),
    coverImage: undefined
  },
  {
    title: "Workout Energy",
    songs: sampleSongs.slice(1),
    coverImage: undefined
  },
  {
    title: "Focus Flow",
    songs: sampleSongs,
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

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">M</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Melodify</h1>
            </div>
            
            <SearchBar onSearch={handleSearch} />
            
            <UserLogin onLoginStatusChange={handleLoginStatusChange} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-20"></div>
        <img 
          src={heroImage} 
          alt="Music Hero"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">Welcome to Melodify</h2>
            <p className="text-xl opacity-90 drop-shadow">Your AI-powered music companion awaits! 🎶</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="library">Your Library</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-8">
            {/* Featured Songs */}
            <section>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Trending Now 🔥</h3>
               <div className="grid gap-4">
                 {(searchQuery ? filteredSongs : songs).map((song) => (
                   <SongCard
                     key={song.id}
                     song={song}
                     onPlay={handlePlaySong}
                     onTogglePlayPause={handleTogglePlayPause}
                   />
                 ))}
               </div>
            </section>

            {/* Quick Playlists */}
            <section>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Made for You ✨</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {samplePlaylists.map((playlist, index) => (
                  <Playlist
                    key={index}
                    title={playlist.title}
                    songs={playlist.songs}
                    coverImage={playlist.coverImage}
                    onPlaySong={handlePlaySong}
                    onTogglePlayPause={handleTogglePlayPause}
                    isCompact
                  />
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="playlists" className="space-y-8">
            <section>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Your Playlists 🎵</h3>
              <div className="space-y-8">
                {samplePlaylists.map((playlist, index) => (
                  <Playlist
                    key={index}
                    title={playlist.title}
                    songs={playlist.songs}
                    coverImage={playlist.coverImage}
                    onPlaySong={handlePlaySong}
                    onTogglePlayPause={handleTogglePlayPause}
                  />
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="library" className="space-y-8">
            <section>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Your Music Library 📚</h3>
              <Card className="p-8 text-center shadow-card">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto flex items-center justify-center">
                    <span className="text-2xl">🎼</span>
                  </div>
                  <h4 className="text-xl font-medium text-foreground">Start Building Your Library</h4>
                  <p className="text-muted-foreground">
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