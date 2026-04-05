import { Project, validateProject } from "@/types/project";
import projectLLMTester from "@/assets/project-tester-tool.png";
import projectLtiCanvas from "@/assets/project-lti-canvas.webp";
import projectResearchPlatform from "@/assets/project-research-platform.png";
import projectEtlPipeline from "@/assets/project-etl-pipeline.webp";
import projectPapyrusAI from "@/assets/project-papyrusai.webp";
import projectPython2Html from "@/assets/project-webpage-creation.png";
import projectStorageTracker from "@/assets/project-storage-tracker.webp";
import projectMortgageTracker from "@/assets/project-mortgage.webp";
import projectOrangeCalc from "@/assets/project-orange-calc.png";
import projectCultivateFitness from "@/assets/project-cultivate-fitness.png";
import projectClooless from "@/assets/project-clooless.png";
import { icons, apiIcons, dbIcons } from "./icons";


export const projects: Project[] = [
  {
    id: "clooless-fan-site",
    title: "Clooless Tracking Website",
    whatItIs: "A fan-built interactive website for the Clooless crew (4.6M+ YouTube subscribers) featuring scroll-driven canvas animations, live Twitch status, and a Cloudflare Workers data layer.",
    employer: "",
    role: "Solo Developer",
    date: "Mar 2026 - Present",
    image: projectClooless,
    stackIcons: [
      icons.typescript, icons.cloudflare, icons.vitejs, icons.html, icons.css, icons.javascript,
    ],
    apis: [
      { ...apiIcons.twitchApi, purpose: "Shows which streamers are currently live" },
      { ...apiIcons.youtubeData, name: "YouTube API", purpose: "Fetches video uploads, subscriber counts, and channel statistics" },
    ],
    integrations: [],
    databases: [
      { ...icons.cloudflareWorkersKv, type: "Non-Relational" },
    ],
    tags: ["JavaScript / TypeScript", "Cloudflare"],
    teamSize: "Solo",
    scopeType: "Full Stack",
    recruiterSummary: "I built everything from scratch — the website visitors see, the animations they interact with, and the server that automatically fetches live data from Twitch and YouTube behind the scenes.",
    challenges: [
      "Built a scroll-driven storytelling engine that renders frame sequences on canvas with overlay transitions and progress tracking.",
      "Created a Cloudflare Worker with cron-tiered data fetching for Twitch live status, YouTube RSS, and rolling video stats across 7 channels.",
      "Designed a multi-page Vite build with per-creator pages, a network stats dashboard, and cross-page view transitions.",
      "Implemented a manifest-driven site renderer that generates all content sections, stats panels, and YouTube feeds from a single config.",
    ],
    impact: "Shipped a polished fan tribute with real-time Twitch and YouTube integration, serving content for creators with a combined 4.6M+ subscribers and 2.1M+ Twitch followers.",
    links: {
      live: "https://clooless.dev"
    },
  },
  {
    id: "cultivate-fitness",
    title: "Cultivate Fitness (Website + Mobile App)",
    whatItIs: "A commissioned fitness platform pairing a React coaching website with Stripe payments and Cal.com booking alongside an Expo mobile app for workout planning, nutrition tracking, and coach-client messaging.",
    employer: "",
    role: "Solo Developer",
    date: "Feb 2026 - Present",
    image: projectCultivateFitness,
    stackIcons: [
      icons.react, icons.expo, icons.typescript, icons.supabase, icons.vercel, icons.redis, icons.sqlite, icons.tailwindcss, icons.html, icons.css,
    ],
    apis: [
      { ...apiIcons.stripeApi, purpose: "Handles customer payments and subscriptions" },
      { ...apiIcons.calcom, purpose: "Lets clients book coaching sessions online" },
      { ...apiIcons.brevoApi, purpose: "Sends automated confirmation and receipt emails" },
      { ...apiIcons.openaiApi, purpose: "Powers LLM-driven features within the app" },
    ],
    integrations: [
      { ...apiIcons.appleHealthKit, purpose: "Syncs workout data from iPhones and Apple Watch" },
      { ...apiIcons.androidHealth, purpose: "Syncs workout data from Android devices" },
    ],
    databases: [
      { ...dbIcons.postgresql, type: "Relational", name: "PostgreSQL (Supabase)" },
      { ...dbIcons.sqlite, type: "Relational" },
    ],
    tags: ["React", "JavaScript / TypeScript", "Supabase", "Mobile"],
    teamSize: "Solo",
    scopeType: "Full Stack",
    recruiterSummary: "I designed and built the entire product — a marketing website with payment processing, a mobile app for iOS and Android, and the database and server infrastructure connecting everything together.",
    challenges: [
      "Integrated an OpenAI-powered workout engine in the Expo mobile app that analyzes a client's logged history, fitness level, and external factors to dynamically adjust sets, reps, and intensity using LLM-driven recommendations stored in SQLite and synced to Supabase.",
      "Built a Stripe-powered checkout flow with webhook-driven token delivery, Redis-backed rate limiting, and Brevo transactional emails.",
      "Implemented a coach dashboard with plan builder, client check-ins, block library, and real-time messaging via Supabase Realtime.",
      "Integrated Apple HealthKit and Android Health Connect for automatic activity logging and device-synced progress tracking.",
    ],
    impact: "Launched a full-stack fitness platform connecting coaches and clients through personalized workout plans, payment processing, and cross-device health tracking.",
    links: {
      live: "https://kristen.fitness"
    },
  },
  {
    id: "lti-canvas-integration",
    title: "Website Integration with Canvas",
    whatItIs: "Secure learning tool integration enabling course data exchange between Canvas LMS and third-party educational app using LTI 1.3 handshake.",
    employer: "Digital Learning Lab",
    role: "Software Engineer",
    date: "Jun 2025 - Jan 2026",
    image: projectLtiCanvas,
    stackIcons: [
      icons.aws, icons.typescript, icons.nodejs, icons.cdk, icons.lambda, icons.dynamodb, icons.cognito, icons.gateway, icons.cloudwatch, icons.postman, icons.docker, icons.react, icons.html
    ],
    apis: [],
    integrations: [
      { ...apiIcons.canvasLti, purpose: "Securely connects our app inside the Canvas classroom platform" },
    ],
    databases: [
      { ...dbIcons.dynamodb, type: "Non-Relational" },
    ],
    tags: ["AWS", "JavaScript / TypeScript", "React"],
    teamSize: "Team",
    scopeType: "Full Stack",
    recruiterSummary: "I built both the user-facing screens teachers interact with and the cloud infrastructure that securely passes student data between Canvas and our application across multiple school districts.",
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
    title: "Custom Inventory & Data Management System (Web + Mobile)",
    whatItIs: "Multi-tenant warehouse management platform with a React web app and Expo mobile scanner, built for a Virginia facility with NFC tracking and CMMC-compliant security.",
    employer: "",
    role: "Solo Developer",
    date: "Aug 2025 - Mar 2026",
    image: projectStorageTracker,
    stackIcons: [
      icons.react, icons.expo, icons.typescript, icons.supabase, icons.tailwindcss, icons.vitejs, icons.sentry, icons.playwright, icons.vitest, icons.githubActions, icons.html,
    ],
    apis: [],
    integrations: [
      { ...apiIcons.nfcApi, purpose: "Scans physical NFC tags on inventory items with a phone" },
    ],
    databases: [
      { ...dbIcons.postgresql, type: "Relational", name: "PostgreSQL (Supabase)" },
    ],
    tags: ["React", "JavaScript / TypeScript", "Supabase", "Mobile"],
    teamSize: "Solo",
    scopeType: "Full Stack",
    recruiterSummary: "I built the complete system from end to end — a web dashboard for managers, a mobile scanning app for warehouse floor staff, the database, user login system, and the automated testing pipeline.",
    challenges: [
      "Architected multi-tenant isolation with per-org Supabase clients and CMMC Level 2 compliant MFA enrollment.",
      "Built a dedicated admin console for organization management, user provisioning, and analytics reporting.",
      "Developed CI/CD with GitHub Actions running linting, typechecks, Vitest unit tests, and Playwright E2E flows.",
      "Created an offline-ready Expo mobile app with NFC scanning, role-based access, and real-time inventory syncing.",
    ],
    impact: "Delivered a production-ready warehouse system with multi-tenant auth, MFA security, and unified web and mobile interfaces that replaced manual tracking workflows.",
    links: {
      live: "https://www.wakeline.info"
    },
  },
  {
    id: "research-data-platform",
    title: "RAG + LLM Tester Tool",
    whatItIs: "An internal research platform enabling large-scale testing of 5,000+ of prompts across 40+ LLMs, with Retrieval-Augmented Generation (RAG) as an add-on.",
    employer: "Digital Learning Lab",
    role: "Software Engineer",
    date: "Jul 2024 - May 2025",
    image: projectLLMTester,
    stackIcons: [
      icons.aws, icons.python, icons.typescript, icons.nodejs, icons.cdk, icons.s3, icons.lambda, icons.postman, icons.gateway, icons.cloudwatch, icons.cognito, icons.docker, icons.react, icons.html
    ],
    apis: [
      { ...apiIcons.openaiApi, purpose: "Sends prompts to OpenAI's ChatGPT models for testing" },
      { ...apiIcons.anthropicApi, purpose: "Sends prompts to Anthropic's Claude models for testing" },
      { ...apiIcons.awsBedrock, purpose: "Connects to Amazon's AI models for running test prompts" },
    ],
    integrations: [],
    databases: [
      { ...dbIcons.dynamodb, type: "Non-Relational" },
    ],
    tags: ["AWS", "Python", "JavaScript / TypeScript", "React"],
    teamSize: "Solo",
    scopeType: "Full Stack",
    recruiterSummary: "I independently designed and built the entire platform — the interface researchers use to run tests, the cloud servers that process thousands of AI prompts, and the data storage that keeps everything organized.",
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
    role: "Software Engineer",
    date: "Mar 2024 - Jun 2024",
    image: projectPapyrusAI,
    stackIcons: [
      icons.aws, icons.python, icons.pandas, icons.cdk, icons.lambda, icons.dynamodb, icons.postman, icons.gateway, icons.cloudwatch
    ],
    apis: [],
    integrations: [],
    databases: [
      { ...dbIcons.dynamodb, type: "Non-Relational" },
    ],
    tags: ["AWS", "Python"],
    teamSize: "Team",
    scopeType: "Backend",
    recruiterSummary: "I focused on the behind-the-scenes server work — building the automated pipeline that pulls millions of records from the database, processes them, and packages them into downloadable files. No user-facing screens were part of my scope.",
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
    role: "Software Engineer",
    date: "Jan 2024 - Feb 2024",
    image: projectEtlPipeline,
    stackIcons: [
      icons.python, icons.pandas, icons.postman, icons.r, icons.gateway, icons.cloudwatch
    ],
    apis: [],
    integrations: [],
    databases: [],
    tags: ["AWS", "Python", "R"],
    teamSize: "Solo",
    scopeType: "Backend",
    recruiterSummary: "I built the testing tools and scripts that simulate heavy user traffic hitting our servers — this was purely behind-the-scenes infrastructure work to make sure the system could handle real-world demand.",
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
    id: "mortgage-tracker",
    title: "Multi-Mortgage Tracker",
    whatItIs: "A Google Cloud hosted web app built with React + TypeScript, Python, and MongoDB to track multiple mortgages and share real-time payment status between co-owners.",
    employer: "",
    role: "Solo Developer",
    date: "Oct 2023 - Feb 2024",
    image: projectMortgageTracker,
    stackIcons: [
      icons.googlecloud, icons.python, icons.mongodb, icons.react, icons.typescript, icons.html
    ],
    apis: [],
    integrations: [],
    databases: [
      { ...dbIcons.mongodb, type: "Non-Relational" },
    ],
    tags: ["Google Cloud", "Python", "JavaScript / TypeScript", "React"],
    teamSize: "Solo",
    scopeType: "Full Stack",
    recruiterSummary: "I built the complete application — the website interface where users view their mortgages, the server that calculates payment projections, and the database that stores everything securely.",
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
    apis: [],
    integrations: [],
    databases: [
      { ...dbIcons.dynamodb, type: "Non-Relational" },
    ],
    tags: ["Python", "R", "AWS"],
    teamSize: "Solo",
    scopeType: "Data",
    recruiterSummary: "I worked with data, not user interfaces — I wrote scripts that pulled millions of messages from a database, cleaned them up, ran statistical analysis, and produced visual reports that helped researchers understand user behavior patterns.",
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
    apis: [
      { ...apiIcons.googleDriveApi, purpose: "Automatically saves user projects to their Google Drive" },
    ],
    integrations: [
      { ...apiIcons.googleColabApi, purpose: "Runs the Python code inside Google's notebook environment" },
    ],
    databases: [],
    tags: ["Python", "Google Cloud"],
    teamSize: "Team",
    scopeType: "Backend",
    recruiterSummary: "I built the engine behind the scenes — a Python library that converts code into web pages and saves them automatically. Users interact with Google's notebook tool; my code does the heavy lifting underneath.",
    challenges: [
      "Designed a Python-to-HTML conversion system that turned user-written Colab code blocks into structured webpages.",
      "Integrated Google Drive API to auto-save project files, ensuring users' work persisted across sessions.",
      "Created standardized unit testing to validate package functionality and reliability during development.",
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
    image: projectOrangeCalc,
    stackIcons: [
      icons.streamlit, icons.python, icons.html
    ],
    apis: [],
    integrations: [],
    databases: [],
    tags: ["Python"],
    teamSize: "Solo",
    scopeType: "Frontend",
    recruiterSummary: "I built the user-facing application — the screens, buttons, and calculator interface that employees interact with daily. There was no separate server or database; all the logic runs right in the interface.",
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
