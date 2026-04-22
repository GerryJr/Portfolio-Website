import Link from "@/demo/oxus-edge/lib/next-link";


export default function EmailConfirmPage() {
  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12 bg-depth-mocha">
      <div className="w-full max-w-[420px]">
        <div className="bg-bg-card border border-white/[0.06] rounded-none p-8 text-center">
          <nav className="text-xs text-text-muted mb-4 flex items-center gap-1.5"><span>Account created</span><svg viewBox="0 0 24 24" className="w-3 h-3 text-text-muted/50" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg><span className="text-text-primary font-semibold">Verify Email</span></nav>
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-ember/15 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-ember" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h1 className="font-display text-lg tracking-[0.06em] mb-3">Check Your Email</h1>
          <p className="text-text-secondary text-[0.85rem] leading-relaxed mb-5">
            We sent a confirmation link to <strong className="text-ember">you@example.com</strong>.
            Click the link to verify your account.
          </p>
          <p className="text-text-muted text-[0.78rem] mb-6">
            Didn&apos;t receive it?{" "}
            <button className="text-ember hover:text-ember-light cursor-pointer transition-colors">Resend email</button>
          </p>
          <Link href="/login" className="inline-flex px-5 py-2.5 border border-white/[0.1] text-text-primary font-display text-[0.7rem] font-semibold tracking-[0.1em] uppercase rounded-none hover:border-ember hover:text-ember transition-all">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
