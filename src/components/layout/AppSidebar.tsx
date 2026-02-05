import { LayoutDashboard, Building2, Tag, Users, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import karbon14Logo from "@/assets/karbon14-logo.png";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Partners", icon: Building2, path: "/partners" },
  { title: "Tags", icon: Tag, path: "/tags" },
  { title: "Users", icon: Users, path: "/users" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export const AppSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col relative overflow-hidden">
      {/* Diagonal stripes background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            hsl(var(--primary)) 10px,
            hsl(var(--primary)) 11px
          )`,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 flex flex-col items-center">
          <img
            src={karbon14Logo}
            alt="KARBON14"
            className="h-20 w-auto mb-2"
            style={{
              filter: "drop-shadow(0 4px 12px rgba(19, 179, 168, 0.3))",
            }}
          />
          <span className="text-lg font-bold text-foreground tracking-wide">KARBON14</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Sarah Anderson</p>
              <p className="text-xs text-accent truncate">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
