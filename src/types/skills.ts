export interface Skill {
  name: string;
  years: number;
  icon: string;
}

export interface SkillCategory {
  languages: Skill[];
  frameworks: Skill[];
  cloud: Skill[];
  tools: Skill[];
  other: Skill[];
}
