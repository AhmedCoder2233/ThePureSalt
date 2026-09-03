// components/InspireSection.jsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

// 🎨 THEME COLORS - Pink Salt Theme
const THEME = {
  primary: '#D4867A',
  primaryDark: '#B86A5E',
  primaryLight: '#E8B8AE',
  primaryBg: '#FFFFFF',
  textPrimary: '#2A150E',
  textSecondary: '#4D2B20',
  textLight: '#7A5043',
};

const InspireSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const topText = "WORLD IS FULL WITH";
  const highlightText = "NATURE HEAL";
  const bottomText = "Together We can Bring";
  const bottomHighlight = "More Creativity into the";
  const bottomEnd = "World";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background Image - Himalayan Salt */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://plus.unsplash.com/premium_photo-1726079119122-eea1b0741c6f?w=1600&auto=format&fit=crop&q=80')`,
          }}
        />
        
        {/* Only a very light dark overlay for text readability */}
        <div className="absolute inset-0" style={{ 
          background: 'rgba(0,0,0,0.2)'
        }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Top Line - "WORLD IS FULL WITH" */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-sm font-medium uppercase tracking-[0.2em] text-white/80 drop-shadow-lg"
          >
            {topText}
          </motion.p>

          {/* Highlight - "NATURE HEAL" */}
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-2 font-sans text-5xl font-bold tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {highlightText}
          </motion.h2>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-4 h-[2px] w-20 rounded-full bg-white/60"
          />

          {/* Bottom Text - "Together We can Bring" */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 text-base font-medium tracking-wide text-white/90 drop-shadow-lg sm:text-lg md:text-xl"
          >
            {bottomText}
          </motion.p>

          {/* Bottom Highlight - "More Creativity into the" */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-1 font-sans text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {bottomHighlight}
          </motion.h3>

          {/* Bottom End - "World" */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-1 font-sans text-3xl font-bold tracking-tight drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ color: '#FFD4C8' }}
          >
            {bottomEnd}
          </motion.span>

          {/* CTA Button - "Get Started" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#2A150E] transition-all hover:bg-white/90 hover:shadow-xl shadow-lg"
              style={{ 
                boxShadow: `0 8px 30px rgba(0,0,0,0.3)`
              }}
            >
              Get Started
              <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default InspireSection;