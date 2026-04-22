import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import PasswordInput from "@/demo/oxus-edge/components/PasswordInput";


export default function LoginPage() {
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
            <h1 className="font-display text-lg tracking-[0.06em]">Welcome Back</h1>
            <p className="text-text-muted text-[0.75rem] mt-1 leading-[1.7]">Sign in to your account</p>
          </div>

          <div className="space-y-3 mb-4">
            <div>
              <label htmlFor="login-email" className="block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-text-muted mb-1.5">Email</label>
              <input id="login-email" type="email" placeholder="you@example.com" className="input text-sm" required aria-required="true" />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-text-muted mb-1.5">Password</label>
              <PasswordInput id="login-password" placeholder="Enter your password" autoComplete="current-password" required />
            </div>
          </div>

          <div className="flex justify-between items-center mb-5 text-[0.75rem]">
            <label htmlFor="login-remember" className="flex items-center gap-1.5 text-text-muted cursor-pointer hover:text-text-secondary transition-colors">
              <input id="login-remember" type="checkbox" className="accent-ember w-3.5 h-3.5" /> Remember me
            </label>
            <Link href="#" className="text-ember hover:text-ember-light transition-colors" title="Coming soon">
              Forgot password?
            </Link>
          </div>

          {/* Links to /admin since no backend — simulates login */}
          <Link
            href="/admin"
            className="block w-full py-3.5 bg-ember text-white text-center font-display text-[0.7rem] font-semibold tracking-[0.1em] uppercase rounded-[2px] hover:bg-ember-light transition-all cursor-pointer"
          >
            Sign In
          </Link>

          <p className="text-center mt-5 text-[0.75rem] text-text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-ember hover:text-ember-light font-medium transition-colors">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
