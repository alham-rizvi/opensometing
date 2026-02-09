import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tool, getCategoryName } from '@/lib/types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Link to={`/tools/${tool.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={tool.imageUrl}
                alt={tool.name}
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors truncate">
                  {tool.name}
                </CardTitle>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
              <Badge variant="secondary" className="mt-1">
                {getCategoryName(tool.category)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
          <div className="flex flex-wrap gap-1 mt-3">
            {tool.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ToolCard;
