export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const endpoints = {
  health: `${API_URL}/api/health`,
  auth: {
    login: `${API_URL}/api/auth/login`,
    signup: `${API_URL}/api/auth/signup`,
    me: `${API_URL}/api/auth/me`,
  },
  projects: {
    list: `${API_URL}/api/projects`,
    create: `${API_URL}/api/projects`,
    get: (id: string) => `${API_URL}/api/projects/${id}`,
    update: (id: string) => `${API_URL}/api/projects/${id}`,
    delete: (id: string) => `${API_URL}/api/projects/${id}`,
    stats: `${API_URL}/api/projects/stats`,
    comments: (id: string) => `${API_URL}/api/projects/${id}/comments`,
  },
}; 