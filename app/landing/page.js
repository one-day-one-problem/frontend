"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/constants/landing/testimonials";
import { COMPANIES } from "@/constants/landing/companies";
import Link from "next/link";
import "../globals.css";

export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(TESTIMONIALS.length / 2);

  useEffect(() => {
    const logos = document.querySelector(".logo-slider");
    if (logos) {
      logos.appendChild(logos.children[0].cloneNode(true));
    }

    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [totalPages]);

  return (
    <>
      {/* 상단 네비게이션 바 */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#4B49AC]">하루하나</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/login">
              <span className="text-gray-600 hover:text-gray-900">로그인</span>
            </Link>
            <Link href="/register">
              <span className="text-gray-600 hover:text-gray-900">
                시작하기
              </span>
            </Link>
          </div>
        </div>
      </motion.nav>

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
                개발자의 성장을 위한 맞춤형 학습 플랫폼
              </p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Link href="/register">
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
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 hover-lift border border-[#4B49AC]/20"
              >
                <div className="text-4xl mb-6">🎯</div>
                <h3 className="text-xl font-semibold mb-4 text-[#2D2B55]">
                  매일 면접 준비를 하고 싶은데 의지력이 부족해요.
                </h3>
                <p className="text-gray-600">
                  간편한 구독 신청 한 번으로 매일 원하는 시간에 원하는 개수만큼
                  기술 면접에 필요한 지식을 쌓을 수 있어요!
                </p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-8 hover-lift border border-[#4B49AC]/20"
              >
                <div className="text-4xl mb-6">📚</div>
                <h3 className="text-xl font-semibold mb-4 text-[#2D2B55]">
                  매일 새로운 기술을 배우고 싶어요.
                </h3>
                <p className="text-gray-600">
                  하루하나의 다양한 학습 자료로 매일 새로운 기술을 배우고 성장할
                  수 있어요!
                </p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-8 hover-lift border border-[#4B49AC]/20"
              >
                <div className="text-4xl mb-6">💡</div>
                <h3 className="text-xl font-semibold mb-4 text-[#2D2B55]">
                  실무에 바로 적용할 수 있는 지식을 원해요.
                </h3>
                <p className="text-gray-600">
                  실무에 바로 적용할 수 있는 다양한 예제와 실습을 통해 실력을
                  키울 수 있어요!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="bg-gray-50 py-40 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl font-bold text-[#2D2B55] mb-4">
                가고 싶은 기업들
              </h2>
              <p className="text-gray-600 text-lg">
                하루하나와 함께 성장하여 꿈꾸는 기업에서 활약하세요
              </p>
            </motion.div>

            {/* Company Logos with Sliding Animation */}
            <div className="relative w-full overflow-hidden">
              <div className="flex">
                <motion.div
                  className="flex gap-8"
                  animate={{
                    x: [0, -1500],
                  }}
                  transition={{
                    x: {
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  style={{
                    width: "fit-content",
                    paddingRight: "2rem",
                  }}
                >
                  {[...COMPANIES, ...COMPANIES].map((company, index) => (
                    <div
                      key={`${company}-${index}`}
                      className="flex items-center justify-center p-8 bg-white rounded-lg shadow-sm min-w-[200px]"
                    >
                      <img
                        src={`/companies/${company}-logo.png`}
                        alt={company}
                        className="h-12 object-contain opacity-60 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section - 패딩 증가 */}
        <div className="bg-white py-40">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl font-bold text-[#4B49AC] mb-4">
                선배 개발자들의 이야기
              </h2>
              <p className="text-gray-600 text-lg">
                하루하나로 성장한 개발자들의 이야기를 들어보세요
              </p>
            </motion.div>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {TESTIMONIALS.slice(currentPage * 2, currentPage * 2 + 2).map(
                  (testimonial, index) => (
                    <motion.div
                      key={currentPage * 2 + index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="bg-gray-50 p-8 rounded-2xl min-h-[280px] flex flex-col"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-full border-4 border-[#4B49AC]/20"
                        />
                        <div>
                          <h3 className="font-semibold text-[#2a2a2a] text-2xl mb-1">
                            {testimonial.name}
                          </h3>
                          <p className="text-base text-gray-500">
                            {testimonial.role} @{" "}
                            <span className="text-[#4B49AC] font-medium">
                              {testimonial.company}
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-lg flex-grow">
                        {testimonial.content}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </div>
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
              <Link href="/login">
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
}
