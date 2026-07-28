"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageCarousel({ images }: { images: string[] | undefined }) {
  const imgs = images ?? [];
  const [active, setActive] = useState(0);

  if (imgs.length === 0) return null;

  return (
    <div>
      <div className="relative">
        <Image src={imgs[active]} alt={`Image ${active + 1}`} width={1200} height={800} className="h-56 w-full rounded-[1.25rem] object-cover sm:h-72" />

        {imgs.length > 1 && (
          <>
            <button
              aria-label="Previous"
              onClick={() => setActive((a) => (a - 1 + imgs.length) % imgs.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => setActive((a) => (a + 1) % imgs.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm"
            >
              ›
            </button>
          </>
        )}
      </div>

      {imgs.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-auto">
          {imgs.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`h-14 w-20 flex-none overflow-hidden rounded-lg border ${i === active ? "border-emerald-600" : "border-slate-200"}`}
            >
              <Image src={src} alt={`Thumb ${i + 1}`} width={80} height={56} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
