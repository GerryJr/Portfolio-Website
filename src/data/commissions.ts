/**
 * Commissions — paid client work, separate from portfolio projects.
 *
 * To add a new commission:
 *   1. Drop the screenshot in src/assets/ and import it below.
 *   2. Add a new object to the `commissions` array. Required fields match
 *      the `Project` schema (see src/types/project.ts).
 *   3. Set `client` to the paying client's name and `dateLabel` to the
 *      mono meta line shown on the timeline ("FEB 2026 → PRESENT").
 *
 * Ordering rule (manual, no auto-sort):
 *   Newest start-date first within each year group, EXCEPT for sister-projects
 *   from the same client (e.g. paired website + app) which always go
 *   chronologically with the earlier-started entry first. Reason: a sister-pair
 *   tells a story (website ships → app begins), and reversing them breaks it.
 *   The TimelineYearStack renders array order verbatim, so place new entries
 *   carefully. Current order verified 2026-05-22:
 *     2026: oxus-edge (Apr) → kristen-fitness (Feb, pair start) → cultivate (Mar, pair end)
 *     2025: custom-wms (Aug)
 *     2023: mortgage-tracker (Oct)
 *     2022: orange-calculator (Jun)
 */
import { Project, validateProject } from "@/types/project";
import projectOxusEdge from "@/assets/project-oxus-edge.webp";
import projectCultivateFitness from "@/assets/project-cultivate-fitness.png";
import projectStorageTracker from "@/assets/project-storage-tracker.webp";
import projectMortgageTracker from "@/assets/project-mortgage.webp";
import projectOrangeCalc from "@/assets/project-orange-calc.png";
import { icons, apiIcons, dbIcons } from "./icons";

