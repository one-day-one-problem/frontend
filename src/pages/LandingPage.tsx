import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import "../styles/global.css";

const LandingPage: React.FC = () => {
  return (
    <>
      {/* 상단 네비게이션 바 */}
      <Navigation />

      <div className="w-full pt-16">
        {/* 히어로 섹션 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#4B49AC]/10 via-[#7978E9]/5 to-white" />
          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-[#2D2B55]">
                매일 한 걸음씩,
                <br />더 나은 개발자로
              </h1>
              <p className="text-xl md:text-2xl text-gray-600">
                매일 아침, 맞춤형 기술 문제로 꾸준히 성장하는 개발자 학습 플랫폼
              </p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#4B49AC] text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-[#4B49AC]/90 transition-colors shadow-lg hover:shadow-xl"
                  >
                    무료로 시작하기
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
        </motion.div>

        {/* Features Section */}
        <div className="bg-white py-40">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-[#4B49AC] mb-4">
                당신의 관심사에 맞춘 학습
              </h2>
              <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                다양한 기술 영역에서 매일 아침 맞춤형 문제를 받아보며 꾸준히
                실력을 향상시키세요
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 hover-lift border border-[#4B49AC]/20"
              >
                <div className="text-4xl mb-6">💻</div>
                <h3 className="text-xl font-semibold mb-4 text-[#2D2B55]">
                  CS 기초부터 고급 개념까지
                </h3>
                <p className="text-gray-600">
                  자료구조, 알고리즘, 운영체제, 데이터베이스 등 CS 핵심 개념에
                  관한 맞춤형 문제를 매일 아침 이메일로 받아보세요.
                </p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-8 hover-lift border border-[#4B49AC]/20"
              >
                <div className="text-4xl mb-6">🌐</div>
                <h3 className="text-xl font-semibold mb-4 text-[#2D2B55]">
                  웹 개발 및 프레임워크
                </h3>
                <p className="text-gray-600">
                  Spring, React, Django 등 다양한 프레임워크 관련 실전 문제로
                  매일 기술 역량을 강화하세요.
                </p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-8 hover-lift border border-[#4B49AC]/20"
              >
                <div className="text-4xl mb-6">🔍</div>
                <h3 className="text-xl font-semibold mb-4 text-[#2D2B55]">
                  네트워크 및 보안
                </h3>
                <p className="text-gray-600">
                  TCP/IP, HTTP, 보안 프로토콜 등 네트워킹과 보안 관련 문제로
                  백엔드와 인프라에 대한 지식을 쌓아보세요.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-20 text-center"
            >
              <div className="inline-block bg-[#F7F7FC] px-8 py-5 rounded-xl border border-[#4B49AC]/20">
                <p className="text-[#2D2B55] text-lg">
                  <span className="font-semibold">곧 출시 예정:</span> 관심 있는
                  기술 카테고리를 설정하면 매일 아침 맞춤형 문제를 이메일로
                  받아보세요!
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div className="py-40 bg-gradient-to-t from-[#4B49AC]/20 via-[#4B49AC]/10 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-[#2D2B55] text-4xl font-bold mb-8">
                더 나은 개발자가 되는 여정
                <br />
                지금 시작하세요
              </h2>
              <div className="text-[#2D2B55] text-xl space-y-4">
                <p>
                  기초부터 심화까지
                  <br />
                  체계적인 학습 경험
                </p>
                <p className="text-[#2D2B55]/80 text-lg">
                  개발자에게 필요한 모든 것
                  <br />
                  하루하나와 함께 시작하세요
                </p>
              </div>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#4B49AC] text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-[#4B49AC]/90 transition-all duration-300 shadow-xl mt-12 hover:shadow-2xl"
                >
                  무료로 시작하기
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LandingPage;
