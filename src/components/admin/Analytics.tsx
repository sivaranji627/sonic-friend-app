import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Play, 
  Heart, 
  Clock, 
  Download,
  BarChart3,
  PieChart
} from "lucide-react";

const analyticsData = {
  streaming: {
    totalPlays: "12,847,293",
    uniqueListeners: "284,791",
    averageSessionTime: "24 min 32 sec",
    peakHours: "8 PM - 10 PM",
    dailyGrowth: "+8.3%",
    weeklyGrowth: "+15.7%"
  },
  userEngagement: {
    dailyActiveUsers: "12,847",
    monthlyActiveUsers: "284,791",
    userRetention: "68.5%",
    bounceRate: "23.2%",
    newRegistrations: "1,247",
    premiumConversions: "156"
  },
  content: {
    songsAdded: "1,234",
    artistsJoined: "89",
    playlistsCreated: "4,567",
    totalListeningHours: "89,432"
  }
};

const topGenres = [
  { genre: "Pop", percentage: 28.5, plays: "3.6M", color: "#FF6B6B" },
  { genre: "Electronic", percentage: 18.2, plays: "2.3M", color: "#4ECDC4" },
  { genre: "Indie", percentage: 15.8, plays: "2.0M", color: "#45B7D1" },
  { genre: "Rock", percentage: 12.3, plays: "1.6M", color: "#F39C12" },
  { genre: "Hip Hop", percentage: 10.7, plays: "1.4M", color: "#9B59B6" },
];

const geographicData = [
  { country: "United States", users: "89,234", percentage: 31.2 },
  { country: "United Kingdom", users: "45,123", percentage: 15.8 },
  { country: "Canada", users: "34,567", percentage: 12.1 },
  { country: "Australia", users: "23,456", percentage: 8.2 },
  { country: "Germany", users: "19,876", percentage: 7.0 },
];

const deviceData = [
  { device: "Mobile", percentage: 68.5, color: "#4ECDC4" },
  { device: "Desktop", percentage: 23.7, color: "#FF6B6B" },
  { device: "Tablet", percentage: 7.8, color: "#F39C12" },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Plays</p>
                <p className="text-2xl font-bold">{analyticsData.streaming.totalPlays}</p>
                <p className="text-xs text-green-600">{analyticsData.streaming.dailyGrowth} today</p>
              </div>
              <Play className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{analyticsData.userEngagement.dailyActiveUsers}</p>
                <p className="text-xs text-green-600">+5.2% from yesterday</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
                <p className="text-2xl font-bold">{analyticsData.streaming.averageSessionTime}</p>
                <p className="text-xs text-green-600">+1.3 min from last week</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">User Retention</p>
                <p className="text-2xl font-bold">{analyticsData.userEngagement.userRetention}</p>
                <p className="text-xs text-green-600">+2.1% this month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Streaming Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Streaming trends chart</p>
                <p className="text-xs text-muted-foreground mt-1">Daily/weekly/monthly plays over time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Top Genres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topGenres.map((genre, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: genre.color }}
                    />
                    <span className="font-medium">{genre.genre}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{genre.percentage}%</p>
                    <p className="text-xs text-muted-foreground">{genre.plays}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic and Device Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {geographicData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{item.country}</span>
                  <div className="text-right">
                    <p className="font-medium">{item.users}</p>
                    <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceData.map((device, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{device.device}</span>
                    <span className="font-medium">{device.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${device.percentage}%`,
                        backgroundColor: device.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Monthly Active Users</span>
              <span className="font-medium">{analyticsData.userEngagement.monthlyActiveUsers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">New Registrations</span>
              <span className="font-medium">{analyticsData.userEngagement.newRegistrations}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Premium Conversions</span>
              <span className="font-medium">{analyticsData.userEngagement.premiumConversions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Bounce Rate</span>
              <span className="font-medium">{analyticsData.userEngagement.bounceRate}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Songs Added (30d)</span>
              <span className="font-medium">{analyticsData.content.songsAdded}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Artists Joined (30d)</span>
              <span className="font-medium">{analyticsData.content.artistsJoined}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Playlists Created</span>
              <span className="font-medium">{analyticsData.content.playlistsCreated}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Listening Hours</span>
              <span className="font-medium">{analyticsData.content.totalListeningHours}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Peak Usage Hours</span>
              <span className="font-medium">{analyticsData.streaming.peakHours}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Weekly Growth</span>
              <span className="font-medium text-green-600">{analyticsData.streaming.weeklyGrowth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Unique Listeners</span>
              <span className="font-medium">{analyticsData.streaming.uniqueListeners}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}