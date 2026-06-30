export const JsonLd = () => {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://gerryjr.dev/#person",
    "name": "Gerardo Lopez Jr.",
    "givenName": "Gerardo",
    "familyName": "Lopez",
    "honorificSuffix": "Jr.",
    "alternateName": ["Gerardo Lopez", "Gerry Lopez", "Gerardo Lopez Jr"],
    "jobTitle": [
      "Software Engineer",
      "Full Stack Engineer",
      "Cloud Engineer",
    ],
    "url": "https://gerryjr.dev",
    "image": "https://gerryjr.dev/og-image.png",
    "sameAs": [
      "https://github.com/gerryjr",
      "https://linkedin.com/in/gerryjr",
    ],
    "description":
      "Gerardo Lopez Jr. is a software engineer building full-stack web and mobile applications on AWS, Google Cloud, and Supabase. Scalable cloud systems and secure end-to-end products.",
    "knowsAbout": [
      "Software Engineering",
      "Full Stack Development",
      "Cloud Engineering",
      "Cloud Architecture",
      "Serverless Architecture",
      "AWS",
      "AWS Lambda",
      "Amazon DynamoDB",
      "Amazon S3",
      "AWS CDK",
      "Amazon Cognito",
      "API Gateway",
      "Google Cloud Platform",
      "Cloudflare",
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "React Native",
      "Expo",
      "PostgreSQL",
      "Supabase",
      "MongoDB",
      "Redis",
      "Stripe",
      "REST APIs",
      "OAuth 2.0",
      "JWT Authentication",
      "Git",
      "GitHub Actions",
      "Docker",
      "Python",
      "Pandas",
      "Data Analytics",
      "Natural Language Processing (NLP)",
      "LTI 1.3",
      "Canvas LMS",
      "Education Technology",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://gerryjr.dev/#website",
    "url": "https://gerryjr.dev/",
    "name": "Gerardo Lopez Jr.",
    "description": "Portfolio of Gerardo Lopez Jr., software engineer (full stack, cloud).",
    "inLanguage": "en-US",
    "author": { "@id": "https://gerryjr.dev/#person" },
    "publisher": { "@id": "https://gerryjr.dev/#person" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
};
