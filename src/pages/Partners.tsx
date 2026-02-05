import { Plus, Search, TrendingUp, TrendingDown, Users, Eye, Percent, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const partnersData = [
  {
    id: 1,
    name: "Google AdX",
    email: "partner@google.com",
    status: "Active",
    inventoryEvents: "845,234",
    impressions: "623,891",
    fillRate: "73.8%",
    viewability: "76.2%",
    ctr: "2.8%",
    tags: 12,
    trend: "+12.5%",
    trendPositive: true,
  },
  {
    id: 2,
    name: "Amazon Publisher Services",
    email: "ads@amazon.com",
    status: "Active",
    inventoryEvents: "723,456",
    impressions: "534,234",
    fillRate: "73.8%",
    viewability: "72.1%",
    ctr: "2.4%",
    tags: 8,
    trend: "+8.3%",
    trendPositive: true,
  },
  {
    id: 3,
    name: "Index Exchange",
    email: "support@indexexchange.com",
    status: "Active",
    inventoryEvents: "612,890",
    impressions: "445,678",
    fillRate: "72.7%",
    viewability: "68.5%",
    ctr: "2.1%",
    tags: 6,
    trend: "-2.1%",
    trendPositive: false,
  },
  {
    id: 4,
    name: "OpenX",
    email: "support@openx.com",
    status: "Pending",
    inventoryEvents: "0",
    impressions: "0",
    fillRate: "—",
    viewability: "—",
    ctr: "—",
    tags: 2,
    trend: "—",
    trendPositive: true,
  },
  {
    id: 5,
    name: "PubMatic",
    email: "contact@pubmatic.com",
    status: "Active",
    inventoryEvents: "456,789",
    impressions: "312,456",
    fillRate: "68.4%",
    viewability: "71.3%",
    ctr: "1.9%",
    tags: 5,
    trend: "+5.2%",
    trendPositive: true,
  },
];

const Partners = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Partners</h1>
          <p className="text-muted-foreground">Manage and monitor your advertising partners</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Partners"
          value="6"
          icon={Users}
          iconBgClass="bg-primary/20"
        />
        <StatCard
          title="Active Partners"
          value="5"
          icon={TrendingUp}
          iconBgClass="bg-accent/20"
        />
        <StatCard
          title="Avg Viewability"
          value="70.5%"
          icon={Eye}
          iconBgClass="bg-secondary/20"
        />
        <StatCard
          title="Avg CTR"
          value="2.35%"
          icon={Percent}
          iconBgClass="bg-primary/20"
        />
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search partners..." 
            className="pl-10 bg-card border-border"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Partner</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground text-right">Inventory Events</TableHead>
              <TableHead className="text-muted-foreground text-right">Impressions</TableHead>
              <TableHead className="text-muted-foreground text-right">Fill Rate</TableHead>
              <TableHead className="text-muted-foreground text-right">Viewability</TableHead>
              <TableHead className="text-muted-foreground text-right">CTR</TableHead>
              <TableHead className="text-muted-foreground text-center">Tags</TableHead>
              <TableHead className="text-muted-foreground text-right">Trend</TableHead>
              <TableHead className="text-muted-foreground w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partnersData.map((partner) => (
              <TableRow key={partner.id} className="border-border hover:bg-muted/30">
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{partner.name}</p>
                    <p className="text-sm text-muted-foreground">{partner.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={partner.status === "Active" ? "default" : "secondary"}
                    className={partner.status === "Active" 
                      ? "bg-accent/20 text-accent border-accent/30" 
                      : "bg-muted text-muted-foreground"
                    }
                  >
                    {partner.status === "Active" && <span className="w-1.5 h-1.5 rounded-full bg-accent mr-1.5"></span>}
                    {partner.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-foreground">{partner.inventoryEvents}</TableCell>
                <TableCell className="text-right text-foreground">{partner.impressions}</TableCell>
                <TableCell className="text-right text-foreground">{partner.fillRate}</TableCell>
                <TableCell className="text-right text-foreground">{partner.viewability}</TableCell>
                <TableCell className="text-right text-foreground">{partner.ctr}</TableCell>
                <TableCell className="text-center">
                  <span className="text-accent font-medium">{partner.tags}</span>
                </TableCell>
                <TableCell className="text-right">
                  {partner.trend !== "—" && (
                    <span className={`flex items-center justify-end gap-1 ${partner.trendPositive ? "text-accent" : "text-destructive"}`}>
                      {partner.trendPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {partner.trend}
                    </span>
                  )}
                  {partner.trend === "—" && <span className="text-muted-foreground">—</span>}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Partners;
