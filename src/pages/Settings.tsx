import { useState, useRef } from "react";
import { Settings as SettingsIcon, User, Shield, Bell, Key, Palette, Database, Eye, EyeOff, Monitor, Laptop, Smartphone, Tablet, Copy, Plus, Trash2, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

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

  // Profile state
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [profileName, setProfileName] = useState(user?.name || "Sarah Anderson");
  const [profileEmail, setProfileEmail] = useState("sarah.anderson@karbon14.com");
  const [profileTitle, setProfileTitle] = useState("Platform Administrator");
  const [profilePhone, setProfilePhone] = useState("+1 (555) 123-4567");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production Key", key: "k14_prod_aBcDeFgHiJkLmNoPqRsTuVwXyZ", created: "1/10/2024", lastUsed: "2 mins ago" },
    { id: 2, name: "Staging Key", key: "k14_stg_1234567890abcdefghijklmn", created: "3/05/2024", lastUsed: "1 day ago" },
  ]);
  const [newKeyName, setNewKeyName] = useState("");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
      toast({ title: "Avatar mis à jour", description: "Votre photo de profil a été changée." });
    }
  };

  const handleSaveProfile = () => {
    toast({ title: "Profil sauvegardé", description: "Vos modifications ont été enregistrées." });
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: "Clé copiée", description: "La clé API a été copiée dans le presse-papier." });
  };

  const generateKey = () => {
    if (!newKeyName.trim()) {
      toast({ title: "Erreur", description: "Veuillez entrer un nom pour la clé.", variant: "destructive" });
      return;
    }
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const key = "k14_" + Array.from({ length: 28 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    const today = new Date();
    setApiKeys([...apiKeys, { id: Date.now(), name: newKeyName, key, created: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`, lastUsed: "Never" }]);
    setNewKeyName("");
    toast({ title: "Clé générée", description: `La clé "${newKeyName}" a été créée.` });
  };

  const deleteKey = (id: number) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    toast({ title: "Clé supprimée", description: "La clé API a été supprimée." });
  };

  const initials = profileName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

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
                <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleAvatarChange} />
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="h-16 w-16 rounded-full object-cover" />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-xl">{initials}</div>
                )}
                <div>
                  <p className="text-foreground font-medium">{profileName}</p>
                  <p className="text-sm text-muted-foreground">{user?.role || "Administrator"}</p>
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="mt-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-xs">
                    Change Avatar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={profileName} onChange={(e) => setProfileName(e.target.value)} className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input value={profileTitle} onChange={(e) => setProfileTitle(e.target.value)} className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} className="bg-input border-border" />
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
                <Button onClick={handleSaveProfile} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">💾 Save Changes</Button>
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
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">API Keys</h2>
                <p className="text-sm text-muted-foreground">Manage your API keys for integration</p>
              </div>

              {/* Generate new key */}
              <div className="flex gap-3">
                <Input placeholder="Key name (e.g., Production)" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} className="bg-input border-border" />
                <Button onClick={generateKey} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 shrink-0">
                  <Plus className="h-4 w-4" /> Generate Key
                </Button>
              </div>

              {/* Keys list */}
              <div className="space-y-3">
                {apiKeys.map((ak) => (
                  <div key={ak.id} className="bg-muted/30 border border-border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-foreground font-medium">{ak.name}</p>
                      <div className="flex items-center gap-2">
                        <button onClick={() => copyKey(ak.key)} className="text-muted-foreground hover:text-foreground"><Copy className="h-4 w-4" /></button>
                        <button onClick={() => deleteKey(ak.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                    <code className="text-accent text-sm bg-muted/50 rounded px-2 py-1 block truncate">{ak.key}</code>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>Created: {ak.created}</span>
                      <span>Last used: {ak.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Appearance</h2>
                <p className="text-sm text-muted-foreground">Customize the look and feel of the platform</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Theme</h3>
                <p className="text-sm text-muted-foreground">Use the theme toggle in the top bar to switch between light and dark mode.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 border border-border rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:border-accent/50 transition-colors">
                    <Moon className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-foreground font-medium">Dark Mode</p>
                      <p className="text-xs text-muted-foreground">Reduced eye strain in low light</p>
                    </div>
                  </div>
                  <div className="bg-muted/30 border border-border rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:border-accent/50 transition-colors">
                    <Sun className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-foreground font-medium">Light Mode</p>
                      <p className="text-xs text-muted-foreground">Better visibility in bright environments</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Density</h3>
                <div className="flex gap-3">
                  {["Compact", "Default", "Comfortable"].map((d) => (
                    <button key={d} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${d === "Default" ? "bg-accent/20 text-accent border-accent/50" : "bg-muted/30 text-muted-foreground border-border hover:border-accent/30"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Language</h3>
                <Select defaultValue="en">
                  <SelectTrigger className="bg-input border-border w-64"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {activeTab === "dataprivacy" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Data & Privacy</h2>
                <p className="text-sm text-muted-foreground">Manage your data and privacy settings</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Analytics Collection", desc: "Allow us to collect anonymized usage analytics to improve the platform", on: true },
                  { name: "Crash Reports", desc: "Automatically send crash reports to help us fix bugs", on: true },
                  { name: "Marketing Emails", desc: "Receive product updates and marketing communications", on: false },
                  { name: "Third-Party Sharing", desc: "Share anonymized data with trusted third-party partners", on: false },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between bg-muted/30 border border-border rounded-lg p-4">
                    <div>
                      <p className="text-foreground font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.on} />
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <h3 className="font-semibold text-foreground">Data Management</h3>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-border text-foreground hover:bg-muted/50">📥 Export My Data</Button>
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">🗑️ Delete My Account</Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">💾 Save Changes</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;