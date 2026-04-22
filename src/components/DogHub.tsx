"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Section = "collar" | "mouth" | "ears" | "nose" | "paws" | "tail" | "brain";

const HOTSPOTS: { key: Section; label: string; cx: number; cy: number; r: number }[] = [
  { key: "collar", label: "The Collar — Who we are", cx: 200, cy: 145, r: 22 },
  { key: "mouth", label: "The Mouth — How we sound", cx: 265, cy: 130, r: 20 },
  { key: "ears", label: "The Ears — How we listen", cx: 225, cy: 90, r: 18 },
  { key: "nose", label: "The Nose — Check your copy", cx: 290, cy: 125, r: 16 },
  { key: "paws", label: "The Paws — Channel playbook", cx: 165, cy: 220, r: 20 },
  { key: "tail", label: "The Tail — Test your instincts", cx: 55, cy: 105, r: 18 },
  { key: "brain", label: "The Brain — Teach your AI", cx: 240, cy: 85, r: 18 },
];

const HOTSPOT_COLORS: Record<Section, string> = {
  collar: "#C4944A",
  mouth: "#C45B4A",
  ears: "#7C9A72",
  nose: "#8B5E3C",
  paws: "#A0704C",
  tail: "#D4A59A",
  brain: "#7C9A72",
};

export default function DogHub({
  onSelect,
  activeSection,
}: {
  onSelect: (section: Section) => void;
  activeSection: Section | null;
}) {
  const [hovered, setHovered] = useState<Section | null>(null);

  return (
    <div className="relative inline-block mx-auto">
      <svg viewBox="0 0 340 270" className="w-[320px] sm:w-[420px]" fill="none">
        {/* === DOG BODY === */}
        {/* Tail — connected, shaggy */}
        <motion.path
          d="M 70 130 Q 45 95 55 65 Q 58 55 55 45"
          stroke="#A0704C" strokeWidth="7" strokeLinecap="round" fill="none"
          animate={{ d: ["M 70 130 Q 45 95 55 65 Q 58 55 55 45", "M 70 130 Q 38 88 60 58 Q 64 48 62 40", "M 70 130 Q 45 95 55 65 Q 58 55 55 45"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <path d="M 52 47 Q 48 40 56 38 Q 62 37 58 44" fill="#B8884A" />

        {/* Back legs */}
        <rect x="98" y="192" width="12" height="36" rx="6" fill="#A0704C" />
        <rect x="118" y="192" width="12" height="36" rx="6" fill="#96663C" />
        <ellipse cx="104" cy="230" rx="9" ry="5" fill="#96663C" />
        <ellipse cx="124" cy="230" rx="9" ry="5" fill="#8B5E3C" />

        {/* Body */}
        <ellipse cx="150" cy="155" rx="68" ry="38" fill="#C4944A" />
        <ellipse cx="150" cy="168" rx="52" ry="20" fill="#D4A85A" opacity="0.3" />

        {/* Shaggy back fur */}
        <path d="M 82 125 Q 90 115 100 122 Q 110 112 120 120 Q 130 110 140 118 Q 150 108 160 116 Q 170 106 180 114 Q 190 108 198 118 Q 206 112 212 122"
          stroke="#B8884A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 90 130 Q 100 122 110 128 Q 120 119 130 126 Q 140 117 150 124 Q 160 115 170 122 Q 180 114 190 121 Q 198 116 205 125"
          stroke="#A0704C" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />

        {/* Front legs */}
        <rect x="182" y="188" width="12" height="38" rx="6" fill="#A0704C" />
        <rect x="200" y="188" width="12" height="38" rx="6" fill="#96663C" />
        <ellipse cx="188" cy="228" rx="9" ry="5" fill="#96663C" />
        <ellipse cx="206" cy="228" rx="9" ry="5" fill="#8B5E3C" />

        {/* Neck */}
        <ellipse cx="210" cy="148" rx="24" ry="28" fill="#C4944A" />
        <path d="M 200 138 Q 210 130 220 136" stroke="#B8884A" strokeWidth="2" fill="none" />

        {/* Collar */}
        <path d="M 194 152 Q 206 160 220 153" stroke="#C45B4A" strokeWidth="5" strokeLinecap="round" />
        <circle cx="207" cy="158" r="4" fill="#FFD700" />

        {/* Head */}
        <circle cx="240" cy="110" r="35" fill="#C4944A" />
        {/* Shaggy head */}
        <path d="M 210 82 Q 218 72 228 80 Q 238 70 248 78 Q 258 68 265 76 Q 272 72 275 82"
          stroke="#B8884A" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Ears */}
        <ellipse cx="212" cy="82" rx="14" ry="24" fill="#A0704C" transform="rotate(18 212 82)" />
        <ellipse cx="265" cy="86" rx="12" ry="20" fill="#A0704C" transform="rotate(-14 265 86)" />

        {/* Snout */}
        <ellipse cx="268" cy="118" rx="20" ry="15" fill="#D4A85A" />
        {/* Nose */}
        <ellipse cx="283" cy="114" rx="7" ry="6" fill="#2C1810" />
        <circle cx="285" cy="112" r="1.5" fill="white" opacity="0.25" />
        {/* Mouth */}
        <path d="M 262 128 Q 270 134 280 128" stroke="#8B5E3C" strokeWidth="2" fill="none" />
        <path d="M 258 130 Q 264 135 270 132 Q 275 136 282 130" stroke="#B8884A" strokeWidth="1.5" fill="none" opacity="0.4" />

        {/* Eyes — big, cute, shiny */}
        <circle cx="232" cy="104" r="7" fill="#2C1810" />
        <circle cx="230" cy="101" r="3" fill="white" opacity="0.7" />
        <circle cx="234" cy="107" r="1.2" fill="white" opacity="0.3" />
        <circle cx="254" cy="104" r="6.5" fill="#2C1810" />
        <circle cx="252" cy="101" r="2.8" fill="white" opacity="0.7" />
        {/* Eyebrows */}
        <path d="M 224 96 Q 231 92 238 96" stroke="#A0704C" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 248 96 Q 254 93 260 97" stroke="#A0704C" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* === CLICKABLE HOTSPOTS === */}
        {HOTSPOTS.map((spot) => {
          const isHovered = hovered === spot.key;
          const isActive = activeSection === spot.key;
          return (
            <g key={spot.key}>
              <motion.circle
                cx={spot.cx}
                cy={spot.cy}
                r={spot.r}
                fill={HOTSPOT_COLORS[spot.key]}
                opacity={isHovered ? 0.25 : isActive ? 0.15 : 0}
                className="cursor-pointer"
                onClick={() => onSelect(spot.key)}
                onMouseEnter={() => setHovered(spot.key)}
                onMouseLeave={() => setHovered(null)}
                animate={isHovered ? { r: spot.r + 5 } : { r: spot.r }}
                transition={{ type: "spring", damping: 12 }}
              />
              {/* Pulse ring on hover */}
              {isHovered && (
                <motion.circle
                  cx={spot.cx}
                  cy={spot.cy}
                  r={spot.r}
                  fill="none"
                  stroke={HOTSPOT_COLORS[spot.key]}
                  strokeWidth="2"
                  initial={{ r: spot.r, opacity: 0.5 }}
                  animate={{ r: spot.r + 15, opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hovered && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -bottom-2 px-3 py-1.5 bg-rc-bark text-white text-xs rounded-lg whitespace-nowrap z-20"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {HOTSPOTS.find((h) => h.key === hovered)?.label}
        </motion.div>
      )}
    </div>
  );
}
