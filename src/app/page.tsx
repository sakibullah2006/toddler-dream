"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { GeneratingLoader } from "../../components/GeneratingLoader";
import { ImageUploader } from "../../components/ImageUploader";
import { ResultDisplay } from "../../components/ResultDisplay";
import { ThemePicker } from "../../components/ThemePicker";
import { type PortraitTheme } from "../../lib/themes";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [theme, setTheme] = useState<PortraitTheme | null>(null);
  const [resultUrl, setResultUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const currentStep = useMemo(() => {
    if (resultUrl) {
      return 3;
    }
    if (theme) {
      return 2;
    }
    return 1;
  }, [resultUrl, theme]);

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
  }

  return (
    <div className="flex min-h-screen flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <main className="mx-auto w-full max-w-6xl rounded-[2rem] border border-[#ea9ab2] bg-white/85 p-4 shadow-[0_24px_80px_rgba(151,121,138,0.26)] backdrop-blur sm:p-7 lg:p-8">
        <header className="mb-7 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e27396] sm:text-sm">Toddler Dream</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#4b2d3a] sm:text-4xl">
            Baby Portrait Generator
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#6e4e5c] sm:text-base">
            Upload your baby photo, pick a dreamy style, and generate a realistic portrait with your chosen aesthetic.
          </p>
        </header>

        <div className="mb-7 grid grid-cols-3 gap-2 rounded-2xl bg-[#efcfe3]/55 p-2 text-xs font-semibold sm:text-sm">
          {["Upload", "Theme", "Result"].map((label, index) => {
            const step = index + 1;
            const active = currentStep >= step;
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

        {!resultUrl ? (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <section className="space-y-4 rounded-[1.6rem] border border-[#efcfe3] bg-white/95 p-4 sm:p-5">
              <h2 className="text-lg font-semibold text-[#5f3a4c]">1. Upload Photo</h2>
              <ImageUploader
                file={file}
                onFileSelected={(selectedFile) => {
                  setFile(selectedFile);
                  setResultUrl("");
                }}
              />
              {previewUrl ? (
                <div className="overflow-hidden rounded-2xl border border-[#ea9ab2] bg-white p-2">
                  <Image
                    src={previewUrl}
                    alt="Uploaded baby preview"
                    width={1000}
                    height={1000}
                    unoptimized
                    className="h-72 w-full rounded-xl object-cover"
                  />
                </div>
              ) : null}
            </section>

            <section className="space-y-4 rounded-[1.6rem] border border-[#b3dee2] bg-[#f7fcfd] p-4 sm:p-5">
              <h2 className="text-lg font-semibold text-[#36555f]">2. Pick A Theme</h2>
              <ThemePicker selectedTheme={theme} onSelectTheme={setTheme} />

              <div className="rounded-2xl border border-[#eaf2d7] bg-[#eaf2d7]/45 p-4">
                <p className="text-sm font-semibold text-[#5c6a45]">Style Direction</p>
                <p className="mt-1 text-sm text-[#697658]">
                  Expect natural skin texture, realistic lighting, and portrait framing inspired by premium newborn
                  studio photography.
                </p>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={!file || !theme || loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#e27396] to-[#ea9ab2] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#e27396]/35 transition hover:from-[#d56086] hover:to-[#d986a3] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Generating portrait..." : "Generate"}
              </button>

              {error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              ) : null}

              {loading ? <GeneratingLoader /> : null}
            </section>
          </div>
        ) : (
          <section className="mx-auto max-w-3xl space-y-4">
            <h2 className="text-center text-lg font-semibold text-[#5f3a4c]">3. Your Portrait Is Ready</h2>
            <ResultDisplay imageUrl={resultUrl} onReset={resetFlow} />
          </section>
        )}
      </main>
    </div>
  );
}
