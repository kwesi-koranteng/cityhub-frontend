
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
