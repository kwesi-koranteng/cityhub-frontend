import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types";
import { useToast } from "@/hooks/use-toast";

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Accept': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('http://localhost:5000/api/projects?status=approved', {
        headers,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch featured projects');
      }

      const data = await response.json();
      // Get the 3 most recent approved projects
      const recentProjects = data
        .sort((a: Project, b: Project) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 3);
      
      setFeaturedProjects(recentProjects);
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      toast({
        title: "Error",
        description: "Failed to load featured projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
          <div className="text-center">
            <p>Loading featured projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
        {featuredProjects.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground">No featured projects available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Button asChild>
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
