"use client";

import { type PortraitTheme, THEMES } from "../lib/themes";

type ThemePickerProps = {
  selectedTheme: PortraitTheme | null;
  onSelectTheme: (theme: PortraitTheme) => void;
};

export function ThemePicker({ selectedTheme, onSelectTheme }: ThemePickerProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {THEMES.map((theme) => {
        const isSelected = selectedTheme?.id === theme.id;
        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => onSelectTheme(theme)}
            className={`rounded-xl border p-4 text-left transition-all ${
              isSelected
                ? "border-[#f87c3c] bg-[#fff4ed] ring-2 ring-[#f87c3c]/20"
                : "border-[#fde0cc] bg-[#fef7f2] hover:border-[#fcb896] hover:bg-[#fff4ed]"
            }`}
          >
            <p className="text-xl">{theme.emoji}</p>
            <p className={`mt-2 text-sm font-semibold ${isSelected ? "text-[#c44800]" : "text-[#3d1f0a]"}`}>
              {theme.name}
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-[#b07a5a]">{theme.description}</p>
          </button>
        );
      })}
    </div>
  );
}
