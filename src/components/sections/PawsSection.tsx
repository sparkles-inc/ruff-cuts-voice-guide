"use client";

export default function PawsSection() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-lg text-rc-bark leading-relaxed mb-4">
          Dana spent 15 years as a vet tech before she ever picked up clippers. She didn&apos;t start Ruff Cuts because she loved grooming. She started it because she kept watching dogs come back from groomers stressed and anxious, when grooming should be something they look forward to. She knew she could do better.
        </p>
        <p className="text-lg text-rc-bark leading-relaxed mb-4">
          Three vans. Three groomers she trained herself. Every dog gets groomed in their own driveway, with familiar smells, no kennel, no other dogs barking. That&apos;s the whole point.
        </p>
        <p className="text-lg text-rc-bark leading-relaxed">
          We&apos;re booked six weeks out because people don&apos;t leave. As we grow, we need every person on this team to sound like they belong here. That&apos;s where this guide comes in.
        </p>
      </div>

      {/* Dana quote */}
      <div className="bg-rc-cream border border-rc-gold/20 rounded-2xl p-6">
        <p className="italic font-serif text-lg sm:text-xl text-rc-bark leading-relaxed text-center">
          &ldquo;We know we&apos;ve done our job if the dogs are happy to see us. Whether that happens after 1 bath or 5, our goal is to make them feel safe and comfortable.&rdquo;
        </p>
        <p className="text-sm text-rc-warm/70 text-center mt-3">&mdash; Dana</p>
      </div>
    </div>
  );
}
