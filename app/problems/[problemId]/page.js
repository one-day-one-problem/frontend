"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProblemPage({ params }) {
  const { problemId } = params;
  const [selectedAnswers, setSelectedAnswers] = useState(new Set());
  const [elapsedTime, setElapsedTime] = useState(0);

  // 경과 시간 계산
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 시간 포맷팅 함수
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  // 임시 문제 데이터
  const problem = {
    id: problemId,
    title: "다음 중 RESTful API의 특징으로 올바른 것을 모두 고르시오.",
    category: "백엔드",
    difficulty: "중급",
    description: {
      mainText:
        "REST(Representational State Transfer)는 웹 서비스를 위한 아키텍처 스타일입니다. RESTful API의 특징에 대한 설명으로 올바른 것을 모두 선택하세요.",
      highlights: [
        "✦ REST 아키텍처의 기본 원칙을 고려해보세요.",
        "✦ HTTP 프로토콜의 특징과 연관지어 생각해보세요.",
        "✦ 실제 서비스에서의 구현 사례를 떠올려보세요.",
      ],
    },
    isMultipleChoice: true,
    options: [
      {
        id: "a",
        text: "리소스는 URI로 식별되어야 한다.",
        isCorrect: true,
      },
      {
        id: "b",
        text: "HTTP 메서드를 통해 리소스를 조작해야 한다.",
        isCorrect: true,
      },
      {
        id: "c",
        text: "모든 요청은 반드시 POST로 처리해야 한다.",
        isCorrect: false,
      },
      {
        id: "d",
        text: "자원의 표현은 JSON만 사용해야 한다.",
        isCorrect: false,
      },
      {
        id: "e",
        text: "서버와 클라이언트는 무상태(Stateless) 방식으로 동작해야 한다.",
        isCorrect: true,
      },
    ],
  };

  const toggleAnswer = (optionId) => {
    const newSelected = new Set(selectedAnswers);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      if (!problem.isMultipleChoice) {
        newSelected.clear(); // 단일 선택인 경우 기존 선택 초기화
      }
      newSelected.add(optionId);
    }
    setSelectedAnswers(newSelected);
  };

  const handleSubmit = () => {
    // TODO: 답안 제출 로직 구현
    console.log("제출된 답안:", Array.from(selectedAnswers));
  };

  return (
    <div className="min-h-screen bg-[#F7F7FC] p-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 섹션 */}
        <header className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#2D2B55] mb-2">
                {problem.title}
              </h1>
              <div className="flex gap-3">
                <span className="bg-[#4B49AC]/10 text-[#4B49AC] px-3 py-1 rounded-full text-sm">
                  {problem.category}
                </span>
                <span className="bg-[#7978E9]/10 text-[#7978E9] px-3 py-1 rounded-full text-sm">
                  {problem.difficulty}
                </span>
                <span className="bg-[#F3797E]/10 text-[#F3797E] px-3 py-1 rounded-full text-sm">
                  {problem.isMultipleChoice ? "다중 선택" : "단일 선택"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-[#4B49AC]">
                풀이 시간
              </div>
              <div className="text-2xl font-mono">
                {formatTime(elapsedTime)}
              </div>
            </div>
          </div>
        </header>

        {/* 문제 설명 */}
        <section className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="space-y-6">
            {/* 메인 설명 텍스트 */}
            <div className="text-lg leading-relaxed text-[#2D2B55]">
              {problem.description.mainText}
            </div>

            {/* 구분선 */}
            <div className="border-t border-dashed border-gray-200"></div>

            {/* 핵심 포인트 */}
            <div className="space-y-3 bg-[#4B49AC]/5 p-4 rounded-lg">
              <h3 className="font-semibold text-[#4B49AC] mb-2">핵심 포인트</h3>
              {problem.description.highlights.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-700 flex items-center gap-2"
                >
                  <span className="text-[#7978E9]">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 선택지 영역 */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="space-y-4">
            {problem.options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggleAnswer(option.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswers.has(option.id)
                    ? "border-[#4B49AC] bg-gradient-to-r from-[#4B49AC]/5 to-transparent"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
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
                  <span className="text-lg">{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* 버튼 영역 */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            나중에 풀기
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="bg-[#4B49AC] text-white px-6 py-3 rounded-lg hover:bg-[#7978E9] transition-colors"
          >
            답변 제출하기
          </motion.button>
        </div>
      </div>
    </div>
  );
}
