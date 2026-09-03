"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPackage,
  FiBookOpen,
  FiTag,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

// 🎨 THEME COLORS - Salt Lamp Orange Glow (matches OurCollection.jsx)
const THEME = {
  primary: '#F47C20',        // Vibrant orange - main color
  primaryDark: '#D4650F',    // Deeper orange (hover/shade)
  primaryLight: '#FFA556',   // Bright glowing orange (lamp highlight)
  primaryBg: '#F47C20',      // Solid salt-lamp orange background
  bgDark: '#D4650F',         // Darker orange for gradient edges
  textPrimary: '#FFF8F0',    // Milky white - main text
  textSecondary: '#FFEFE0',  // Milky off-white - secondary text
  textLight: '#FFD9B3',      // Light milky border
  border: '#FFD9B3',         // Light milky border
  shadow: '#8B4513',
};

const PRODUCT_OPTIONS = [
  "Edible Salt",
  "Salt Lamps",
  "Bath Salt & Wellness",
  "Kitchen & Culinary",
  "Construction",
  "Animal Lick Salt",
  "Multiple Products",
  "Private Label / OEM",
];

const SAMPLE_KIT_ITEMS = [
  { icon: FiPackage, label: "Fine & coarse pink salt samples" },
  { icon: FiBookOpen, label: "Product catalog & price list" },
  { icon: MdOutlineVerified, label: "Certification documents" },
  { icon: FiTag, label: "Private label options guide" },
];

const WHATSAPP_NUMBER = "923377761491";
const WHATSAPP_DISPLAY = "+92 337 776 1491";
const CONTACT_EMAIL = "salthimalaya.com@gmail.com";

const CONTACT_ITEMS = [
  {
    icon: FiPhone,
    label: "Phone / WhatsApp",
    value: WHATSAPP_DISPLAY,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: FiMail,
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Gulistan-e-Johar, Karachi, Pakistan",
    href: "https://www.google.com/maps/search/?api=1&query=Gulistan-e-Johar+Karachi+Pakistan",
  },
  {
    icon: FiClock,
    label: "Hours",
    value: "Mon–Sat: 9 AM – 6 PM",
    href: null,
  },
];

const WHATSAPP_CTA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi! I'm interested in your Himalayan salt products. Please share details."
)}`;

const FOLLOW_UP_WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I just submitted a free sample request and would like to discuss the details."
)}`;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 🔑 EMAILJS CONFIG — pulled from .env.local (see .env.local.example)
// NOTE: must be prefixed with NEXT_PUBLIC_ since this is a client component
// and these values are sent from the browser.
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_OWNER_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_OWNER_TEMPLATE_ID;
const EMAILJS_AUTOREPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID || ""; // leave unset/empty to skip auto-reply

async function getVisitorIp() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data?.ip || "Unavailable";
  } catch {
    return "Unavailable";
  }
}

async function sendEmailJs(templateId, templateParams) {
  return fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: templateParams,
    }),
  });
}

const INITIAL_FORM = {
  fullName: "",
  email: "",
  company: "",
  phone: "",
  country: "",
  productInterest: "",
  message: "",
  website: "",
};

function validateForm(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.phone.trim()) errors.phone = "Phone / WhatsApp is required.";
  if (!values.country.trim()) errors.country = "Country is required.";
  if (!values.productInterest) errors.productInterest = "Select a product interest.";
  return errors;
}

