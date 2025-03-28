import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface SocialLoginProvider {
  name: string;
  icon: string;
  bgColor: string;
  textColor: string;
  hoverColor: string;
  borderColor?: string;
  path: string;
}

// Social login providers configuration
const socialLogins: SocialLoginProvider[] = [
  {
    name: "카카오",
    icon: "/social/kakao.svg",
    bgColor: "bg-[#FEE500]",
    textColor: "text-[#000000]",
    hoverColor: "hover:bg-[#F6E000]",
    path: "/oauth2/authorization/kakao",
  },
  {
    name: "네이버",
    icon: "/social/naver.svg",
    bgColor: "bg-[#03C75A]",
    textColor: "text-white",
    hoverColor: "hover:bg-[#02B351]",
    path: "/oauth2/authorization/naver",
  },
  {
    name: "구글",
    icon: "/social/google.svg",
    bgColor: "bg-white",
    textColor: "text-gray-700",
    hoverColor: "hover:bg-gray-50",
    borderColor: "border border-gray-300",
    path: "/oauth2/authorization/google",
  },
];

const LoginPage: React.FC = () => {
  const handleSocialLogin = (path: string) => {
    const baseUrl = process.env.REACT_APP_API_URL || "";
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
          <Link to="/">
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
              to="/register"
              className="font-medium text-[#4B49AC] hover:text-[#4B49AC]/80"
            >
              회원가입
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
