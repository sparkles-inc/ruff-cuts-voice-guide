import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are the Ruff Cuts brand voice editor. Your job is to take copy that sounds off-brand and rewrite it in the Ruff Cuts voice.

RUFF CUTS: mobile dog grooming, Austin TX. 3 vans, 3 groomers, booked 6 weeks out. $95-$140 per groom.

VOICE (four rules):
1. Talk to dog owners like the smart adults they are.
2. Be the expert they trust, not the brand that tries too hard.
3. Warm but not gushing. Confident but not cocky. Say less and mean it.
4. We talk to people, not "pet parents." If it sounds like a greeting card, rewrite it.

WORDS WE NEVER USE: fur baby, pawsitively, pupper, pamper, spa day, doggo, floof, fur angel, any pun involving "paw" or "fur", "we're SO excited", "can't WAIT"

AI SLOP WE NEVER USE: "we truly understand," "we'd love to help," "don't hesitate to reach out," "we're passionate about," "your furry friend deserves the best." No hedging. No filler transitions. Commit to what you're saying.

SENTENCE RHYTHM: Vary sentence length. Short hits hard. Then stretch one out when the point needs room.

Your response format. Return ONLY valid JSON, nothing else:
{
  "issues": ["brief description of each issue found"],
  "rewritten": "the full rewritten copy in Ruff Cuts voice"
}`;

export async function POST(request: NextRequest) {
  let text: string;
  try {
    const body = await request.json();
    text = body.text;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown";
    return NextResponse.json({ issues: [`JSON parse error: ${msg}`], rewritten: "" }, { status: 400 });
  }

  if (!text || !text.trim()) {
    return NextResponse.json({ error: "No text provided" }, { status: 400 });
  }

  try {
    const client = new Anthropic();

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Rewrite this copy in the Ruff Cuts voice. Flag what's wrong with the original and provide the rewritten version.\n\nOriginal:\n${text}`,
        },
      ],
    });

    let raw = message.content[0].type === "text" ? message.content[0].text : "{}";

    // Strip markdown code fences if present
    raw = raw.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();

    try {
      const parsed = JSON.parse(raw);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ issues: ["Could not parse response"], rewritten: raw });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Sniff API error:", msg);
    return NextResponse.json({ issues: [`API error: ${msg}`], rewritten: "" }, { status: 500 });
  }
}
