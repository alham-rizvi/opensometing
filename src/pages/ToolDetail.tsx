import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Scale,
  Star,
  GitFork,
  CircleDot,
  Globe,
  Terminal,
  Monitor,
  Sparkles,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import ReviewSection from '@/components/ReviewSection';
import CategoryIcon from '@/components/CategoryIcon';
import ToolCard from '@/components/ToolCard';
import { getToolById, getTools } from '@/lib/storage';
import { getCategory } from '@/lib/types';
import { formatCount, useGithubStats } from '@/hooks/useGithubStats';

const difficultyCopy: Record<string, string> = {
  beginner: 'Anyone can use this — no technical background needed.',
  intermediate: 'Some setup or configuration required.',
  advanced: 'Built for technical users, admins or developers.',
};

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const tool = id ? getToolById(id) : undefined;
  const { stats } = useGithubStats(tool?.url);

  if (!tool) {
    return <Navigate to="/tools" replace />;
  }

  const category = getCategory(tool.category);
  const related = getTools()
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-20 h-20 rounded-xl bg-muted overflow-hidden shrink-0">
                <img
                  src={tool.imageUrl}
                  alt={`${tool.name} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
                {category && (
                  <Link to={`/tools?category=${category.id}`}>
                    <Badge variant="secondary" className="gap-1.5">
                      <CategoryIcon name={category.icon} className="h-3.5 w-3.5" />
                      {category.name}
                    </Badge>
                  </Link>
                )}
              </div>
            </div>

            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Star className="h-3 w-3" /> Stars
                  </p>
                  <p className="text-lg font-semibold">{formatCount(stats.stars)}</p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <GitFork className="h-3 w-3" /> Forks
                  </p>
                  <p className="text-lg font-semibold">{formatCount(stats.forks)}</p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <CircleDot className="h-3 w-3" /> Open issues
                  </p>
                  <p className="text-lg font-semibold">{formatCount(stats.openIssues)}</p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Last update
                  </p>
                  <p className="text-lg font-semibold">
                    {stats.pushedAt ? new Date(stats.pushedAt).toLocaleDateString() : '—'}
                  </p>
                </Card>
              </div>
            )}

            <p className="text-lg text-muted-foreground mb-6">{tool.description}</p>

            {tool.longDescription && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">What it does</h2>
                <p className="text-muted-foreground leading-relaxed">{tool.longDescription}</p>
              </section>
            )}

            {tool.difficulty && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Who is it for?</h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {difficultyCopy[tool.difficulty]}
                </p>
              </section>
            )}

            {tool.alternativeTo?.length ? (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Use it instead of</h2>
                <div className="flex flex-wrap gap-2">
                  {tool.alternativeTo.map((alt) => (
                    <Badge key={alt} variant="secondary">
                      {alt}
                    </Badge>
                  ))}
                </div>
              </section>
            ) : null}

            {tool.install && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  How to get started
                </h2>
                <pre className="bg-muted rounded-lg p-4 text-sm whitespace-pre-wrap">{tool.install}</pre>
              </section>
            )}

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {[...tool.tags, ...(stats?.topics ?? [])]
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .slice(0, 14)
                  .map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
              </div>
            </section>

            <ReviewSection toolId={tool.id} toolName={tool.name} />

            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Similar tools</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((t) => (
                    <ToolCard key={t.id} tool={t} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="md:col-span-1">
            <Card className="md:sticky md:top-24">
              <CardContent className="p-6 space-y-4">
                <Button asChild className="w-full gap-2">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    View source
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>

                {(tool.website || stats?.homepage) && (
                  <Button asChild variant="outline" className="w-full gap-2">
                    <a href={tool.website || stats?.homepage || '#'} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4" />
                      Official website
                    </a>
                  </Button>
                )}

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Scale className="h-4 w-4" /> License
                    </span>
                    <span className="font-medium">{tool.license}</span>
                  </div>

                  {stats?.language && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Language</span>
                      <span className="font-medium">{stats.language}</span>
                    </div>
                  )}

                  {tool.platforms?.length ? (
                    <div className="flex items-start justify-between py-2 border-b gap-3">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Monitor className="h-4 w-4" /> Platforms
                      </span>
                      <span className="font-medium text-right">{tool.platforms.join(', ')}</span>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{category?.name ?? tool.category}</span>
                  </div>

                  {tool.submittedBy && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Submitted by</span>
                      <span className="font-medium">{tool.submittedBy}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Added</span>
                    <span className="font-medium">{new Date(tool.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ToolDetail;
