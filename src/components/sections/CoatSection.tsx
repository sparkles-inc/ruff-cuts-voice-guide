"use client";

export default function CoatSection() {
  return (
    <div className="space-y-8">
      {/* How we talk about the difference */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-rc-warm/40 mb-4">How we say it</p>
        <div className="space-y-4">
          {[
            {
              instead: "\"We're better than salon groomers\"",
              we_say: "\"Your dog stays in her own neighborhood, with familiar smells, no kennel, no other dogs barking. She's calm because nothing feels foreign.\"",
              why: "We describe the dog's experience. The comparison writes itself.",
            },
            {
              instead: "\"Other groomers don't have our experience\"",
              we_say: "\"15 years as a vet tech before we ever picked up clippers. We know dogs, not just grooming.\"",
              why: "We state our credentials. We don't diminish anyone else's.",
            },
            {
              instead: "\"We're premium / luxury / high-end\"",
              we_say: "\"You're paying for a dog who's relaxed during the groom and calm when we're done. That's the difference.\"",
              why: "We explain what the dog gets. We don't label ourselves.",
            },
            {
              instead: "\"We're not like those big chain places\"",
              we_say: "\"Same groomer every time. She knows your dog's name, his sensitive spots, and what treats he likes.\"",
              why: "We show what consistency feels like for the dog. The chain comparison is implied.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-rc-fog/30 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-rc-reject text-xs font-semibold mt-0.5">✗</span>
                <p className="text-sm text-rc-reject/70 italic">{item.instead}</p>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-rc-sage text-xs font-semibold mt-0.5">✓</span>
                <p className="text-sm text-rc-bark/80">{item.we_say}</p>
              </div>
              <p className="text-[11px] text-rc-warm/50 ml-6">{item.why}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-rc-fog/30 rounded-2xl p-5">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-rc-reject text-xs font-semibold mt-0.5">✗</span>
          <p className="text-sm text-rc-reject/70 italic">&quot;We&apos;re worth every penny!&quot;</p>
        </div>
        <div className="flex items-start gap-3 mb-3">
          <span className="text-rc-sage text-xs font-semibold mt-0.5">✓</span>
          <p className="text-sm text-rc-bark/80">&quot;Your dog is relaxed during the groom and calm when it&apos;s over. And you don&apos;t even need to make a trip. That&apos;s what the [price] gets you.&quot;</p>
        </div>
        <p className="text-[11px] text-rc-warm/50 ml-6">Never apologize for the price. Never oversell the luxury. Explain what the dog gets. The experience speaks for itself.</p>
      </div>

      {/* The rule */}
      <div className="bg-rc-cream border border-rc-gold/20 rounded-2xl p-6">
        <p className="text-sm text-rc-bark/70 leading-relaxed">
          <strong className="text-rc-bark">The rule: </strong>Never name a competitor. Never say &quot;unlike other groomers.&quot; We don&apos;t trash them. We don&apos;t even mention them. Just describe what the dog experiences with us, and let the specifics do the talking.
        </p>
      </div>
    </div>
  );
}
