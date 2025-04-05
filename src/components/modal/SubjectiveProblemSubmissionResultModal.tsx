import React from "react";
import { Link } from "react-router-dom";
import {
  CATEGORY_LABELS,
  Problem,
  ProblemCategory,
  ProblemSummary,
} from "../../types/problem";
import { getDifficultyClass } from "../../utils/problemStyles";

/**
 * SubjectiveProblemSubmissionResultModal 컴포넌트의 Props 인터페이스
 */
interface SubjectiveProblemSubmissionResultModalProps {
  /** 사용자가 답안을 제출한 문제 정보 **/
  problem: Problem;
  /** 사용자가 답안을 제출한 문제와 관련된 문제 목록 **/
  relatedProblems: ProblemSummary[];
  /** 관련 문제 로딩 상태 **/
  loadingRelated: boolean;
  /** 모달을 닫는 함수 **/
  onClose: () => void;
}

/**
 * 주관식 문제 제출 결과를 표시하는 모달 컴포넌트
 *
 * @param problem 사용자가 답안을 제출한 문제 정보
 * @param relatedProblems 사용자가 답안을 제출한 문제와 관련된 문제 목록
 * @param loadingRelated 관련 문제 로딩 상태
 * @param onClose 모달을 닫는 함수
 */
function SubjectiveProblemSubmissionResultModal({
  problem,
  relatedProblems,
  loadingRelated,
  onClose,
}: SubjectiveProblemSubmissionResultModalProps) {
  /**
   * 관련 문제 목록을 표시하는 컴포넌트
   */
  const RelatedProblemsPreview = () => {
    if (relatedProblems.length === 0) {
      if (loadingRelated) {
        return (
          <div className="py-3 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#4B49AC] mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">관련 문제를 불러오는 중...</p>
          </div>
        );
      }
      return (
        <p className="text-sm text-gray-500 text-center py-2">
          관련 문제가 없습니다.
        </p>
      );
    }

    return (
      <div className="my-6 border-y border-gray-200 pt-5">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          같은 주제의 다른 문제
        </h3>
        <div className="space-y-3">
          {relatedProblems.map((relatedProblem) => (
            <Link
              key={relatedProblem.id}
              to={`/problems/${relatedProblem.id}`}
              className="block bg-gray-50 hover:bg-gray-100 p-3 rounded-lg text-left transition-colors"
              onClick={onClose}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-[#2D2B55] text-sm line-clamp-1 flex-1 mr-2">
                  {relatedProblem.title}
                </h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getDifficultyClass(
                    relatedProblem.difficulty
                  )}`}
                >
                  {relatedProblem.difficulty === "EASY"
                    ? "입문"
                    : relatedProblem.difficulty === "MEDIUM"
                    ? "중급"
                    : "고급"}
                </span>
              </div>
            </Link>
          ))}
        </div>
        {relatedProblems.length > 0 && (
          <div className="my-4 text-center">
            <Link
              to={`/problems?category=${problem.category}`}
              onClick={onClose}
              className="text-sm text-[#4B49AC] hover:underline"
            >
              {CATEGORY_LABELS[problem.category as ProblemCategory] ||
                problem.category}{" "}
              관련 문제 더 보기 →
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <svg
          className="w-10 h-10 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          ></path>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        답안이 제출되었습니다
      </h2>
      <p className="text-gray-600 mb-5">
        제출하신 답안은 AI를 통해
        <br />
        자동으로 검토되며,
        <br />곧 피드백이 제공됩니다.
      </p>

      <RelatedProblemsPreview />

      <div className="mt-6">
        <button
          onClick={onClose}
          className="w-full bg-[#4B49AC] text-white py-3 rounded-lg hover:bg-[#3D3C8E] transition-colors mb-3"
        >
          계속 풀이하기
        </button>
        <Link
          to={`/problems`}
          className="w-full inline-block bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={onClose}
        >
          문제 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default SubjectiveProblemSubmissionResultModal;
