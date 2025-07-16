import { Outlet, useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout() {
  const location = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/admin") return "Dashboard";
    if (path.includes("/songs")) return "Song Management";
    if (path.includes("/users")) return "User Management";
    if (path.includes("/artists")) return "Artist Management";
    if (path.includes("/playlists")) return "Playlists & Albums";
    if (path.includes("/genres")) return "Genres & Tags";
    if (path.includes("/analytics")) return "Analytics & Reports";
    if (path.includes("/notifications")) return "Notifications";
    if (path.includes("/settings")) return "Settings";
    return "Admin Panel";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <AdminSidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}