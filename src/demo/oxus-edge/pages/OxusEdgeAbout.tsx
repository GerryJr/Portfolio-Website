import Image from "@/demo/oxus-edge/lib/next-image";
import Link from "@/demo/oxus-edge/lib/next-link";
import Footer from "@/demo/oxus-edge/components/Footer";
import { HERO_IMAGES, LIFESTYLE_IMAGES } from "@/demo/oxus-edge/data/images";


export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] max-h-[520px] flex items-end overflow-hidden">
        <Image src={HERO_IMAGES.smokyDawn} alt="Smoky Mountains at dawn" fill priority className="object-cover" quality={85} />
        <div className="absolute inset-0 bg-gradient-to-t from-depth-mocha via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
        <div className="relative z-10 mx-auto max-w-[1280px] w-full px-6 pb-12">
          <div className="bg-depth-mocha/60 backdrop-blur-sm rounded-[2px] px-3 py-1 inline-flex mb-3">
            <nav className="text-xs text-text-muted flex items-center gap-1.5">
              <Link href="/" className="hover:text-ember transition-colors">Home</Link>
              <svg viewBox="0 0 24 24" className="w-3 h-3 text-text-muted/50" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              <span className="text-text-primary">Our Story</span>
            </nav>
          </div>
          <h1 className="font-display text-[clamp(1.8rem,5vw,3.2rem)] font-medium text-white tracking-[-0.01em]">Our Story</h1>
        </div>
      </section>

      {/* Story content */}
      <section className="py-24 bg-depth-mocha">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="flex justify-center mb-12">
            <div className="w-16 h-16 relative opacity-[0.08]">
              <Image src="/logo.png" alt="" fill sizes="64px" className="object-contain" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-24">
            <div>
              <p className="text-ridge-mist text-[0.65rem] font-semibold tracking-[0.25em] uppercase mb-4 font-display">The Beginning</p>
              <h2 className="font-display text-[clamp(1.4rem,3vw,1.9rem)] font-medium leading-snug mb-6 tracking-[-0.01em]">
                Born in the Blue Ridge
              </h2>
              <p className="text-text-secondary text-[0.9rem] leading-[1.7] mb-5 max-w-2xl">
                Oxus Edge started the way most good things do: around a fire, with a blade in hand, and a question. What would it take to make a knife worth carrying for a lifetime?
              </p>
              <p className="text-text-secondary text-[0.9rem] leading-[1.7] mb-5 max-w-2xl">
                The answer turned out to be simple: start with the best steel, forge it by hand, and never cut corners. No CNC machines. No factory floor. Just fire, hammer, and anvil in a workshop tucked into the Appalachian foothills.
              </p>
              <p className="text-text-secondary text-[0.9rem] leading-[1.7] max-w-2xl">
                Every knife we make is tempered individually, ground to a working edge by hand, and fitted with handle materials sourced from the same mountains we call home. Stabilized walnut burl, curly maple, bone, and Micarta. We make what we carry.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-[2px] overflow-hidden relative">
              <Image src={LIFESTYLE_IMAGES.workshop} alt="Oxus Edge workshop" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="order-2 lg:order-1 aspect-[4/3] rounded-[2px] overflow-hidden relative">
              <Image src={LIFESTYLE_IMAGES.campfireEmbers} alt="Campfire embers" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-ridge-mist text-[0.65rem] font-semibold tracking-[0.25em] uppercase mb-4 font-display">The Drop System</p>
              <h2 className="font-display text-[clamp(1.4rem,3vw,1.9rem)] font-medium leading-snug mb-6 tracking-[-0.01em]">
                Small Batches, First Come First Served
              </h2>
              <p className="text-text-secondary text-[0.9rem] leading-[1.7] mb-5 max-w-2xl">
                We don&apos;t keep a warehouse full of knives. Each batch is forged as a limited run, then released through a timed drop. When they sell out, they&apos;re gone until the next batch.
              </p>
              <p className="text-text-secondary text-[0.9rem] leading-[1.7] max-w-2xl">
                This isn&apos;t artificial scarcity. It&apos;s the natural result of making things by hand. A single blade takes hours to forge, temper, grind, and finish. We&apos;d rather make fewer great knives than thousands of mediocre ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-depth-mocha">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-[clamp(1.5rem,3vw,1.9rem)] font-medium tracking-[0.01em]">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[3px] max-w-4xl mx-auto">
            {[
              { title: "Handmade, Always", desc: "Every blade is forged, tempered, and finished by hand. No CNC, no shortcuts.", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
              { title: "Honest Materials", desc: "We use steels and handle materials we trust. Nothing we wouldn't carry ourselves.", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
              { title: "Built to Last", desc: "Our knives are made to be used hard and passed down. Buy once, carry forever.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            ].map((v) => (
              <div key={v.title} className="text-center p-8 bg-bg-card rounded-none border border-border/50">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mb-4 text-ember" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={v.icon}/></svg>
                <h3 className="font-display text-[0.9rem] tracking-[0.04em] mb-2.5">{v.title}</h3>
                <p className="text-text-secondary text-[0.82rem] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-depth-mocha">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-display text-[clamp(1.4rem,3vw,1.9rem)] font-medium mb-5 tracking-[-0.01em]">Ready to See What We Have Made?</h2>
          <p className="text-text-secondary text-[0.9rem] mb-8 max-w-2xl mx-auto leading-relaxed">Browse our current collection or sign up to get notified before the next drop.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/knives" className="px-8 py-3.5 bg-ember text-white font-display text-[0.68rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:bg-ember-light transition-all">
              Shop Knives
            </Link>
            <Link href="/accessories" className="px-8 py-3.5 border border-white/[0.1] text-text-primary font-display text-[0.68rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:border-ember hover:text-ember transition-all">
              Accessories
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
