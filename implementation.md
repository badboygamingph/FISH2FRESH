# FISH2FRESH Landing Page Implementation

## Project Scope
Create a professional, highly animated landing page for the "FISH2FRESH" mobile app. The app is an offline tool for wet market customers to classify the freshness of specific tuna species (Frigate Tuna, Skipjack Tuna, and Mackerel Tuna) into three categories: Fresh, Medium/Fairly Fresh, and Spoiled.

## Architecture
- **Frontend:** React 18, Vite, Tailwind CSS.
- **Animations:** `motion/react` for scroll-triggered fades, slides, and staggering effects.
- **Icons:** `lucide-react`.
- **Structure:** Modular component architecture (`Hero`, `Features`, `Species`, `HowItWorks`, `Layout`).

## UI/UX Design
- **Color Palette:** Ocean-inspired themes. Deep navy blues (`slate-900`) for text/dark backgrounds, vibrant teal/blue (`blue-600`, `cyan-500`) for accents and primary buttons, soft off-white (`slate-50`) for backgrounds.
- **Typography:** Clean, sans-serif font stack leveraging Tailwind's default. Mathematical scaling for headers to ensure readability.
- **Mockups:** CSS-based stylized phone mockups to demonstrate app functionality cleanly without relying on external image assets.
- **Responsiveness:** Mobile-first design adapting up to `7xl` max-width for ultra-wide displays.
- **Anti-Slop Measures:** 
  - Strict adherence to padding/margin logic (Outer padding >= Inner padding).
  - High-contrast text readability (WCAG AA).
  - Avoiding generic "AI SaaS" tropes (no glowing glassmorphism or floating nested cards).
  - Clean, descriptive copywriting tailored to the wet market context.

## Features & Sections
1. **Hero:** High-impact value proposition, calls to action (App Store/Google Play), and a CSS-animated phone mockup showcasing a "Fresh" scan.
2. **Features:** Highlighting the 100% offline capability, AI classification, and wet market utility.
3. **Species Target:** Detailed typographic cards for Frigate Tuna, Skipjack Tuna, and Mackerel Tuna.
4. **How it Works:** Step-by-step visual guide (Point, Scan, Result: Fresh/Medium/Spoiled).
