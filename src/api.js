import axios from 'axios';
import { ACCESS_TOCKEN } from './tokens';
import { config } from 'process';
import { error } from 'console';
 
const apiUrl =                                                                                                                                "http://127.0.0.1:8000";
const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_VITA_API_URL || apiUrl,
}
);

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