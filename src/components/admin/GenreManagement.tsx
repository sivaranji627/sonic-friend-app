import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Edit, Trash2, Search, Tags, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sampleGenres = [
  { id: "1", name: "Pop", songs: 1420, color: "#FF6B6B", description: "Popular music genre" },
  { id: "2", name: "Electronic", songs: 892, color: "#4ECDC4", description: "Electronic and synthesized music" },
  { id: "3", name: "Indie", songs: 756, color: "#45B7D1", description: "Independent music" },
  { id: "4", name: "Rock", songs: 634, color: "#F39C12", description: "Rock and alternative music" },
  { id: "5", name: "Hip Hop", songs: 521, color: "#9B59B6", description: "Hip hop and rap music" },
];

const sampleTags = [
  { id: "1", name: "Chill", songs: 342, type: "Mood" },
  { id: "2", name: "Workout", songs: 287, type: "Activity" },
  { id: "3", name: "Study", songs: 198, type: "Activity" },
  { id: "4", name: "Party", songs: 156, type: "Mood" },
  { id: "5", name: "Sleep", songs: 134, type: "Mood" },
  { id: "6", name: "Focus", songs: 98, type: "Activity" },
];

export function GenreManagement() {
  const [genres, setGenres] = useState(sampleGenres);
  const [tags, setTags] = useState(sampleTags);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddGenreOpen, setIsAddGenreOpen] = useState(false);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const { toast } = useToast();

  const filteredGenres = genres.filter(genre =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGenre = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Genre Added",
      description: "New genre has been created successfully.",
    });
    setIsAddGenreOpen(false);
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Tag Added",
      description: "New tag has been created successfully.",
    });
    setIsAddTagOpen(false);
  };

  const handleDeleteGenre = (genreId: string) => {
    setGenres(prev => prev.filter(genre => genre.id !== genreId));
    toast({
      title: "Genre Deleted",
      description: "Genre has been removed.",
      variant: "destructive",
    });
  };

  const handleDeleteTag = (tagId: string) => {
    setTags(prev => prev.filter(tag => tag.id !== tagId));
    toast({
      title: "Tag Deleted",
      description: "Tag has been removed.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Genres & Tags</h2>
          <p className="text-muted-foreground">Manage music genres and mood/activity tags</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isAddGenreOpen} onOpenChange={setIsAddGenreOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Genre
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Genre</DialogTitle>
                <DialogDescription>
                  Create a new music genre category
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddGenre} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="genreName">Genre Name</Label>
                  <Input id="genreName" placeholder="Enter genre name" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="genreDesc">Description</Label>
                  <Input id="genreDesc" placeholder="Enter genre description" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="genreColor">Color</Label>
                  <Input id="genreColor" type="color" defaultValue="#FF6B6B" />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddGenreOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Genre</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddTagOpen} onOpenChange={setIsAddTagOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Tag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Tag</DialogTitle>
                <DialogDescription>
                  Create a new mood or activity tag
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddTag} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tagName">Tag Name</Label>
                  <Input id="tagName" placeholder="Enter tag name" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tagType">Tag Type</Label>
                  <select id="tagType" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="Mood">Mood</option>
                    <option value="Activity">Activity</option>
                    <option value="Time">Time</option>
                    <option value="Energy">Energy</option>
                  </select>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddTagOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Tag</Button>
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
              placeholder="Search genres or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Genres Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Genres ({filteredGenres.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Genre</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Songs</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGenres.map((genre) => (
                <TableRow key={genre.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: genre.color }}
                      />
                      <span className="font-medium">{genre.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{genre.description}</TableCell>
                  <TableCell>{genre.songs} songs</TableCell>
                  <TableCell>
                    <code className="text-xs">{genre.color}</code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDeleteGenre(genre.id)}
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

      {/* Tags Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tags className="h-5 w-5" />
            Tags ({filteredTags.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tag</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Songs</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>
                    <Badge variant="secondary">{tag.name}</Badge>
                  </TableCell>
                  <TableCell>{tag.type}</TableCell>
                  <TableCell>{tag.songs} songs</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDeleteTag(tag.id)}
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