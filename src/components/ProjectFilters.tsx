import { Filter } from '@/types';
import { mockCategories, mockTags } from '@/data/mockData';
import { useState } from 'react';

interface ProjectFiltersProps {
  onFilterChange: (filters: Filter) => void;
}

export default function ProjectFilters({ onFilterChange }: ProjectFiltersProps) {
  const [filters, setFilters] = useState<Filter>({
    categories: [],
    tags: [],
  });

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    const newFilters = {
      ...filters,
      categories: newCategories,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTagChange = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];

    const newFilters = {
      ...filters,
      tags: newTags,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <div className="space-y-2">
          {mockCategories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="form-checkbox"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Tags</h3>
        <div className="space-y-2">
          {mockTags.map((tag) => (
            <label key={tag} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="form-checkbox"
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 