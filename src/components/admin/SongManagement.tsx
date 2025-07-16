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
import { Plus, Edit, Trash2, Play, Heart, Search, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sampleSongs = [
  {
    id: "1",
    title: "Midnight Dreams",
    artist: "Luna Rose",
    album: "Nocturne",
    genre: "Pop",
    duration: "3:24",
    plays: "234K",
    likes: "12K",
    uploadDate: "2024-01-15"
  },
  {
    id: "2",
    title: "Electric Waves",
    artist: "Neon Nights",
    album: "Digital Pulse",
    genre: "Electronic",
    duration: "4:12",
    plays: "189K",
    likes: "8.5K",
    uploadDate: "2024-01-10"
  },
  {
    id: "3",
    title: "Summer Breeze",
    artist: "Coastal Vibes",
    album: "Ocean Songs",
    genre: "Indie",
    duration: "2:58",
    plays: "156K",
    likes: "9.2K",
    uploadDate: "2024-01-08"
  }
];

export function SongManagement() {
  const [songs, setSongs] = useState(sampleSongs);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Song Added",
      description: "New song has been added successfully.",
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteSong = (songId: string) => {
    setSongs(prev => prev.filter(song => song.id !== songId));
    toast({
      title: "Song Deleted",
      description: "Song has been removed from the library.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Song Management</h2>
          <p className="text-muted-foreground">Add, edit, and manage your music library</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Song
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Song</DialogTitle>
              <DialogDescription>
                Upload a new song to your music library
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddSong} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Song Title</Label>
                  <Input id="title" placeholder="Enter song title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist">Artist</Label>
                  <Input id="artist" placeholder="Enter artist name" required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="album">Album</Label>
                  <Input id="album" placeholder="Enter album name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input id="genre" placeholder="Enter genre" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="audio">Audio File</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop audio file
                  </p>
                  <Input type="file" accept="audio/*" className="hidden" id="audio" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cover">Cover Image</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload cover image
                  </p>
                  <Input type="file" accept="image/*" className="hidden" id="cover" />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Song</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search songs, artists, or genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Songs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Songs ({filteredSongs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Song</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Album</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSongs.map((song) => (
                <TableRow key={song.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                        <Play className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{song.title}</p>
                        <p className="text-sm text-muted-foreground">{song.uploadDate}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>{song.album}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{song.genre}</Badge>
                  </TableCell>
                  <TableCell>{song.duration}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Play className="h-3 w-3" />
                        {song.plays}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Heart className="h-3 w-3" />
                        {song.likes}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDeleteSong(song.id)}
                      >
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
    </div>
  );
}