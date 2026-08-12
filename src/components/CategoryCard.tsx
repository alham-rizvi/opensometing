import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { CategoryInfo } from '@/lib/types';
import CategoryIcon from './CategoryIcon';

interface CategoryCardProps {
  category: CategoryInfo;
  count?: number;
}

const CategoryCard = ({ category, count }: CategoryCardProps) => {
  return (
    <Link to={`/tools?category=${category.id}`} className="block h-full">
      <Card className="h-full p-5 hover:border-primary/60 hover:shadow-md transition-all cursor-pointer group">
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <CategoryIcon name={category.icon} className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{category.description}</p>
            {typeof count === 'number' && (
              <p className="text-xs text-muted-foreground mt-2">{count} tools</p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
