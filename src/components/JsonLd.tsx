export const JsonLd = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Gerardo Lopez",
    "jobTitle": "Software Engineer",
    "url": "https://gerryjr.github.io",
    "sameAs": [
      "https://github.com/gerryjr",
      "https://linkedin.com/in/gerardolopez"
    ],
    "description": "AWS-backed apps for education and research. Shipping LTI 1.3 integrations and RLS-secure data flows.",
    "knowsAbout": ["AWS", "Serverless Architecture", "LTI 1.3", "React", "TypeScript", "PostgreSQL", "DynamoDB"]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
