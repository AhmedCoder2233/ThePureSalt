// components/Footer.jsx
"use client";

import Link from "next/link";
import { FiMapPin, FiPhone, FiMail, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Smooth scroll function
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden pt-16 pb-6" style={{ backgroundColor: THEME.primaryBg }}>
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: `linear-gradient(to right, transparent, ${THEME.primary}25, transparent)`
      }} />

      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, ${THEME.primary} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link 
              href="#home" 
              onClick={(e) => handleScroll(e, "#home")}
              className="inline-flex items-center gap-2.5"
            >
              <span 
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: `${THEME.primary}20` }}
              >
                <span className="text-sm">🧂</span>
              </span>
              <span className="font-sans text-lg font-bold" style={{ color: THEME.textPrimary }}>
                The Pure{" "}
                <span 
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${THEME.primaryDark}, ${THEME.primary})`,
                  }}
                >
                  Salt
                </span>
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: THEME.textLight }}>
              Himalayan Pink Salt — sourced from Pakistan. Exported to 60+ countries worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>Quick Links</h4>
            <ul className="mt-3 space-y-2">
              {[
                { name: "Home", id: "/" },
                { name: "About", id: "#about" },
                { name: "Products", id: "#product" },
                { name: "Contact", id: "#contact" }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.id}
                    onClick={(e) => handleScroll(e, item.id)}
                    className="text-xs transition-colors"
                    style={{ color: THEME.textLight }}
                    onMouseEnter={(e) => e.currentTarget.style.color = THEME.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = THEME.textLight}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>Contact</h4>
            <ul className="mt-3 space-y-2.5">
              <li className="flex items-start gap-2.5 text-xs" style={{ color: THEME.textLight }}>
                <FiPhone className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: THEME.primary }} />
                <a 
                  href="tel:+923377761491" 
                  className="transition-colors"
                  style={{ color: THEME.textLight }}
                  onMouseEnter={(e) => e.currentTarget.style.color = THEME.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = THEME.textLight}
                >
                  +92 337 776 1491
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-xs" style={{ color: THEME.textLight }}>
                <FiMail className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: THEME.primary }} />
                <a 
                  href="mailto:salthimalaya.com@gmail.com" 
                  className="transition-colors"
                  style={{ color: THEME.textLight }}
                  onMouseEnter={(e) => e.currentTarget.style.color = THEME.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = THEME.textLight}
                >
                  salthimalaya.com@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-xs" style={{ color: THEME.textLight }}>
                <FiMapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: THEME.primary }} />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Gulistan-e-Johar+Karachi+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: THEME.textLight }}
                  onMouseEnter={(e) => e.currentTarget.style.color = THEME.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = THEME.textLight}
                >
                  Gulistan-e-Johar, Karachi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px" style={{
          background: `linear-gradient(to right, transparent, ${THEME.primary}20, transparent)`
        }} />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs" style={{ color: THEME.textLight }}>
            &copy; {currentYear} The Pure Himalayan Pink Salt. All rights reserved.
          </p>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/923377761491?text=Hi!%20I'm%20interested%20in%20your%20Himalayan%20salt%20products.%20Please%20share%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-medium text-white transition-all hover:scale-[1.02] hover:shadow-lg"
            style={{ boxShadow: `0 4px 20px #25D36630` }}
          >
            <FiMessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
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
    </footer>
  );
};

export default Footer;