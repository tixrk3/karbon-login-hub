import { useState } from "react";
import { Users, UserCheck, ShieldCheck, Clock, Search, Plus, MoreVertical, Mail } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const usersData = [
  { name: "Sarah Anderson", initials: "SA", email: "sarah.anderson@karbon14.com", role: "Administrator", status: "Active", accessLevel: 100, lastActive: "2 mins ago", joined: "1/15/2023", color: "bg-accent" },
  { name: "Michael Chen", initials: "MC", email: "michael.chen@karbon14.com", role: "Administrator", status: "Active", accessLevel: 100, lastActive: "1 hour ago", joined: "2/20/2023", color: "bg-primary" },
  { name: "Emma Rodriguez", initials: "ER", email: "emma.rodriguez@karbon14.com", role: "Regular User", status: "Active", accessLevel: 75, lastActive: "5 mins ago", joined: "6/10/2023", color: "bg-orange-500" },
  { name: "James Wilson", initials: "JW", email: "james.wilson@karbon14.com", role: "Regular User", status: "Active", accessLevel: 50, lastActive: "30 mins ago", joined: "8/5/2023", color: "bg-purple-500" },
  { name: "Lisa Thompson", initials: "LT", email: "lisa.thompson@karbon14.com", role: "Regular User", status: "Pending", accessLevel: 0, lastActive: "Never", joined: "2/15/2024", color: "bg-pink-500" },
  { name: "David Martinez", initials: "DM", email: "david.martinez@karbon14.com", role: "Regular User", status: "Inactive", accessLevel: 30, lastActive: "3 days ago", joined: "4/12/2023", color: "bg-red-500" },
];

const UsersPage = () => {
  const [search, setSearch] = useState("");

  const filtered = usersData.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Users className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground">Manage user access and permissions</p>
          </div>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
          <Plus className="h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} title="Total Users" value="6" />
        <StatCard icon={ShieldCheck} title="Administrators" value="2" />
        <StatCard icon={UserCheck} title="Active Users" value="4" />
        <StatCard icon={Clock} title="Pending" value="1" />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search users by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card border-border h-11" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((user) => (
          <div key={user.email} className="bg-card border border-border rounded-xl p-5 space-y-4 hover:border-accent/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-full ${user.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {user.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-semibold">{user.name}</p>
                    {user.role === "Administrator" && <span className="text-yellow-400 text-xs">👑</span>}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" /> {user.email}
                  </p>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="flex gap-2">
              <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs font-medium">{user.role}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                user.status === "Active" ? "bg-accent/20 text-accent" :
                user.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" :
                "bg-destructive/20 text-destructive"
              }`}>{user.status}</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Access Level</span>
                <span className="text-accent font-medium">{user.accessLevel}</span>
              </div>
              <Progress value={user.accessLevel} className="h-1.5" />
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
              <div>
                <p className="text-muted-foreground">Last Active</p>
                <p className="text-foreground">{user.lastActive}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Joined</p>
                <p className="text-foreground">{user.joined}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
