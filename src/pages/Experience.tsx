import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { education } from "@/data/education";
import { workExperience } from "@/data/work";
import { useEffect } from "react";

const Experience = () => {
  // Preload images for better performance
  useEffect(() => {
    // Preload hero images (after logos are loaded)
    const heroImages = [
      ...education.map(edu => edu.hero),
      ...workExperience.map(work => work.hero)
    ];
    
    heroImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Work Experience Section */}
      <section className="mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-12 text-foreground">
          Work Experience
        </h1>
        <Accordion type="single" collapsible className="space-y-6">
          {workExperience.map((work) => (
            <AccordionItem key={work.id} value={work.id} className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 data-[state=open]:scale-[1.02] data-[state=open]:shadow-2xl">
              <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-accent/5 group">
                <div className="w-full text-left">
                  <div className="flex items-center gap-6 w-full">
                    <img 
                      src={work.logo} 
                      alt={`${work.company} Logo`} 
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      loading="eager"
                      fetchPriority="high"
                    />
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center flex-1 gap-2">
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground">{work.title}</h2>
                        <p className="text-xl text-accent font-medium">{work.company}</p>
                        <p className="text-base text-muted-foreground mt-1">{work.location}</p>
                      </div>
                      <span className="text-muted-foreground font-light md:mr-8">{work.dateRange}</span>
                    </div>
                  </div>
                  <div className="ml-0 md:ml-22 mt-4 space-y-1.5 text-base text-foreground/70 transition-all duration-300 overflow-hidden group-data-[state=open]:opacity-0 group-data-[state=open]:max-h-0 group-data-[state=open]:mt-0 max-h-40">
                    {work.summary.map((item, idx) => (
                      <p key={idx}>• {item}</p>
                    ))}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 animate-fade-in">
                {/* <img 
                  src={work.hero} 
                  alt={work.company} 
                  className="w-full h-48 md:h-64 object-cover rounded-lg mb-6"
                  loading="eager"
                /> */}
                <div className="space-y-6 text-lg">
                  {work.details.map((detail, idx) => (
                    <div key={idx}>
                      <p className="text-foreground font-bold text-xl mb-3">{detail.title}</p>
                      <p className="text-foreground">{detail.description}</p>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <h3 className="font-semibold text-foreground mb-3">Technologies {work.id === 'tutor' ? '& Topics Covered' : work.id === 'cpleads' ? '& Methods' : work.id === 'codeai' ? '& Skills' : 'Used'}</h3>
                    <div className="flex flex-wrap gap-2">
                      {work.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-accent/10 text-accent rounded-md text-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Education Section */}
      <section className="mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-12 text-foreground">
          Education
        </h1>
        <Accordion type="single" collapsible className="space-y-6">
          {education.map((edu) => (
            <AccordionItem key={edu.id} value={edu.id} className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 data-[state=open]:scale-[1.02] data-[state=open]:shadow-2xl">
              <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-accent/5 group">
                <div className="w-full text-left">
                  <div className="flex items-center gap-6 w-full">
                    <img 
                      src={edu.logo} 
                      alt={`${edu.institution} Logo`} 
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      loading="eager"
                      fetchPriority="high"
                    />
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center flex-1 gap-2">
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground">{edu.title}</h2>
                        <p className="text-xl text-accent font-medium">{edu.institution}</p>
                        <p className="text-base text-muted-foreground mt-1">{edu.location}</p>
                      </div>
                      <span className="text-muted-foreground font-light md:mr-8">{edu.date}</span>
                    </div>
                  </div>
                  <div className="ml-0 md:ml-22 mt-4 space-y-1.5 text-base text-foreground/70 transition-all duration-300 overflow-hidden group-data-[state=open]:opacity-0 group-data-[state=open]:max-h-0 group-data-[state=open]:mt-0 max-h-40">
                    {edu.summary.map((item, idx) => (
                      <p key={idx}>• {item}</p>
                    ))}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 animate-fade-in">
                <img 
                  src={edu.hero} 
                  alt={edu.institution} 
                  className="w-full h-48 md:h-64 object-cover rounded-lg mb-6"
                  loading="eager"
                />
                <div className="space-y-6 text-lg">
                  {edu.details.map((detail, idx) => (
                    <div key={idx}>
                      <p className="text-foreground font-bold text-xl mb-3">{detail.title}</p>
                      <p className="text-foreground">{detail.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default Experience;
