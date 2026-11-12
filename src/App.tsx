/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ThreePhoneCanvas, ThreePhoneCanvasRef } from './components/studio/ThreePhoneCanvas';
import { CustomizerControls } from './components/studio/CustomizerControls';
import { SnapshotModal } from './components/studio/SnapshotModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { SignatureShowcase } from './components/showcase/SignatureShowcase';
import { GlitterGuideSection } from './components/sections/GlitterGuideSection';
import {
  CustomCaseConfig,
  DEFAULT_CONFIG,
  PHONE_MODELS,
  CASE_COLORS,
  GLITTER_MIXES,
  Y2K_CHARMS,
  CartItem,
} from './data/caseCustomizerData';
import { Sparkles, Eye, RotateCw } from 'lucide-react';

export default function App() {
  // Master Customizer Configuration State
  const [config, setConfig] = useState<CustomCaseConfig>(DEFAULT_CONFIG);

  // Cart & Snapshot Modals
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [snapshotImage, setSnapshotImage] = useState<string | null>(null);
  const [isSnapshotModalOpen, setIsSnapshotModalOpen] = useState<boolean>(false);

  // Canvas imperative ref
  const canvasRef = useRef<ThreePhoneCanvasRef>(null);

  // Section Refs for Navigation
  const studioRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Derived current models
  const selectedDevice = PHONE_MODELS.find((m) => m.id === config.phoneModelId) || PHONE_MODELS[0];
  const selectedColor = CASE_COLORS.find((c) => c.id === config.colorId) || CASE_COLORS[0];
  const selectedGlitter = GLITTER_MIXES.find((g) => g.id === config.glitterMixId) || GLITTER_MIXES[0];

  const handleScrollToStudio = () => {
    studioRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToShowcase = () => {
    showcaseRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConfigChange = (updated: Partial<CustomCaseConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleCaptureSnapshot = () => {
    const dataUrl = canvasRef.current?.captureSnapshot();
    if (dataUrl) {
      setSnapshotImage(dataUrl);
      setIsSnapshotModalOpen(true);
    }
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    canvasRef.current?.resetView();
  };

  const handleAddToCart = (customizedCase: { config: CustomCaseConfig; price: number; name: string }) => {
    const device = PHONE_MODELS.find((m) => m.id === customizedCase.config.phoneModelId) || PHONE_MODELS[0];
    const color = CASE_COLORS.find((c) => c.id === customizedCase.config.colorId) || CASE_COLORS[0];
    const glitter = GLITTER_MIXES.find((g) => g.id === customizedCase.config.glitterMixId) || GLITTER_MIXES[0];
    const charms = Y2K_CHARMS.filter((c) => customizedCase.config.activeCharms.includes(c.id));
    const snapshot = canvasRef.current?.captureSnapshot();

    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      device,
      color,
      glitter,
      glitterDensity: customizedCase.config.glitterDensity,
      charms,
      monogramText: customizedCase.config.monogramText,
      monogramFoil: customizedCase.config.monogramColor,
      unitPrice: customizedCase.price,
      quantity: 1,
      snapshotImage: snapshot || undefined,
    };

    setCartItems((prev) => [newItem, ...prev]);
    setIsCartOpen(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4DB8', '#FFCFE6', '#C0C0C0', '#FFE600'],
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectPresetConfig = (presetConfig: CustomCaseConfig) => {
    setConfig({ ...presetConfig });
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#FF4DB8', '#FFCFE6', '#C0C0C0'],
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Compute live unit price for mobile action bar
  let livePrice = selectedDevice.basePrice + selectedColor.price + selectedGlitter.price;
  config.activeCharms.forEach((charmId) => {
    const charm = Y2K_CHARMS.find((c) => c.id === charmId);
    if (charm) livePrice += charm.price;
  });
  if (config.monogramText.trim()) livePrice += 5;

  return (
    <div className="min-h-screen bg-pink-50/20 text-zinc-900 flex flex-col font-jakarta selection:bg-pink-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToStudio={handleScrollToStudio}
        onScrollToShowcase={handleScrollToShowcase}
      />

      {/* Main Studio Viewport */}
      <main className="flex-1">
        <section
          ref={studioRef}
          id="customizer-studio"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
        >
          {/* Studio Top Headline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-widest border border-pink-200/80 mb-2 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>3D Glitter Customization Studio</span>
              </div>
              <h1 className="font-outfit font-black text-3xl sm:text-5xl text-zinc-900 tracking-tight leading-tight">
                Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">Loaded Case</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 font-jakarta mt-1 max-w-2xl">
                Real-time 360° interactive 3D rendering. Choose your flagship phone dimensions, combine holographic glitters, lock on Y2K chrome charms, and foil-deboss your initials.
              </p>
            </div>

            {/* Quick Switch Preset Pills */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-500 hidden sm:inline">Quick Drop:</span>
              <button
                onClick={() =>
                  handleSelectPresetConfig({
                    phoneModelId: 'iphone-16-pro-max',
                    colorId: 'pretty-pink',
                    finishType: 'glossy',
                    glitterMixId: 'chunky-holographic',
                    glitterDensity: 0.95,
                    activeCharms: ['ribbon-bow-locket', 'chrome-star', 'orbit-ring'],
                    monogramText: 'LOADED',
                    monogramColor: '#FFFFFF',
                    monogramFont: 'chrome',
                    lightingPresetId: 'disco-club',
                  })
                }
                className="px-3 py-1.5 rounded-full bg-pink-100/80 hover:bg-pink-200/80 text-pink-700 text-xs font-bold font-outfit border border-pink-300 transition-all flex items-center gap-1"
              >
                <span>💖 Disco Diva</span>
              </button>
              <button
                onClick={() =>
                  handleSelectPresetConfig({
                    phoneModelId: 'samsung-s24-ultra',
                    colorId: 'liquid-silver',
                    finishType: 'glossy',
                    glitterMixId: 'silver-star-foil',
                    glitterDensity: 0.85,
                    activeCharms: ['chrome-star', 'ruby-heart'],
                    monogramText: 'ANGEL',
                    monogramColor: '#FFFFFF',
                    monogramFont: 'chrome',
                    lightingPresetId: 'cyber-minimal',
                  })
                }
                className="px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold font-outfit border border-zinc-300 transition-all flex items-center gap-1"
              >
                <span>✨ Cyber Star</span>
              </button>
            </div>
          </div>

          {/* Main 2-Column Customizer Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Interactive 3D Canvas Preview (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <ThreePhoneCanvas
                ref={canvasRef}
                config={config}
                onConfigChange={handleConfigChange}
                className="w-full"
              />

              {/* 3D Hint bar */}
              <div className="p-3 rounded-2xl bg-white border border-pink-100 shadow-xs flex items-center justify-between text-xs text-zinc-500 font-jakarta">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold text-zinc-700">Studio Room Environment Reflections Active</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline">Drag to rotate 360° • Pinch / scroll to zoom</span>
                  <button
                    onClick={() => canvasRef.current?.flipCase()}
                    className="text-pink-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Flip Front/Back</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Customizer Controls Panel (5 cols) */}
            <div className="lg:col-span-5">
              <CustomizerControls
                config={config}
                onChange={handleConfigChange}
                onAddToCart={handleAddToCart}
                onCaptureSnapshot={handleCaptureSnapshot}
                onReset={handleReset}
              />
            </div>

          </div>
        </section>

        {/* Signature Drops Section (Dish Orbit Carousel) */}
        <div ref={showcaseRef}>
          <SignatureShowcase
            onSelectPreset={handleSelectPresetConfig}
            onScrollToStudio={handleScrollToStudio}
          />
        </div>

        {/* Glitter Guide & Durability Section */}
        <GlitterGuideSection
          currentGlitterId={config.glitterMixId}
          onSelectGlitter={(glitterId) => handleConfigChange({ glitterMixId: glitterId })}
          onScrollToStudio={handleScrollToStudio}
        />
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Snapshot HD Preview & Download Modal */}
      <SnapshotModal
        isOpen={isSnapshotModalOpen}
        onClose={() => setIsSnapshotModalOpen(false)}
        imageUrl={snapshotImage}
        deviceName={selectedDevice.name}
        glitterName={selectedGlitter.name}
      />

      {/* Mobile Sticky Bottom Customizer Action Bar */}
      <div className="lg:hidden sticky bottom-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-pink-200 shadow-xl flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
            {selectedDevice.name}
          </div>
          <div className="text-base font-outfit font-black text-pink-600">
            ${livePrice.toFixed(2)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleScrollToStudio}
            className="p-2.5 rounded-xl border border-pink-200 bg-pink-50 text-pink-700 font-bold text-xs flex items-center gap-1.5"
            aria-label="View in 3D"
          >
            <Eye className="w-4 h-4" />
            <span>3D View</span>
          </button>

          <button
            onClick={() =>
              handleAddToCart({
                config,
                price: livePrice,
                name: `${selectedDevice.name} Custom Loaded Case`,
              })
            }
            className="px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-outfit font-bold text-xs shadow-md shadow-pink-500/20 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
