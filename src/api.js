import axios from 'axios';
import { ACCESS_TOCKEN } from './tokens';
import { config } from 'process';
import { error } from 'console';
 
const apiUrl = 'http://localhost:8000/api';
const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_VITA_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || apiUrl,
});

api.interceptors.request.use(
    (config) =>{
        const accessToken = localStorage.getItem(ACCESS_TOCKEN);
       if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      } 
      const google_access_token = localStorage.getItem('GOOGLE_ACCESS_TOKEN');
      if (google_access_token) {
        config.headers['google_access_token'] = google_access_token;
      }
      return config; 
    },
    (error) => {
      return Promise.reject(error);
    }
);
export default api;