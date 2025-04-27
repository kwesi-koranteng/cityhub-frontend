import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
