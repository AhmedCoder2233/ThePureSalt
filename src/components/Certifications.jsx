// components/Certifications.jsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FiAward, 
  FiShield, 
  FiCheckCircle, 
  FiSearch,
  FiHexagon
} from "react-icons/fi";
import { MdFactory, MdVerified } from "react-icons/md";
import { GiLaurelsTrophy } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";

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

const certifications = [
  {
    id: "01",
    name: "ISO 9001",
    icon: FiAward,
    label: "Quality Management"
  },
  {
    id: "02",
    name: "ISO 22000",
    icon: MdVerified,
    label: "Food Safety"
  },
  {
    id: "03",
    name: "HACCP",
    icon: FiShield,
    label: "Hazard Analysis"
  },
  {
    id: "04",
    name: "Halal",
    icon: FiCheckCircle,
    label: "Halal Certified"
  },
  {
    id: "05",
    name: "Kosher",
    icon: GiLaurelsTrophy,
    label: "Kosher Certified"
  },
  {
    id: "06",
    name: "BRC",
    icon: FiHexagon,
    label: "Global Standard"
  },
  {
    id: "07",
    name: "Organic",
    icon: FaLeaf,
    label: "Organic Certified"
  },
  {
    id: "08",
    name: "GMP",
    icon: MdFactory,
    label: "Good Manufacturing"
  },
  {
    id: "09",
    name: "SGS",
    icon: FiSearch,
    label: "Inspection & Testing"
  }
];

const Certifications = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
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
            backgroundSize: "50px 50px",
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
            QUALITY ASSURANCE
          </span>
          <h2 className="mt-3 font-sans text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: THEME.textPrimary }}>
            Certifications
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base" style={{ color: THEME.textLight }}>
            Our products and processes follow internationally recognized quality, 
            food-safety, and compliance standards.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
                }}
                className="group relative overflow-hidden rounded-xl border p-6 transition-all duration-300"
                style={{
                  borderColor: `${THEME.primary}15`,
                  backgroundColor: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${THEME.primary}40`;
                  e.currentTarget.style.boxShadow = `0 4px 24px ${THEME.shadow}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${THEME.primary}15`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Subtle background gradient */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div 
                    className="absolute -top-24 -right-24 h-48 w-48 rounded-full"
                    style={{ backgroundColor: `${THEME.primary}06` }}
                  />
                  <div 
                    className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full"
                    style={{ backgroundColor: `${THEME.primary}06` }}
                  />
                </div>

                {/* Icon Container */}
                <div 
                  className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: `${THEME.primary}12`,
                    color: THEME.primary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${THEME.primary}20`;
                    e.currentTarget.style.color = THEME.primaryDark;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${THEME.primary}12`;
                    e.currentTarget.style.color = THEME.primary;
                  }}
                >
                  <Icon />
                </div>

                {/* Certification Name */}
                <h3 className="relative z-10 mb-1.5 text-base font-semibold" style={{ color: THEME.textPrimary }}>
                  {cert.name}
                </h3>

                {/* Label */}
                <p className="relative z-10 text-xs font-medium uppercase tracking-wider" style={{ color: THEME.textLight }}>
                  {cert.label}
                </p>

                {/* Decorative line on hover */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
                  style={{
                    background: `linear-gradient(to right, ${THEME.primary}, transparent)`,
                    transformOrigin: "left center"
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-12 flex items-center justify-center gap-4 text-center"
        >
          <div 
            className="h-px flex-1 max-w-24"
            style={{ 
              background: `linear-gradient(to right, transparent, ${THEME.primary}30)` 
            }}
          />
          <span 
            className="text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: `${THEME.primary}50` }}
          >
            Quality Assured
          </span>
          <div 
            className="h-px flex-1 max-w-24"
            style={{ 
              background: `linear-gradient(to left, transparent, ${THEME.primary}30)` 
            }}
          />
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

export default Certifications;