import { Project, validateProject } from "@/types/project";
import projectLtiCanvas from "@/assets/project-lti-canvas.png";
import projectLtiCanvas2 from "@/assets/unamed.png";
import projectResearchPlatform from "@/assets/project-research-platform.png";
import projectEtlPipeline from "@/assets/project-etl-pipeline.png";
import projectPapyrusAI from "@/assets/project-papyrusai.png";
import projectPython2Html from "@/assets/python-webpage-creation.png";

export const projects: Project[] = [
  {
    id: "lti-canvas-integration",
    title: "App Integration with Canvas",
    whatItIs: "Secure learning tool integration enabling course data exchange between Canvas LMS and third-party educational apps using LTI 1.3 handshake.",
    employer: "University of California",
    role: "Solo Full-Stack Developer",
    date: "September 2024",
    image: projectLtiCanvas,
    stackIcons: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Lambda", icon: "https://icon.icepanel.io/AWS/svg/Compute/Lambda.svg" },
      { name: "DynamoDB", icon: "https://icon.icepanel.io/AWS/svg/Database/DynamoDB.svg" },
      { name: "Cognito", icon: "https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/Cognito.svg" },
      { name: "API Gateway", icon: "https://icon.icepanel.io/AWS/svg/App-Integration/API-Gateway.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    ],
    stackText: ["AWS", "Lambda", "DynamoDB", "Cognito", "API Gateway", "React", "TypeScript", "HTML"],
    challenges: [
      "Implemented OAuth 2.0 + JWT validation flow per IMS Global spec with zero security incidents.",
      "Architected serverless backend handling 500+ concurrent users with 99.9% uptime.",
    ],
    impact: "Enabled 2,000+ students to access personalized learning content seamlessly across 15 courses.",
    links: {
      live: "https://example.com/lti-demo",
      repo: "https://github.com/gerryjr/lti-canvas",
    },
  },
  {
    id: "research-data-platform",
    title: "RAG + LLM Tester Tool",
    whatItIs: "Multi-tenant platform for psychology researchers to design surveys, collect data, and analyze results with RLS security.",
    employer: "Research Lab",
    role: "Backend Lead",
    date: "June 2024",
    image: projectLtiCanvas2,
    stackIcons: [
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    ],
    stackText: ["Supabase", "PostgreSQL", "React", "TypeScript", "Node.js"],
    challenges: [
      "Designed RLS policies isolating participant data across 50+ research projects with zero leaks.",
      "Optimized query performance reducing dashboard load time from 8s to 1.2s via indexed views.",
    ],
    impact: "Supported 12 active research studies collecting 50,000+ data points with HIPAA-compliant storage.",
    links: {
      demo: "https://example.com/research-demo",
    },
  },
  {
    id: "papyrusai-data-extraction",
    title: "PapyrusAI Data Extraction",
    whatItIs: "Automated pipeline ingesting CSV files from S3, transforming records, and loading into DynamoDB for analytics.",
    employer: "Tech Startup",
    role: "Solo Developer",
    date: "March 2024",
    image: projectPapyrusAI,
    stackIcons: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Lambda", icon: "https://icon.icepanel.io/AWS/svg/Compute/Lambda.svg" },
      { name: "S3", icon: "https://icon.icepanel.io/AWS/svg/Storage/Simple-Storage-Service.svg" },
      { name: "DynamoDB", icon: "https://icon.icepanel.io/AWS/svg/Database/DynamoDB.svg" },
      { name: "CloudWatch", icon: "https://icon.icepanel.io/AWS/svg/Management-Governance/CloudWatch.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    ],
    stackText: ["AWS", "Lambda", "S3", "DynamoDB", "CloudWatch", "Node.js", "TypeScript"],
    challenges: [
      "Implemented idempotent batch processing with DLQ retry logic handling 10K records/hour.",
      "Set up CloudWatch alarms with SNS notifications reducing incident response time to under 5 min.",
    ],
    impact: "Automated manual data entry saving 15 hours/week for operations team across 3 departments.",
    links: {
      repo: "https://github.com/gerryjr/serverless-etl",
    },
  },
  {
    id: "real-time-analytics-dashboard",
    title: "Stress Testing Custom APIs",
    whatItIs: "Interactive dashboard displaying live metrics from Kinesis streams with sub-second latency for business intelligence.",
    employer: "Enterprise Corp",
    role: "Frontend Lead",
    date: "January 2024",
    image: projectEtlPipeline,
    stackIcons: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Kinesis", icon: "https://icon.icepanel.io/AWS/svg/Analytics/Kinesis.svg" },
      { name: "WebSocket", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
      { name: "D3.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg" },
    ],
    stackText: ["React", "TypeScript", "AWS", "Kinesis", "WebSocket", "D3.js"],
    challenges: [
      "Optimized WebSocket connection pooling reducing server costs by 40% while maintaining real-time updates.",
      "Implemented virtualized rendering for 100K+ data points with smooth 60fps performance.",
    ],
    impact: "Provided real-time insights to 500+ business analysts reducing report generation time from hours to seconds.",
    links: {
      demo: "https://example.com/analytics-demo",
    },
  },
  {
    id: "microservices-api-gateway",
    title: "User Engagement Analysis",
    whatItIs: "Centralized API gateway routing requests to 15+ microservices with authentication, rate limiting, and caching.",
    employer: "SaaS Company",
    role: "Backend Engineer",
    date: "October 2023",
    image: projectResearchPlatform,
    stackIcons: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "JWT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg" },
    ],
    stackText: ["Node.js", "Express", "Redis", "Docker", "Kubernetes", "JWT"],
    challenges: [
      "Designed token-based rate limiting preventing abuse while allowing 10K req/sec burst capacity.",
      "Implemented circuit breaker pattern reducing cascading failures by 95% during service outages.",
    ],
    impact: "Unified API access for 50K monthly users while reducing average response latency from 800ms to 120ms.",
    links: {
      repo: "https://github.com/gerryjr/api-gateway",
    },
  },
  {
    id: "ci-cd-automation-pipeline",
    title: "Python Webpage Creation Package",
    whatItIs: "Automated deployment pipeline using GitHub Actions, Docker, and AWS ECS for zero-downtime releases.",
    employer: "Tech Startup",
    role: "DevOps Engineer",
    date: "July 2023",
    image: projectPython2Html,
    stackIcons: [
      { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "ECS", icon: "https://icon.icepanel.io/AWS/svg/Compute/Elastic-Container-Service.svg" },
      { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
    ],
    stackText: ["GitHub Actions", "Docker", "AWS", "ECS", "Terraform"],
    challenges: [
      "Automated infrastructure provisioning using Terraform reducing deployment time from 2 hours to 15 min.",
      "Implemented blue-green deployment strategy achieving 99.99% uptime during 200+ production releases.",
    ],
    impact: "Enabled 5 daily deployments with automated rollback, increasing team velocity by 300%.",
    links: {
      repo: "https://github.com/gerryjr/ci-cd-pipeline",
    },
  },
];

// Validate all projects on import
projects.forEach(validateProject);
