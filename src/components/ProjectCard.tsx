import { useState } from "react";
import { Project } from "@/types/project";
import { TechIcon } from "./TechIcon";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Calendar, Lock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const MAX_ICONS = 14;
  const visibleIcons = project.stackIcons.slice(0, MAX_ICONS);
  const hiddenCount = project.stackIcons.length - MAX_ICONS;
  const [isOpen, setIsOpen] = useState(false);
  const challengesId = `${project.id}-challenges`;

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={challengesId}
      onClick={() => setIsOpen((prev) => !prev)}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }}
      className="h-full border-border hover:border-accent overflow-hidden bg-gradient-to-br from-muted/5 to-transparent shadow-md hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      {/* Project Image */}
      <div className="w-full h-48 overflow-hidden bg-muted relative">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width={1200}
          height={768}
        />
        {/* subtle image overlay to add depth */}
        <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none" aria-hidden />
      </div>

      <CardContent className="p-6 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 font-heading">{project.title}</h3>
        
        {/* Employer & Role - Made Prominent */}
        <div className="mb-3 p-3 bg-accent/5 border-l-4 border-accent rounded">
          {project.employer && (
            <p className="text-base font-semibold text-accent mb-1">{project.employer}</p>
          )}
          <p className="text-base font-medium text-foreground">{project.role}</p>
          <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{project.date}</span>
          </div>
        </div>
        {/* What it is */}
        <div className="mb-3">
          <p className="text-sm text-foreground leading-relaxed">
            <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-muted/70 text-[11px] uppercase tracking-wide font-semibold text-muted-foreground mr-2 align-middle">
              Project:
            </span>
            {project.whatItIs}
          </p>
        </div>
        
        {/* Visual Stack Icons with Names */}
        <div className="flex items-start gap-3 mb-3 flex-wrap" role="list" aria-label="Technology stack">
          {visibleIcons.map((tech, idx) => (
            <div key={idx} role="listitem" className="flex flex-col items-center gap-1 w-14">
              <TechIcon name={tech.name} icon={tech.icon} svgPath={tech.svgPath} size={30} />
              <span className="text-[11px] text-muted-foreground text-center leading-snug">{tech.name}</span>
            </div>
          ))}
          {hiddenCount > 0 && (
            <span
              className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded self-center"
              title={project.stackIcons.slice(MAX_ICONS).map(t => t.name).join(", ")}
            >
              +{hiddenCount}
            </span>
          )}
        </div>
        
        {/* Challenges */}
        <div className="mb-3">
          <div className="w-full flex items-center justify-between text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-muted/70 text-[11px] tracking-wide font-semibold text-muted-foreground">
                Key Challenges:
              </span>
              <span
                className={`text-[11px] font-semibold text-muted-foreground/90 tracking-wide uppercase transition-all duration-300 ease-in-out ${isOpen ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"}`}
                aria-hidden={isOpen}
              >
                See more
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </div>
          <div
            id={challengesId}
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
            aria-hidden={!isOpen}
          >
            <ul className="space-y-1.5 text-sm text-foreground pt-1">
              {project.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-accent mr-2">-</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Impact */}
        <div className="mb-3">
          <p className="text-sm leading-relaxed text-foreground">
            <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-muted/70 text-[11px] uppercase tracking-wide font-semibold text-muted-foreground mr-2 align-middle">
              Impact:
            </span>
            <span className="font-semibold text-accent">{project.impact}</span>
          </p>
        </div>
        
        {/* Links */}
        <div className="flex gap-2 mt-auto">
          {project.links.live && (
            <Button variant="default" size="sm" asChild>
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 mr-1.5" />
                Live
              </a>
            </Button>
          )}
          {project.links.demo && (
            <Button variant="default" size="sm" asChild>
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 mr-1.5" />
                Demo
              </a>
            </Button>
          )}
          {project.links.repo && !project.links.private && (
            <Button variant="secondary" size="sm" asChild>
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <Github className="w-4 h-4 mr-1.5" />
                Repo
              </a>
            </Button>
          )}
          {project.links.private && (
            <Button
              variant="outline"
              size="sm"
              disabled
              aria-disabled="true"
              className="bg-muted text-foreground/70 border-muted hover:bg-muted/95 disabled:opacity-80"
            >
              <Lock className="w-4 h-4 mr-1.5" />
              <span className="text-xs text-foreground/70">
                {project.links.private || "Private"}
              </span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
