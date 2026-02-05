import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  iconBgClass?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, iconBgClass = "bg-primary/20" }: StatCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className={cn("p-3 rounded-lg", iconBgClass)}>
          <Icon className="h-6 w-6 text-accent" />
        </div>
        {trend && (
          <span className={cn(
            "text-sm font-medium",
            trend.positive ? "text-accent" : "text-destructive"
          )}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
      </div>
    </div>
  );
};
