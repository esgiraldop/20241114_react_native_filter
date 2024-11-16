import axios, {AxiosInstance} from 'axios';
import {getAsyncStorageValue} from '../utilities/get-async-storage-contents.utility';

export const baseURL =
  'https://maintenancesystembc-production.up.railway.app/api/v1';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export const privateAxiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

privateAxiosInstance.interceptors.request.use(
  async config => {
    const token = await getAsyncStorageValue('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const privateAxiosInstanceFormData: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

privateAxiosInstanceFormData.interceptors.request.use(
  async config => {
    const token = await getAsyncStorageValue('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
