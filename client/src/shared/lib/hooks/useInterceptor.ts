"use client";
import axios from "axios";

const data = localStorage.getItem("userData");
const parsedData = JSON.parse(data!);

// Создание экземпляра Axios с предустановленными конфигурациями
export const axiosInstance = axios.create({
  baseURL: "https://spark-admin-production.up.railway.app",
});

// Добавление интерсептора для вставки JWT в заголовки каждого запроса
axiosInstance.interceptors.request.use(
  (config) => {
    // Получение токена из локального хранилища
    const token = parsedData.accessToken;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавление интерсептора ответа для обработки истечения токена
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const res = await axios.post(
            `${axiosInstance.defaults.baseURL}/access`,
            {
              refresh: refreshToken,
            }
          );
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            axiosInstance.defaults.headers.common["Authorization"] =
              `Bearer ${res.data.accessToken}`;
            originalRequest.headers["Authorization"] =
              `Bearer ${res.data.accessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Unable to refresh token:", refreshError);
          // Очистить токены и обработать ошибку
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(refreshError);
        }
      } else {
        console.error("No refresh token available");
        // Очистить токены и обработать ошибку
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
