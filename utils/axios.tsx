import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import EventEmitter from 'events';

// Event emitter instance
export const eventEmitter = new EventEmitter();

// Create Axios instance with base URL from environment variable
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.HOST_API_KEY || '',
});

// Response interceptor with type safety
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const response = error.response;

    if (response?.status === 401) {
      eventEmitter.emit('sessionExpired', 'unauthorized');
    } else if (response?.status === 500) {
      eventEmitter.emit('noNetwork', 'noNetwork');
    }

    return Promise.reject((response?.data as unknown) || 'Something went wrong');
  }
);

export default axiosInstance;
