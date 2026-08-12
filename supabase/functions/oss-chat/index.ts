import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SYSTEM_PROMPT = `You are "Enlighten", the friendly guide of an open source software directory.
Your motto: enlighten people about open source — including people with no technical background.

Rules:
- Recommend real, well-known open source projects and always name the licence when relevant.
- Explain things in plain language first; add advanced detail only after the simple answer.
- When someone describes a paid app (Photoshop, Office, Dropbox, Notion, Zapier...), suggest concrete open source replacements and how hard each is to set up.
- Keep answers short (under 200 words) and use markdown bullet lists.
- If you are unsure a project exists, say so instead of inventing it.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) return json({ error: 'AI is not configured' }, 500);

    const { messages } = await req.json();
    if (!Array.isArray(messages)) return json({ error: 'messages must be an array' }, 400);

    const trimmed = messages
      .filter((m: { role?: string; content?: string }) => m && typeof m.content === 'string')
      .slice(-20)
      .map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content.slice(0, 4000),
      }));

    const res = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Lovable-API-Key': apiKey,
        'X-Lovable-AIG-SDK': 'fetch',
      },
      body: JSON.stringify({
        model: 'google/gemini-3.6-flash',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...trimmed],
      }),
    });

    if (!res.ok) {
      const details = await res.text();
      console.error(`AI gateway failed [${res.status}]: ${details}`);
      if (res.status === 429) return json({ error: 'Too many requests right now — please try again in a moment.' }, 429);
      if (res.status === 402) return json({ error: 'AI credits exhausted. Please add credits to continue.' }, 402);
      return json({ error: 'AI request failed', details }, res.status);
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content ?? '';
    return json({ reply });
  } catch (e) {
    console.error('oss-chat error', e);
    return json({ error: String(e) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
