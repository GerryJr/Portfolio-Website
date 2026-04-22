import Link from "@/demo/oxus-edge/lib/next-link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 bg-depth-mocha">
      <div className="text-center max-w-md">
        <p className="text-ember text-[0.65rem] font-display font-semibold tracking-[0.25em] uppercase mb-4">Page Not Found</p>
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-medium tracking-[-0.01em] mb-4">404</h1>
        <p className="text-text-secondary text-[0.9rem] leading-relaxed mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-ember text-white font-display text-[0.68rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:bg-ember-light transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/knives"
            className="px-6 py-3 border border-white/[0.1] text-text-primary font-display text-[0.68rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:border-ember hover:text-ember transition-all"
          >
            Knives
          </Link>
        </div>
      </div>
    </main>
  );
}
