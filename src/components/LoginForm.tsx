import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import karbon14Logo from "@/assets/karbon14-logo.png";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="login-card w-full max-w-md p-8 md:p-10">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img
          src={karbon14Logo}
          alt="KARBON14"
          className="h-32 w-auto drop-shadow-2xl"
          style={{
            filter: "drop-shadow(0 20px 40px rgba(19, 179, 168, 0.3))",
          }}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Entrez votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium">
            Mot de passe
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12 rounded-lg pr-12 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <a
            href="#"
            className="text-sm text-primary hover:text-accent transition-colors"
          >
            Mot de passe oublié ?
          </a>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-primary/25"
        >
          Se connecter
        </Button>

        {/* Visit Website Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-lg transition-all"
          onClick={() => window.open("https://karbon14.com", "_blank")}
        >
          Visitez le site KARBON14
        </Button>
      </form>

      {/* Platform Version */}
      <p className="text-center text-muted-foreground text-sm mt-8">
        Platform version: 1.0.8.16
      </p>
    </div>
  );
};
