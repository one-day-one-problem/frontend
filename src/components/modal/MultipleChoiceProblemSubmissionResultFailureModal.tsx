import React from "react";
import { Link } from "react-router-dom";

/**
 * MultipleChoiceProblemSubmissionResultFailureModal 컴포넌트의 Props 인터페이스
 */
interface MultipleChoiceProblemSubmissionResultFailureModalProps {
  /** 모달을 닫는 함수 **/
  onClose: () => void;
  /** 다시 시도하는 함수 **/
  onRetry: () => void;
}

/**
 * 객관식 문제를 실패했을 때 표시되는 모달 컴포넌트
 *
 * @param problem 사용자가 답안을 제출한 문제 정보
 * @param onClose 모달을 닫는 함수
 * @param onRetry 다시 시도하는 함수
 */
function MultipleChoiceProblemSubmissionResultFailureModal({
  onClose,
  onRetry,
}: MultipleChoiceProblemSubmissionResultFailureModalProps) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <svg
          className="w-10 h-10 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">오답입니다</h2>
      <p className="text-gray-600 mb-5">
        아쉽게도 정답이 아닙니다.
        <br />
        문제를 다시 검토하고 재도전해 보세요.
      </p>

      <div className="mt-6">
        <button
          onClick={onRetry}
          className="w-full bg-[#4B49AC] text-white py-3 rounded-lg hover:bg-[#3D3C8E] transition-colors mb-3"
        >
          다시 시도하기
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

export default MultipleChoiceProblemSubmissionResultFailureModal;
