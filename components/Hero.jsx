"use client";

// components/Hero.jsx
import Image from 'next/image';
import { FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { FiArrowUpRight } from 'react-icons/fi';
import { products } from './OurCollection';

// 🎨 THEME COLORS - Salt Lamp Orange Glow (milky text on orange bg)
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

const heroSlides = [
  {
    src: '/edible6.jpeg',
    productId: 'edible-fine', // Gourmet Edible Salt
  },
  {
    src: '/decor1.jpeg',
    productId: 'natural-lamp', // Home & Decor
  },
  {
    src: '/spa2.jpeg',
    productId: 'bath-salt', // Spa & Wellness
  },
  {
    src: '/kitchen1.jpeg',
    productId: 'cooking-slab', // Kitchen & Culinary
  },
  {
    src: '/salturn2.jpeg',
    productId: 'salt-urns', // Salt Urns
  },
  {
    src: '/animal5.jpeg',
    productId: 'animal-lick', // Animal Lick
  },
];

const Hero = () => {
  const column1Images = [...heroSlides, ...heroSlides];
  const column2Images = [...heroSlides, ...heroSlides];

  const handleSlideClick = (productId) => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('scrollToProduct', { detail: { productId } }));
  };

  const renderSlide = (slide, index, keyPrefix, aspectClass) => {
    const product = products.find((p) => p.id === slide.productId);

    return (
      <div
        key={`${keyPrefix}-${index}`}
        role="button"
        tabIndex={0}
        onClick={() => handleSlideClick(slide.productId)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSlideClick(slide.productId);
          }
        }}
        aria-label={`View ${product?.name ?? 'product'} in Our Collection`}
        className={`group relative ${aspectClass} w-full cursor-pointer overflow-hidden rounded-lg shadow-lg outline-none transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-pink-300/70 sm:rounded-xl`}
        style={{ boxShadow: `0 8px 30px ${THEME.shadow}30` }}
      >
        <Image
          src={slide.src}
          alt={product?.name ?? `Himalayan pink salt ${index + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 25vw"
          priority={index < 3}
          unoptimized={true}
        />
        {product && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-1.5 bg-gradient-to-t from-pink-900/75 via-pink-900/20 to-transparent px-2.5 py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="truncate text-[11px] font-medium text-white">{product.name}</span>
            <FiArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white" />
          </div>
        )}
      </div>
    );
  };

  return (
    <section 
      className="relative min-h-screen w-full overflow-hidden pt-16 sm:pt-20"
      style={{ backgroundColor: THEME.primaryBg }}
    >
      {/* Background gradient - warm salt-lamp glow, kept subtle for text contrast */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${THEME.primaryLight}30, ${THEME.bgDark} 50%, ${THEME.primaryBg} 80%)`
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-10 py-8 sm:gap-12 sm:py-12 md:gap-16 md:py-16 lg:flex-row lg:gap-16">
          {/* LEFT COLUMN - Content */}
          <div className="flex-1 space-y-5 px-2 text-center lg:text-left sm:space-y-6 md:space-y-8">
            {/* Badge */}
            <div 
              className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-medium tracking-wider sm:px-5 sm:py-2 sm:text-sm"
              style={{
                borderColor: `${THEME.textPrimary}50`,
                backgroundColor: 'rgba(0,0,0,0.22)',
                color: THEME.textPrimary,
              }}
            >
              <HiOutlineBadgeCheck 
                className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4"
                style={{ color: THEME.textPrimary }}
              />
              EXPORTING TO 60+ COUNTRIES
            </div>

            {/* Headline */}
            <h1 
              className="font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ color: THEME.textPrimary }}
            >
              Pure Himalayan
              <br />
              <span 
                style={{ color: THEME.textPrimary }}
              >
                Pink Salt
              </span>
            </h1>

            {/* Description */}
            <p 
              className="mx-auto max-w-md text-sm sm:text-base md:text-lg lg:mx-0 lg:max-w-lg"
              style={{ color: THEME.textSecondary }}
            >
              Sourced from ancient Himalayan salt mines. 400+ products with 84+ trace minerals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1 lg:justify-start sm:gap-4">
              <button 
                className="group flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold transition-all hover:shadow-xl sm:px-8 sm:py-3 sm:text-sm"
                style={{
                  backgroundColor: THEME.textPrimary,
                  color: THEME.primaryDark,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = THEME.primaryLight}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = THEME.textPrimary}
              >
                Explore Products
                <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
              </button>
              <button 
                className="flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold transition-all hover:shadow-lg sm:px-8 sm:py-3 sm:text-sm"
                style={{
                  border: `2px solid ${THEME.textPrimary}`,
                  color: THEME.textPrimary,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = THEME.textPrimary;
                  e.currentTarget.style.color = THEME.primaryDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = THEME.textPrimary;
                }}
              >
                <FaQuoteLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                Get a Quote
              </button>
            </div>

            {/* Trust/Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 lg:justify-start sm:gap-8">
              <div className="text-center">
                <div 
                  className="text-2xl font-bold sm:text-3xl"
                  style={{ color: THEME.textPrimary }}
                >
                  60+
                </div>
                <div 
                  className="text-[10px] uppercase tracking-wider sm:text-xs font-medium"
                  style={{ color: THEME.textSecondary }}
                >
                  Countries
                </div>
              </div>
              <div 
                className="h-8 w-px sm:h-10"
                style={{ backgroundColor: `${THEME.primary}30` }}
              />
              <div className="text-center">
                <div 
                  className="text-2xl font-bold sm:text-3xl"
                  style={{ color: THEME.textPrimary }}
                >
                  400+
                </div>
                <div 
                  className="text-[10px] uppercase tracking-wider sm:text-xs font-medium"
                  style={{ color: THEME.textSecondary }}
                >
                  Products
                </div>
              </div>
              <div 
                className="h-8 w-px sm:h-10"
                style={{ backgroundColor: `${THEME.primary}30` }}
              />
              <div className="text-center">
                <div 
                  className="text-2xl font-bold sm:text-3xl"
                  style={{ color: THEME.textPrimary }}
                >
                  50+
                </div>
                <div 
                  className="text-[10px] uppercase tracking-wider sm:text-xs font-medium"
                  style={{ color: THEME.textSecondary }}
                >
                  Years
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Vertical Image Carousels */}
          <div className="relative flex w-full max-w-md items-center justify-center gap-2 lg:max-w-none lg:flex-1 lg:justify-end lg:gap-3">
            {/* Subtle gradient overlays */}
            <div 
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                background: `linear-gradient(to top, ${THEME.primaryBg}, transparent 25%, ${THEME.primaryBg} 85%)`,
                opacity: 0.4,
              }}
            />

            {/* Column 1 - Moving Upward */}
            <div className="relative h-[280px] w-1/2 overflow-hidden rounded-xl sm:h-[350px] md:h-[400px] lg:h-[500px] lg:rounded-2xl">
              <div className="animate-scroll-up flex flex-col gap-3 sm:gap-4">
                {column1Images.map((slide, index) => renderSlide(slide, index, 'col1', 'aspect-[3/4]'))}
              </div>
            </div>

            {/* Column 2 - Moving Downward */}
            <div className="relative h-[280px] w-1/2 overflow-hidden rounded-xl sm:h-[350px] md:h-[400px] lg:h-[500px] lg:rounded-2xl">
              <div className="animate-scroll-down flex flex-col gap-3 sm:gap-4">
                {column2Images.map((slide, index) => renderSlide(slide, index, 'col2', 'aspect-[2/3]'))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
