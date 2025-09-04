import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = (email, password) => {
  return api.post('/auth/login', { email, password }).then((res) => res.data);
};

export  async  function register (userData) {
  console.log("Start")
  return api.post('/auth/register', userData).then((res) => res.data);
};

export const getProfile = () => {
  return api.get('/auth/profile').then((res) => res.data);
};

// Cases API
export const getCases = () => {
  return api.get('/cases').then((res) => res.data);
};

export const getCase = (id) => {
  return api.get(`/cases/${id}`).then((res) => res.data);
};

export const createCase = (caseData) => {
  return api.post('/cases', caseData).then((res) => res.data);
};

export const updateCase = (id, caseData) => {
  return api.put(`/cases/${id}`, caseData).then((res) => res.data);
};

export const deleteCase = (id) => {
  return api.delete(`/cases/${id}`).then((res) => res.data);
};

// Documents API
export const getCaseDocuments = (caseId) => {
  return api.get(`/documents/case/${caseId}`).then((res) => res.data);
};

export const uploadDocument = (formData) => {
  return api.post('/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => res.data);
};

export const downloadDocument = (id) => {
  return api.get(`/documents/download/${id}`, {
    responseType: 'blob',
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', true);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

// Appointments API
export const getAppointments = () => {
  return api.get('/appointments').then((res) => res.data);
};

export const createAppointment = (appointmentData) => {
  return api.post('/appointments', appointmentData).then((res) => res.data);
};

export const updateAppointment = (id, appointmentData) => {
  return api.put(`/appointments/${id}`, appointmentData).then((res) => res.data);
};

export const deleteAppointment = (id) => {
  return api.delete(`/appointments/${id}`).then((res) => res.data);
};

// Constitution API
export const getConstitution = () => {
  return api.get('/constitution').then((res) => res.data);
};

export const downloadConstitution = (id) => {
  return api.get(`/constitution/download/${id}`, {
    responseType: 'blob',
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', true);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

// Search API
export const search = (query) => {
  return api.get(`/search?q=${query}`).then((res) => res.data);
};

// Admin API
export const getUsers = () => {
  return api.get('/admin/users').then((res) => res.data);
};

export const getUserDetails = (id) => {
  return api.get(`/admin/users/${id}`).then((res) => res.data);
};

export const updateUser = (id, userData) => {
  return api.put(`/admin/users/${id}`, userData).then((res) => res.data);
};

export const deleteUser = (id) => {
  return api.delete(`/admin/users/${id}`).then((res) => res.data);
};

export const getAdminStats = () => {
  return api.get('/admin/stats').then((res) => res.data);
};

// Calendar API
export const exportCalendar = () => {
  return api.get('/calendar/export-ics', {
    responseType: 'blob',
    }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'legal-ease-calendar.ics');
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

export const syncWithGoogle = (code) => {
  return api.post('/calendar/sync-google', { code }).then((res) => res.data);
};

export default api;