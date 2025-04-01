import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TextareaAutosize from "react-textarea-autosize";
import {
  CATEGORY_LABELS,
  ProblemCategory,
  Problem,
  ProblemSummary,
} from "../types/problem";
import problemApi from "../api/problemApi";
import submissionApi from "../api/submissionApi";
import { Submission, SubmitAnswerRequest } from "../types/submission";

// 결과 모달 타입
type ResultModalType = "success" | "failure" | "subjective" | null;

function ProblemPage() {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 상태 관리
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Set<number>>(
    new Set()
  );
  const [subjectiveAnswer, setSubjectiveAnswer] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [submissionResult, setSubmissionResult] = useState<Submission | null>(
    null
  );
  const [relatedProblems, setRelatedProblems] = useState<ProblemSummary[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [showModal, setShowModal] = useState<ResultModalType>(null);

  // 난이도에 따른 스타일 결정 함수
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case "HARD":
        return "bg-[#F3797E]/10 text-[#F3797E] border-[#F3797E]/20";
      case "MEDIUM":
        return "bg-[#7978E9]/10 text-[#7978E9] border-[#7978E9]/20";
      case "EASY":
        return "bg-[#4B49AC]/10 text-[#4B49AC] border-[#4B49AC]/20";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // 문제 유형에 따른 스타일 결정 함수
  const getTypeClass = (type: string) => {
    switch (type) {
      case "SUBJECTIVE":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "MULTIPLE_CHOICE":
        return "bg-violet-100 text-violet-700 border-violet-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // 문제 내용에서 줄바꿈 처리
  const formatQuestionText = (text: string) => {
    return text.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  // 문제 데이터 가져오기
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        setError(null);
        setSubmissionResult(null);
        setShowModal(null);

        if (problemId) {
          const response = await problemApi.getProblem(problemId);
          setProblem(response.data);
        }
      } catch (err) {
        console.error("문제 조회 중 오류 발생:", err);
        setError("문제를 불러오는데 실패했습니다. 다시 시도해 주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  // 경과 시간 계산
  useEffect(() => {
    if (loading || !problem || submissionResult) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, problem, submissionResult]);

  // 주관식 답변 글자 수 계산
  useEffect(() => {
    if (problem?.type === "SUBJECTIVE") {
      const count = subjectiveAnswer.replace(/\s+/g, "").length; // 공백을 제거하고 글자 수 계산
      setWordCount(count);
    }
  }, [subjectiveAnswer, problem?.type]);

  // 관련 문제 가져오기
  const fetchRelatedProblems = async () => {
    if (!problem || !problem.category) return;

    try {
      setLoadingRelated(true);

      // 같은 카테고리의 문제 가져오기
      const response = await problemApi.getProblems({
        category: problem.category as ProblemCategory,
        size: 4, // 현재 문제 제외하고 표시할 수 있도록 여유있게 요청
      });

      if (response?.data?.problems) {
        // 현재 문제를 제외한 관련 문제만 필터링
        const filtered = response.data.problems
          .filter((p) => p.id !== problem.id)
          .slice(0, 3); // 최대 3개로 제한

        setRelatedProblems(filtered);
      }
    } catch (err) {
      console.error("관련 문제 조회 중 오류 발생:", err);
    } finally {
      setLoadingRelated(false);
    }
  };

  // 시간 포맷팅 함수 (HH:MM:SS 형식으로 변환)
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  // 객관식 답변 토글 함수
  const toggleAnswer = (optionId: number) => {
    const newSelected = new Set(selectedAnswers);

    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }

    setSelectedAnswers(newSelected);
  };

  // 답안 제출 처리 함수
  const handleSubmit = async () => {
    if (!problem || !problemId) return;

    if (!isAuthenticated) {
      if (
        window.confirm(
          "로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?"
        )
      ) {
        navigate("/login");
      }
      return;
    }

    try {
      setSubmitting(true);

      let answer = "";

      // 문제 유형에 따른 답변 형식 처리
      if (problem.type === "MULTIPLE_CHOICE") {
        // 객관식 문제인 경우
        if (selectedAnswers.size === 0) {
          alert("답변을 선택해 주세요.");
          setSubmitting(false);
          return;
        }

        // 객관식 답변 - 옵션 ID를 오름차순으로 정렬하여 콤마로 구분
        answer = Array.from(selectedAnswers)
          .sort((a, b) => a - b)
          .join(",");
      } else {
        // 주관식 답변인 경우
        if (subjectiveAnswer.trim() === "") {
          alert("답변을 입력해 주세요.");
          setSubmitting(false);
          return;
        }

        // 주관식 답변 - 따옴표 등 특수문자로 인한 JSON 오류 방지를 위해 인코딩
        answer = encodeURIComponent(subjectiveAnswer);
      }

      // 먼저 관련 문제를 로드 (제출 전에 미리 로드)
      await fetchRelatedProblems();

      // 답안 제출 API 호출
      const submitRequest: SubmitAnswerRequest = {
        answer: answer,
        duration: elapsedTime,
      };

      const response = await submissionApi.submitAnswer(
        problemId,
        submitRequest
      );

      // 제출 결과 설정
      if (response?.data) {
        setSubmissionResult(response.data);

        // 결과에 따른 모달 표시
        if (problem.type === "MULTIPLE_CHOICE") {
          const isCorrect = response.data.isCorrect === true;
          setShowModal(isCorrect ? "success" : "failure");
        } else {
          setShowModal("subjective");
        }

        // 객관식이고 정답인 경우 문제 해결로 표시
        if (problem.type === "MULTIPLE_CHOICE" && response.data.isCorrect) {
          setProblem((prev) => (prev ? { ...prev, isSolved: true } : null));
        }
      }
    } catch (err) {
      console.error("답안 제출 중 오류 발생:", err);
      alert("답안 제출에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  // 다시 시도 함수
  const handleRetry = () => {
    setSubmissionResult(null);
    setSelectedAnswers(new Set());
    setElapsedTime(0);
    setShowModal(null);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setShowModal(null);
  };

  // 로딩 화면
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7FC] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B49AC] mx-auto mb-4"></div>
          <p className="text-gray-700">문제를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 화면
  if (error || !problem) {
    return (
      <div className="min-h-screen bg-[#F7F7FC] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-500 mb-2">오류 발생</h2>
          <p className="text-gray-700 mb-4">
            {error || "문제를 찾을 수 없습니다."}
          </p>
          <Link
            to="/problems"
            className="inline-block bg-[#4B49AC] text-white px-4 py-2 rounded-lg hover:bg-[#3D3C8E] transition-colors"
          >
            문제 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  /**
   * 결과 모달 컴포넌트
   * 문제 해결 결과와 관련 문제 추천을 표시
   */
  const renderResultModal = () => {
    if (!showModal || !problem) return null;

    /**
     * 모달 내부 관련 문제 컴포넌트
     * 최대 3개의 관련 문제를 표시
     */
    const RelatedProblemsPreview = () => {
      if (relatedProblems.length === 0) {
        if (loadingRelated) {
          return (
            <div className="py-3 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#4B49AC] mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">
                관련 문제를 불러오는 중...
              </p>
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
                onClick={closeModal}
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
                onClick={closeModal}
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

    let modalContent;

    switch (showModal) {
      case "success":
        modalContent = (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              정답입니다!
            </h2>
            <p className="text-gray-600 mb-5">
              축하합니다!
              <br />
              문제를 성공적으로 해결했습니다.
            </p>

            <RelatedProblemsPreview />

            <div className="mt-6">
              <button
                onClick={closeModal}
                className="w-full bg-[#4B49AC] text-white py-3 rounded-lg hover:bg-[#3D3C8E] transition-colors mb-3"
              >
                계속 풀이하기
              </button>
              <Link
                to={`/problems`}
                className="w-full inline-block bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={closeModal}
              >
                문제 목록으로 돌아가기
              </Link>
            </div>
          </div>
        );
        break;

      case "failure":
        modalContent = (
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              오답입니다
            </h2>
            <p className="text-gray-600 mb-5">
              아쉽게도 정답이 아닙니다.
              <br />
              문제를 다시 검토하고 재도전해 보세요.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={handleRetry}
                className="w-full bg-[#4B49AC] text-white py-3 rounded-lg hover:bg-[#3D3C8E] transition-colors"
              >
                다시 시도하기
              </button>
              <Link
                to={`/problems`}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={closeModal}
              >
                문제 목록으로 돌아가기
              </Link>
            </div>
          </div>
        );
        break;

      case "subjective":
        modalContent = (
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
                onClick={closeModal}
                className="w-full bg-[#4B49AC] text-white py-3 rounded-lg hover:bg-[#3D3C8E] transition-colors mb-3"
              >
                계속 풀이하기
              </button>
              <Link
                to={`/problems`}
                className="w-full inline-block bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={closeModal}
              >
                문제 목록으로 돌아가기
              </Link>
            </div>
          </div>
        );
        break;
    }

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {modalContent}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F7FC] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 영역 (모바일: 세로 배치, 데스크톱: 가로 배치) */}
        <header className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h1 className="text-xl sm:text-2xl font-bold text-[#2D2B55] line-clamp-2">
                  {problem.title}
                </h1>
                {problem.isSolved ? (
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded-full border border-green-200 font-medium">
                    해결 완료
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 text-xs rounded-full border border-gray-200 font-medium">
                    미해결
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-xs border border-gray-100">
                  {CATEGORY_LABELS[problem.category as ProblemCategory] ||
                    problem.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyClass(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty === "EASY"
                    ? "입문"
                    : problem.difficulty === "MEDIUM"
                    ? "중급"
                    : "고급"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs border ${getTypeClass(
                    problem.type
                  )}`}
                >
                  {problem.type === "MULTIPLE_CHOICE" ? "객관식" : "주관식"}
                </span>
                <span className="bg-blue-50 px-3 py-1 rounded-full text-xs text-blue-700 border border-blue-100 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
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
                  {problem.solvedCount.toLocaleString()}명 풀이
                </span>
              </div>
            </div>
            <div className="md:text-right">
              <div className="text-lg font-semibold text-[#4B49AC]">
                풀이 시간
              </div>
              <div className="text-2xl font-mono">
                {formatTime(elapsedTime)}
              </div>
            </div>
          </div>
        </header>

        {/* 문제 설명 영역 */}
        <section className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="space-y-4 prose prose-slate max-w-none">
            <div className="text-lg leading-relaxed text-[#2D2B55] whitespace-pre-wrap">
              {formatQuestionText(problem.question)}
            </div>
          </div>
        </section>

        {/* 답변 입력 영역 (객관식/주관식) */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-[#2D2B55] mb-4">
            {problem.type === "MULTIPLE_CHOICE" ? "선택지" : "답변 작성"}
          </h2>

          {problem.type === "MULTIPLE_CHOICE" ? (
            // 객관식 답변 UI
            <div className="space-y-4">
              {problem.options?.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => toggleAnswer(option.id)}
                  disabled={submissionResult !== null}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    submissionResult ? "opacity-75" : ""
                  } ${
                    selectedAnswers.has(option.id)
                      ? "border-[#4B49AC] bg-gradient-to-r from-[#4B49AC]/5 to-transparent"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-6 h-6 mt-0.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                        selectedAnswers.has(option.id)
                          ? "border-[#4B49AC] bg-[#4B49AC]"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedAnswers.has(option.id) && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      )}
                    </div>
                    <span className="text-base">{option.content}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            // 주관식 답변 UI - 동적 크기 조정
            <div className="space-y-2">
              <TextareaAutosize
                value={subjectiveAnswer}
                onChange={(e) => setSubjectiveAnswer(e.target.value)}
                placeholder="답변을 작성해 주세요..."
                minRows={5}
                disabled={submissionResult !== null}
                className={`w-full p-4 rounded-lg border-2 border-gray-200 focus:border-[#4B49AC] focus:ring-1 focus:ring-[#4B49AC] outline-none transition-all resize-none ${
                  submissionResult ? "opacity-75 bg-gray-50" : ""
                }`}
                style={{ overflow: "hidden" }}
              />
              <div className="text-right text-sm text-gray-500">
                {wordCount} 자
              </div>
            </div>
          )}
        </section>

        {/* 제출 버튼 영역 (2단 그리드) */}
        {!submissionResult ? (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Link to="/problems">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-100 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                나중에 풀기
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={submitting}
              className={`w-full bg-[#4B49AC] text-white px-6 py-3 rounded-lg hover:bg-[#7978E9] transition-colors ${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  제출 중...
                </div>
              ) : (
                "답변 제출하기"
              )}
            </motion.button>
          </div>
        ) : (
          <div className="mb-8 text-center">
            <button
              onClick={() =>
                setShowModal(
                  problem.type === "MULTIPLE_CHOICE" &&
                    submissionResult?.isCorrect
                    ? "success"
                    : problem.type === "SUBJECTIVE"
                    ? "subjective"
                    : "failure"
                )
              }
              className="bg-[#4B49AC] text-white px-6 py-3 rounded-lg hover:bg-[#7978E9] transition-colors"
            >
              결과 확인하기
            </button>
          </div>
        )}

        {/* 결과 표시 모달 (백드롭 블러 처리) */}
        {renderResultModal()}
      </div>
    </div>
  );
}

export default ProblemPage;
