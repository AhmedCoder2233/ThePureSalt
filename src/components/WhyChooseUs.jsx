// components/WhyChooseUs.jsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FiSettings, 
  FiShield, 
  FiGlobe, 
  FiTag, 
  FiMapPin, 
  FiGrid, 
  FiHeadphones
} from "react-icons/fi";
import { GiMountains } from "react-icons/gi";

// 🎨 THEME COLORS - Salt Lamp Orange Glow (matches OurCollection.jsx)
const THEME = {
  primary: '#F47C20',        // Vibrant orange - main color
  primaryDark: '#D4650F',    // Deeper orange (hover/shade)
  primaryLight: '#FFA556',   // Bright glowing orange (lamp highlight)
  primaryBg: '#F47C20',      // Solid salt-lamp orange background
  bgDark: '#D4650F',         // Darker orange for gradient edges
  textPrimary: '#FFF8F0',    // Milky white - main text
  textSecondary: '#FFEFE0',  // Milky off-white - secondary text
  border: '#FFD9B3',         // Light milky border
  gradientStart: '#FFA556',
  gradientEnd: '#B85218',
  shadow: '#8B4513',
};

const advantages = [
  {
    id: "01",
    title: "Direct from Mines",
    description: "250 million years of natural purity.",
    icon: GiMountains,
  },
  {
    id: "02",
    title: "Modern Processing",
    description: "Food-grade stainless steel plant.",
    icon: FiSettings,
  },
  {
    id: "03",
    title: "Certified Quality",
    description: "ISO, HACCP, Halal, Kosher.",
    icon: FiShield,
  },
  {
    id: "04",
    title: "Global Shipping",
    description: "20ft & 40ft container loads.",
    icon: FiGlobe,
  },
  {
    id: "05",
    title: "Private Label",
    description: "Custom branding & packaging.",
    icon: FiTag,
  },
  {
    id: "06",
    title: "60+ Countries",
    description: "Trusted by 500+ brands worldwide.",
    icon: FiMapPin,
  },
  {
    id: "07",
    title: "400+ Products",
    description: "Most comprehensive salt range.",
    icon: FiGrid,
  },
  {
    id: "08",
    title: "24/7 Support",
    description: "Dedicated account managers.",
    icon: FiHeadphones,
  }
];

const stats = [
  { value: "50+", label: "Years" },
  { value: "500+", label: "Clients" },
  { value: "60+", label: "Countries" },
  { value: "10K+", label: "Tons/Month" }
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative overflow-hidden py-20 md:py-28 lg:py-36"
      style={{ backgroundColor: THEME.primaryBg }}
    >
      {/* Background gradient - warm salt-lamp glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${THEME.primaryLight}30, ${THEME.bgDark} 50%, ${THEME.primaryBg} 80%)`
        }}
      />

      {/* Subtle salt mineral texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, ${THEME.textPrimary} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Decorative mountain line art - Top */}
      <div className="absolute left-0 top-0 w-full overflow-hidden opacity-[0.05] pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 60L60 45L120 55L180 30L240 50L300 20L360 40L420 10L480 35L540 5L600 25L660 0L720 30L780 15L840 45L900 20L960 50L1020 35L1080 60L1140 40L1200 70L1260 55L1320 80L1380 65L1440 90V120H0V60Z"
            fill={THEME.textPrimary}
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
            style={{ color: THEME.textPrimary }}
          >
            WHY CHOOSE US
          </span>
          <h2 className="mt-3 font-sans text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: THEME.textPrimary }}>
            The Pure Salt Advantage
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base" style={{ color: THEME.textSecondary }}>
            From the Himalayan Salt Range to customers around the world, quality, 
            consistency and reliability define every shipment.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {advantages.map((advantage) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={advantage.id}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
                }}
                className="group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300"
                style={{
                  borderColor: `${THEME.textPrimary}20`,
                  backgroundColor: `${THEME.textPrimary}08`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${THEME.textPrimary}50`;
                  e.currentTarget.style.backgroundColor = `${THEME.textPrimary}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${THEME.textPrimary}20`;
                  e.currentTarget.style.backgroundColor = `${THEME.textPrimary}08`;
                }}
              >
                {/* Background Number */}
                <div 
                  className="absolute -right-2 -top-2 text-[80px] font-bold leading-none select-none"
                  style={{ color: `${THEME.textPrimary}10` }}
                >
                  {advantage.id}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 mb-4 text-3xl transition-colors duration-300"
                  style={{ color: THEME.textPrimary }}
                  onMouseEnter={(e) => e.currentTarget.style.color = THEME.primaryLight}
                  onMouseLeave={(e) => e.currentTarget.style.color = THEME.textPrimary}
                >
                  <Icon />
                </motion.div>

                {/* Title */}
                <h3 className="relative z-10 mb-1.5 text-base font-semibold" style={{ color: THEME.textPrimary }}>
                  {advantage.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-sm leading-relaxed" style={{ color: THEME.textSecondary }}>
                  {advantage.description}
                </p>

                {/* Decorative line on hover */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
                  style={{
                    background: `linear-gradient(to right, ${THEME.textPrimary}, transparent)`,
                    transformOrigin: "left center"
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-16 rounded-2xl border p-8 md:mt-20 lg:mt-24"
          style={{
            borderColor: `${THEME.textPrimary}20`,
            backgroundColor: `${THEME.textPrimary}08`,
          }}
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="relative text-center"
              >
                {/* Vertical divider for desktop */}
                {index > 0 && (
                  <div 
                    className="absolute left-0 top-1/2 hidden -translate-y-1/2 md:block h-12 w-px"
                    style={{ backgroundColor: `${THEME.textPrimary}15` }}
                  />
                )}
                
                {/* Horizontal divider for mobile */}
                {index > 0 && index % 2 === 0 && (
                  <div 
                    className="absolute -top-3 left-0 right-0 block md:hidden h-px"
                    style={{ backgroundColor: `${THEME.textPrimary}10` }}
                  />
                )}

                <div className="relative">
                  <div 
                    className="font-sans text-4xl font-bold sm:text-5xl md:text-6xl"
                    style={{ color: THEME.textPrimary }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="mt-1 text-sm uppercase tracking-wider"
                    style={{ color: THEME.textSecondary }}
                  >
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              background: `linear-gradient(to right, transparent, ${THEME.textPrimary}40)` 
            }}
          ></div>
          <span 
            className="text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: `${THEME.textSecondary}60` }}
          >
            Trusted Worldwide
          </span>
          <div 
            className="h-px flex-1 max-w-24"
            style={{ 
              background: `linear-gradient(to left, transparent, ${THEME.textPrimary}40)` 
            }}
          ></div>
        </motion.div>
      </div>

      {/* Decorative mountain line art - Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-[0.05] pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full rotate-180"
        >
          <path
            d="M0 60L60 45L120 55L180 30L240 50L300 20L360 40L420 10L480 35L540 5L600 25L660 0L720 30L780 15L840 45L900 20L960 50L1020 35L1080 60L1140 40L1200 70L1260 55L1320 80L1380 65L1440 90V120H0V60Z"
            fill={THEME.textPrimary}
          />
        </svg>
      </div>
    </section>
  );
};

export default WhyChooseUs;