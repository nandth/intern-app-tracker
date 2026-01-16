import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service for application operations
const applicationService = {
  // Get all applications with optional filters
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    
    const response = await api.get(`/applications?${params.toString()}`);
    return response.data;
  },

  // Get a single application by ID
  getById: async (id) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  // Create a new application
  create: async (applicationData) => {
    const response = await api.post('/applications', applicationData);
    return response.data;
  },

  // Update an existing application
  update: async (id, applicationData) => {
    const response = await api.put(`/applications/${id}`, applicationData);
    return response.data;
  },

  // Delete an application
  delete: async (id) => {
    await api.delete(`/applications/${id}`);
  },
};

export default applicationService;
