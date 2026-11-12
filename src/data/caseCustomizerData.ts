export interface PhoneModel {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Google';
  dimensions: {
    width: number;
    height: number;
    depth: number;
    cornerRadius: number;
  };
  cameraType: 'iphone-pro' | 'iphone-dual' | 'samsung-ultra' | 'samsung-triple' | 'pixel-visor';
  cameraOffset: { x: number; y: number; width: number; height: number };
  tag: string;
  basePrice: number;
}

export interface CaseColor {
  id: string;
  name: string;
  hex: string;
  metalness: number;
  roughness: number;
  transmission: number;
  opacity: number;
  price: number;
  description: string;
}

export interface GlitterMix {
  id: string;
  name: string;
  tagline: string;
  colors: string[];
  particleType: 'fine' | 'chunky' | 'stars' | 'hearts' | 'holographic';
  sparkleIntensity: number;
  price: number;
}

export interface CharmOption {
  id: string;
  name: string;
  category: 'charm' | 'strap' | 'ring';
  previewIcon: string;
  color: string;
  price: number;
  description: string;
  position: { x: number; y: number; z: number };
}

export interface LightingPreset {
  id: string;
  name: string;
  icon: string;
  description: string;
  keyColor: string;
  fillColor: string;
  rimColor: string;
  intensity: number;
}

export interface CustomCaseConfig {
  phoneModelId: string;
  colorId: string;
  finishType: 'glossy' | 'frosted' | 'liquid';
  glitterMixId: string;
  glitterDensity: number; // 0.1 to 1.0
  activeCharms: string[];
  monogramText: string;
  monogramColor: string;
  monogramFont: 'bold' | 'cursive' | 'chrome';
  lightingPresetId: string;
}

export type Y2KCharm = CharmOption;

export interface CartItem {
  id: string;
  device: PhoneModel;
  color: CaseColor;
  glitter: GlitterMix;
  glitterDensity: number;
  charms: CharmOption[];
  monogramText?: string;
  monogramFoil?: string;
  unitPrice: number;
  quantity: number;
  snapshotImage?: string;
}

export const BASE_CASE_PRICE = 38;
export const MONOGRAM_PRICE = 5;

export const PHONE_MODELS: PhoneModel[] = [
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    dimensions: { width: 3.2, height: 6.7, depth: 0.38, cornerRadius: 0.5 },
    cameraType: 'iphone-pro',
    cameraOffset: { x: -0.75, y: 1.8, width: 1.45, height: 1.55 },
    tag: 'Flagship 6.9"',
    basePrice: 42,
  },
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    dimensions: { width: 3.0, height: 6.2, depth: 0.38, cornerRadius: 0.48 },
    cameraType: 'iphone-pro',
    cameraOffset: { x: -0.7, y: 1.6, width: 1.4, height: 1.5 },
    tag: 'Compact Pro 6.3"',
    basePrice: 40,
  },
  {
    id: 'iphone-16',
    name: 'iPhone 16',
    brand: 'Apple',
    dimensions: { width: 2.95, height: 6.1, depth: 0.36, cornerRadius: 0.46 },
    cameraType: 'iphone-dual',
    cameraOffset: { x: -0.85, y: 1.7, width: 0.95, height: 1.6 },
    tag: 'Classic 6.1"',
    basePrice: 38,
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    dimensions: { width: 3.25, height: 6.65, depth: 0.39, cornerRadius: 0.18 },
    cameraType: 'samsung-ultra',
    cameraOffset: { x: -0.8, y: 1.5, width: 1.1, height: 2.3 },
    tag: 'Titanium Beast 6.8"',
    basePrice: 42,
  },
  {
    id: 'samsung-s24-plus',
    name: 'Samsung Galaxy S24+',
    brand: 'Samsung',
    dimensions: { width: 3.1, height: 6.45, depth: 0.37, cornerRadius: 0.44 },
    cameraType: 'samsung-triple',
    cameraOffset: { x: -0.9, y: 1.6, width: 0.8, height: 2.1 },
    tag: 'Sleek Plus 6.7"',
    basePrice: 40,
  },
  {
    id: 'google-pixel-9-pro',
    name: 'Google Pixel 9 Pro',
    brand: 'Google',
    dimensions: { width: 3.15, height: 6.55, depth: 0.38, cornerRadius: 0.5 },
    cameraType: 'pixel-visor',
    cameraOffset: { x: 0, y: 1.6, width: 2.8, height: 0.95 },
    tag: 'Visor Pro 6.8"',
    basePrice: 40,
  },
];

