import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
  ProblemDifficulty,
  ProblemSummary,
  ProblemType,
  TYPE_LABELS,
} from "../../types/problem";

type ProblemsCardViewProps = {
  problems: ProblemSummary[];
  isAuthenticated: boolean;
};

function ProblemsCardView({
  problems,
  isAuthenticated,
}: ProblemsCardViewProps) {
  // 난이도에 따른 스타일 클래스 결정
  const getDifficultyClass = (difficulty: ProblemDifficulty) => {
    switch (difficulty) {
      case ProblemDifficulty.HARD:
        return "bg-[#F3797E]/10 text-[#F3797E] border-[#F3797E]/20";
      case ProblemDifficulty.MEDIUM:
        return "bg-[#7978E9]/10 text-[#7978E9] border-[#7978E9]/20";
      case ProblemDifficulty.EASY:
        return "bg-[#4B49AC]/10 text-[#4B49AC] border-[#4B49AC]/20";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // 문제 유형에 따른 스타일 클래스 결정
  const getTypeClass = (type: ProblemType) => {
    switch (type) {
      case ProblemType.SUBJECTIVE:
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case ProblemType.MULTIPLE_CHOICE:
        return "bg-violet-100 text-violet-700 border-violet-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (problems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 sm:p-10 bg-white rounded-xl shadow-sm min-h-[500px]">
        <div className="text-3xl sm:text-4xl mb-4">🧩</div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          문제가 없습니다
        </h3>
        <p className="text-gray-500">다른 필터 조건으로 다시 시도해보세요.</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {problems.map((problem) => (
        <Link to={`/problems/${problem.id}`} key={problem.id}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-all h-[150px] flex flex-col"
          >
            {/* 제목 영역과 해결 수 */}
            <div className="flex justify-between items-start mb-3 gap-2">
              <h3 className="text-lg font-semibold text-[#2D2B55] line-clamp-2 min-h-[3.5rem]">
                {problem.title}
              </h3>

              {/* 문제 해결 인원 */}
              <div className="flex-shrink-0 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 flex items-center gap-1 whitespace-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-xs font-medium text-blue-700">
                  {problem.solvedCount.toLocaleString()}명
                </span>
              </div>
            </div>

            {/* 태그 영역 - 항상 하단에 고정되도록 mt-auto 추가 */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {/* 1. 카테고리 태그 */}
              <span
                key="category"
                className="bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full text-xs border border-gray-100"
              >
                {CATEGORY_LABELS[problem.category]}
              </span>

              {/* 2. 난이도 태그 */}
              <span
                key="difficulty"
                className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyClass(
                  problem.difficulty
                )}`}
              >
                {DIFFICULTY_LABELS[problem.difficulty]}
              </span>

              {/* 3. 문제 유형 태그 */}
              <span
                key="type"
                className={`px-2 py-0.5 rounded-full text-xs border ${getTypeClass(
                  problem.type
                )}`}
              >
                {TYPE_LABELS[problem.type]}
              </span>

              {/* 4. 해결/미해결 태그 (인증된 사용자에게만 표시) */}
              {isAuthenticated && problem.isSolved !== undefined && (
                <span
                  key="solved-status"
                  className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                    problem.isSolved
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-amber-100 text-amber-800 border-amber-200"
                  }`}
                >
                  {problem.isSolved ? "해결 완료" : "미해결"}
                </span>
              )}
            </div>
          </motion.div>
        </Link>
      ))}
    </section>
  );
}

export default ProblemsCardView;
