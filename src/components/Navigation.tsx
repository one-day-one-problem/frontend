import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navigation() {
  const { isAuthenticated } = useAuth();

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
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#4B49AC] text-white flex items-center justify-center">
                  <span className="text-sm font-medium">U</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <span className="text-gray-600 hover:text-gray-900">
                  로그인
                </span>
              </Link>
              <Link to="/register">
                <span className="text-gray-600 hover:text-gray-900">
                  시작하기
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navigation;
