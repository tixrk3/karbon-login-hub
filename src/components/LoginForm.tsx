import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import karbon14Logo from "@/assets/karbon14-logo.png";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      toast({ title: "Erreur", description: "Email ou mot de passe incorrect.", variant: "destructive" });
    }
  };

  return (
    <div className="login-card w-full max-w-md p-8 md:p-10 relative overflow-hidden">
      {/* Subtle gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
      
      <div className="flex justify-center mb-8">
        <img src={karbon14Logo} alt="KARBON14" className="h-32 w-auto drop-shadow-2xl" style={{ filter: "drop-shadow(0 20px 40px hsl(170 85% 45% / 0.3))" }} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium text-sm tracking-wide">E-mail</Label>
          <Input id="email" type="email" placeholder="Entrez votre e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-input/80 border-border text-foreground placeholder:text-muted-foreground h-12 rounded-xl focus:ring-2 focus:ring-accent/40 focus:border-accent/50 backdrop-blur-sm" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium text-sm tracking-wide">Mot de passe</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-input/80 border-border text-foreground placeholder:text-muted-foreground h-12 rounded-xl pr-12 focus:ring-2 focus:ring-accent/40 focus:border-accent/50 backdrop-blur-sm" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-sm text-accent hover:text-accent/80 transition-colors">Mot de passe oublié ?</a>
        </div>

        <Button type="submit" className="w-full h-12 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-xl hover:opacity-90 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
          Se connecter
        </Button>

        <Button type="button" variant="outline" className="w-full h-12 border-border hover:border-accent/50 text-foreground hover:text-accent font-semibold rounded-xl transition-all duration-300" onClick={() => navigate("/site")}>
          Visitez le site KARBON14
        </Button>
      </form>

      <p className="text-center text-muted-foreground text-xs mt-8 tracking-wider">Platform version: 1.0.8.16</p>
    </div>
  );
};
