import { Education } from "@/types/education";
import logoUCI from "@/assets/logo-uci.png";
import logoMcFarland from "@/assets/logo-mcfarland.png";
import heroUCI from "@/assets/hero-uci.jpg";
import heroMcFarland from "@/assets/hero-mcfarland.jpg";

export const education: Education[] = [
  {
    id: "uci",
    logo: logoUCI,
    hero: heroUCI,
    title: "Bachelor's Degree",
    institution: "University of California, Irvine",
    location: "Irvine, CA",
    date: "Expected June 2026",
    summary: [
      "Bachelor of Science in Mathematics",
      "Co-author of 2025 peer-reviewed article in \"Computer Science Education (Vol. 35, Issue 4)\"",
      "Advanced Coursework: Linear Algebra, Differential Equations, Abstract Algebra, Algorithms & Data Structures",
    ],
    details: [
      {
        title: "Mathematics Major, Computer Science Minor",
        description: "Completed comprehensive coursework including Linear Algebra, Differential Equations, Real Analysis, Data Structures, Algorithms, and Software Engineering. This rigorous interdisciplinary education combines advanced mathematical theory with practical computer science applications, enabling deep analytical thinking paired with technical implementation skills."
      },
      {
        title: "Advanced Coursework & Technical Foundation",
        description: "Focus on computational methods and statistical modeling provides a strong foundation for solving complex technical problems. Developed expertise in applying mathematical principles to real-world software engineering challenges through project-based learning and research opportunities."
      },
      {
        title: "Interdisciplinary Problem-Solving Approach",
        description: "This cross-disciplinary perspective enhances ability to design efficient algorithms, optimize systems, and create innovative technical solutions. The unique combination of mathematics and computer science coursework enables a holistic approach to solving complex computational challenges."
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
    date: "June 2020",
    summary: [
      "Graduated with Highest Honors (4.0+ GPA)",
      "Advanced STEM coursework in mathematics and sciences",
      "Valedictorian preparation and academic excellence"
    ],
    details: [
      {
        title: "Graduated with Highest Honors (4.0+ GPA)",
        description: "Maintained a GPA above 4.0 throughout all four years of high school, demonstrating exceptional dedication and consistent academic excellence across all subject areas. This achievement reflected strong work ethic, disciplined time management, and commitment to educational pursuits."
      },
      {
        title: "Advanced STEM Coursework",
        description: "Completed rigorous advanced placement courses in mathematics and sciences, building a comprehensive foundation in analytical thinking and problem-solving methodologies. This early exposure to higher-level STEM concepts established the groundwork for pursuing technical education at the university level."
      },
      {
        title: "Valedictorian Preparation and Academic Excellence",
        description: "Cultivated a genuine passion for STEM education and computational thinking during formative years. This early enthusiasm evolved into a commitment to pursuing higher education and a career in technology and mathematics, setting the foundation for future academic and professional success."
      }
    ]
  }
];
