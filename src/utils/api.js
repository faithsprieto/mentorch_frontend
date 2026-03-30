import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true, // remove if not using cookies
});

// ==============================
// REQUEST INTERCEPTOR (Optional)
// ==============================
api.interceptors.request.use(
  (config) => {
    // Example: attach token if stored
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==============================
// RESPONSE INTERCEPTOR (Optional)
// ==============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// ==============================
// REST METHODS
// ==============================

export const getRequest = async (url, config = {}) => {
  const response = await api.get(url, config);
  return response.data;
};

export const postRequest = async (url, data = {}, config = {}) => {
  const response = await api.post(url, data, config);
  return response.data;
};

export const putRequest = async (url, data = {}, config = {}) => {
  const response = await api.put(url, data, config);
  return response.data;
};

export const patchRequest = async (url, data = {}, config = {}) => {
  const response = await api.patch(url, data, config);
  return response.data;
};

export const deleteRequest = async (url, config = {}) => {
  const response = await api.delete(url, config);
  return response.data;
};

export default api;