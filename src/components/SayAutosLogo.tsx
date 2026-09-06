import React from 'react';

interface SayAutosLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showFraming?: boolean;
  variant?: 'metallic' | 'monochrome' | 'gold';
  layout?: 'stacked' | 'horizontal';
}

export const SayAutosLogo: React.FC<SayAutosLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  showFraming = false,
  variant = 'metallic',
  layout = 'stacked'
}) => {
  const dimensions = {
    sm: {
      svgW: 130,
      svgH: 48,
      carW: 76,
      carH: 26,
      titleSize: 'text-[9.5px]',
      subSize: 'text-[5.5px]',
      trackingTitle: 'tracking-[0.24em]',
      trackingSub: 'tracking-[0.38em]'
    },
    md: {
      svgW: 190,
      svgH: 70,
      carW: 110,
      carH: 38,
      titleSize: 'text-[12px]',
      subSize: 'text-[7px]',
      trackingTitle: 'tracking-[0.26em]',
      trackingSub: 'tracking-[0.42em]'
    },
    lg: {
      svgW: 260,
      svgH: 95,
      carW: 160,
      carH: 54,
      titleSize: 'text-[15.5px]',
      subSize: 'text-[9px]',
      trackingTitle: 'tracking-[0.28em]',
      trackingSub: 'tracking-[0.45em]'
    },
    xl: {
      svgW: 360,
      svgH: 130,
      carW: 230,
      carH: 78,
      titleSize: 'text-[21px]',
      subSize: 'text-[11.5px]',
      trackingTitle: 'tracking-[0.3em]',
      trackingSub: 'tracking-[0.48em]'
    }
  }[size];

  return (
    <div
      className={`inline-flex ${
        layout === 'horizontal' ? 'flex-row items-center gap-3.5 text-left' : 'flex-col items-center justify-center text-center'
      } select-none group ${className}`}
      id="say-autos-official-logo"
    >
      {/* Exact Car Silhouette SVG matching official brand photo */}
      <svg
        width={dimensions.carW}
        height={dimensions.carH}
        viewBox="0 0 340 105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_10px_rgba(223,182,146,0.3)] transition-transform duration-300 group-hover:scale-[1.03] shrink-0"
        aria-label="SAY Autos Bogotá - Logo Oficial"
      >
        <defs>
          {/* Metallic Rose Gold Linear Gradient */}
          <linearGradient id="logoRoseGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7e4d3" />
            <stop offset="25%" stopColor="#e8c2a3" />
            <stop offset="50%" stopColor="#dfb692" />
            <stop offset="75%" stopColor="#c5926b" />
            <stop offset="100%" stopColor="#a36e47" />
          </linearGradient>

          {/* Horizontal Metallic Sheen */}
          <linearGradient id="logoSheenHoriz" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#b37c54" />
            <stop offset="20%" stopColor="#dfb692" />
            <stop offset="45%" stopColor="#faece0" />
            <stop offset="65%" stopColor="#dfb692" />
            <stop offset="85%" stopColor="#c5926b" />
            <stop offset="100%" stopColor="#96613d" />
          </linearGradient>

          {/* Dark Navy Background Match for Inset Negative Space */}
          <linearGradient id="logoDarkCut" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#071220" />
            <stop offset="100%" stopColor="#040913" />
          </linearGradient>

          {/* Drop shadow for 3D embossed look */}
          <filter id="logoEmboss" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        <g filter="url(#logoEmboss)">
          {/* Top Geometric Art Deco Frame Accent Lines (From Official Visual Card) */}
          {showFraming && (
            <>
              <path
                d="M 15 14 L 75 14 L 96 4 L 244 4 L 265 14 L 325 14"
                stroke="url(#logoSheenHoriz)"
                strokeWidth="1.2"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M 30 19 L 80 19 L 98 10 L 242 10 L 260 19 L 310 19"
                stroke="url(#logoSheenHoriz)"
                strokeWidth="0.8"
                fill="none"
                opacity="0.4"
              />
            </>
          )}

          {/* ============================================================ */}
          {/* 1. MAIN CAR BODY PROFILE (Sweeping sports coupe silhouette)  */}
          {/* ============================================================ */}
          <path
            d="
              M 34 86
              C 26 84 21 78 19 72
              C 17 66 22 63 28 61
              C 38 59 50 58 64 57
              C 80 56 96 54 110 50
              C 120 46 134 36 154 30
              C 172 25 196 24 220 28
              C 240 32 260 41 276 50
              C 286 55 296 58 308 56
              C 312 55 313 58 310 61
              C 304 67 294 68 286 68
              C 292 72 298 78 300 85
              C 302 90 298 91 290 91
              C 282 91 276 90 272 86
              C 266 78 256 72 244 72
              C 232 72 222 78 216 86
              C 214 89 210 91 202 91
              L 126 91
              C 120 91 116 89 114 85
              C 108 76 98 70 86 70
              C 74 70 64 76 58 85
              C 56 89 50 91 42 91
              C 37 91 35 88 34 86 Z
            "
            fill="url(#logoRoseGold)"
          />

          {/* ============================================================ */}
          {/* 2. NEGATIVE SPACE CUTOUTS (Navy blue showing through panels) */}
          {/* ============================================================ */}

          {/* Front Headlight / Nose Intake Slit */}
          <path
            d="M 25 65 C 31 63 39 63 45 65 C 37 69 30 70 23 69 Z"
            fill="url(#logoDarkCut)"
          />

          {/* Front Fender Flare Eyebrow Cutout */}
          <path
            d="
              M 34 76
              C 40 68 52 62 68 61
              C 84 60 98 66 106 73
              C 102 71 90 65 72 65
              C 54 65 42 70 34 76 Z
            "
            fill="url(#logoDarkCut)"
          />

          {/* Front Windshield & Driver Side Window Opening */}
          <path
            d="
              M 120 50
              C 128 44 140 37 158 33
              C 174 30 190 30 202 32
              L 198 51
              C 174 52 144 52 120 50 Z
            "
            fill="url(#logoDarkCut)"
          />

          {/* B-Pillar Slanted Rib (Separates Driver and Quarter Glass) */}
          <path
            d="M 201 32 L 207 33 L 203 51 L 197 51 Z"
            fill="url(#logoRoseGold)"
          />

          {/* Rear Triangular Quarter Glass Window */}
          <path
            d="
              M 209 33
              C 222 35 238 41 252 48
              C 240 50 226 51 205 51
              L 209 33 Z
            "
            fill="url(#logoDarkCut)"
          />

          {/* Aerodynamic Side Mirror */}
          <path
            d="
              M 134 46
              C 136 44 144 44 148 46
              C 150 48 146 51 138 51
              C 132 51 132 48 134 46 Z
            "
            fill="url(#logoRoseGold)"
          />
          <rect x="138" y="50" width="2" height="2.5" fill="url(#logoRoseGold)" />

          {/* Sculpted Waistline & Dynamic Haunch Crescent Intake */}
          <path
            d="
              M 126 58
              C 150 58 178 59 204 59
              C 230 59 256 55 276 53
              C 286 52 294 54 300 56
              C 294 57 282 58 272 59
              C 250 62 226 64 204 63
              C 176 63 148 62 126 58 Z
            "
            fill="url(#logoDarkCut)"
          />

          {/* Rear Haunch Muscular Scoop */}
          <path
            d="
              M 229 64
              C 249 63 269 64 286 68
              C 279 74 264 76 246 75
              C 236 74 230 70 229 64 Z
            "
            fill="url(#logoDarkCut)"
          />

          {/* Lower Rocker Panel Aerodynamic Blade / Wedge */}
          <path
            d="
              M 130 82
              L 166 82
              C 154 86 138 87 130 87
              Z
            "
            fill="url(#logoDarkCut)"
          />

          {/* ============================================================ */}
          {/* 3. WHEEL HUBS / AXLE RINGS (Centered in Wheel Well Cutouts) */}
          {/* ============================================================ */}
          {/* Front Wheel Hub Ring */}
          <circle cx="86" cy="85" r="4.8" fill="url(#logoRoseGold)" />
          <circle cx="86" cy="85" r="2.2" fill="url(#logoDarkCut)" />

          {/* Rear Wheel Hub Ring */}
          <circle cx="244" cy="85" r="4.8" fill="url(#logoRoseGold)" />
          <circle cx="244" cy="85" r="2.2" fill="url(#logoDarkCut)" />
        </g>
      </svg>

      {/* ============================================================ */}
      {/* 4. OFFICIAL BRAND TYPOGRAPHY (Matching Exact Photo)         */}
      {/* ============================================================ */}
      <div className={`flex flex-col ${layout === 'horizontal' ? 'items-start' : 'items-center'} mt-1`}>
        {/* Line 1: SAY_AUTOSBOGOTA */}
        <span
          className={`font-semibold uppercase tracking-[0.24em] bg-gradient-to-r from-[#f7e4d3] via-[#dfb692] to-[#c5926b] bg-clip-text text-transparent font-['Plus_Jakarta_Sans',sans-serif] ${dimensions.titleSize}`}
        >
          SAY_AUTOSBOGOTA
        </span>

        {/* Line 2: BOGOTA - COLOMBIA */}
        {showSubtitle && (
          <span
            className={`font-normal uppercase tracking-[0.38em] text-[#dfb692]/80 font-['Plus_Jakarta_Sans',sans-serif] ${dimensions.subSize} -mt-0.5`}
          >
            BOGOTA - COLOMBIA
          </span>
        )}
      </div>
    </div>
  );
};