function FieldLabel({ htmlFor, required, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
      style={{ color: THEME.textSecondary }}
    >
      {children} {required && <span style={{ color: THEME.primaryLight }}>*</span>}
    </label>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs" style={{ color: THEME.primaryLight }}>
      <FiAlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

const inputBase =
  "w-full rounded-lg border bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:ring-2 backdrop-blur-sm";

export default function FreeSample() {
  const [values, setValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (values.website.trim() !== "") {
      setStatus("success");
      setValues(INITIAL_FORM);
      return;
    }

    setStatus("submitting");

    try {
      const ip = await getVisitorIp();
      const submittedAt = new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      const templateParams = {
        fullName: values.fullName,
        email: values.email,
        company: values.company || "—",
        phone: values.phone,
        country: values.country,
        product_interest: values.productInterest,
        message: values.message || "—",
        ip_address: ip,
        submitted_at: submittedAt,
      };

      // 1) Notify the owner/client
      const ownerRes = await sendEmailJs(EMAILJS_OWNER_TEMPLATE_ID, templateParams);
      if (!ownerRes.ok) {
        setStatus("error");
        return;
      }

      // 2) Auto-reply to the user (optional — skip if no template set)
      if (EMAILJS_AUTOREPLY_TEMPLATE_ID) {
        await sendEmailJs(EMAILJS_AUTOREPLY_TEMPLATE_ID, {
          name: values.fullName,
          title: values.productInterest,
        }).catch(() => {}); // don't fail the whole submission if only the auto-reply fails
      }

      setStatus("success");
      setValues(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative overflow-hidden py-28" id="contact" style={{ backgroundColor: THEME.primaryBg }}>
      {/* Background gradient - warm salt-lamp glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${THEME.primaryLight}30, ${THEME.bgDark} 50%, ${THEME.primaryBg} 80%)`
        }}
      />

      {/* subtle decorative texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${THEME.textPrimary} 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8" style={{ backgroundColor: `${THEME.textPrimary}60` }} />
              <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: THEME.textPrimary }}>
                Try Before You Buy
              </p>
            </div>
            <h2 className="font-display text-4xl font-bold sm:text-5xl" style={{ color: THEME.textPrimary }}>
              Request a Free Sample
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: THEME.textSecondary }}>
              Experience our quality firsthand. Fill in your details and we&rsquo;ll
              send a complimentary sample kit.
            </p>

            {/* Sample Kit Includes */}
            <div className="mt-12">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: THEME.textPrimary }}>
                Sample Kit Includes
              </h3>
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="grid gap-3 sm:grid-cols-2"
              >
                {SAMPLE_KIT_ITEMS.map(({ icon: Icon, label }) => (
                  <motion.li
                    key={label}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="flex items-start gap-3 rounded-xl border p-4"
                    style={{
                      borderColor: `${THEME.textPrimary}20`,
                      backgroundColor: `${THEME.textPrimary}08`,
                    }}
                  >
                    <span 
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ 
                        backgroundColor: `${THEME.textPrimary}15`,
                        color: THEME.textPrimary,
                      }}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="pt-1.5 text-sm leading-snug" style={{ color: THEME.textSecondary }}>
                      {label}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div className="mt-10 flex items-center gap-3 text-xs" style={{ color: THEME.textSecondary }}>
              <MdOutlineVerified className="h-5 w-5 shrink-0" style={{ color: THEME.textPrimary }} />
              <span>Trusted by importers, distributors, and wellness brands worldwide.</span>
            </div>
          </motion.div>

          {/* RIGHT SIDE — FORM */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="rounded-2xl p-6 shadow-2xl sm:p-8"
            style={{ 
              backgroundColor: `${THEME.textPrimary}08`,
              boxShadow: `0 20px 60px -20px ${THEME.shadow}25`,
              borderColor: `${THEME.textPrimary}15`,
              borderWidth: 1,
            }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <span 
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ 
                      backgroundColor: `${THEME.textPrimary}15`,
                      color: THEME.textPrimary,
                    }}
                  >
                    <FiCheckCircle className="h-7 w-7" />
                  </span>
                  <h3 className="font-display text-2xl font-bold" style={{ color: THEME.textPrimary }}>
                    Request Received
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed" style={{ color: THEME.textSecondary }}>
                    Thank you! Your sample request has been received. We&rsquo;ll
                    contact you shortly.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={FOLLOW_UP_WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                      Continue on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="inline-flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors"
                      style={{
                        borderColor: `${THEME.textPrimary}25`,
                        color: THEME.textSecondary,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = THEME.textPrimary;
                        e.currentTarget.style.color = THEME.textPrimary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${THEME.textPrimary}25`;
                        e.currentTarget.style.color = THEME.textSecondary;
                      }}
                    >
                      Submit another request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <input
                    type="text"
                    name="website"
                    value={values.website}
                    onChange={handleChange("website")}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <FieldLabel htmlFor="fullName" required>
                        Full Name
                      </FieldLabel>
                      <input
                        id="fullName"
                        type="text"
                        value={values.fullName}
                        onChange={handleChange("fullName")}
                        placeholder="John Carter"
                        className={inputBase}
                        style={{ borderColor: `${THEME.textPrimary}20` }}
                        onFocus={(e) => {
                          e.target.style.borderColor = THEME.textPrimary;
                          e.target.style.boxShadow = `0 0 0 3px ${THEME.textPrimary}20`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = `${THEME.textPrimary}20`;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <FieldError message={errors.fullName} />
                    </div>

                    <div>
                      <FieldLabel htmlFor="email" required>
                        Email
                      </FieldLabel>
                      <input
                        id="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange("email")}
                        placeholder="john@company.com"
                        className={inputBase}
                        style={{ borderColor: `${THEME.textPrimary}20` }}
                        onFocus={(e) => {
                          e.target.style.borderColor = THEME.textPrimary;
                          e.target.style.boxShadow = `0 0 0 3px ${THEME.textPrimary}20`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = `${THEME.textPrimary}20`;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <FieldError message={errors.email} />
                    </div>

                    <div>
                      <FieldLabel htmlFor="company">Company</FieldLabel>
                      <input
                        id="company"
                        type="text"
                        value={values.company}
                        onChange={handleChange("company")}
                        placeholder="Company name"
                        className={inputBase}
                        style={{ borderColor: `${THEME.textPrimary}20` }}
                        onFocus={(e) => {
                          e.target.style.borderColor = THEME.textPrimary;
                          e.target.style.boxShadow = `0 0 0 3px ${THEME.textPrimary}20`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = `${THEME.textPrimary}20`;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div>
                      <FieldLabel htmlFor="phone" required>
                        Phone / WhatsApp
                      </FieldLabel>
                      <input
                        id="phone"
                        type="tel"
                        value={values.phone}
                        onChange={handleChange("phone")}
                        placeholder="+1 555 000 0000"
                        className={inputBase}
                        style={{ borderColor: `${THEME.textPrimary}20` }}
                        onFocus={(e) => {
                          e.target.style.borderColor = THEME.textPrimary;
                          e.target.style.boxShadow = `0 0 0 3px ${THEME.textPrimary}20`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = `${THEME.textPrimary}20`;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <FieldError message={errors.phone} />
                    </div>

                    <div>
                      <FieldLabel htmlFor="country" required>
                        Country
                      </FieldLabel>
                      <input
                        id="country"
                        type="text"
                        value={values.country}
                        onChange={handleChange("country")}
                        placeholder="Country"
                        className={inputBase}
                        style={{ borderColor: `${THEME.textPrimary}20` }}
                        onFocus={(e) => {
                          e.target.style.borderColor = THEME.textPrimary;
                          e.target.style.boxShadow = `0 0 0 3px ${THEME.textPrimary}20`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = `${THEME.textPrimary}20`;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <FieldError message={errors.country} />
                    </div>

                    <div>
                      <FieldLabel htmlFor="productInterest" required>
                        Product Interest
                      </FieldLabel>
                      <select
                        id="productInterest"
                        value={values.productInterest}
                        onChange={handleChange("productInterest")}
                        className={`${inputBase} appearance-none`}
                        style={{ borderColor: `${THEME.textPrimary}20` }}
                        onFocus={(e) => {
                          e.target.style.borderColor = THEME.textPrimary;
                          e.target.style.boxShadow = `0 0 0 3px ${THEME.textPrimary}20`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = `${THEME.textPrimary}20`;
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="" style={{ color: '#2A1508' }}>Select an option</option>
                        {PRODUCT_OPTIONS.map((option) => (
                          <option key={option} value={option} style={{ color: '#2A1508' }}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <FieldError message={errors.productInterest} />
                    </div>
                  </div>

                  <div className="mt-5">
                    <FieldLabel htmlFor="message">Message</FieldLabel>
                    <textarea
                      id="message"
                      rows={4}
                      value={values.message}
                      onChange={handleChange("message")}
                      placeholder="Tell us a bit about your requirements..."
                      className={`${inputBase} resize-none`}
                      style={{ borderColor: `${THEME.textPrimary}20` }}
                      onFocus={(e) => {
                        e.target.style.borderColor = THEME.textPrimary;
                        e.target.style.boxShadow = `0 0 0 3px ${THEME.textPrimary}20`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = `${THEME.textPrimary}20`;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {status === "error" && (
                    <div className="mt-5 flex items-start gap-2 rounded-lg border p-3 text-sm" style={{
                      borderColor: `${THEME.textPrimary}25`,
                      backgroundColor: `${THEME.textPrimary}08`,
                      color: THEME.textPrimary,
                    }}>
                      <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        Something went wrong. Please try again or contact us on
                        WhatsApp.
                      </span>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: status === "submitting" ? 1 : 1.01 }}
                    whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                    className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                    style={{ backgroundColor: THEME.textPrimary }}
                    onMouseEnter={(e) => {
                      if (status !== "submitting") e.currentTarget.style.backgroundColor = THEME.primaryLight;
                    }}
                    onMouseLeave={(e) => {
                      if (status !== "submitting") e.currentTarget.style.backgroundColor = THEME.textPrimary;
                    }}
                  >
                    {status === "submitting" ? "Submitting..." : "Submit"}
                  </motion.button>

                  <p className="mt-4 text-center text-[11px] leading-relaxed" style={{ color: THEME.textSecondary }}>
                    Your information is used only to respond to your sample request
                    and for fraud/spam prevention. We do not share your data with
                    third parties.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* GET IN TOUCH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-24 pt-16"
          style={{ borderTopColor: `${THEME.textPrimary}15` }}
        >
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8" style={{ backgroundColor: `${THEME.textPrimary}60` }} />
              <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: THEME.textPrimary }}>
                Get In Touch
              </p>
              <span className="h-px w-8" style={{ backgroundColor: `${THEME.textPrimary}60` }} />
            </div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl" style={{ color: THEME.textPrimary }}>
              Let&rsquo;s Talk Business
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <div className="flex h-full flex-col items-center gap-3 rounded-xl border p-6 text-center transition-colors" style={{
                  borderColor: `${THEME.textPrimary}12`,
                  backgroundColor: `${THEME.textPrimary}06`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${THEME.textPrimary}35`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${THEME.textPrimary}12`;
                }}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{
                    backgroundColor: `${THEME.textPrimary}15`,
                    color: THEME.textPrimary,
                  }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: THEME.textSecondary }}>
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-medium" style={{ color: THEME.textPrimary }}>{value}</p>
                  </div>
                </div>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <motion.a
              href={WHATSAPP_CTA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-lg bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white shadow-lg sm:w-auto"
              style={{ boxShadow: `0 8px 30px #25D36630` }}
            >
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp Us Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}