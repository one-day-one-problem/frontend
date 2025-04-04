import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import problemApi from "../api/problemApi";
import {
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
  ProblemCategory,
  ProblemDifficulty,
  ProblemPage,
  ProblemSortType,
  ProblemType,
  TYPE_LABELS,
} from "../types/problem";
import Select from "../components/ui/Select";
import ProblemsCardView from "../components/problems/ProblemsCardView";
import ProblemsListView from "../components/problems/ProblemsListView";

// 보기 모드 타입 정의
type ViewMode = "card" | "list";

function ProblemsPage() {
  // URL 검색 파라미터 관리
  const [searchParams, setSearchParams] = useSearchParams();

  // 상태 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [problemData, setProblemData] = useState<ProblemPage | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const mode = searchParams.get("view") as ViewMode;
    return mode === "list" ? "list" : "card";
  });

  // 인증 상태 확인
  const { isAuthenticated } = useAuth();

  // URL에서 필터 상태 초기화 (페이지 번호는 1-based UI, 0-based API용으로 변환)
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("page");
    // URL에서 페이지 파라미터가 있으면 1을 빼서 0-based 인덱스로 변환 (UI는 1부터 시작하지만, API는 0부터 시작)
    return page ? Math.max(0, parseInt(page) - 1) : 0;
  });

  const [pageSize, setPageSize] = useState(() => {
    const size = searchParams.get("size");
    return size ? parseInt(size) : 12;
  });

  const [selectedCategory, setSelectedCategory] =
    useState<ProblemCategory | null>(() => {
      const category = searchParams.get("category");
      return (category as ProblemCategory) || null;
    });

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<ProblemDifficulty | null>(() => {
      const difficulty = searchParams.get("difficulty");
      return (difficulty as ProblemDifficulty) || null;
    });

  const [selectedType, setSelectedType] = useState<ProblemType | null>(() => {
    const type = searchParams.get("type");
    return (type as ProblemType) || null;
  });

  const [sortBy, setSortBy] = useState<ProblemSortType>(() => {
    const sort = searchParams.get("sort");
    return (sort as ProblemSortType) || ProblemSortType.LATEST;
  });

  // 미해결 문제 필터는 인증된 사용자만 사용 가능
  const [onlyUnsolved, setOnlyUnsolved] = useState(() => {
    // 인증되지 않은 상태에서는 무시
    if (!isAuthenticated) return false;
    return searchParams.get("onlyUnsolved") === "true";
  });

  // 레이블 맵핑은 타입 파일에서 가져옴 - 코드 중복 방지
  const difficultyLabels = DIFFICULTY_LABELS;
  const typeLabels = TYPE_LABELS;
  const categoryLabels = CATEGORY_LABELS;

  // 정렬 옵션
  const sortOptions = [
    { value: ProblemSortType.LATEST, label: "최신순" },
    { value: ProblemSortType.OLDEST, label: "오래된순" },
    { value: ProblemSortType.MOST_SOLVED, label: "많이 푼 순" },
    { value: ProblemSortType.LEAST_SOLVED, label: "적게 푼 순" },
  ];

  // 페이지 크기 옵션
  const pageSizeOptions = [
    { value: 12, label: "12개씩" },
    { value: 24, label: "24개씩" },
    { value: 36, label: "36개씩" },
  ];

  // URL 업데이트 함수
  const updateSearchParams = () => {
    const params: Record<string, string> = {};

    // 페이지 번호는 UI 표시용으로 1을 더해서 1-based로 저장 (0페이지면 파라미터 자체를 추가하지 않음)
    if (currentPage > 0) params.page = (currentPage + 1).toString();
    if (pageSize !== 12) params.size = pageSize.toString();
    if (selectedCategory) params.category = selectedCategory;
    if (selectedDifficulty) params.difficulty = selectedDifficulty;
    if (selectedType) params.type = selectedType;
    if (sortBy !== ProblemSortType.LATEST) params.sort = sortBy;
    if (viewMode === "list") params.view = viewMode;

    // 인증된 사용자인 경우에만 onlyUnsolved 파라미터 추가
    if (isAuthenticated && onlyUnsolved) {
      params.onlyUnsolved = "true";
    }

    setSearchParams(params);
  };

  // 필터 변경 시 URL 업데이트
  useEffect(() => {
    updateSearchParams();
  }, [
    currentPage,
    pageSize,
    selectedCategory,
    selectedDifficulty,
    selectedType,
    sortBy,
    onlyUnsolved,
    viewMode,
  ]);

  // 문제 목록 가져오기
  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await problemApi.getProblems({
        page: currentPage,
        size: pageSize,
        category: selectedCategory,
        difficulty: selectedDifficulty,
        type: selectedType,
        sortType: sortBy,
        onlyUnsolved: isAuthenticated ? onlyUnsolved : false, // 인증된 사용자만 미해결 문제 필터 적용
      });

      setProblemData(response.data);
    } catch (err) {
      console.error("문제 목록을 가져오는 중 오류 발생:", err);
      setError("문제 목록을 불러오는데 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  // URL 검색 파라미터 변경 시 데이터 다시 가져오기
  useEffect(() => {
    // Promise 반환 문제 해결: async 함수를 직접 호출하지 않고 즉시 실행 함수로 감싸기
    (async () => {
      await fetchProblems();
    })();
    // 의존성 배열에 fetchProblems 제거 (불필요한 재생성 방지)
  }, [
    currentPage,
    pageSize,
    selectedCategory,
    selectedDifficulty,
    selectedType,
    sortBy,
    onlyUnsolved,
  ]);

  // 필터 변경 핸들러 (페이지 1로 리셋)
  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    value: any
  ) => {
    setter(value);
    setCurrentPage(0); // 페이지를 처음으로 리셋
  };

  // 뷰 모드 변경 핸들러
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "card" ? "list" : "card"));
  };

  // 페이지 번호를 클릭했을 때 처리하는 핸들러
  const handlePageClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  // 로딩 중 표시
  if (loading && !problemData) {
    return (
      <div className="min-h-screen bg-[#F7F7FC] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B49AC] mx-auto mb-4"></div>
          <p className="text-gray-700">문제 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 표시
  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F7FC] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-500 mb-2">오류 발생</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={fetchProblems}
            className="bg-[#4B49AC] text-white px-4 py-2 rounded-lg hover:bg-[#3D3C8E] transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7FC] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* 페이지 헤더: 문제 목록 제목 및 총 문제 개수 */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2B55] mb-2 sm:mb-4">
            문제 목록
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            총 {problemData?.totalElements || 0}개의 문제가 있습니다
          </p>
        </header>

        {/* 필터 섹션: 필터 및 정렬 옵션 */}
        <section className="bg-white rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* 카테고리 필터 선택 */}
            <Select
              label="카테고리"
              value={selectedCategory || "all"}
              onChange={(value) =>
                handleFilterChange(
                  setSelectedCategory,
                  value === "all" ? null : (value as ProblemCategory)
                )
              }
              options={[
                { value: "all", label: "전체" },
                ...Object.entries(categoryLabels).map(([value, label]) => ({
                  value,
                  label,
                })),
              ]}
            />

            {/* 난이도 필터 선택 */}
            <Select
              label="난이도"
              value={selectedDifficulty || "all"}
              onChange={(value) =>
                handleFilterChange(
                  setSelectedDifficulty,
                  value === "all" ? null : (value as ProblemDifficulty)
                )
              }
              options={[
                { value: "all", label: "전체" },
                ...Object.entries(difficultyLabels).map(([value, label]) => ({
                  value,
                  label,
                })),
              ]}
            />

            {/* 문제 유형 필터 선택 */}
            <Select
              label="문제 유형"
              value={selectedType || "all"}
              onChange={(value) =>
                handleFilterChange(
                  setSelectedType,
                  value === "all" ? null : (value as ProblemType)
                )
              }
              options={[
                { value: "all", label: "전체" },
                ...Object.entries(typeLabels).map(([value, label]) => ({
                  value,
                  label,
                })),
              ]}
            />

            {/* 정렬 방식 선택 */}
            <Select
              label="정렬"
              value={sortBy}
              onChange={(value) =>
                handleFilterChange(setSortBy, value as ProblemSortType)
              }
              options={sortOptions}
            />

            {/* 페이지당 표시 개수 선택 */}
            <Select
              label="표시 개수"
              value={pageSize}
              onChange={(value) =>
                handleFilterChange(setPageSize, Number(value))
              }
              options={pageSizeOptions}
            />

            {/* 뷰 모드 전환 버튼 */}
            <div className="flex items-center justify-between mt-2 sm:mt-6">
              <button
                onClick={toggleViewMode}
                className="flex items-center text-sm font-medium text-[#4B49AC] hover:text-[#7978E9] transition-colors"
              >
                {viewMode === "card" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    리스트 뷰로 보기
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"
                      />
                    </svg>
                    카드 뷰로 보기
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 미해결 문제 필터 또는 로그인 안내 메시지 */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            {isAuthenticated ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="onlyUnsolved"
                  checked={onlyUnsolved}
                  onChange={(e) =>
                    handleFilterChange(setOnlyUnsolved, e.target.checked)
                  }
                  className="w-4 h-4 text-[#4B49AC]"
                />
                <label
                  htmlFor="onlyUnsolved"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  미해결 문제만 보기
                </label>
              </div>
            ) : (
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  <Link to="/login" className="text-[#4B49AC] hover:underline">
                    로그인
                  </Link>
                  하면 문제 해결 여부를 확인하고 진도를 관리할 수 있습니다.
                </span>
              </div>
            )}
          </div>
        </section>

        {/* 문제 목록 컨테이너 */}
        <div className="mb-8 min-h-[500px]">
          {viewMode === "card" ? (
            <ProblemsCardView
              problems={problemData?.problems || []}
              isAuthenticated={isAuthenticated}
            />
          ) : (
            <ProblemsListView
              problems={problemData?.problems || []}
              isAuthenticated={isAuthenticated}
            />
          )}
        </div>

        {/* 페이지네이션: 페이지 번호 및 이동 버튼 */}
        <div className="py-6 h-[80px] flex items-center justify-center">
          {problemData && !problemData.empty && (
            <div className="flex justify-center flex-wrap gap-1 sm:gap-2">
              {/* 처음 페이지 버튼 (모바일에서 숨김) */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageClick(0)}
                disabled={!problemData.hasPrevious}
                className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-lg ${
                  !problemData.hasPrevious
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-[#4B49AC] hover:bg-[#4B49AC]/10"
                }`}
              >
                &laquo;
              </motion.button>

              {/* 이전 페이지 버튼 */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={!problemData.hasPrevious}
                className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${
                  !problemData.hasPrevious
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-[#4B49AC] hover:bg-[#4B49AC]/10"
                }`}
              >
                &lt;
              </motion.button>

              {/* 현재/전체 페이지 정보 (모바일에서만 표시) */}
              <div className="flex sm:hidden items-center px-3 py-1 bg-white rounded-lg">
                <span className="text-sm">
                  {currentPage + 1} / {problemData.totalPages}
                </span>
              </div>

              {/* 페이지 번호 버튼 목록 (데스크톱에서만 표시) */}
              <div className="hidden sm:flex">
                {Array.from({ length: problemData.totalPages }, (_, i) => {
                  // 현재 페이지 주변 2개 페이지와 첫/마지막 페이지만 표시
                  const showPageButton =
                    i === 0 ||
                    i === problemData.totalPages - 1 ||
                    (i >= currentPage - 2 && i <= currentPage + 2);

                  if (!showPageButton) {
                    return i === currentPage - 3 || i === currentPage + 3 ? (
                      <span
                        key={i}
                        className="flex items-center justify-center w-10 h-10"
                      >
                        ...
                      </span>
                    ) : null;
                  }

                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === i
                          ? "bg-[#4B49AC] text-white"
                          : "bg-white text-[#4B49AC] hover:bg-[#4B49AC]/10"
                      }`}
                      onClick={() => handlePageClick(i)}
                    >
                      {i + 1}{" "}
                      {/* 화면에 표시되는 페이지 번호는 1부터 시작하도록 +1 */}
                    </motion.button>
                  );
                }).filter(Boolean)}
              </div>

              {/* 다음 페이지 버튼 */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={!problemData.hasNext}
                className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${
                  !problemData.hasNext
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-[#4B49AC] hover:bg-[#4B49AC]/10"
                }`}
              >
                &gt;
              </motion.button>

              {/* 마지막 페이지 버튼 (모바일에서 숨김) */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageClick(problemData.totalPages - 1)}
                disabled={!problemData.hasNext}
                className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-lg ${
                  !problemData.hasNext
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-[#4B49AC] hover:bg-[#4B49AC]/10"
                }`}
              >
                &raquo;
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;
