import { useEffect, useState } from 'react';
import { Star, GitFork, RefreshCw, ExternalLink, Sparkles } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES } from '@/lib/types';
import { formatCount } from '@/hooks/useGithubStats';

interface Repo {
  id: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  imageUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  license: string;
  topics: string[];
  updatedAt: string;
}

const Discover = () => {
  const [category, setCategory] = useState('ai-ml');
  const [search, setSearch] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);

  const load = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/discover-repos`);
      url.searchParams.set('query', query);
      url.searchParams.set('per_page', '30');
      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load repositories');
      setRepos(data.repos ?? []);
      setRefreshedAt(data.refreshedAt ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load repositories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cat = CATEGORIES.find((c) => c.id === category);
    load(cat?.query ?? 'open source');
  }, [category]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-3 gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Refreshed daily from the GitHub API
          </Badge>
          <h1 className="text-3xl font-bold mb-2">Discover new repositories</h1>
          <p className="text-muted-foreground max-w-2xl">
            A live feed of actively maintained open source projects, pulled straight from GitHub and
            refreshed every day. Pick a category or search for anything.
          </p>
          {refreshedAt && (
            <p className="text-xs text-muted-foreground mt-2">
              Last refresh: {new Date(refreshedAt).toLocaleString()}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[260px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {CATEGORIES.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <form
            className="flex flex-1 gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (search.trim()) load(search.trim());
            }}
          >
            <Input
              placeholder="Search GitHub, e.g. 'markdown editor'"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" disabled={loading} className="gap-2">
              <RefreshCw className={loading ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
              Search
            </Button>
          </form>
        </div>

        {error && <p className="text-destructive mb-6">{error}</p>}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="h-40 animate-pulse bg-muted/40" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <a key={repo.id} href={repo.url} target="_blank" rel="noopener noreferrer">
                <Card className="h-full hover:border-primary/60 hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <img
                        src={repo.imageUrl}
                        alt=""
                        loading="lazy"
                        className="h-10 w-10 rounded-md object-cover bg-muted"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-semibold truncate">{repo.name}</h3>
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{repo.fullName}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{repo.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" /> {formatCount(repo.stars)}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" /> {formatCount(repo.forks)}
                      </span>
                      {repo.language && <Badge variant="outline" className="text-xs">{repo.language}</Badge>}
                      <Badge variant="secondary" className="text-xs">{repo.license}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Discover;
