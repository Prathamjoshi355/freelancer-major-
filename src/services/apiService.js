/**
 * FREELANCER PLATFORM - API SERVICE
 * Handles all communication between Frontend and Backend
 * Backend URL: http://localhost:8000/api/
 */

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Constants
const API_BASE_URL = 'http://localhost:8000/api';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

// Create Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Add JWT Token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem(ACCESS_TOKEN_KEY) 
      : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle Token Expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Skip retry for public endpoints (registration, login, refresh)
    const publicEndpoints = ['/accounts/register/', '/token/', '/token/refresh/'];
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      originalRequest.url.includes(endpoint)
    );
    
    if (error.response?.status === 401 && !originalRequest._retry && !isPublicEndpoint) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = typeof window !== 'undefined' 
          ? localStorage.getItem(REFRESH_TOKEN_KEY) 
          : null;
        
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/token/refresh/`,
            { refresh: refreshToken }
          );
          
          const { access } = response.data;
          localStorage.setItem(ACCESS_TOKEN_KEY, access);
          
          api.defaults.headers.common.Authorization = `Bearer ${access}`;
          originalRequest.headers.Authorization = `Bearer ${access}`;
          
          return api(originalRequest);
        }
      } catch (err) {
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// ============================================================
// AUTHENTICATION ENDPOINTS
// ============================================================

export const authAPI = {
  // Register User
  register: (data) => 
    api.post('/accounts/register/', data),
  
  // Login
  login: (email, password) =>
    api.post('/token/', { email, password }),
  
  // Refresh Token
  refreshToken: (refreshToken) =>
    api.post('/token/refresh/', { refresh: refreshToken }),
  
  // Get Current User
  getCurrentUser: () =>
    api.get('/accounts/me/'),
  
  // Logout
  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  },
};

// ============================================================
// JOB ENDPOINTS
// ============================================================

export const jobsAPI = {
  // List all jobs with filters
  getJobs: (params) =>
    api.get('/jobs/', { params }),
  
  // Get single job details
  getJob: (id) =>
    api.get(`/jobs/${id}/`),
  
  // Post new job (Client only)
  createJob: (data) =>
    api.post('/jobs/', data),
  
  // Update job (Client only)
  updateJob: (id, data) =>
    api.put(`/jobs/${id}/`, data),
  
  // Delete job (Client only)
  deleteJob: (id) =>
    api.delete(`/jobs/${id}/`),
  
  // Get my jobs
  getMyJobs: () =>
    api.get('/jobs/my_jobs/'),
  
  // Get job applications
  getJobApplications: (id) =>
    api.get(`/jobs/${id}/applications/`),
  
  // Get my proposals (Freelancer)
  getMyProposals: () =>
    api.get('/jobs/my_applications/'),
  
  // Search jobs
  searchJobs: (query, category, minBudget, maxBudget) =>
    api.get('/jobs/', {
      params: {
        search: query,
        category,
        budget_min: minBudget,
        budget_max: maxBudget,
      },
    }),
};

// ============================================================
// PROPOSAL ENDPOINTS
// ============================================================

export const proposalsAPI = {
  // List proposals
  getProposals: (params) =>
    api.get('/proposals/', { params }),
  
  // Get single proposal
  getProposal: (id) =>
    api.get(`/proposals/${id}/`),
  
  // Submit proposal
  createProposal: (data) =>
    api.post('/proposals/', data),
  
  // Accept proposal
  acceptProposal: (id) =>
    api.post(`/proposals/${id}/accept/`),
  
  // Reject proposal
  rejectProposal: (id) =>
    api.post(`/proposals/${id}/reject/`),
  
  // Withdraw proposal
  withdrawProposal: (id) =>
    api.post(`/proposals/${id}/withdraw/`),
};

// ============================================================
// PAYMENT ENDPOINTS
// ============================================================

export const paymentsAPI = {
  // Get transactions
  getTransactions: (params) =>
    api.get('/payments/transactions/', { params }),
  
  // Get single transaction
  getTransaction: (id) =>
    api.get(`/payments/transactions/${id}/`),
  
  // Create payment (initiate)
  createPayment: (data) =>
    api.post('/payments/transactions/create_payment/', data),
  
  // Confirm payment
  confirmPayment: (id) =>
    api.post(`/payments/transactions/${id}/confirm_payment/`),
  
  // Release payment (after hold period)
  releasePayment: (id) =>
    api.post(`/payments/transactions/${id}/release_payment/`),
  
  // Get payouts
  getPayouts: (params) =>
    api.get('/payments/payouts/', { params }),
  
  // Request payout
  requestPayout: (data) =>
    api.post('/payments/payouts/request_payout/', data),
};

// ============================================================
// CHAT ENDPOINTS
// ============================================================

export const chatAPI = {
  // Get conversations
  getConversations: (params) =>
    api.get('/chat/conversations/', { params }),
  
  // Get single conversation with messages
  getConversation: (id) =>
    api.get(`/chat/conversations/${id}/`),
  
  // Create or get existing conversation
  createConversation: (data) =>
    api.post('/chat/conversations/', data),
  
  // Get messages in conversation
  getMessages: (conversationId, params) =>
    api.get(`/chat/conversations/${conversationId}/messages/`, { params }),
  
  // Send message
  sendMessage: (data) =>
    api.post('/chat/messages/', data),
  
  // Mark message as read
  markMessageAsRead: (id) =>
    api.post(`/chat/messages/${id}/mark_as_read/`),
  
  // Get unread count
  getUnreadCount: () =>
    api.get('/chat/messages/unread_count/'),
};

// ============================================================
// NOTIFICATION ENDPOINTS
// ============================================================

export const notificationsAPI = {
  // Get notifications
  getNotifications: (params) =>
    api.get('/notifications/notifications/', { params }),
  
  // Mark as read
  markAsRead: (id) =>
    api.post(`/notifications/notifications/${id}/mark_as_read/`),
  
  // Mark all as read
  markAllAsRead: () =>
    api.post('/notifications/notifications/mark_all_as_read/'),
  
  // Get unread count
  getUnreadCount: () =>
    api.get('/notifications/notifications/unread_count/'),
  
  // Get notification preferences
  getPreferences: () =>
    api.get('/notifications/preferences/my_preferences/'),
  
  // Update preferences
  updatePreferences: (data) =>
    api.post('/notifications/preferences/update_preferences/', data),
};

// ============================================================
// PROFILE ENDPOINTS
// ============================================================

export const profilesAPI = {
  // Get profile by user ID
  getProfile: (id) =>
    api.get(`/profiles/profiles/${id}/`),
  
  // Get my profile
  getMyProfile: () =>
    api.get('/profiles/my_profile/'),
  
  // Update profile
  updateProfile: (data) =>
    api.post('/profiles/update_profile/', data),
  
  // Search freelancers
  searchFreelancers: (params) =>
    api.get('/profiles/freelancers/', { params }),
  
  // Get profile detail
  getProfileDetail: (id) =>
    api.get(`/profiles/${id}/`),
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

// Store authentication tokens
export const storeTokens = (accessToken, refreshToken, userData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }
};

// Get stored user data
export const getStoredUser = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

// Check if token is expired
export const isTokenExpired = (token) => {
  try {
    if (!token) return true;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// Get user role from token
export const getUserRole = () => {
  const token = typeof window !== 'undefined' 
    ? localStorage.getItem(ACCESS_TOKEN_KEY) 
    : null;
  
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch {
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = typeof window !== 'undefined' 
    ? localStorage.getItem(ACCESS_TOKEN_KEY) 
    : null;
  return token && !isTokenExpired(token);
};

export default api;
