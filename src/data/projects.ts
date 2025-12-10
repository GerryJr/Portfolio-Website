import { Project, validateProject } from "@/types/project";
import projectLLMTester from "@/assets/project-tester-tool.png";
import projectLtiCanvas from "@/assets/project-lti-canvas.webp";
import projectResearchPlatform from "@/assets/project-research-platform.png";
import projectEtlPipeline from "@/assets/project-etl-pipeline.webp";
import projectPapyrusAI from "@/assets/project-papyrusai.webp";
import projectPython2Html from "@/assets/project-webpage-creation.png";
import projectStorageTracker from "@/assets/project-sortage-tracker.webp";
import porjectMortgageTracker from "@/assets/project-mortgage.webp";
import porjectOrangeCalc from "@/assets/project-orange-calc.png";
import { icons } from "./icons";


export const projects: Project[] = [
  {
    id: "lti-canvas-integration",
    title: "Website Integration with Canvas",
    whatItIs: "Secure learning tool integration enabling course data exchange between Canvas LMS and third-party educational app using LTI 1.3 handshake.",
    employer: "Digital Learning Lab",
    role: "AWS Full Stack Developer",
    date: "Jun 2025 - Present",
    image: projectLtiCanvas,
    stackIcons: [
      icons.aws, icons.typescript, icons.nodejs, icons.cdk, icons.lambda, icons.dynamodb, icons.cognito, icons.gateway, icons.cloudwatch, icons.postman, icons.docker, icons.react, icons.html
    ],
    challenges: [
      "Coordinated with an external contractor to deliver a secure, compliant LTI 1.3 integration.",
      "Built multi-tenant data isolation in DynamoDB using Lambda functions across multiple institutions.",
      "Created unified Canvas launch and authentication flows using API Gateway and Cognito in TypeScript.",
    ],
    impact: "Enabled 10,000+ students to access personalized learning content seamlessly across different school districts.",
    links: {
      private: "Work Repo"
    },
  },
  {
    id: "custom-wms",
    title: "Custom Warehouse Management System",
    whatItIs: "Commissioned web and mobile system for a Virginia warehouse, enabling NFC item tracking and admin control.",
    employer: "",
    role: "Solo Developer",
    date: "Aug 2025 - Present",
    image: projectStorageTracker,
    stackIcons: [
      icons.expo, icons.supabase, icons.react, icons.typescript, icons.html,
    ],
    challenges: [
      "Built real-time inventory syncing with Supabase for scans, NFC events, and updates.",
      "Developed offline-ready Expo and React interfaces using fast TypeScript workflows.",
      "Implemented secure role access and event logging using Supabase policies.",
    ],
    impact: "Accelerated warehouse operations and improved accuracy with unified mobile scanning and web-based admin tools.",
    links: {
      private: "Under Development"
    },
  },
  {
    id: "research-data-platform",
    title: "RAG + LLM Tester Tool",
    whatItIs: "An internal research platform enabling large-scale testing of 5,000+ of prompts across 40+ LLMs, with Retrieval-Augmented Generation (RAG) as an add-on.",
    employer: "Digital Learning Lab",
    role: "AWS Full-Stack Developer",
    date: "Jul 2024 - May 2025",
    image: projectLLMTester,
    stackIcons: [
      icons.aws, icons.python, icons.typescript, icons.nodejs, icons.cdk, icons.s3, icons.lambda, icons.bedrock, icons.postman, icons.gateway, icons.cloudwatch, icons.cognito, icons.docker, icons.react, icons.html
    ],
    challenges: [
      "Independently architected a scalable AWS backend using CDK for fast, trackable development.",
      "Managed high-volume data flow, returning structured outputs to the frontend for researcher analysis.",
      "Integrated a vector database and unified diverse LLM APIs into one consistent RAG-enabled testing workflow.",
    ],
    impact: "Enabled researchers to run thousands of RAG-enhanced LLM tests at scale, accelerating model evaluation across many changing AI systems.",
    links: {
      private: "Work Repo",
    },
  },
  {
    id: "papyrusai-data-extraction",
    title: "PapyrusAI Data Extraction",
    whatItIs: "A data extraction pipeline that optimizes for DynamoDB tables into downloadable CSVs, aggregating millions of messages for analysis.",
    employer: "Digital Learning Lab",
    role: "AWS Full-Stack Developer",
    date: "Mar 2024 - Jun 2024",
    image: projectPapyrusAI,
    stackIcons: [
      icons.aws, icons.python, icons.pandas, icons.cdk, icons.lambda, icons.dynamodb, icons.postman, icons.gateway, icons.cloudwatch
    ],
    challenges: [
      "First time building CDK infrastructure to allow multiple developers to deploy Lambda services safely to production.",
      "Processed millions of DynamoDB records using Python and Pandas with batched reads, pagination, and CloudWatch-guided performance tuning.",
      "Implemented org-level admin access and filtering through API Gateway + Cognito, validating flows with Postman.",
    ],
    impact: "Automated a 30-minute multi-table extraction process into a seconds-fast export pipeline powered by AWS Lambda.",
    links: {
      live: "https://www.digitallearninglab.org/papyrusai.html",
    },
  },
  {
    id: "real-time-analytics-dashboard",
    title: "Stress Testing Custom APIs",
    whatItIs: "A Python-driven load testing pipeline that ran smoke, stress, spike, and soak tests on AWS APIs, with R used to graph performance metrics and bottlenecks.",
    employer: "Digital Learning Lab",
    role: "AWS Full Stack Developer",
    date: "Jan 2024 - Feb 2024",
    image: projectEtlPipeline,
    stackIcons: [
      icons.python, icons.pandas, icons.postman, icons.r, icons.gateway, icons.cloudwatch
    ],
    challenges: [
      "Developed async Python stress tests that emulated real-world concurrency against AWS API endpoints and related services.",
      "Captured and stored detailed latency and throughput data across thousands of test requests.",
      "Used R to graph performance trends and identify API bottlenecks under varying load sizes.",
    ],
    impact: "Revealed critical API bottlenecks and thresholds that improved system stability under high load, enabling informed developmental decisions.",
    links: {
      private: "Work Repo",
    },
  },
  {
    id: "mortage-tracker",
    title: "Multi-Mortage Tracker",
    whatItIs: "A Google Cloud–hosted web app built with React + TypeScript, Python, and MongoDB to track multiple mortgages and share real-time payment status between co-owners.",
    employer: "",
    role: "Solo Developer",
    date: "Oct 2023 - Feb 2024",
    image: porjectMortgageTracker,
    stackIcons: [
      icons.googlecloud, icons.python, icons.mongodb, icons.react, icons.typescript, icons.html
    ],
    challenges: [
      "Designed a MongoDB schema to support multiple mortgages per user while safely sharing views with co-owners.",
      "Built Python backend services on Google Cloud to compute amortization, remaining balance, and payment projections.",
      "Developed a React + TypeScript + HTML frontend that surfaces up-to-date payment status and history from the API.",
    ],
    impact: "Allowed borrowers and co-owners a safe way to view and update multiple mortgages, replacing manual spreadsheets and making payment status understandable for both parties.",
    links: {
      private: "Delivered to Client"
    },
  },
  {
    id: "microservices-api-gateway",
    title: "User Engagement Analysis",
    whatItIs: "A Natural Language Processing (NLP) and Statistical research pipeline for analyzing user messages.",
    employer: "CP-LEADS",
    role: "Data Analyst",
    date: "Jan 2024 - Nov 2024",
    image: projectResearchPlatform,
    stackIcons: [
      icons.r, icons.python, icons.pandas, icons.dynamodb,
    ],
    challenges: [
      "Used Python and Pandas to clean and preprocess large-scale DynamoDB exports for downstream NLP analysis.",
      "Applied R-based topic modeling to uncover recurring themes and visualize message patterns across courses.",
      "Combined sentiment outputs and topic clusters into a single research dataset for comparative analysis.",
    ],
    impact: "Produced interpretable sentiment trends and topic structures that enabled researchers to better understand user behavior and refine platform design.",
    links: {
      private: "Work Repo",
    },
  },
  {
    id: "ci-cd-automation-pipeline",
    title: "Python Webpage Creation Package",
    whatItIs: "A Python package that lets users build full HTML webpages directly from Google Colab notebooks, with automatic project saving through the Google Drive API.",
    employer: "CodeAI",
    role: "Software Engineer Intern",
    date: "Jun 2023 - Sep 2023",
    image: projectPython2Html,
    stackIcons: [
      icons.googleApi, icons.python, icons.googleColab, icons.html
    ],
    challenges: [
      "Designed a Python-to-HTML conversion system that turned user-written Colab code blocks into structured webpages.",
      "Integrated Google Drive API to auto-save project files, ensuring users' work persisted across sessions.",
      "Created standardized unti testing to validate package functionality and reliability during development.",
    ],
    impact: "Enabled non-web developers to produce HTML pages from simple Python notebooks, eliminating the need to learn frontend tools.",
    links: {
      private: "Work Repo",
    },
  },
  {
    id: "orange-calculator",
    title: "Mandarin Calculator",
    whatItIs: "A Streamlit web app built in Python that automates mandarin-production calculations for employees, replacing manual math with a simple interactive interface.",
    employer: "",
    role: "Solo Developer",
    date: "Jun 2022 - Jan 2023",
    image: porjectOrangeCalc,
    stackIcons: [
      icons.streamlit, icons.python, icons.html
    ],
    challenges: [
      "Built a Streamlit UI that handled all calculator logic in Python while rendering clean, HTML-backed components.",
      "Converted hand-computed formulas into reliable programmatic calculations to eliminate user error.",
      "Designed the app to be simple enough for daily use by several employees with no technical background.",
    ],

    impact: "Replaced manual production math with a fast, error-proof tool used daily by employees, removing the need to memorize formulas and improving calculation speed.",
    links: {
      private: "Delivered to Client"
    },
  },
];

// Validate all projects on import
projects.forEach(validateProject);
