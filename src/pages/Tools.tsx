import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import CategoryIcon from '@/components/CategoryIcon';
import { getTools } from '@/lib/storage';
import { CATEGORIES, CATEGORY_GROUPS, getCategory } from '@/lib/types';

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;

const Tools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<string>('all');
  const category = searchParams.get('category') || 'all';

  const tools = getTools();

  const filteredTools = useMemo(() => {
    const q = search.toLowerCase();
    return tools.filter((tool) => {
      const matchesSearch =
        q === '' ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        (tool.alternativeTo ?? []).some((a) => a.toLowerCase().includes(q)) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchesCategory = category === 'all' || tool.category === category;
      const matchesDifficulty = difficulty === 'all' || tool.difficulty === difficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [tools, search, category, difficulty]);

  const handleCategoryChange = (value: string) => {
    if (value === 'all') searchParams.delete('category');
    else searchParams.set('category', value);
    setSearchParams(searchParams);
  };

  const active = getCategory(category);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            {active && <CategoryIcon name={active.icon} className="h-7 w-7 text-primary" />}
            {active ? active.name : 'All Tools'}
          </h1>
          <p className="text-muted-foreground">
            {active ? active.description : 'Browse our complete collection of open source software'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, tag or the paid app it replaces…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-[240px]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORY_GROUPS.map((group) => (
                <SelectGroup key={group}>
                  <SelectLabel>{group}</SelectLabel>
                  {CATEGORIES.filter((c) => c.group === group).map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Any level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any level</SelectItem>
              {DIFFICULTIES.map((d) => (
                <SelectItem key={d} value={d}>
                  {d[0].toUpperCase() + d.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(category !== 'all' || difficulty !== 'all' || search) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {active && (
              <Badge variant="secondary" className="gap-1">
                {active.name}
                <button onClick={() => handleCategoryChange('all')} aria-label="Clear category">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {difficulty !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {difficulty}
                <button onClick={() => setDifficulty('all')} aria-label="Clear level">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {filteredTools.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                setDifficulty('all');
                setSearchParams({});
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tools;
