import { useState } from "react";
import { Code, Sparkles, Building2, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTag: (tag: {
    name: string;
    partner: string;
    tagType: string;
    placement: string;
    description: string;
  }) => void;
}

export const CreateTagDialog = ({ open, onOpenChange, onCreateTag }: CreateTagDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    partner: "",
    tagType: "",
    placement: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.partner) {
      onCreateTag(formData);
      setFormData({ name: "", partner: "", tagType: "", placement: "", description: "" });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Code className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Create Verification Tag
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Generate a new ad verification tag for tracking and monitoring.
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Section Header */}
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            TAG CONFIGURATION
          </div>

          {/* Tag Name */}
          <div className="space-y-2">
            <Label htmlFor="tagName">
              Tag Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="tagName"
              placeholder="e.g., Google AdX Display Tag"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          {/* Partner & Tag Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Partner <span className="text-destructive">*</span>
              </Label>
              <Select 
                value={formData.partner} 
                onValueChange={(value) => setFormData({ ...formData, partner: value })}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select partner" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="Google AdX">Google AdX</SelectItem>
                  <SelectItem value="Amazon Publisher Services">Amazon Publisher Services</SelectItem>
                  <SelectItem value="Index Exchange">Index Exchange</SelectItem>
                  <SelectItem value="OpenX">OpenX</SelectItem>
                  <SelectItem value="PubMatic">PubMatic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                Tag Type
              </Label>
              <Select 
                value={formData.tagType} 
                onValueChange={(value) => setFormData({ ...formData, tagType: value })}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="display">Display</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="native">Native</SelectItem>
                  <SelectItem value="header">Header Bidding</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Placement Location */}
          <div className="space-y-2">
            <Label htmlFor="placement">Placement Location</Label>
            <Input
              id="placement"
              placeholder="e.g., Homepage Header, Sidebar"
              value={formData.placement}
              onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Additional details about this tag..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-background border-border min-h-[80px]"
            />
          </div>

          {/* Info Box */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-accent">Automated Tag Generation</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your verification tag will be automatically generated with a unique identifier. 
                  Copy and paste the code into your website to start tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
              disabled={!formData.name || !formData.partner}
            >
              Create Tag
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
