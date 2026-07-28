import Image from "next/image";
import Link from "next/link";
import SiteShell from "../../components/SiteShell";
import { listings } from "../../lib/listings";

export default function RoomsPage() {
  return (
    <SiteShell>
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">All rooms</p>
            <h1 className="text-3xl font-semibold text-slate-900">Explore every available room</h1>
          </div>
          <p className="text-sm text-slate-600">Browse the full collection and choose a home that fits your budget.</p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {listings.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <Link href={`/rooms/${item.id}`} className="block">
                <Image src={item.image} alt={item.title} width={800} height={500} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-semibold text-slate-900">{item.title}</h2>
                      <p className="mt-1 text-sm text-slate-500">{item.location}</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{item.rooms}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                    <span>{item.posted}</span>
                    <span className="font-semibold text-slate-900">{item.price}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
