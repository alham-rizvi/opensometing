import { useEffect, useState } from 'react';

export interface GithubStats {
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  topics: string[];
  pushedAt: string | null;
  homepage: string | null;
  watchers: number;
}

const cache = new Map<string, GithubStats>();

export const useGithubStats = (repoUrl: string | undefined) => {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const match = repoUrl?.match(/github\.com\/([^/]+\/[^/?#]+)/);
    const repo = match?.[1]?.replace(/\.git$/, '');
    if (!repo) return;

    if (cache.has(repo)) {
      setStats(cache.get(repo)!);
      return;
    }

    let active = true;
    setLoading(true);
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!active || !d) return;
        const parsed: GithubStats = {
          stars: d.stargazers_count ?? 0,
          forks: d.forks_count ?? 0,
          openIssues: d.open_issues_count ?? 0,
          language: d.language ?? null,
          topics: d.topics ?? [],
          pushedAt: d.pushed_at ?? null,
          homepage: d.homepage ?? null,
          watchers: d.subscribers_count ?? 0,
        };
        cache.set(repo, parsed);
        setStats(parsed);
      })
      .catch(() => undefined)
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [repoUrl]);

  return { stats, loading };
};

export const formatCount = (n: number): string => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
};
