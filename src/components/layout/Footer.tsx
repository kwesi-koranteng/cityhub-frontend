import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/AQcitylogo.png"
              alt="Academic City University Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-primary">
              CityHub
            </span>
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Showcasing tomorrow's innovations, today.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm">
          <Link
            to="/projects"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Browse Projects
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            to="#"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Terms
          </Link>
          <Link
            to="#"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy
          </Link>
        </div>
        <div className="text-xs text-muted-foreground">
          © 2023 CityHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
