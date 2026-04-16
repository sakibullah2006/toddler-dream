"use client";

export function GeneratingLoader() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-[2rem] border border-[#ea9ab2] bg-white/90 p-8 text-center shadow-[0_14px_50px_rgba(226,115,150,0.2)]">
      <svg viewBox="0 0 240 180" className="h-44 w-56" role="img" aria-label="Generating baby portrait">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#efcfe3" />
            <stop offset="100%" stopColor="#b3dee2" />
          </linearGradient>
        </defs>

        <rect x="8" y="12" width="224" height="156" rx="24" fill="url(#sky)" />

        <g>
          <ellipse cx="88" cy="68" rx="28" ry="14" fill="#ffffff" opacity="0.85">
            <animate attributeName="cx" values="86;92;86" dur="2.6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="158" cy="54" rx="22" ry="11" fill="#ffffff" opacity="0.82">
            <animate attributeName="cx" values="160;154;160" dur="2.4s" repeatCount="indefinite" />
          </ellipse>
        </g>

        <g transform="translate(120 95)">
          <circle cx="0" cy="0" r="34" fill="#eaf2d7" />
          <circle cx="-12" cy="-4" r="3.4" fill="#4a3a40" />
          <circle cx="12" cy="-4" r="3.4" fill="#4a3a40" />
          <path d="M -10 10 Q 0 16 10 10" stroke="#4a3a40" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <ellipse cx="-18" cy="6" rx="5" ry="3" fill="#ea9ab2" opacity="0.65" />
          <ellipse cx="18" cy="6" rx="5" ry="3" fill="#ea9ab2" opacity="0.65" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="120 95;120 98;120 95"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </g>

        <g fill="#e27396">
          <circle cx="44" cy="36" r="3">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="197" cy="38" r="3">
            <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="32" cy="142" r="2.6">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="209" cy="142" r="2.6">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      <div>
        <p className="text-base font-semibold text-[#e27396]">Generating your portrait...</p>
        <p className="mt-1 text-sm text-[#7d5f6b]">Applying realistic lighting, skin texture, and theme styling.</p>
      </div>
    </div>
  );
}
