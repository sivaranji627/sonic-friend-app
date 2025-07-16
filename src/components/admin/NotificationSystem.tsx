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
import { Plus, Send, Eye, Edit, Trash2, Bell, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sampleNotifications = [
  {
    id: "1",
    title: "New Album Release: Midnight Dreams",
    message: "Luna Rose has just released her latest album 'Midnight Dreams'. Check it out now!",
    type: "Announcement",
    channel: "In-App",
    status: "Sent",
    recipients: "All Users",
    sentDate: "2024-01-15",
    openRate: "68.5%"
  },
  {
    id: "2",
    title: "Weekly Music Discovery",
    message: "Discover new music curated just for you based on your listening history.",
    type: "Promotional",
    channel: "Email",
    status: "Scheduled",
    recipients: "Active Users",
    sentDate: "2024-01-16",
    openRate: "pending"
  },
  {
    id: "3",
    title: "Premium Features Update",
    message: "We've added new features to our premium subscription. Upgrade now to enjoy!",
    type: "Feature Update",
    channel: "Push",
    status: "Draft",
    recipients: "Free Users",
    sentDate: "pending",
    openRate: "pending"
  }
];

export function NotificationSystem() {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateNotification = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Created",
      description: "New notification has been created successfully.",
    });
    setIsCreateOpen(false);
  };

  const handleSendNotification = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId 
        ? { ...notif, status: "Sent", sentDate: new Date().toISOString().split('T')[0] }
        : notif
    ));
    
    toast({
      title: "Notification Sent",
      description: "Notification has been sent to recipients.",
    });
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    toast({
      title: "Notification Deleted",
      description: "Notification has been removed.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Sent":
        return <Badge className="bg-green-100 text-green-800">Sent</Badge>;
      case "Scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case "Draft":
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Email":
        return <Mail className="h-4 w-4" />;
      case "Push":
        return <Bell className="h-4 w-4" />;
      case "In-App":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Notification System</h2>
          <p className="text-muted-foreground">Send announcements and updates to users</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Notification</DialogTitle>
              <DialogDescription>
                Send announcements, updates, or promotional messages to users
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleCreateNotification} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter notification title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select id="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="Announcement">Announcement</option>
                    <option value="Promotional">Promotional</option>
                    <option value="Feature Update">Feature Update</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Enter notification message..." 
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="channel">Channel</Label>
                  <select id="channel" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="In-App">In-App Notification</option>
                    <option value="Email">Email</option>
                    <option value="Push">Push Notification</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <select id="recipients" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="All Users">All Users</option>
                    <option value="Active Users">Active Users</option>
                    <option value="Premium Users">Premium Users</option>
                    <option value="Free Users">Free Users</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule (Optional)</Label>
                <Input id="schedule" type="datetime-local" />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" variant="outline">Save as Draft</Button>
                <Button type="submit">Create & Send</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{notifications.filter(n => n.status === "Sent").length}</p>
              <p className="text-sm text-muted-foreground">Sent This Month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">72.3%</p>
              <p className="text-sm text-muted-foreground">Avg Open Rate</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{notifications.filter(n => n.status === "Scheduled").length}</p>
              <p className="text-sm text-muted-foreground">Scheduled</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{notifications.filter(n => n.status === "Draft").length}</p>
              <p className="text-sm text-muted-foreground">Drafts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Management */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications ({notifications.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Notification</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">{notification.message.substring(0, 60)}...</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{notification.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getChannelIcon(notification.channel)}
                          {notification.channel}
                        </div>
                      </TableCell>
                      <TableCell>{notification.recipients}</TableCell>
                      <TableCell>{getStatusBadge(notification.status)}</TableCell>
                      <TableCell>{notification.openRate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {notification.status === "Draft" && (
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          {notification.status !== "Sent" && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleSendNotification(notification.id)}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDeleteNotification(notification.id)}
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
        </TabsContent>

        <TabsContent value="sent">
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h4 className="text-lg font-medium mb-2">Sent Notifications</h4>
              <p className="text-muted-foreground">View all successfully sent notifications</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h4 className="text-lg font-medium mb-2">Scheduled Notifications</h4>
              <p className="text-muted-foreground">Manage notifications scheduled for future delivery</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h4 className="text-lg font-medium mb-2">Draft Notifications</h4>
              <p className="text-muted-foreground">Continue working on saved drafts</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}