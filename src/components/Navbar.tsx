import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, Info } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-accent group-hover:shadow-glow transition-all duration-300">
              <Lock className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Devanagari PIN
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant={isActive("/") ? "default" : "ghost"}
              className={isActive("/") ? "bg-gradient-primary shadow-accent" : ""}
            >
              <Link to="/">
                <Lock className="w-4 h-4 mr-2" />
                Generator
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/about") ? "default" : "ghost"}
              className={isActive("/about") ? "bg-gradient-primary shadow-accent" : ""}
            >
              <Link to="/about">
                <Info className="w-4 h-4 mr-2" />
                About
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
