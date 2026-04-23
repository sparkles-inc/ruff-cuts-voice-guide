"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CollarSection from "@/components/sections/CollarSection";
import MouthSection from "@/components/sections/MouthSection";
import EarsSection from "@/components/sections/EarsSection";
import CoatSection from "@/components/sections/CoatSection";
import NoseSection from "@/components/sections/NoseSection";
import TailSection from "@/components/sections/TailSection";
import PawsSection from "@/components/sections/PawsSection";
import BrainSection from "@/components/sections/BrainSection";
import FoldersView from "@/components/FoldersView";
// WordRain kept for future use in interactive sections
// import WordRain from "@/components/WordRain";

const SECTIONS = [
  { key: "paws", title: "The Paws", subtitle: "Where we're headed", icon: "🐾" },
  { key: "collar", title: "The Collar", subtitle: "Core values that guide our conversations", icon: "🏷️" },
  { key: "mouth", title: "The Bark", subtitle: "Words to use, and words not to use", icon: "🗣️" },
  { key: "coat", title: "The Coat", subtitle: "Language for what sets us apart", icon: "✂️" },
  { key: "ears", title: "The Ears", subtitle: "How we listen", icon: "👂" },
  { key: "brain", title: "The Noggin'", subtitle: "AI prompts for every scenario", icon: "🧠" },
  { key: "nose", title: "The Snout", subtitle: "Quiz: sniff out the right words", icon: "🐽" },
  { key: "tail", title: "The Tail", subtitle: "Test your instincts", icon: "🎯" },
] as const;

type SectionKey = typeof SECTIONS[number]["key"];

const SECTION_COMPONENTS: Record<SectionKey, React.FC<{ printMode?: boolean }>> = {
  collar: CollarSection,
  mouth: MouthSection,
  ears: EarsSection,
  coat: CoatSection,
  nose: NoseSection,
  tail: TailSection,
  paws: PawsSection,
  brain: BrainSection,
};

// Annotation line positions — where each line connects to the dog
// Percentages relative to the image container
// Each has: dot position on dog, label position, which side (left/right)
// dotX/dotY = where the dot sits ON the dog (accurate to body part)
// labelY = where the label text sits (spaced nicely, line angles to connect)
const ANNOTATIONS: { key: SectionKey; dotX: number; dotY: number; side: "left" | "right"; labelY: number }[] = [
  { key: "brain",  dotX: 45, dotY: 14, side: "left",  labelY: 8 },
  { key: "ears",   dotX: 55, dotY: 8,  side: "right", labelY: 8 },
  { key: "mouth",  dotX: 50, dotY: 30, side: "left",  labelY: 22 },
  { key: "coat",   dotX: 35, dotY: 52, side: "left",  labelY: 46 },
  { key: "nose",   dotX: 58, dotY: 22, side: "right", labelY: 22 },
  { key: "collar", dotX: 52, dotY: 40, side: "right", labelY: 40 },
  { key: "tail",   dotX: 22, dotY: 78, side: "left",  labelY: 58 },
  { key: "paws",   dotX: 55, dotY: 95, side: "right", labelY: 56 },
];

