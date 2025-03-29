/**
 * 서버 API 응답 데이터 타입
 */
export interface ApiResponse<T> {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  data: T;
}

/**
 * 페이징 처리된 API 응답 데이터 타입
 */
export interface PageInfo {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
  empty: boolean;
}
