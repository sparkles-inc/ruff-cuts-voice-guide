"use client";

import { useState, useEffect, useRef } from "react";

const SCENARIOS = [
  {
    id: "stressed-dog",
    situation: "A client texts you at 7pm",
    message: "Hey, Duke seems really stressed since his groom today. He keeps hiding under the bed and won't eat dinner. Is that normal?",
    context: "Duke is a regular — every 6 weeks for the past year. He's never had this reaction before. You groomed him today and everything seemed fine during the appointment.",
  },
  {
    id: "price-question",
    situation: "A new lead messages on Instagram",
    message: "Hi! How much do you charge? My current groomer is $60 but I've heard great things about you guys.",
    context: "Your rate for a standard groom is $95–$140 depending on breed and coat. You're booked 6 weeks out. This person found you through a neighbor's recommendation.",
  },
  {
    id: "late-cancel",
    situation: "A client calls 20 minutes before their appointment",
    message: "I'm so sorry, something came up at work and I can't be home for Bella's groom today. Can we reschedule?",
    context: "This is the second time this client has cancelled last-minute. Your policy is 24-hour notice for cancellations. Your groomer is already en route to their house.",
  },
];

type Responses = Record<string, string>;

function loadResponses(): Responses {
  if (typeof window === "undefined") return {};
  try {
    const saved = localStorage.getItem("ruffcuts-tail-responses");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveResponses(responses: Responses) {
  localStorage.setItem("ruffcuts-tail-responses", JSON.stringify(responses));
}

export default function TailSection({ printMode }: { printMode?: boolean }) {
  const [responses, setResponses] = useState<Responses>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  useEffect(() => {
    const saved = loadResponses();
    setResponses(saved);
    // Mark any previously saved responses as submitted
    const alreadySubmitted: Record<string, boolean> = {};
    for (const key of Object.keys(saved)) {
      if (saved[key]?.trim()) alreadySubmitted[key] = true;
    }
    setSubmitted(alreadySubmitted);
    setLoaded(true);
  }, []);

  function autoGrow(id: string) {
    const el = textareaRefs.current[id];
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.max(el.scrollHeight, 56) + "px";
    }
  }

  function handleSubmit(id: string) {
    if (!responses[id]?.trim()) return;
    saveResponses(responses);
    setSubmitted((prev) => ({ ...prev, [id]: true }));
  }

  function handleEdit(id: string) {
    setSubmitted((prev) => ({ ...prev, [id]: false }));
    setTimeout(() => textareaRefs.current[id]?.focus(), 50);
  }

  const allSubmitted = loaded && SCENARIOS.every((s) => submitted[s.id]);

  return (
    <div className="space-y-10">
      <p className="text-sm text-rc-bark/80 leading-relaxed">
        {printMode
          ? "Read each scenario and think about how you\u2019d respond. These are real situations you\u2019ll face."
          : "Write what you\u2019d actually say. The head of marketing will review your answers and give you real feedback."}
      </p>

      {SCENARIOS.map((scenario) => (
        <div key={scenario.id} className="bg-white rounded-2xl border border-rc-fog overflow-hidden">
          {/* Scenario header */}
          <div className="px-5 pt-5 pb-3">
            <p className="text-[10px] uppercase tracking-wider text-rc-warm/40 mb-3">{scenario.situation}</p>
            <div className="bg-rc-fog/30 rounded-xl px-4 py-3 mb-3">
              <p className="text-sm text-rc-bark/70 italic leading-relaxed">&ldquo;{scenario.message}&rdquo;</p>
            </div>
            <p className="text-xs text-rc-warm/40 leading-relaxed">{scenario.context}</p>
          </div>

          {/* Response area — hidden in print mode */}
          {!printMode && (
            <div className="px-5 pb-5 pt-3">
              {submitted[scenario.id] ? (
                <div>
                  <div className="bg-rc-sage/5 border border-rc-sage/15 rounded-xl px-4 py-3">
                    <p className="text-sm text-rc-bark/80 leading-relaxed whitespace-pre-wrap">{responses[scenario.id]}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-rc-sage font-medium">Submitted for review</span>
                    <button
                      onClick={() => handleEdit(scenario.id)}
                      className="text-[10px] text-rc-warm/40 hover:text-rc-bark transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <textarea
                    ref={(el) => { textareaRefs.current[scenario.id] = el; }}
                    value={responses[scenario.id] || ""}
                    onChange={(e) => {
                      setResponses((prev) => ({ ...prev, [scenario.id]: e.target.value }));
                      autoGrow(scenario.id);
                    }}
                    placeholder="Write your response..."
                    rows={2}
                    className="w-full text-sm text-rc-bark/80 placeholder-rc-warm/30 bg-transparent resize-none focus:outline-none leading-relaxed"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleSubmit(scenario.id)}
                      disabled={!responses[scenario.id]?.trim()}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-rc-bark rounded-full hover:bg-rc-warm transition-colors disabled:opacity-30"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* All submitted confirmation */}
      {!printMode && allSubmitted && (
        <div className="bg-rc-cream border border-rc-gold/20 rounded-2xl p-6 text-center">
          <p className="font-display text-xl text-rc-bark mb-2">All responses submitted.</p>
          <p className="text-sm text-rc-warm/50 leading-relaxed">
            The business owner will review these personally and follow up with corrections or feedback. No AI grading — real eyes, real judgment.
          </p>
        </div>
      )}
    </div>
  );
}
