import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "../../../components/SiteShell";
import { listings, SITE_CONTACT, formatPhoneForLink } from "../../../lib/listings";
import ImageCarousel from "../../../components/ImageCarousel";

type RoomDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return listings.map((item) => ({ id: String(item.id) }));
}

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { id } = await params;
  const room = listings.find((item) => item.id === Number(id));

  if (!room) {
    notFound();
  }

  const relatedRooms = listings.filter((item) => item.id !== room.id).slice(0, 3);

  return (
    <SiteShell>
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid min-w-0 gap-4 p-3 sm:p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div className="min-w-0">
            <ImageCarousel images={room.images} />
            <div className="mt-3 flex items-start justify-between gap-3 sm:mt-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-600 sm:text-sm">Featured room</p>
                <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">{room.title}</h1>
                <p className="mt-1 text-sm text-slate-600">{room.location} • {room.rooms} • {room.type}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{room.price}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4">{room.description}</p>
            <div className="mt-4 grid gap-2 sm:mt-5 sm:grid-cols-2 sm:gap-3">
              {[
                ["Size", room.size],
                ["Bathrooms", room.bathrooms],
                ["Furnishing", room.furnished],
                ["Deposit", room.deposit],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-600 sm:text-sm">Book this room</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">Ready to see it in person?</h2>
            <p className="mt-2 text-sm text-slate-600">{room.availability}. Reach out to arrange a viewing and get the latest details.</p>

            <div className="mt-4 space-y-3">
              <a href={`https://wa.me/${formatPhoneForLink(SITE_CONTACT.whatsapp)}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-[1rem] border border-emerald-200 bg-emerald-50 p-3 text-left transition hover:border-emerald-400 hover:bg-emerald-100">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.149-.67.149-.198.297-.768.967-.941 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.199-.297.299-.495.1-.198.05-.372-.025-.521-.075-.149-.67-1.612-.92-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.521.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.49 1.694.625.712.227 1.36.195 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.174-1.413-.074-.124-.272-.198-.57-.347Z"/>
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs">WhatsApp</span>
                  <span className="mt-1 block truncate font-semibold text-slate-900">{SITE_CONTACT.whatsapp}</span>
                </span>
              </a>

              <a href={`tel:${formatPhoneForLink(SITE_CONTACT.call)}`} className="flex items-center gap-3 rounded-[1rem] border border-slate-200 bg-white p-3 text-left transition hover:border-slate-300 hover:bg-slate-100">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.87.33 1.72.63 2.54l-1.2 1.2a15.9 15.9 0 0 0 6.28 6.28l1.2-1.2c.82.3 1.67.51 2.54.63A2 2 0 0 1 22 16.92Z"/>
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs">Call</span>
                  <span className="mt-1 block truncate font-semibold text-slate-900">{SITE_CONTACT.call}</span>
                </span>
              </a>

              <div className="rounded-[1rem] border border-slate-200 bg-white p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs">Email</p>
                <p className="mt-1 font-semibold text-slate-900">{SITE_CONTACT.email}</p>
              </div>

              <div className="rounded-[1rem] border border-slate-200 bg-white p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs">Posted</p>
                <p className="mt-1 font-semibold text-slate-900">{room.posted}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Recommended</p>
            <h2 className="text-2xl font-semibold text-slate-900">Similar rooms you may like</h2>
          </div>
          <Link href="/" className="text-sm font-semibold text-emerald-700">Back home</Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {relatedRooms.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm">
              <Link href={`/rooms/${item.id}`} className="block">
                <Image src={item.image} alt={item.title} width={800} height={500} className="h-36 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.location}</p>
                  <p className="mt-3 text-sm font-semibold text-slate-900">{item.price}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
