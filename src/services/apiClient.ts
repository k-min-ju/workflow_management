import Axios from 'axios';

export const workflowAxiosInstance = Axios.create({
  timeout: 10000,
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export const webhookAxiosInstance = Axios.create({
  timeout: 10000,
  baseURL: process.env.NEXT_PUBLIC_WEBHOOK_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
});
