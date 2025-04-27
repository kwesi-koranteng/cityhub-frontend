import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockCategories, mockTags, mockYears } from "@/data/mockData";
import { Filter } from "@/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  onFilterChange: (filters: Filter) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState<Filter>({
    search: "",
    tags: [],
    categories: [],
    academicYear: [],
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, onFilterChange]);

  const handleTagSelect = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      setFilters(prev => ({
        ...prev,
        categories: [],
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        categories: [value],
      }));
    }
  };

  const handleYearChange = (value: string) => {
    if (value === "all") {
      setFilters(prev => ({
        ...prev,
        academicYear: [],
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        academicYear: [value],
      }));
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      tags: [],
      categories: [],
      academicYear: [],
    });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search projects..."
        value={filters.search}
        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
        className="w-full"
      />
      
      <div className="flex flex-wrap gap-2">
        <Select 
          value={filters.categories[0] || "all"} 
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {mockCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={filters.academicYear?.[0] || "all"} 
          onValueChange={handleYearChange}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {mockYears.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          onClick={handleClearFilters}
          className="ml-auto"
        >
          Clear Filters
        </Button>
      </div>

      <div className="flex flex-wrap gap-1">
        {mockTags.map((tag) => (
          <Badge
            key={tag}
            className={cn(
              "cursor-pointer transition-colors border border-border",
              filters.tags.includes(tag) 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
            onClick={() => handleTagSelect(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
