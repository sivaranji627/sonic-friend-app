import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, MoreHorizontal, Shield, ShieldOff, Trash2, Edit, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sampleUsers = [
  {
    id: "1",
    email: "john.doe@example.com",
    username: "johndoe",
    role: "User",
    status: "Active",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    songsPlayed: "1,234",
    playlists: "8"
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    username: "janesmith",
    role: "Admin",
    status: "Active",
    joinDate: "2023-12-20",
    lastActive: "1 day ago",
    songsPlayed: "2,567",
    playlists: "15"
  },
  {
    id: "3",
    email: "mike.wilson@example.com",
    username: "mikewilson",
    role: "User",
    status: "Blocked",
    joinDate: "2024-01-10",
    lastActive: "5 days ago",
    songsPlayed: "892",
    playlists: "4"
  },
  {
    id: "4",
    email: "sarah.johnson@example.com",
    username: "sarahj",
    role: "User",
    status: "Active",
    joinDate: "2024-01-08",
    lastActive: "30 minutes ago",
    songsPlayed: "3,421",
    playlists: "22"
  }
];

export function UserManagement() {
  const [users, setUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBlockUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
        : user
    ));
    
    const user = users.find(u => u.id === userId);
    toast({
      title: user?.status === "Active" ? "User Blocked" : "User Unblocked",
      description: `${user?.username} has been ${user?.status === "Active" ? "blocked" : "unblocked"}.`,
    });
  };

  const handleChangeRole = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, role: user.role === "User" ? "Admin" : "User" }
        : user
    ));
    
    const user = users.find(u => u.id === userId);
    toast({
      title: "Role Updated",
      description: `${user?.username}'s role has been changed to ${user?.role === "User" ? "Admin" : "User"}.`,
    });
  };

  const handleDeleteUser = () => {
    if (deleteUserId) {
      const user = users.find(u => u.id === deleteUserId);
      setUsers(prev => prev.filter(user => user.id !== deleteUserId));
      toast({
        title: "User Deleted",
        description: `${user?.username} has been permanently deleted.`,
        variant: "destructive",
      });
      setDeleteUserId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge variant="destructive">Blocked</Badge>;
  };

  const getRoleBadge = (role: string) => {
    return role === "Admin" 
      ? <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
      : <Badge variant="secondary">User</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage user accounts, roles, and activity</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{users.length}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{users.filter(u => u.status === "Active").length}</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{users.filter(u => u.role === "Admin").length}</p>
              <p className="text-sm text-muted-foreground">Admins</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{users.filter(u => u.status === "Blocked").length}</p>
              <p className="text-sm text-muted-foreground">Blocked Users</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by email or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">Joined {user.joinDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <p className="text-sm">Last active: {user.lastActive}</p>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <p>{user.songsPlayed} songs played</p>
                      <p>{user.playlists} playlists</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleChangeRole(user.id)}>
                          <Shield className="mr-2 h-4 w-4" />
                          {user.role === "User" ? "Make Admin" : "Remove Admin"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBlockUser(user.id)}>
                          <ShieldOff className="mr-2 h-4 w-4" />
                          {user.status === "Active" ? "Block User" : "Unblock User"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => setDeleteUserId(user.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account
              and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}