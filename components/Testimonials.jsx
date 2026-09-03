"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";

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

const testimonials = [
  {
    name: "Importer, Wellness Retail",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    review:
      "Consistent quality over several years. Their private label service helped us build our premium brand in Europe.",
  },
  {
    name: "Buyer, Spa & Wellness Chain",
    country: "United States",
    flag: "🇺🇸",
    rating: 5,
    review:
      "Outstanding salt lamps and bath salt, and a responsive team on every order.",
  },
  {
    name: "Buyer, Trading Company",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    rating: 5,
    review: "Excellent range and competitive pricing. Very responsive team.",
  },
  {
    name: "Buyer, Import Distributor",
    country: "China",
    flag: "🇨🇳",
    rating: 5,
    review:
      "Full container loads every month. The consistency of color, grain size, and mineral content is remarkable.",
  },
  {
    name: "Owner, Spa Studio",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 5,
    review:
      "Salt room materials transformed our spa. Perfectly cut bricks with incredible warm glow.",
  },
  {
    name: "Owner, Restaurant Group",
    country: "Australia",
    flag: "🇦🇺",
    rating: 5,
    review: "Cooking blocks and shot glasses are a hit with guests.",
  },
];

const AUTOPLAY_DELAY = 5000;
const RESUME_DELAY = 7000;

function useVisibleCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 768) setCount(1);
      else if (w < 1024) setCount(2);
      else setCount(3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return count;
}

function Stars({ rating }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={
            i < rating ? "w-3.5 h-3.5" : "text-stone-200 w-3.5 h-3.5"
          }
          style={i < rating ? { color: THEME.primary } : {}}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ item }) {
  return (
    <div
      className="relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden bg-white px-8 py-9 border transition-all duration-300 hover:border-[#F47C20]/30 hover:shadow-[0_10px_30px_-18px_rgba(244,124,32,0.3)]"
      style={{
        borderColor: `${THEME.primary}20`,
        boxShadow: `0 10px 30px -18px ${THEME.shadow}40`,
      }}
    >
      <RiDoubleQuotesL 
        className="absolute -top-2 right-6 w-24 h-24 pointer-events-none"
        style={{ color: `${THEME.primary}10` }}
      />

      <div className="relative">
        <Stars rating={item.rating} />
        <p className="mt-5 text-[15px] leading-relaxed" style={{ color: THEME.textSecondary }}>
          &ldquo;{item.review}&rdquo;
        </p>
      </div>

      <div className="relative mt-8 flex items-center gap-3 border-t pt-5" style={{ borderColor: `${THEME.primary}15` }}>
        <div 
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
          style={{
            backgroundColor: `${THEME.primary}12`,
            color: THEME.primary,
          }}
        >
          {item.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-wide" style={{ color: THEME.textPrimary }}>
            {item.name}
          </p>
          <p className="mt-0.5 text-[12px]" style={{ color: THEME.textLight }}>
            {item.flag ? <span className="mr-1">{item.flag}</span> : null}
            {item.country}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const perView = useVisibleCount();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeout = useRef(null);
  const total = testimonials.length;

  const goTo = useCallback(
    (index, dir = 1) => {
      setDirection(dir);
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  const pauseThenResume = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  }, []);

  const handleManualNav = (fn) => () => {
    fn();
    pauseThenResume();
  };

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % total);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [isPaused, total]);

  useEffect(() => {
    return () => {
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };
  }, []);

  const visibleItems = Array.from({ length: perView }).map(
    (_, i) => testimonials[(current + i) % total]
  );

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 28 : -28 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -28 : 28 }),
  };

  return (
    <section
      className="py-28"
      style={{ backgroundColor: THEME.primaryBg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span 
              className="h-px w-8"
              style={{ backgroundColor: `${THEME.primary}50` }}
            />
            <p 
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: THEME.primary }}
            >
              Client Testimonials
            </p>
            <span 
              className="h-px w-8"
              style={{ backgroundColor: `${THEME.primary}50` }}
            />
          </div>
          <h2 
            className="font-display text-4xl font-bold sm:text-5xl"
            style={{ color: THEME.textPrimary }}
          >
            Trusted Worldwide
          </h2>
          <p 
            className="mt-4 text-[15px] leading-relaxed"
            style={{ color: THEME.textLight }}
          >
            From wellness retailers to hospitality brands, importers and buyers
            across the globe rely on our salt products, shipment after shipment.
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              {visibleItems.map((item, i) => (
                <motion.div
                  key={`${item.name}-${current}-${i}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.06 }}
                  className={i >= 1 && perView === 1 ? "hidden" : i >= 2 && perView === 2 ? "hidden" : ""}
                >
                  <TestimonialCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <motion.button
              type="button"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleManualNav(prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
              style={{
                borderColor: `${THEME.primary}30`,
                color: THEME.textLight,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = THEME.primary;
                e.currentTarget.style.color = THEME.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${THEME.primary}30`;
                e.currentTarget.style.color = THEME.textLight;
              }}
            >
              <FiChevronLeft className="h-4 w-4" />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={handleManualNav(() => goTo(i, i > current ? 1 : -1))}
                  className="py-1"
                >
                  <motion.span
                    animate={{
                      width: i === current ? 22 : 6,
                      backgroundColor: i === current ? THEME.primary : `${THEME.primary}40`,
                    }}
                    transition={{ duration: 0.3 }}
                    className="block h-1.5 rounded-full"
                  />
                </button>
              ))}
            </div>

            <motion.button
              type="button"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleManualNav(next)}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
              style={{
                borderColor: `${THEME.primary}30`,
                color: THEME.textLight,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = THEME.primary;
                e.currentTarget.style.color = THEME.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${THEME.primary}30`;
                e.currentTarget.style.color = THEME.textLight;
              }}
            >
              <FiChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}