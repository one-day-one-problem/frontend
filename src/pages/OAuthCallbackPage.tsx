import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function OAuthCallbackPage() {
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { saveTokens } = useAuth();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // URL에서 토큰 파라미터 추출
        const params = new URLSearchParams(location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");
        const redirectTo = params.get("redirectTo") || "/problems";

        // 토큰이 없으면 에러 처리
        if (!accessToken || !refreshToken) {
          setError("인증 정보를 받아오지 못했습니다. 다시 시도해주세요.");
          setTimeout(() => navigate("/login"), 3000);
          return;
        }

        // 토큰 저장
        saveTokens({ accessToken, refreshToken });

        // 리다이렉트
        navigate(redirectTo);
      } catch (err) {
        console.error("OAuth 콜백 처리 중 오류 발생:", err);
        setError("로그인 처리 중 오류가 발생했습니다.");
        setTimeout(() => navigate("/login"), 3000); // 3초 후 로그인 페이지로 리다이렉트
      }
    };

    handleOAuthCallback();
  }, [location, navigate, saveTokens]);

  // 오류 발생 시 화면
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4B49AC]/10 via-[#7978E9]/5 to-white">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-500">오류 발생</h2>
          <p className="mt-2 text-gray-700">{error}</p>
          <p className="mt-4 text-sm text-gray-500">
            잠시 후 로그인 페이지로 이동합니다...
          </p>
        </div>
      </div>
    );
  }

  // 로딩 화면
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4B49AC]/10 via-[#7978E9]/5 to-white">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-[#4B49AC]">로그인 처리 중...</h2>
        <p className="mt-2 text-gray-700">잠시만 기다려주세요.</p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4B49AC]"></div>
        </div>
      </div>
    </div>
  );
}

export default OAuthCallbackPage;
