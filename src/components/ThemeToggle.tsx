import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark" | "system";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (newTheme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.add(newTheme);
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    // Simple crossfade via View Transitions API
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
      });
    } else {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          {getIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        <DropdownMenuItem
          onClick={() => handleThemeChange("light")}
          className="flex items-center gap-2 cursor-pointer hover:bg-muted"
        >
          <Sun className="h-4 w-4" />
          <span>Jour</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("dark")}
          className="flex items-center gap-2 cursor-pointer hover:bg-muted"
        >
          <Moon className="h-4 w-4" />
          <span>Nuit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("system")}
          className="flex items-center gap-2 cursor-pointer hover:bg-muted"
        >
          <Monitor className="h-4 w-4" />
          <span>Automatique</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
