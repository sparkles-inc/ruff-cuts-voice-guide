"use client";

import { useState, useEffect, useRef } from "react";

// ─── Typewriter demo ───

const TYPEWRITER_EXAMPLES = [
  {
    bad: "I love doggos so much. We can't wait to meet yours!",
    good: "We're looking forward to meeting your dog.",
  },
  {
    bad: "Your fur baby is going to have the most pawsome spa day EVER!! 🐾✨",
    good: "Your dog's going to look great. See you Thursday.",
  },
  {
    bad: "OMG we're SO obsessed with this precious pupper!! Cutest floof we've ever seen!! 😍",
    good: "Duke did great today. Calm the whole time.",
  },
];

function TypewriterDemo() {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [phase, setPhase] = useState<"typing-bad" | "pause-bad" | "erasing" | "typing-good" | "pause-good">("typing-bad");
  const [charIndex, setCharIndex] = useState(0);

  const example = TYPEWRITER_EXAMPLES[exampleIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing-bad") {
      if (charIndex < example.bad.length) {
        timeout = setTimeout(() => setCharIndex(charIndex + 1), 40);
      } else {
        timeout = setTimeout(() => setPhase("pause-bad"), 1200);
      }
    } else if (phase === "pause-bad") {
      timeout = setTimeout(() => { setPhase("erasing"); setCharIndex(example.bad.length); }, 400);
    } else if (phase === "erasing") {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex(charIndex - 2 < 0 ? 0 : charIndex - 2), 15);
      } else {
        timeout = setTimeout(() => { setPhase("typing-good"); setCharIndex(0); }, 300);
      }
    } else if (phase === "typing-good") {
      if (charIndex < example.good.length) {
        timeout = setTimeout(() => setCharIndex(charIndex + 1), 40);
      } else {
        timeout = setTimeout(() => setPhase("pause-good"), 2500);
      }
    } else if (phase === "pause-good") {
      setExampleIndex((exampleIndex + 1) % TYPEWRITER_EXAMPLES.length);
      setPhase("typing-bad");
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [phase, charIndex, example, exampleIndex]);

  const isGoodPhase = phase === "typing-good" || phase === "pause-good";
  const currentText = isGoodPhase
    ? example.good.slice(0, charIndex)
    : example.bad.slice(0, charIndex);

  return (
    <div className="bg-white rounded-2xl border border-rc-fog p-5 mb-8">
      <div className="min-h-[3rem] flex items-center">
        <p className={`text-lg leading-relaxed transition-colors duration-300 ${
          isGoodPhase ? "text-rc-sage" : "text-rc-reject/80"
        }`}>
          {currentText}
          <span className="inline-block w-0.5 h-4 bg-rc-bark/40 ml-0.5 animate-pulse align-middle" />
        </p>
      </div>
      <div className="mt-2 pt-2 border-t border-rc-fog/50">
        <span className={`text-xs font-medium transition-colors duration-300 ${
          isGoodPhase ? "text-rc-sage" : "text-rc-reject/60"
        }`}>
          {isGoodPhase ? "✓ On brand" : "✗ Off brand"}
        </span>
      </div>
    </div>
  );
}

// ─── Main section ───

export default function NoseSection({ printMode }: { printMode?: boolean }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ issues: string[]; rewritten: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function autoGrow() {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.max(el.scrollHeight, 56) + "px";
    }
  }

  async function sniffIt() {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/sniff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ issues: ["Something went wrong"], rewritten: "" });
    } finally {
      setLoading(false);
    }
  }

  function copyRewrite() {
    if (result?.rewritten) {
      navigator.clipboard.writeText(result.rewritten);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function clearAndReset() {
    setInput("");
    setResult(null);
    setCopied(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  if (printMode) {
    return (
      <div className="space-y-8">
        <p className="text-sm text-rc-warm/70 mb-3">
          Examples of off-brand copy rewritten in the Ruff Cuts voice.
        </p>
        {TYPEWRITER_EXAMPLES.map((ex, i) => (
          <div key={i} className="bg-white rounded-2xl border border-rc-fog overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="px-5 py-4 sm:border-r border-b sm:border-b-0 border-rc-fog bg-rc-reject/3">
                <p className="text-xs uppercase tracking-wider text-rc-reject/60 mb-2">Before</p>
                <p className="text-base text-rc-reject/70 leading-relaxed line-through decoration-rc-reject/20">{ex.bad}</p>
              </div>
              <div className="px-5 py-4 bg-rc-sage/5">
                <p className="text-xs uppercase tracking-wider text-rc-sage mb-2">After</p>
                <p className="text-base text-rc-bark leading-relaxed">{ex.good}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <TypewriterDemo />

      {/* Input */}
      <div className="bg-white rounded-2xl border border-rc-fog p-5">
        <p className="text-sm text-rc-warm/70 mb-3">
          Paste any client-facing copy. We&apos;ll flag what&apos;s off-brand and rewrite it.
        </p>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => { setInput(e.target.value); setResult(null); autoGrow(); }}
          placeholder="e.g. We can't wait to pamper your precious fur baby..."
          rows={2}
          className="w-full text-lg text-rc-bark placeholder-rc-warm/30 bg-transparent resize-none focus:outline-none leading-relaxed"
        />
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-rc-fog">
          <span className="text-xs text-rc-warm/60">
            {input.length > 0 ? `${input.split(" ").filter(Boolean).length} words` : ""}
          </span>
          <button
            onClick={sniffIt}
            disabled={!input.trim() || loading}
            className="px-5 py-2 text-xs font-semibold text-white bg-rc-bark rounded-full hover:bg-rc-warm transition-colors disabled:opacity-30"
          >
            {loading ? "Sniffing..." : "\uD83D\uDC3D Sniff it"}
          </button>
        </div>
      </div>

      {/* Results — single grouped card */}
      {result && (
        <div className="bg-white rounded-2xl border border-rc-fog overflow-hidden">
          {/* Flags */}
          {result.issues && result.issues.length > 0 && (
            <div className="px-5 pt-5 pb-4">
              <p className="text-xs uppercase tracking-wider text-rc-reject/60 mb-3">What the nose caught</p>
              <ul className="space-y-1.5">
                {result.issues.map((issue, i) => (
                  <li key={i} className="text-base text-rc-bark/60 flex items-start gap-2">
                    <span className="text-rc-reject mt-0.5">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Before / After */}
          <div className="border-t border-rc-fog">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Before */}
              <div className="px-5 py-4 sm:border-r border-b sm:border-b-0 border-rc-fog bg-rc-reject/3">
                <p className="text-xs uppercase tracking-wider text-rc-reject/60 mb-2">Before</p>
                <p className="text-lg text-rc-reject/70 leading-relaxed line-through decoration-rc-reject/20">{input}</p>
              </div>

              {/* After */}
              <div className="px-5 py-4 bg-rc-sage/5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wider text-rc-sage">After</p>
                  <button
                    onClick={copyRewrite}
                    className="text-xs text-rc-sage/60 hover:text-rc-sage transition-colors"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-lg text-rc-bark leading-relaxed">{result.rewritten}</p>
              </div>
            </div>
          </div>

          {/* Try again */}
          <div className="border-t border-rc-fog px-5 py-3 text-center">
            <button
              onClick={clearAndReset}
              className="text-xs text-rc-warm/40 hover:text-rc-bark transition-colors"
            >
              Clear & try another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
