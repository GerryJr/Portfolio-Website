import { TechIcon } from "@/components/TechIcon";
import { ChevronDown } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { skills } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { Eyebrow } from "@/components/Eyebrow";
import { CertificationsGrid } from "@/components/CertificationsGrid";
import { usePageTitle } from "@/hooks/use-page-title";

const Skills = () => {
  usePageTitle("Skills");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const toggleCategory = (category: string) =>
    setExpandedCategory((prev) => (prev === category ? null : category));

  const handleKeyToggle =
    (category: string) => (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCategory(category);
      }
    };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-500">
      {/* Technical Skills Section */}
      <section className="mb-20">
        <Eyebrow className="mb-3">Stack &amp; capabilities</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-[-0.02em] mb-10 text-foreground">
          Technical Skills
        </h1>

        <div className="space-y-12">
          <div
            className="bg-card border border-border rounded-lg p-8 cursor-pointer hover:border-accent hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-lg"
            role="button"
            tabIndex={0}
            aria-expanded={expandedCategory === "languages"}
            onClick={() => toggleCategory("languages")}
            onKeyDown={handleKeyToggle("languages")}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-accent transition-colors">
                Programming Languages
              </h2>
              <div className="flex items-center gap-3">
                <span
                  className={`text-base text-muted-foreground font-light transition-opacity duration-200 ${
                    expandedCategory === "languages" ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Years of Active Usage
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    expandedCategory === "languages" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-8">
              {skills.languages.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center gap-1 group">
                  <TechIcon
                    name={skill.name}
                    icon={skill.icon}
                    iconDark={skill.iconDark}
                    invertOnDark={skill.invertOnDark}
                    size={32}
                  />
                  <span className="text-base text-foreground font-medium">{skill.name}</span>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedCategory === "languages" ? "max-h-8" : "max-h-0"
                    }`}
                  >
                    <span
                      className={`text-sm text-accent font-semibold transition-opacity duration-500 ease-in-out ${
                        expandedCategory === "languages" ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {skill.years} years
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-card border border-border rounded-lg p-8 cursor-pointer hover:border-accent hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-lg"
            role="button"
            tabIndex={0}
            aria-expanded={expandedCategory === "frameworks"}
            onClick={() => toggleCategory("frameworks")}
            onKeyDown={handleKeyToggle("frameworks")}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-accent transition-colors">
                Frameworks & Libraries
              </h2>
              <div className="flex items-center gap-3">
                <span
                  className={`text-base text-muted-foreground font-light transition-opacity duration-200 ${
                    expandedCategory === "frameworks" ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Years of Active Usage
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    expandedCategory === "frameworks" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-8">
              {skills.frameworks.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center gap-1 group">
                  <TechIcon
                    name={skill.name}
                    icon={skill.icon}
                    iconDark={skill.iconDark}
                    invertOnDark={skill.invertOnDark}
                    size={32}
                  />
                  <span className="text-base text-foreground font-medium">{skill.name}</span>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedCategory === "frameworks" ? "max-h-8" : "max-h-0"
                    }`}
                  >
                    <span
                      className={`text-sm text-accent font-semibold transition-opacity duration-500 ease-in-out ${
                        expandedCategory === "frameworks" ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {skill.years} years
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-card border border-border rounded-lg p-8 cursor-pointer hover:border-accent hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-lg"
            role="button"
            tabIndex={0}
            aria-expanded={expandedCategory === "cloud"}
            onClick={() => toggleCategory("cloud")}
            onKeyDown={handleKeyToggle("cloud")}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-accent transition-colors">Cloud Platforms</h2>
              <div className="flex items-center gap-3">
                <span
                  className={`text-base text-muted-foreground font-light transition-opacity duration-200 ${
                    expandedCategory === "cloud" ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Years of Active Usage
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    expandedCategory === "cloud" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-8">
              {skills.cloud.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center gap-1 group">
                  <TechIcon
                    name={skill.name}
                    icon={skill.icon}
                    iconDark={skill.iconDark}
                    invertOnDark={skill.invertOnDark}
                    size={32}
                  />
                  <span className="text-base text-foreground font-medium">{skill.name}</span>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedCategory === "cloud" ? "max-h-8" : "max-h-0"
                    }`}
                  >
                    <span
                      className={`text-sm text-accent font-semibold transition-opacity duration-500 ease-in-out ${
                        expandedCategory === "cloud" ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {skill.years} years
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-card border border-border rounded-lg p-8 cursor-pointer hover:border-accent hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-lg"
            role="button"
            tabIndex={0}
            aria-expanded={expandedCategory === "tools"}
            onClick={() => toggleCategory("tools")}
            onKeyDown={handleKeyToggle("tools")}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-accent transition-colors">Developer Tools</h2>
              <div className="flex items-center gap-3">
                <span
                  className={`text-base text-muted-foreground font-light transition-opacity duration-200 ${
                    expandedCategory === "tools" ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Years of Active Usage
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    expandedCategory === "tools" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-8">
              {skills.tools.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center gap-1 group">
                  <TechIcon
                    name={skill.name}
                    icon={skill.icon}
                    iconDark={skill.iconDark}
                    invertOnDark={skill.invertOnDark}
                    size={32}
                  />
                  <span className="text-base text-foreground font-medium">{skill.name}</span>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedCategory === "tools" ? "max-h-8" : "max-h-0"
                    }`}
                  >
                    <span
                      className={`text-sm text-accent font-semibold transition-opacity duration-500 ease-in-out ${
                        expandedCategory === "tools" ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {skill.years} years
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-[-0.01em] mb-10 text-foreground">
          Certifications & Qualifications
        </h2>
        <CertificationsGrid items={certifications} />
      </section>
    </div>
  );
};

export default Skills;


