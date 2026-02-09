import { Link } from 'react-router-dom';
import { ArrowRight, Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import { getTools } from '@/lib/storage';
import { CATEGORIES } from '@/lib/types';

const Index = () => {
  const tools = getTools();
  const featuredTools = tools.filter((t) => t.featured).slice(0, 6);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6">
            <Star className="h-4 w-4" />
            <span className="text-sm">Curated Open Source Tools</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Discover the Best
            <br />
            <span className="text-muted-foreground">Open Source Tools</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A curated directory of high-quality open source software. Find tools for AI, 
            development, design, security, and more — all free and community-driven.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools">
              <Button size="lg" className="gap-2">
                Browse All Tools
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/submit">
              <Button size="lg" variant="outline" className="gap-2">
                <Github className="h-5 w-5" />
                Submit a Tool
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground">
              Explore tools organized by their primary use case
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Tools</h2>
              <p className="text-muted-foreground">
                Popular and highly-rated open source projects
              </p>
            </div>
            <Link to="/tools">
              <Button variant="outline" className="gap-2 hidden sm:flex">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/tools">
              <Button variant="outline" className="gap-2">
                View All Tools
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Have an Open Source Project?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Share your open source tool with our community. It's free to submit 
            and helps others discover great software.
          </p>
          <Link to="/signup">
            <Button size="lg">
              Create Account & Submit
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
