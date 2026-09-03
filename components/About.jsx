// components/About.jsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// 🎨 THEME COLORS - Salt Lamp Orange Accent on Milky White
const THEME = {
  primary: '#F47C20',        // Vibrant orange - main accent color
  primaryDark: '#D4650F',    // Deeper orange
  primaryLight: '#FFA556',   // Bright glowing orange
  primaryBg: '#F6F6F4',      // Milky white background
  bgDark: '#EDE8E3',         // Soft warm off-white
  textPrimary: '#2A1508',    // Darkest brown (near-black) for body readability
  textSecondary: '#4D2B20',  // Dark brown
  textLight: '#7A5043',      // Medium brown
  border: '#FFD9B3',         // Light orange border
  shadow: '#F47C20',
};

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const paragraphs = [
    "Authentic Himalayan Pink Salt has been a trusted name since 1975, when we started as a family business with a simple hand stone crusher deep in the Himalayan mountains. What began with humble tools and generations of family knowledge has grown into a business built on the same values we started with.",
    "In 1998, we expanded beyond mining and became exporters, bringing our pure, natural Himalayan pink salt to customers around the world.",
    "We deal in all kinds of products made from Himalayan pink salt — crafted and customized as per our customers' requirements. Whether it's culinary salt, salt lamps, bath salts, or bulk industrial supply, every product we deliver carries the same promise of trust, purity, and reliability that our name stands for.",
    "Today, with nearly 50 years of experience behind us, we bring nature's purest mineral straight from the mountains to customers' requirements across the globe.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const yearVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 0.06,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden py-20 md:py-28 lg:py-36"
      style={{ backgroundColor: THEME.primaryBg }}
    >
      {/* Decorative mountain-inspired line art - Top */}
      <div className="absolute left-0 top-0 w-full overflow-hidden opacity-5">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 60L60 45L120 55L180 30L240 50L300 20L360 40L420 10L480 35L540 5L600 25L660 0L720 30L780 15L840 45L900 20L960 50L1020 35L1080 60L1140 40L1200 70L1260 55L1320 80L1380 65L1440 90V120H0V60Z"
            fill={THEME.primary}
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT SIDE - Editorial Area */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="sticky top-32">
              {/* Tagline - BIG TAGLINE - Thora uper */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mb-4"
              >
                <span 
                  className="inline-block text-base sm:text-lg font-bold uppercase tracking-[0.15em]"
                  style={{ color: THEME.primary }}
                >
                  50 Years of Excellence in Salt Manufacturing &amp; Supplying
                </span>
              </motion.div>

              {/* Eyebrow - ABOUT US CAPITAL and UPER */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-2 inline-block text-xs font-medium tracking-[0.3em]"
                style={{ color: THEME.primaryDark }}
              >
                Our Story
              </motion.div>

              {/* Heading - thora chota */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-sans text-4xl font-bold leading-[1.1] tracking-tight text-black sm:text-5xl md:text-6xl"
              >
                ABOUT US
              </motion.h2>

              {/* Decorative Element - Mountain inspired */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="my-6 h-[2px] w-16"
                style={{
                  background: `linear-gradient(to right, ${THEME.primary}, transparent)`,
                }}
              />

              {/* Large 1975 background number */}
              <motion.div
                variants={yearVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative"
              >
                <div 
                  className="font-sans text-[120px] font-black leading-none sm:text-[160px] md:text-[200px]"
                  style={{ color: THEME.primary, opacity: 0.06 }}
                >
                  1975
                </div>
              </motion.div>

              {/* Small year indicator */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-[-20px] flex items-center gap-3"
              >
                <span className="text-sm font-bold" style={{ color: THEME.primaryDark }}>EST.</span>
                <span className="text-sm font-bold text-black">1975</span>
                <span 
                  className="h-px flex-1"
                  style={{ backgroundColor: `${THEME.primary}40` }}
                ></span>
              </motion.div>

              {/* Timeline dots - decorative */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8 flex gap-4"
              >
                {[1975, 1998, 2024].map((year, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: `${THEME.primary}50` }}
                    ></div>
                    <span 
                      className="text-[10px] font-medium"
                      style={{ color: `${THEME.primary}60` }}
                    >
                      {year}
                    </span>
                    {index < 2 && (
                      <div 
                        className="h-px w-6"
                        style={{ backgroundColor: `${THEME.primary}30` }}
                      ></div>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Content */}
          <motion.div
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="space-y-6 md:space-y-8">
              {paragraphs.map((text, index) => (
                <motion.p
                  key={index}
                  variants={itemVariants}
                  className="max-w-2xl text-base leading-relaxed text-[#1a1a1a] sm:text-lg md:text-xl"
                  style={{
                    lineHeight: "1.8",
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Decorative bottom element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-12 flex items-center gap-4"
            >
              <div 
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(to right, ${THEME.primary}50, transparent)`,
                }}
              ></div>
              <div className="flex items-center gap-2">
                <div 
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: `${THEME.primary}60` }}
                ></div>
                <div 
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: `${THEME.primary}30` }}
                ></div>
                <div 
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: `${THEME.primary}15` }}
                ></div>
              </div>
              <span 
                className="text-[10px] font-medium uppercase tracking-[0.2em]"
                style={{ color: `${THEME.primary}50` }}
              >
                Pure Since 1975
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative mountain-inspired line art - Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-5">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full rotate-180"
        >
          <path
            d="M0 60L60 45L120 55L180 30L240 50L300 20L360 40L420 10L480 35L540 5L600 25L660 0L720 30L780 15L840 45L900 20L960 50L1020 35L1080 60L1140 40L1200 70L1260 55L1320 80L1380 65L1440 90V120H0V60Z"
            fill={THEME.primary}
          />
        </svg>
      </div>

      {/* Subtle salt mineral texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${THEME.primary} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </section>
  );
};

export default About;