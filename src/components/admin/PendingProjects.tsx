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

const PendingProjects = () => {
  const [pendingProjects, setPendingProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingProjects();
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

  const fetchPendingProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Making request to:', `${endpoints.projects.list}?status=pending`);
      console.log('Request headers:', {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      });

      const response = await fetch(`${endpoints.projects.list}?status=pending`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to fetch pending projects');
      }

      const data = await response.json();
      console.log('Raw response data:', data);
      console.log('Fetched pending projects:', data);
      console.log('Number of pending projects:', data.length);
      console.log('First project (if any):', data[0]);
      console.log('First project author info:', data[0]?.author);
      
      setPendingProjects(data);
    } catch (error) {
      console.error('Error fetching pending projects:', error);
      toast({
        title: "Error",
        description: "Failed to load pending projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
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
        body: JSON.stringify({ status: 'approved' })
      });

      if (!response.ok) {
        throw new Error('Failed to approve project');
      }

      // Update local state
      setPendingProjects(prev => prev.filter(project => project.id !== id));
      
      toast({
        title: "Project approved",
        description: "The project has been published successfully",
      });
    } catch (error) {
      console.error('Error approving project:', error);
      toast({
        title: "Error",
        description: "Failed to approve project",
        variant: "destructive",
      });
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
      setPendingProjects(prev => prev.filter(project => project.id !== id));
      
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
    return <div>Loading pending projects...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Pending Projects</h2>
      {pendingProjects.length === 0 ? (
        <p className="text-muted-foreground">No pending projects to review.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingProjects.map((project) => (
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
                  <Button
                    size="sm"
                    onClick={() => handleApprove(project.id)}
                  >
                    Approve
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

export default PendingProjects;
