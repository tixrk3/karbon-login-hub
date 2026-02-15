import { Activity, Zap, BarChart3, Eye, MousePointerClick, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line,
} from "recharts";

const areaData = [
  { day: "Mon", impressions: 280000, clicks: 50000 },
  { day: "Tue", impressions: 300000, clicks: 55000 },
  { day: "Wed", impressions: 260000, clicks: 48000 },
  { day: "Thu", impressions: 220000, clicks: 42000 },
  { day: "Fri", impressions: 180000, clicks: 35000 },
  { day: "Sat", impressions: 120000, clicks: 25000 },
  { day: "Sun", impressions: 90000, clicks: 18000 },
];

const barData = [
  { partner: "Partner A", coverage: 85 },
  { partner: "Partner B", coverage: 78 },
  { partner: "Partner C", coverage: 90 },
  { partner: "Partner D", coverage: 72 },
  { partner: "Partner E", coverage: 68 },
  { partner: "Partner F", coverage: 82 },
];

const lineData = [
  { day: "Mon", viewability: 65 },
  { day: "Tue", viewability: 68 },
  { day: "Wed", viewability: 67 },
  { day: "Thu", viewability: 70 },
  { day: "Fri", viewability: 68 },
  { day: "Sat", viewability: 66 },
  { day: "Sun", viewability: 62 },
];

const partnerPerformance = [
  { name: "Google AdX", sub: "12 active tags", tags: 12, impressions: "534,234", fillRate: "78.5%", avgCtr: "2.89%", revenue: "$12,450", trend: "+15.2%", trendType: "positive" as const, status: "Excellent" },
  { name: "Amazon Publisher Services", sub: "8 active tags", tags: 8, impressions: "423,567", fillRate: "82.3%", avgCtr: "3.12%", revenue: "$9,876", trend: "+12.8%", trendType: "positive" as const, status: "Excellent" },
  { name: "Index Exchange", sub: "15 active tags", tags: 15, impressions: "312,890", fillRate: "71.2%", avgCtr: "2.45%", revenue: "$7,234", trend: "+8.4%", trendType: "positive" as const, status: "Good" },
  { name: "OpenX", sub: "6 active tags", tags: 6, impressions: "245,123", fillRate: "69.8%", avgCtr: "2.21%", revenue: "$5,432", trend: "-2.3%", trendType: "negative" as const, status: "Good" },
  { name: "PubMatic", sub: "10 active tags", tags: 10, impressions: "189,456", fillRate: "65.4%", avgCtr: "1.98%", revenue: "$4,123", trend: "+5.1%", trendType: "positive" as const, status: "Average" },
  { name: "Rubicon Project", sub: "4 active tags", tags: 4, impressions: "134,878", fillRate: "58.2%", avgCtr: "1.67%", revenue: "$2,890", trend: "-7.5%", trendType: "negative" as const, status: "Needs Attention" },
];

const Dashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="text-muted-foreground">Overview of your ad verification metrics</p>
    </div>

    {/* Stat Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard icon={Activity} title="Inventory Events" value="2,547,893" change="+12.5%" changeType="positive" />
      <StatCard icon={Zap} title="Ad Responses" value="1,893,421" change="+8.3%" changeType="positive" />
      <StatCard icon={BarChart3} title="Fill Rate" value="74.3%" change="-2.1%" changeType="negative" />
      <StatCard icon={Eye} title="Impressions" value="1,654,234" change="+15.7%" changeType="positive" />
      <StatCard icon={MousePointerClick} title="Clicks" value="45,678" change="+9.2%" changeType="positive" />
      <StatCard icon={TrendingUp} title="CTR" value="2.76%" change="+0.3%" changeType="positive" />
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="glass-card p-5">
        <h3 className="text-foreground font-semibold mb-4">Impressions & Clicks</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={areaData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, color: "hsl(var(--foreground))" }} />
            <Area type="monotone" dataKey="impressions" stroke="hsl(var(--accent))" fill="hsl(var(--accent) / 0.15)" strokeWidth={2} />
            <Area type="monotone" dataKey="clicks" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-foreground font-semibold mb-4">Verification Coverage by Partner</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="partner" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, color: "hsl(var(--foreground))" }} />
            <Bar dataKey="coverage" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Viewability Trend */}
    <div className="glass-card p-5">
      <h3 className="text-foreground font-semibold mb-4">Viewability Trend</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, color: "hsl(var(--foreground))" }} />
          <Line type="monotone" dataKey="viewability" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Partner Performance Table */}
    <div className="glass-card p-5">
      <h3 className="text-foreground font-semibold mb-1">Partner Performance Overview</h3>
      <p className="text-sm text-muted-foreground mb-4">Detailed metrics for all active partners</p>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left py-3 px-2 font-medium">PARTNER</th>
              <th className="text-center py-3 px-2 font-medium">TAGS</th>
              <th className="text-right py-3 px-2 font-medium">IMPRESSIONS</th>
              <th className="text-right py-3 px-2 font-medium">FILL RATE</th>
              <th className="text-right py-3 px-2 font-medium">AVG CTR</th>
              <th className="text-right py-3 px-2 font-medium">REVENUE</th>
              <th className="text-right py-3 px-2 font-medium">TREND</th>
              <th className="text-right py-3 px-2 font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {partnerPerformance.map((p) => (
              <tr key={p.name} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-2">
                  <p className="text-foreground font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sub}</p>
                </td>
                <td className="text-center py-3 px-2">
                  <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs font-medium">{p.tags}</span>
                </td>
                <td className="text-right py-3 px-2 text-foreground">{p.impressions}</td>
                <td className="text-right py-3 px-2 text-foreground">{p.fillRate}</td>
                <td className="text-right py-3 px-2 text-foreground">{p.avgCtr}</td>
                <td className="text-right py-3 px-2 text-accent font-medium">{p.revenue}</td>
                <td className="text-right py-3 px-2">
                  <span className={p.trendType === "positive" ? "text-accent" : "text-destructive"}>
                    {p.trend}
                  </span>
                </td>
                <td className="text-right py-3 px-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    p.status === "Excellent" ? "bg-accent/20 text-accent" :
                    p.status === "Good" ? "bg-accent/20 text-accent" :
                    p.status === "Average" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-destructive/20 text-destructive"
                  }`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Dashboard;
