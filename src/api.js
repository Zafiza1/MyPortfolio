import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const verifyToken = async () => {
  const response = await api.get('/auth/verify');
  return response.data.user;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Projects
export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProject = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (project) => {
  const response = await api.post('/projects', project);
  return response.data;
};

export const updateProject = async (id, project) => {
  const response = await api.put(`/projects/${id}`, project);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

// Certificates
export const getCertificates = async () => {
  const response = await api.get('/certificates');
  return response.data;
};

export const createCertificate = async (img) => {
  const response = await api.post('/certificates', { Img: img });
  return response.data;
};

export const deleteCertificate = async (id) => {
  const response = await api.delete(`/certificates/${id}`);
  return response.data;
};

// Comments
export const getComments = async () => {
  const response = await api.get('/comments');
  return response.data;
};

export const createComment = async (comment) => {
  const response = await api.post('/comments', comment);
  return response.data;
};

export const updateComment = async (id, comment) => {
  const response = await api.put(`/comments/${id}`, comment);
  return response.data;
};

export const pinComment = async (id, isPinned) => {
  const response = await api.patch(`/comments/${id}/pin`, { is_pinned: isPinned });
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};

// Upload
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api;
