"use client";

const WORDS_WE_USE = [
  "your dog", "grooming", "we'll be there", "mobile grooming", "appointment",
  "clean up", "full groom", "bath and trim", "he did great", "see you in six weeks",
];

const WORDS_WE_NEVER_USE = [
  "fur baby", "pawsitively", "pupper", "pamper", "spa day",
  "fur angel", "doggo", "floof", "pup-arazzi", "fur-ever",
  "we're SO excited", "your precious baby", "tail-wagging experience",
];

export default function MouthSection() {
  return (
    <div className="space-y-10">
      {/* Tone spectrum */}
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-rc-warm/70 mb-6">The spectrum</p>
        <div className="space-y-3">
          {[
            { label: "Warmth", left: "Cold", right: "Gushing", position: 65 },
            { label: "Authority", left: "Timid", right: "Lecturing", position: 60 },
            { label: "Humor", left: "None", right: "Clown", position: 35 },
            { label: "Formality", left: "Casual", right: "Corporate", position: 40 },
          ].map(({ label, left, right, position }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs text-rc-warm/60 w-16 text-right">{left}</span>
              <div className="flex-1 h-2 bg-rc-fog rounded-full relative">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-rc-gold shadow-sm border-2 border-white"
                  style={{ left: `${position}%` }}
                />
              </div>
              <span className="text-xs text-rc-warm/60 w-16">{right}</span>
              <span className="text-xs text-rc-bark font-medium w-16">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Words we use / never use */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-rc-fog p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-rc-sage font-semibold mb-3">Words we use</p>
          <div className="flex flex-wrap gap-1.5">
            {WORDS_WE_USE.map((w) => (
              <span key={w} className="px-2.5 py-1 text-base font-medium text-rc-sage bg-rc-sage/8 rounded-full">{w}</span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-rc-fog p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-rc-reject font-semibold mb-3">Never use</p>
          <div className="flex flex-wrap gap-1.5">
            {WORDS_WE_NEVER_USE.map((w) => (
              <span key={w} className="px-2.5 py-1 text-base font-medium text-rc-reject/80 bg-rc-reject/5 rounded-full">{w}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
