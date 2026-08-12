import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface CategoryIconProps extends LucideProps {
  name: string;
}

const CategoryIcon = ({ name, ...props }: CategoryIconProps) => {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name] ?? Icons.Package;
  return <Icon {...props} />;
};

export default CategoryIcon;
