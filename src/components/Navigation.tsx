import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { key: "home", to: "/", label: "Home", type: "route" as const },
      { key: "projects", to: "/projects", label: "Projects", type: "route" as const },
      { key: "experience", to: "/experience", label: "Experience", type: "route" as const },
      { key: "skills", to: "/skills", label: "Skills", type: "route" as const },
      { key: "about", to: "/about", label: "About", type: "route" as const },
      { key: "resume", href: "/Gerardo-Lopez-Resume.pdf", label: "Resume", type: "anchor" as const },
    ],
    []
  );

  const baseLink =
    "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 no-underline " +
    "after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-[80%] after:bg-black after:rounded-full " +
    "after:scale-x-0 after:opacity-0 after:origin-center after:transition-transform after:duration-350 after:ease-[cubic-bezier(0.33,1,0.68,1)] after:content-['']";

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <NavLink to="/" className="font-heading text-xl font-semibold">
            Gerardo Lopez
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <NavLink
                  key={link.key}
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    cn(
                      baseLink,
                      "hover:text-foreground hover:bg-black/5 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive
                        ? "text-foreground font-semibold after:scale-x-100 after:opacity-100"
                        : "text-muted-foreground"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ) : (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    baseLink,
                    "text-muted-foreground hover:text-foreground hover:bg-black/5 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  {link.label}
                </a>
              )
            )}
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
            {navLinks.map((link) =>
              link.type === "route" ? (
                <NavLink
                  key={link.key}
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
              ) : (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
