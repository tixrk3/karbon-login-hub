import { useState } from "react";
import { Tag, Code, Plus, Search, Eye, Copy, MoreVertical, CheckCircle, AlertTriangle, Activity } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "@/hooks/use-toast";

const tagsData = [
  { id: 1, name: "Google AdX Display Tag", partner: "Google AdX", type: "Display", status: "Active", events: "1,234,567", successRate: "99.98%", errorRate: "0.02%", created: "1/15/2024", script: '<script src="https://verify.karbon14.com/tags/gdx_12345.js"></script>' },
  { id: 2, name: "Amazon APS Video Tag", partner: "Amazon Publisher Services", type: "Video", status: "Active", events: "987,654", successRate: "99.95%", errorRate: "0.05%", created: "2/01/2024", script: '<script src="https://verify.karbon14.com/tags/aps_67890.js"></script>' },
  { id: 3, name: "Index Exchange Native Tag", partner: "Index Exchange", type: "Native", status: "Active", events: "654,321", successRate: "99.92%", errorRate: "0.08%", created: "3/10/2024", script: '<script src="https://verify.karbon14.com/tags/ix_11223.js"></script>' },
  { id: 4, name: "OpenX Banner Tag", partner: "OpenX", type: "Display", status: "Warning", events: "432,100", successRate: "99.80%", errorRate: "0.20%", created: "4/05/2024", script: '<script src="https://verify.karbon14.com/tags/ox_44556.js"></script>' },
  { id: 5, name: "PubMatic Rich Media Tag", partner: "PubMatic", type: "Rich Media", status: "Active", events: "321,789", successRate: "99.90%", errorRate: "0.10%", created: "5/20/2024", script: '<script src="https://verify.karbon14.com/tags/pm_78901.js"></script>' },
];

const activityData = [
  { hour: "00:00", events: 1200 }, { hour: "04:00", events: 1500 },
  { hour: "08:00", events: 2800 }, { hour: "12:00", events: 3500 },
  { hour: "16:00", events: 3800 }, { hour: "20:00", events: 3200 },
  { hour: "24:00", events: 2500 },
];

const Tags = () => {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTag, setSelectedTag] = useState<typeof tagsData[0] | null>(null);

  const filtered = tagsData.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const copyScript = (script: string) => {
    navigator.clipboard.writeText(script);
    toast({ title: "Script copié !", description: "Le code a été copié dans le presse-papier." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Verification Tags</h1>
          <p className="text-muted-foreground">Manage your ad verification tags</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
          <Plus className="h-4 w-4" /> Create Tag
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Tag} title="Total Tags" value="5" />
        <StatCard icon={CheckCircle} title="Active Tags" value="4" />
        <StatCard icon={Activity} title="Total Events" value="3.6M" change="+8.2%" changeType="positive" />
        <StatCard icon={AlertTriangle} title="Avg Error Rate" value="0.04%" />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search tags..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card border-border h-11" />
      </div>

      <div className="space-y-3">
        {filtered.map((tag) => (
          <div key={tag.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-accent/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Code className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-foreground font-medium">{tag.name}</p>
                <p className="text-xs text-muted-foreground">{tag.partner} · {tag.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                tag.status === "Active" ? "bg-accent/20 text-accent" : "bg-yellow-500/20 text-yellow-400"
              }`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {tag.status}
              </span>
              <span className="text-muted-foreground hidden md:inline">Events: <span className="text-foreground">{tag.events}</span></span>
              <button onClick={() => setSelectedTag(tag)} className="text-muted-foreground hover:text-foreground">
                <Eye className="h-4 w-4" />
              </button>
              <button onClick={() => copyScript(tag.script)} className="text-muted-foreground hover:text-foreground">
                <Copy className="h-4 w-4" />
              </button>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Tag Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Code className="h-4 w-4 text-primary-foreground" />
              </div>
              Create Verification Tag
            </DialogTitle>
            <p className="text-sm text-muted-foreground">Generate a new ad verification tag for tracking and monitoring.</p>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-xs font-semibold text-accent uppercase tracking-wider">✨ Tag Configuration</p>
            <div className="space-y-2">
              <Label>Tag Name *</Label>
              <Input placeholder="e.g., Google AdX Display Tag" className="bg-input border-border" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>🏢 Partner *</Label>
                <Select>
                  <SelectTrigger className="bg-input border-border"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google AdX</SelectItem>
                    <SelectItem value="amazon">Amazon APS</SelectItem>
                    <SelectItem value="index">Index Exchange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>📋 Tag Type</Label>
                <Select>
                  <SelectTrigger className="bg-input border-border"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="display">Display</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="native">Native</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Placement Location</Label>
              <Input placeholder="e.g., Homepage Header, Sidebar" className="bg-input border-border" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Additional details about this tag..." className="bg-input border-border" rows={3} />
            </div>

            <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-accent/30 rounded-lg p-3">
              <p className="text-accent font-medium text-sm">✨ Automated Tag Generation</p>
              <p className="text-xs text-muted-foreground">Your verification tag will be automatically generated with a unique identifier. Copy and paste the code into your website to start tracking.</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowCreate(false)} className="border-border">Cancel</Button>
              <Button onClick={() => setShowCreate(false)} className="bg-gradient-to-r from-primary to-accent text-primary-foreground gap-2">
                <Code className="h-4 w-4" /> Create Tag
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tag Detail Modal */}
      <Dialog open={!!selectedTag} onOpenChange={() => setSelectedTag(null)}>
        <DialogContent className="bg-card border-border text-foreground max-w-2xl">
          {selectedTag && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2 text-accent">
                  <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Code className="h-4 w-4 text-accent" />
                  </div>
                  {selectedTag.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <p className="text-foreground font-medium">Tag Status: Active</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Last fired 2 mins ago</p>
                </div>

                <div>
                  <p className="text-foreground font-medium mb-2 flex items-center gap-2"><Code className="h-4 w-4" /> Tag Code</p>
                  <div className="bg-muted border border-border rounded-lg p-3 flex items-center justify-between">
                    <code className="text-accent text-sm">{selectedTag.script}</code>
                    <button onClick={() => copyScript(selectedTag.script)} className="text-muted-foreground hover:text-foreground ml-3">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Copy this code and paste it into your website's header or where you want to track ad events.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Activity className="h-3 w-3" /> Total Events</p>
                    <p className="text-lg font-bold text-foreground">{selectedTag.events}</p>
                  </div>
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Success Rate</p>
                    <p className="text-lg font-bold text-accent">{selectedTag.successRate}</p>
                  </div>
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Error Rate</p>
                    <p className="text-lg font-bold text-foreground">{selectedTag.errorRate}</p>
                  </div>
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Code className="h-3 w-3" /> Created</p>
                    <p className="text-lg font-bold text-foreground">{selectedTag.created}</p>
                  </div>
                </div>

                <div>
                  <p className="text-foreground font-medium mb-2 flex items-center gap-2"><Activity className="h-4 w-4 text-accent" /> Event Activity (Last 24 Hours)</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                      <Line type="monotone" dataKey="events" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: "hsl(var(--accent))", r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tags;
