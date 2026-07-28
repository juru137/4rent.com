import Link from "next/link";
import type { ReactNode } from "react";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-wide text-slate-900">4Rent</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
              Home
            </Link>
            <Link href="/login" className="rounded-full bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold text-slate-900">4Rent</h3>
            <p className="mt-2 text-slate-600">Find trusted rooms and homes with fast search tools for renters, landlords, and brokers.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Quick links</h3>
            <ul className="mt-2 space-y-2">
              <li><Link href="/" className="transition hover:text-emerald-600">Home</Link></li>
              <li><Link href="/login" className="transition hover:text-emerald-600">Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Reach us</h3>
            <ul className="mt-2 space-y-2">
                <li>+256 700 000 000</li>
                <li>support@4rent.co.ke</li>
                <li>Kampala, Uganda</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
