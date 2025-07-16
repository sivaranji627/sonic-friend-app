import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Edit, Trash2, Search, Upload, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sampleArtists = [
  {
    id: "1",
    name: "Luna Rose",
    bio: "Indie pop artist known for dreamy melodies and introspective lyrics.",
    genre: "Indie Pop",
    songs: 12,
    albums: 2,
    followers: "45K",
    joinDate: "2023-08-15"
  },
  {
    id: "2",
    name: "Neon Nights",
    bio: "Electronic music producer creating atmospheric soundscapes.",
    genre: "Electronic",
    songs: 28,
    albums: 3,
    followers: "78K",
    joinDate: "2023-06-10"
  },
  {
    id: "3",
    name: "Coastal Vibes",
    bio: "Chill indie band from California specializing in surf rock.",
    genre: "Surf Rock",
    songs: 18,
    albums: 2,
    followers: "32K",
    joinDate: "2023-09-22"
  }
];

export function ArtistManagement() {
  const [artists, setArtists] = useState(sampleArtists);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddArtist = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Artist Added",
      description: "New artist has been added successfully.",
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteArtist = (artistId: string) => {
    setArtists(prev => prev.filter(artist => artist.id !== artistId));
    toast({
      title: "Artist Removed",
      description: "Artist has been removed from the platform.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Artist Management</h2>
          <p className="text-muted-foreground">Manage artist profiles and their content</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Artist
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Artist</DialogTitle>
              <DialogDescription>
                Create a new artist profile
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddArtist} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="artistName">Artist Name</Label>
                  <Input id="artistName" placeholder="Enter artist name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genre">Primary Genre</Label>
                  <Input id="genre" placeholder="Enter primary genre" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Enter artist biography..." 
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Artist Image</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload artist image
                  </p>
                  <Input type="file" accept="image/*" className="hidden" id="image" />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Artist</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search artists or genres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Artists Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Artists ({filteredArtists.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Artist</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArtists.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Mic className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{artist.name}</p>
                        <p className="text-sm text-muted-foreground">{artist.bio.substring(0, 50)}...</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{artist.genre}</TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <p>{artist.songs} songs</p>
                      <p>{artist.albums} albums</p>
                    </div>
                  </TableCell>
                  <TableCell>{artist.followers}</TableCell>
                  <TableCell>{artist.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDeleteArtist(artist.id)}
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