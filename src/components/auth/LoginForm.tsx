import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const adminLogin = params.get("admin");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First check if server is running
      try {
        const healthCheck = await fetch('http://localhost:5000/api/health', {
          credentials: 'include'
        });
        if (!healthCheck.ok) {
          throw new Error('Server is not responding');
        }
      } catch (error) {
        console.error('Server health check failed:', error);
        toast({
          title: "Connection Error",
          description: "Cannot connect to the server. Please make sure the backend server is running.",
          variant: "destructive",
        });
        return;
      }

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        console.log('Token stored:', data.token);

        toast({
          title: "Logged in successfully",
          description: adminLogin
            ? "Welcome, Admin! Redirecting to dashboard."
            : "Welcome back to CityHub",
        });

        // Corrected Redirects
        if (adminLogin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        console.error('Login failed:', data);
        toast({
          title: "Login failed",
          description: data.message || "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <img
        src="/images/AQcitylogo.png"
        alt="Academic City Logo"
        className="h-16 w-auto mb-4"
      />
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        {adminLogin ? (
          <p className="text-muted-foreground font-medium">
            Admin access – login to manage projects & approvals
          </p>
        ) : (
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="your@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          className="w-full gradient-bg"
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? (adminLogin ? "Logging in as Admin..." : "Logging in...")
            : (adminLogin ? "Admin Log in" : "Log in")}
        </Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {adminLogin ? (
            <>
              Not an admin?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Standard Login
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
