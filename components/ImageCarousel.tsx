"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageCarousel({ images }: { images: string[] | undefined }) {
  const imgs = images ?? [];
  const [active, setActive] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }
      if (event.key === "ArrowRight") {
        setActive((prev) => (prev + 1) % imgs.length);
      }
      if (event.key === "ArrowLeft") {
        setActive((prev) => (prev - 1 + imgs.length) % imgs.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imgs.length, isFullscreen]);

  if (imgs.length === 0) return null;

  const showPrevious = () => setActive((a) => (a - 1 + imgs.length) % imgs.length);
  const showNext = () => setActive((a) => (a + 1) % imgs.length);

  return (
    <>
      <div className="min-w-0">
        <div className="relative overflow-hidden rounded-[1.25rem]">
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="block w-full overflow-hidden rounded-[1.25rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            aria-label="View image in full screen"
          >
            <Image
              src={imgs[active]}
              alt={`Image ${active + 1}`}
              width={1200}
              height={800}
              className="h-56 w-full cursor-zoom-in rounded-[1.25rem] object-cover transition-transform duration-200 hover:scale-[1.01] sm:h-72"
            />
          </button>

          {imgs.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-xl shadow-sm backdrop-blur-sm transition hover:bg-white"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-xl shadow-sm backdrop-blur-sm transition hover:bg-white"
              >
                ›
              </button>
            </>
          )}
        </div>

        {imgs.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {imgs.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className={`h-14 w-20 flex-none overflow-hidden rounded-lg border ${i === active ? "border-emerald-600 ring-2 ring-emerald-200" : "border-slate-200"}`}
              >
                <Image src={src} alt={`Thumb ${i + 1}`} width={80} height={56} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm" onClick={() => setIsFullscreen(false)}>
          <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              aria-label="Close fullscreen view"
              onClick={() => setIsFullscreen(false)}
              className="absolute -right-2 -top-12 rounded-full bg-white/10 px-3 py-2 text-lg text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              ✕
            </button>

            {imgs.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={showPrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-2xl text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={showNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-2xl text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  ›
                </button>
              </>
            )}

            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-2xl">
              <Image
                src={imgs[active]}
                alt={`Image ${active + 1} full screen`}
                width={1600}
                height={1200}
                className="max-h-[85vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
