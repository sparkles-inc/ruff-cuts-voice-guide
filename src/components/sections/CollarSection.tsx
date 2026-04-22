"use client";

import { useState, useEffect } from "react";

const WE_ARE = ["Warm", "Expert", "Genuine", "Direct", "Trusted", "Confident", "Calm", "Real"];
const WE_ARE_NOT = ["Cutesy", "Corporate", "Salesy", "Stiff", "Loud", "Trendy", "Performative", "Generic"];

function WordFlasher({ words, className }: { words: string[]; className: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 800);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className={`inline-block transition-opacity duration-200 ${className}`}>
      {words[index]}
    </span>
  );
}

const VALUES = [
  {
    value: "The dog comes first.",
    explain: "Every decision, from how we schedule to how we talk, starts with what's best for the dog.",
  },
  {
    value: "Respect the adult in the room.",
    explain: "Our clients are smart. We don't baby-talk them, up-sell them, or waste their time.",
  },
  {
    value: "Say less. Mean it.",
    explain: "We don't over-promise, over-explain, or perform enthusiasm we don't feel.",
  },
];

export default function CollarSection({ printMode }: { printMode?: boolean }) {
  return (
    <div className="space-y-14">
      {/* Who you're talking to */}
      <p className="text-lg text-rc-bark leading-relaxed">
        Our clients are dual-income professionals who have money but no time. They want to trust a groomer and never think about it again. That&apos;s who we&apos;re talking to. Learn to speak their language.
      </p>

      {/* Three real values */}
      <div className="space-y-6">
        {VALUES.map(({ value, explain }, i) => (
          <div key={i} className="border-b border-rc-fog last:border-b-0 pb-6 last:pb-0">
            <p className="font-display text-xl sm:text-2xl text-rc-bark mb-2">{value}</p>
            <p className="text-lg text-rc-warm/70 leading-relaxed">{explain}</p>
          </div>
        ))}
      </div>

      {/* We are / We are not */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`flex flex-col items-center justify-center ${printMode ? "py-6" : "py-10"} bg-rc-sage/5 rounded-2xl border border-rc-sage/20`}>
          <p className="text-xs uppercase tracking-[0.2em] text-rc-sage/60 font-semibold mb-4">We are</p>
          {printMode ? (
            <ul className="space-y-1.5 text-center">
              {WE_ARE.map((word) => (
                <li key={word} className="font-display text-lg text-rc-sage">{word}</li>
              ))}
            </ul>
          ) : (
            <WordFlasher
              words={WE_ARE}
              className="font-display text-3xl sm:text-4xl text-rc-sage"
            />
          )}
        </div>
        <div className={`flex flex-col items-center justify-center ${printMode ? "py-6" : "py-10"} bg-rc-reject/3 rounded-2xl border border-rc-reject/15`}>
          <p className="text-xs uppercase tracking-[0.2em] text-rc-reject/70 font-semibold mb-4">We are not</p>
          {printMode ? (
            <ul className="space-y-1.5 text-center">
              {WE_ARE_NOT.map((word) => (
                <li key={word} className="font-display text-lg text-rc-reject/40">{word}</li>
              ))}
            </ul>
          ) : (
            <WordFlasher
              words={WE_ARE_NOT}
              className="font-display text-3xl sm:text-4xl text-rc-reject/40"
            />
          )}
        </div>
      </div>
    </div>
  );
}
