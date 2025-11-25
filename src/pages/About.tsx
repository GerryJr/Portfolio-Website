import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink, MapPin, Calendar, ChevronDown } from "lucide-react";
import heroProfessional from "@/assets/hero-professional.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { speakingEngagements } from "@/data/speaking";
import { publications } from "@/data/publications";

const About = () => {
  const [openSpeech, setOpenSpeech] = useState<number | null>(null);
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Intro with Hero Image */}
      <section className="mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-8 text-foreground">About Me</h1>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <img src={heroProfessional} alt="Gerardo Lopez - Professional headshot" className="w-48 h-48 object-cover rounded-full shadow-xl" loading="lazy" />
          </div>
          <div className="flex-1 space-y-6">
            <p className="text-xl text-foreground leading-relaxed font-light">
              I'm a software engineer specializing in cloud-native applications for education and research. 
              My work focuses on building secure, scalable systems using AWS serverless architecture and 
              modern web technologies.
            </p>
            <p className="text-xl text-foreground leading-relaxed font-light">
              I have hands-on experience implementing LTI 1.3 integrations, designing multi-tenant platforms 
              with row-level security, and architecting serverless ETL pipelines. I prioritize clean architecture, 
              performance optimization, and security best practices.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 mt-10">
            <Button variant="default" size="lg" asChild>
              <a href="https://github.com/gerryjr" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="www.linkedin.com/in/gerryjr" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="mailto:gerardolopezjr1178@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Public Speaks */}
      <section className="mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-12 text-foreground">Public Speaks</h1>
        <div className="grid md:grid-cols-2 items-start gap-8 mb-12">
          {speakingEngagements.map((event, index) => (
            <Card key={event.id} className="overflow-hidden hover:border-accent transition-colors">
              <div className="aspect-video overflow-hidden">
                <img src={event.image} alt={`Gerardo Lopez at ${event.title}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                <div className="flex flex-wrap gap-4 mb-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {event.description}
                </p>
                <Collapsible open={openSpeech === index} onOpenChange={(isOpen) => setOpenSpeech(isOpen ? index : null)}>
                  <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSpeech === index ? 'rotate-180' : ''}`} />
                    Key Concepts & Technologies
                  </CollapsibleTrigger>
                  <CollapsibleContent forceMount>
                    <div className={`overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-in-out ${openSpeech === index ? 'max-h-48 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
                      <div className="flex flex-wrap gap-2">
                        {event.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-12 text-foreground">Publications</h1>
        {publications.map((pub) => {
          // Parse markdown-like formatting
          const formattedText = pub.text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
          
          return (
            <div key={pub.id} className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors mb-12">
              <p 
                className="text-lg text-foreground leading-relaxed mb-4 font-light"
                dangerouslySetInnerHTML={{ __html: formattedText }}
              />
              <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-accent hover:text-accent/80 transition-colors text-lg">
                <ExternalLink className="mr-2 h-5 w-5" />
                View Publication
              </a>
            </div>
          );
        })}
      </section>
    </div>;
};
export default About;