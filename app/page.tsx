"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, type Dispatch, type SetStateAction } from "react";
import { listings } from "../lib/listings";

type ThemeMode = "light" | "dark";

const heroImages = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
];

const INITIAL_VISIBLE_COUNT = 12;
const LOAD_STEP = 12;

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: ThemeMode;
  setTheme: Dispatch<SetStateAction<ThemeMode>>;
}) {
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full border border-[var(--border-color)] bg-[var(--surface)] p-2 text-[var(--foreground)] transition hover:border-emerald-500 hover:text-emerald-600"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
      )}
    </button>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-slate-100 p-4 shadow-lg sm:p-6">
        <div className="h-72 rounded-[1.5rem] bg-slate-200 animate-pulse" />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <span key={index} className="h-2.5 w-2.5 rounded-full bg-slate-200 animate-pulse" />
          ))}
        </div>
        <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-3 shadow-inner lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-3 rounded-xl border border-slate-200 bg-white p-3">
              <div className="h-3 w-24 rounded-full bg-slate-200 animate-pulse" />
              <div className="h-8 rounded-[1rem] bg-slate-200 animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-100 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="h-4 w-32 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-8 w-64 rounded-full bg-slate-200 animate-pulse" />
          </div>
          <div className="h-10 w-40 rounded-full bg-slate-200 animate-pulse" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur">
              <div className="h-5 w-24 rounded-full bg-slate-200 animate-pulse" />
              <div className="mt-3 h-4 w-full rounded-full bg-slate-200 animate-pulse" />
              <div className="mt-2 h-4 w-3/4 rounded-full bg-slate-200 animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-100 p-6 shadow-sm sm:p-8">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-4 w-36 rounded-full bg-slate-200 animate-pulse" />
          <div className="mx-auto h-8 w-60 rounded-full bg-slate-200 animate-pulse" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-2xl bg-slate-50 p-5">
              <div className="h-4 w-full rounded-full bg-slate-200 animate-pulse" />
              <div className="mt-3 h-4 w-3/4 rounded-full bg-slate-200 animate-pulse" />
              <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DesktopView({
  activeImage,
  setActiveImage,
  visibleCount,
  visibleListings,
  filteredListings,
  isShowingAll,
  filters,
  setFilters,
  onShowLess,
  onShowMore,
  animatedStartIndex,
  isCollapsing,
}: {
  activeImage: number;
  setActiveImage: (value: number) => void;
  visibleCount: number;
  visibleListings: typeof listings;
  filteredListings: typeof listings;
  setVisibleCount: Dispatch<SetStateAction<number>>;
  isShowingAll: boolean;
  filters: {
    location: string;
    rooms: string;
    type: string;
    price: string;
  };
  setFilters: (value: { location: string; rooms: string; type: string; price: string }) => void;
  onShowLess: () => void;
  onShowMore: () => void;
  animatedStartIndex: number | null;
  isCollapsing: boolean;
}) {
  return (
    <div className="hidden lg:block">
      <section className="w-full rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-strong)] p-4 shadow-lg sm:p-6">
        <div className="overflow-hidden rounded-[1.5rem]">
          <Image
            src={heroImages[activeImage]}
            alt="Featured rental property"
            width={1200}
            height={720}
            priority={activeImage === 0}
            className="h-64 w-full object-cover sm:h-80 lg:h-[320px]"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {heroImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeImage ? "bg-emerald-600" : "bg-slate-300"
              }`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>

        <form className="mt-5 grid gap-3 rounded-2xl bg-[var(--surface)] p-3 shadow-inner lg:grid-cols-4">
          <label className="flex flex-col gap-1 rounded-xl border border-[var(--border-color)] bg-[var(--surface-strong)] p-3 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Location</span>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="bg-transparent text-sm font-medium outline-none"
            >
              <option>Any location</option>
              <option>Kampala</option>
              <option>Entebbe</option>
              <option>Jinja</option>
              <option>Gulu</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-3 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Rooms</span>
            <select
              value={filters.rooms}
              onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
              className="bg-transparent text-sm font-medium outline-none"
            >
              <option>Any</option>
              <option>1 room</option>
              <option>2 rooms</option>
              <option>3+ rooms</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-3 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Type</span>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="bg-transparent text-sm font-medium outline-none"
            >
              <option>Any type</option>
              <option>Single Room</option>
              <option>Double Room</option>
              <option>Self Contained</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-3 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Price</span>
            <select
              value={filters.price}
              onChange={(e) => setFilters({ ...filters, price: e.target.value })}
              className="bg-transparent text-sm font-medium outline-none"
            >
              <option>Any price</option>
                <option>Under UGX 300,000</option>
                <option>UGX 300,000 - 500,000</option>
                <option>Above UGX 500,000</option>
            </select>
          </label>
        </form>
      </section>

      <section>
        <div className="mt-10 mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Available rooms</p>
            <h2 className="text-2xl font-semibold text-slate-900">Popular rentals</h2>
          </div>
          <span className="text-sm text-slate-500">{visibleCount} of {filteredListings.length} shown</span>
        </div>

        {filteredListings.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            <p className="text-lg font-semibold text-slate-900">No results found</p>
            <p className="mt-2">We found 0 matching rooms for your filters.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {visibleListings.map((item, index) => (
              <article
                key={item.id}
                className={`flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                  animatedStartIndex !== null && index >= animatedStartIndex ? "animate-fadeInUp" : ""
                } ${isCollapsing ? "animate-fadeOut" : ""}`}
              >
                <Link href={`/rooms/${item.id}`} className="flex h-full flex-col">
                  <div className="relative">
                    <Image src={item.image} alt={item.title} width={800} height={500} className="h-40 w-full object-cover" />
                    <span className="absolute right-3 top-3 rounded-full bg-emerald-600/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                      {item.rooms}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{item.location}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                      <span>{item.posted}</span>
                      <span className="font-semibold text-slate-900">{item.price}</span>
                    </div>
                    <div className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.87.33 1.72.63 2.54l-1.2 1.2a15.9 15.9 0 0 0 6.28 6.28l1.2-1.2c.82.3 1.67.51 2.54.63A2 2 0 0 1 22 16.92Z" />
                      </svg>
                      Book
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {!isShowingAll ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onShowMore}
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Show more
            </button>
          </div>
        ) : (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onShowLess}
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Show less
            </button>
          </div>
        )}
      </section>

      <section className="mt-6 rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-700 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Why 4Rent</p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Trusted listings, quick matches, and easy communication.</h2>
          </div>
          <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">4.9/5 from happy renters</div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Fast search", "Browse rooms in minutes with clear filters."],
            ["Verified listings", "View trusted homes posted by real landlords and brokers."],
            ["Safe communication", "Connect directly through phone or WhatsApp."],
          ].map(([title, text], idx) => (
            <div key={title} className={`rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur fly-in delay-${idx + 1}`}>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-200">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Testimonials</p>
          <h2 className="text-2xl font-semibold text-slate-900">What renters say about 4Rent</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["“I found a beautiful room within a day and the process felt effortless.”", "— Amina, Kisaasi"],
            ["“The search filters helped me narrow down options quickly.”", "— Daniel, Kyebando"],
            ["“Amazing support and very clear property details.”", "— Grace, Ntinda"],
          ].map(([quote, author]) => (
            <div key={quote} className="rounded-2xl bg-slate-50 p-5">
              <p className="text-slate-700">{quote}</p>
              <p className="mt-3 text-sm font-semibold text-emerald-700">{author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MobileView({
  activeImage,
  setActiveImage,
  visibleCount,
  visibleListings,
  filteredListings,
  setVisibleCount,
  isShowingAll,
  filters,
  setFilters,
  onShowLess,
}: {
  activeImage: number;
  setActiveImage: (value: number) => void;
  visibleCount: number;
  visibleListings: typeof listings;
  filteredListings: typeof listings;
  setVisibleCount: Dispatch<SetStateAction<number>>;
  isShowingAll: boolean;
  filters: {
    location: string;
    rooms: string;
    type: string;
    price: string;
  };
  setFilters: (value: { location: string; rooms: string; type: string; price: string }) => void;
  onShowLess: () => void;
}) {
  return (
    <div className="lg:hidden">
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm">
        <div className="overflow-hidden rounded-[1.25rem]">
          <Image
            src={heroImages[activeImage]}
            alt="Featured rental property"
            width={900}
            height={540}
            className="h-48 w-full object-cover"
          />
        </div>

        <div className="mt-3 flex justify-center gap-2">
          {heroImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(index)}
              className={`h-2 w-2 rounded-full ${index === activeImage ? "bg-emerald-600" : "bg-slate-300"}`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>

        <form className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-2">
          <label className="min-w-0 rounded-xl border border-slate-200 bg-white p-2 text-xs">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Location</span>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="mt-1 w-full bg-transparent font-medium outline-none"
            >
              <option>Any location</option>
              <option>Kampala</option>
              <option>Entebbe</option>
              <option>Jinja</option>
              <option>Gulu</option>
            </select>
          </label>

          <label className="min-w-0 rounded-xl border border-slate-200 bg-white p-2 text-xs">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Rooms</span>
            <select
              value={filters.rooms}
              onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
              className="mt-1 w-full bg-transparent font-medium outline-none"
            >
              <option>Any</option>
              <option>1 room</option>
              <option>2 rooms</option>
              <option>3+ rooms</option>
            </select>
          </label>

          <label className="min-w-0 rounded-xl border border-slate-200 bg-white p-2 text-xs">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Type</span>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="mt-1 w-full bg-transparent font-medium outline-none"
            >
              <option>Any type</option>
              <option>Single Room</option>
              <option>Double Room</option>
              <option>Self Contained</option>
            </select>
          </label>

          <label className="min-w-0 rounded-xl border border-slate-200 bg-white p-2 text-xs">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Price</span>
            <select
              value={filters.price}
              onChange={(e) => setFilters({ ...filters, price: e.target.value })}
              className="mt-1 w-full bg-transparent font-medium outline-none"
            >
              <option>Any price</option>
              <option>Under UGX 300,000</option>
              <option>UGX 300,000 - 500,000</option>
              <option>Above UGX 500,000</option>
            </select>
          </label>
        </form>
      </section>

      <section className="mt-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-600">Available rooms</p>
            <h2 className="text-lg font-semibold text-slate-900">Popular rentals</h2>
          </div>
          <span className="text-sm text-slate-500">{visibleCount} of {filteredListings.length}</span>
        </div>

        {filteredListings.length === 0 ? (
          <div className="rounded-[1.25rem] border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600">
            <p className="font-semibold text-slate-900">No results found</p>
            <p className="mt-1">We found 0 matching rooms for your selection.</p>
          </div>
        ) : (
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {visibleListings.map((item) => (
              <article key={item.id} className="flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-sm">
                <Link href={`/rooms/${item.id}`} className="flex h-full flex-col">
                  <div className="relative">
                    <Image src={item.image} alt={item.title} width={800} height={500} className="h-32 w-full object-cover" />
                    <span className="absolute right-2 top-2 rounded-full bg-emerald-600/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
                      {item.rooms}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{item.location}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                      <span>{item.posted}</span>
                      <span className="font-semibold text-slate-900">{item.price}</span>
                    </div>
                    <div className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.87.33 1.72.63 2.54l-1.2 1.2a15.9 15.9 0 0 0 6.28 6.28l1.2-1.2c.82.3 1.67.51 2.54.63A2 2 0 0 1 22 16.92Z" />
                      </svg>
                      Book
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {!isShowingAll ? (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(filteredListings.length, prev + LOAD_STEP))}
              className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Show more
            </button>
          </div>
        ) : (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={onShowLess}
              className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Show less
            </button>
          </div>
        )}
      </section>

      <section className="mt-4 rounded-[1.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-700 p-4 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">Why 4Rent</p>
        <h2 className="mt-2 text-xl font-semibold">Fast, simple, and trustworthy.</h2>
        <p className="mt-2 text-sm text-slate-200">Flexible search, verified homes, and friendly support all in one place.</p>
      </section>

      <section className="mt-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-600">Testimonials</p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">What renters say</h2>
        <div className="mt-3 space-y-2">
          {[
            ["“Very easy to find a room quickly.”", "— Amina"],
            ["“Great filters and clear pricing.”", "— Daniel"],
          ].map(([quote, author]) => (
            <div key={quote} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
              <p>{quote}</p>
              <p className="mt-1 font-semibold text-emerald-700">{author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const [activeImage, setActiveImage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [filters, setFilters] = useState({
    location: "Any location",
    rooms: "Any",
    type: "Any type",
    price: "Any price",
  });
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [isLoading, setIsLoading] = useState(true);
  const listingsRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [animatedStartIndex, setAnimatedStartIndex] = useState<number | null>(null);
  const [isCollapsing, setIsCollapsing] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(storedTheme);
    } else {
      setTheme("light");
    }
    setIsLoading(true);

    const loadingTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => window.clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShowLess = () => {
    setIsCollapsing(true);
    setTimeout(() => {
      setVisibleCount(INITIAL_VISIBLE_COUNT);
      setIsCollapsing(false);
      setAnimatedStartIndex(null);
      window.scrollBy({ top: -window.innerHeight * 0.1, behavior: "smooth" });
    }, 250);
  };

  const handleShowMore = () => {
    const prevCount = visibleCount;
    const newCount = Math.min(filteredListings.length, prevCount + LOAD_STEP);
    setAnimatedStartIndex(prevCount);
    setVisibleCount(newCount);
    setTimeout(() => setAnimatedStartIndex(null), 600);
  };

  const filteredListings = listings.filter((item) => {
    const matchesLocation = filters.location === "Any location" || item.location === filters.location;
    const matchesRooms =
      filters.rooms === "Any" ||
      (filters.rooms === "1 room" && item.rooms === "1 room") ||
      (filters.rooms === "2 rooms" && item.rooms === "2 rooms") ||
      (filters.rooms === "3+ rooms" && (item.rooms === "3 rooms" || item.rooms === "4 rooms"));
    const matchesType = filters.type === "Any type" || item.type === filters.type;
    const matchesPrice =
      filters.price === "Any price" ||
      (filters.price === "Under UGX 300,000" && item.amount < 300000) ||
      (filters.price === "UGX 300,000 - 500,000" && item.amount >= 300000 && item.amount <= 500000) ||
      (filters.price === "Above UGX 500,000" && item.amount > 500000);

    return matchesLocation && matchesRooms && matchesType && matchesPrice;
  });

  const visibleListings = filteredListings.slice(0, visibleCount);
  const isShowingAll = visibleCount >= filteredListings.length;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <nav className="sticky top-0 z-40 border-b border-[var(--border-color)] bg-[var(--surface-strong)] px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-wide text-[var(--foreground)]">4Rent</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-[var(--foreground)]">
            <a
              href="tel:+256700000000"
              className="flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-emerald-500 hover:text-emerald-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.87.33 1.72.63 2.54l-1.2 1.2a15.9 15.9 0 0 0 6.28 6.28l1.2-1.2c.82.3 1.67.51 2.54.63A2 2 0 0 1 22 16.92Z" />
              </svg>
              <span className="hidden sm:inline">+256 700 000 000</span>
            </a>

            <a
              href="https://wa.me/256700000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-emerald-500 hover:text-emerald-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.149-.67.149-.198.297-.768.967-.941 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.199-.297.299-.495.1-.198.05-.372-.025-.521-.075-.149-.67-1.612-.92-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.521.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.49 1.694.625.712.227 1.36.195 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.174-1.413-.074-.124-.272-.198-.57-.347Z" />
              </svg>
              <span className="hidden sm:inline">+256 700 111 111</span>
            </a>

            <ThemeToggle theme={theme} setTheme={setTheme} />

            <a
              href="/login"
              className="rounded-full bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div ref={listingsRef} className="scroll-mt-24">
            <DesktopView
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              visibleCount={visibleCount}
              visibleListings={visibleListings}
              filteredListings={filteredListings}
              setVisibleCount={setVisibleCount}
              isShowingAll={isShowingAll}
              filters={filters}
              setFilters={(nextFilters) => {
                setFilters(nextFilters);
                setVisibleCount(INITIAL_VISIBLE_COUNT);
              }}
              onShowLess={handleShowLess}
              onShowMore={handleShowMore}
              animatedStartIndex={animatedStartIndex}
              isCollapsing={isCollapsing}
            />
            <MobileView
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              visibleCount={visibleCount}
              visibleListings={visibleListings}
              filteredListings={filteredListings}
              setVisibleCount={setVisibleCount}
              isShowingAll={isShowingAll}
              filters={filters}
              setFilters={(nextFilters) => {
                setFilters(nextFilters);
                setVisibleCount(INITIAL_VISIBLE_COUNT);
              }}
              onShowLess={handleShowLess}
              onShowMore={handleShowMore}
              animatedStartIndex={animatedStartIndex}
              isCollapsing={isCollapsing}
            />
          </div>
        )}
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
              <li><a href="#" className="transition hover:text-emerald-600">About us</a></li>
              <li><a href="#" className="transition hover:text-emerald-600">Contact</a></li>
              <li><a href="#" className="transition hover:text-emerald-600">Privacy policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Reach us</h3>
            <ul className="mt-2 space-y-2">
              <li>+256 700 000 000</li>
              <li>support@4rent.co.ug</li>
              <li>Kampala, Uganda</li>
            </ul>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="float fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
