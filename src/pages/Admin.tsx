import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SongCard } from "@/components/SongCard";
import { useState } from "react";
import { Users, Music, ListMusic, Heart, TrendingUp, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Admin dashboard data
const adminStats = {
  totalSongs: 0,
  totalArtists: 0,
  totalUsers: 0,
  totalPlaylists: 0
};

const Admin = () => {
  const [likedSongs, setLikedSongs] = useState<string[]>([]);

  const handleLikeSong = (songId: string) => {
    setLikedSongs(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card className="p-6 shadow-card hover:shadow-glow transition-smooth">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">A</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <Badge variant="secondary">Administrator</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Songs"
              value={adminStats.totalSongs}
              icon={Music}
              color="bg-primary"
            />
            <StatCard
              title="Total Artists"
              value={adminStats.totalArtists}
              icon={Users}
              color="bg-secondary"
            />
            <StatCard
              title="Total Users"
              value={adminStats.totalUsers}
              icon={Users}
              color="bg-accent"
            />
            <StatCard
              title="Total Playlists"
              value={adminStats.totalPlaylists}
              icon={ListMusic}
              color="bg-success"
            />
          </div>
        </section>

        {/* Detailed Analytics */}
        <Tabs defaultValue="most-played" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="most-played" className="text-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Most Played
            </TabsTrigger>
            <TabsTrigger value="recently-added" className="text-sm">
              <Clock className="h-4 w-4 mr-2" />
              Recently Added
            </TabsTrigger>
            <TabsTrigger value="liked-songs" className="text-sm">
              <Heart className="h-4 w-4 mr-2" />
              Liked Songs
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm">
              📊 Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="most-played" className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-6 text-foreground">Most Played Songs</h3>
              <Card className="p-8 text-center shadow-card">
                <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-lg font-medium text-foreground mb-2">No Songs Available</h4>
                <p className="text-muted-foreground">No most played songs data available yet.</p>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="recently-added" className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-6 text-foreground">Recently Added Songs</h3>
              <Card className="p-8 text-center shadow-card">
                <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-lg font-medium text-foreground mb-2">No Recent Songs</h4>
                <p className="text-muted-foreground">No recently added songs available yet.</p>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="liked-songs" className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-6 text-foreground">Liked Songs Category</h3>
              <Card className="p-8 text-center shadow-card">
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-lg font-medium text-foreground mb-2">No Liked Songs</h4>
                <p className="text-muted-foreground">Users haven't liked any songs yet.</p>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-6 text-foreground">Platform Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 shadow-card">
                  <h4 className="text-lg font-medium mb-4 text-foreground">User Engagement</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Users Today</span>
                      <span className="font-medium text-foreground">342</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Songs Played Today</span>
                      <span className="font-medium text-foreground">2,156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg. Session Duration</span>
                      <span className="font-medium text-foreground">23 min</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 shadow-card">
                  <h4 className="text-lg font-medium mb-4 text-foreground">Content Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">New Songs This Week</span>
                      <span className="font-medium text-foreground">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">New Playlists</span>
                      <span className="font-medium text-foreground">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">User Registrations</span>
                      <span className="font-medium text-foreground">45</span>
                    </div>
                  </div>
                </Card>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;