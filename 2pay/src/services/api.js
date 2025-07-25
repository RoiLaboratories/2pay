import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Enable sending cookies and auth headers
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const poolService = {
  async getPoolStatus(tier) {
    const response = await api.get(`/api/pools/${tier}`);
    return response.data;
  },

  async getPayoutQueue(tier) {
    const response = await api.get(`/api/pools/${tier}/queue`);
    return response.data;
  },

  async registerContribution(tier, txHash) {
    const response = await api.post('/api/contribute', { tier, txHash });
    return response.data;
  }
};

export default api;