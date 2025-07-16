import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Search, Upload, ListMusic, Album, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const samplePlaylists = [
  {
    id: "1",
    name: "Chill Vibes",
    description: "Perfect for relaxing and unwinding",
    type: "Playlist",
    songs: 24,
    duration: "1h 32m",
    followers: "12K",
    featured: true,
    createdDate: "2024-01-10"
  },
  {
    id: "2",
    name: "Workout Hits",
    description: "High-energy tracks to fuel your workout",
    type: "Playlist",
    songs: 35,
    duration: "2h 15m",
    followers: "8.5K",
    featured: false,
    createdDate: "2024-01-08"
  }
];

const sampleAlbums = [
  {
    id: "1",
    name: "Midnight Dreams",
    artist: "Luna Rose",
    type: "Album",
    songs: 10,
    duration: "42m",
    releaseDate: "2024-01-15",
    genre: "Indie Pop"
  },
  {
    id: "2",
    name: "Digital Pulse",
    artist: "Neon Nights",
    type: "Album",
    songs: 8,
    duration: "35m",
    releaseDate: "2024-01-10",
    genre: "Electronic"
  }
];

export function PlaylistManagement() {
  const [playlists, setPlaylists] = useState(samplePlaylists);
  const [albums, setAlbums] = useState(sampleAlbums);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false);
  const [isAddAlbumOpen, setIsAddAlbumOpen] = useState(false);
  const { toast } = useToast();

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAlbums = albums.filter(album =>
    album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Playlist Created",
      description: "New playlist has been created successfully.",
    });
    setIsAddPlaylistOpen(false);
  };

  const handleAddAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Album Added",
      description: "New album has been added successfully.",
    });
    setIsAddAlbumOpen(false);
  };

  const toggleFeatured = (playlistId: string) => {
    setPlaylists(prev => prev.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, featured: !playlist.featured }
        : playlist
    ));
    
    const playlist = playlists.find(p => p.id === playlistId);
    toast({
      title: playlist?.featured ? "Removed from Featured" : "Added to Featured",
      description: `${playlist?.name} has been ${playlist?.featured ? "removed from" : "added to"} featured playlists.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Playlists & Albums</h2>
          <p className="text-muted-foreground">Manage curated playlists and artist albums</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isAddPlaylistOpen} onOpenChange={setIsAddPlaylistOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Playlist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Playlist</DialogTitle>
                <DialogDescription>
                  Create a curated playlist for users
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddPlaylist} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="playlistName">Playlist Name</Label>
                  <Input id="playlistName" placeholder="Enter playlist name" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="playlistDesc">Description</Label>
                  <Textarea 
                    id="playlistDesc" 
                    placeholder="Enter playlist description..." 
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="playlistCover">Cover Image</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload cover image</p>
                    <Input type="file" accept="image/*" className="hidden" id="playlistCover" />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddPlaylistOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Playlist</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddAlbumOpen} onOpenChange={setIsAddAlbumOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Album
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Album</DialogTitle>
                <DialogDescription>
                  Add a new artist album to the platform
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddAlbum} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="albumName">Album Name</Label>
                    <Input id="albumName" placeholder="Enter album name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="albumArtist">Artist</Label>
                    <Input id="albumArtist" placeholder="Enter artist name" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="albumGenre">Genre</Label>
                    <Input id="albumGenre" placeholder="Enter genre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="releaseDate">Release Date</Label>
                    <Input id="releaseDate" type="date" />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddAlbumOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Album</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search playlists or albums..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Playlists and Albums */}
      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="playlists">
            <ListMusic className="h-4 w-4 mr-2" />
            Playlists ({filteredPlaylists.length})
          </TabsTrigger>
          <TabsTrigger value="albums">
            <Album className="h-4 w-4 mr-2" />
            Albums ({filteredAlbums.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="space-y-4">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Playlist</TableHead>
                    <TableHead>Songs</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Followers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlaylists.map((playlist) => (
                    <TableRow key={playlist.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                            <ListMusic className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{playlist.name}</p>
                            <p className="text-sm text-muted-foreground">{playlist.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{playlist.songs}</TableCell>
                      <TableCell>{playlist.duration}</TableCell>
                      <TableCell>{playlist.followers}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {playlist.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => toggleFeatured(playlist.id)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="albums" className="space-y-4">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Album</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Songs</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlbums.map((album) => (
                    <TableRow key={album.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                            <Album className="h-4 w-4" />
                          </div>
                          <p className="font-medium">{album.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>{album.artist}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{album.genre}</Badge>
                      </TableCell>
                      <TableCell>{album.songs}</TableCell>
                      <TableCell>{album.duration}</TableCell>
                      <TableCell>{album.releaseDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}