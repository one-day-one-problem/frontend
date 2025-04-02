import axios from "axios";
import { ApiResponse } from "../types/api";
import {
  AuthTokens,
  TokenRefreshRequestDto,
  TokenRefreshResponse,
} from "../types/auth";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const API_URL = process.env.REACT_APP_API_URL || "";

/**
 * 인증 관련 유틸리티 서비스
 */
const authService = {
  /**
   * 로컬 스토리지에 토큰을 저장하는 함수
   */
  saveTokensToStorage: (tokens: AuthTokens): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  },

  /**
   * 로컬 스토리지에서 토큰을 제거하는 함수
   */
  removeTokensFromStorage: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  /**
   * 액세스 토큰을 가져오는 함수
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  /**
   * 리프레시 토큰을 가져오는 함수
   */
  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * 인증 여부를 확인하는 함수
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  /**
   * API 요청용 인증 헤더를 생성하는 함수
   */
  getAuthHeaders: (): Record<string, string> => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  /**
   * 토큰 갱신 요청을 보내는 함수
   */
  refreshTokens: async (): Promise<AuthTokens> => {
    const refreshToken = authService.getRefreshToken();

    if (!refreshToken) {
      throw new Error("리프레시 토큰이 없습니다.");
    }

    try {
      const requestData: TokenRefreshRequestDto = { refreshToken };

      const response = await axios.post<ApiResponse<TokenRefreshResponse>>(
        `${API_URL}/api/auth/refresh`,
        requestData
      );

      if (!response.data.isSuccess) {
        throw new Error("토큰 갱신에 실패했습니다.");
      }

      const newTokens: AuthTokens = {
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      };

      authService.saveTokensToStorage(newTokens);
      return newTokens;
    } catch (error) {
      authService.removeTokensFromStorage();
      throw error;
    }
  },
};

export default authService;
