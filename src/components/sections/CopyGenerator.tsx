"use client";

import { useState } from "react";

const COPY_CATEGORIES = [
  {
    label: "Social Media",
    options: [
      { key: "instagram-caption", label: "Instagram caption" },
      { key: "instagram-before-after", label: "Instagram before/after" },
      { key: "instagram-story-reply", label: "Story reply / DM" },
      { key: "comment-positive", label: "Positive comment reply" },
      { key: "comment-negative", label: "Negative comment reply" },
    ],
  },
  {
    label: "Client Emails",
    options: [
      { key: "email-booking", label: "Booking confirmation" },
      { key: "email-reminder", label: "Appointment reminder" },
      { key: "email-followup", label: "Post-groom follow-up" },
      { key: "email-review-ask", label: "Ask for a review" },
      { key: "email-referral-thanks", label: "Referral thank you" },
      { key: "email-price-increase", label: "Price increase" },
      { key: "email-welcome", label: "Welcome email" },
    ],
  },
  {
    label: "Text Messages",
    options: [
      { key: "text-on-my-way", label: "On my way" },
      { key: "text-running-late", label: "Running late" },
      { key: "text-done", label: "Dog's ready" },
      { key: "text-reminder", label: "Reminder" },
    ],
  },
  {
    label: "Review Responses",
    options: [
      { key: "review-5-star", label: "5-star response" },
      { key: "review-3-star", label: "3-star response" },
      { key: "review-1-star", label: "1-star response" },
    ],
  },
  {
    label: "Hard Conversations",
    options: [
      { key: "complaint-nick", label: "Dog got nicked" },
      { key: "apology-general", label: "General apology" },
      { key: "firing-client", label: "Ending service with a client" },
      { key: "dog-injury", label: "Serious dog injury" },
      { key: "cancellation-policy", label: "Cancellation / no-show" },
    ],
  },
  {
    label: "Other",
    options: [
      { key: "website-homepage", label: "Website homepage" },
      { key: "google-business", label: "Google Business description" },
      { key: "job-posting", label: "Job posting" },
      { key: "voicemail", label: "Voicemail greeting" },
    ],
  },
];

export default function CopyGenerator() {
  const [selectedType, setSelectedType] = useState("");
  const [context, setContext] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!selectedType) return;
    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ copyType: selectedType, context: context.trim() || undefined }),
    });

    const data = await res.json();
    setResult(data.copy || data.error || "Something went wrong");
    setLoading(false);
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Find the label for the selected type
  const selectedLabel = COPY_CATEGORIES
    .flatMap((c) => c.options)
    .find((o) => o.key === selectedType)?.label;

  return (
    <div className="space-y-6">
      <p className="text-sm text-rc-warm/60 leading-relaxed">
        Pick a copy type. Add context if you want. Get copy that sounds like Ruff Cuts.
      </p>

      {/* Dropdown */}
      <select
        value={selectedType}
        onChange={(e) => { setSelectedType(e.target.value); setResult(""); }}
        className="w-full px-4 py-3 text-sm text-rc-bark bg-white border border-rc-fog rounded-xl focus:outline-none focus:ring-2 focus:ring-rc-gold/30 appearance-none cursor-pointer"
      >
        <option value="">Choose a copy type...</option>
        {COPY_CATEGORIES.map((cat) => (
          <optgroup key={cat.label} label={cat.label}>
            {cat.options.map((opt) => (
              <option key={opt.key} value={opt.key}>{opt.label}</option>
            ))}
          </optgroup>
        ))}
      </select>

      {/* Context input */}
      {selectedType && (
        <div>
          <label className="text-xs text-rc-warm/50 mb-1.5 block">
            Any specifics? (optional: dog name, situation, etc.)
          </label>
          <input
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder={`e.g. "Duke, golden retriever, first-time client"`}
            className="w-full px-4 py-2.5 text-sm text-rc-bark bg-white border border-rc-fog rounded-xl focus:outline-none focus:ring-2 focus:ring-rc-gold/30"
          />
        </div>
      )}

      {/* Generate button */}
      {selectedType && (
        <button
          onClick={generate}
          disabled={loading}
          className="w-full py-3 text-sm font-semibold text-white bg-rc-bark rounded-xl hover:bg-rc-warm transition-colors disabled:opacity-50"
        >
          {loading ? "Writing..." : `Write ${selectedLabel}`}
        </button>
      )}

      {/* Result */}
      {result && (
        <div className="bg-white rounded-2xl border border-rc-fog overflow-hidden">
          <div className="px-5 py-3 bg-rc-fog/30 flex items-center justify-between">
            <span className="text-xs font-semibold text-rc-bark/60">{selectedLabel}</span>
            <button
              onClick={copyResult}
              className={`text-xs font-semibold transition-colors ${
                copied ? "text-rc-sage" : "text-rc-gold hover:text-rc-warm"
              }`}
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
          <div className="px-5 py-4">
            <p className="text-sm text-rc-bark/80 leading-relaxed whitespace-pre-line">{result}</p>
          </div>
        </div>
      )}
    </div>
  );
}
