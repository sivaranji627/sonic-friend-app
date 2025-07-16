import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Music, Mic, ListMusic, Play, Heart, TrendingUp, UserPlus, BarChart3 } from "lucide-react";

const stats = [
  { title: "Total Users", value: "2,847", icon: Users, color: "text-blue-600", change: "+12%" },
  { title: "Total Songs", value: "15,420", icon: Music, color: "text-green-600", change: "+8%" },
  { title: "Total Artists", value: "1,203", icon: Mic, color: "text-purple-600", change: "+5%" },
  { title: "Total Playlists", value: "4,567", icon: ListMusic, color: "text-orange-600", change: "+15%" },
];

const recentUploads = [
  { title: "Midnight Dreams", artist: "Luna Rose", uploadTime: "2 hours ago" },
  { title: "Electric Waves", artist: "Neon Nights", uploadTime: "4 hours ago" },
  { title: "Summer Breeze", artist: "Coastal Vibes", uploadTime: "6 hours ago" },
  { title: "Urban Rhythm", artist: "City Beats", uploadTime: "8 hours ago" },
];

const topSongs = [
  { title: "Starlight", artist: "Cosmic Dreams", plays: "234K" },
  { title: "Ocean Blue", artist: "Wave Riders", plays: "198K" },
  { title: "Fire Dance", artist: "Rhythm Masters", plays: "176K" },
  { title: "Silent Echo", artist: "Mystic Sounds", plays: "145K" },
  { title: "Digital Love", artist: "Tech Harmony", plays: "132K" },
];

const topArtists = [
  { name: "Cosmic Dreams", streams: "2.4M" },
  { name: "Wave Riders", streams: "1.8M" },
  { name: "Rhythm Masters", streams: "1.5M" },
  { name: "Mystic Sounds", streams: "1.2M" },
  { name: "Tech Harmony", streams: "980K" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change} from last month</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Users Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Daily/Monthly Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Chart visualization would go here</p>
                <p className="text-xs text-muted-foreground mt-1">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Daily Active Users</span>
              <span className="font-medium">12,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Monthly Active Users</span>
              <span className="font-medium">284,791</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Songs Played Today</span>
              <span className="font-medium">45,672</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Avg Session Time</span>
              <span className="font-medium">24 min</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Uploads and Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUploads.map((upload, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{upload.title}</p>
                    <p className="text-xs text-muted-foreground">{upload.artist}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{upload.uploadTime}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Top 5 Most Streamed Songs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSongs.map((song, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>
                    <div>
                      <p className="font-medium text-sm">{song.title}</p>
                      <p className="text-xs text-muted-foreground">{song.artist}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{song.plays}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Top 5 Artists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topArtists.map((artist, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>
                    <p className="font-medium text-sm">{artist.name}</p>
                  </div>
                  <span className="text-sm font-medium">{artist.streams}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}