export const commissions: Project[] = [
  {
    id: "oxus-edge",
    title: "Oxus Edge Company (Website + Admin Panel)",
    whatItIs: "A commissioned Next.js + Supabase e-commerce platform for handcrafted knives, accessories, apparel, and coffee with Stripe checkout, timed drops, newsletter broadcasts, and a full admin panel for the owner.",
    employer: "",
    client: "Oxus Edge Company",
    role: "Solo Developer",
    date: "Apr 2026 - Jun 2026",
    dateLabel: "APR 2026 → JUN 2026",
    image: projectOxusEdge,
    stackIcons: [
      icons.nextjs, icons.react, icons.typescript, icons.supabase, icons.vercel, icons.html, icons.css,
    ],
    apis: [
      { ...apiIcons.stripeApi, purpose: "Handles customer checkout, subscriptions, and webhook-driven order fulfillment" },
      { ...apiIcons.resendApi, purpose: "Sends transactional emails for orders, password resets, and contact replies" },
    ],
    integrations: [
      { ...apiIcons.googleOauth, purpose: "Lets customers sign in with their Google account through Supabase Auth" },
    ],
    databases: [
      { ...dbIcons.postgresql, type: "Relational", name: "PostgreSQL (Supabase)" },
    ],
    tags: ["React", "JavaScript / TypeScript", "Supabase"],
    teamSize: "Solo",
    scopeType: "Full Stack",
    recruiterSummary: "Built the customer-facing online store, the secure admin panel for managing products and orders, the Stripe payment flow, and the database tying it all together.",
    challenges: [
      "Built a Resend-backed newsletter system with drop-launch alerts and per-broadcast open and click tracking.",
      "Guarded drop inventory against concurrent buyers with TTL cart reservations, Stripe webhook idempotency, and an `ended_at` checkout gate.",
      "Built a soft-delete + restore flow across 13 entity types so the owner can recover any deleted product, drop, maker, or page from `/admin/archive`.",
      "Built an admin panel with full CRUD, append-only activity logging, beginner/advanced view modes, and `safe-href` validation on every admin URL.",
    ],
    impact: "Shipped a production e-commerce platform with newsletter broadcasts, drop-launch alerts, and concurrent-buyer-safe drop inventory for a handcrafted-goods brand.",
    takeaway: "Shipping a checkout where two buyers can race for the same SKU reshaped what 'done' means to me: tests pass and UI looks right, but until two webhooks fire out of order in prod, the system just hasn't been pressed yet.",
    links: {
      live: "https://oxusedgecompany.com",
    },
  },
  {
    id: "kristen-fitness",
    title: "Kristen Fitness",
    whatItIs: "A commissioned React coaching website with Stripe checkout and Cal.com booking wired into the coach's personal calendar, built for a design-heavy fitness brand.",
    employer: "",
    client: "Kristen Fitness",
    role: "Solo Developer",
    date: "Feb 2026 - Mar 2026",
    dateLabel: "FEB 2026 → MAR 2026",
    image: projectCultivateFitness,
    stackIcons: [
      icons.react, icons.typescript, icons.supabase, icons.vercel, icons.html, icons.css,
    ],
    apis: [
      { ...apiIcons.stripeApi, purpose: "Handles client payments for coaching plans" },
      { ...apiIcons.calcom, purpose: "Books coaching sessions directly on the coach's calendar" },
      { ...apiIcons.brevoApi, purpose: "Sends automated booking and payment confirmation emails" },
    ],
    integrations: [],
    databases: [
      { ...dbIcons.postgresql, type: "Relational", name: "PostgreSQL (Supabase)" },
    ],
    tags: ["React", "JavaScript / TypeScript", "Supabase"],
    teamSize: "Solo",
    scopeType: "Full Stack",
    recruiterSummary: "Built the coaching website, the Stripe payment flow, and the Cal.com booking integration that drops sessions straight onto the coach's calendar.",
    challenges: [
      "Wired Cal.com into the booking flow so clients reserve sessions directly on the coach's calendar with Brevo confirmation emails.",
      "Built a Stripe checkout for coaching subscriptions and one-off plan purchases.",
      "Iterated on layout, typography, and motion across multiple rounds to satisfy a design-heavy client reviewing every screen before sign-off.",
    ],
    impact: "Launched the coach's public website with self-serve booking and payments, replacing manual scheduling DMs.",
    takeaway: "First time hooking into someone else's calendar through a third-party booking SDK: the integration itself was straightforward; the real time sink was design rounds with a customer who cared about every pixel.",
    links: {
      live: "https://kristen.fitness",
    },
  },
  // ───────────────────────────────────────────────────────────────────────────
  // REVISIT — "Cultivate" mobile workout app card (disabled 2026-06-30).
  // This was a TODO stub that rendered literal "TODO" text live on the timeline,
  // so it's commented out until the real content exists. To re-enable:
  //   1. Fill in whatItIs / recruiterSummary / challenges / impact / takeaway
  //      (follow the resume-copy rules: no first person, past-tense verb start).
  //   2. Swap `image` from the Kristen Fitness website shot to an app screenshot.
  //   3. Fill the OpenAI api `purpose`.
  // Intended position per the ordering note above: sister-pair END, i.e. right
  // after kristen-fitness (website ships → app begins).
  /*
  {
    id: "cultivate",
    title: "Cultivate",
    whatItIs: "TODO: Cultivate mobile workout app overview.",
    employer: "",
    client: "Kristen Fitness",
    role: "Solo Developer",
    date: "Mar 2026 - Present",
    dateLabel: "MAR 2026 → PRESENT",
    image: projectCultivateFitness, // TODO: swap for an app screenshot
    stackIcons: [
      icons.react, icons.expo, icons.typescript, icons.supabase, icons.redis, icons.sqlite, icons.html, icons.css,
    ],
    apis: [
      { ...apiIcons.openaiApi, purpose: "TODO" },
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
    recruiterSummary: "TODO",
    challenges: [
      "TODO: workout engine challenge.",
    ],
    impact: "TODO",
    links: {
      private: "Work in Progress",
    },
  },
  */
  {
    id: "custom-wms",
    title: "Custom Inventory & Data Management System (Web + Mobile)",
    whatItIs: "Multi-tenant warehouse management platform with a React web app and Expo mobile scanner, built for a Virginia facility with NFC tracking and CMMC-compliant security.",
    employer: "",
    client: "Private Warehouse Co.",
    role: "Solo Developer",
    date: "Aug 2025 - Mar 2026",
    dateLabel: "AUG 2025 → MAR 2026",
    image: projectStorageTracker,
    stackIcons: [
      icons.react, icons.expo, icons.typescript, icons.supabase, /* icons.tailwindcss, */ icons.vitejs, icons.sentry, icons.playwright, icons.vitest, icons.githubActions, icons.html,
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
    recruiterSummary: "Built the web dashboard for managers, the mobile scanning app for warehouse floor staff, the database, the user login system, and the automated testing pipeline.",
    challenges: [
      "Architected multi-tenant isolation with per-org Supabase clients and CMMC Level 2 compliant MFA enrollment.",
      "Built a dedicated admin console for organization management, user provisioning, and analytics reporting.",
      "Developed CI/CD with GitHub Actions running linting, typechecks, Vitest unit tests, and Playwright E2E flows.",
      "Created an offline-ready Expo mobile app with NFC scanning, role-based access, and real-time inventory syncing.",
    ],
    impact: "Delivered a production-ready warehouse system with multi-tenant auth, MFA security, and unified web and mobile interfaces that replaced manual tracking workflows.",
    takeaway: "Building for CMMC compliance reshaped how I think about isolation: it's cheaper to design multi-tenant boundaries on day one than to retrofit them after the schema already assumes a single org.",
    links: {
      live: "https://www.wakeline.info",
    },
  },
  {
    id: "mortgage-tracker",
    title: "Multi-Mortgage Tracker",
    whatItIs: "A Google Cloud hosted web app built with React + TypeScript, Python, and MongoDB to track multiple mortgages and share real-time payment status between co-owners.",
    employer: "",
    client: "Private Family Office",
    role: "Solo Developer",
    date: "Oct 2023 - Feb 2024",
    dateLabel: "OCT 2023 → FEB 2024",
    image: projectMortgageTracker,
    stackIcons: [
      icons.googlecloud, icons.python, icons.react, icons.typescript, icons.html,
    ],
    apis: [],
    integrations: [],
    databases: [
      { ...dbIcons.mongodb, type: "Non-Relational" },
    ],
    tags: ["Google Cloud", "Python", "JavaScript / TypeScript", "React"],
    teamSize: "Solo",
    scopeType: "Full Stack",
    recruiterSummary: "Built the website interface where users view their mortgages, the server that calculates payment projections, and the secure database storing them.",
    challenges: [
      "Designed a MongoDB schema to support multiple mortgages per user while safely sharing views with co-owners.",
      "Built Python backend services on Google Cloud to compute amortization, remaining balance, and payment projections.",
      "Developed a React + TypeScript + HTML frontend that surfaces up-to-date payment status and history from the API.",
    ],
    impact: "Allowed borrowers and co-owners a safe way to view and update multiple mortgages, replacing manual spreadsheets and making payment status understandable for both parties.",
    takeaway: "Modeling shared ownership in MongoDB pushed me to design schemas around access patterns first, who's allowed to see what before what gets stored, instead of normalizing my way to it afterwards.",
    links: {
      private: "Delivered to Client",
    },
  },
  {
    id: "orange-calculator",
    title: "Mandarin Calculator",
    whatItIs: "A Streamlit web app built in Python that automates mandarin-production calculations for employees, replacing manual math with a simple interactive interface.",
    employer: "",
    client: "Local Citrus Farm",
    role: "Solo Developer",
    date: "Jun 2022 - Jan 2023",
    dateLabel: "JUN 2022 → JAN 2023",
    image: projectOrangeCalc,
    stackIcons: [
      icons.streamlit, icons.python, icons.html,
    ],
    apis: [],
    integrations: [],
    databases: [],
    tags: ["Python"],
    teamSize: "Solo",
    scopeType: "Frontend",
    recruiterSummary: "Built the user-facing application: the screens, buttons, and calculator interface employees use daily. No separate server or database; all logic runs in the interface.",
    challenges: [
      "Built a Streamlit UI that handled all calculator logic in Python while rendering clean, HTML-backed components.",
      "Converted hand-computed formulas into reliable programmatic calculations to eliminate user error.",
      "Designed the app to be simple enough for daily use by several employees with no technical background.",
    ],
    impact: "Replaced manual production math with a fast, error-proof tool used daily by employees, removing the need to memorize formulas and improving calculation speed.",
    takeaway: "Designing for employees who weren't going to read docs taught me that simple is harder than it looks. Every extra input field is a new way for someone's day to get worse, so the win was in what I removed, not what I added.",
    links: {
      private: "Delivered to Client",
    },
  },
];

// Validate all commissions on import
commissions.forEach(validateProject);
