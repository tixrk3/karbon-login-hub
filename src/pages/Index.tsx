import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginForm } from "@/components/LoginForm";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Background Blobs */}
      <div className="blob blob-primary w-80 h-80 -top-20 -left-20" style={{ animationDelay: "0s" }} />
      <div className="blob blob-accent w-96 h-96 -bottom-32 -right-32" style={{ animationDelay: "2s" }} />
      <div className="blob blob-secondary w-64 h-64 top-1/4 right-1/4" style={{ animationDelay: "4s" }} />
      <div className="blob blob-primary w-48 h-48 bottom-1/4 left-1/4" style={{ animationDelay: "1s" }} />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
