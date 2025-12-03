export const JsonLd = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Gerardo Lopez",
    "jobTitle": "Software Engineer",
    "url": "https://gerryjr.dev",
    "sameAs": [
      "https://github.com/gerryjr",
      "https://linkedin.com/in/gerryjr"
    ],
    "description":
      "Building scalable cloud systems for real-world data. Delivering secure, full-stack solutions from idea to launch.",
    "knowsAbout": [
      "Software Engineering",
      "Cloud Architecture",
      "Serverless Architecture",
      "AWS",
      "AWS Lambda",
      "Amazon DynamoDB",
      "Amazon S3",
      "AWS CDK",
      "Amazon Cognito",
      "API Gateway",
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
      "REST APIs",
      "OAuth 2.0",
      "JWT Authentication",
      "Git",
      "GitHub Actions",
      "Docker",
      "Pandas",
      "Data Analytics",
      "Natural Language Processing (NLP)",
      "LTI 1.3",
      "Canvas LMS",
      "Education Technology"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
