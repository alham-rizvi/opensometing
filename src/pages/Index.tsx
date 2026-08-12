import { Link } from 'react-router-dom';
import { ArrowRight, Github, Sparkles, Search, Users, Radar, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import { getTools } from '@/lib/storage';
import { CATEGORIES, CATEGORY_GROUPS } from '@/lib/types';

const Index = () => {
  const tools = getTools();
  const featuredTools = tools.filter((t) => t.featured).slice(0, 6);

  const countFor = (categoryId: string) => tools.filter((t) => t.category === categoryId).length;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="container mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-background/80 backdrop-blur mb-6 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            Our motto: enlighten people about open source
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight max-w-4xl mx-auto">
            Free software that respects you —
            <span className="text-muted-foreground"> for everyone, not just coders</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {tools.length}+ hand-picked projects across {CATEGORIES.length} categories, plus a live feed of new
            repositories every day. Replace expensive subscriptions with software you actually own.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/tools">
              <Button size="lg" className="gap-2">
                <Search className="h-5 w-5" />
                Browse all tools
              </Button>
            </Link>
            <Link to="/discover">
              <Button size="lg" variant="outline" className="gap-2">
                <Radar className="h-5 w-5" />
                Daily new repos
              </Button>
            </Link>
            <Link to="/submit">
              <Button size="lg" variant="ghost" className="gap-2">
                <Github className="h-5 w-5" />
                Submit a tool
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {[
              { label: 'Curated tools', value: `${tools.length}+` },
              { label: 'Categories', value: `${CATEGORIES.length}` },
              { label: 'Cost to you', value: '$0' },
              { label: 'Tracking', value: 'None' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
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
              icon: Sparkles,
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
      <section className="py-16 px-4 bg-muted/30">
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

      {/* Featured */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured tools</h2>
              <p className="text-muted-foreground">Projects we recommend to almost everybody</p>
            </div>
            <Link to="/tools">
              <Button variant="outline" className="gap-2 hidden sm:flex">
                View all
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Know a project that deserves more users?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Submit it, review the tools you use, and help someone escape another subscription.
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
