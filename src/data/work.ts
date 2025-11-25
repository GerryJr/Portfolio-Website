import { WorkExperience } from "@/types/work";
import logoDLL from "@/assets/logo-dll.png";
import logoCPLeads from "@/assets/logo-cpleads.png";
import logoCodeAI from "@/assets/logo-codeai.jpg";
import logoTutor from "@/assets/logo-tutor.png";
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
    title: "AWS Full Stack Developer",
    company: "Digital Learning Lab",
    location: "Irvine, CA",
    dateRange: "Jan 2024 – Present",
    summary: [
      "RAG Testing Platform for AI model evaluation",
      "Cost Optimization reducing data extraction costs by 60%",
      "LTI 1.3 Integration connecting PapyrusAI to Canvas LMS"
    ],
    details: [
      {
        title: "RAG Testing Platform for AI Model Evaluation",
        description: "Architected and developed a comprehensive Retrieval-Augmented Generation testing platform using React, TypeScript, and AWS Lambda for serverless backend processing. The platform enables researchers to evaluate AI models with real-time data extraction and analysis capabilities, providing powerful tools to assess model performance, accuracy, and reliability in production-like environments."
      },
      {
        title: "Cost Optimization Reducing Costs by 60%",
        description: "Implemented highly efficient AWS Lambda functions and optimized data pipelines through strategic use of Lambda layers, intelligent caching mechanisms, and optimized API calls. This cost reduction enabled the lab to scale their research operations significantly without proportional budget increases, while maintaining high performance and reliability."
      },
      {
        title: "LTI 1.3 Integration Connecting PapyrusAI to Canvas LMS",
        description: "Successfully integrated PapyrusAI into Canvas Learning Management System using the Learning Tools Interoperability (LTI) 1.3 standard, enabling seamless AI-powered educational tools for thousands of students. Implemented secure OAuth 2.0 authentication flows, deep linking capabilities, and grade passback functionality, allowing students to access advanced AI tutoring directly within their Canvas courses."
      }
    ],
    technologies: [
      "AWS Lambda",
      "React",
      "TypeScript",
      "Python",
      "LTI 1.3",
      "OAuth 2.0",
      "Canvas API"
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
      "User Behavior Analysis identifying key engagement patterns",
      "Natural Language Processing with Topic Modeling & Sentiment Analysis",
      "Data Visualization dashboards in R using ggplot2"
    ],
    details: [
      {
        title: "User Behavior Analysis Identifying Key Engagement Patterns",
        description: "Conducted comprehensive analysis of user engagement across the CP-LEADS platform, examining login frequencies, session durations, content interaction rates, and feature utilization. Utilized advanced statistical methods including cohort analysis, retention modeling, and funnel analysis to identify key trends. Findings directly informed product development priorities and user experience enhancements, resulting in measurable improvements in user satisfaction metrics."
      },
      {
        title: "Natural Language Processing with Topic Modeling & Sentiment Analysis",
        description: "Applied sophisticated Topic Modeling techniques (Latent Dirichlet Allocation) and Sentiment Analysis to understand user feedback and content themes at scale. Processed thousands of user comments, survey responses, and support tickets to extract meaningful patterns and emotional sentiment. These insights provided actionable intelligence for content strategy optimization, identifying which topics resonated most with users and helped shape content creation guidelines used by the content team."
      },
      {
        title: "Data Visualization Dashboards in R using ggplot2",
        description: "Created comprehensive interactive dashboards and static reports in R using ggplot2, plotly, and shiny libraries. Transformed complex datasets into intuitive visual narratives that made sophisticated analysis accessible to non-technical stakeholders. Dashboards included real-time metrics tracking, trend analysis, comparative visualizations, and predictive forecasting models, becoming essential resources for executive decision-making and strategic planning sessions."
      }
    ],
    technologies: [
      "R",
      "ggplot2",
      "Topic Modeling (LDA)",
      "Sentiment Analysis",
      "Statistical Analysis",
      "Cohort Analysis",
      "Predictive Modeling"
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
      "Team Leadership for Python-based web generator development",
      "Quality Assurance achieving 85% test coverage",
      "API Automation for Google Colab notebooks reducing manual effort by 70%"
    ],
    details: [
      {
        title: "Team Leadership for Python-Based Web Generator Development",
        description: "Led a cross-functional team of 4 developers in building a sophisticated Python-based web generator tool using Flask framework. Coordinated bi-weekly sprints following Agile methodologies, facilitated daily standups, and conducted thorough code reviews. Managed project timelines using Jira and mentored junior developers on Python best practices and design patterns, successfully delivering the project 2 weeks ahead of schedule."
      },
      {
        title: "Quality Assurance Achieving 85% Test Coverage",
        description: "Developed and implemented a comprehensive testing strategy using pytest and unittest frameworks, improving code coverage from 45% to over 85%. Created unit tests, integration tests, and end-to-end test suites that significantly reduced production bugs. Introduced automated testing pipelines in CI/CD workflows using GitHub Actions, and this testing infrastructure became the standard for all subsequent projects at CodeAI."
      },
      {
        title: "API Automation for Google Colab Notebooks Reducing Manual Effort by 70%",
        description: "Designed and implemented an automated system for collecting and processing Google Colab notebooks via their API, streamlining the previously manual workflow. Built robust error handling, retry mechanisms, and logging systems to ensure reliable operation at scale. The automation system processed over 1,000 notebooks weekly, extracting code patterns, dependencies, and execution results, freeing up significant team resources for more strategic development initiatives."
      }
    ],
    technologies: [
      "Python",
      "Flask",
      "pytest",
      "unittest",
      "REST APIs",
      "GitHub Actions",
      "Team Leadership",
      "Agile/Scrum"
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
        description: "Provided individualized Python tutoring to UCI undergraduate students, adapting teaching methods and pace to match each student's unique learning style, background, and goals. Developed custom lesson plans that addressed specific knowledge gaps while building on existing strengths. Utilized various teaching techniques including visual aids, hands-on coding exercises, and conceptual explanations. Students consistently reported grade improvements of one full letter grade or more, with several achieving perfect scores on their Python programming courses."
      },
      {
        title: "Comprehensive Python Curriculum Covering Fundamentals to Advanced Topics",
        description: "Taught complete Python fundamentals including data types, control structures, functions, and object-oriented programming principles. Advanced topics included file I/O operations, API integration, data manipulation with pandas and numpy, web scraping with BeautifulSoup, and web development with Flask. Also introduced students to essential development tools including Git version control, debugging techniques with pdb, virtual environments, and writing clean, maintainable code following PEP 8 style guidelines."
      },
      {
        title: "Practical Application Focus with Real-World Projects and Problem-Solving",
        description: "Emphasized real-world application of programming concepts through hands-on projects that mirrored actual software development scenarios. Students built portfolio-worthy projects including web scrapers, data analysis tools, simple games, and RESTful APIs. Each project incorporated industry-standard practices such as proper documentation, error handling, and code testing. This practical approach prepared students for technical interviews and professional software development roles, with several students securing internships directly as a result of skills gained during tutoring sessions."
      }
    ],
    technologies: [
      "Python Fundamentals",
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "APIs & REST",
      "Flask",
      "pandas & numpy",
      "Git",
      "Testing & Debugging"
    ]
  }
];
