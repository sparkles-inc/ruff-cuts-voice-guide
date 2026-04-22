"use client";

const RAIN_WORDS = [
  // Who we are
  "warm", "expert", "genuine", "direct", "trusted",
  "confident", "real", "professional", "calm", "skilled",
  "reliable", "experienced", "friendly", "gentle", "thorough",
  "honest", "consistent", "careful", "patient", "steady",
  "capable", "attentive", "respectful", "grounded", "prepared",
  // What we do
  "mobile", "grooming", "comfortable", "clean", "precise",
  "on time", "at your door", "no stress", "no kennels",
  "we come to you", "full groom", "bath and trim",
  // How we show up
  "dependable", "punctual", "focused", "knowledgeable",
  "seasoned", "composed", "easygoing", "approachable",
  "straightforward", "no-nonsense", "understated", "effortless",
  // How dogs feel with us
  "relaxed", "safe", "familiar", "at ease", "unbothered",
  "settled", "content", "happy", "comfortable", "secure",
  // How clients feel
  "convenient", "simple", "easy", "worth it", "seamless",
  "hands-off", "stress-free", "taken care of", "covered",
  // The craft
  "technique", "precision", "breed-specific", "coat health",
  "de-matting", "ear cleaning", "nail trim", "sanitary trim",
  "hand scissoring", "undercoat", "double coat", "finishing",
  // Values
  "integrity", "quality", "consistency", "transparency",
  "accountability", "craftsmanship", "dedication", "pride",
];

export default function WordRain() {
  const rainWords = [];
  for (let i = 0; i < 120; i++) {
    rainWords.push({
      text: RAIN_WORDS[i % RAIN_WORDS.length],
      left: Math.random() * 100,
      delay: Math.random() * 18,
      duration: 12 + Math.random() * 14,
      size: 9 + Math.random() * 4,
      opacity: 0.02 + Math.random() * 0.03,
    });
  }
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {rainWords.map((w, i) => (
        <span key={i}
          className="absolute whitespace-nowrap text-rc-bark font-medium animate-rain select-none"
          style={{ left: `${w.left}%`, fontSize: `${w.size}px`, opacity: w.opacity, animationDelay: `${w.delay}s`, animationDuration: `${w.duration}s` }}>
          {w.text}
        </span>
      ))}
    </div>
  );
}
