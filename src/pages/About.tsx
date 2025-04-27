import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="container flex flex-col items-center py-16">
          <img
            src="/images/AQcitylogo.png"
            alt="Academic City Logo"
            className="h-16 w-auto my-6"
          />
          <h1 className="text-4xl font-bold mb-3 text-primary">About CityHub</h1>
          <p className="text-lg max-w-2xl text-center text-muted-foreground mb-10">
            Hi! My name is <strong>Kwesi Koranteng</strong>, a proud second-year student at Academic City University pursuing a B.Sc. in Information Technology.
            <br /><br />
            I developed CityHub as a platform to empower fellow students to showcase their innovative projects, connect with others, and inspire campus innovation. You're welcome to browse, submit, and be inspired!
          </p>
          <div className="rounded-lg bg-primary/5 px-6 py-4 text-primary font-semibold border border-primary/10 shadow">
            Academic City University • Founded 2009
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
