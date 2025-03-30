import axiosInstance from "./axiosInstance";
import {
  ProblemCategory,
  ProblemDifficulty,
  ProblemListResponse,
  ProblemSortType,
  ProblemType,
} from "../types/problem";

/**
 * 문제 목록 조회 API의 매개변수 타입
 *
 * @property page - 요청할 페이지 번호(0부터 시작)
 * @property size - 페이지당 항목 수
 * @property category - 필터링할 카테고리
 * @property difficulty - 필터링할 난이도
 * @property type - 필터링할 문제 유형
 * @property sortType - 정렬 기준
 * @property onlyUnsolved - 미해결 문제만 필터링(인증된 사용자만 가능)
 */
interface GetProblemsParams {
  page?: number;
  size?: number;
  category?: ProblemCategory | null;
  difficulty?: ProblemDifficulty | null;
  type?: ProblemType | null;
  sortType?: ProblemSortType;
  onlyUnsolved?: boolean;
}

/**
 * 문제 관련 API 호출을 처리하는 객체
 */
const problemApi = {
  /**
   * 문제 목록을 불러오는 API
   *
   * 인증된 사용자인 경우: 해결 여부(isSolved) 정보가 포함됨
   * 비인증 사용자인 경우: 해결 여부 정보가 포함되지 않음
   *
   * @param params - 조회 매개변수
   * @returns 문제 목록 응답
   */
  getProblems: async ({
    page = 0,
    size = 12,
    category = null,
    difficulty = null,
    type = null,
    sortType = ProblemSortType.MOST_SOLVED,
    onlyUnsolved = false,
  }: GetProblemsParams): Promise<ProblemListResponse> => {
    // API 호출 시 파라미터 설정
    const params: Record<string, any> = {
      page,
      size,
      sortType,
    };

    // 선택적 파라미터는 값이 있을 때만 추가
    if (category) params.category = category;
    if (difficulty) params.difficulty = difficulty;
    if (type) params.type = type;
    if (onlyUnsolved) params.onlyUnsolved = true;

    try {
      // API 호출
      const response = await axiosInstance.get<ProblemListResponse>(
        "/api/problems",
        { params }
      );

      return response.data;
    } catch (error) {
      console.error("문제 목록 조회 중 오류 발생:", error);
      throw error;
    }
  },
};

export default problemApi;
