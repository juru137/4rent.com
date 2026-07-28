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
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <Image src={loginBackgroundImages[activeBg]} alt="Rental home background" fill priority className="object-cover opacity-70" />
      <div className="absolute inset-0 bg-slate-950/60" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="grid w-full max-w-6xl gap-4 rounded-[1.5rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-md sm:gap-6 sm:rounded-[2rem] sm:p-4 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="flex flex-col justify-center rounded-[1.25rem] bg-slate-950/45 p-5 text-white sm:rounded-[1.5rem] sm:p-6 lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Welcome to 4Rent</p>
            <h1 className="mt-3 text-2xl font-semibold sm:text-3xl lg:text-4xl">Sign in to manage your next rental experience.</h1>
            <p className="mt-3 text-sm leading-7 text-slate-200 sm:text-base">
              Choose the role that fits your workflow and continue into the dashboard for broker or landlord support.
            </p>
          </div>

          <div className="rounded-[1.25rem] bg-white p-4 shadow-lg sm:rounded-[1.5rem] sm:p-6 lg:p-8">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-600 sm:text-sm">Secure access</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">Choose your role</h2>
              </div>
              <Link href="/" className="text-sm font-semibold text-emerald-700">Back home</Link>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label htmlFor="identifier" className="mb-1 block text-sm font-medium text-slate-700">Email or phone</label>
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none ring-0 transition focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none ring-0 transition focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                {[
                  { value: "Broker", label: "Login as Broker", description: "Track inquiries and manage rental listings." },
                  { value: "Landlord", label: "Login as Landlord", description: "Review bookings and communicate with renters." },
                ].map((option) => (
                  <label key={option.value} className={`flex cursor-pointer items-start gap-3 rounded-[1rem] border p-3 transition sm:p-4 ${role === option.value ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={role === option.value}
                      onChange={() => setRole(option.value)}
                      className="mt-1 h-4 w-4 border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>
                      <span className="block font-semibold text-slate-900">{option.label}</span>
                      <span className="mt-1 block text-sm text-slate-600">{option.description}</span>
                    </span>
                  </label>
                ))}
              </div>

              <button type="submit" className="w-full rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                Login as {role}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
