const ALLOWED_ORIGINS = new Set([
  "https://biggybird.github.io",
  "https://brainrot-dictionary.vercel.app"
]);

module.exports = async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && (ALLOWED_ORIGINS.has(origin) || origin.endsWith(".vercel.app"))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST for chat requests." });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "Gemini is not configured yet. The site owner needs to add GEMINI_API_KEY in Vercel settings." });

  try {
    const body = req.body || {};
    const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    const mode = body.mode === "brainrot" ? "brainrot" : "normal";
    if (!messages.length) return res.status(400).json({ error: "Send a message to start chatting." });

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content || "").slice(0, 4000) }]
    })).filter((m) => m.parts[0].text.trim());

    if (!contents.length || contents[contents.length - 1].role !== "user") {
      return res.status(400).json({ error: "The last message must be from the user." });
    }

    const style = mode === "brainrot"
      ? "Use playful Gen-Z slang and meme references, but keep explanations accurate and understandable. Do not overdo slang when the topic is serious."
      : "Answer clearly, helpfully, and accurately in plain language.";

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "You are Brainrot AI, a general-purpose assistant inside Brainrot Dictionary. You can help with learning, writing, brainstorming, science, maths, programming, and everyday questions. " + style + " If uncertain, say so instead of inventing facts. You do not automatically have live web access." }]
          },
          contents,
          generationConfig: { temperature: 0.8, maxOutputTokens: 1200 }
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("Gemini API error status:", response.status);
      return res.status(response.status === 429 ? 429 : 502).json({
        error: response.status === 429
          ? "Gemini's current quota or rate limit was reached. Try again later."
          : "Gemini could not answer right now. Check the API key and model availability in Google AI Studio."
      });
    }

    const answer = data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("").trim();
    if (!answer) return res.status(502).json({ error: "Gemini returned an empty answer. Please try again." });
    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Chat request failed:", error?.message || "Unknown error");
    return res.status(500).json({ error: "Something went wrong while contacting Gemini. Please try again." });
  }
};
