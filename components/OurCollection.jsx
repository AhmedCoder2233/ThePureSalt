// components/OurCollection.jsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FiX,
  FiArrowRight,
  FiChevronRight,
  FiChevronLeft,
  FiEye,
  FiImage,
  FiInfo,
  FiPackage,
  FiLayers,
  FiCheckCircle,
  FiMessageCircle,
  FiStar,
} from "react-icons/fi";

// 🎨 THEME COLORS - Salt Lamp Orange Glow (matches Hero.jsx)
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

// ============================================================
// Product Data - UPDATED CATEGORIES
// ============================================================
export const products = [
  // ========== GOURMET EDIBLE SALT ==========
  {
    id: "edible-fine",
    name: "Fine Grain Edible Salt",
    category: "Gourmet Edible Salt",
    image:
      "/edible6.jpeg", // grain-size progression bowls (fine end)
    gallery: [
      "/edible9.jpeg", // fine salt in wooden bowl w/ burlap sacks
      "/edible8.jpeg", // fine powder scoop
    ],
    shortDesc: "Food-grade fine Himalayan pink salt for everyday cooking and seasoning.",
    longDesc:
      "Our Fine Grain Edible Himalayan Pink Salt is carefully processed from the purest salt crystals sourced from the Himalayan Salt Range. This food-grade salt dissolves quickly, making it perfect for everyday cooking, baking, and seasoning. It contains 84+ trace minerals including magnesium, potassium, calcium, and iron.",
    variants: [
      {
        name: "Light Pink Fine (0.1-0.5mm)",
        details: "Delicate pink hue, table salt replacement",
        description:
          "Our most popular edible salt. The light pink color comes from trace iron content. Dissolves instantly in cooking and baking. Perfect as an everyday table salt replacement with the added benefit of 84+ natural trace minerals. Available in retail and bulk packaging.",
        sizes: ["500g", "1kg", "5kg", "10kg", "25kg"],
        colors: ["Light Pink"],
        moq: "1 Ton",
        image:
          "/edible9.jpeg",
        specs: {
          "Grain Size": "0.1 – 0.5 mm",
          "NaCl Content": "98.35%",
          Moisture: "< 0.1%",
          "Mineral Count": "84+",
          "Shelf Life": "5 years",
          Certification: "Halal, Kosher",
        },
      },
      {
        name: "Dark Pink Fine (0.1-0.5mm)",
        details: "Rich pink color, higher mineral content",
        description:
          "A deeper, richer pink color indicating higher concentrations of iron and other trace minerals. Preferred by gourmet brands and health-conscious consumers who want maximum mineral benefits. Same fine grain size as light pink but with a more pronounced visual and taste profile.",
        sizes: ["500g", "1kg", "5kg", "10kg", "25kg"],
        colors: ["Dark Pink"],
        moq: "1 Ton",
        image:
          "/edible8.jpeg",
        specs: {
          "Grain Size": "0.1 – 0.5 mm",
          "NaCl Content": "97.5%",
          "Iron Content": "Higher",
          "Mineral Count": "84+",
          "Shelf Life": "5 years",
          "Best For": "Gourmet brands",
        },
      },
      {
        name: "White Fine (0.1-0.5mm)",
        details: "Purest white Himalayan salt, mild flavor",
        description:
          "The rarest variety — pure white Himalayan salt crystals with the highest sodium chloride content and mildest flavor. Ideal for brands that want Himalayan origin without the pink color. Often used in pharmaceutical and cosmetic applications.",
        sizes: ["500g", "1kg", "5kg", "10kg", "25kg"],
        colors: ["White"],
        moq: "1 Ton",
        image:
          "/edible6.jpeg",
        specs: {
          "Grain Size": "0.1 – 0.5 mm",
          "NaCl Content": "99.2%",
          Color: "Pure White",
          "Mineral Count": "80+",
          Rarity: "Premium grade",
          "Best For": "Pharma & cosmetic",
        },
      },
      {
        name: "Iodized Fine Salt",
        details: "Fortified with iodine for dietary needs",
        description:
          "Himalayan pink salt fortified with potassium iodate to meet WHO iodine intake recommendations. Combines the natural mineral benefits of Himalayan salt with essential iodine supplementation. Compliant with international food fortification standards.",
        sizes: ["500g", "1kg", "5kg", "25kg"],
        colors: ["Light Pink", "White"],
        moq: "1 Ton",
        image:
          "/edible9.jpeg",
        specs: {
          "Grain Size": "0.1 – 0.5 mm",
          Iodine: "30-40 ppm KIO3",
          "NaCl Content": "98%",
          Standard: "WHO compliant",
          "Best For": "Table salt market",
        },
      },
    ],
    features: ["84+ trace minerals", "No additives or preservatives", "Halal & Kosher certified", "Non-GMO"],
    applications: ["Daily cooking", "Baking", "Table seasoning", "Food processing", "Seasoning blends"],
    icon: "🧂",
  },
  {
    id: "edible-coarse",
    name: "Coarse Grain Edible Salt",
    category: "Gourmet Edible Salt",
    image:
      "/edible4.jpeg", // large pile of coarse crystals
    gallery: [
      "/edible7.jpeg", // wooden spoon with coarse crystals
      "/edible2.jpeg", // bowl of coarse pink salt
    ],
    shortDesc: "Premium coarse Himalayan pink salt ideal for grinders and gourmet use.",
    longDesc:
      "Premium Coarse Grain Himalayan Salt is perfect for salt grinders, rubs, marinades, and finishing dishes. The larger crystal size adds visual appeal and a satisfying crunch.",
    variants: [
      {
        name: "Coarse (2-5mm)",
        details: "Standard grinder size, most popular",
        description:
          "The most popular grain size for refillable salt grinders and mills. Crystals are perfectly sized to work with all standard ceramic and metal grinding mechanisms. Adds a slow-release flavor burst and visual crunch to finished dishes.",
        sizes: ["500g", "1kg", "5kg", "25kg", "50kg"],
        colors: ["Light Pink", "Dark Pink"],
        moq: "1 Ton",
        image:
          "/edible2.jpeg",
        specs: { "Grain Size": "2 – 5 mm", NaCl: "98%", "Best For": "Salt grinders", Packaging: "Bulk & retail" },
      },
      {
        name: "Extra Coarse (3-8mm)",
        details: "Large crystals for decorative & grinders",
        description:
          "Larger crystal format that is stunning for decorative salt bowls, premium grinders, and display jars. The bigger crystals showcase the natural pink-to-orange color variations beautifully and are a favorite for high-end retail presentation.",
        sizes: ["1kg", "5kg", "25kg"],
        colors: ["Light Pink", "Dark Pink", "White"],
        moq: "1 Ton",
        image:
          "/edible4.jpeg",
        specs: { "Grain Size": "3 – 8 mm", NaCl: "98%", "Best For": "Display & premium retail" },
      },
      {
        name: "Granulated (1-2mm)",
        details: "Medium grain, versatile cooking salt",
        description:
          "A versatile medium grain that sits between fine and coarse. Ideal for meat rubs, marinades, and spice blends where you want visible salt crystals that dissolve moderately during cooking. Popular with seasoning blend manufacturers.",
        sizes: ["500g", "1kg", "5kg", "25kg"],
        colors: ["Light Pink", "Dark Pink"],
        moq: "1 Ton",
        image:
          "/edible7.jpeg",
        specs: { "Grain Size": "1 – 2 mm", NaCl: "98%", "Best For": "Rubs & blends" },
      },
    ],
    features: ["Slow-release flavor", "Beautiful crystal structure", "Rich mineral content", "Ideal for grinders", "Gourmet quality"],
    applications: ["Salt grinders", "Meat rubs", "Marinades", "Finishing salt", "Decorative plating"],
    icon: "✨",
  },
  {
    id: "salt-chunks",
    name: "Pink Salt Lumps & Chunks",
    category: "Gourmet Edible Salt",
    image:
      "/edible9.jpeg", // burlap sacks with raw chunks
    gallery: [
      "/edible5.jpeg", // bowls + raw chunks nearby
      "/edible4.jpeg", // large crystal pile
    ],
    shortDesc: "Raw Himalayan salt chunks for sole water, grinders, and decor.",
    longDesc:
      "Natural Himalayan Salt Lumps & Chunks are raw, unprocessed crystals harvested directly from the mine. They retain maximum mineral content.",
    variants: [
      {
        name: "Small Chunks (2-5cm)",
        details: "Pebble size for sole water and jars",
        description:
          "Small pebble-sized chunks perfect for making sole water (a saturated salt solution used as a daily mineral supplement). Also popular for filling decorative jars and as a raw ingredient for artisan salt producers.",
        sizes: ["1kg", "5kg", "25kg"],
        colors: ["Light Pink", "Dark Pink", "White"],
        moq: "1 Ton",
        image:
          "/edible5.jpeg",
        specs: { "Chunk Size": "2 – 5 cm", State: "100% raw", "Best For": "Sole water & jars" },
      },
      {
        name: "Medium Chunks (5-10cm)",
        details: "Display and wellness use",
        description:
          "Mid-size chunks ideal for wellness bowls, salt room floor material, and decorative displays. Each chunk shows the beautiful natural color layers from the mine. Excellent for spa and wellness retail.",
        sizes: ["5kg", "25kg", "50kg"],
        colors: ["Light Pink", "Dark Pink"],
        moq: "1 Ton",
        image:
          "/edible9.jpeg",
        specs: { "Chunk Size": "5 – 10 cm", State: "100% raw", "Best For": "Wellness & display" },
      },
      {
        name: "Large Lumps (10-20cm)",
        details: "Decorative and lamp-making crystals",
        description:
          "Large raw crystal lumps used primarily for crafting salt lamps, large decorative pieces, and premium display items. Selected for structural integrity and rich color saturation.",
        sizes: ["25kg", "50kg"],
        colors: ["Dark Pink", "Orange"],
        moq: "2 Tons",
        image:
          "/edible4.jpeg",
        specs: { "Chunk Size": "10 – 20 cm", State: "100% raw", "Best For": "Lamp crafting" },
      },
    ],
    features: ["100% raw and unprocessed", "Maximum mineral retention", "Natural crystal shapes", "Multi-use product"],
    applications: ["Sole water preparation", "Decorative bowls", "Lamp crafting", "Wellness rituals"],
    icon: "💎",
  },
  {
    id: "black-salt",
    name: "Himalayan Black Salt (Kala Namak)",
    category: "Gourmet Edible Salt",
    image:
      "/edible1.jpeg", // dark reddish-brown raw chunks in bag - actual black salt look
    gallery: [
      "/edible3.jpeg", // 6-bowl comparison incl. dark/black salt bowl
    ],
    shortDesc: "Traditional Kala Namak with distinctive sulfurous flavor.",
    longDesc:
      "Himalayan Black Salt (Kala Namak) is a kiln-fired salt with a distinctive sulfurous aroma. Prized in South Asian cuisine and Ayurvedic medicine.",
    variants: [
      {
        name: "Fine Black Salt (0.1-0.5mm)",
        details: "Powder form for seasoning",
        description:
          "Fine powder form of Kala Namak ideal for direct seasoning of chaat, salads, raita, and vegan egg dishes. The sulfurous flavor is immediately noticeable and adds an authentic South Asian taste.",
        sizes: ["500g", "1kg", "5kg", "25kg"],
        colors: ["Dark Purple-Black"],
        moq: "500 kg",
        image:
          "/edible3.jpeg",
        specs: { Grain: "0.1 – 0.5 mm", Color: "Dark purple-black", Flavor: "Strong sulfurous", "Best For": "Chaat & vegan eggs" },
      },
      {
        name: "Coarse Black Salt (2-5mm)",
        details: "Grinder-ready crystals",
        description:
          "Coarse crystals designed for salt grinders. Releases the sulfurous aroma freshly with each grind. Preferred by restaurants and gourmet home cooks.",
        sizes: ["500g", "1kg", "5kg", "25kg"],
        colors: ["Dark Purple-Black"],
        moq: "500 kg",
        image:
          "/edible1.jpeg",
        specs: { Grain: "2 – 5 mm", Color: "Dark purple-black", "Best For": "Grinders & restaurants" },
      },
      {
        name: "Black Salt Chunks",
        details: "Raw chunks for traditional use",
        description:
          "Raw Kala Namak chunks used in traditional Ayurvedic remedies and for crushing fresh at home. The chunks preserve maximum aroma until use.",
        sizes: ["1kg", "5kg", "25kg"],
        colors: ["Dark Brown-Black"],
        moq: "1 Ton",
        image:
          "/edible1.jpeg",
        specs: { Size: "Raw chunks", Color: "Dark brown-black", "Best For": "Ayurvedic & traditional" },
      },
    ],
    features: ["Rich sulfurous aroma", "High iron content", "Ayurvedic benefits", "Vegan egg flavor substitute"],
    applications: ["Chaat masala", "Vegan cooking", "Ayurvedic medicine", "Digestive aid", "South Asian cuisine"],
    icon: "🌑",
  },

  // ========== HOME & DECOR ==========
  {
    id: "natural-lamp",
    name: "Natural Shape Salt Lamps",
    category: "Home & Decor",
    image:
      "/decor1.jpeg", // clean single natural lamp w/ plants
    gallery: [
      "/decor10.jpeg", // assorted lit lamps
      "/decor9.jpeg", // two lamps lit side by side
      "/decor8.jpeg", // many lamps market display
    ],
    shortDesc: "Hand-selected natural shape salt lamps with warm amber glow.",
    longDesc:
      "Each lamp is unique in shape and color, emitting a warm, soothing amber glow. They act as natural air purifiers by releasing negative ions. Mounted on a premium wooden base with UL-certified fittings.",
    variants: [
      {
        name: "Mini (2-3 kg)",
        details: "Bedside tables & small spaces",
        description:
          "Compact size perfect for nightstands and small desks. Provides a gentle warm glow without overwhelming a small room. A popular gift item and entry-level product for salt lamp retailers.",
        sizes: ["2-3 kg"],
        colors: ["Light Pink", "Orange", "Dark Pink"],
        moq: "500 pcs",
        image:
          "/decor6.jpeg",
        specs: { Weight: "2 – 3 kg", Coverage: "~50 sq ft", Base: "Neem wood", Bulb: "15W incandescent", Cord: "6ft UL-certified" },
      },
      {
        name: "Small (3-5 kg)",
        details: "Desks and side tables",
        description:
          "The bestselling size. Ideal for office desks, side tables, and bedroom dressers. Provides effective ionization for small-to-medium rooms. Each lamp varies in shape and color pattern.",
        sizes: ["3-5 kg"],
        colors: ["Light Pink", "Orange", "Dark Pink"],
        moq: "500 pcs",
        image:
          "/decor9.jpeg",
        specs: { Weight: "3 – 5 kg", Coverage: "~80 sq ft", Base: "Neem wood", Bulb: "15W incandescent", Cord: "6ft UL-certified" },
      },
      {
        name: "Medium (5-7 kg)",
        details: "Living rooms and bedrooms",
        description:
          "Medium size for living rooms, bedrooms, and yoga studios. Strong warm glow and effective air purification for rooms up to 150 sq ft. A centerpiece item.",
        sizes: ["5-7 kg"],
        colors: ["Light Pink", "Orange", "Dark Pink"],
        moq: "300 pcs",
        image:
          "/decor10.jpeg",
        specs: { Weight: "5 – 7 kg", Coverage: "~150 sq ft", Base: "Neem wood", Bulb: "25W incandescent" },
      },
      {
        name: "Large (7-10 kg)",
        details: "Statement piece for large rooms",
        description:
          "A bold statement piece for large living rooms, lobbies, and spa reception areas. The larger crystal mass emits more negative ions and creates a dramatic ambient glow.",
        sizes: ["7-10 kg"],
        colors: ["Light Pink", "Orange", "Dark Pink"],
        moq: "200 pcs",
        image:
          "/decor8.jpeg",
        specs: { Weight: "7 – 10 kg", Coverage: "~200 sq ft", Base: "Neem wood", Bulb: "25W incandescent" },
      },
      {
        name: "Jumbo (10-15 kg)",
        details: "Grand display lamp",
        description:
          "Premium jumbo lamps for wellness centers, hotel lobbies, and collector-grade home decor. The sheer mass creates an impressive warm radiance.",
        sizes: ["10-15 kg"],
        colors: ["Orange", "Dark Pink"],
        moq: "100 pcs",
        image:
          "/decor1.jpeg",
        specs: { Weight: "10 – 15 kg", Coverage: "~300 sq ft", Base: "Premium neem" },
      },
      {
        name: "Giant (15-25 kg)",
        details: "Collectors piece",
        description:
          "The ultimate salt lamp — a rare collectors piece. These massive crystals are hand-selected for color intensity and structural beauty. Perfect for luxury retail and VIP gifting.",
        sizes: ["15-25 kg"],
        colors: ["Orange", "Dark Pink"],
        moq: "50 pcs",
        image:
          "/decor8.jpeg",
        specs: { Weight: "15 – 25 kg", Coverage: "~400 sq ft", Grade: "Collectors premium" },
      },
    ],
    features: ["Natural air purifier", "Negative ion emission", "UL-certified fittings", "Premium wooden base", "Each lamp is unique"],
    applications: ["Home decor", "Bedroom ambiance", "Meditation rooms", "Yoga studios", "Office wellness", "Gifting"],
    icon: "💡",
  },
  {
    id: "crafted-lamp",
    name: "Crafted & Shaped Salt Lamps",
    category: "Home & Decor",
    image:
      "/decor3.jpeg", // cone-shaped lamp with wire spiral stand
    gallery: [
      "/decor2.jpeg", // mushroom-shaped lamp
      "/decor11.jpeg", // chain-link wire basket lamp
    ],
    shortDesc: "Hand-carved geometric and artistic shapes.",
    longDesc: "Meticulously hand-carved by skilled artisans into spheres, pyramids, hearts, and custom designs.",
    variants: [
      {
        name: "Sphere Lamp",
        details: "Perfectly round carved sphere",
        description:
          "A perfectly round carved sphere lamp that gives a uniform 360° glow. Modern and elegant, it fits minimalist and contemporary decor beautifully.",
        sizes: ["3-5 kg", "5-7 kg"],
        colors: ["Pink", "Orange"],
        moq: "200 pcs",
        image:
          "/decor2.jpeg",
        specs: { Shape: "Perfect sphere", Weight: "3 – 7 kg", Finish: "Smooth polished" },
      },
      {
        name: "Pyramid Lamp",
        details: "Geometric pyramid shape",
        description:
          "Clean geometric pyramid shape inspired by sacred geometry. Provides a focused upward glow from the apex. Popular in meditation and spiritual spaces.",
        sizes: ["3-5 kg", "5-7 kg"],
        colors: ["Pink", "Orange"],
        moq: "200 pcs",
        image:
          "/decor3.jpeg",
        specs: { Shape: "Pyramid", Weight: "3 – 7 kg", Finish: "Smooth polished" },
      },
      {
        name: "Heart Lamp",
        details: "Romantic heart shape for gifting",
        description:
          "A beautifully carved heart shape — the top-selling gift lamp. Perfect for Valentines Day, anniversaries, and romantic decor. Each heart is hand-finished for smooth curves.",
        sizes: ["3-5 kg"],
        colors: ["Pink", "Dark Pink"],
        moq: "200 pcs",
        image:
          "/decor4.jpeg",
        specs: { Shape: "Heart", Weight: "3 – 5 kg", "Best For": "Gift market" },
      },
      {
        name: "Designer Wire-Set Lamps",
        details: "Novelty shapes in decorative metal stands",
        description:
          "Uniquely designed salt lamps set into decorative wire and metal frames — including chain-link basket styles and spiral stands. A modern twist on the traditional salt lamp for boutique and designer retail.",
        sizes: ["2-5 kg"],
        colors: ["Pink", "Orange"],
        moq: "200 pcs",
        image:
          "/decor11.jpeg",
        specs: { Shape: "Designer wire-frame", Weight: "2 – 5 kg", Custom: "Available on request" },
      },
    ],
    features: ["Hand-carved by artisans", "Custom designs on request", "Same wellness benefits", "Great for gifting"],
    applications: ["Home decor", "Gift items", "Retail display", "Meditation spaces", "Kids rooms"],
    icon: "🎨",
  },
  {
    id: "usb-lamp",
    name: "USB Salt Lamps & Night Lights",
    category: "Home & Decor",
    image:
      "/decor6.jpeg", // lamp with visible power cord/USB style
    gallery: [
      "/decor5.jpeg", // moon-shaped lamp on bedside table
    ],
    shortDesc: "Compact USB-powered salt lamps and night lights.",
    longDesc: "Portable Himalayan salt lights that plug into any USB port. Perfect for travel, office desks, or bedside tables.",
    variants: [
      {
        name: "USB Natural Mini",
        details: "Natural shape, 0.5-1kg",
        description:
          "A tiny natural-shape salt lamp powered via USB. Plug it into your laptop, power bank, or USB adapter for a soft ambient glow anywhere you go.",
        sizes: ["0.5-1 kg"],
        colors: ["Pink", "White"],
        moq: "500 pcs",
        image:
          "/decor6.jpeg",
        specs: { Power: "USB 5V", Weight: "0.5 – 1 kg", LED: "Warm white" },
      },
      {
        name: "Crescent Moon Night Light",
        details: "Decorative moon-shape bedside light",
        description:
          "A beautifully carved crescent moon lamp for bedside tables. Contains a small salt crystal that glows with a warm amber light. Perfect for bedrooms and relaxation corners.",
        sizes: ["0.5-1 kg"],
        colors: ["Pink", "Orange"],
        moq: "500 pcs",
        image:
          "/decor5.jpeg",
        specs: { Power: "Direct socket / USB", Weight: "0.5 – 1 kg", Bulb: "LED 2W", Shape: "Crescent moon" },
      },
    ],
    features: ["USB powered", "Portable", "LED options", "Low energy", "Travel friendly"],
    applications: ["Office desk", "Travel", "Kids nightlight", "Gifting"],
    icon: "🔌",
  },
  {
    id: "candle-holder",
    name: "Salt Candle & Tea Light Holders",
    category: "Home & Decor",
    image:
      "/decor7.jpeg", // natural rock with glowing tea light inside
    gallery: [
      "/decor4.jpeg", // heart-shaped lamp (heart holder reference)
    ],
    shortDesc: "Hand-carved candle holders in natural and geometric shapes.",
    longDesc: "When a tea light is placed inside, they emit a beautiful warm glow that creates a calming ambiance.",
    variants: [
      {
        name: "Natural Shape (1 Hole)",
        details: "Single tea light holder",
        description:
          "A single tea light hole carved into a natural salt crystal. Each piece is unique in shape and color. The simplest and most organic-looking candle holder.",
        sizes: ["1-2 kg"],
        colors: ["Pink", "Orange", "White"],
        moq: "500 pcs",
        image:
          "/decor7.jpeg",
        specs: { Holes: "1", Weight: "1 – 2 kg", "Tea Light": "Standard size" },
      },
      {
        name: "Natural Shape (3 Holes)",
        details: "Triple tea light holder",
        description:
          "A larger crystal with three tea light holes for a trio of candles. Creates a wider, more dramatic glow. Perfect as a dining table centerpiece.",
        sizes: ["2-3 kg"],
        colors: ["Pink", "Orange"],
        moq: "300 pcs",
        image:
          "/decor7.jpeg",
        specs: { Holes: "3", Weight: "2 – 3 kg", "Best For": "Table centerpiece" },
      },
      {
        name: "Heart Shape",
        details: "Romantic heart candle holder",
        description:
          "Heart-shaped carved candle holder — a top seller for gift shops, Valentines Day, and romantic home decor. Hand-finished smooth surface.",
        sizes: ["1-2 kg"],
        colors: ["Pink", "Dark Pink"],
        moq: "300 pcs",
        image:
          "/decor4.jpeg",
        specs: { Shape: "Heart", Weight: "1 – 2 kg", "Best For": "Gift market" },
      },
    ],
    features: ["Hand-carved", "Warm ambiance", "Multiple designs", "Air purifying"],
    applications: ["Dining table", "Romantic evenings", "Spa", "Meditation", "Gifting"],
    icon: "🕯️",
  },

  // ========== SPA & WELLNESS ==========
  {
    id: "bath-salt",
    name: "Bath Salt & Salt Scrubs",
    category: "Spa & Wellness",
    image:
      "/spa2.jpeg", // massage tool assortment + granules
    gallery: [
      "/spa3.jpeg", // spiral roller / assorted tools
      "/spa4.jpeg", // grid-textured tool
    ],
    shortDesc: "Therapeutic bath salts for detox, relaxation, and skin wellness.",
    longDesc:
      "Luxurious spa-like bathing experience at home. Detoxifies skin, soothes muscles, and promotes relaxation.",
    variants: [
      {
        name: "Fine Bath Salt (0.5-1mm)",
        details: "Quick dissolving for baths",
        description:
          "Fine grain salt that dissolves quickly in warm bath water, releasing minerals immediately. Ideal for full-body soaking baths. Can be infused with essential oils and fragrances for private label products.",
        sizes: ["250g", "500g", "1kg", "5kg", "25kg"],
        colors: ["Light Pink", "Dark Pink", "White"],
        moq: "500 kg",
        image:
          "/spa2.jpeg",
        specs: { Grain: "0.5 – 1 mm", "Dissolve Time": "Fast", Use: "½ cup per bath" },
      },
      {
        name: "Coarse Bath Salt (2-5mm)",
        details: "Slow release for foot soaks",
        description:
          "Larger crystals that dissolve slowly, perfect for extended foot soaks and therapeutic mineral baths. The visual appeal of coarse pink crystals makes it ideal for retail jar packaging.",
        sizes: ["250g", "500g", "1kg", "5kg", "25kg"],
        colors: ["Light Pink", "Dark Pink"],
        moq: "500 kg",
        image:
          "/spa3.jpeg",
        specs: { Grain: "2 – 5 mm", "Dissolve Time": "Slow", "Best For": "Foot soaks & jars" },
      },
      {
        name: "Bath Salt with Essential Oils",
        details: "Lavender, eucalyptus, rose infused",
        description:
          "Pre-infused bath salts available in lavender, eucalyptus, rose, peppermint, and custom fragrances. Ready for retail packaging. Private label and custom scenting available.",
        sizes: ["250g", "500g", "1kg"],
        colors: ["Custom colored"],
        moq: "300 kg",
        image:
          "/spa4.jpeg",
        specs: { Fragrances: "Lavender, Rose, Eucalyptus, Mint", Custom: "Available", "Private Label": "Yes" },
      },
      {
        name: "Salt Scrub",
        details: "Exfoliating body scrub",
        description:
          "A pre-mixed exfoliating body scrub combining fine Himalayan salt with natural carrier oils. Removes dead skin cells while nourishing with minerals. Available in various fragrances.",
        sizes: ["200g", "500g", "1kg"],
        colors: ["Pink", "White"],
        moq: "300 kg",
        image:
          "/spa2.jpeg",
        specs: { Type: "Salt + oil blend", Grain: "Fine exfoliant", "Private Label": "Yes" },
      },
    ],
    features: ["Therapeutic minerals", "Detoxifying", "Skin nourishing", "Custom fragrances", "Private label ready"],
    applications: ["Bath soaking", "Foot soaks", "Body scrubs", "Spa treatments", "Gift sets"],
    icon: "🛁",
  },
  {
    id: "massage-stone",
    name: "Salt Massage Stones",
    category: "Spa & Wellness",
    image:
      "/spa4.jpeg", // grid-textured massage roller tool
    gallery: [
      "/spa2.jpeg", // roller/spiral massage tool
      "/spa3.jpeg", // assorted massage stone shapes
    ],
    shortDesc: "Warm salt massage stones for spa and home therapy.",
    longDesc:
      "Hand-shaped and polished for hot stone massage therapy. Provides deep muscle relaxation while infusing trace minerals.",
    variants: [
      {
        name: "Dome / Half Sphere",
        details: "Classic massage dome",
        description:
          "The most ergonomic shape for body massage. The flat base sits stable in the therapists hand while the dome applies smooth pressure. Retains heat for 20+ minutes.",
        sizes: ["Standard"],
        colors: ["Pink", "Orange"],
        moq: "500 pcs",
        image:
          "/spa3.jpeg",
        specs: { Shape: "Half sphere", "Heat Retention": "20+ min", Surface: "Polished smooth" },
      },
      {
        name: "Textured Roller",
        details: "For deep tissue foot & body massage",
        description:
          "A grooved, textured salt roller designed for deep tissue foot and body massage. The ridged surface stimulates pressure points while gently exfoliating skin.",
        sizes: ["Standard"],
        colors: ["Pink"],
        moq: "500 pcs",
        image:
          "/spa4.jpeg",
        specs: { Shape: "Grooved roller", "Best For": "Foot & body massage", Surface: "Textured grip" },
      },
      {
        name: "Set of 6 Mixed Shapes",
        details: "Full body treatment set",
        description:
          "A professional set of 6 mixed shapes (rollers, domes, cones, and discs) packaged in a presentation box. Everything a spa needs for a complete salt stone massage treatment.",
        sizes: ["Professional Set"],
        colors: ["Pink", "Orange"],
        moq: "100 sets",
        image:
          "/spa2.jpeg",
        specs: { Pieces: "6 mixed shapes", Packaging: "Presentation box", Market: "Professional spas" },
      },
    ],
    features: ["Heat retaining", "Mineral absorption", "Antimicrobial", "Smooth polished", "Reusable"],
    applications: ["Hot stone massage", "Facial therapy", "Reflexology", "Home spa"],
    icon: "💆",
  },
  {
    id: "salt-bricks",
    name: "Salt Bricks, Tiles & Blocks",
    category: "Spa & Wellness",
    image:
      "/spa1.jpeg", // backlit salt brick wall
    gallery: [
      "/spa1.jpeg",
    ],
    shortDesc: "Precision-cut salt bricks for salt rooms, walls & spas.",
    longDesc:
      "Precision-cut and polished for constructing salt walls and salt rooms. When backlit, they create a stunning warm glow with halotherapy benefits.",
    variants: [
      {
        name: 'Standard Brick (8x4x2")',
        details: "Most common construction size",
        description:
          "The industry standard brick size for salt wall and salt room construction. Smooth on all six sides for clean adhesion. Available in pink, orange, and white.",
        sizes: ["8x4x2 inch"],
        colors: ["Pink", "Orange", "White"],
        moq: "1000 pcs",
        image:
          "/spa1.jpeg",
        specs: { Dimensions: "8 × 4 × 2 inch", Finish: "Smooth all sides", "Per Sq Ft": "~4.5 bricks" },
      },
      {
        name: 'Thin Tile (8x4x1")',
        details: "Wall veneer tile",
        description:
          "A thinner, lighter version for wall veneer applications where full brick depth is not needed. Perfect for accent walls, decorative panels, and retrofit installations.",
        sizes: ["8x4x1 inch"],
        colors: ["Pink", "Orange", "White"],
        moq: "1000 pcs",
        image:
          "/spa1.jpeg",
        specs: { Dimensions: "8 × 4 × 1 inch", Weight: "50% lighter than brick", "Best For": "Wall veneer" },
      },
      {
        name: 'Floor Tile (12x12x2")',
        details: "Square floor tile",
        description:
          "Large-format square tiles for salt room floors. Walk on heated salt tiles for foot detox benefits. Structurally rated for foot traffic when properly installed.",
        sizes: ["12x12x2 inch"],
        colors: ["Pink", "White"],
        moq: "500 pcs",
        image:
          "/spa1.jpeg",
        specs: { Dimensions: "12 × 12 × 2 inch", "Load Rating": "Foot traffic rated", "Best For": "Salt room floors" },
      },
    ],
    features: ["Precision cut", "Backlight compatible", "Halotherapy benefits", "Thermal mass"],
    applications: ["Salt rooms", "Spa walls", "Feature walls", "Wellness centers", "Salt caves"],
    icon: "🧱",
  },

  // ========== KITCHEN & CULINARY ==========
  {
    id: "cooking-slab",
    name: "Cooking Slabs & Blocks",
    category: "Kitchen & Culinary",
    image:
      "/kitchen1.jpeg", // steak on salt block, grilling
    gallery: [
      "/kitchen2.jpeg", // chicken & veg on salt block, fire
      "/kitchen5.jpeg", // burgers on salt block, grill
      "/kitchen3.jpeg", // block with metal tray holder
    ],
    shortDesc: "Salt blocks for grilling, searing, chilling & serving.",
    longDesc: "Cut and polished from solid salt crystal slabs. Heat on a grill for searing or chill for serving sushi and cheese.",
    variants: [
      {
        name: 'Rectangle Block (8x12")',
        details: "Standard cooking size",
        description:
          "The standard rectangular cooking block. Heat slowly on a grill or stovetop to 400°F+ for searing steaks, shrimp, and vegetables. The natural non-stick surface and subtle salt infusion creates incredible flavor.",
        sizes: ["8x12x2 inch"],
        colors: ["Pink"],
        moq: "300 pcs",
        image:
          "/kitchen2.jpeg",
        specs: { Dimensions: "8 × 12 × 2 inch", "Heat Tolerance": "400°F+", Reusable: "Yes, 20+ uses" },
      },
      {
        name: 'Round Block (10")',
        details: "Large round serving plate",
        description:
          "A polished round block ideal for serving cheese boards, sushi, and chilled desserts. Chill in the freezer for 2 hours and serve — food stays cold and picks up a delicate salt kiss.",
        sizes: ['10" dia, 2" thick'],
        colors: ["Pink"],
        moq: "200 pcs",
        image:
          "/kitchen5.jpeg",
        specs: { Diameter: "10 inch", Thickness: "2 inch", "Best For": "Cold serving" },
      },
      {
        name: "Block with Metal Holder",
        details: "Cooking block on steel frame",
        description:
          "A cooking block paired with a stainless steel serving frame. Cook directly on the block, then place on the frame for elegant tableside presentation. Perfect for restaurants.",
        sizes: ['8x12"', '12x16"'],
        colors: ["Pink"],
        moq: "100 pcs",
        image:
          "/kitchen6.jpeg",
        specs: { Includes: "Block + steel frame", "Best For": "Restaurant tableside", Presentation: "Premium" },
      },
    ],
    features: ["Withstands high heat", "Non-stick surface", "Subtle salt flavor", "Reusable"],
    applications: ["Grilling", "Searing", "Cold serving", "Cheese boards", "Restaurants"],
    icon: "🥩",
  },
  {
    id: "shot-glass",
    name: "Tequila Shot Glasses",
    category: "Kitchen & Culinary",
    image:
      "/kitchen10.jpeg", // 4 shot glasses closeup
    gallery: [
      "/kitchen9.jpeg", // assorted small carved vessels
      "/kitchen7.jpeg", // single mortar & pestle
    ],
    shortDesc: "Hand-carved salt shot glasses for tequila and spirits.",
    longDesc: "Carved from solid Himalayan pink salt, adding a salty rim flavor to every sip. Each glass is unique in color.",
    variants: [
      {
        name: "Set of 4",
        details: "Standard shot glasses",
        description:
          "Four hand-carved shot glasses, each holding 1 oz. The salt naturally enhances tequila and mezcal with a clean salty finish — no licking the rim needed. A conversation starter at every party.",
        sizes: ["1 oz each"],
        colors: ["Pink", "Orange"],
        moq: "200 sets",
        image:
          "/kitchen10.jpeg",
        specs: { Pieces: "4", Volume: "1 oz each", Material: "100% Himalayan salt", Reusable: "15+ uses per glass" },
      },
      {
        name: "Assorted Carved Vessel Set",
        details: "Party set with mixed small vessels",
        description:
          "A mixed collection of small hand-carved salt vessels and shot glasses presented together. A premium gift set perfect for bars, restaurants, and luxury gifting. Gift box packaging available.",
        sizes: ["1 oz each"],
        colors: ["Pink", "Orange"],
        moq: "150 sets",
        image:
          "/kitchen9.jpeg",
        specs: { Pieces: "Assorted vessels", Volume: "1 oz each", Packaging: "Gift box available" },
      },
      {
        name: "Salt Mortar & Pestle",
        details: "Grinding set",
        description:
          "A mortar and pestle carved entirely from Himalayan salt. Crush herbs and spices directly — the salt adds subtle seasoning as you grind. A stunning kitchen accessory.",
        sizes: ["Standard"],
        colors: ["Pink"],
        moq: "200 pcs",
        image:
          "/kitchen8.jpeg",
        specs: { Material: "Solid Himalayan salt", Function: "Grind + season", "Best For": "Kitchen accessory" },
      },
    ],
    features: ["Salty rim taste", "Each glass unique", "Food-safe", "Great conversation starter"],
    applications: ["Bars", "Home entertaining", "Gift sets", "Retail"],
    icon: "🥃",
  },

  // ========== BULK & INDUSTRIAL SALT ==========
  {
    id: "bulk-salt",
    name: "Bulk & Industrial Salt",
    category: "Bulk & Industrial Salt",
    image:
      "/bulk4.jpeg", // large outdoor raw pile
    gallery: [
      "/bulk1.jpeg", // chunks on sack
    ],
    shortDesc: "Bulk salt in 10kg-1 ton bags for industrial use.",
    longDesc: "Available in industrial quantities for food processors, manufacturers, and large-scale operations.",
    variants: [
      {
        name: "25 kg PP Bag",
        details: "Industry standard size",
        description:
          "The most popular bulk packaging. Double-stitched polypropylene bag with inner liner for moisture protection. Custom printed bags available for private label clients.",
        sizes: ["25 kg"],
        colors: ["Light Pink", "Dark Pink", "White"],
        moq: "1 Ton",
        image:
          "/bulk2.jpeg",
        specs: { Bag: "PP woven + liner", Print: "Custom available", "Per Container": "~800 bags (20ft)" },
      },
      {
        name: "1 Ton Super Sack",
        details: "FIBC bulk bag",
        description:
          "A 1-metric-ton FIBC (Flexible Intermediate Bulk Container) for large-scale industrial operations. Forklift-compatible with lifting loops. Most cost-effective per-kg option.",
        sizes: ["1000 kg"],
        colors: ["Light Pink", "Dark Pink", "White"],
        moq: "5 Tons",
        image:
          "/bulk4.jpeg",
        specs: { Container: "FIBC big bag", Lifting: "4-point forklift loops", "Per Container": "~24 bags (20ft)", Cost: "Best per-kg rate" },
      },
    ],
    features: ["All grain sizes", "Custom mesh", "Multiple packaging", "Full container loads"],
    applications: ["Food manufacturing", "Seasoning blends", "Private labeling", "De-icing"],
    icon: "📦",
  },
  {
    id: "lake-salt",
    name: "Lake Salt (Solar)",
    category: "Bulk & Industrial Salt",
    image:
      "/bulk1.jpeg", // pile on sack
    gallery: [
      "/bulk2.jpeg", // close-up raw chunks
    ],
    shortDesc: "Solar-evaporated lake salt for industrial applications.",
    longDesc: "Harvested through natural solar evaporation from mineral-rich salt lakes.",
    variants: [
      {
        name: "Fine Lake Salt",
        details: "Fine grain solar salt",
        description:
          "Fine-grain solar salt for food processing, chemical manufacturing, and water treatment. High purity at competitive pricing for bulk industrial applications.",
        sizes: ["25kg", "50kg", "1 Ton"],
        colors: ["White", "Off-white"],
        moq: "5 Tons",
        image:
          "/bulk2.jpeg",
        specs: { Source: "Solar evaporated", NaCl: "99%+", "Best For": "Industrial" },
      },
      {
        name: "Coarse Lake Salt",
        details: "Coarse grain for industrial use",
        description:
          "Large crystal solar salt for industrial water softening, de-icing roads, and chemical processing. Available in bulk super sacks and loose container loads.",
        sizes: ["25kg", "50kg", "1 Ton"],
        colors: ["White"],
        moq: "5 Tons",
        image:
          "/bulk1.jpeg",
        specs: { Source: "Solar evaporated", Grain: "Coarse", "Best For": "Water treatment & de-icing" },
      },
    ],
    features: ["Solar evaporated", "High purity", "Cost effective", "Bulk availability"],
    applications: ["Food processing", "Chemical industry", "Water treatment", "De-icing"],
    icon: "☀️",
  },

  // ========== SALT URNS ==========
  {
    id: "salt-urns",
    name: "Himalayan Salt Urns",
    category: "Salt Urns",
    image:
      "/salturn2.jpeg", // 5-piece urn assortment, black bg
    gallery: [
      "/salturn1.jpeg", // large + small urn, grey bg
      "/salturn3.jpeg", // shelf full of urns
    ],
    shortDesc: "Hand-carved Himalayan salt urns for decor and ceremonial use.",
    longDesc:
      "Our Himalayan Salt Urns are hand-carved from solid pink salt crystal into elegant vase and urn forms. They double as decorative centerpieces and, when lit from within, cast the same warm therapeutic glow as our salt lamps. A striking, natural alternative to ceramic or metal urns.",
    variants: [
      {
        name: "Small Urn (2-3 kg)",
        details: "Tabletop decorative size",
        description:
          "A compact hand-carved urn perfect for side tables, mantels, and shelf displays. Smooth polished exterior with the natural pink-orange color variation of Himalayan salt.",
        sizes: ["2-3 kg"],
        colors: ["Light Pink", "Orange"],
        moq: "300 pcs",
        image:
          "/salturn1.jpeg",
        specs: { Weight: "2 – 3 kg", Finish: "Smooth polished", "Best For": "Tabletop display" },
      },
      {
        name: "Medium Urn (4-6 kg)",
        details: "Statement decor piece",
        description:
          "A mid-size carved urn that works as a striking standalone centerpiece or paired set. Can be fitted with an internal bulb for a soft ambient glow, similar to a salt lamp.",
        sizes: ["4-6 kg"],
        colors: ["Light Pink", "Dark Pink"],
        moq: "200 pcs",
        image:
          "/salturn3.jpeg",
        specs: { Weight: "4 – 6 kg", Finish: "Smooth polished", "Lighting Option": "Internal bulb available" },
      },
      {
        name: "Large Ceremonial Urn (7-10 kg)",
        details: "Premium display & ceremonial use",
        description:
          "A large hand-carved urn suited for premium retail display, hotel lobbies, and ceremonial or gifting purposes. Each piece is one-of-a-kind given the natural crystal it's carved from.",
        sizes: ["7-10 kg"],
        colors: ["Dark Pink", "Orange"],
        moq: "100 pcs",
        image:
          "/salturn2.jpeg",
        specs: { Weight: "7 – 10 kg", Finish: "Hand-polished", "Best For": "Premium & ceremonial display" },
      },
    ],
    features: ["Hand-carved from solid salt", "Each piece one-of-a-kind", "Optional internal lighting", "Natural air purifying properties"],
    applications: ["Home decor", "Hotel & spa lobbies", "Ceremonial gifting", "Retail display"],
    icon: "🏺",
  },

  // ========== ANIMAL LICK ==========
  {
    id: "animal-lick",
    name: "Animal Lick Salt",
    category: "Animal Lick",
    image:
      "/animal5.jpeg", // horse actually eating the salt lick - best hero shot
    gallery: [
      "/animal4.jpeg", // round block with rope, table
      "/animal6.jpeg", // round block with rope, table
    ],
    shortDesc: "Natural salt licks for horses, cattle, and livestock.",
    longDesc: "100% natural mineral supplement for livestock with 84+ trace minerals for electrolyte balance and hydration.",
    variants: [
      {
        name: "Natural Shape (1-2 kg)",
        details: "Small lick with rope",
        description:
          "A small natural-shape salt lick with a pre-drilled hole and attached hanging rope. Ideal for hanging in horse stalls, goat pens, and small animal enclosures. Each piece varies in shape.",
        sizes: ["1-2 kg"],
        colors: ["Pink", "Dark Pink"],
        moq: "1 Ton",
        image:
          "/animal3.jpeg",
        specs: { Weight: "1 – 2 kg", Attachment: "Rope included", "Best For": "Small animals" },
      },
      {
        name: "Natural Shape (3-5 kg)",
        details: "Large lick with rope",
        description:
          "A medium-to-large natural lick for horses and cattle. The larger mass lasts longer in outdoor conditions and provides a satisfying mineral source. Weather resistant — suitable for open pastures.",
        sizes: ["3-5 kg"],
        colors: ["Pink", "Dark Pink"],
        moq: "1 Ton",
        image:
          "/animal4.jpeg",
        specs: { Weight: "3 – 5 kg", Durability: "2-4 months outdoor", "Best For": "Horses & cattle" },
      },
      {
        name: "Compressed Block (5 kg)",
        details: "Standard compressed block",
        description:
          "A hydraulically compressed square block with uniform density and shape. Lasts longer than natural shape licks because the compressed density slows down consumption. Includes lick grooves on one side.",
        sizes: ["5 kg"],
        colors: ["Pink"],
        moq: "1 Ton",
        image:
          "/animal6.jpeg",
        specs: { Weight: "5 kg", Shape: "Square compressed", Density: "High — lasts longer", Durability: "3-6 months" },
      },
      {
        name: "Compressed Block (25 kg)",
        details: "Large farm block",
        description:
          "A heavy-duty 25kg block for large herds and commercial farms. Place on the ground or in a block holder. Provides months of mineral supplementation for cattle, horses, and deer.",
        sizes: ["25 kg"],
        colors: ["Pink"],
        moq: "1 Ton",
        image:
          "/animal2.jpeg",
        specs: { Weight: "25 kg", Shape: "Large square block", Durability: "6-12 months", "Best For": "Large herds" },
      },
    ],
    features: ["84+ minerals", "100% natural", "Weather resistant", "Long lasting", "With rope"],
    applications: ["Horses", "Cattle", "Sheep & goats", "Deer & wildlife", "Zoo animals"],
    icon: "🐴",
  },
];

