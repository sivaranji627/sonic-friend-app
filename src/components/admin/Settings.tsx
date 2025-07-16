import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Moon, 
  Sun, 
  Volume2, 
  Shield, 
  Database, 
  Wifi, 
  Settings as SettingsIcon,
  Save,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Settings() {
  const [settings, setSettings] = useState({
    // App Appearance
    darkMode: false,
    compactMode: false,
    
    // Audio Settings
    defaultQuality: "high",
    autoPlay: true,
    crossfade: true,
    
    // System Settings
    maintenanceMode: false,
    userRegistration: true,
    guestAccess: false,
    
    // Content Settings
    explicitContent: true,
    userUploads: false,
    autoModeration: true,
    
    // Performance
    cacheSize: "1GB",
    bandwidthLimit: "unlimited",
    
    // Security
    twoFactorAuth: true,
    sessionTimeout: "24",
    ipWhitelist: false
  });

  const { toast } = useToast();

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "All settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">App Settings</h2>
          <p className="text-muted-foreground">Configure application behavior and preferences</p>
        </div>
        
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* App Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            App Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable dark theme for the application
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Compact Mode</Label>
              <p className="text-sm text-muted-foreground">
                Use compact layout for better space utilization
              </p>
            </div>
            <Switch
              checked={settings.compactMode}
              onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Audio Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Audio Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Default Audio Quality</Label>
              <p className="text-sm text-muted-foreground">
                Set the default streaming quality for all users
              </p>
            </div>
            <select 
              value={settings.defaultQuality}
              onChange={(e) => handleSettingChange('defaultQuality', e.target.value)}
              className="flex h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="low">Low (96 kbps)</option>
              <option value="normal">Normal (160 kbps)</option>
              <option value="high">High (320 kbps)</option>
              <option value="lossless">Lossless (FLAC)</option>
            </select>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Auto-play Next Song</Label>
              <p className="text-sm text-muted-foreground">
                Automatically play the next song in queue
              </p>
            </div>
            <Switch
              checked={settings.autoPlay}
              onCheckedChange={(checked) => handleSettingChange('autoPlay', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Crossfade</Label>
              <p className="text-sm text-muted-foreground">
                Enable smooth transitions between songs
              </p>
            </div>
            <Switch
              checked={settings.crossfade}
              onCheckedChange={(checked) => handleSettingChange('crossfade', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center gap-2">
                Maintenance Mode
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Critical
                </Badge>
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable maintenance mode to prevent user access
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">User Registration</Label>
              <p className="text-sm text-muted-foreground">
                Allow new users to register accounts
              </p>
            </div>
            <Switch
              checked={settings.userRegistration}
              onCheckedChange={(checked) => handleSettingChange('userRegistration', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Guest Access</Label>
              <p className="text-sm text-muted-foreground">
                Allow users to browse without registration
              </p>
            </div>
            <Switch
              checked={settings.guestAccess}
              onCheckedChange={(checked) => handleSettingChange('guestAccess', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Content Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Content & Moderation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Explicit Content</Label>
              <p className="text-sm text-muted-foreground">
                Allow explicit content to be played
              </p>
            </div>
            <Switch
              checked={settings.explicitContent}
              onCheckedChange={(checked) => handleSettingChange('explicitContent', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">User Uploads</Label>
              <p className="text-sm text-muted-foreground">
                Allow users to upload their own music
              </p>
            </div>
            <Switch
              checked={settings.userUploads}
              onCheckedChange={(checked) => handleSettingChange('userUploads', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Auto Moderation</Label>
              <p className="text-sm text-muted-foreground">
                Automatically moderate user-generated content
              </p>
            </div>
            <Switch
              checked={settings.autoModeration}
              onCheckedChange={(checked) => handleSettingChange('autoModeration', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Performance & Security */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cacheSize">Cache Size</Label>
              <select 
                id="cacheSize"
                value={settings.cacheSize}
                onChange={(e) => handleSettingChange('cacheSize', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="512MB">512 MB</option>
                <option value="1GB">1 GB</option>
                <option value="2GB">2 GB</option>
                <option value="5GB">5 GB</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bandwidth">Bandwidth Limit</Label>
              <select 
                id="bandwidth"
                value={settings.bandwidthLimit}
                onChange={(e) => handleSettingChange('bandwidthLimit', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="unlimited">Unlimited</option>
                <option value="100MB">100 MB/s</option>
                <option value="50MB">50 MB/s</option>
                <option value="25MB">25 MB/s</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm">Two-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground">
                  Require 2FA for admin accounts
                </p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                min="1"
                max="168"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm">IP Whitelist</Label>
                <p className="text-xs text-muted-foreground">
                  Restrict admin access to specific IPs
                </p>
              </div>
              <Switch
                checked={settings.ipWhitelist}
                onCheckedChange={(checked) => handleSettingChange('ipWhitelist', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}