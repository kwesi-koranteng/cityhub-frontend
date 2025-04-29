import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { endpoints } from '@/utils/api';

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  academicYear: string;
  thumbnail: string;
  tags: string[];
  videoUrl: string;
  projectFiles: File[];
}

const defaultThumbnails = [
  "https://th.bing.com/th/id/OIP.OACmP6GQapaMmDQxj9guvgHaHJ?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.7T8gJCW11R29gj3PRhfrhwAAAA?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.cRZKM0zd0u0eUtR8XiUZuwHaD3?w=325&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"
];

const ProjectUploadForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    category: '',
    academicYear: '',
    thumbnail: '',
    tags: [],
    videoUrl: '',
    projectFiles: []
  });
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [thumbnailError, setThumbnailError] = useState<string>('');
  const [isThumbnailLoading, setIsThumbnailLoading] = useState(false);

  // Fallback image in base64 format
  const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMjI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2YzcyN2QiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBUaHVtYm5haWwgQXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Reset thumbnail error and loading state when URL changes
    if (name === 'thumbnail') {
      setThumbnailError('');
      setIsThumbnailLoading(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === 'projectFiles') {
        setFormData(prev => ({
          ...prev,
          projectFiles: Array.from(files)
        }));
      }
    }
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      // Split by commas and trim each tag
      const newTags = tagInput.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag && !formData.tags.includes(tag));

      if (newTags.length > 0) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, ...newTags]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleThumbnailError = () => {
    setThumbnailError('Failed to load image. Please check the URL.');
    setIsThumbnailLoading(false);
  };

  const handleThumbnailLoad = () => {
    setIsThumbnailLoading(false);
    setThumbnailError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to submit a project');
      }

      // Validate required fields
      if (!formData.title || !formData.description || !formData.category || !formData.academicYear) {
        throw new Error('Please fill in all required fields');
      }

      // Create FormData object
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('category', formData.category.trim());
      formDataToSend.append('academicYear', formData.academicYear.trim());
      formDataToSend.append('tags', JSON.stringify(formData.tags));
      
      // Add optional fields if they exist
      if (formData.videoUrl && formData.videoUrl.trim() !== '') {
        formDataToSend.append('videoUrl', formData.videoUrl.trim());
      }

      // Add thumbnail if provided
      if (formData.thumbnail && formData.thumbnail.trim() !== '') {
        formDataToSend.append('thumbnail', formData.thumbnail.trim());
      }

      // Add project files
      formData.projectFiles.forEach((file) => {
        formDataToSend.append('projectFiles', file);
      });

      console.log('Submitting project with data:', {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        academicYear: formData.academicYear,
        tags: formData.tags,
        videoUrl: formData.videoUrl,
        hasThumbnail: !!formData.thumbnail,
        projectFilesCount: formData.projectFiles.length,
        token: token ? 'Token present' : 'No token'
      });

      // Make the request
      const response = await fetch(endpoints.projects.create, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();
      console.log('Upload response:', {
        status: response.status,
        statusText: response.statusText,
        data: data
      });

      if (!response.ok) {
        console.error('Server response error:', {
          status: response.status,
          statusText: response.statusText,
          data: data
        });
        
        // Construct a more detailed error message
        let errorMessage = data.message || 'Failed to upload project';
        if (data.error) {
          errorMessage += `: ${data.error}`;
        }
        if (data.detail) {
          errorMessage += ` (${data.detail})`;
        }
        
        throw new Error(errorMessage);
      }

      // Success
      toast({
        title: "Success",
        description: "Project uploaded successfully",
      });
      navigate('/projects');
    } catch (err) {
      console.error('Upload error:', {
        error: err,
        message: err.message,
        stack: err.stack
      });
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Submit Your Project</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 placeholder-gray-400"
                placeholder="Enter your project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900"
              >
                <option value="">Select a category</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile Development</option>
                <option value="ai">AI/ML</option>
                <option value="data">Data Science</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Academic Year *</label>
              <input
                type="text"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleInputChange}
                required
                placeholder="e.g., 2024"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 placeholder-gray-400"
                placeholder="Describe your project..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Tags</label>
              <div className="mt-1">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Add tags (comma-separated)"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 placeholder-gray-400"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Video URL</label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Thumbnail URL</label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-900 placeholder-gray-400"
              />
              <p className="mt-1 text-sm text-gray-600">
                Enter a URL to an image that will be used as the project thumbnail
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Project Files</label>
              <input
                type="file"
                name="projectFiles"
                onChange={handleFileChange}
                multiple
                className="mt-1 block w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="mt-1 text-sm text-gray-600">
                You can select multiple files. Supported formats: PDF, DOC, DOCX, ZIP, RAR
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 font-medium text-lg shadow-sm transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectUploadForm;
