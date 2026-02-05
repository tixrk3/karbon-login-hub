import { TrendingUp, Zap, Activity, Eye, MousePointer, Percent } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const areaChartData = [
  { name: "Mon", value: 280000 },
  { name: "Tue", value: 250000 },
  { name: "Wed", value: 180000 },
  { name: "Thu", value: 150000 },
  { name: "Fri", value: 120000 },
  { name: "Sat", value: 80000 },
  { name: "Sun", value: 60000 },
];

const barChartData = [
  { name: "Partner A", value: 92 },
  { name: "Partner B", value: 88 },
  { name: "Partner C", value: 95 },
  { name: "Partner D", value: 70 },
  { name: "Partner E", value: 85 },
  { name: "Partner F", value: 78 },
];

const lineChartData = [
  { name: "Mon", value: 68 },
  { name: "Tue", value: 72 },
  { name: "Wed", value: 70 },
  { name: "Thu", value: 75 },
  { name: "Fri", value: 71 },
  { name: "Sat", value: 65 },
  { name: "Sun", value: 62 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your ad verification metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Inventory Events"
          value="2,547,893"
          icon={TrendingUp}
          trend={{ value: "+12.5%", positive: true }}
          iconBgClass="bg-primary/20"
        />
        <StatCard
          title="Ad Responses"
          value="1,893,421"
          icon={Zap}
          trend={{ value: "+8.3%", positive: true }}
          iconBgClass="bg-accent/20"
        />
        <StatCard
          title="Fill Rate"
          value="74.3%"
          icon={Activity}
          trend={{ value: "-2.1%", positive: false }}
          iconBgClass="bg-secondary/20"
        />
        <StatCard
          title="Impressions"
          value="1,654,234"
          icon={Eye}
          trend={{ value: "+15.7%", positive: true }}
          iconBgClass="bg-primary/20"
        />
        <StatCard
          title="Clicks"
          value="45,678"
          icon={MousePointer}
          trend={{ value: "+9.2%", positive: true }}
          iconBgClass="bg-accent/20"
        />
        <StatCard
          title="CTR"
          value="2.76%"
          icon={Percent}
          trend={{ value: "+0.3%", positive: true }}
          iconBgClass="bg-secondary/20"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart - Impressions & Clicks */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Impressions & Clicks</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaChartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--accent))" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Verification Coverage by Partner */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Verification Coverage by Partner</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="value" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Viewability Trend */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Viewability Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                borderColor: "hsl(var(--border))",
                borderRadius: "8px"
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
