import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PendingProjects from "@/components/admin/PendingProjects";
import ApprovedProjects from "@/components/admin/ApprovedProjects";
import ContentModeration from "@/components/admin/ContentModeration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  totalProjects: number;
  pendingProjects: number;
  approvedProjects: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    pendingProjects: 0,
    approvedProjects: 0
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:5000/api/projects/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive",
      });
    }
  };

  const checkAdminStatus = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Checking admin status with token:', token);

      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(`Failed to verify admin status: ${data.message || response.statusText}`);
      }

      if (data.role !== 'admin') {
        throw new Error('Not authorized as admin');
      }

      setIsAdmin(true);
      // Fetch dashboard stats after confirming admin status
      await fetchDashboardStats();
    } catch (error) {
      console.error('Admin check error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      toast({
        title: "Access Denied",
        description: error instanceof Error ? error.message : "You must be an admin to access this page",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we verify your access.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Access Denied</h2>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          {/* Dashboard Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-innovation-50 rounded-lg p-6">
              <h3 className="font-medium text-innovation-700 mb-1">Total Projects</h3>
              <p className="text-3xl font-bold">{stats.totalProjects}</p>
            </div>
            <div className="bg-innovation-50 rounded-lg p-6">
              <h3 className="font-medium text-innovation-700 mb-1">Pending Approvals</h3>
              <p className="text-3xl font-bold">{stats.pendingProjects}</p>
            </div>
            <div className="bg-innovation-50 rounded-lg p-6">
              <h3 className="font-medium text-innovation-700 mb-1">Approved Projects</h3>
              <p className="text-3xl font-bold">{stats.approvedProjects}</p>
            </div>
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList className="mb-6">
              <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
              <TabsTrigger value="approved">Approved Projects</TabsTrigger>
              <TabsTrigger value="moderation">Content Moderation</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <PendingProjects />
            </TabsContent>
            
            <TabsContent value="approved">
              <ApprovedProjects />
            </TabsContent>
            
            <TabsContent value="moderation">
              <ContentModeration />
            </TabsContent>
            
            <TabsContent value="users">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">User Management</h2>
                <p className="text-muted-foreground">
                  This section is under development. You'll be able to manage users and their roles here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
