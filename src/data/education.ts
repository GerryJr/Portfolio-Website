import { Education } from "@/types/education";
import logoUCI from "@/assets/logo-uci.webp";
import logoMcFarland from "@/assets/logo-mcfarland.webp";
import heroUCI from "@/assets/hero-uci.webp";
import heroMcFarland from "@/assets/hero-mcfarland.webp";

export const education: Education[] = [
  {
    id: "uci",
    logo: logoUCI,
    hero: heroUCI,
    title: "Bachelor's Degree",
    institution: "University of California, Irvine",
    location: "Irvine, CA",
    date: "Expected Sep 2026",
    summary: [
      "Bachelor of Science in Mathematics",
      "Co-author of 2025 peer-reviewed article in \"Computer Science Education (Vol. 35, Issue 4)\"",
      "Worked closely with UCI faculty on research across STEM subjects",
    ],
    details: [
      {
        title: "Bachelor of Science in Mathematics",
        description: "Relative Coursework: Algorithms & Data Structures, Optimization, Statistical Modeling, Linear Algebra, Differential Equations, Abstract Algebra"
      },
      {
        title: "Co-Author of 2025 Peer-Reviewed Article",
        description: "Contributed to research analytics published in the prestigious journal \"Computer Science Education (Vol. 35, Issue 4)\" in the article titled \"Empowering Latine elementary school students with disabilities: computer programming through culturally sustaining curriculum\"."
      },
      {
        title: "Worked closely with UCI faculty on research",
        description: "Collaborated with Professors in UCI by assisting in data collection, analysis, and interpretation across various STEM subjects as an undergraduate research assistant. Gained hands-on experience in experimental design, statistical analysis, and academic writing."
      }
    ]
  },
  {
    id: "mcfarland",
    logo: logoMcFarland,
    hero: heroMcFarland,
    title: "High School Diploma",
    institution: "McFarland High School",
    location: "McFarland, CA",
    date: "",
    summary: [
      "Highest Honors Recipient",
      "Mathematics Medallion Recipient",
      "Future Farmers of America Officer",
    ],
    details: [
      {
        title: "Graduated with Highest Honors",
        description: "Maintained a GPA above 4.0 throughout all four years of high school, demonstrating exceptional dedication and consistent academic excellence across all subject areas."
      },
      {
        title: "Mathematics Medallion Recipient",
        description: "Only student in the graduating class to receive the Mathematics Medallion, awarded for outstanding performance and dedication in advanced mathematics coursework."
      },
      {
        title: "Future Farmers of America (FFA) Officer",
        description: "While most clubs and extracurriculars are forgotten after graduation, I was an FFA member/officer for all 4 years of higheschool. While I wasn't the most pationate about farms, it taught me leadership skills that I still use today. Also, I now know a disturbing amount of plants, seeds, and insects for being a non-farmer :)"
      }
    ]
  }
];
