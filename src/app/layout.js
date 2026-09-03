// app/layout.jsx
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "The Pure Himalayan Pink Salt — Premium Salt Exporter & Manufacturer",
    template: "%s | The Pure Himalayan Pink Salt"
  },
  description: "Premium Himalayan pink salt exporter since 1975. Direct from Pakistan's Khewra mines. 400+ products, 84+ trace minerals, exported to 60+ countries. ISO, HACCP, Halal, Kosher certified.",
  keywords: [
    "Himalayan pink salt",
    "pink salt exporter",
    "Himalayan salt manufacturer",
    "salt lamps",
    "edible salt",
    "bath salt",
    "Khewra salt mines",
    "Pakistan salt exporter",
    "bulk salt supplier",
    "private label salt",
    "Halal salt",
    "Kosher salt",
    "ISO certified salt"
  ],
  authors: [{ name: "The Pure Himalayan Pink Salt" }],
  creator: "The Pure Himalayan Pink Salt",
  publisher: "The Pure Himalayan Pink Salt",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "The Pure Himalayan Pink Salt — Premium Salt Exporter & Manufacturer",
    description: "Premium Himalayan pink salt exporter since 1975. Direct from Pakistan's Khewra mines. 400+ products, 84+ trace minerals, exported to 60+ countries.",
    url: "https://thepuresalt.com",
    siteName: "The Pure Himalayan Pink Salt",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Pure Himalayan Pink Salt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Pure Himalayan Pink Salt — Premium Salt Exporter",
    description: "Premium Himalayan pink salt exporter since 1975. Direct from Pakistan's Khewra mines.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://thepuresalt.com",
  },
  category: "Food & Beverage",
  classification: "Food Manufacturing, Salt Export",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Pure Himalayan Pink Salt",
              "description": "Premium Himalayan pink salt exporter and manufacturer since 1975. Direct from Pakistan's Khewra salt mines.",
              "url": "https://thepuresalt.com",
              "logo": "https://thepuresalt.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+92-337-776-1491",
                "contactType": "sales",
                "availableLanguage": ["English", "Urdu"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Karachi",
                "addressCountry": "PK"
              },
              "sameAs": [
                "https://www.facebook.com/yourpage",
                "https://www.instagram.com/yourpage",
                "https://www.linkedin.com/company/yourpage"
              ]
            })
          }}
        />

        {/* Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Himalayan Pink Salt",
              "description": "Premium grade Himalayan pink salt with 84+ trace minerals. Available in edible salt, salt lamps, bath salt, and culinary products.",
              "brand": {
                "@type": "Brand",
                "name": "The Pure Himalayan Pink Salt"
              },
              "manufacturer": {
                "@type": "Organization",
                "name": "The Pure Himalayan Pink Salt"
              },
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}