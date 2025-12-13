import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { speakingEngagements } from "@/data/speaking";
import { publications } from "@/data/publications";
import { aboutData } from "@/data/about";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Intro with Hero Image */}
      <section className="mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-8 text-foreground">About Me</h1>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <img
              src={aboutData.hero.image}
              alt={aboutData.hero.alt}
              className="w-48 h-48 object-cover rounded-full shadow-xl"
              loading="lazy"
            />
          </div>
          <div className="flex-1 space-y-6">
            {aboutData.hero.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-xl text-foreground leading-relaxed font-light">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="space-y-6" id="contact">
          <div className="flex flex-wrap gap-4 mt-10">
            <Button
              variant="default"
              size="lg"
              className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
              asChild
            >
              <a href="https://github.com/gerryjr" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:bg-secondary/90"
              asChild
            >
              <a href="https://linkedin.com/in/gerryjr" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:bg-secondary/90"
              asChild
            >
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
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-12 text-foreground">Public Presentation</h1>
        <div className="grid md:grid-cols-2 items-start gap-8 mb-12">
          {speakingEngagements.map((event) => (
            <Card key={event.id} className="overflow-hidden border border-border transition-colors">
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
                <div className="mt-4">
                  <p className="text-sm font-semibold text-accent mb-3">
                    Key Concepts & Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {event.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
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
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>");

          return (
            <div key={pub.id} className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors mb-12">
              <p className="text-lg text-foreground leading-relaxed mb-4 font-light" dangerouslySetInnerHTML={{ __html: formattedText }} />
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent hover:text-accent/80 transition-colors text-lg"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Publication
              </a>
            </div>
          );
        })}
      </section>

      {/* Personal Interests */}
      <section className="mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-8 text-foreground">
          {aboutData.personalInterests.title}
        </h1>
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1 space-y-6">
            {aboutData.personalInterests.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-xl text-foreground leading-relaxed font-light">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex-shrink-0 w-full md:w-52 lg:w-60 max-w-xs md:max-w-sm ml-auto">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-border/60 relative aspect-[2586/3448]">
              <img
                src={aboutData.personalInterests.image.src}
                alt={aboutData.personalInterests.image.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3 text-center">
              {aboutData.personalInterests.image.note}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