export const CASE_COLORS: CaseColor[] = [
  {
    id: 'pretty-pink',
    name: 'Hot Pink Chrome',
    hex: '#FF4DB8',
    metalness: 0.85,
    roughness: 0.15,
    transmission: 0,
    opacity: 1,
    price: 0,
    description: 'Signature Pretty Loaded high-voltage metallic pink',
  },
  {
    id: 'baby-pink',
    name: 'Soft Bubblegum',
    hex: '#FFCFE6',
    metalness: 0.4,
    roughness: 0.25,
    transmission: 0,
    opacity: 1,
    price: 0,
    description: 'Dreamy pastel pink with silky satin gleam',
  },
  {
    id: 'liquid-silver',
    name: 'Liquid Chrome',
    hex: '#D4D4D8',
    metalness: 0.95,
    roughness: 0.08,
    transmission: 0,
    opacity: 1,
    price: 4,
    description: 'Ultra-reflective 90s cyber liquid silver mirror',
  },
  {
    id: 'pearl-white',
    name: 'Pearl Opal',
    hex: '#F7F2F4',
    metalness: 0.65,
    roughness: 0.2,
    transmission: 0,
    opacity: 1,
    price: 0,
    description: 'Iridescent oyster pearl with subtle rainbow sheen',
  },
  {
    id: 'noir-black',
    name: 'Velvet Noir',
    hex: '#18181B',
    metalness: 0.7,
    roughness: 0.3,
    transmission: 0,
    opacity: 1,
    price: 0,
    description: 'Deep midnight obsidian with high-contrast glitter',
  },
  {
    id: 'crystal-clear',
    name: 'Pure Acrylic Clear',
    hex: '#FFFFFF',
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.85,
    opacity: 0.45,
    price: 0,
    description: 'Optically clear shockproof case revealing phone back',
  },
];

export const GLITTER_MIXES: GlitterMix[] = [
  {
    id: 'chunky-holographic',
    name: 'Prism Holo Flakes',
    tagline: 'Multi-size hexagonal flakes that explode with rainbow light',
    colors: ['#FF4DB8', '#38BDF8', '#FACC15', '#C084FC', '#FFFFFF'],
    particleType: 'holographic',
    sparkleIntensity: 1.0,
    price: 6,
  },
  {
    id: 'pink-stardust',
    name: 'Pink Stardust Dust',
    tagline: 'Ultra-fine cosmic shimmer that dances with every tilt',
    colors: ['#FF4DB8', '#FFB6C1', '#FFFFFF', '#FF80CC'],
    particleType: 'fine',
    sparkleIntensity: 0.85,
    price: 4,
  },
  {
    id: 'silver-star-foil',
    name: 'Starlight Foil Stars',
    tagline: 'Tiny metallic chrome stars embedded in clear suspension',
    colors: ['#FFFFFF', '#E2E8F0', '#94A3B8'],
    particleType: 'stars',
    sparkleIntensity: 0.9,
    price: 6,
  },
  {
    id: 'sweetheart-confetti',
    name: 'Heart Locket Glitter',
    tagline: 'Fuchsia and rose micro-hearts floating with champagne dust',
    colors: ['#FF1493', '#FF69B4', '#FFD700', '#FFFFFF'],
    particleType: 'hearts',
    sparkleIntensity: 0.8,
    price: 5,
  },
  {
    id: 'chunky-gold-pink',
    name: 'Sunset Champagne',
    tagline: 'Warm golden foil flakes blended with blush pink glitter',
    colors: ['#F59E0B', '#F472B6', '#FCD34D', '#FFF1F2'],
    particleType: 'chunky',
    sparkleIntensity: 0.85,
    price: 5,
  },
];

