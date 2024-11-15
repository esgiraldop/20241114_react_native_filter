import axios, {AxiosInstance} from 'axios';
import {WEATHER_API_KEY} from '@env';
import {getAsyncStorageValue} from '../utilities/get-async-storage-contents.utility';

export const baseURL =
  'https://maintenancesystembc-production.up.railway.app/api/v1';

export const weatherBaseURL = 'https://api.openweathermap.org/data/2.5/weather';

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

export const weatherAxiosInstance: AxiosInstance = axios.create({
  baseURL: weatherBaseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    appid: `${WEATHER_API_KEY}`,
    lang: 'en',
    units: 'metric',
  },
});
