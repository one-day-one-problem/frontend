export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenRefreshRequestDto {
  refreshToken: string;
}

export interface TokenRefreshResponse {
  tokenType: string;
  role: string;
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}
