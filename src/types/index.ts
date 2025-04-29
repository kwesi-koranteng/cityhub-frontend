export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author?: {
    id: string;
    name: string;
  };
  author_name?: string;
  author_email?: string;
  tags: string[];
  academicYear: string;
  academic_year?: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  comments?: Comment[];
  files?: {
    name: string;
    url: string;
    type: string;
  }[];
  videoUrl?: string;
}

export interface Comment {
  id: string;
  projectId: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface Filter {
  search?: string;
  categories: string[];
  tags: string[];
  academicYear?: string[];
}
