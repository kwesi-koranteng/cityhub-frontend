import { Project, User, Comment } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Najart Awuni Rauf',
    email: 'najart.awuni@acity.edu.gh',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Arnold Kimkpe',
    email: 'arnold.kimkpe@acity.edu.gh',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Kwesi Koranteng',
    email: 'kwesi.koranteng@acity.edu.gh',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Climate Change Solution',
    description: 'A machine learning approach to predicting and mitigating climate change effects using satellite imagery and weather data.',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    author: {
      id: '1',
      name: 'Najart Awuni Rauf'
    },
    tags: ['AI', 'Machine Learning', 'Climate'],
    academicYear: '2023',
    category: 'Computer Science',
    status: 'approved',
    createdAt: '2023-10-15',
    files: [
      {
        name: 'Project Report.pdf',
        url: '#',
        type: 'pdf'
      }
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'Blockchain-Based Voting System',
    description: 'A secure, transparent voting platform built on blockchain technology to ensure election integrity.',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    author: {
      id: '2',
      name: 'Arnold Kimkpe'
    },
    tags: ['Blockchain', 'Security', 'Voting'],
    academicYear: '2023',
    category: 'Information Technology',
    status: 'approved',
    createdAt: '2023-09-20',
    files: [
      {
        name: 'Technical Documentation.pdf',
        url: '#',
        type: 'pdf'
      }
    ]
  },
  {
    id: '3',
    title: 'Smart Urban Farming Solution',
    description: 'An IoT-based system for urban farming that optimizes water usage and crop yield using sensors and automation.',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    author: {
      id: '3',
      name: 'Kwesi Koranteng'
    },
    tags: ['IoT', 'Agriculture', 'Sustainability'],
    academicYear: '2022',
    category: 'Engineering',
    status: 'approved',
    createdAt: '2022-11-05'
  },
  {
    id: '4',
    title: 'Augmented Reality Education Platform',
    description: 'An AR application that transforms learning experiences by bringing textbook content to life through interactive 3D visualizations.',
    thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    author: {
      id: '4',
      name: 'Hashmi Hooria'
    },
    tags: ['AR', 'Education', 'Mobile'],
    academicYear: '2022',
    category: 'Computer Science',
    status: 'approved',
    createdAt: '2022-12-10',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '5',
    title: 'Renewable Energy Management System',
    description: 'A smart grid solution for optimizing energy distribution from renewable sources like solar and wind.',
    thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    author: {
      id: '1',
      name: 'Najart Awuni Rauf'
    },
    tags: ['Renewable Energy', 'Smart Grid', 'Sustainability'],
    academicYear: '2023',
    category: 'Engineering',
    status: 'pending',
    createdAt: '2023-11-01'
  },
  {
    id: '6',
    title: 'AI-Driven Medical Diagnosis Tool',
    description: 'A deep learning application that assists doctors in diagnosing diseases from medical imaging with high accuracy.',
    thumbnail: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    author: {
      id: '6',
      name: 'Kofi Assan'
    },
    tags: ['AI', 'Healthcare', 'Deep Learning'],
    academicYear: '2023',
    category: 'Health Sciences',
    status: 'pending',
    createdAt: '2023-10-28'
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    projectId: '1',
    userId: '2',
    userName: 'Mr. Julius Amegadzie',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    content: 'This project has great potential for real-world applications. I particularly like the approach to data collection and analysis.',
    createdAt: '2023-11-10'
  },
  {
    id: '2',
    projectId: '1',
    userId: '3',
    userName: 'Mr. Navel Sharma',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    content: 'Excellent work on the algorithm optimization. The performance metrics are impressive.',
    createdAt: '2023-11-12'
  },
  {
    id: '3',
    projectId: '2',
    userId: '1',
    userName: 'Michael Osei Dei',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    content: 'The security measures implemented in this blockchain solution are well thought out. Have you considered integration with existing voting systems?',
    createdAt: '2023-10-05'
  }
];

export const mockTags = ['AI', 'Machine Learning', 'Blockchain', 'IoT', 'AR', 'Mobile', 'Security', 'Sustainability', 'Healthcare', 'Education', 'Renewable Energy', 'Climate'];
export const mockCategories = ['Computer Science', 'Information Technology', 'Engineering', 'Health Sciences', 'Business', 'Arts'];
export const mockYears = ['2023', '2022', '2021', '2020'];
