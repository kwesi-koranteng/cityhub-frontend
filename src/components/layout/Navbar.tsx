import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  // Mock auth state (to be replaced with real auth later)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-4">
            <img
              src="/images/AQcitylogo.png"
              alt="Academic City University Logo"
              className="h-12 w-auto"
            />
            <span className="text-xl font-bold" style={{ color: '#E31837' }}>
              CityHub
            </span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link
              to="/projects"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Projects
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                  aria-label="User menu"
                >
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-projects">My Projects</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleLogin}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="sm" className="gradient-bg" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
              {/* 
                Quick admin demo entry point (visible for all users for now).
                In production you'd hide/show this with real role logic.
              */}
              <Button variant="link" size="sm" className="text-primary underline" asChild>
                <Link to="/login?admin=1">Admin Login</Link>
              </Button>
            </>
          )}
          <div className="hidden">
            <Button
              size="sm"
              variant="outline"
              onClick={toggleLogin}
              className="ml-2"
            >
              Toggle Login (Demo)
            </Button>
            {isLoggedIn && (
              <Button
                size="sm"
                variant="outline"
                onClick={toggleAdmin}
                className="ml-2"
              >
                Toggle Admin (Demo)
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
