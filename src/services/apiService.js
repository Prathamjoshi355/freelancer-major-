import axios from "axios";

import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA } from "@/tokens";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicEndpoints = [
  "/accounts/register/",
  "/accounts/token/",
  "/accounts/token/refresh/",
];

function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN);
}

function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN);
}

export function storeSession(accessToken, refreshToken, user) {
  if (typeof window === "undefined") return;
  if (accessToken) localStorage.setItem(ACCESS_TOKEN, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN, refreshToken);
  if (user) localStorage.setItem(USER_DATA, JSON.stringify(user));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(USER_DATA);
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_DATA);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function normalizeApiError(error) {
  const responseData = error?.response?.data;
  if (!responseData) return "Something went wrong.";
  if (typeof responseData.detail === "string") return responseData.detail;
  const firstEntry = Object.values(responseData)[0];
  if (Array.isArray(firstEntry)) return firstEntry[0];
  if (typeof firstEntry === "string") return firstEntry;
  return "Something went wrong.";
}

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  const isPublic = publicEndpoints.some((endpoint) => config.url?.includes(endpoint));
  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isPublic = publicEndpoints.some((endpoint) => originalRequest?.url?.includes(endpoint));
    if (error.response?.status === 401 && !originalRequest?._retry && !isPublic) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearSession();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/accounts/token/refresh/`, {
          refresh: refreshToken,
        });
        const access = response.data.access;
        storeSession(access, refreshToken, getStoredUser());
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearSession();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (payload) => api.post("/accounts/register/", payload),
  login: (email, password) => api.post("/accounts/token/", { email, password }),
  fetchMe: () => api.get("/accounts/me/"),
  verifyFace: (face_image) => api.post("/accounts/face-verify/", { face_image }),
  logout: clearSession,
};

export const profilesAPI = {
  getMe: () => api.get("/profiles/me/"),
  updateMe: (payload) => api.put("/profiles/me/", payload),
  listFreelancers: (params) => api.get("/profiles/freelancers/", { params }),
};

export const skillsAPI = {
  listCatalog: () => api.get("/skill-tests/catalog/"),
  getMine: () => api.get("/skill-tests/me/"),
  select: (skill_slugs) => api.post("/skill-tests/select/", { skill_slugs }),
  start: (skillSlug) => api.post(`/skill-tests/${skillSlug}/start/`),
  submit: (skillSlug, payload) => api.post(`/skill-tests/${skillSlug}/submit/`, payload),
};

export const jobsAPI = {
  list: (params) => api.get("/jobs/", { params }),
  create: (payload) => api.post("/jobs/", payload),
  get: (jobId) => api.get(`/jobs/${jobId}/`),
  update: (jobId, payload) => api.patch(`/jobs/${jobId}/`, payload),
  mine: () => api.get("/jobs/my/"),
};

export const bidsAPI = {
  list: (params) => api.get("/bids/", { params }),
  create: (payload) => api.post("/bids/", payload),
  action: (bidId, action) => api.post(`/bids/${bidId}/${action}/`),
};

export const contractsAPI = {
  list: () => api.get("/jobs/contracts/"),
  get: (contractId) => api.get(`/jobs/contracts/${contractId}/`),
  complete: (contractId, payload) => api.post(`/jobs/contracts/${contractId}/complete/`, payload),
  reviewClient: (contractId, payload) => api.post(`/jobs/contracts/${contractId}/client-feedback/`, payload),
};

export const chatAPI = {
  getConversation: (contractId) => api.get(`/chat/contracts/${contractId}/`),
  analyzeProtection: (payload) => {
    const formData = new FormData();
    if (payload?.content) formData.append("content", payload.content);
    if (payload?.file) formData.append("file", payload.file);
    return api.post("/chat/protection/analyze/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  sendMessage: (contractId, payload) => {
    if (payload instanceof FormData) {
      return api.post(`/chat/contracts/${contractId}/messages/`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    if (typeof payload === "object" && payload !== null && payload.file) {
      const formData = new FormData();
      if (payload.content) formData.append("content", payload.content);
      formData.append("file", payload.file);
      return api.post(`/chat/contracts/${contractId}/messages/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    if (typeof payload === "object" && payload !== null) {
      return api.post(`/chat/contracts/${contractId}/messages/`, {
        content: payload.content ?? "",
      });
    }

    return api.post(`/chat/contracts/${contractId}/messages/`, { content: payload });
  },
};

export const paymentsAPI = {
  list: () => api.get("/payments/"),
  createOrder: (contractId) => api.post(`/payments/contracts/${contractId}/create-order/`),
  verify: (paymentId, payload) => api.post(`/payments/${paymentId}/verify/`, payload),
};

// Compatibility exports used by older generated pages.
export const proposalsAPI = {
  getProposals: bidsAPI.list,
  createProposal: (payload) =>
    bidsAPI.create({
      job_id: payload.job_id,
      bid_amount: payload.bid_amount ?? payload.proposed_amount,
      proposal: payload.proposal ?? payload.cover_letter,
    }),
  acceptProposal: (id) => bidsAPI.action(id, "hire"),
  rejectProposal: (id) => bidsAPI.action(id, "reject"),
  withdrawProposal: (id) => bidsAPI.action(id, "withdraw"),
};

export default api;
