"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { loginBackgroundImages } from "../../lib/listings";

export default function LoginPage() {
  const [activeBg, setActiveBg] = useState(0);
  const [role, setRole] = useState("Broker");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveBg((prev) => (prev + 1) % loginBackgroundImages.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-3 py-4 sm:px-6 sm:py-6 lg:py-8">
      <Image src={loginBackgroundImages[activeBg]} alt="Rental home background" fill priority className="object-cover opacity-70" />
      <div className="absolute inset-0 bg-slate-950/60" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-[1.5rem] border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur-md sm:rounded-[2rem] sm:p-6 lg:p-8">
          <div className="mb-4 flex items-center justify-between gap-2 sm:mb-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-600 sm:text-xs">Secure access</p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl lg:text-2xl">Choose your role</h2>
            </div>
            <Link href="/" className="text-xs font-semibold text-emerald-700 sm:text-sm">Back home</Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="identifier" className="mb-1 block text-xs font-medium text-slate-700 sm:text-sm">Phone number</label>
              <input
                id="identifier"
                type="tel"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="+256 700 000 000"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none ring-0 transition focus:border-emerald-500 focus:bg-white sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-xs font-medium text-slate-700 sm:text-sm">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none ring-0 transition focus:border-emerald-500 focus:bg-white sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
              />
            </div>

            <div className="space-y-2">
              {[
                { value: "Broker", label: "Login as Broker", description: "Track inquiries and manage listings." },
                { value: "Landlord", label: "Login as Landlord", description: "Review bookings and communicate." },
              ].map((option) => (
                <label key={option.value} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2 transition sm:rounded-xl sm:p-2.5 ${role === option.value ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={role === option.value}
                    onChange={() => setRole(option.value)}
                    className="h-4 w-4 border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-semibold text-slate-900 sm:text-sm">{option.label}</span>
                </label>
              ))}
            </div>

            <button type="submit" className="w-full rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:py-3">
              Login as {role}
            </button>
          </form>
        </div>

        <p className="mt-3 text-center text-[11px] text-slate-300 sm:text-xs">
          Brokers and landlords access the same secure portal.
        </p>
      </div>
    </div>
  );
}
