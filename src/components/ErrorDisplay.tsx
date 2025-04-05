import React from "react";

/**
 * ErrorDisplay 컴포넌트의 Props 인터페이스
 */
interface ErrorDisplayProps {
  /** 표시할 오류 메시지 */
  message: string;
  /** 버튼 클릭 시 호출되는 함수 */
  onAction?: () => void;
  /** 버튼에 표시할 텍스트 */
  buttonText?: string;
  /** 전체 화면 모드로 오류를 표시할지 여부 (기본값: true) */
  fullScreen?: boolean;
  /** 추가 스타일링을 위한 CSS 클래스명 */
  className?: string;
}

/**
 * 오류 메시지와 버튼을 표시하는 컴포넌트
 *
 * @param message 오류 메시지
 * @param buttonText 버튼에 표시할 텍스트
 * @param onAction 버튼 클릭 시 호출되는 함수
 * @param fullScreen 전체 화면 모드로 오류를 표시할지 여부 (기본값: true)
 * @param className 추가 스타일링을 위한 CSS 클래스명
 */
function ErrorDisplay({
  message,
  buttonText,
  onAction,
  fullScreen = true,
  className = "",
}: ErrorDisplayProps) {
  const containerClasses = fullScreen
    ? "min-h-screen bg-[#F7F7FC] flex items-center justify-center"
    : "flex items-center justify-center py-8";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-red-500 mb-2">오류 발생</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="space-y-2">
          {onAction && buttonText && (
            <button
              onClick={onAction}
              className="bg-[#4B49AC] text-white px-4 py-2 rounded-lg hover:bg-[#3D3C8E] transition-colors"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorDisplay;
