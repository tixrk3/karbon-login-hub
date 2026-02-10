import { useState } from "react";
import { Users, UserCheck, Eye, TrendingUp, Search, Plus, MoreVertical } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const partnersData = [
  { name: "Google AdX", email: "partner@google.com", status: "Active", inventoryEvents: "845,234", impressions: "623,891", fillRate: "73.8%", viewability: "76.2%", ctr: "2.8%", tags: 12, trend: "+12.5%", trendType: "positive" as const },
  { name: "Amazon Publisher Services", email: "ads@amazon.com", status: "Active", inventoryEvents: "723,456", impressions: "534,234", fillRate: "73.8%", viewability: "72.1%", ctr: "2.4%", tags: 8, trend: "+8.3%", trendType: "positive" as const },
  { name: "Index Exchange", email: "support@indexexchange.com", status: "Active", inventoryEvents: "612,890", impressions: "445,678", fillRate: "72.7%", viewability: "68.5%", ctr: "2.1%", tags: 6, trend: "-2.1%", trendType: "negative" as const },
  { name: "OpenX", email: "publishers@openx.com", status: "Active", inventoryEvents: "534,123", impressions: "389,234", fillRate: "72.9%", viewability: "71.8%", ctr: "2.6%", tags: 5, trend: "+5.7%", trendType: "positive" as const },
  { name: "PubMatic", email: "info@pubmatic.com", status: "Warning", inventoryEvents: "423,567", impressions: "298,456", fillRate: "70.5%", viewability: "65.3%", ctr: "1.9%", tags: 4, trend: "-4.2%", trendType: "negative" as const },
  { name: "Rubicon Project", email: "support@magnite.com", status: "Active", inventoryEvents: "389,234", impressions: "287,123", fillRate: "73.8%", viewability: "69.4%", ctr: "2.3%", tags: 7, trend: "+3.8%", trendType: "positive" as const },
];

const Partners = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = partnersData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Partners</h1>
          <p className="text-muted-foreground">Manage and monitor your advertising partners</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
          <Plus className="h-4 w-4" /> Add Partner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} title="Total Partners" value="6" />
        <StatCard icon={UserCheck} title="Active Partners" value="5" />
        <StatCard icon={Eye} title="Avg Viewability" value="70.5%" />
        <StatCard icon={TrendingUp} title="Avg CTR" value="2.35%" />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search partners..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card border-border h-11"
        />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left py-3 px-4 font-medium">Partner</th>
              <th className="text-left py-3 px-4 font-medium">Status</th>
              <th className="text-right py-3 px-4 font-medium">Inventory Events</th>
              <th className="text-right py-3 px-4 font-medium">Impressions</th>
              <th className="text-right py-3 px-4 font-medium">Fill Rate</th>
              <th className="text-right py-3 px-4 font-medium">Viewability</th>
              <th className="text-right py-3 px-4 font-medium">CTR</th>
              <th className="text-center py-3 px-4 font-medium">Tags</th>
              <th className="text-right py-3 px-4 font-medium">Trend</th>
              <th className="py-3 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.name} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-4">
                  <p className="text-foreground font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.email}</p>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                    p.status === "Active" ? "bg-accent/20 text-accent" : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {p.status}
                  </span>
                </td>
                <td className="text-right py-3 px-4 text-foreground">{p.inventoryEvents}</td>
                <td className="text-right py-3 px-4 text-foreground">{p.impressions}</td>
                <td className="text-right py-3 px-4 text-foreground">{p.fillRate}</td>
                <td className="text-right py-3 px-4 text-foreground">{p.viewability}</td>
                <td className="text-right py-3 px-4 text-foreground">{p.ctr}</td>
                <td className="text-center py-3 px-4">
                  <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs font-medium">{p.tags}</span>
                </td>
                <td className="text-right py-3 px-4">
                  <span className={p.trendType === "positive" ? "text-accent" : "text-destructive"}>
                    📈 {p.trend}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Partner Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add New Partner</DialogTitle>
            <p className="text-sm text-muted-foreground">Configure a new advertising partner and set up verification tags for ad tracking.</p>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-xs font-semibold text-accent uppercase tracking-wider">🏢 Partner Information</p>
            <div className="space-y-2">
              <Label>Partner Name *</Label>
              <Input placeholder="e.g., Google AdX, Amazon APS" className="bg-input border-border" />
            </div>
            <div className="space-y-2">
              <Label>📧 Contact Email *</Label>
              <Input placeholder="partner@example.com" className="bg-input border-border" />
            </div>
            <div className="space-y-2">
              <Label>🌐 Category</Label>
              <Select>
                <SelectTrigger className="bg-input border-border"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ssp">SSP</SelectItem>
                  <SelectItem value="dsp">DSP</SelectItem>
                  <SelectItem value="exchange">Exchange</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-xs font-semibold text-accent uppercase tracking-wider pt-2">⚙️ API Configuration</p>
            <div className="space-y-2">
              <Label>API Endpoint</Label>
              <Input placeholder="https://api.partner.com/v1/ads" className="bg-input border-border" />
            </div>
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input type="password" placeholder="••••••••••••••••••" className="bg-input border-border" />
              <p className="text-xs text-muted-foreground">* API credentials are encrypted and stored securely.</p>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Additional notes or configuration details..." className="bg-input border-border" />
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <p className="text-accent font-medium text-sm">⚡ Automatic Tag Generation</p>
              <p className="text-xs text-muted-foreground">After adding this partner, verification tags will be automatically generated and ready for deployment. You can manage tags from the Tags section.</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowModal(false)} className="border-border">Cancel</Button>
              <Button onClick={() => setShowModal(false)} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                🔒 Add Partner
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Partners;
