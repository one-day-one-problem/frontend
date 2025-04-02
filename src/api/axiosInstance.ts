import axios, { AxiosError } from "axios";
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

// ---- 응답 인터셉터 추가: 401 응답 시 토큰 갱신 시도 ----

let isRefreshing = false; // 토큰 갱신 진행 여부를 나타내는 플래그

/**
 * 요청 재시도를 위한 대기열 아이템 인터페이스
 */
interface QueueItem {
  resolve: (value: unknown) => void; // 요청이 성공했을 때 호출될 함수
  reject: (reason?: any) => void; // 요청이 실패했을 때 호출될 함수
}

/**
 * 토큰 갱신 중에 실패한 요청들을 저장하는 대기열
 *
 * 토큰이 성공적으로 갱신되면 이 요청들을 새 토큰으로 다시 시도한다.
 */
let failedQueue: QueueItem[] = [];

/**
 * 대기 중인 요청들을 처리하는 함수
 *
 * @param error - 토큰 갱신 과정에서 발생한 오류. 오류가 있으면 대기 중인 모든 요청을 해당 오류로 reject함
 * @param token - 새로 발급받은 액세스 토큰. 오류가 없으면 이 토큰을 사용하여 대기 중인 요청들을 다시 시도함
 */
const processQueue = (error: any, token: string | null = null) => {
  // 대기 중인 모든 요청에 대해 처리
  failedQueue.forEach((prom) => {
    if (error) { // 토큰 갱신 중 오류가 발생한 경우
      prom.reject(error); // 오류를 전달하여 요청 실패 처리
    } else { // 토큰 갱신에 성공한 경우
      prom.resolve(token); // 새 토큰을 전달하여 요청 재시도
    }
  });

  // 모든 대기 요청을 처리한 후 큐 초기화
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // 토큰 만료 에러(401)이면서 이미 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        /**
         * 다른 요청이 이미 토큰을 갱신 중이면 현재 요청을 대기시킴
         * 1. 새로운 Promise를 생성하여 failedQueue에 resolve와 reject 함수를 저장
         * 2. 토큰 갱신 성공 시 이 Promise는 새 토큰과 함께 resolve됨
         * 3. 토큰 갱신 실패 시 이 Promise는 오류와 함께 reject됨
         */
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`; // 새 토큰으로 원래 요청의 인증 헤더를 업데이트
            return axiosInstance(originalRequest); // 원래 요청을 새 토큰으로 다시 시도
          })
          .catch((err) => Promise.reject(err));
      }

      // 토큰 갱신 프로세스 시작
      originalRequest._retry = true; // 현재 요청은 재시도 중임을 표시
      isRefreshing = true; // 다른 요청들이 이 갱신 프로세스를 기다리도록 플래그 설정

      try {
        // authService를 통해 새 액세스 토큰 요청
        const tokens = await authService.refreshTokens();
        const newAccessToken = tokens.accessToken;

        // 원래 요청의 인증 헤더를 새 토큰으로 업데이트
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 대기 중인 모든 요청에 새 토큰을 전달하여 처리
        processQueue(null, newAccessToken);

        // 원래 요청을 새 토큰으로 다시 시도
        return axiosInstance(originalRequest);
      } catch (refreshError) { // 토큰 갱신 중 오류 발생 시
        // 대기 중인 모든 요청에 오류 전달
        processQueue(refreshError, null);

        // 로그아웃 처리 (저장된 토큰 제거)
        authService.removeTokensFromStorage();

        // 로그인 페이지로 리다이렉트
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // 토큰 갱신 프로세스 완료 표시
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
