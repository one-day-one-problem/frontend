import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#4B49AC]">하루하나</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/login">
            <span className="text-gray-600 hover:text-gray-900">로그인</span>
          </Link>
          <Link to="/register">
            <span className="text-gray-600 hover:text-gray-900">시작하기</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navigation;
