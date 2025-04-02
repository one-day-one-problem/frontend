import { AuthTokens } from "../types/auth";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

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
};

export default authService;
