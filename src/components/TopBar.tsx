import { Bell, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export const TopBar = () => {
  const { user } = useAuth();

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
      <span className="text-sm text-muted-foreground">Dashboard</span>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="text-muted-foreground hover:text-foreground relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive" />
        </button>
        <button className="text-muted-foreground hover:text-foreground">
          <Settings className="h-5 w-5" />
        </button>
        {user && (
          <div className="flex items-center gap-2 ml-2">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold text-xs">
              SA
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
