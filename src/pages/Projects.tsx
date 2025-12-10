import { useMemo } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const Projects = () => {
  const columns = useMemo(() => {
    const left: typeof projects = [];
    const right: typeof projects = [];

    const estimateHeight = (project: (typeof projects)[number]) => {
      return (
        200 +
        project.challenges.length * 28 +
        project.stackIcons.length * 4 +
        project.whatItIs.length * 0.05
      );
    };

    projects.forEach((project) => {
      const leftHeight = left.reduce((sum, p) => sum + estimateHeight(p), 0);
      const rightHeight = right.reduce((sum, p) => sum + estimateHeight(p), 0);

      if (leftHeight <= rightHeight) {
        left.push(project);
      } else {
        right.push(project);
      }
    });

    return [left, right];
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-3">Projects</h1>
        <p className="text-lg text-muted-foreground">
          Software projects built across professional roles, academic research positions, and commissioned work.
        </p>
      </header>

      <div className="md:hidden space-y-6">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} delay={idx * 0.12} />
        ))}
      </div>

      <div className="hidden md:flex md:gap-6 lg:gap-8 items-start">
        {columns.map((col, idx) => (
          <div key={idx} className="flex-1 flex flex-col gap-6 lg:gap-8">
            {col.map((project, projectIdx) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={projectIdx * 0.12 + (idx === 1 ? 0.06 : 0)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
