"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { listings } from "../lib/listings";

const heroImages = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
];

const INITIAL_VISIBLE_COUNT = 12;
const LOAD_STEP = 12;

function DesktopView({
  activeImage,
  setActiveImage,
  visibleCount,
  visibleListings,
  filteredListings,
  setVisibleCount,
  isShowingAll,
  filters,
  setFilters,
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
}) {
  return (
    <div className="hidden lg:block">
      <section className="w-full rounded-[2rem] border border-slate-200 bg-white p-4 shadow-lg sm:p-6">
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

        <form className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-3 shadow-inner lg:grid-cols-4">
          <label className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-3 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Location</span>
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
            {visibleListings.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
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
              onClick={() => setVisibleCount((prev) => Math.min(filteredListings.length, prev + LOAD_STEP))}
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Show more
            </button>
          </div>
        ) : (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount(INITIAL_VISIBLE_COUNT)}
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
            ["“I found a beautiful room within a day and the process felt effortless.”", "— Amina, Nairobi"],
            ["“The search filters helped me narrow down options quickly.”", "— Daniel, Kisumu"],
            ["“Amazing support and very clear property details.”", "— Grace, Mombasa"],
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
              onClick={() => setVisibleCount(INITIAL_VISIBLE_COUNT)}
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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

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
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-wide text-slate-900">4Rent</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="tel:+256700000000"
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
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
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
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
        />
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
              <li>support@4rent.co.ke</li>
              <li>Kampala, Uganda</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
