import { Link } from 'react-router-dom';
import { ArrowUpRight, Scale, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tool, getCategory } from '@/lib/types';
import { openStackerScore, isSelfHostable } from '@/lib/score';
import CategoryIcon from './CategoryIcon';

interface ToolCardProps {
  tool: Tool;
}

const difficultyLabel: Record<string, string> = {
  beginner: 'Beginner friendly',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const ToolCard = ({ tool }: ToolCardProps) => {
  const category = getCategory(tool.category);

  return (
    <Link to={`/tools/${tool.id}`} className="block h-full">
      <Card className="h-full p-5 flex flex-col hover:border-primary/60 hover:shadow-md transition-all group">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={tool.imageUrl}
              alt={`${tool.name} logo`}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{tool.name}</h3>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
            {category && (
              <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <CategoryIcon name={category.icon} className="h-3.5 w-3.5" />
                {category.name}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-3 line-clamp-3 flex-1">{tool.description}</p>

        {tool.alternativeTo?.length ? (
          <p className="text-xs text-muted-foreground mt-3">
            Replaces <span className="text-foreground">{tool.alternativeTo.join(', ')}</span>
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-1.5 mt-4">
          {tool.difficulty && (
            <Badge variant="secondary" className="text-xs gap-1">
              <Star className="h-3 w-3" />
              {difficultyLabel[tool.difficulty]}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs gap-1">
            <Scale className="h-3 w-3" />
            {tool.license}
          </Badge>
          {tool.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </Card>
    </Link>
  );
};

export default ToolCard;
