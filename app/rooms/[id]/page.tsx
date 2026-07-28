import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "../../../components/SiteShell";
import { listings } from "../../../lib/listings";
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
        <div className="grid gap-4 p-3 sm:p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div>
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

          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-600 sm:text-sm">Book this room</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">Ready to see it in person?</h2>
            <p className="mt-2 text-sm text-slate-600">{room.availability}. Reach out to arrange a viewing and get the latest details.</p>
            <div className="mt-4 space-y-2 rounded-[1rem] border border-slate-200 bg-white p-3 sm:mt-5 sm:space-y-3 sm:p-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs">Contact</p>
                <p className="mt-1 font-semibold text-slate-900">{room.contact}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs">Posted</p>
                <p className="mt-1 font-semibold text-slate-900">{room.posted}</p>
              </div>
            </div>
            <a href={`tel:${room.contact}`} className="mt-4 flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:mt-5">
              Call to book
            </a>
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
