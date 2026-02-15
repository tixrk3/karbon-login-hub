import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative";
  icon: LucideIcon;
}

export const StatCard = ({ title, value, change, changeType = "positive", icon: Icon }: StatCardProps) => (
  <div className="group glass-card p-5 flex flex-col gap-3 hover:border-accent/30 hover:shadow-[0_0_30px_-8px_hsl(var(--accent)/0.12)] transition-all duration-300">
    <div className="flex items-center justify-between">
      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/10 transition-all duration-300">
        <Icon className="h-5 w-5 text-accent" />
      </div>
      {change && (
        <span className={`text-sm font-medium px-2 py-0.5 rounded-lg ${changeType === "positive" ? "text-accent bg-accent/10" : "text-destructive bg-destructive/10"}`}>
          {changeType === "positive" ? "↑" : "↓"} {change}
        </span>
      )}
    </div>
    <p className="text-sm text-muted-foreground">{title}</p>
    <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
  </div>
);
