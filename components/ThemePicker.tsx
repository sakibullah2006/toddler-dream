"use client";

import { type PortraitTheme, THEMES } from "../lib/themes";

type ThemePickerProps = {
  selectedTheme: PortraitTheme | null;
  onSelectTheme: (theme: PortraitTheme) => void;
};

export function ThemePicker({ selectedTheme, onSelectTheme }: ThemePickerProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {THEMES.map((theme) => {
        const isSelected = selectedTheme?.id === theme.id;

        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => onSelectTheme(theme)}
            className={`rounded-[1.25rem] border p-4 text-left transition-transform hover:-translate-y-0.5 ${
              isSelected
                ? "border-[#e27396] ring-2 ring-[#ea9ab2]/60"
                : "border-[#efcfe3] hover:border-[#ea9ab2]"
            }`}
            style={{ backgroundColor: isSelected ? "#fff6fa" : `${theme.color}66` }}
          >
            <p className="text-xl">{theme.emoji}</p>
            <h3 className="mt-1 text-base font-semibold text-[#4b2d3a]">{theme.name}</h3>
            <p className="mt-1 text-sm text-[#6e4e5c]">{theme.description}</p>
          </button>
        );
      })}
    </div>
  );
}
