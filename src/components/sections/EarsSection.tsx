"use client";

import { useState } from "react";

const SCENARIOS = [
  {
    situation: "Client complaint: dog came back with a nick",
    clientSays: "I just noticed Duke has a cut on his ear from today's groom. There's a little blood on his bed. I'm really upset about this.",
    drawOut: "Oh no. I'm so sorry. Tell me everything. Where exactly is the cut? Is it still bleeding or has it slowed down?",
    clientFollowUp: "It's on the tip of his left ear. It's not gushing but it's definitely still oozing a little. He keeps shaking his head.",
    mirrorBack: "So Duke has a cut on the tip of his left ear that's still oozing, and he's shaking his head. That's not okay. That shouldn't happen on our watch.",
    solve: "Here's what I'd like to do. I've already talked to the groomer. I want to cover your next groom and if you want your vet to look at his ear, we'll cover that visit too. How does that sound?",
    principle: "She didn't defend or minimize. She asked for details first so the client could get it all out. Then she mirrored the specifics (left ear, still oozing, shaking his head) so the client knows she was actually listening. The solution came last.",
  },
  {
    situation: "Negative Google review",
    clientSays: "Showed up late, groomer seemed rushed, and my dog was anxious when I got him back. Won't be returning. 2 stars.",
    approach: "acknowledge-and-lunch",
    response: "Sarah, I'm sorry to hear you had a less than stellar experience. I'd love to learn more about what happened exactly. Can I take you out to lunch and get to the bottom of it? Please contact us directly at 512-555-0142.\n\nDana",
    principle: "Nobody expects a lunch invite from a grooming company. That's the point. It says 'we care enough to sit across from you in person.' Keep the public reply short, acknowledge the feeling, and move the conversation face to face.",
  },
  {
    situation: "Client wants to cancel recurring",
    clientSays: "Hey, we need to cancel our recurring appointment. Things have just gotten tight right now.",
    approach: "ask-for-feedback",
    response: "Totally understand. We'll get that cancelled for you. Before you go, would you be open to sharing any feedback on the service? We're always trying to get better, and hearing from clients who've been with us is the most useful thing. Either way, thanks for trusting us with Max. Door's always open.",
    principle: "Don't guilt them. Don't beg. Cancel it immediately so they know you respect their decision. Then ask for feedback, not to change their mind, but because you genuinely want to improve. That honesty is what makes them come back later.",
  },
  {
    situation: "Price increase announcement",
    clientSays: "(Proactive, sent before anyone asks)",
    approach: "professionalize-and-benefit",
    response: "Hi Sarah, quick heads up. Starting March 1, our rates are going up by $10.\n\nHere's why: we've upgraded our products to all-natural, hypoallergenic lines. We've invested in better equipment in every van. And we're paying our groomers what they're worth so the best people stick around.\n\nWhat that means for you: better products on your dog's skin, the same groomer every time, and a team that's not cutting corners to keep prices low.\n\nYour next appointment is locked at the current rate. Thanks for being with us.",
    principle: "Don't apologize for raising prices. Explain how the business is professionalizing, then show the client what they get out of it. Better products on their dog, consistency with their groomer, a team that doesn't cut corners. The price increase becomes an upgrade, not a cost.",
  },
];

export default function EarsSection({ printMode }: { printMode?: boolean }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-10">
      <p className="text-lg text-rc-bark leading-relaxed">
        Our clients won&apos;t remember the exact incident, but they&apos;ll remember how we made them feel. Pick up the phone whenever you can. Hard conversations don&apos;t do nearly as well over text.
      </p>

      <div className="space-y-4">
          {SCENARIOS.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-rc-fog overflow-hidden">
              {!printMode && (
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-rc-fog/20 transition-colors"
                >
                  <span className="text-lg font-semibold text-rc-bark">{s.situation}</span>
                  <span className="text-xs text-rc-warm/40">{expanded === i ? "▾" : "▸"}</span>
                </button>
              )}

              {printMode && (
                <div className="px-5 pt-4 pb-1">
                  <p className="text-base font-semibold text-rc-bark">{s.situation}</p>
                </div>
              )}

              {(printMode || expanded === i) && (
                <div className="px-5 pb-5 space-y-4">
                  {/* What the client says */}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-rc-warm/70 mb-1.5">They say</p>
                    <div className="bg-rc-fog/30 rounded-xl px-4 py-3">
                      <p className="text-lg text-rc-bark/90 italic leading-relaxed">&quot;{s.clientSays}&quot;</p>
                    </div>
                  </div>

                  {"approach" in s ? (
                    /* Non-complaint scenarios — single response */
                    <div>
                      <p className="text-xs uppercase tracking-wider text-rc-sage mb-1.5">Our response</p>
                      <div className="bg-rc-cream rounded-xl px-4 py-3 border-l-2 border-rc-sage/40">
                        <p className="text-lg text-rc-bark leading-relaxed whitespace-pre-line">&quot;{("response" in s) ? s.response : ""}&quot;</p>
                      </div>
                    </div>
                  ) : (
                    /* Complaint scenario — full 3-step framework */
                    <>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-rc-warm mb-1.5">Step 1: Make a safe space</p>
                        <div className="bg-rc-cream rounded-xl px-4 py-3 border-l-2 border-rc-warm/40">
                          <p className="text-lg text-rc-bark leading-relaxed">&quot;{("drawOut" in s) ? s.drawOut : ""}&quot;</p>
                        </div>
                      </div>

                      {"clientFollowUp" in s && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-rc-warm/70 mb-1.5">They continue</p>
                          <div className="bg-rc-fog/30 rounded-xl px-4 py-3">
                            <p className="text-lg text-rc-bark/90 italic leading-relaxed">&quot;{s.clientFollowUp}&quot;</p>
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-xs uppercase tracking-wider text-rc-gold mb-1.5">Step 2: Mirror what they say</p>
                        <div className="bg-rc-cream rounded-xl px-4 py-3 border-l-2 border-rc-gold/40">
                          <p className="text-lg text-rc-bark leading-relaxed">&quot;{("mirrorBack" in s) ? s.mirrorBack : ""}&quot;</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-rc-sage mb-1.5">Step 3: Offer solutions</p>
                        <div className="bg-rc-cream rounded-xl px-4 py-3 border-l-2 border-rc-sage/40">
                          <p className="text-lg text-rc-bark leading-relaxed">&quot;{("solve" in s) ? s.solve : ""}&quot;</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Why it works */}
                  <div className="pt-2">
                    <p className="text-xs uppercase tracking-wider text-rc-warm/50 mb-1.5">Why this works</p>
                    <p className="text-sm text-rc-warm/70 leading-relaxed italic">{s.principle}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
