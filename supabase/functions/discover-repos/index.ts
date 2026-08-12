import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

interface Repo {
  id: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage: string | null;
  imageUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  license: string;
  topics: string[];
  updatedAt: string;
  createdAt: string;
}

// Simple in-memory cache so the feed refreshes roughly once a day per query.
const cache = new Map<string, { at: number; repos: Repo[] }>();
const DAY = 24 * 60 * 60 * 1000;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const query = (url.searchParams.get('query') ?? 'open source').slice(0, 120);
    const sort = url.searchParams.get('sort') === 'updated' ? 'updated' : 'stars';
    const perPage = Math.min(Number(url.searchParams.get('per_page') ?? 24), 50);
    const key = `${query}|${sort}|${perPage}`;

    const hit = cache.get(key);
    if (hit && Date.now() - hit.at < DAY) {
      return json({ repos: hit.repos, cached: true, refreshedAt: new Date(hit.at).toISOString() });
    }

    // Only repositories touched in the last ~90 days, so the feed stays alive.
    const since = new Date(Date.now() - 90 * DAY).toISOString().slice(0, 10);
    const q = `${query} pushed:>${since} stars:>200`;
    const api = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=${sort}&order=desc&per_page=${perPage}`;

    const res = await fetch(api, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'oss-directory' },
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`GitHub search failed [${res.status}]: ${body}`);
      return json({ error: 'GitHub search failed', status: res.status, details: body }, res.status);
    }

    const data = await res.json();
    const repos: Repo[] = (data.items ?? []).map((r: Record<string, any>) => ({
      id: String(r.id),
      name: r.name,
      fullName: r.full_name,
      description: r.description ?? '',
      url: r.html_url,
      homepage: r.homepage || null,
      imageUrl: r.owner?.avatar_url ?? '',
      stars: r.stargazers_count ?? 0,
      forks: r.forks_count ?? 0,
      language: r.language ?? null,
      license: r.license?.spdx_id ?? 'Unknown',
      topics: r.topics ?? [],
      updatedAt: r.pushed_at,
      createdAt: r.created_at,
    }));

    cache.set(key, { at: Date.now(), repos });
    return json({ repos, cached: false, refreshedAt: new Date().toISOString() });
  } catch (e) {
    console.error('discover-repos error', e);
    return json({ error: String(e) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
