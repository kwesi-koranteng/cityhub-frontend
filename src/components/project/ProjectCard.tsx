import { Link } from "react-router-dom";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  // Ensure tags is always an array
  const tags = project.tags || [];

  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="aspect-video overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col items-start gap-2">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <span>{project.author?.name || 'Unknown Author'}</span>
            <span>{project.academicYear}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