export default function Home() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [hovered, setHovered] = useState<SectionKey | null>(null);
  const [mode, setMode] = useState<"interactive" | "print" | "folders">("interactive");
  const printMode = mode === "print";
  const foldersMode = mode === "folders";

  function scrollTo(key: SectionKey) {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex flex-col min-h-screen bg-rc-cream">
      {/* ═══ HERO ═══ */}
      <section className={`relative flex flex-col items-center justify-center px-6 overflow-hidden ${printMode ? "min-h-[90vh]" : "min-h-screen"}`}>
        {/* Mode toggle */}
        <div className="absolute top-6 right-6 z-20 print:hidden flex rounded-full border border-rc-bark/10 overflow-hidden">
          {([
            { key: "interactive" as const, icon: "✦", label: "Interactive" },
            { key: "print" as const, icon: "◉", label: "Print" },
            { key: "folders" as const, icon: "📁", label: "Folders" },
          ]).map((m) => (
            <button
              key={m.key}
              onClick={() => {
                setMode(m.key);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] sm:text-xs tracking-wide font-medium transition-colors ${
                mode === m.key
                  ? "bg-rc-bark text-rc-cream"
                  : "bg-rc-bark/5 text-rc-warm/50 hover:text-rc-warm/70"
              }`}
            >
              <span>{m.icon}</span> {m.label}
            </button>
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
          {/* Title above dog */}
          <div className="text-center mb-8 mt-8">
            <p className="text-sm sm:text-base tracking-[0.35em] uppercase text-rc-warm font-semibold mb-4">
              Ruff Cuts
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-rc-bark tracking-wide">
              BRAND VOICE GUIDE
            </h1>
            {printMode ? (
              <p className="text-sm sm:text-base italic text-rc-warm/60 mt-3">
                How we talk to clients
              </p>
            ) : (
              <div className="relative h-6 overflow-hidden mt-3">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={hovered || "default"}
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -200, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`text-sm sm:text-base italic absolute inset-0 flex items-center justify-center ${
                      hovered ? "text-rc-gold" : "text-rc-warm/60"
                    }`}
                  >
                    {hovered
                      ? SECTIONS.find((s) => s.key === hovered)?.subtitle
                      : "How we talk to clients"}
                  </motion.p>
                </AnimatePresence>
              </div>
            )}
            <div className="w-32 h-0.5 bg-rc-gold/30 mx-auto mt-3" />
          </div>

          {/* Dog diagram */}
          {printMode ? (
            /* Print mode — dog with static labels showing subtitles */
            <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: "470/580" }}>
              <Image
                src="/dog-full.png"
                alt="Ruff Cuts dog"
                fill
                priority
                className="object-contain z-10 relative"
              />
              <svg
                className="absolute z-20 pointer-events-none"
                viewBox="-80 0 260 100"
                preserveAspectRatio="none"
                style={{ left: "-55%", top: 0, width: "210%", height: "100%" }}
              >
                {ANNOTATIONS.map((a) => {
                  const labelX = a.side === "left" ? -68 : 168;
                  const elbowX = a.side === "left" ? 5 : 95;
                  return (
                    <g key={a.key} opacity={0.5}>
                      <circle cx={a.dotX} cy={a.dotY} r={0.6}
                        fill="#C4944A" opacity={0.5} />
                      <path
                        d={`M ${a.dotX} ${a.dotY} L ${elbowX} ${a.labelY} L ${labelX} ${a.labelY}`}
                        stroke="#8B5E3C"
                        strokeWidth={0.15}
                        fill="none"
                        opacity={0.4}
                      />
                      <line
                        x1={labelX} y1={a.labelY - 1.2} x2={labelX} y2={a.labelY + 1.2}
                        stroke="#8B5E3C"
                        strokeWidth={0.15}
                        opacity={0.4}
                      />
                    </g>
                  );
                })}
              </svg>
              {ANNOTATIONS.map((a) => {
                const section = SECTIONS.find((s) => s.key === a.key)!;
                return (
                  <div
                    key={a.key}
                    className={`absolute z-30 ${a.side === "left" ? "text-right" : "text-left"}`}
                    style={{
                      top: `${a.labelY}%`,
                      transform: "translateY(-50%)",
                      ...(a.side === "left" ? { right: "calc(100% + 24px)" } : { left: "calc(100% + 24px)" }),
                    }}
                  >
                    <span className="text-2xl font-bold text-rc-bark block whitespace-nowrap">{section.title}</span>
                    <span className="text-base text-rc-warm/70 block whitespace-nowrap italic">{section.subtitle}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Interactive mode — dog with hover labels (desktop) / simple list (mobile) */
            <>
            {/* Mobile: dog image + button list */}
            <div className="sm:hidden flex flex-col items-center w-full">
              <div className="relative w-48 mx-auto" style={{ aspectRatio: "470/580" }}>
                <Image
                  src="/dog-full.png"
                  alt="Ruff Cuts dog"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 w-full max-w-xs mt-6">
                {SECTIONS.map((section) => (
                  <button
                    key={section.key}
                    onClick={() => scrollTo(section.key)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/80 border border-rc-fog hover:border-rc-gold/40 transition-colors text-left"
                  >
                    <span className="text-base">{section.icon}</span>
                    <span className="text-xs font-semibold text-rc-bark/70">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: dog with annotation lines + hover labels */}
            <div className="hidden sm:block relative w-full max-w-lg mx-auto" style={{ aspectRatio: "470/580" }}>
              <Image
                src="/dog-full.png"
                alt="Ruff Cuts dog"
                fill
                priority
                className="object-contain z-10 relative"
              />
              <svg
                className="absolute z-20 pointer-events-none"
                viewBox="-60 0 220 100"
                preserveAspectRatio="none"
                style={{ left: "-40%", top: 0, width: "180%", height: "100%" }}
              >
                {ANNOTATIONS.map((a) => {
                  const labelX = a.side === "left" ? -50 : 150;
                  const elbowX = a.side === "left" ? 8 : 92;
                  const isHot = hovered === a.key;
                  return (
                    <g key={a.key} opacity={isHot ? 1 : 0.7}>
                      <circle cx={a.dotX} cy={a.dotY} r={isHot ? 1.2 : 0.8}
                        fill={isHot ? "#C4944A" : "#C4944A"} opacity={isHot ? 1 : 0.6} />
                      <path
                        d={`M ${a.dotX} ${a.dotY} L ${elbowX} ${a.labelY} L ${labelX} ${a.labelY}`}
                        stroke={isHot ? "#C4944A" : "#8B5E3C"}
                        strokeWidth={isHot ? 0.35 : 0.2}
                        fill="none"
                      />
                      <line
                        x1={labelX} y1={a.labelY - 1.5} x2={labelX} y2={a.labelY + 1.5}
                        stroke={isHot ? "#C4944A" : "#8B5E3C"}
                        strokeWidth={isHot ? 0.35 : 0.2}
                      />
                    </g>
                  );
                })}
              </svg>
              {ANNOTATIONS.map((a) => {
                const section = SECTIONS.find((s) => s.key === a.key)!;
                const isHot = hovered === a.key;
                return (
                  <button
                    key={a.key}
                    onClick={() => scrollTo(a.key)}
                    onMouseEnter={() => setHovered(a.key)}
                    onMouseLeave={() => setHovered(null)}
                    className={`absolute z-30 transition-all duration-200 ${
                      a.side === "left" ? "text-right" : "text-left"
                    }`}
                    style={{
                      top: `${a.labelY}%`,
                      transform: "translateY(-50%)",
                      ...(a.side === "left" ? { right: "calc(100% + 12px)" } : { left: "calc(100% + 12px)" }),
                    }}
                  >
                    <span className={`inline-block px-2 py-1 rounded-lg backdrop-blur-sm transition-colors ${
                      isHot ? "bg-rc-cream/95" : "bg-rc-cream/80"
                    }`}>
                      <span className={`text-sm sm:text-base font-semibold whitespace-nowrap transition-colors block ${
                        isHot ? "text-rc-gold" : "text-rc-bark/70"
                      }`}>
                        {section.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            </>
          )}

          {/* Scroll hint — hidden in print */}
          {!printMode && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-rc-warm/30">
                  <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ ALL SECTIONS or FOLDERS VIEW ═══ */}
      {foldersMode ? (
        <FoldersView />
      ) : (
        <>
          {SECTIONS.map((section) => {
            const Component = SECTION_COMPONENTS[section.key];
            return (
              <section
                key={section.key}
                id={section.key}
                ref={(el) => { sectionRefs.current[section.key] = el; }}
                className="px-6 py-20 flex flex-col items-center border-t border-rc-fog/50"
              >
                <div className="max-w-2xl w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{section.icon}</span>
                    <p className="text-sm tracking-[0.25em] uppercase text-rc-warm/40 font-medium">
                      {section.title}
                    </p>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl text-rc-bark mb-8">
                    {section.subtitle}
                  </h2>
                  <Component printMode={printMode} />
                </div>
              </section>
            );
          })}
          {!printMode && (
            <div className="flex justify-center py-10 print:hidden">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex flex-col items-center gap-1 text-rc-warm/40 hover:text-rc-bark transition-colors"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rotate-180">
                    <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
                <span className="text-xs tracking-wider uppercase">Top</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* ═══ FOOTER ═══ */}
      <footer className="px-6 py-16 text-center border-t border-rc-fog/50">
        <p className="font-display text-2xl text-rc-bark/70 mb-6">Dogs are people, too.</p>
        <div className="text-sm text-rc-warm/40 space-y-1">
          <p className="font-medium text-rc-bark/50">Ruff Cuts</p>
          <p>Austin, TX</p>
          <p>512-555-0142</p>
          <p>hello@ruffcuts.com</p>
        </div>
      </footer>
    </div>
  );
}
