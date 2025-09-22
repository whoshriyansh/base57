import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.14:8001';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
