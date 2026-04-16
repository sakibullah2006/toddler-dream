"use client";

import Image from "next/image";

type ResultDisplayProps = {
  imageUrl: string;
  onReset: () => void;
};

export function ResultDisplay({ imageUrl, onReset }: ResultDisplayProps) {
  return (
    <div className="w-full space-y-4">
      <div className="overflow-hidden rounded-3xl border border-[#ea9ab2] bg-white p-2 shadow-[0_16px_42px_rgba(226,115,150,0.25)]">
        <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl" style={{ aspectRatio: "1/1" }}>
          <Image
            src={imageUrl}
            alt="Generated baby portrait"
            fill
            sizes="(max-width: 640px) 92vw, 512px"
            unoptimized
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={imageUrl}
          download="baby-portrait.png"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#e27396] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#cf5f83] sm:w-auto"
        >
          Download Portrait
        </a>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex w-full items-center justify-center rounded-full border border-[#ea9ab2] bg-white px-6 py-3 text-sm font-semibold text-[#7d4c61] transition hover:bg-[#efcfe3]/30 sm:w-auto"
        >
          Create Another
        </button>
      </div>
    </div>
  );
}
