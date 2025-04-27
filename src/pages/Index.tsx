import { Link, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedProjects from "@/components/project/FeaturedProjects";
import { mockCategories } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUploadClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload a project",
        variant: "destructive",
      });
      navigate('/login');
    } else {
      navigate('/upload-project');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="py-16 md:py-24 gradient-bg text-white relative bg-blend-soft-light bg-cover bg-center"
          style={{
            backgroundImage: `url('https://citinewsroom.com/wp-content/uploads/2023/06/academic-city-new-.jpg')`,
          }}
        >
          <div className="absolute inset-0 gradient-bg opacity-80"></div>
          <div className="container mx-auto text-center space-y-8 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto drop-shadow">
              Akwaaba!, Showcase Your Wildest Dreams Here!
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              A platform for Academic City students to share and discover innovative projects and ideas.
            </p>
            <div className="flex justify-center gap-4">
              <Button className={cn(buttonVariants({ variant: "secondary", size: "lg" }))} asChild>
                <Link to="/projects">Explore Projects</Link>
              </Button>
              <Button 
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "bg-white/10 hover:bg-white/20 border-primary/70 text-primary"
                )} 
                onClick={handleUploadClick}
              >
                Upload Your Project
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Projects */}
        <FeaturedProjects />
        
        {/* Categories Section */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Project Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {mockCategories.map((category) => (
                <Link 
                  key={category}
                  to={`/projects?category=${encodeURIComponent(category)}`}
                  className="bg-white rounded-lg shadow-sm p-6 text-center transition-all hover:shadow-md border border-primary/10"
                >
                  <h3 className="text-xl font-semibold mb-2 text-primary">{category}</h3>
                  <p className="text-muted-foreground">
                    Discover innovative {category.toLowerCase()} projects
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-innovation-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold text-primary">Ready to Showcase Your Innovation?</h2>
              <p className="text-xl text-muted-foreground">
                Join our community of innovators and share your projects with the world.
              </p>
              <Button className={cn(buttonVariants({ size: "lg" }), "gradient-bg")} asChild>
                <Link to="/signup">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
