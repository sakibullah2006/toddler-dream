"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ImageUploader } from "../../components/ImageUploader";
import { ThemePicker } from "../../components/ThemePicker";
import { type PortraitTheme } from "../../lib/themes";

const PROGRESS_STAGES = [
  { progress: 12, label: "Uploading image...", delay: 0 },
  { progress: 35, label: "Analyzing facial features...", delay: 900 },
  { progress: 62, label: "Applying theme...", delay: 3000 },
  { progress: 85, label: "Rendering portrait...", delay: 7000 },
  { progress: 93, label: "Finalizing details...", delay: 14000 },
];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [theme, setTheme] = useState<PortraitTheme | null>(null);
  const [resultUrl, setResultUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");

  const previewUrl = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!loading) return;

    const timers = PROGRESS_STAGES.map(({ progress, label, delay }) =>
      setTimeout(() => {
        setProgress(progress);
        setProgressLabel(label);
      }, delay),
    );

    return () => timers.forEach(clearTimeout);
  }, [loading]);

  async function handleGenerate() {
    if (!file || !theme) {
      setError("Upload a photo and select a theme first.");
      return;
    }

    setLoading(true);
    setError("");
    setResultUrl("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("themeId", theme.id);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { imageUrl?: string; error?: string };

      if (!response.ok || !data.imageUrl) {
        throw new Error(data.error ?? "Generation failed. Please try again.");
      }

      setProgress(100);
      setProgressLabel("Complete!");

      setTimeout(() => {
        setResultUrl(data.imageUrl!);
        setLoading(false);
      }, 500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Generation failed.";
      setError(message);
      setLoading(false);
    }
  }

  function resetFlow() {
    setFile(null);
    setTheme(null);
    setResultUrl("");
    setError("");
    setProgress(0);
    setProgressLabel("");
  }

  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div className="flex min-h-screen flex-col bg-[#fef7f2]">
      {/* Navbar */}
      <header className="border-b border-[#fde0cc] bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <span className="text-xl font-bold tracking-tight text-[#c44800]">BabySnap</span>
            <span className="ml-2 text-sm text-[#b07a5a]">Portrait Studio</span>
          </div>
          {resultUrl && (
            <button
              type="button"
              onClick={resetFlow}
              className="rounded-lg border border-[#fde0cc] bg-[#fff4ed] px-4 py-2 text-sm font-medium text-[#c44800] transition hover:bg-[#fde8d4]"
            >
              New Portrait
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-[#1c1008]">Baby Portrait Generator</h1>
          <p className="mt-2 text-[#8a6450]">Upload a photo, pick a theme, and create a magical portrait in seconds</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {/* Left panel — inputs */}
          <div className="space-y-5">
            <section className="rounded-2xl border border-[#fde0cc] bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#b07a5a]">Upload Photo</h2>
              <ImageUploader
                file={file}
                previewUrl={previewUrl}
                onFileSelected={(f) => {
                  setFile(f);
                  setResultUrl("");
                  setError("");
                }}
              />
            </section>

            <section className="rounded-2xl border border-[#fde0cc] bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#b07a5a]">Select Theme</h2>
              <ThemePicker selectedTheme={theme} onSelectTheme={setTheme} />
            </section>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!file || !theme || loading}
              className="w-full rounded-xl bg-[#f87c3c] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#f87c3c]/25 transition hover:bg-[#e05a10] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Generating..." : "Generate Portrait"}
            </button>
          </div>

          {/* Right panel — output */}
          <div className="min-h-[460px] rounded-2xl border border-[#fde0cc] bg-white shadow-sm">
            {loading ? (
              <div className="flex h-full min-h-[460px] flex-col items-center justify-center gap-6 p-10">
                <div className="relative h-28 w-28">
                  <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fcb896" />
                        <stop offset="100%" stopColor="#f87c3c" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#fde8d4" strokeWidth="7" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#ring-grad)"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      style={{ transition: "stroke-dashoffset 0.9s ease" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-[#c44800]">{progress}%</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-semibold text-[#1c1008]">{progressLabel}</p>
                  <p className="mt-1 text-sm text-[#b07a5a]">Usually takes 20–60 seconds</p>
                </div>

                <div className="h-1.5 w-56 overflow-hidden rounded-full bg-[#fde8d4]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#fcb896] to-[#f87c3c]"
                    style={{ width: `${progress}%`, transition: "width 0.9s ease" }}
                  />
                </div>
              </div>
            ) : resultUrl ? (
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-[#b07a5a]">Your Portrait</h2>
                  <span className="rounded-full bg-[#fff4ed] px-2.5 py-1 text-xs font-semibold text-[#c44800]">
                    Ready
                  </span>
                </div>
                <div className="relative w-full overflow-hidden rounded-xl border border-[#fde0cc]" style={{ aspectRatio: "1/1" }}>
                  <Image
                    src={resultUrl}
                    alt="Generated baby portrait"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 92vw, 600px"
                    className="object-contain"
                  />
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href={resultUrl}
                    download="baby-portrait.png"
                    className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#f87c3c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e05a10]"
                  >
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={() => { setTheme(null); setResultUrl(""); }}
                    className="flex-1 inline-flex items-center justify-center rounded-xl border border-[#fde0cc] bg-[#fff4ed] px-4 py-2.5 text-sm font-medium text-[#c44800] transition hover:bg-[#fde8d4]"
                  >
                    Try Another Theme
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[460px] flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff4ed] text-3xl">
                  🖼️
                </div>
                <div>
                  <p className="font-semibold text-[#8a6450]">Your portrait will appear here</p>
                  <p className="mt-1 text-sm text-[#c4a090]">Upload a photo and select a theme to begin</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-[#fde0cc] py-6 text-center text-xs text-[#c4a090]">
        BabySnap · AI-powered baby portrait generation
      </footer>
    </div>
  );
}
