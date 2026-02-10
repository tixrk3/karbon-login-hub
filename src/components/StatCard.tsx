import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative";
  icon: LucideIcon;
}

export const StatCard = ({ title, value, change, changeType = "positive", icon: Icon }: StatCardProps) => (
  <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
        <Icon className="h-5 w-5 text-accent" />
      </div>
      {change && (
        <span className={`text-sm font-medium ${changeType === "positive" ? "text-accent" : "text-destructive"}`}>
          {changeType === "positive" ? "↑" : "↓"} {change}
        </span>
      )}
    </div>
    <p className="text-sm text-muted-foreground">{title}</p>
    <p className="text-2xl font-bold text-foreground">{value}</p>
  </div>
);
