import { ProblemDifficulty, ProblemType } from "../types/problem";

/**
 * 문제 난이도에 따른 스타일 클래스를 반환하는 함수
 *
 * @param difficulty - 문제 난이도
 * @returns 난이도에 맞는 스타일 클래스 문자열
 */
export const getDifficultyClass = (difficulty: ProblemDifficulty): string => {
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

/**
 * 문제 유형에 따른 스타일 클래스를 반환하는 함수
 *
 * @param type - 문제 유형
 * @returns 문제 유형에 맞는 스타일 클래스 문자열
 */
export const getTypeClass = (type: ProblemType): string => {
  switch (type) {
    case ProblemType.SUBJECTIVE:
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case ProblemType.MULTIPLE_CHOICE:
      return "bg-violet-100 text-violet-700 border-violet-200";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
