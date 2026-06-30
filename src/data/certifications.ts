import { Certification } from "@/types/certification";

/**
 * Certifications shown on /skills.
 *
 * Order: most-recent first (the array order drives render order on the page).
 * Upcoming certs anchor the top since they signal what's actively in flight.
 *
 * To wire up the action button on a card:
 *   - Drop the PDF in /public/certs/ and set pdfUrl to "/certs/your-file.pdf"
 *     → button reads "View certificate" and opens the PDF in a new tab.
 *   - Set verifyUrl to the issuer's verification page
 *     → button reads "Verify online" and opens that page in a new tab.
 *   - When both are set, pdfUrl wins (we'd rather show the actual document).
 * If neither is set, the card renders without an action button.
 *
 * status: "upcoming" hides the action and shows an "In Progress" badge instead.
 */
export const certifications: Certification[] = [
  {
    title: "AWS Cloud Practitioner",
    date: "In Progress",
    status: "upcoming",
    // Official AWS Certified Cloud Practitioner badge (Credly).
    icon: "https://images.credly.com/size/680x680/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
    keyPoints: [
      "Foundational AWS Concepts",
      "Best Practices, Core Services",
      "Cloud Architecture Principles",
    ],
  },
  {
    title: "Senior Python · Interview Prep",
    date: "January 2026",
    // CodeSignal brand mark via simpleicons CDN. If the slug ever changes upstream,
    // the Award fallback renders cleanly here too.
    icon: "https://cdn.simpleicons.org/codesignal/0066CC",
    // pdfUrl wins over verifyUrl, so users see the certificate first. The
    // CodeSignal verification page stays as a backup for anyone who wants the
    // canonical issuer-side proof.
    pdfUrl: "/certs/codesignal-interview-prep-python.pdf",
    previewImage: "/cert-previews/codesignal-interview-prep-python.png",
    verifyUrl:
      "https://codesignal.com/learn/certificates/cmjetkexd000ckv04kfjnxier/course-paths/28",
    keyPoints: [
      "Advanced Data Structures & Design Patterns",
      "Maintainability & Backward Compatibility",
      "Refactoring & Code Modernization",
    ],
  },
  {
    title: "Git Mastery",
    date: "April 2025",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    pdfUrl: "/certs/git-uci-workshop.pdf",
    previewImage: "/cert-previews/git-uci-workshop.png",
    keyPoints: [
      "Distributed Version Control & Branching Strategies",
      "Collaborative Workflows & Conflict Resolution",
      "UC Irvine · Data, Publishing & Digital Scholarship",
    ],
  },
  {
    title: "CITI Program: Research Ethics",
    date: "July 2023",
    // No widely-used logo asset for CITI — falls back to the Award icon.
    pdfUrl: "/certs/citi-social-behavioral.pdf",
    previewImage: "/cert-previews/citi-social-behavioral.png",
    verifyUrl:
      "https://www.citiprogram.org/verify/?waa9c975f-689d-44ac-a118-365a1d3562dc-56864971",
    keyPoints: [
      "Data Privacy & Ethical Information Handling",
      "Informed Consent & Participant Data Protections",
      "UC Irvine IRB-Authorized Research Practices",
    ],
  },
];
