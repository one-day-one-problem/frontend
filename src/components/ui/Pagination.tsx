import React from "react";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPageChange: (pageIndex: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasPrevious,
  hasNext,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex justify-center flex-wrap gap-1 sm:gap-2">
        {/* 처음 페이지 버튼 (모바일에서 숨김) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onPageChange(0)}
          disabled={!hasPrevious}
          className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-lg ${
            !hasPrevious
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
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevious}
          className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${
            !hasPrevious
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-[#4B49AC] hover:bg-[#4B49AC]/10"
          }`}
        >
          &lt;
        </motion.button>

        {/* 현재/전체 페이지 정보 (모바일에서만 표시) */}
        <div className="flex sm:hidden items-center px-3 py-1 bg-white rounded-lg">
          <span className="text-sm">
            {currentPage + 1} / {totalPages}
          </span>
        </div>

        {/* 페이지 번호 버튼 목록 (데스크톱에서만 표시) */}
        <div className="hidden sm:flex">
          {Array.from({ length: totalPages }, (_, i) => {
            // 현재 페이지 주변 2개 페이지와 첫/마지막 페이지만 표시
            const showPageButton =
              i === 0 ||
              i === totalPages - 1 ||
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
                onClick={() => onPageChange(i)}
              >
                {i + 1}
              </motion.button>
            );
          }).filter(Boolean)}
        </div>

        {/* 다음 페이지 버튼 */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${
            !hasNext
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
          onClick={() => onPageChange(totalPages - 1)}
          disabled={!hasNext}
          className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-lg ${
            !hasNext
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-[#4B49AC] hover:bg-[#4B49AC]/10"
          }`}
        >
          &raquo;
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;
