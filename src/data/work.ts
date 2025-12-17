import { WorkExperience } from "@/types/work";
import logoDLL from "@/assets/logo-dll.png";
import logoCPLeads from "@/assets/logo-cpleads.png";
import logoCodeAI from "@/assets/logo-codeai.webp";
import logoTutor from "@/assets/logo-tutor.webp";
// import heroDLL from "@/assets/hero-dll.jpg";
// import heroCPLeads from "@/assets/hero-cpleads.jpg";
// import heroCodeAI from "@/assets/hero-codeai.jpg";
// import heroTutor from "@/assets/hero-tutor.jpg";

// Placeholder for images images 
var heroDLL: any;
var heroCPLeads: any;
var heroCodeAI: any;
var heroTutor: any;

export const workExperience: WorkExperience[] = [
  {
    id: "dll",
    logo: logoDLL,
    hero: heroDLL,
    title: "Software Engineer",
    company: "Digital Learning Lab",
    location: "Irvine, CA",
    dateRange: "Jan 2024 – Present",
    summary: [
      "Connected PapyrusAI to Canvas via secure LTI 1.3 integration used across school districts.",
      "Built an internal RAG + LLM testing tool that scaled AI experiments across dozens of models.",
      "Automated PapyrusAI data exports, turning 30-minute manual pulls into seconds-fast CSV downloads."
    ],
    details: [
      {
        title: "Canvas LTI 1.3 Integration for PapyrusAI",
        description:
          "Implemented a secure LTI 1.3 integration between PapyrusAI and Canvas using AWS Lambda, Cognito, and multi-tenant DynamoDB. This enabled districts to roll out PapyrusAI inside Canvas with isolated data and minimal extra engineering per institution."
      },
      {
        title: "RAG + LLM Tester Platform for Researchers",
        description:
          "Designed an internal tester that runs thousands of prompts across 40+ LLMs in one workflow, backed by AWS Lambda and API Gateway. Standardized distinct model APIs and added optional vector-database RAG so researchers could quickly compare models and export results."
      },
      {
        title: "High-Volume PapyrusAI Data Export Pipeline",
        description:
          "Built a serverless Python+pandas pipeline that joins multiple PapyrusAI DynamoDB tables into filtered CSVs on demand. Admins and researchers now get analysis-ready exports over millions of messages in seconds instead of 30+ minutes of manual querying."
      }
    ],
    technologies: [
      "Python",
      "Typescript",
      "R",
      "AWS Console",
      "AWS Lambda",
      "DynamoDB",
      "AWS CDK",
      "Bedrock",
      "React",
      "HTML/CSS",
      "LTI 1.3",
      "OAuth 2.0",
      "JWT",
      "Docker",
      "Pandas",
      "Agile"
    ]
  },
  {
    id: "cpleads",
    logo: logoCPLeads,
    hero: heroCPLeads,
    title: "Data Analyst",
    company: "CP-LEADS",
    location: "Irvine, CA",
    dateRange: "Jan 2024 – Nov 2024",
    summary: [
      "Analyzed user behavior data to uncover how people engaged with AI-supported tools.",
      "Applied sentiment analysis and topic modeling to thousands of messages to surface key themes.",
      "Created R visualizations that turned complex datasets into figures used in talks and publications."
    ],
    details: [
      {
        title: "Behavior and Usage Analysis",
        description:
          "Cleaned and analyzed platform usage logs with Python and pandas to quantify logins, activity patterns, and feature use over time. These findings guided which experiences to study more deeply and which product directions were worth investing in."
      },
      {
        title: "NLP on User Messages: Sentiment and Topic Modeling",
        description:
          "Ran sentiment analysis and topic modeling in Python and R on thousands of anonymized user messages. The results highlighted what users were trying to do with AI, where they struggled, and which types of interactions aligned with healthy learning behaviors."
      },
      {
        title: "R Reporting and Visualizations for Researchers",
        description:
          "Produced R-based tables and plots that combined behavioral metrics with NLP outputs in a digestible format. These visuals were used in CP-LEADS presentations and manuscripts, helping non-technical collaborators quickly understand the data and act on it."
      }
    ],
    technologies: [
      "R",
      "Python",
      "Pandas",
      "ggplot2",
      "Natural Language Processing (NLP)",
      "Topic Modeling (LDA)",
      "Sentiment Analysis",
      "Statistical Analysis",
      "Predictive Modeling",
      "DynamoDB",
    ]
  },
  {
    id: "codeai",
    logo: logoCodeAI,
    hero: heroCodeAI,
    title: "Software Engineer Intern",
    company: "CodeAI",
    location: "Remote",
    dateRange: "Jun 2023 – Sep 2023",
    summary: [
      "Created a Python package that generated full HTML sites from notebook-style code.",
      "Integrated Google Drive API to automatically save user projects from Google Colab.",
      "Introduced Modular Unittesting for our Python Package."
    ],
    details: [
      {
        title: "Python Webpage Creation Package",
        description:
          "Built a Python library that converts structured Python code into HTML pages so users could build simple sites without touching traditional frontend stacks. This made it easier for instructors and learners to ship web-based examples directly from code."
      },
      {
        title: "Google Colab and Drive API Automation",
        description:
          "Added Google Colab and Drive API integration so notebook projects were automatically saved and versioned. This automation reduced lost work, simplified review for instructors, and cut down on support around file management."
      },
      {
        title: "Introduced Modular Unittesting for our Python Package",
        description:
          "Created standardized unit testing to validate package functionality and reliability during development. This was to support the flow of production to ensure other commited work did not break existing features."
      }
    ],
    technologies: [
      "Python",
      "Google Drive API",
      "Google Colab",
      "HTML/CSS",
      "pytest",
      "unittest",
      "REST APIs",
      "Team Leadership",
      "Agile"
    ]
  },
  {
    id: "tutor",
    logo: logoTutor,
    hero: heroTutor,
    title: "Private Python Tutor",
    company: "Independent Contractor",
    location: "Irvine, CA",
    dateRange: "Nov 2021 – May 2023",
    summary: [
      "Personalized 1-on-1 Instruction tailored to individual learning styles",
      "Comprehensive Python Curriculum covering fundamentals to advanced topics",
      "Practical Application Focus with real-world projects and problem-solving"
    ],
    details: [
      {
        title: "Personalized 1-on-1 Instruction Tailored to Individual Learning Styles",
        description:
          "Provided individualized Python tutoring to UCI undergraduate students, adapting teaching methods and pace to match each student's unique learning style, background, and goals. Developed custom lesson plans that addressed specific knowledge gaps while building on existing strengths."
      },
      {
        title: "Comprehensive Python Curriculum Covering Fundamentals to Advanced Topics",
        description:
          "Taught core Python fundamentals such as data types, control structures, functions, and object-oriented programming, along with more advanced lessons including file I/O, API integration, pandas and numpy for data work, web scraping with BeautifulSoup, and Git/GitHub usage."
      },
      {
        title: "Practical Application with Real-World Projects",
        description:
          "Supported students in building real projects by showing them how to break problems down, stay organized, and work through challenges confidently."
      }
    ],
    technologies: [
      "Python Fundamentals",
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "APIs & REST",
      "pandas & numpy",
      "Git",
      "Testing & Debugging",
    ]
  }
];
