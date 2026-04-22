import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import PasswordInput from "@/demo/oxus-edge/components/PasswordInput";


export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12 bg-depth-mocha">
      <div className="w-full max-w-[380px]">
        <div className="bg-bg-card border border-white/[0.06] rounded-none p-7">
          <div className="text-center mb-6">
            <Image
              src="/logo.png"
              alt="Oxus Edge"
              width={48}
              height={48}
              style={{ width: 'auto', height: 'auto' }}
              className="mx-auto brightness-0 invert-[0.9] sepia-[0.3] saturate-50 hue-rotate-[10deg] mb-3"
            />
            <h1 className="font-display text-lg tracking-[0.06em]">Create Account</h1>
            <p className="text-text-muted text-[0.75rem] mt-1 leading-[1.7]">Join to get drop notifications</p>
          </div>

          <div className="space-y-3 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="register-first-name" className="block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-text-muted mb-1.5">First Name</label>
                <input id="register-first-name" type="text" placeholder="First" className="input text-sm" required aria-required="true" autoComplete="given-name" />
              </div>
              <div>
                <label htmlFor="register-last-name" className="block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-text-muted mb-1.5">Last Name</label>
                <input id="register-last-name" type="text" placeholder="Last" className="input text-sm" required aria-required="true" autoComplete="family-name" />
              </div>
            </div>
            <div>
              <label htmlFor="register-email" className="block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-text-muted mb-1.5">Email</label>
              <input id="register-email" type="email" placeholder="you@example.com" className="input text-sm" required aria-required="true" autoComplete="email" />
            </div>
            <div>
              <label htmlFor="register-phone" className="block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-text-muted mb-1.5">Phone (optional)</label>
              <input id="register-phone" type="tel" placeholder="For SMS drop alerts" className="input text-sm" autoComplete="tel" />
            </div>
            <div>
              <label htmlFor="register-password" className="block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-text-muted mb-1.5">Password</label>
              <PasswordInput id="register-password" placeholder="8+ characters" autoComplete="new-password" required />
            </div>
          </div>

          <label htmlFor="register-terms" className="flex items-baseline gap-2 text-[0.72rem] text-text-muted cursor-pointer mb-5 hover:text-text-secondary transition-colors">
            <input id="register-terms" type="checkbox" className="accent-ember w-3 h-3 mt-0.5" />
            <span>I agree to the <Link href="#" className="text-ember hover:underline" title="Coming soon">Terms</Link> and <Link href="#" className="text-ember hover:underline" title="Coming soon">Privacy Policy</Link></span>
          </label>

          <Link
            href="/email-confirm"
            className="block w-full py-3.5 bg-ember text-white text-center font-display text-[0.7rem] font-semibold tracking-[0.1em] uppercase rounded-[2px] hover:bg-ember-light transition-all cursor-pointer"
          >
            Create Account
          </Link>

          <p className="text-center mt-5 text-[0.75rem] text-text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-ember hover:text-ember-light font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
