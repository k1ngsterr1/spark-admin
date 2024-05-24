import axios from "axios";
import { useEffect, useState } from "react";

// Правильная проверка наличия объекта window
const isBrowser = typeof window !== "undefined";

const data = isBrowser ? localStorage.getItem("userData") : null;
const parsedData = data ? JSON.parse(data) : null;

// Создание экземпляра Axios с предустановленными конфигурациями
export const axiosInstance = axios.create({
  baseURL: "https://spark-admin-production.up.railway.app",
});

// Добавление интерсептора ответа для обработки истечения токена
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = isBrowser
        ? localStorage.getItem("refreshToken")
        : "";

      if (refreshToken) {
        try {
          const res = await axios.post(
            `${axiosInstance.defaults.baseURL}/access`,
            { refresh: refreshToken }
          );
          if (res.status === 200) {
            if (isBrowser) {
              localStorage.setItem("accessToken", res.data.accessToken);
              localStorage.setItem("refreshToken", res.data.refreshToken);
              axiosInstance.defaults.headers.common["Authorization"] =
                `Bearer ${res.data.accessToken}`;
              originalRequest.headers["Authorization"] =
                `Bearer ${res.data.accessToken}`;
            }
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Unable to refresh token:", refreshError);
          if (isBrowser) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
          return Promise.reject(refreshError);
        }
      } else {
        console.error("No refresh token available");
        if (isBrowser) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
