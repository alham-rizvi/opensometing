import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Search,
  Users,
  Radar,
  ShieldCheck,
  Flame,
  Star,
  Clock,
  TrendingUp,
  Wallet,
  Server,
  Bot,
  Layers,
  Check,
  X,
  AlertTriangle,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import { getTools } from '@/lib/storage';
import { CATEGORIES, CATEGORY_GROUPS, Tool } from '@/lib/types';
import { byNewest, byScore, isAiTool, isSelfHostable, openStackerScore } from '@/lib/score';
import heroImage from '@/assets/hero-stack.jpg';

const Section = ({
  icon: Icon,
  title,
  subtitle,
  tools,
}: {
  icon: typeof Flame;
  title: string;
  subtitle: string;
  tools: Tool[];
}) => {
  if (!tools.length) return null;
  return (
    <section className="py-12 px-4 border-t">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              {title}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
          </div>
          <Link to="/tools" className="shrink-0">
            <Button variant="ghost" size="sm" className="gap-1">
              See all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const tools = getTools();
  const countFor = (categoryId: string) => tools.filter((t) => t.category === categoryId).length;

  const popular = [...tools].sort(byScore).slice(0, 6);
  const trending = [...tools].filter((t) => t.featured).sort(byNewest).slice(0, 6);
  const recent = [...tools].sort(byNewest).slice(0, 6);
  const saas = tools.filter((t) => t.alternativeTo?.length).sort(byScore).slice(0, 6);
  const selfHosted = tools.filter(isSelfHostable).sort(byScore).slice(0, 6);
  const ai = tools.filter(isAiTool).sort(byScore).slice(0, 6);

  // Proprietary -> open source mapping, built from the catalogue itself
  const alternativeMap = new Map<string, Tool[]>();
  tools.forEach((tool) =>
    tool.alternativeTo?.forEach((prop) => {
      alternativeMap.set(prop, [...(alternativeMap.get(prop) ?? []), tool]);
    })
  );
  const swaps = [...alternativeMap.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 12);

  const avgScore = tools.length
    ? Math.round(tools.reduce((sum, t) => sum + openStackerScore(t), 0) / tools.length)
    : 0;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <img
          src={heroImage}
          alt="Layered isometric illustration representing an open source software stack"
          width={1600}
          height={912}
          className="absolute inset-0 h-full w-full object-cover opacity-40 dark:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="container mx-auto relative px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-background/80 backdrop-blur mb-6 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            Stack your software with open source
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight max-w-4xl mx-auto">
            Find the open-source alternative
            <span className="text-muted-foreground"> before you pay for the proprietary one</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Open Stacker is a community-curated directory of {tools.length}+ open-source projects across{' '}
            {CATEGORIES.length} categories — for developers, businesses and anyone who has never opened a
            terminal in their life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/tools">
              <Button size="lg" className="gap-2">
                <Search className="h-5 w-5" />
                Browse the directory
              </Button>
            </Link>
            <Link to="/discover">
              <Button size="lg" variant="outline" className="gap-2">
                <Radar className="h-5 w-5" />
                Fresh repos daily
              </Button>
            </Link>
            <Link to="/submit">
              <Button size="lg" variant="ghost" className="gap-2">
                <Plus className="h-5 w-5" />
                Add an alternative
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {[
              { label: 'Curated projects', value: `${tools.length}+` },
              { label: 'Categories', value: `${CATEGORIES.length}` },
              { label: 'Avg. Stacker Score', value: `${avgScore}` },
              { label: 'Cost & tracking', value: '$0' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Swap table */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Swap what you pay for</h2>
            <p className="text-muted-foreground">
              Popular proprietary products and the open-source projects that replace them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {swaps.map(([proprietary, list]) => (
              <Card key={proprietary} className="p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span className="font-medium text-foreground">{proprietary}</span>
                  <ArrowRight className="h-4 w-4" />
                  <span>open source</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {list.slice(0, 4).map((t) => (
                    <Link key={t.id} to={`/tools/${t.id}`}>
                      <Badge variant="secondary" className="gap-1 hover:bg-accent transition-colors">
                        {t.name}
                        <ArrowUpRight className="h-3 w-3" />
                      </Badge>
                    </Link>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 px-4 bg-muted/30 border-y">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-2 text-center">Why the open stack wins</h2>
          <p className="text-muted-foreground text-center mb-8">
            The same comparison we run on every project in the directory.
          </p>
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/60">
                <tr>
                  <th className="text-left font-medium p-4">Feature</th>
                  <th className="font-medium p-4">Proprietary tool</th>
                  <th className="font-medium p-4">Open-source alternative</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Source code you can read', 'no', 'yes'],
                  ['Self-hostable', 'no', 'yes'],
                  ['Free to use', 'warn', 'yes'],
                  ['Privacy focused', 'warn', 'yes'],
                  ['Public repository & issues', 'no', 'yes'],
                  ['Survives the company shutting down', 'no', 'yes'],
                ].map(([feature, left, right]) => (
                  <tr key={feature} className="border-t">
                    <td className="p-4">{feature}</td>
                    {[left, right].map((v, i) => (
                      <td key={i} className="p-4 text-center">
                        {v === 'yes' ? (
                          <Check className="h-4 w-4 mx-auto text-primary" />
                        ) : v === 'no' ? (
                          <X className="h-4 w-4 mx-auto text-muted-foreground" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 mx-auto text-muted-foreground" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Discovery rows */}
      <Section icon={Flame} title="Trending open source" subtitle="Projects the community is talking about right now" tools={trending} />
      <Section icon={Star} title="Most popular" subtitle="The established, battle-tested picks with the highest Stacker Score" tools={popular} />
      <Section icon={Wallet} title="Replace expensive SaaS" subtitle="Drop the subscription, keep the feature set" tools={saas} />
      <Section icon={Server} title="Self-hostable" subtitle="Run it on your own machine, VPS or homelab" tools={selfHosted} />
      <Section icon={Bot} title="AI alternatives" subtitle="Open models, local inference and open-source AI tooling" tools={ai} />
      <Section icon={Clock} title="Recently added" subtitle="The newest entries in the directory" tools={recent} />

      {/* How we score */}
      <section className="py-16 px-4 border-t">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              The Open Stacker Score
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every project gets a single number out of 100 so you can judge in seconds whether a repository
              is actually worth trying.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              'Project activity & release cadence',
              'Community size and contributors',
              'License & openness',
              'Documentation quality',
              'Issue and PR responsiveness',
              'Self-hosting support',
              'Beginner friendliness',
              'Security practices',
            ].map((f) => (
              <Card key={f} className="p-4 text-sm text-muted-foreground">
                {f}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why open source */}
      <section className="py-16 px-4 border-t">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: 'Nothing to hide',
              body: 'Anyone can read the code, so bugs, tracking and backdoors get found and fixed in the open.',
            },
            {
              icon: Users,
              title: 'Built by communities',
              body: 'Thousands of volunteers, students and companies maintain these projects together.',
            },
            {
              icon: Layers,
              title: 'Yours forever',
              body: 'No subscription, no vendor lock-in and no feature you paid for disappearing overnight.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-muted/30 border-t">
        <div className="container mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Browse {CATEGORIES.length} categories</h2>
            <p className="text-muted-foreground">
              From everyday apps for non-technical people to advanced infrastructure.
            </p>
          </div>

          {CATEGORY_GROUPS.map((group) => (
            <div key={group} className="mb-10">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                {group}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CATEGORIES.filter((c) => c.group === group).map((category) => (
                  <CategoryCard key={category.id} category={category} count={countFor(category.id)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Know a project that deserves more users?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Open Stacker is community-maintained. Submit a project, suggest an alternative, or review the tools
            you already use.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup">
              <Button size="lg">Create a free account</Button>
            </Link>
            <Link to="/tools">
              <Button size="lg" variant="outline">
                Start exploring
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
