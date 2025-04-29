import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Project, Comment } from "@/types";
import { endpoints } from "@/utils/api";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Accept': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(endpoints.projects.get(id), {
        headers,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }

      const data = await response.json();
      console.log('Received project data from backend:', {
        id: data.id,
        title: data.title,
        createdAt: data.createdAt,
        thumbnail: data.thumbnail,
        videoUrl: data.videoUrl,
        tags: data.tags,
        files: data.files
      });

      setProject(data);
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching project:', error);
      setError("Failed to load project details");
      toast({
        title: "Error",
        description: "Failed to load project details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: "Error",
          description: "You must be logged in to comment",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(endpoints.projects.comments(id), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ content: newComment })
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const data = await response.json();
      setComments([data.comment, ...comments]);
      setNewComment("");
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) {
      console.log('No date string provided');
      return 'No date available';
    }
    
    try {
      // Parse the date string from PostgreSQL
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.log('Invalid date:', dateString);
        return 'Invalid Date';
      }
      const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      console.log('Formatted date:', formatted);
      return formatted;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  // Function to format YouTube URL for embedding
  const formatVideoUrl = (url: string) => {
    if (!url) {
      console.log('No video URL provided');
      return null;
    }
    
    console.log('Processing video URL:', url);
    
    // Handle YouTube URLs
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        console.log('Generated YouTube embed URL:', embedUrl);
        return embedUrl;
      }
    }
    
    console.log('Using original video URL:', url);
    return url;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Error loading thumbnail:', e.currentTarget.src);
    // Use a data URL for the fallback image
    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMjI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2YzcyN2QiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBUaHVtYm5haWwgQXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-muted">
        <Navbar />
        <main className="flex-1">
          <div className="container py-8">
            <div className="text-center">
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-muted">
        <Navbar />
        <main className="flex-1">
          <div className="container py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
              <p className="text-muted-foreground mb-4">
                The project you're looking for doesn't exist or has been removed.
              </p>
              <Link
                to="/projects"
                className="text-primary hover:underline"
              >
                ← Back to Projects
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <nav className="mb-8">
            <Link
              to="/projects"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              ← Back to Projects
            </Link>
          </nav>
          
          <article className="space-y-8">
            {/* Project Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold mr-auto text-primary">{project.title}</h1>
                <Badge className="bg-primary/20 text-primary">{project.category}</Badge>
                <Badge variant="outline" className="border-primary/40 text-primary">{project.academicYear}</Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>By {project.author?.name || 'Unknown Author'}</span>
                <span>•</span>
                <span>
                  {formatDate(project.createdAt)}
                </span>
              </div>
            </div>
            
            {/* Project Image/Video */}
            <div className="aspect-video rounded-lg overflow-hidden bg-muted border border-primary/10 shadow">
              <div className="relative">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground">No thumbnail available</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Project Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4 text-primary">About this project</h2>
                <div className="prose max-w-none text-muted-foreground lead">
                  <p>{project.description}</p>
                </div>
                
                {/* Video Embed */}
                {project.videoUrl && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4 text-primary">Project Video</h3>
                    <div className="aspect-video border border-primary/10 rounded-md shadow">
                      <iframe
                        src={formatVideoUrl(project.videoUrl)}
                        className="w-full h-full rounded-md"
                        title="Project Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* Project Files */}
                {project.files && project.files.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4 text-primary">Project Files</h3>
                    <div className="space-y-2">
                      {project.files.map((file, index) => (
                        <a
                          key={index}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-lg border border-primary/10 hover:bg-primary/5 transition-colors"
                        >
                          <span className="text-sm">{file.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <div className="mt-12">
                  <h3 className="text-lg font-medium mb-4 text-primary">Comments</h3>
                  
                  {/* Comment Form */}
                  <form onSubmit={handleSubmitComment} className="mb-8">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-3 border-primary/10"
                    />
                    <Button type="submit" disabled={!newComment.trim()}>
                      Post Comment
                    </Button>
                  </form>

                  {/* Comments List */}
                  {comments.length === 0 ? (
                    <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                  ) : (
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                          <Avatar>
                            <AvatarImage src={comment.user?.avatar} />
                            <AvatarFallback>
                              {comment.user?.name?.slice(0, 2).toUpperCase() || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-primary">{comment.user?.name || 'Unknown User'}</h4>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-muted-foreground">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg p-6 border border-primary/10 shadow">
                  <h3 className="text-lg font-medium mb-4 text-primary">Project Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Author
                      </h4>
                      <p>{project.author?.name || 'Unknown Author'}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Academic Year
                      </h4>
                      <p>{project.academicYear || 'Not specified'}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Category
                      </h4>
                      <p>{project.category || 'Not specified'}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Array.isArray(project.tags) && project.tags.length > 0 ? (
                          project.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs border-primary/10 text-primary">
                              {tag}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No tags available</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Created Date
                      </h4>
                      <p>{formatDate(project.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
