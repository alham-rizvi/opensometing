import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryInfo } from '@/lib/types';

interface CategoryCardProps {
  category: CategoryInfo;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/tools?category=${category.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader>
          <div className="text-4xl mb-2">{category.icon}</div>
          <CardTitle className="group-hover:text-primary transition-colors">
            {category.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{category.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