// ============================================================
// Categories - UPDATED
// ============================================================
const categories = [
  "All",
  "Gourmet Edible Salt",
  "Home & Decor",
  "Spa & Wellness",
  "Kitchen & Culinary",
  "Bulk & Industrial Salt",
  "Salt Urns",
  "Animal Lick",
];

// ============================================================
// Shared bits
// ============================================================
const wmsg = (text) => encodeURIComponent(text);
const WHATSAPP_NUMBER = "923377761491";

// ============================================================
// Product Card
// ============================================================
const ProductCard = ({ product, onClick, index, visible, cardRef, highlighted }) => {
  return (
    <button
      ref={cardRef}
      id={`product-${product.id}`}
      type="button"
      onClick={() => onClick(product)}
      style={visible ? { animationDelay: `${Math.min(index, 7) * 50}ms` } : undefined}
      className={`group relative w-full scroll-mt-28 text-left focus-visible:outline-none ${
        visible
          ? "block animate-cardIn opacity-0 [animation-fill-mode:forwards]"
          : "hidden"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[22px] bg-[#FFF8F0] shadow-[0_1px_2px_rgba(28,25,23,0.04),0_10px_30px_-12px_rgba(28,25,23,0.08)] ring-1 ring-stone-900/[0.04] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_45px_-15px_rgba(244,124,32,0.25)] group-focus-visible:ring-2 group-focus-visible:ring-[#F47C20] ${
          highlighted ? "ring-4 ring-[#F47C20] ring-offset-2 ring-offset-[#FFF8F0]" : ""
        }`}
      >
        {/* image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#FFEFE0] via-[#FFF8F0] to-[#FFD9B3]">
          {/* soft podium backdrop */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[68%] w-[68%] rounded-full bg-gradient-to-b from-[#FFF8F0] to-[#FFD9B3]/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_10px_24px_-10px_rgba(28,25,23,0.12)]" />
          </div>

          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            quality={90}
            priority
            className="relative object-contain object-center p-6 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08] sm:p-7"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A150E]/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* top row */}
          <div className="absolute inset-x-3 top-3 flex items-start justify-between">
            <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2A150E] shadow-sm backdrop-blur-sm">
              {product.category}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-base shadow-sm backdrop-blur-sm">
              {product.icon}
            </span>
          </div>

          {/* hover reveal */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between px-4 pb-4 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 text-xs font-medium text-white">
              <FiEye className="h-3.5 w-3.5" /> View details
            </span>
          </div>
        </div>

        {/* body */}
        <div className="relative p-5">
          <span className="pointer-events-none absolute left-5 right-5 top-0 h-px scale-x-0 bg-gradient-to-r from-[#F47C20] via-[#FFA556] to-[#F47C20] transition-transform duration-500 group-hover:scale-x-100" />
          <h3 className="font-sans text-[15px] font-semibold leading-snug text-[#2A150E] transition-colors group-hover:text-[#F47C20] line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-stone-500 line-clamp-2">
            {product.shortDesc}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
            <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide" style={{ color: THEME.primary }}>
              <FiLayers className="h-3 w-3" /> {product.variants.length} Variants
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2A150E] text-white transition-all duration-300 group-hover:bg-[#F47C20] group-hover:rotate-[-8deg]">
              <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

// ============================================================
// Variant Detail
// ============================================================
const VariantDetail = ({ product, variant, onBack, onClose }) => {
  const variantWhatsapp = wmsg(
    `Hi! I want a quote for:\n*Product:* ${product.name}\n*Variant:* ${variant.name}\n*Details:* ${variant.details}\nPlease share pricing & MOQ.`
  );

  return (
    <div className="animate-slideInRight">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#FFEFE0] to-[#FFD9B3] sm:h-72">
        {variant.image ? (
          <Image
            src={variant.image}
            alt={variant.name}
            fill
            sizes="(max-width: 1024px) 100vw, 46vw"
            quality={90}
            priority
            className="object-contain object-center"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#FFEFE0]">
            <span className="text-6xl">{product.icon}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A150E]/75 via-[#2A150E]/10 to-transparent" />

        <button
          type="button"
          onClick={onBack}
          className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-2 text-xs font-medium text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/30"
        >
          <FiChevronLeft className="h-3.5 w-3.5" /> Back
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/30"
        >
          <FiX className="h-4 w-4" />
        </button>

        <div className="absolute bottom-5 left-5 right-5">
          <span className="rounded-full bg-[#F47C20] px-2.5 py-0.5 text-[10px] font-medium text-white">
            {product.name}
          </span>
          <h2 className="mt-2 font-sans text-2xl font-bold leading-tight text-white sm:text-3xl">
            {variant.name}
          </h2>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-[15px] leading-relaxed text-stone-500">{variant.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {variant.moq && (
            <span className="flex items-center gap-1.5 rounded-full bg-[#F47C20]/10 px-3 py-1.5 text-xs font-medium" style={{ color: THEME.primary }}>
              <FiPackage className="h-3 w-3" /> MOQ: {variant.moq}
            </span>
          )}
          {variant.colors?.length > 0 && (
            <span className="flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-600">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: THEME.primary }} /> {variant.colors.join(", ")}
            </span>
          )}
        </div>

        {variant.sizes?.length > 0 && (
          <div className="mt-6">
            <h4 className="flex items-center gap-1.5 text-sm font-semibold text-[#2A150E]">
              <FiPackage className="h-4 w-4" style={{ color: THEME.primary }} /> Available Sizes
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {variant.sizes.map((s) => (
                <span
                  key={s}
                  className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-[#2A150E] transition-colors hover:border-[#F47C20]/40"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {variant.specs && Object.keys(variant.specs).length > 0 && (
          <div className="mt-6">
            <h4 className="flex items-center gap-1.5 text-sm font-semibold text-[#2A150E]">
              <FiInfo className="h-4 w-4" style={{ color: THEME.primary }} /> Specifications
            </h4>
            <div className="mt-3 overflow-hidden rounded-xl border border-stone-100 bg-stone-50">
              {Object.entries(variant.specs).map(([key, val], i) => (
                <div
                  key={key}
                  className={`flex items-center justify-between px-4 py-3 text-sm ${i > 0 ? "border-t border-stone-100" : ""}`}
                >
                  <span className="font-medium text-stone-400">{key}</span>
                  <span className="text-right font-semibold text-[#2A150E]">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 rounded-xl bg-stone-50 p-5">
          <h4 className="flex items-center gap-1.5 text-sm font-semibold text-[#2A150E]">
            <FiCheckCircle className="h-4 w-4" style={{ color: THEME.primary }} /> Product Features
          </h4>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-stone-500">
                <span className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: THEME.primary }} /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-stone-100 pt-5">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${variantWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-[160px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/25 active:translate-y-0"
          >
            <FiMessageCircle className="h-4 w-4" /> Quote This Variant
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex min-w-[160px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#2A150E] px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#4D2B20] active:translate-y-0"
          >
            <a href="#contact">Request Sample</a>
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Product Modal
// ============================================================
const ProductModal = ({ product, isOpen, onClose }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeVariant, setActiveVariant] = useState(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setActiveVariant(null);
      setActiveImage(0);
      onClose();
    }, 220);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  if (!isOpen || !product) return null;

  const allImages = [product.image, ...product.gallery];
  const nextImage = () => setActiveImage((p) => (p + 1) % allImages.length);
  const prevImage = () => setActiveImage((p) => (p - 1 + allImages.length) % allImages.length);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center bg-[#2A150E]/70 backdrop-blur-sm sm:items-center sm:p-4 ${closing ? "animate-fadeOut" : "animate-fadeIn"}`}
      onClick={handleClose}
    >
      <div
        className={`relative flex w-full max-w-5xl flex-col overflow-hidden bg-[#FFF8F0] shadow-2xl ring-1 ring-black/5 sm:rounded-[28px] ${closing ? "animate-modalOut" : "animate-modalIn"} h-[94vh] sm:h-auto sm:max-h-[90vh] rounded-t-[28px]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 justify-center pt-2.5 sm:hidden">
          <span className="h-1 w-10 rounded-full bg-stone-200" />
        </div>

        <div className="overflow-y-auto lg:grid lg:grid-cols-[46%_54%] lg:overflow-hidden">
          {activeVariant ? (
            <div className="lg:col-span-2 lg:h-full lg:overflow-y-auto">
              <VariantDetail
                product={product}
                variant={activeVariant}
                onBack={() => setActiveVariant(null)}
                onClose={handleClose}
              />
            </div>
          ) : (
            <>
              {/* ---- Image column ---- */}
              <div className="relative lg:h-full">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#FFEFE0] to-[#FFD9B3] sm:h-80 lg:h-full lg:min-h-[420px]">
                  <Image
                    key={activeImage}
                    src={allImages[activeImage]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    quality={90}
                    priority
                    className="animate-fadeIn object-contain object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A150E]/75 via-[#2A150E]/5 to-transparent lg:bg-gradient-to-t lg:from-[#2A150E]/80 lg:via-[#2A150E]/0" />

                  {allImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevImage}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/30"
                      >
                        <FiChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/30"
                      >
                        <FiChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/30"
                  >
                    <FiX className="h-4 w-4" />
                  </button>

                  {allImages.length > 1 && (
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                      <FiImage className="h-3 w-3" /> {activeImage + 1}/{allImages.length}
                    </div>
                  )}

                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F47C20] px-2.5 py-0.5 text-[10px] font-medium text-white">
                      <FiStar className="h-2.5 w-2.5" /> {product.category}
                    </span>
                    <h2 className="mt-2 font-sans text-2xl font-bold leading-tight text-white sm:text-3xl">
                      {product.icon} {product.name}
                    </h2>
                  </div>
                </div>

                {allImages.length > 1 && (
                  <div className="flex gap-1.5 overflow-x-auto bg-[#FFF8F0] px-4 py-2.5 lg:px-5">
                    {allImages.map((img, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`relative h-10 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                          i === activeImage ? "border-[#F47C20] opacity-100" : "border-transparent opacity-45 hover:opacity-80"
                        }`}
                      >
                        <Image src={img} alt="" fill sizes="56px" quality={90} className="object-cover object-center" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ---- Content column ---- */}
              <div className="p-6 sm:p-8 lg:h-full lg:overflow-y-auto">
                <p className="text-[15px] leading-relaxed text-stone-500">{product.longDesc}</p>

                <div className="mt-7">
                  <h3 className="flex flex-wrap items-center gap-2 font-sans text-lg font-bold text-[#2A150E]">
                    <FiLayers className="h-4 w-4" style={{ color: THEME.primary }} />
                    Variants ({product.variants.length})
                    <span className="text-xs font-normal text-stone-400">— tap to see details</span>
                  </h3>
                  <div className="mt-4 space-y-2">
                    {product.variants.map((v, i) => (
                      <button
                        type="button"
                        key={v.name}
                        onClick={() => setActiveVariant(v)}
                        style={{ animationDelay: `${i * 45}ms` }}
                        className="group flex w-full animate-fadeInUp items-center gap-3.5 rounded-xl border border-stone-100 p-3 text-left opacity-0 [animation-fill-mode:forwards] transition-all duration-300 hover:border-[#F47C20]/30 hover:bg-[#F47C20]/[0.04]"
                      >
                        {v.image && (
                          <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg border border-stone-100">
                            <Image
                              src={v.image}
                              alt={v.name}
                              fill
                              sizes="56px"
                              quality={90}
                              className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-semibold text-[#2A150E] transition-colors group-hover:text-[#F47C20]">
                            {v.name}
                          </h4>
                          <p className="mt-0.5 text-[11px] text-stone-400">{v.details}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          {v.moq && (
                            <span className="hidden rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-500 sm:block">
                              MOQ: {v.moq}
                            </span>
                          )}
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-400 transition-all group-hover:bg-[#F47C20] group-hover:text-white">
                            <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-stone-50 p-5">
                    <h3 className="flex items-center gap-1.5 font-sans text-sm font-bold text-[#2A150E]">
                      <FiCheckCircle className="h-4 w-4" style={{ color: THEME.primary }} /> Features
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-stone-500">
                          <span className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: THEME.primary }} /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-stone-50 p-5">
                    <h3 className="flex items-center gap-1.5 font-sans text-sm font-bold text-[#2A150E]">
                      <FiArrowRight className="h-4 w-4" style={{ color: THEME.primary }} /> Applications
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {product.applications.map((a) => (
                        <li key={a} className="flex items-center gap-2 text-xs text-stone-500">
                          <span className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: THEME.primaryLight }} /> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3 border-t border-stone-100 pt-5">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${wmsg(
                      `Hi! I am interested in your *${product.name}*. Please share pricing and details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-[160px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/25 active:translate-y-0"
                  >
                    <FiMessageCircle className="h-4 w-4" /> WhatsApp Quote
                  </a>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex min-w-[160px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#2A150E] px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#4D2B20] active:translate-y-0"
                  >
                    Request Sample
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Main Component
// ============================================================
const OurCollection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const [highlightedId, setHighlightedId] = useState(null);
  const [pendingScrollId, setPendingScrollId] = useState(null);
  const productRefs = useRef({});

  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory);

  const hasMore = filteredProducts.length > visibleCount;

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(8);
  };

  useEffect(() => {
    const handleScrollRequest = (e) => {
      const productId = e.detail?.productId;
      if (!productId) return;

      const product = products.find((p) => p.id === productId);
      if (!product) return;

      setSelectedCategory(product.category);

      const categoryProducts = products.filter((p) => p.category === product.category);
      const idx = categoryProducts.findIndex((p) => p.id === productId);
      setVisibleCount((prev) => Math.max(prev, idx + 1, 8));

      setPendingScrollId(productId);
    };

    window.addEventListener("scrollToProduct", handleScrollRequest);
    return () => window.removeEventListener("scrollToProduct", handleScrollRequest);
  }, []);

  useEffect(() => {
    if (!pendingScrollId) return;
    const raf = requestAnimationFrame(() => {
      const el = productRefs.current[pendingScrollId];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightedId(pendingScrollId);
        setTimeout(() => setHighlightedId(null), 2200);
      }
      setPendingScrollId(null);
    });
    return () => cancelAnimationFrame(raf);
  }, [pendingScrollId, selectedCategory, visibleCount]);

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative overflow-hidden py-16 md:py-20 lg:py-28"
      style={{ backgroundColor: THEME.primaryBg }}
    >
      {/* ambient background accents - warm salt-lamp glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#FFA556]/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-[#FFD9B3]/[0.06] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: THEME.textPrimary }}>
            <span className="h-px w-6" style={{ backgroundColor: THEME.textPrimary }} /> Our Collection <span className="h-px w-6" style={{ backgroundColor: THEME.textPrimary }} />
          </span>
          <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl" style={{ color: THEME.textPrimary }}>
            Premium Salt Products
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: THEME.textSecondary }}>
            400+ products — edible salt, lamps, wellness, culinary, and construction, hand-selected from the Himalayan Salt Range.
          </p>
        </div>

        {/* category pills */}
        <div className="relative mb-10">
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex gap-2 overflow-x-auto pb-3"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
              maskImage: "linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
            }}
          >
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
                  selectedCategory === category
                    ? "bg-[#FFF8F0] text-[#2A150E] shadow-lg shadow-[#2A150E]/20"
                    : "border border-[#FFD9B3] bg-[#FFF8F0]/20 text-[#FFF8F0] hover:border-[#FFD9B3]/60 hover:text-[#FFF8F0]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onClick={handleProductClick}
              visible={index < visibleCount}
              cardRef={(el) => (productRefs.current[product.id] = el)}
              highlighted={highlightedId === product.id}
            />
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount(filteredProducts.length)}
              className="group relative overflow-hidden rounded-full border-2 border-[#FFF8F0] px-8 py-3 text-sm font-semibold text-[#FFF8F0] transition-colors duration-500 hover:text-[#2A150E]"
            >
              <span className="absolute inset-0 -z-10 -translate-x-full bg-[#FFF8F0] transition-transform duration-500 ease-out group-hover:translate-x-0" />
              View All {filteredProducts.length} Products
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[#FFEFE0]">No products found in this category.</p>
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes modalOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out both;
        }
        .animate-fadeOut {
          animation: fadeOut 0.2s ease-in both;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out both;
        }
        .animate-cardIn {
          animation: cardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-slideInRight {
          animation: slideInRight 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-modalIn {
          animation: modalIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-modalOut {
          animation: modalOut 0.2s ease-in both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn,
          .animate-fadeOut,
          .animate-fadeInUp,
          .animate-cardIn,
          .animate-slideInRight,
          .animate-modalIn,
          .animate-modalOut {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default OurCollection;