export interface WorkExperience {
  id: string;
  logo: string;
  hero: string;
  title: string;
  company: string;
  location: string;
  dateRange: string;
  summary: string[];
  details: {
    title: string;
    description: string;
  }[];
  technologies: string[];
}
