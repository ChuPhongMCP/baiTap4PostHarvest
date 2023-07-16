import axios from 'axios';

export const formatter = new Intl.NumberFormat('en-US', { //format tiền tệ theo chuẩn USD
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export const axiosAdmin = axios.create({ //tùy biến axios theo base url trong .env
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosClient = axios.create({ //tùy biến axios theo base url trong .env
  baseURL: process.env.REACT_APP_BASE_URL_USER,
  headers: { "Content-Type": "application/json" },
});
