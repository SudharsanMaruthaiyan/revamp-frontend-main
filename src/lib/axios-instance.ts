"use client";

import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const baseAdminURL = process.env.NEXT_PUBLIC_BASE_ADMIN_URL;
export const baseAppURL = process.env.NEXT_PUBLIC_BASE_APP_URL;
export const baseGoogleURL = process.env.NEXT_PUBLIC_GOOGLE_BASE_URL;

export const axiosBase = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const axiosAdminInstance = axios.create({
  baseURL: baseAdminURL,
  headers: {
    "Content-Type": "application/json",
  }
});

export const axiosAppInstance = axios.create({
  baseURL: baseAppURL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const axiosGoogleInstance = axios.create({
  baseURL: baseGoogleURL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosInstance;