# Pretty Loaded — 3D Custom Glitter Phone Case Platform

An ultra-glam, Y2K-inspired interactive e-commerce and 3D customization platform for **Pretty Loaded**, featuring real-time 3D phone case rendering with dynamic sparkle shaders, customizable glitter mixes, Y2K charms and accessories, device dimension selectors (iPhone, Samsung Galaxy, Google Pixel), high-res snapshot export, shopping bag, and an adapted signature orbiting showcase.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your Phase 1 answers, the platform will implement:
> 1. **Interactive 3D Engine**: Full 3D Three.js case rotatable in 360° with dynamic sparkle/glitter particle shaders and realistic metallic/glossy PBR finishes.
> 2. **Supported Devices**: Flagship phone dimensions and camera cutouts across **Apple iPhone** (16 Pro Max, 16 Pro, 16, 15), **Samsung Galaxy** (S24 Ultra, S24+), and **Google Pixel** (9 Pro, 9).
> 3. **Customization Features**: Case base colors, glitter types & densities, Y2K charms (bows, stars, hearts, swoosh rings), custom text monograms, high-res snapshot export, and shopping cart.
> 4. **Brand Aesthetics**: Authentic Y2K glam palette matching your official brand kit (Hot Pink `#FF4DB8`, Light Pink `#FFCFE6`, Chrome Silver `#C0C0C0`, Pearl White `#F7F2F4`, Black `#1F1F1F`) with chrome bubble logos and sparkling starbursts.
> 5. **Component Integration**: Includes the requested `dish-orbit-carousel.tsx` component adapted for the Pretty Loaded signature case collection showcase.

---

## 1. Overview & Core Concept

**Pretty Loaded** is an empowering, playful, high-energy phone accessory brand where tech meets jewelry. Customers design their dream "overloaded" phone case with liquid sparkle effects, chunky holographic glitter mixes, chrome bow charms, and personalized lettering. 

### Key Capabilities
- **Real-Time 3D Case Studio**: Rotate, tilt, zoom, and inspect phone cases in physical 3D space with real-time specular glints, reflections, and glitter shimmer.
- **Dimensional Device Customizer**: Switch seamlessly between phone form factors (iPhone, Galaxy, Pixel) with precision camera bumps, buttons, and port cuts.
- **Layered Glitter Shader**: Choose from Fine Stardust, Chunky Hex Flakes, Holographic Confetti, Gold/Silver Star Foil, and Pink Bubble Shimmer with adjustable density and speed.
- **Y2K Charm Studio**: Attach iconic brand charms (Metallic Star, Crystal Heart, Orbit Swoosh, Ribbon Bow with dangling locket, Pearl Strap).
- **Snapshot & Share**: Capture high-resolution transparent or studio-backdrop photos of the custom design for Instagram/TikTok sharing and manufacturing specs.
- **Curated Collection Orbit Carousel**: Seamless scroll and swipe showcase highlighting pre-designed bestsellers ("Disco Diva", "Pink Chrome Bow", "Silver Star Starlight", "Cyber Princess").
- **Cart & Order Flow**: Instant price updates based on selected charms and finishes, order breakdown, and checkout simulation.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Aesthetic Direction**: "Bratz meets Y2K Cyber Luxury" — high-shine chrome, metallic liquid reflections, bubble gum pink, glittering starbursts, and bold 3D typography.
- **Color Palette**:
  - Dominant Background: Pearl White (`#FBF9FB`) to Light Pink Silk (`#FFF0F7`) with deep dark contrast modes.
  - Primary Brand Accent: Pretty Hot Pink (`#FF4DB8`)
  - Secondary Accent: Soft Bubblegum Pink (`#FFCFE6`)
  - Chrome / Metal: Liquid Silver (`#C0C0C0` to `#E5E7EB` specular)
  - Contrast Base: Noir Black (`#1F1F1F`)
- **Typography**:
  - Display / Hero: Bold, playful rounded display (`Outfit` / `Plus Jakarta Sans`) paired with chrome 3D brand logo assets.
  - Body & Specs: Crisp, modern sans (`Plus Jakarta Sans`) with tabular numerals for prices and dimensions.

### Layout & Component Structure
```
┌────────────────────────────────────────────────────────────────────────┐
│  Pretty Loaded [Brand Logo]      Home · 3D Studio · Presets · About    [Bag (2)]  │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────────────────────┐  ┌───────────────────────────────┐  │
│  │                               │  │  CUSTOMIZE YOUR CASE          │  │
│  │      INTERACTIVE 3D           │  │  1. Device & Model            │  │
│  │      PHONE CASE VIEWPORT      │  │     [iPhone 16 Pro Max ▾]     │  │
│  │                               │  │  2. Base Color & Material     │  │
│  │   • Orbit / Zoom / Tilt       │  │     (Pink, Silver, White, etc)│  │
│  │   • Dynamic Sparkle Shader    │  │  3. Glitter Mix & Density     │  │
│  │   • Camera bump & buttons     │  │     [Stardust] [Chunky] [Holo]│  │
│  │                               │  │  4. Y2K Charms & Accessories  │  │
│  │  [⟲ Reset] [📸 Snapshot]     │  │     [Bow] [Star] [Heart] [Ring]│  │
│  │  [💡 Lighting: Studio/Disco]  │  │  5. Custom Monogram / Name    │  │
│  │                               │  │                               │  │
│  │                               │  │  $48.00  [ Add to Bag 🛍️ ]     │  │
│  └───────────────────────────────┘  └───────────────────────────────┘  │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│  SIGNATURE COLLECTION (Adapted 3D Orbit Carousel Showcase)             │
│  • Bestseller case editions orbiting dynamically with rating & story   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Technical Architecture & Implementation Steps

```
┌──────────────────────────────────────────────────────────────┐
│                       React Root App                         │
│   (App.tsx - Cart State, Customizer State, Active View)      │
└──────────────┬───────────────────────────────┬───────────────┘
               │                               │
       ┌───────▼──────────────┐        ┌───────▼──────────────┐
       │   3D Canvas Studio   │        │ Customizer Controls  │
       │ (Three.js WebGL View)│        │ (Device, Colors,     │
       │  • Procedural Case   │        │  Glitters, Charms,   │
       │  • Glitter Shaders   │        │  Monogram, Lighting) │
       │  • Charm Meshes      │        └──────────────────────┘
       │  • OrbitControls     │
       └──────────────────────┘
               │
       ┌───────▼──────────────────────────────────────────────┐
       │ Pretty Loaded Orbit Carousel (components/ui/...)     │
       │  • GSAP ScrollTrigger & Orbiting Case Editions       │
       │  • High-res cutout preview assets & specifications   │
       └──────────────────────────────────────────────────────┘
```

### Planned Steps

1. **Dependencies Installation**:
   - `three`, `@types/three` (3D rendering & OrbitControls)
   - `gsap` (for Orbit Carousel)
   - `canvas-confetti` (for delight upon adding to cart)
2. **Directory & Structure Setup**:
   - Create `/src/components/ui/dish-orbit-carousel.tsx` exactly as provided in the specification, wired for TypeScript and responsive styling.
   - Create `/src/components/studio/ThreePhoneCanvas.tsx`: Three.js procedural case builder with:
     - Dimension switching based on selected phone (iPhone Pro Max, Galaxy Ultra, Pixel Pro).
     - Camera island geometry with multi-lens glass shaders.
     - Custom glint/sparkle shader using `ShaderMaterial` / `onBeforeCompile` with noise-driven star-twinkles.
     - 3D charms (bow, star, heart, ring) positioned on the case back.
     - Interactive orbit controls with touch support.
   - Create `/src/components/studio/CustomizerControls.tsx`:
     - Phone brand & model selector.
     - Glitter mix selector with preview swatches (Stardust, Chunky Hex, Holographic Unicorn, Pink Pop, Diamond Silver).
     - Glitter density slider (Subtle Sparkle → Loaded Maximalist).
     - Charm toggles and custom monogram input.
     - Studio lighting mode switcher (Clean Studio, Glam Pink, Disco Club, Sunburst).
     - Snapshot generator export (using `canvas.toDataURL()`).
3. **Orbit Carousel Adaptation**:
   - Populate with curated Pretty Loaded case editions with ratings, design stories, and direct "Customize this style" action.
4. **Shopping Cart Drawer**:
   - Slide-over bag showing custom configurations, device specifications, live prices, and instant checkout simulation.
5. **Brand Polish & Verification**:
   - Embed official brand logo assets and wallpaper backgrounds provided in `/public/assets/aistudio/...`.
   - Run compilation and lint checks to ensure 100% build stability.
