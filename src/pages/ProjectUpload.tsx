import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectUploadForm from '../components/project/ProjectUploadForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ProjectUpload: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      <main className="flex-1">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Share Your Innovation
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Upload your project and join our community of innovators. Showcase your work to inspire others and get valuable feedback.
              </p>
            </div>

            {/* Form Container with Card Style */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-200">
              <ProjectUploadForm />
            </div>

            {/* Additional Info Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-primary text-2xl mb-4">📚</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Academic Focus</h3>
                <p className="text-gray-700">Share your academic projects and research with the Academic City community.</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-primary text-2xl mb-4">💡</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Innovation Showcase</h3>
                <p className="text-gray-700">Highlight your innovative solutions and creative approaches to real-world problems.</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-primary text-2xl mb-4">🤝</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Community Engagement</h3>
                <p className="text-gray-700">Get feedback, connect with peers, and collaborate on future projects.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectUpload; 