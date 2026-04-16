"use client";

import { useEffect, useMemo, useState } from "react";
import { GeneratingLoader } from "../../components/GeneratingLoader";
import { ImageUploader } from "../../components/ImageUploader";
import { ResultDisplay } from "../../components/ResultDisplay";
import { ThemePicker } from "../../components/ThemePicker";
import { type PortraitTheme } from "../../lib/themes";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [theme, setTheme] = useState<PortraitTheme | null>(null);
  const [resultUrl, setResultUrl] = useState<string>("");
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const previewUrl = useMemo(() => {
    if (!file) {
      return "";
    }
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  async function handleGenerate() {
    if (!file || !theme) {
      setError("Please upload a photo and select a theme first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("prompt", theme.prompt);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { imageUrl?: string; error?: string };

      if (!response.ok || !data.imageUrl) {
        throw new Error(data.error ?? "Generation failed. Please try again.");
      }

      setResultUrl(data.imageUrl);
      setActiveStep(3);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Generation failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function resetFlow() {
    setFile(null);
    setTheme(null);
    setResultUrl("");
    setError("");
    setActiveStep(1);
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-[#ea9ab2]/40 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e27396]">Toddler Dream</p>
            <p className="text-sm font-semibold text-[#4b2d3a]">Baby Portrait Studio</p>
          </div>
          <nav className="flex items-center gap-2 text-sm font-medium">
            <a href="#generator" className="rounded-full px-4 py-2 text-[#6e4e5c] transition hover:bg-[#efcfe3]/55">
              Generator
            </a>
            <a href="#themes" className="rounded-full px-4 py-2 text-[#5b6770] transition hover:bg-[#b3dee2]/35">
              Themes
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <section className="pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e27396]">Realistic AI generation</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#4b2d3a] sm:text-5xl">
            Step-by-step baby portrait generation
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[#6e4e5c] sm:text-base">
            Upload one image, pick a theme, and generate a photoreal portrait while preserving face, posture, and natural details.
          </p>
        </section>

        <section id="generator" className="border-t border-[#ea9ab2]/45 pt-8">
          <div className="mb-6 grid grid-cols-3 gap-2 rounded-xl bg-[#efcfe3]/45 p-2 text-xs font-semibold sm:max-w-md sm:text-sm">
            {["Upload", "Theme", "Result"].map((label, index) => {
              const step = (index + 1) as 1 | 2 | 3;
              const active = activeStep >= step;
              return (
                <div
                  key={label}
                  className={`rounded-xl px-3 py-2 text-center transition ${
                    active ? "bg-white text-[#6e4e5c] shadow-sm" : "text-[#9b7a89]"
                  }`}
                >
                  {step}. {label}
                </div>
              );
            })}
          </div>

          {activeStep === 1 ? (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#5f3a4c]">Step 1: Upload Photo</h2>
              <ImageUploader
                file={file}
                previewUrl={previewUrl}
                onFileSelected={(selectedFile) => {
                  setFile(selectedFile);
                  setResultUrl("");
                }}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={!file}
                  onClick={() => {
                    setError("");
                    setActiveStep(2);
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-[#e27396] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#cf5f83] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue to Themes
                </button>
              </div>
            </section>
          ) : null}

          {activeStep === 2 ? (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#36555f]">Step 2: Pick A Theme</h2>
              <div id="themes">
                <ThemePicker selectedTheme={theme} onSelectTheme={setTheme} />
              </div>

              <div className="rounded-2xl border border-[#eaf2d7] bg-[#eaf2d7]/45 p-4">
                <p className="text-sm font-semibold text-[#5c6a45]">Generation Goal</p>
                <p className="mt-1 text-sm text-[#697658]">
                  Keep face, hair, posture, and body proportions from the original image while applying the selected
                  outfit, background, and mood.
                </p>
              </div>

              {error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              ) : null}

              {loading ? <GeneratingLoader /> : null}

              <div className="flex flex-wrap justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="inline-flex items-center justify-center rounded-full border border-[#ea9ab2] bg-white px-5 py-2.5 text-sm font-semibold text-[#7d4c61] transition hover:bg-[#efcfe3]/30"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!file || !theme || loading}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#e27396] to-[#ea9ab2] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#e27396]/35 transition hover:from-[#d56086] hover:to-[#d986a3] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Generating portrait..." : "Generate"}
                </button>
              </div>
            </section>
          ) : null}

          {activeStep === 3 && resultUrl ? (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#5f3a4c]">Step 3: Your Portrait Is Ready</h2>
              <ResultDisplay imageUrl={resultUrl} onReset={resetFlow} />
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="inline-flex items-center justify-center rounded-full border border-[#ea9ab2] bg-white px-5 py-2.5 text-sm font-semibold text-[#7d4c61] transition hover:bg-[#efcfe3]/30"
                >
                  Try Another Theme With Same Photo
                </button>
              </div>
            </section>
          ) : null}
        </section>

        <footer className="mt-12 border-t border-[#ea9ab2]/35 pt-5 text-xs text-[#7c6270]">
          <p>Toddler Dream • Designed for realistic themed newborn portraits.</p>
        </footer>
      </main>
    </div>
  );
}
