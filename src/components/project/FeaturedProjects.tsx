import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { endpoints } from "@/utils/api";

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      // First try to fetch without any token
      console.log('Fetching featured projects without authentication...');
      const publicResponse = await fetch(`${endpoints.projects.list}?status=approved`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('Public response status:', publicResponse.status);

      if (!publicResponse.ok) {
        // If public request fails, try with token
        const token = localStorage.getItem('token');
        if (token) {
          console.log('Public request failed, trying with authentication...');
          const authenticatedResponse = await fetch(`${endpoints.projects.list}?status=approved`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          console.log('Authenticated response status:', authenticatedResponse.status);

          if (!authenticatedResponse.ok) {
            throw new Error(`HTTP error! status: ${authenticatedResponse.status}`);
          }

          const data = await authenticatedResponse.json();
          console.log('Authenticated projects data:', data);
          
          const recentProjects = data
            .sort((a: Project, b: Project) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .slice(0, 3);
          
          setFeaturedProjects(recentProjects);
          return;
        }
        throw new Error(`HTTP error! status: ${publicResponse.status}`);
      }

      const data = await publicResponse.json();
      console.log('Public projects data:', data);

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
        description: "Failed to load featured projects. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Button asChild variant="outline">
            <Link to="/projects">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
