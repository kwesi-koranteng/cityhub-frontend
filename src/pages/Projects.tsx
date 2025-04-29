import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/project/ProjectCard";
import FilterBar from "@/components/project/FilterBar";
import { Filter, Project } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { endpoints } from "@/utils/api";

const Projects = () => {
  const location = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [filters, setFilters] = useState<Filter>({
    search: "",
    tags: [],
    categories: [],
    academicYear: [],
  });

  // Parse URL parameters for initial filter state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam],
      }));
    }
  }, [location.search]);

  // Fetch projects with filters
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const headers: HeadersInit = {
          'Accept': 'application/json'
        };

        // Build query string
        const queryParams = new URLSearchParams();
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.categories.length > 0) queryParams.append('category', filters.categories[0]);
        if (filters.academicYear.length > 0) queryParams.append('academicYear', filters.academicYear[0]);
        queryParams.append('status', 'approved');

        const response = await fetch(`${endpoints.projects.list}?${queryParams.toString()}`, {
          headers,
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error",
          description: "Failed to load projects",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filters, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Browse Projects</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
              <div className="sticky top-6">
                <FilterBar onFilterChange={setFilters} />
              </div>
            </aside>
            
            <div className="lg:w-3/4">
              {loading ? (
                <div className="text-center py-12">
                  <p>Loading projects...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-xl font-medium mb-2">No projects found</h2>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to find more results.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground mb-4">
                    Found {projects.length} projects
                  </p>
                  <div className="project-card-grid">
                    {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
