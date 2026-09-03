"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

// 🎨 THEME COLORS - Same as Hero
const THEME = {
  primary: '#D4867A',        // Natural pink salt - main color
  primaryDark: '#B86A5E',    // Deeper pink salt
  primaryLight: '#E8B8AE',   // Light pink salt
  primaryBg: '#FDF5F0',      // Warm cream background
  bgDark: '#F5E4DC',         // Soft warm background
  textPrimary: '#2A150E',    // Darkest brown (salt rock color)
  textSecondary: '#4D2B20',  // Dark brown
  textLight: '#7A5043',      // Medium brown
  border: '#DCA89C',         // Pinkish border
  shadow: '#D4867A',
};

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Products", href: "#product" },
  { name: "Why Us", href: "#why-us" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main Navigation */}
      <nav
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-[#FDF5F0]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        style={scrolled ? { backgroundColor: `${THEME.primaryBg}E6` } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="#home" className="flex items-center shrink-0">
              <Image
                src="/logo1.png"
                alt="Authentic Himalayan Pink Salt"
                width={70}
                height={70}
                priority
                className="h-20 w-12 sm:h-20 sm:w-14 object-contain rounded-full"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-colors ${
                    scrolled
                      ? "hover:text-[#D4867A]"
                      : "text-white/90 hover:text-white"
                  }`}
                  style={scrolled ? { color: THEME.textSecondary } : {}}
                  onMouseEnter={(e) => {
                    if (scrolled) e.currentTarget.style.color = THEME.primary;
                  }}
                  onMouseLeave={(e) => {
                    if (scrolled) e.currentTarget.style.color = THEME.textSecondary;
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className="px-5 py-2.5 text-white text-sm font-semibold rounded-full transition-all hover:shadow-lg"
                style={{
                  backgroundColor: THEME.primary,
                  boxShadow: `0 4px 15px ${THEME.shadow}40`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = THEME.primaryDark;
                  e.currentTarget.style.boxShadow = `0 6px 25px ${THEME.shadow}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = THEME.primary;
                  e.currentTarget.style.boxShadow = `0 4px 15px ${THEME.shadow}40`;
                }}
              >
                Free Sample
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className={`lg:hidden p-2 transition-colors ${
                scrolled ? "text-[#2A150E]" : "text-white"
              }`}
              style={scrolled ? { color: THEME.textPrimary } : {}}
            >
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden backdrop-blur-md border-t overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            backgroundColor: `${THEME.primaryBg}F2`,
            borderColor: `${THEME.border}40`,
          }}
        >
          <div className="px-6 py-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{ color: THEME.textSecondary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = THEME.primary;
                  e.currentTarget.style.backgroundColor = `${THEME.primaryLight}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = THEME.textSecondary;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#sample"
              onClick={() => setIsOpen(false)}
              className="block text-center mt-3 px-5 py-2.5 text-white font-semibold rounded-full text-sm transition-all"
              style={{
                backgroundColor: THEME.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = THEME.primaryDark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = THEME.primary;
              }}
            >
              Free Sample
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}