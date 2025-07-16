import { 
  LayoutDashboard, 
  Music, 
  Users, 
  Mic, 
  ListMusic, 
  Tags, 
  BarChart3, 
  Bell, 
  Settings,
  ArrowLeft
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navigationItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Song Management", href: "/admin/songs", icon: Music },
  { title: "User Management", href: "/admin/users", icon: Users },
  { title: "Artist Management", href: "/admin/artists", icon: Mic },
  { title: "Playlists & Albums", href: "/admin/playlists", icon: ListMusic },
  { title: "Genres & Tags", href: "/admin/genres", icon: Tags },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { title: "Notifications", href: "/admin/notifications", icon: Bell },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
      isActive 
        ? "bg-primary text-primary-foreground" 
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`;

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">A</span>
          </div>
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        
        <Link to="/">
          <Button variant="outline" size="sm" className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to App
          </Button>
        </Link>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/admin"}
            className={getNavCls}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}