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
  stackText: string[]; // must match stackIcons 1:1
  challenges: [string, string]; // exactly 2, each ≤ 90 chars
  impact: string; // 1 line with a number
  links: {
    live?: string;
    repo?: string;
    demo?: string;
  };
}

// Validation helper
export function validateProject(project: Project): boolean {
  if (project.challenges.length !== 2) {
    console.error(`Project ${project.id}: challenges must have exactly 2 items`);
    return false;
  }
  if (project.stackIcons.length !== project.stackText.length) {
    console.error(`Project ${project.id}: stackIcons and stackText must match 1:1`);
    return false;
  }
  return true;
}
