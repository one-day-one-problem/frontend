import { AuthTokens } from "../types/auth";

const AUTH_TOKEN_KEY = "haruhana_auth_tokens";

/**
 * 인증 관련 유틸리티 서비스
 */
const authService = {
  /**
   * 로컬 스토리지에 인증 토큰을 저장하는 함수
   */
  saveTokensToStorage(tokens: AuthTokens): void {
    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(tokens));
  },

  /**
   * 로컬 스토리지에서 인증 토큰을 가져오는 함수
   */
  getTokensFromStorage(): AuthTokens | null {
    const tokensStr = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!tokensStr) return null;

    try {
      return JSON.parse(tokensStr) as AuthTokens;
    } catch (error) {
      console.error("토큰 파싱 오류:", error);
      return null;
    }
  },

  /**
   * 액세스 토큰만 가져오는 함수
   */
  getAccessToken(): string | null {
    return this.getTokensFromStorage()?.accessToken || null;
  },

  /**
   * 로컬 스토리지에서 인증 토큰을 삭제하는 함수
   */
  removeTokensFromStorage(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  /**
   * 사용자가 로그인되어 있는지 확인하는 함수
   */
  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  },

  /**
   * API 요청에 사용할 인증 헤더를 생성하는 함수
   */
  getAuthHeaders(): Record<string, string> {
    const accessToken = this.getAccessToken();
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  },
};

export default authService;
