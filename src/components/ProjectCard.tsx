import { Project } from "@/types/project";
import { TechIcon } from "./TechIcon";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const MAX_ICONS = 8;
  const visibleIcons = project.stackIcons.slice(0, MAX_ICONS);
  const hiddenCount = project.stackIcons.length - MAX_ICONS;

  return (
    <Card className="h-full border-border hover:border-accent transition-colors duration-200 overflow-hidden">
      {/* Project Image */}
      <div className="w-full h-48 overflow-hidden bg-muted">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width={1200}
          height={768}
        />
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
        <p className="text-sm text-foreground mb-2">{project.whatItIs}</p>
        
        {/* Visual Stack Icons with Names */}
        <div className="flex items-start gap-3 mb-3 flex-wrap" role="list" aria-label="Technology stack">
          {visibleIcons.map((tech, idx) => (
            <div key={idx} role="listitem" className="flex flex-col items-center gap-1">
              <TechIcon name={tech.name} icon={tech.icon} svgPath={tech.svgPath} size={28} />
              <span className="text-xs text-muted-foreground">{tech.name}</span>
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
        <div className="mb-2.5 flex-grow">
          <h4 className="text-sm font-medium mb-1.5">Key Challenges</h4>
          <ul className="space-y-1.5 text-sm text-foreground">
            {project.challenges.map((challenge, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Impact */}
        <div className="mb-3">
          <p className="text-sm font-medium text-accent">{project.impact}</p>
        </div>
        
        {/* Links */}
        <div className="flex gap-2 mt-auto">
          {project.links.live && (
            <Button variant="default" size="sm" asChild>
              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1.5" />
                Live
              </a>
            </Button>
          )}
          {project.links.demo && (
            <Button variant="default" size="sm" asChild>
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1.5" />
                Demo
              </a>
            </Button>
          )}
          {project.links.repo && (
            <Button variant="secondary" size="sm" asChild>
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-1.5" />
                Repo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
