import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Project } from "@/types";
import { endpoints } from "@/utils/api";

const ApprovedProjects = () => {
  const [approvedProjects, setApprovedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchApprovedProjects();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const fetchApprovedProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${endpoints.projects.list}?status=approved`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch approved projects');
      }

      const data = await response.json();
      console.log('Fetched approved projects:', data);
      setApprovedProjects(data);
    } catch (error) {
      console.error('Error fetching approved projects:', error);
      toast({
        title: "Error",
        description: "Failed to load approved projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${endpoints.projects.update(id)}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ status: 'rejected' })
      });

      if (!response.ok) {
        throw new Error('Failed to reject project');
      }

      // Update local state
      setApprovedProjects(prev => prev.filter(project => project.id !== id));
      
      toast({
        title: "Project rejected",
        description: "The project has been rejected",
      });
    } catch (error) {
      console.error('Error rejecting project:', error);
      toast({
        title: "Error",
        description: "Failed to reject project",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading approved projects...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Approved Projects</h2>
      {approvedProjects.length === 0 ? (
        <p className="text-muted-foreground">No approved projects found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Approved</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {approvedProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Link to={`/projects/${project.id}`} className="font-medium hover:underline">
                    {project.title}
                  </Link>
                </TableCell>
                <TableCell>
                  {project.author?.name || 'Unknown Author'}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{project.category}</Badge>
                </TableCell>
                <TableCell>
                  {formatDate(project.createdAt)}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(project.id)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ApprovedProjects; 