import Axios from 'axios';

export const axiosInstance = Axios.create({
  timeout: 10000,
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
});