export const Y2K_CHARMS: CharmOption[] = [
  {
    id: 'ribbon-bow-locket',
    name: '3D Chrome Bow & Heart Locket',
    category: 'charm',
    previewIcon: '🎀',
    color: '#FF4DB8',
    price: 10,
    description: 'Sculpted metallic ribbon bow with swinging crystal heart pendant',
    position: { x: 0.65, y: -0.6, z: 0.22 },
  },
  {
    id: 'chrome-star',
    name: 'Cyber Chrome Star',
    category: 'charm',
    previewIcon: '⭐',
    color: '#E2E8F0',
    price: 6,
    description: 'Chunky 5-point Y2K puffed chrome star with beveled edges',
    position: { x: 0.65, y: 0.8, z: 0.22 },
  },
  {
    id: 'ruby-heart',
    name: 'Faceted Ruby Heart',
    category: 'charm',
    previewIcon: '💖',
    color: '#E11D48',
    price: 6,
    description: '3D faceted crystal jewel heart centered in metallic frame',
    position: { x: 0, y: -0.2, z: 0.22 },
  },
  {
    id: 'orbit-ring',
    name: 'Planet Orbit Swoosh',
    category: 'ring',
    previewIcon: '🪐',
    color: '#C0C0C0',
    price: 8,
    description: 'Silver chrome halo ring encircling your customized design',
    position: { x: 0, y: -0.8, z: 0.21 },
  },
  {
    id: 'beaded-wristlet',
    name: 'Candy Bead Wristlet Strap',
    category: 'strap',
    previewIcon: '📿',
    color: '#FFCFE6',
    price: 12,
    description: 'Heavyweight acrylic star & pearl wrist strap attached to side loop',
    position: { x: -1.3, y: -2.8, z: 0.1 },
  },
];

export const LIGHTING_PRESETS: LightingPreset[] = [
  {
    id: 'studio-glam',
    name: 'Studio Glam',
    icon: '✨',
    description: 'Crisp bright spotlight with crisp specular reflections',
    keyColor: '#FFFFFF',
    fillColor: '#FFCFE6',
    rimColor: '#FF4DB8',
    intensity: 1.8,
  },
  {
    id: 'disco-club',
    name: 'Y2K Disco Club',
    icon: '🪩',
    description: 'Neon magenta and cyan party lights making glitters burst',
    keyColor: '#FF007F',
    fillColor: '#00F0FF',
    rimColor: '#FFFFFF',
    intensity: 2.2,
  },
  {
    id: 'sunset-golden',
    name: 'Golden Hour',
    icon: '🌅',
    description: 'Warm champagne amber rays with golden rim glow',
    keyColor: '#FFAE52',
    fillColor: '#FF80BF',
    rimColor: '#FFE5B4',
    intensity: 1.6,
  },
  {
    id: 'cyber-minimal',
    name: 'Cool Cyber',
    icon: '❄️',
    description: 'Crisp arctic white light highlighting mirror chrome',
    keyColor: '#E0F2FE',
    fillColor: '#CBD5E1',
    rimColor: '#93C5FD',
    intensity: 1.5,
  },
];

export const DEFAULT_CONFIG: CustomCaseConfig = {
  phoneModelId: 'iphone-16-pro-max',
  colorId: 'pretty-pink',
  finishType: 'glossy',
  glitterMixId: 'chunky-holographic',
  glitterDensity: 0.85,
  activeCharms: ['ribbon-bow-locket', 'chrome-star', 'ruby-heart'],
  monogramText: 'BABY',
  monogramColor: '#FFFFFF',
  monogramFont: 'chrome',
  lightingPresetId: 'studio-glam',
};

