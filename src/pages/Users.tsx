import { Plus, Search, Users as UsersIcon, Shield, UserCheck, MoreVertical } from "lucide-react";
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

const usersData = [
  {
    id: 1,
    name: "Sarah Anderson",
    email: "sarah@karbon14.com",
    role: "Administrator",
    status: "Active",
    lastActive: "2 mins ago",
    avatar: "SA",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@karbon14.com",
    role: "Manager",
    status: "Active",
    lastActive: "15 mins ago",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emily Johnson",
    email: "emily@karbon14.com",
    role: "Analyst",
    status: "Active",
    lastActive: "1 hour ago",
    avatar: "EJ",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@karbon14.com",
    role: "Viewer",
    status: "Inactive",
    lastActive: "3 days ago",
    avatar: "DK",
  },
];

const Users = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">Manage user access and permissions</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Users"
          value="4"
          icon={UsersIcon}
          iconBgClass="bg-primary/20"
        />
        <StatCard
          title="Administrators"
          value="1"
          icon={Shield}
          iconBgClass="bg-accent/20"
        />
        <StatCard
          title="Active Users"
          value="3"
          icon={UserCheck}
          iconBgClass="bg-secondary/20"
        />
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search users..." 
            className="pl-10 bg-card border-border"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">User</TableHead>
              <TableHead className="text-muted-foreground">Role</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Last Active</TableHead>
              <TableHead className="text-muted-foreground w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData.map((user) => (
              <TableRow key={user.id} className="border-border hover:bg-muted/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      user.role === "Administrator" 
                        ? "border-accent text-accent" 
                        : "border-border text-muted-foreground"
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={user.status === "Active" 
                      ? "bg-accent/20 text-accent border-accent/30" 
                      : "bg-muted text-muted-foreground"
                    }
                  >
                    {user.status === "Active" && <span className="w-1.5 h-1.5 rounded-full bg-accent mr-1.5"></span>}
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
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

export default Users;
