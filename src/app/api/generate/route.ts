import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are writing as Ruff Cuts, a mobile dog grooming service in Austin, TX.

VOICE: Your friend who happens to be an expert. Warm, direct, professional. Never cutesy, never corporate.

THREE RULES:
1. Talk to dog owners like the smart adults they are.
2. Be the expert they trust, not the brand that tries too hard.
3. Warm is good. Cutesy is dead.

WORDS WE USE: your dog, grooming, mobile grooming, appointment, full groom, bath and trim, we'll be there, see you in six weeks
WORDS WE NEVER USE: fur baby, pawsitively, pupper, pamper, spa day, doggo, floof, fur angel, any pun involving "paw" or "fur", "we're SO excited", "your precious baby"

TONE: Confident but not cocky. Warm but not gushing. We talk to people, not "pet parents." We'd rather say less and mean it than say more and sound like a greeting card.

CONTEXT: 3 vans, 3 groomers, booked 6 weeks out. $95-$140 per groom. Founded by a vet tech with 15 years experience. We come to the client's house. No kennels, no drop-offs. Customers are mostly dual-income households, 35-55, who have the money but not the time.

FORMAT: Keep it short. No emojis except sparingly on Instagram. No exclamation marks unless genuinely warranted. Write like a competent person texting a friend — not a brand performing enthusiasm.`;

const COPY_TYPES: Record<string, string> = {
  "instagram-caption": "Write an Instagram caption for a regular post.",
  "instagram-before-after": "Write an Instagram caption for a before/after grooming photo.",
  "instagram-story-reply": "Write a casual Instagram story reply or DM response.",
  "comment-positive": "Write a reply to a positive comment on social media.",
  "comment-negative": "Write a reply to a negative or snarky comment on social media. Stay professional.",
  "email-booking": "Write a booking confirmation email. Short, clear, helpful.",
  "email-reminder": "Write an appointment reminder email.",
  "email-followup": "Write a post-groom follow-up email.",
  "email-review-ask": "Write an email asking for a review after a groom.",
  "email-referral-thanks": "Write a thank you email for a client referral.",
  "email-price-increase": "Write a price increase announcement email. Be direct, explain why, don't apologize.",
  "email-welcome": "Write a welcome email for a new client.",
  "text-on-my-way": "Write a text message letting the client know we're on our way.",
  "text-running-late": "Write a text message letting the client know we're running late.",
  "text-done": "Write a text message letting the client know the groom is done and the dog is ready.",
  "text-reminder": "Write a text message appointment reminder.",
  "review-5-star": "Write a response to a 5-star review. Keep it short and genuine.",
  "review-3-star": "Write a response to a 3-star review. Acknowledge, don't get defensive, invite them to talk.",
  "review-1-star": "Write a response to a 1-star review. Take it seriously, move it private.",
  "complaint-nick": "Write a response to a client complaint about their dog getting a small nick during grooming.",
  "apology-general": "Write an apology for a service issue. Be specific, not vague.",
  "firing-client": "Write a message ending service with a difficult client. Graceful, firm, no guilt.",
  "dog-injury": "Write a response for a serious dog injury incident. This is the most important one to get right.",
  "cancellation-policy": "Write a message about the cancellation/no-show policy.",
  "website-homepage": "Write homepage hero copy for the website.",
  "google-business": "Write a Google Business profile description.",
  "job-posting": "Write a job posting for a new groomer.",
  "voicemail": "Write a voicemail greeting.",
};

export async function POST(request: NextRequest) {
  const { copyType, context } = await request.json();

  if (!copyType || !COPY_TYPES[copyType]) {
    return NextResponse.json({ error: "Invalid copy type" }, { status: 400 });
  }

  const client = new Anthropic();

  const userPrompt = `${COPY_TYPES[copyType]}${context ? `\n\nAdditional context from the user: ${context}` : ""}

Write only the copy. No preamble, no explanation, no "here's what I wrote." Just the copy itself.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({ copy: text });
}
