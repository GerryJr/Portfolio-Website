export interface Skill {
  name: string;
  years: number;
  icon: string;
  iconDark?: string;
  invertOnDark?: boolean;
}

export interface SkillCategory {
  languages: Skill[];
  frameworks: Skill[];
  cloud: Skill[];
  tools: Skill[];
  other: Skill[];
}
