export interface TechIcon {
  name: string;
  svgPath?: string;
  icon?: string;
  docUrl?: string;
}

export interface Project {
  id: string;
  title: string; // ≤ 50 chars
  whatItIs: string; // ≤ 140 chars
  employer?: string; // Company/organization name
  role: string;
  date: string; // Project completion date (e.g., "March 2024")
  image: string; // Project screenshot/visual
  stackIcons: TechIcon[];
  challenges: [string] | [string, string] | [string, string, string] | [string, string, string, string]; // At most 4, each ≤ 90 chars
  impact: string; // 1 line with a number
  links: {
    live?: string;
    repo?: string;
    demo?: string;
    private?: string;
  };
}

// Validation helper
export function validateProject(project: Project): boolean {
  if (project.challenges.length > 4) {
    console.error(`Project ${project.id}: challenges cannot have more than 4 items`);
    return false;
  }
  return true;
}
