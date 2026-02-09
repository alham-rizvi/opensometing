import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { getToolById } from '@/lib/storage';
import { getCategoryName } from '@/lib/types';

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const tool = id ? getToolById(id) : undefined;

  if (!tool) {
    return <Navigate to="/tools" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={tool.imageUrl}
                  alt={tool.name}
                  className="w-full h-full object-contain p-3"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
                <Badge variant="secondary" className="text-sm">
                  {getCategoryName(tool.category)}
                </Badge>
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
              <p className="text-lg text-muted-foreground">{tool.description}</p>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-4">
                <Button asChild className="w-full gap-2">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    View on GitHub
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Scale className="h-4 w-4" />
                      License
                    </span>
                    <span className="font-medium">{tool.license}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{getCategoryName(tool.category)}</span>
                  </div>

                  {tool.submittedBy && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Submitted by</span>
                      <span className="font-medium">{tool.submittedBy}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Added</span>
                    <span className="font-medium">
                      {new Date(tool.createdAt).toLocaleDateString()}
                    </span>
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
