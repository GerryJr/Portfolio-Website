import { useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SegmentedToggle, type SegmentedToggleOption } from "@/components/SegmentedToggle";
import { Eyebrow } from "@/components/Eyebrow";
import { TimelineYearStack } from "@/components/TimelineYearStack";
import { education } from "@/data/education";
import { workExperience } from "@/data/work";
import { commissions } from "@/data/commissions";
import { Briefcase, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePageTitle } from "@/hooks/use-page-title";
import { useSessionMemo } from "@/hooks/use-session-memo";

type TabKey = "experience" | "commissions";

const tabCopy: Record<TabKey, { eyebrow: string; title: string; lede: string }> = {
  experience: {
    eyebrow: `Career · ${workExperience.length} roles`,
    title: "Experience",
    lede: "Roles, research positions, and education that shaped how I build software today.",
  },
  commissions: {
    eyebrow: `Client work · ${commissions.length} commissions`,
    title: "Commissions",
    lede: "Independent client work: sites and apps built end-to-end.",
  },
};

const tabOptions: SegmentedToggleOption<TabKey>[] = [
  { value: "experience", label: "Experience", icon: Briefcase },
  { value: "commissions", label: "Commissions", icon: Handshake },
];

/** Each panel becomes a positioned overlay when inactive so both stay mounted (for SEO crawlers)
 *  while the active one drives the parent height. Inactive panels fade + slide a few pixels in the
 *  direction they're leaving, so the swap reads as motion instead of a hard cut. The gentle
 *  S-curve easing keeps the swap from feeling like a snap-pan — slower at the start, smoother
 *  through the middle.
 *
 *  Inactive panels use `inset-0 overflow-hidden` (not just `top:0`): the
 *  panel sizes to the parent's bounds — which are driven by the *active*
 *  panel's natural height — and any content that overflows the panel clips
 *  inside it. Without this, a tall inactive panel (e.g. Experience) bleeds
 *  past the wrapper when the shorter panel (e.g. Commissions) is active,
 *  inflating the page scrollHeight and leaving a stretch of empty space
 *  below the Footer. */
const panelClasses = (isActive: boolean, side: "left" | "right") =>
  cn(
    "motion-safe:transition-[opacity,transform,filter] motion-safe:duration-[560ms] motion-safe:ease-[cubic-bezier(0.32,0.72,0.32,1)]",
    isActive
      ? "opacity-100 translate-x-0 blur-0 relative"
      : cn(
          "opacity-0 pointer-events-none absolute inset-0 overflow-hidden blur-[2px]",
          side === "left" ? "-translate-x-3" : "translate-x-3",
        ),
  );

const Experience = () => {
  // Tab persists across in-app navigation (module-level memo) but resets on
  // a hard refresh — same semantics as the Projects view toggle.
  const [tab, setTab] = useSessionMemo<TabKey>("experience:tab", "experience");
  usePageTitle(tab === "commissions" ? "Commissions" : "Experience");

  // Preload hero images for better performance
  useEffect(() => {
    const heroImages = [
      ...education.map((edu) => edu.hero),
      ...commissions.map((c) => c.image),
    ];

    heroImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  const copy = tabCopy[tab];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-500">
      {/* ── Header: eyebrow + dynamic H1 + shared SegmentedToggle (matches Projects) ── */}
      <header className="mb-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        {/* key={tab} re-mounts on switch so the text fades in alongside the panel crossfade */}
        <div
          key={tab}
          className="max-w-2xl motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
        >
          <Eyebrow className="mb-3">{copy.eyebrow}</Eyebrow>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-[-0.02em] mb-3 text-foreground">
            {copy.title}
          </h1>
          <p className="text-lg text-muted-foreground">{copy.lede}</p>
        </div>

        <SegmentedToggle
          value={tab}
          onChange={setTab}
          ariaLabel="Experience section"
          options={tabOptions}
        />
      </header>

      <div className="relative mt-4 min-h-[60vh]">
        <section
          aria-hidden={tab !== "experience"}
          // @ts-expect-error -- React 19 supports inert natively; older types lack it
          inert={tab === "experience" ? undefined : ""}
          className={panelClasses(tab === "experience", "left")}
        >
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-[-0.01em] mb-8 text-foreground">
              Work Experience
            </h2>
            <Accordion type="single" collapsible className="space-y-6">
              {workExperience.map((work) => (
                <AccordionItem
                  key={work.id}
                  value={work.id}
                  className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 data-[state=open]:scale-[1.02] data-[state=open]:shadow-2xl"
                >
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
                            <h3 className="text-2xl font-semibold text-foreground">{work.title}</h3>
                            <p className="text-xl text-accent font-medium">{work.company}</p>
                            <p className="text-base text-muted-foreground mt-1">{work.location}</p>
                          </div>
                          <span className="text-muted-foreground font-light md:mr-8">
                            {work.dateRange}
                          </span>
                        </div>
                      </div>
                      <div className="ml-0 md:ml-[5.5rem] mt-4 space-y-1.5 text-base text-foreground/70 transition-all duration-300 overflow-hidden group-data-[state=open]:opacity-0 group-data-[state=open]:max-h-0 group-data-[state=open]:mt-0 max-h-40">
                        {work.summary.map((item, idx) => (
                          <p key={idx}>• {item}</p>
                        ))}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 animate-fade-in">
                    <div className="space-y-6 text-lg">
                      {work.details.map((detail, idx) => (
                        <div key={idx}>
                          <p className="text-foreground font-bold text-xl mb-3">{detail.title}</p>
                          <p className="text-foreground">{detail.description}</p>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-border">
                        <h4 className="font-semibold text-foreground mb-3">
                          Technologies{" "}
                          {work.id === "tutor"
                            ? "& Topics Covered"
                            : work.id === "cpleads"
                              ? "& Methods"
                              : work.id === "codeai"
                                ? "& Skills"
                                : "Used"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {work.technologies.map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-accent/10 text-accent rounded-md text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-[-0.01em] mb-8 text-foreground">
              Education
            </h2>
            <Accordion type="single" collapsible className="space-y-6">
              {education.map((edu) => (
                <AccordionItem
                  key={edu.id}
                  value={edu.id}
                  className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 data-[state=open]:scale-[1.02] data-[state=open]:shadow-2xl"
                >
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
                            <h3 className="text-2xl font-semibold text-foreground">{edu.title}</h3>
                            <p className="text-xl text-accent font-medium">{edu.institution}</p>
                            <p className="text-base text-muted-foreground mt-1">{edu.location}</p>
                          </div>
                          <span className="text-muted-foreground font-light md:mr-8">{edu.date}</span>
                        </div>
                      </div>
                      <div className="ml-0 md:ml-[5.5rem] mt-4 space-y-1.5 text-base text-foreground/70 transition-all duration-300 overflow-hidden group-data-[state=open]:opacity-0 group-data-[state=open]:max-h-0 group-data-[state=open]:mt-0 max-h-40">
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
        </section>

        <section
          aria-hidden={tab !== "commissions"}
          // @ts-expect-error -- React 19 supports inert natively; older types lack it
          inert={tab === "commissions" ? undefined : ""}
          className={`${panelClasses(tab === "commissions", "right")} pb-20`}
        >
          <TimelineYearStack items={commissions} />
        </section>
      </div>
    </div>
  );
};

export default Experience;
