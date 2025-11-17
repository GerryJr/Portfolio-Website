export interface Education {
  id: string;
  logo: string;
  hero: string;
  title: string;
  institution: string;
  location: string;
  date: string;
  summary: string[];
  details: {
    title: string;
    description: string;
  }[];
}
