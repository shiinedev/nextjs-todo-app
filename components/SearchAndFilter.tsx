import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search} from 'lucide-react';
import { FilterType} from '@/app/types/todos';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    completed: number;
    active: number;
  };
}

export function SearchAndFilter({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  stats,
}: SearchAndFilterProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters and Sort */}
    
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('all')}
            className="flex items-center gap-2"
          >
            All
            <Badge variant="secondary" className="text-xs">
              {stats.total}
            </Badge>
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('active')}
            className="flex items-center gap-2"
          >
            Active
            <Badge variant="secondary" className="text-xs">
              {stats.active}
            </Badge>
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('completed')}
            className="flex items-center gap-2"
          >
            Completed
            <Badge variant="secondary" className="text-xs">
              {stats.completed}
            </Badge>
          </Button>
        </div>
      </div>
    
  );
}