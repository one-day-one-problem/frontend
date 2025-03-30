import axios from "axios";
import authService from "../utils/authService";

const API_URL = process.env.REACT_APP_API_URL || "";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가: 모든 요청에 인증 토큰 자동 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
