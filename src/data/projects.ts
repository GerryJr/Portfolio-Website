import { Project, validateProject } from "@/types/project";
import projectLLMTester from "@/assets/project-tester-tool.png";
import projectLtiCanvas from "@/assets/project-lti-canvas.png";
import projectResearchPlatform from "@/assets/project-research-platform.png";
import projectEtlPipeline from "@/assets/project-etl-pipeline.png";
import projectPapyrusAI from "@/assets/project-papyrusai.png";
import projectPython2Html from "@/assets/project-webpage-creation.png";
import projectStorageTracker from "@/assets/project-sortage-tracker.png";
import porjectMortgageTracker from "@/assets/project-mortgage.png"
import porjectOrangeCalc from "@/assets/project-orange-calc.png"

const iconAWS = { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" }
const iconLambda = { name: "Lambda", icon: "https://icon.icepanel.io/AWS/svg/Compute/Lambda.svg" }
const iconDynamoDB = { name: "DynamoDB", icon: "https://icon.icepanel.io/AWS/svg/Database/DynamoDB.svg" }
const iconCognito = { name: "Cognito", icon: "https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/Cognito.svg" }
const iconGateway = { name: "API Gateway", icon: "https://icon.icepanel.io/AWS/svg/App-Integration/API-Gateway.svg" }
const iconDocker = { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"}
const iconReact = { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }
const iconTS = { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" }
const iconHTML = { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" }
const iconExpo = { name: "Expo", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg" }
const iconSupabase = { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" }
const iconNodeJS = { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" }
const iconS3 = { name: "S3", icon: "https://icon.icepanel.io/AWS/svg/Storage/Simple-Storage-Service.svg" }
const iconBedrock = { name: "Bedrock", icon: "https://www.awsicon.com/static/images/Service-Icons/Artificial-Intelligence/16/svg/Bedrock.svg" }
const iconCDK = { name: "CDK", icon: "https://www.awsicon.com/static/images/Service-Icons/Developer-Tools/16/svg/Cloud-Development-Kit.svg" }
const iconPython = { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" }
const iconCloudWatch = { name: "CloudWatch", icon: "https://icon.icepanel.io/AWS/svg/Management-Governance/CloudWatch.svg" }
const iconPostman = { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" }
const iconPandas = { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" }
const iconMongoDB = { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" }
const iconGoogleCloud = { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" }
const iconR = { name: "R", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rstudio/rstudio-original.svg" }
const iconKubernetes = { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" }
const iconJWT = { name: "JWT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg" }
const iconExpress = { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" }
const iconRedis = { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" }
const iconGithub = { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" }
const iconTerraform = { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" }
const iconGoogleAPI = { name: "Drive API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" }
const iconGoogleColab = { name: "Google Colab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecolab/googlecolab-original.svg" }
const iconStreamlit = { name: "Streamlit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg" }


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
      iconAWS, iconTS, iconCDK, iconLambda, iconDynamoDB, iconCognito, iconGateway, iconCloudWatch, iconPostman, iconDocker, iconReact, iconHTML
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
      iconExpo, iconSupabase, iconReact, iconTS, iconHTML,
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
      iconAWS, iconPython, iconTS, iconCDK, iconS3, iconLambda, iconBedrock, iconPostman, iconGateway, iconCloudWatch, iconCognito, iconDocker, iconReact, iconHTML
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
      iconAWS, iconPython, iconPandas, iconCDK, iconLambda, iconDynamoDB, iconPostman, iconGateway, iconCloudWatch
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
      iconPython, iconPandas, iconPostman, iconR, iconGateway, iconCloudWatch
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
      iconGoogleCloud, iconPython, iconMongoDB, iconReact, iconTS, iconHTML
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
      iconR, iconPython, iconPandas, iconDynamoDB,
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
      iconGoogleAPI, iconPython, iconGoogleColab, iconHTML
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
      iconStreamlit, iconPython, iconHTML
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
