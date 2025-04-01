import axiosInstance from "./axiosInstance";
import { SubmissionResponse, SubmitAnswerRequest } from "../types/submission";

/**
 * 문제 답안 제출 관련 API 호출을 처리하는 객체
 */
const submissionApi = {
  /**
   * 답안을 제출하는 API
   *
   * @param problemId - 문제 ID
   * @param data - 제출할 답안 데이터 (답변 내용과 소요 시간)
   * @returns 제출 결과 정보
   */
  submitAnswer: async (
    problemId: string | number,
    data: SubmitAnswerRequest
  ): Promise<SubmissionResponse> => {
    try {
      // API 호출
      const response = await axiosInstance.post<SubmissionResponse>(
        `/api/problems/${problemId}/submissions`,
        data
      );

      return response.data;
    } catch (error) {
      console.error(`문제 ID ${problemId} 답변 제출 중 오류 발생:`, error);
      throw error;
    }
  },
};

export default submissionApi;
