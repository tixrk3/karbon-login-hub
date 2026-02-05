import { useState } from "react";
import { Plus, Search, Code, CheckCircle, Zap, AlertTriangle, Eye, MoreVertical, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { CreateTagDialog } from "@/components/tags/CreateTagDialog";
import { useToast } from "@/hooks/use-toast";

interface TagData {
  id: number;
  name: string;
  partner: string;
  status: "Active" | "Pending" | "Inactive";
  scriptUrl: string;
  events: string;
  lastFired: string;
  errorRate: string;
  iconColor: string;
}

const initialTagsData: TagData[] = [
  {
    id: 1,
    name: "Google AdX Display Tag",
    partner: "Google AdX",
    status: "Active",
    scriptUrl: "https://verify.karbon14.com/tags/gdx_12345.js",
    events: "1,234,567",
    lastFired: "2 mins ago",
    errorRate: "0.02%",
    iconColor: "bg-accent",
  },
  {
    id: 2,
    name: "Amazon Video Verification",
    partner: "Amazon Publisher Services",
    status: "Active",
    scriptUrl: "https://verify.karbon14.com/tags/aps_video_67890.js",
    events: "892,345",
    lastFired: "1 min ago",
    errorRate: "0.01%",
    iconColor: "bg-pink-500",
  },
  {
    id: 3,
    name: "Index Exchange Header",
    partner: "Index Exchange",
    status: "Active",
    scriptUrl: "https://verify.karbon14.com/tags/idx_header_34567.js",
    events: "567,234",
    lastFired: "5 mins ago",
    errorRate: "0.03%",
    iconColor: "bg-cyan-400",
  },
  {
    id: 4,
    name: "OpenX Mobile Banner",
    partner: "OpenX",
    status: "Pending",
    scriptUrl: "https://verify.karbon14.com/tags/oxm_mobile_89012.js",
    events: "0",
    lastFired: "Never",
    errorRate: "—",
    iconColor: "bg-pink-400",
  },
  {
    id: 5,
    name: "PubMatic Native Ad",
    partner: "PubMatic",
    status: "Inactive",
    scriptUrl: "https://verify.karbon14.com/tags/pm_native_45678.js",
    events: "234,567",
    lastFired: "2 days ago",
    errorRate: "0.15%",
    iconColor: "bg-emerald-400",
  },
];

const Tags = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tagsData, setTagsData] = useState<TagData[]>(initialTagsData);
  const { toast } = useToast();

  const handleCopyScript = (scriptUrl: string) => {
    navigator.clipboard.writeText(`<script src="${scriptUrl}"></script>`);
    toast({
      title: "Copié !",
      description: "Le script a été copié dans le presse-papier.",
    });
  };

  const handleCreateTag = (newTag: { name: string; partner: string; tagType: string; placement: string; description: string }) => {
    const tagId = Math.random().toString(36).substring(7);
    const tag: TagData = {
      id: tagsData.length + 1,
      name: newTag.name,
      partner: newTag.partner,
      status: "Active",
      scriptUrl: `https://verify.karbon14.com/tags/${tagId}.js`,
      events: "0",
      lastFired: "Never",
      errorRate: "0%",
      iconColor: "bg-accent",
    };
    setTagsData([tag, ...tagsData]);
    toast({
      title: "Tag créé !",
      description: `Le tag "${newTag.name}" a été créé avec succès.`,
    });
  };

  const getStatusBadge = (status: TagData["status"]) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-accent/20 text-accent border-accent/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "Inactive":
        return (
          <Badge className="bg-muted text-muted-foreground border-border">
            <CheckCircle className="w-3 h-3 mr-1" />
            Inactive
          </Badge>
        );
    }
  };

  const totalTags = tagsData.length;
  const activeTags = tagsData.filter(t => t.status === "Active").length;
  const totalEvents = tagsData.reduce((acc, t) => acc + (parseInt(t.events.replace(/,/g, "")) || 0), 0);
  const avgErrorRate = "0.04%";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-accent">
            <Code className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Verification Tags
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <span className="text-accent">⚙</span>
              Manage and monitor your ad verification tags
            </p>
          </div>
        </div>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Tag
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tags"
          value={totalTags}
          icon={Code}
          iconBgClass="bg-primary/20"
        />
        <StatCard
          title="Active Tags"
          value={activeTags}
          icon={CheckCircle}
          iconBgClass="bg-accent/20"
        />
        <StatCard
          title="Total Events"
          value={`${(totalEvents / 1000000).toFixed(1)}M`}
          icon={Zap}
          iconBgClass="bg-secondary/20"
        />
        <StatCard
          title="Avg Error Rate"
          value={avgErrorRate}
          icon={AlertTriangle}
          iconBgClass="bg-primary/20"
        />
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tags or partners..." 
            className="pl-10 bg-card border-border"
          />
        </div>
      </div>

      {/* Tags List */}
      <div className="space-y-4">
        {tagsData.map((tag) => (
          <div key={tag.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${tag.iconColor}`}>
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">{tag.name}</h3>
                    {getStatusBadge(tag.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{tag.partner}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-accent hover:bg-accent/20">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Script Code */}
            <div className="bg-background border border-border rounded-lg p-3 flex items-center justify-between mb-4">
              <code className="text-sm text-accent font-mono">
                {`<script src="${tag.scriptUrl}"></script>`}
              </code>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => handleCopyScript(tag.scriptUrl)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Events</p>
                <p className="text-lg font-semibold text-foreground">{tag.events}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Fired</p>
                <p className="text-lg font-semibold text-foreground">{tag.lastFired}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Error Rate</p>
                <p className={`text-lg font-semibold ${tag.errorRate === "—" ? "text-muted-foreground" : "text-destructive"}`}>
                  {tag.errorRate}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateTagDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        onCreateTag={handleCreateTag}
      />
    </div>
  );
};

export default Tags;
