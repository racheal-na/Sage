// import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// // Add token to requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Handle token expiration
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // Auth API
// export const authAPI = {
//   login: (credentials) => api.post('/auth/login', credentials),
//   register: (userData) => api.post('/auth/register', userData),
//   getProfile: () => api.get('/auth/me'),
//   updateProfile: (userData) => api.put('/auth/update', userData),
// };

// // Cases API
// export const casesAPI = {
//   getCases: () => api.get('/cases'),
//   getCase: (id) => api.get(`/cases/${id}`),
//   createCase: (caseData) => api.post('/cases', caseData),
//   updateCase: (id, caseData) => api.put(`/cases/${id}`, caseData),
//   deleteCase: (id) => api.delete(`/cases/${id}`),
//   addNote: (id, note) => api.post(`/cases/${id}/notes`, { content: note }),
// };
 
// // Documents API
// export const documentsAPI = {
//   getDocuments: (caseId) => api.get(`/cases/${caseId}/documents`),
//   uploadDocument: (caseId, formData) => api.post(`/cases/${caseId}/documents`, formData),
//   downloadDocument: (id) => api.get(`/documents/${id}/download`, { responseType: 'blob' }),
//   deleteDocument: (id) => api.delete(`/documents/${id}`),
//   getConstitutionDocuments: () => api.get('/documents/constitution'),
//   downloadConstitution: (filename) => api.get(`/documents/constitution/${filename}`, { responseType: 'blob' }),
// };

// // Appointments API
// export const appointmentsAPI = {
//   getAppointments: () => api.get('/appointments'),
//   getAppointment: (id) => api.get(`/appointments/${id}`),
//   createAppointment: (appointmentData) => api.post('/appointments', appointmentData),
//   updateAppointment: (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData),
//   deleteAppointment: (id) => api.delete(`/appointments/${id}`),
//   sendReminder: (id) => api.post(`/appointments/${id}/reminder`),
// };

// export default api;