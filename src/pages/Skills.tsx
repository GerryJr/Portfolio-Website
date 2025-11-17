import { TechIcon } from "@/components/TechIcon";
import { Award, ChevronDown } from "lucide-react";
import { useState } from "react";
import { skills } from "@/data/skills";
import { certifications } from "@/data/certifications";
const Skills = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Technical Skills Section */}
      <section className="mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-12 text-foreground">
          Technical Skills
        </h1>
        
        <div className="space-y-12">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-accent flex items-center gap-2 cursor-pointer hover:text-accent/80 transition-colors" onClick={() => setExpandedCategory(expandedCategory === 'languages' ? null : 'languages')}>
              Programming Languages
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${expandedCategory === 'languages' ? 'rotate-180' : ''}`} />
            </h2>
            <div className="flex flex-wrap gap-8">
              {skills.languages.map(skill => <div key={skill.name} className="flex flex-col items-center gap-1 group">
                  <TechIcon name={skill.name} icon={skill.icon} size={32} />
                  <span className="text-base text-foreground font-medium">{skill.name}</span>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCategory === 'languages' ? 'max-h-8' : 'max-h-0'}`}>
                    <span className={`text-sm text-accent font-semibold transition-opacity duration-500 ease-in-out ${expandedCategory === 'languages' ? 'opacity-100' : 'opacity-0'}`}>
                      {skill.years} years
                    </span>
                  </div>
                </div>)}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-accent flex items-center gap-2 cursor-pointer hover:text-accent/80 transition-colors" onClick={() => setExpandedCategory(expandedCategory === 'frameworks' ? null : 'frameworks')}>
              Frameworks & Libraries
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${expandedCategory === 'frameworks' ? 'rotate-180' : ''}`} />
            </h2>
            <div className="flex flex-wrap gap-8">
              {skills.frameworks.map(skill => <div key={skill.name} className="flex flex-col items-center gap-1 group">
                  <TechIcon name={skill.name} icon={skill.icon} size={32} />
                  <span className="text-base text-foreground font-medium">{skill.name}</span>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCategory === 'frameworks' ? 'max-h-8' : 'max-h-0'}`}>
                    <span className={`text-sm text-accent font-semibold transition-opacity duration-500 ease-in-out ${expandedCategory === 'frameworks' ? 'opacity-100' : 'opacity-0'}`}>
                      {skill.years} years
                    </span>
                  </div>
                </div>)}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-accent flex items-center gap-2 cursor-pointer hover:text-accent/80 transition-colors" onClick={() => setExpandedCategory(expandedCategory === 'cloud' ? null : 'cloud')}>
              Cloud Platforms
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${expandedCategory === 'cloud' ? 'rotate-180' : ''}`} />
            </h2>
            <div className="flex flex-wrap gap-8">
              {skills.cloud.map(skill => <div key={skill.name} className="flex flex-col items-center gap-1 group">
                  <TechIcon name={skill.name} icon={skill.icon} size={32} />
                  <span className="text-base text-foreground font-medium">{skill.name}</span>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCategory === 'cloud' ? 'max-h-8' : 'max-h-0'}`}>
                    <span className={`text-sm text-accent font-semibold transition-opacity duration-500 ease-in-out ${expandedCategory === 'cloud' ? 'opacity-100' : 'opacity-0'}`}>
                      {skill.years} years
                    </span>
                  </div>
                </div>)}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-accent flex items-center gap-2 cursor-pointer hover:text-accent/80 transition-colors" onClick={() => setExpandedCategory(expandedCategory === 'tools' ? null : 'tools')}>
              Developer Tools
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${expandedCategory === 'tools' ? 'rotate-180' : ''}`} />
            </h2>
            <div className="flex flex-wrap gap-8">
              {skills.tools.map(skill => <div key={skill.name} className="flex flex-col items-center gap-1 group">
                  <TechIcon name={skill.name} icon={skill.icon} size={32} />
                  <span className="text-base text-foreground font-medium">{skill.name}</span>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCategory === 'tools' ? 'max-h-8' : 'max-h-0'}`}>
                    <span className={`text-sm text-accent font-semibold transition-opacity duration-500 ease-in-out ${expandedCategory === 'tools' ? 'opacity-100' : 'opacity-0'}`}>
                      {skill.years} years
                    </span>
                  </div>
                </div>)}
            </div>
          </div>

          
        </div>
      </section>

      {/* Certifications Section */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-12 text-foreground">
          Certifications & Qualifications
        </h1>
        <div className="space-y-10">
          {certifications.map((cert, idx) => <div key={idx} className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors py-[24px]">
              <div className="flex items-start gap-4 mb-4 my-[8px]">
                <div className="p-3 rounded-lg bg-accent/10 text-accent">
                  <Award className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <h2 className="text-2xl font-semibold text-foreground">{cert.title}</h2>
                    <span className="text-muted-foreground font-light">{cert.date}</span>
                  </div>
                  <ul className="space-y-2 text-lg text-foreground">
                    {cert.keyPoints.map((point, pointIdx) => <li key={pointIdx} className="flex items-start">
                        <span className="mr-3 text-accent">•</span>
                        <span>{point}</span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>)}
        </div>
      </section>
    </div>;
};
export default Skills;