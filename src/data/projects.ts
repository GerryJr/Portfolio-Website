/**
 * Projects — portfolio work tied to an employer (Digital Learning Lab, CP-LEADS,
 * CodeAI, etc.), separate from independent paid commissions.
 *
 * Ordering rule (manual, no auto-sort):
 *   Newest start-date first within each year group, EXCEPT for sister-projects
 *   from the same employer (e.g. paired website + app) which always go
 *   chronologically with the earlier-started entry first. The DeepDiveTimeline
 *   renders array order verbatim, so place new entries carefully. Current order
 *   verified 2026-05-22:
 *     2025: lti-canvas (Jun)
 *     2024: research-data-platform (Jul) → papyrusai (Mar) → real-time-analytics (Jan) → microservices (Jan)
 *     2023: ci-cd (Jun)
 */
import { Project, validateProject } from "@/types/project";
import projectLLMTester from "@/assets/project-tester-tool.png";
import projectLtiCanvas from "@/assets/project-lti-canvas.webp";
import projectResearchPlatform from "@/assets/project-research-platform.png";
import projectEtlPipeline from "@/assets/project-etl-pipeline.webp";
import projectPapyrusAI from "@/assets/project-papyrusai.webp";
import projectPython2Html from "@/assets/project-webpage-creation.png";
import { icons, apiIcons, dbIcons } from "./icons";


