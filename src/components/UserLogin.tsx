import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Lock, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserLoginProps {
  onLoginStatusChange?: (isLoggedIn: boolean, username?: string) => void;
}

export const UserLogin = ({ onLoginStatusChange }: UserLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Login Failed",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    // Validate specific credentials
    const validCredentials = [
      { email: "admin@melodify.com", password: "admin123" },
      { email: "user@melodify.com", password: "user123" },
      { email: "demo@melodify.com", password: "demo123" }
    ];

    const isValidUser = validCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (isValidUser) {
      setIsLoggedIn(true);
      setCurrentUser(email);
      setIsDialogOpen(false);
      onLoginStatusChange?.(true, email);
      
      toast({
        title: "Welcome! 🎵",
        description: `Successfully logged in as ${email}`,
      });
      
      // Clear form
      setEmail("");
      setPassword("");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
    onLoginStatusChange?.(false);
    
    toast({
      title: "Logged Out",
      description: "See you soon! 👋",
    });
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-medium text-foreground hidden sm:block">
          {currentUser}
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <div className="w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center">
            <User className="h-4 w-4 text-secondary-foreground" />
          </div>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Login to Melodify 🎵</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:bg-primary/90 transition-smooth"
          >
            Login
          </Button>
          
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>Demo Accounts:</p>
            <p>admin@melodify.com / admin123</p>
            <p>user@melodify.com / user123</p>
            <p>demo@melodify.com / demo123</p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};