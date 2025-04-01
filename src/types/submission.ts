import { ApiResponse } from "./api";

/**
 * 답안 제출 요청 타입
 *
 * @property answer - 제출할 답안
 *   - 객관식: 선택한 옵션 ID들을 콤마(,)로 구분하여 제출
 *   - 주관식: 작성한 답안 텍스트
 * @property duration - 문제 풀이에 소요된 시간(초)
 */
export interface SubmitAnswerRequest {
  answer: string;
  duration: number;
}

/**
 * 답안 제출 응답 타입
 *
 * @property id - 제출 고유 식별자
 * @property submittedAt - 제출 시간
 * @property isCorrect - 객관식 문제 정답 여부 (객관식인 경우에만 제공)
 * @property isPending - 채점 대기 여부 (주관식인 경우에만 제공)
 * @property score - 주관식 문제 채점 점수 (주관식인 경우에만 제공,
 * @property feedback - 주관식 문제 피드백 (주관식인 경우에만 제공)
 */
export interface Submission {
  id: number;
  submittedAt: string;
  isCorrect?: boolean;
  isPending?: boolean;
  score?: number;
  feedback?: string;
}

/**
 * 답안 제출 API 응답 타입
 */
export type SubmissionResponse = ApiResponse<Submission>;