export const projects: Project[] = [
  // {
  //   id: "clooless-fan-site",
  //   title: "Clooless Tracking Website",
  //   whatItIs: "A fan-built interactive website for the Clooless crew (4.6M+ YouTube subscribers) featuring scroll-driven canvas animations, live Twitch status, and a Cloudflare Workers data layer.",
  //   employer: "",
  //   role: "Solo Developer",
  //   date: "Mar 2026 - Present",
  //   image: projectClooless,
  //   stackIcons: [
  //     icons.typescript, icons.cloudflare, icons.vitejs, icons.html, icons.css, icons.javascript,
  //   ],
  //   apis: [
  //     { ...apiIcons.twitchApi, purpose: "Shows which streamers are currently live" },
  //     { ...apiIcons.youtubeData, name: "YouTube API", purpose: "Fetches video uploads, subscriber counts, and channel statistics" },
  //   ],
  //   integrations: [],
  //   databases: [
  //     { ...icons.cloudflareWorkersKv, type: "Non-Relational" },
  //   ],
  //   tags: ["JavaScript / TypeScript", "Cloudflare"],
  //   teamSize: "Solo",
  //   scopeType: "Full Stack",
  //   recruiterSummary: "I built everything from scratch — the website visitors see, the animations they interact with, and the server that automatically fetches live data from Twitch and YouTube behind the scenes.",
  //   challenges: [
  //     "Built a scroll-driven storytelling engine that renders frame sequences on canvas with overlay transitions and progress tracking.",
  //     "Created a Cloudflare Worker with cron-tiered data fetching for Twitch live status, YouTube RSS, and rolling video stats across 7 channels.",
  //     "Designed a multi-page Vite build with per-creator pages, a network stats dashboard, and cross-page view transitions.",
  //     "Implemented a manifest-driven site renderer that generates all content sections, stats panels, and YouTube feeds from a single config.",
  //   ],
  //   impact: "Shipped a polished fan tribute with real-time Twitch and YouTube integration, serving content for creators with a combined 4.6M+ subscribers and 2.1M+ Twitch followers.",
  //   links: {
  //     live: "https://clooless.dev"
  //   },
  // },
  {
    id: "lti-canvas-integration",
    title: "Website Integration with Canvas",
    whatItIs: "Secure learning tool integration enabling course data exchange between Canvas LMS and third-party educational app using LTI 1.3 handshake.",
    employer: "Digital Learning Lab",
    role: "Software Engineer",
    date: "Jun 2025 - Jan 2026",
    image: projectLtiCanvas,
    stackIcons: [
      icons.aws, icons.typescript, icons.nodejs, icons.cdk, icons.lambda, icons.cognito, icons.gateway, icons.cloudwatch, icons.postman, icons.docker, icons.react, icons.html
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
    recruiterSummary: "Built both the user-facing screens teachers interact with and the cloud infrastructure that securely passes student data between Canvas and the app across school districts.",
    challenges: [
      "Coordinated with an external contractor to deliver a secure, compliant LTI 1.3 integration.",
      "Built multi-tenant data isolation in DynamoDB using Lambda functions across multiple institutions.",
      "Created unified Canvas launch and authentication flows using API Gateway and Cognito in TypeScript.",
    ],
    impact: "Enabled 10,000+ students to access personalized learning content seamlessly across different school districts.",
    takeaway: "Working with an external contractor on the LTI 1.3 spec taught me that the bottleneck in security-critical integrations isn't the code: it's the asynchronous review cycle, and front-loading the handshake doc saved us weeks.",
    links: {
      private: "Work Repo"
    },
  },
  {
    id: "research-data-platform",
    title: "RAG + LLM Tester Tool",
    whatItIs: "An internal research platform enabling large-scale testing of 5,000+ prompts across 40+ LLMs, with Retrieval-Augmented Generation (RAG) as an add-on.",
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
    recruiterSummary: "Built the interface researchers use to run tests, the cloud servers that process thousands of AI prompts, and the data storage keeping it organized.",
    challenges: [
      "Independently architected a scalable AWS backend using CDK for fast, trackable development.",
      "Managed high-volume data flow, returning structured outputs to the frontend for researcher analysis.",
      "Integrated a vector database and unified diverse LLM APIs into one consistent RAG-enabled testing workflow.",
    ],
    impact: "Enabled researchers to run thousands of RAG-enhanced LLM tests at scale, accelerating model evaluation across many changing AI systems.",
    takeaway: "Normalizing prompt I/O across 40+ models meant accepting that one consistent interface is a fiction. What you actually build is a translation layer that hides each vendor's quirks behind a shared contract.",
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
      icons.aws, icons.python, icons.pandas, icons.cdk, icons.lambda, icons.postman, icons.gateway, icons.cloudwatch
    ],
    apis: [],
    integrations: [],
    databases: [
      { ...dbIcons.dynamodb, type: "Non-Relational" },
    ],
    tags: ["AWS", "Python"],
    teamSize: "Team",
    scopeType: "Backend",
    recruiterSummary: "Built the backend pipeline that pulls millions of records from the database, processes them, and packages them into downloadable files. No user-facing screens in scope.",
    challenges: [
      "First time building CDK infrastructure to allow multiple developers to deploy Lambda services safely to production.",
      "Processed millions of DynamoDB records using Python and Pandas with batched reads, pagination, and CloudWatch-guided performance tuning.",
      "Implemented org-level admin access and filtering through API Gateway + Cognito, validating flows with Postman.",
    ],
    impact: "Automated a 30-minute multi-table extraction process into a seconds-fast export pipeline powered by AWS Lambda.",
    takeaway: "Being the first person to set up CDK for the team meant the patterns I picked early shaped how everyone else deployed after me. That pressure made me write the infra I wished I'd inherited.",
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
    recruiterSummary: "Built the testing tools and scripts that simulate heavy user traffic hitting the servers. Purely behind-the-scenes infrastructure work to validate the system could handle real-world demand.",
    challenges: [
      "Developed async Python stress tests that emulated real-world concurrency against AWS API endpoints and related services.",
      "Captured and stored detailed latency and throughput data across thousands of test requests.",
      "Used R to graph performance trends and identify API bottlenecks under varying load sizes.",
    ],
    impact: "Revealed critical API bottlenecks and thresholds that improved system stability under high load, enabling informed developmental decisions.",
    takeaway: "Load tests don't find bugs, they find assumptions. The most useful results were always the ones that overturned what we thought the system could handle.",
    links: {
      private: "Work Repo",
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
      icons.r, icons.python, icons.pandas,
    ],
    apis: [],
    integrations: [],
    databases: [
      { ...dbIcons.dynamodb, type: "Non-Relational" },
    ],
    tags: ["Python", "R", "AWS"],
    teamSize: "Solo",
    scopeType: "Data",
    recruiterSummary: "Wrote the data pipeline that pulled millions of messages from a database, cleaned them, ran statistical analysis, and produced visual reports that helped researchers understand user behavior patterns.",
    challenges: [
      "Used Python and Pandas to clean and preprocess large-scale DynamoDB exports for downstream NLP analysis.",
      "Applied R-based topic modeling to uncover recurring themes and visualize message patterns across courses.",
      "Combined sentiment outputs and topic clusters into a single research dataset for comparative analysis.",
    ],
    impact: "Produced interpretable sentiment trends and topic structures that enabled researchers to better understand user behavior and refine platform design.",
    takeaway: "Most of the analytical value came before the modeling. Cleaning millions of messages was where the interpretability actually got built in, because the downstream topic clusters can only ever be as honest as the preprocessing that fed them.",
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
      icons.python, icons.html
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
    recruiterSummary: "Built the engine behind the scenes: a Python library that converts code into web pages and saves them automatically. Users interact with Google's notebook tool; the library does the heavy lifting underneath.",
    challenges: [
      "Designed a Python-to-HTML conversion system that turned user-written Colab code blocks into structured webpages.",
      "Integrated Google Drive API to auto-save project files, ensuring users' work persisted across sessions.",
      "Created standardized unit testing to validate package functionality and reliability during development.",
    ],
    impact: "Enabled non-web developers to produce HTML pages from simple Python notebooks, eliminating the need to learn frontend tools.",
    takeaway: "Writing a library for non-web developers reframed testing for me: unit tests stopped being a developer safety net and became the actual specification, because users would only ever see the surface of my code through the failures it didn't have.",
    links: {
      private: "Work Repo",
    },
  },
];

// Validate all projects on import
projects.forEach(validateProject);
