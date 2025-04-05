import React from "react";
import {
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
  ProblemSummary,
  TYPE_LABELS,
} from "../../types/problem";
import { getDifficultyClass, getTypeClass } from "../../utils/problemStyles";

interface ProblemsListViewProps {
  problems: ProblemSummary[];
  isAuthenticated: boolean;
}

function ProblemsListView({
  problems,
  isAuthenticated,
}: ProblemsListViewProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
      {/* 데스크톱 테이블 (md 이상 화면에서만 표시) */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[40%]"
                >
                  문제
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]"
                >
                  카테고리
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]"
                >
                  난이도
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]"
                >
                  유형
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]"
                >
                  풀이수
                </th>
                {isAuthenticated && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]"
                  >
                    상태
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {problems.length ? (
                problems.map((problem) => (
                  <tr
                    key={problem.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/problems/${problem.id}`)
                    }
                  >
                    <td className="px-6 py-4">
                      <div
                        className="font-medium text-[#2D2B55] truncate"
                        title={problem.title}
                      >
                        {problem.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 whitespace-nowrap">
                          {CATEGORY_LABELS[problem.category]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getDifficultyClass(
                            problem.difficulty
                          )} whitespace-nowrap`}
                        >
                          {DIFFICULTY_LABELS[problem.difficulty]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getTypeClass(
                            problem.type
                          )} whitespace-nowrap`}
                        >
                          {TYPE_LABELS[problem.type]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm text-gray-900">
                        {problem.solvedCount.toLocaleString()}
                      </div>
                    </td>
                    {isAuthenticated && (
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              problem.isSolved
                                ? "bg-green-100 text-green-800"
                                : "bg-amber-100 text-amber-800"
                            } whitespace-nowrap`}
                          >
                            {problem.isSolved ? "해결" : "미해결"}
                          </span>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={isAuthenticated ? 6 : 5}
                    className="px-6 py-0 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center p-6 sm:p-10 min-h-[500px]">
                      <div className="text-3xl sm:text-4xl mb-4">🧩</div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                        문제가 없습니다
                      </h3>
                      <p className="text-gray-500">
                        다른 필터 조건으로 다시 시도해보세요.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 모바일 리스트 뷰 (md 미만 화면에서 표시) */}
      <div className="md:hidden">
        {problems.length ? (
          problems.map((problem) => (
            <div
              key={problem.id}
              className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer h-[120px] flex flex-col justify-between"
              onClick={() => (window.location.href = `/problems/${problem.id}`)}
            >
              {/* 상단 영역: 제목 및 풀이 수 */}
              <div className="flex justify-between items-start">
                <h3
                  className="font-medium text-[#2D2B55] text-lg line-clamp-2 max-w-[70%]"
                  title={problem.title}
                >
                  {problem.title}
                </h3>
                <div className="ml-2 flex-shrink-0 flex items-center text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-0.5"
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
                  {problem.solvedCount.toLocaleString()}명
                </div>
              </div>

              {/* 하단 영역: 태그들 - 항상 하단에 고정되어 표시 */}
              <div className="flex flex-wrap gap-1 mt-auto">
                {/* 카테고리 */}
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 whitespace-nowrap">
                  {CATEGORY_LABELS[problem.category]}
                </span>

                {/* 난이도 */}
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${getDifficultyClass(
                    problem.difficulty
                  )} whitespace-nowrap`}
                >
                  {DIFFICULTY_LABELS[problem.difficulty]}
                </span>

                {/* 유형 */}
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${getTypeClass(
                    problem.type
                  )} whitespace-nowrap`}
                >
                  {TYPE_LABELS[problem.type]}
                </span>

                {/* 해결 여부 (인증된 사용자에게만 표시) */}
                {isAuthenticated && (
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      problem.isSolved
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    } whitespace-nowrap`}
                  >
                    {problem.isSolved ? "해결" : "미해결"}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-6 sm:p-10 min-h-[500px]">
            <div className="text-3xl sm:text-4xl mb-4">🧩</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              문제가 없습니다
            </h3>
            <p className="text-gray-500">
              다른 필터 조건으로 다시 시도해보세요.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProblemsListView;
