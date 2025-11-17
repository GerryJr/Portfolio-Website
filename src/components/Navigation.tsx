import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/experience", label: "Experience" },
    { to: "/skills", label: "Skills" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <NavLink to="/" className="font-heading text-xl font-semibold">
            Gerardo Lopez
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-accent",
                    isActive
                      ? "text-foreground border-b-2 border-accent"
                      : "text-muted-foreground"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="/Gerardo-Lopez-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            <span
              className={cn(
                "w-7 h-1 bg-foreground rounded-full transition-all duration-400 ease-in-out origin-center",
                isOpen && "rotate-[-45deg] translate-y-[10px]"
              )}
            />
            <span
              className={cn(
                "w-7 h-1 bg-foreground rounded-full transition-all duration-400 ease-in-out",
                isOpen && "translate-x-10 opacity-0"
              )}
            />
            <span
              className={cn(
                "w-7 h-1 bg-foreground rounded-full transition-all duration-400 ease-in-out origin-center",
                isOpen && "rotate-45 translate-y-[-10px]"
              )}
            />
          </button>
        </div>

        {/* Mobile Nav */}
        <div 
          className={cn(
            "md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out",
            isOpen ? "max-h-96" : "max-h-0"
          )}
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block text-sm font-medium transition-colors",
                    isActive ? "text-accent font-semibold" : "text-muted-foreground hover:text-accent"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="/Gerardo-Lopez-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
