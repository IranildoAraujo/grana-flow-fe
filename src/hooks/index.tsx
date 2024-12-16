import axios, { AxiosHeaders } from 'axios';
import { useAuth } from '../context/AuthContext';

export const useAuthenticatedHttpClient = () => {
  const { getAuthHeaders } = useAuth();

  const httpClient = axios.create();

  httpClient.interceptors.request.use((config) => {
    const authHeaders = getAuthHeaders();
    if (authHeaders) {
      const axiosHeaders = new AxiosHeaders({
        ...config.headers,
        ...authHeaders,
      });
      config.headers = axiosHeaders;
    }
    return config;
  });

  return httpClient;
};
