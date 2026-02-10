import { useState } from "react";
import { Settings as SettingsIcon, User, Shield, Bell, Key, Palette, Database, Eye, EyeOff, Monitor, Laptop, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "apikeys", label: "API Keys", icon: Key },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "dataprivacy", label: "Data & Privacy", icon: Database },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
          <SettingsIcon className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-accent">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-56 space-y-1 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-card border border-border rounded-xl p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Profile Settings</h2>
                <p className="text-sm text-muted-foreground">Manage your personal information</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-xl">SA</div>
                <div>
                  <p className="text-foreground font-medium">{user?.name || "Sarah Anderson"}</p>
                  <p className="text-sm text-muted-foreground">Administrator</p>
                  <Button variant="outline" size="sm" className="mt-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-xs">Change Avatar</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="Sarah Anderson" className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input defaultValue="sarah.anderson@karbon14.com" className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input defaultValue="Platform Administrator" className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input defaultValue="+1 (555) 123-4567" className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select><SelectTrigger className="bg-input border-border"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="engineering">Engineering</SelectItem><SelectItem value="marketing">Marketing</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select><SelectTrigger className="bg-input border-border"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="utc">UTC</SelectItem><SelectItem value="est">EST</SelectItem><SelectItem value="pst">PST</SelectItem></SelectContent></Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">💾 Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Security Settings</h2>
                <p className="text-sm text-muted-foreground">Manage your account security</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">🔒 Change Password</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="Enter current password" className="bg-input border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <div className="relative">
                      <Input type={showNewPassword ? "text" : "password"} placeholder="Enter new password" className="bg-input border-border pr-10" />
                      <button onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="Re-enter new password" className="bg-input border-border" />
                  </div>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Update Password</Button>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-2">🛡️ Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Active Sessions</h3>
                  <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground text-xs">Revoke All</Button>
                </div>
                {[
                  { device: 'MacBook Pro 16"', browser: "Chrome · San Francisco, CA", icon: Laptop, current: true },
                  { device: "iPhone 14 Pro", browser: "Safari · San Francisco, CA", icon: Smartphone, current: false },
                  { device: "iPad Air", browser: "Safari · Los Angeles, CA", icon: Tablet, current: false },
                ].map((session) => (
                  <div key={session.device} className="flex items-center justify-between bg-muted/30 border border-border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <session.icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-foreground font-medium">{session.device}</p>
                        <p className="text-xs text-muted-foreground">{session.browser}</p>
                      </div>
                    </div>
                    {session.current ? (
                      <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs font-medium">Current</span>
                    ) : (
                      <button className="text-destructive text-xs font-medium hover:underline">Revoke</button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">💾 Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Notification Preferences</h2>
                <p className="text-sm text-muted-foreground">Control what notifications you receive</p>
              </div>
              {[
                { name: "Email Notifications", desc: "Receive email updates about your account activity", on: true },
                { name: "Tag Alerts", desc: "Get notified when tags fire or encounter errors", on: true },
                { name: "Performance Reports", desc: "Weekly performance summary and analytics", on: true },
                { name: "Partner Updates", desc: "Updates about partner status and changes", on: false },
                { name: "Security Alerts", desc: "Critical security notifications and warnings", on: true },
                { name: "System Updates", desc: "Platform updates and new feature announcements", on: false },
              ].map((notif) => (
                <div key={notif.name} className="flex items-center justify-between bg-muted/30 border border-border rounded-lg p-4">
                  <div>
                    <p className="text-foreground font-medium">{notif.name}</p>
                    <p className="text-sm text-muted-foreground">{notif.desc}</p>
                  </div>
                  <Switch defaultChecked={notif.on} />
                </div>
              ))}
              <div className="flex justify-end">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">💾 Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === "apikeys" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">API Keys</h2>
              <p className="text-sm text-muted-foreground">Manage your API keys for integration</p>
              <div className="bg-muted/30 border border-border rounded-lg p-4 text-center text-muted-foreground">
                No API keys configured yet.
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Appearance</h2>
              <p className="text-sm text-muted-foreground">Customize the look and feel</p>
              <div className="bg-muted/30 border border-border rounded-lg p-4 text-center text-muted-foreground">
                Theme settings are managed via the toggle in the top bar.
              </div>
            </div>
          )}

          {activeTab === "dataprivacy" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Data & Privacy</h2>
              <p className="text-sm text-muted-foreground">Manage your data and privacy settings</p>
              <div className="bg-muted/30 border border-border rounded-lg p-4 text-center text-muted-foreground">
                Data & Privacy settings coming soon.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
