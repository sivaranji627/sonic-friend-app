import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminLayout from "./pages/AdminLayout";
import { Dashboard } from "@/components/admin/Dashboard";
import { SongManagement } from "@/components/admin/SongManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { ArtistManagement } from "@/components/admin/ArtistManagement";
import { PlaylistManagement } from "@/components/admin/PlaylistManagement";
import { GenreManagement } from "@/components/admin/GenreManagement";
import { Analytics } from "@/components/admin/Analytics";
import { NotificationSystem } from "@/components/admin/NotificationSystem";
import { Settings } from "@/components/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="songs" element={<SongManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="artists" element={<ArtistManagement />} />
            <Route path="playlists" element={<PlaylistManagement />} />
            <Route path="genres" element={<GenreManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notifications" element={<NotificationSystem />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