export const PRESET_COLLECTIONS = [
  {
    id: 'preset-disco-diva',
    title: 'Disco Diva',
    subtitle: 'Chunky Holo Edition',
    label: 'Chunky Holo Edition',
    image: '/assets/cases/disco-diva.svg',
    rating: 5.0,
    chef: 'Pretty Loaded Team',
    kitchen: 'Signature 2026 Drop',
    description: 'Our #1 viral design. Prismatic chunky hex flakes suspended over hot pink chrome with our signature sculpted bow.',
    likes: 342,
    ingredients: ['iPhone 16 Pro Max', 'Prism Holo Flakes', 'Chrome Bow Charm', 'Silver Orbit Ring', 'Hot Pink Base'],
    accent: '#FF4DB8',
    config: {
      phoneModelId: 'iphone-16-pro-max',
      colorId: 'pretty-pink',
      finishType: 'glossy' as const,
      glitterMixId: 'chunky-holographic',
      glitterDensity: 0.95,
      activeCharms: ['ribbon-bow-locket', 'chrome-star', 'orbit-ring'],
      monogramText: 'LOADED',
      monogramColor: '#FFFFFF',
      monogramFont: 'chrome' as const,
      lightingPresetId: 'disco-club',
    },
  },
  {
    id: 'preset-cyber-silver',
    title: 'Silver Starlet',
    subtitle: 'Liquid Mirror',
    label: 'Liquid Mirror',
    image: '/assets/cases/silver-starlet.svg',
    rating: 4.9,
    chef: 'Pretty Loaded Team',
    kitchen: 'Cyber Luxury Series',
    description: 'Mirror liquid chrome finish with embedded silver star foil dust and a raised crystal locket. Reflects pure luxury.',
    likes: 289,
    ingredients: ['Galaxy S24 Ultra', 'Liquid Chrome', 'Starlight Foil Stars', 'Cyber Star Charm', 'Ruby Gem'],
    accent: '#C0C0C0',
    config: {
      phoneModelId: 'samsung-s24-ultra',
      colorId: 'liquid-silver',
      finishType: 'glossy' as const,
      glitterMixId: 'silver-star-foil',
      glitterDensity: 0.8,
      activeCharms: ['chrome-star', 'ruby-heart'],
      monogramText: 'ANGEL',
      monogramColor: '#FFFFFF',
      monogramFont: 'chrome' as const,
      lightingPresetId: 'cyber-minimal',
    },
  },
  {
    id: 'preset-soft-sweetheart',
    title: 'Sweetheart Milk',
    subtitle: 'Pearl Opal Luxe',
    label: 'Pearl Opal Luxe',
    image: '/assets/cases/sweetheart-milk.svg',
    rating: 4.8,
    chef: 'Pretty Loaded Team',
    kitchen: 'Pastel Dream Batch',
    description: 'Iridescent pearl white case back infused with baby pink hearts and delicate stardust. Ultra-feminine and soft.',
    likes: 215,
    ingredients: ['Pixel 9 Pro', 'Pearl Opal', 'Heart Locket Glitter', 'Ribbon Bow', 'Candy Wristlet'],
    accent: '#FFCFE6',
    config: {
      phoneModelId: 'google-pixel-9-pro',
      colorId: 'pearl-white',
      finishType: 'glossy' as const,
      glitterMixId: 'sweetheart-confetti',
      glitterDensity: 0.75,
      activeCharms: ['ribbon-bow-locket', 'beaded-wristlet'],
      monogramText: 'SWEET',
      monogramColor: '#FF4DB8',
      monogramFont: 'cursive' as const,
      lightingPresetId: 'studio-glam',
    },
  },
  {
    id: 'preset-noir-glitz',
    title: 'Midnight Glitz',
    subtitle: 'Obsidian Velvet',
    label: 'Obsidian Velvet',
    image: '/assets/cases/midnight-glitz.svg',
    rating: 4.9,
    chef: 'Pretty Loaded Team',
    kitchen: 'After Dark Edition',
    description: 'Velvet black base contrasting with maximum sparkle holographic dust and chrome accents. High-contrast gothic glam.',
    likes: 310,
    ingredients: ['iPhone 16 Pro', 'Velvet Noir', 'Prism Holo Flakes', 'Chrome Stars', 'Orbit Ring'],
    accent: '#1F1F1F',
    config: {
      phoneModelId: 'iphone-16-pro',
      colorId: 'noir-black',
      finishType: 'glossy' as const,
      glitterMixId: 'chunky-holographic',
      glitterDensity: 1.0,
      activeCharms: ['chrome-star', 'orbit-ring', 'ruby-heart'],
      monogramText: 'QUEEN',
      monogramColor: '#FF4DB8',
      monogramFont: 'chrome' as const,
      lightingPresetId: 'disco-club',
    },
  },
];

export type PresetEdition = typeof PRESET_COLLECTIONS[number];
