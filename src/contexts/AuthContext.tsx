import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import authService from "../utils/authService";
import { AuthTokens } from "../types/auth";

/**
 * 인증 관련 기능을 제공하는 컨텍스트의 타입 정의
 *
 * @interface AuthContextType
 * @property isAuthenticated - 사용자 인증 상태
 * @property saveTokens - 인증 토큰을 저장하는 함수
 * @property logout - 로그아웃 처리 함수
 * @property getAuthHeaders - API 요청에 사용할 인증 헤더를 반환하는 함수
 */
interface AuthContextType {
  isAuthenticated: boolean;
  saveTokens: (tokens: AuthTokens) => void;
  logout: () => void;
  getAuthHeaders: () => Record<string, string>;
}

/**
 * 인증 관련 기능을 제공하는 React 컨텍스트
 * 초기값은 undefined로 설정되어 있으며, AuthProvider 내에서 실제 값이 제공됨
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 인증 컨텍스트의 값을 사용하기 위한 커스텀 훅
 *
 * @returns 인증 관련 상태와 메서드를 포함하는 객체
 * @throws Error AuthProvider 외부에서 호출될 경우 에러 발생
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * 인증 상태를 관리하고 자식 컴포넌트에게 인증 관련 기능을 제공하는 프로바이더 컴포넌트
 *
 * @param props - 컴포넌트 프로퍼티
 * @param props.children - 자식 컴포넌트
 * @returns AuthContext.Provider 컴포넌트
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  /**
   * 사용자 인증 상태를 관리하는 상태
   * 초기값은 로컬 스토리지에 저장된 토큰의 존재 여부에 따라 결정됨
   */
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    authService.isAuthenticated()
  );

  /**
   * 컴포넌트 마운트 시 인증 상태 초기화
   * 로컬 스토리지의 토큰 존재 여부를 확인하여 인증 상태를 설정
   */
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  /**
   * 컨텍스트를 통해 제공할 값 객체
   * 인증 상태와 관련된 메서드들을 포함
   */
  const value: AuthContextType = {
    isAuthenticated,

    /**
     * 인증 토큰을 저장하고 인증 상태를 갱신하는 함수
     *
     * @param tokens - 저장할 액세스 토큰과 리프레시 토큰
     */
    saveTokens: (tokens) => {
      authService.saveTokensToStorage(tokens);
      setIsAuthenticated(true);
    },

    /**
     * 사용자 로그아웃을 처리하는 함수
     * 토큰을 삭제하고 인증 상태를 false로 설정
     */
    logout: () => {
      authService.removeTokensFromStorage();
      setIsAuthenticated(false);
    },

    /**
     * API 요청에 필요한 인증 헤더를 가져오는 함수
     *
     * @returns 인증 헤더 객체
     */
    getAuthHeaders: authService.getAuthHeaders,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
