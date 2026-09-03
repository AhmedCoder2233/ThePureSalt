// components/OurProcess.jsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GiMountains, GiTestTubes } from "react-icons/gi";
import { 
  FiSettings, 
  FiPackage, 
  FiTruck
} from "react-icons/fi";

// 🎨 THEME COLORS - Salt Lamp Orange Accent on Milky White (matches About.jsx)
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

const processSteps = [
  {
    id: "01",
    title: "Mining",
    description: "Hand-mined from Himalayan Salt Range.",
    icon: GiMountains,
  },
  {
    id: "02",
    title: "Testing",
    description: "Lab-tested for purity & compliance.",
    icon: GiTestTubes,
  },
  {
    id: "03",
    title: "Processing",
    description: "Food-grade stainless steel milling.",
    icon: FiSettings,
  },
  {
    id: "04",
    title: "Packaging",
    description: "Custom & private label options.",
    icon: FiPackage,
  },
  {
    id: "05",
    title: "Shipping",
    description: "Full container loads worldwide.",
    icon: FiTruck,
  }
];

const OurProcess = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.4
      }
    }
  };

  const mobileLineVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.4
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5 + (i * 0.15),
        ease: [0.34, 1.56, 0.64, 1]
      }
    })
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28 lg:py-36"
      style={{ backgroundColor: THEME.primaryBg }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, ${THEME.primary} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative mountain line art - Top */}
      <div className="absolute left-0 top-0 w-full overflow-hidden opacity-[0.03] pointer-events-none">
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 text-center md:mb-16 lg:mb-20"
        >
          <span 
            className="inline-block text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: THEME.primary }}
          >
            OUR PROCESS
          </span>
          <h2 className="mt-3 font-sans text-3xl font-bold text-black sm:text-4xl md:text-5xl lg:text-6xl">
            Mine to Market
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-stone-400 sm:text-base">
            From the mountains of Pakistan to customers worldwide
          </p>
        </motion.div>

        {/* Desktop Process - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Background line - Inactive */}
            <div className="absolute left-8 right-8 top-[58px] h-[1px] bg-stone-200/60"></div>
            
            {/* Animated progress line */}
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="absolute left-8 right-8 top-[58px] h-[1px] origin-left"
              style={{ 
                backgroundColor: THEME.primary,
                transformOrigin: "left center" 
              }}
            />

            {/* Steps */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex justify-between"
            >
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    variants={itemVariants}
                    className="relative flex flex-col items-center group"
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
                    }}
                  >
                    {/* Step Number */}
                    <motion.div
                      variants={dotVariants}
                      custom={index}
                      className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-black text-base font-bold text-white transition-all duration-300 group-hover:bg-[#F47C20] group-hover:scale-110 group-hover:shadow-lg"
                      style={{
                        boxShadow: `0 4px 15px ${THEME.shadow}30`
                      }}
                    >
                      {step.id}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.4 }}
                      className="mb-3 text-3xl transition-colors duration-300"
                      style={{ 
                        color: THEME.primary,
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = THEME.textPrimary}
                      onMouseLeave={(e) => e.currentTarget.style.color = THEME.primary}
                    >
                      <Icon />
                    </motion.div>

                    {/* Title */}
                    <h3 className="mb-1 text-base font-semibold text-black">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="max-w-[140px] text-center text-sm text-stone-500 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Decorative line under each step on hover */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 h-[2px] w-12 origin-center"
                      style={{ backgroundColor: THEME.primary }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Mobile/Tablet Process - Vertical Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical line container */}
            <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-stone-200/60"></div>
            
            {/* Animated vertical line */}
            <motion.div
              variants={mobileLineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="absolute left-6 top-0 w-[2px] origin-top"
              style={{ 
                backgroundColor: THEME.primary,
                transformOrigin: "top center" 
              }}
            />

            {/* Steps */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-12"
            >
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    variants={itemVariants}
                    className="relative flex items-start gap-6 pl-14 group"
                    whileHover={{
                      x: 4,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      variants={dotVariants}
                      custom={index}
                      className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-bold text-white transition-all duration-300 group-hover:bg-[#F47C20] group-hover:scale-110 group-hover:shadow-lg"
                      style={{
                        boxShadow: `0 4px 15px ${THEME.shadow}30`
                      }}
                    >
                      {step.id}
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.4 }}
                          className="text-2xl transition-colors duration-300"
                          style={{ 
                            color: THEME.primary,
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = THEME.textPrimary}
                          onMouseLeave={(e) => e.currentTarget.style.color = THEME.primary}
                        >
                          <Icon />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-black">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-stone-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-16 flex items-center justify-center gap-4 text-center"
        >
          <div 
            className="h-px flex-1 max-w-24"
            style={{ 
              background: `linear-gradient(to right, transparent, ${THEME.primary}50)` 
            }}
          ></div>
          <span 
            className="text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: `${THEME.primary}60` }}
          >
            Pure. Natural. Global.
          </span>
          <div 
            className="h-px flex-1 max-w-24"
            style={{ 
              background: `linear-gradient(to left, transparent, ${THEME.primary}50)` 
            }}
          ></div>
        </motion.div>
      </div>

      {/* Decorative mountain line art - Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none">
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
    </section>
  );
};

export default OurProcess;