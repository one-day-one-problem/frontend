"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// TODO: Replace all social login icons with actual SVG files in /public/social/ directory
const socialLogins = [
  {
    name: "카카오",
    icon: "/social/kakao.svg", // TODO: Update kakao login icon
    bgColor: "bg-[#FEE500]",
    textColor: "text-[#000000]",
    hoverColor: "hover:bg-[#F6E000]",
    path: "/oauth2/authorization/kakao",
  },
  {
    name: "네이버",
    icon: "/social/naver.svg", // TODO: Update naver login icon
    bgColor: "bg-[#03C75A]",
    textColor: "text-white",
    hoverColor: "hover:bg-[#02B351]",
    path: "/oauth2/authorization/naver",
  },
  {
    name: "구글",
    icon: "/social/google.svg", // TODO: Update google login icon
    bgColor: "bg-white",
    textColor: "text-gray-700",
    hoverColor: "hover:bg-gray-50",
    borderColor: "border border-gray-300",
    path: "/oauth2/authorization/google",
  },
  {
    name: "GitHub",
    icon: "/social/github.svg", // TODO: Update github login icon
    bgColor: "bg-[#24292F]",
    textColor: "text-white",
    hoverColor: "hover:bg-[#1C2024]",
    path: "/oauth2/authorization/github",
  },
];

export default function LoginPage() {
  const handleSocialLogin = (path) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${baseUrl}${path}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B49AC]/10 via-[#7978E9]/5 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl"
      >
        <div>
          <Link href="/">
            <h2 className="text-center text-3xl font-bold text-[#4B49AC]">
              하루하나
            </h2>
          </Link>
          <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            간편하게 소셜 로그인으로 시작하세요
          </p>
        </div>

        {/* Todo: 소셜 로그인별로 정책에 맞는 디자인으로 수정 필요 */}

        <div className="mt-8 space-y-4">
          {socialLogins.map((social) => (
            <motion.button
              key={social.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialLogin(social.path)}
              className={`group relative w-full flex items-center justify-center px-4 py-3 rounded-md ${
                social.bgColor
              } ${social.textColor} ${social.hoverColor} ${
                social.borderColor || ""
              } transition-all duration-200`}
            >
              <img
                src={social.icon}
                alt={`${social.name} 로그인`}
                className="w-5 h-5 mr-3"
              />
              <span className="font-medium">{social.name}로 계속하기</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            아직 계정이 없으신가요?{" "}
            <Link
              href="/register"
              className="font-medium text-[#4B49AC] hover:text-[#4B49AC]/80"
            >
              회원가입
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
