import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import { getTools } from '@/lib/storage';
import { CATEGORIES, ToolCategory } from '@/lib/types';

const Tools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') as ToolCategory | null;

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ToolCategory | 'all'>(initialCategory || 'all');

  const tools = getTools();

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        search === '' ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory = category === 'all' || tool.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [tools, search, category]);

  const handleCategoryChange = (value: string) => {
    setCategory(value as ToolCategory | 'all');
    if (value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Tools</h1>
          <p className="text-muted-foreground">
            Browse our complete collection of open source tools
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground sm:hidden" />
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {filteredTools.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No tools found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch('');
                setCategory('all');
                setSearchParams({});
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tools;
