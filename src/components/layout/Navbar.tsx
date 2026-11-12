import React from 'react';
import { ShoppingBag, Sparkles, Heart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToStudio: () => void;
  onScrollToShowcase: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onScrollToStudio,
  onScrollToShowcase,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-pink-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={onScrollToStudio}>
          {/* Logo badge */}
          <div className="relative group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-pink-300 p-0.5 shadow-md shadow-pink-500/25 flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <span className="font-outfit font-black text-lg text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-white to-pink-500 tracking-tighter">
                  PL
                </span>
                <span className="absolute -top-1 -right-1 text-[10px] animate-pulse">✨</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-outfit font-black text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-fuchsia-600 to-pink-500">
                PRETTY LOADED
              </span>
              <span className="inline-block px-1.5 py-0.2 rounded-full bg-pink-100 text-pink-600 text-[10px] font-bold tracking-widest uppercase border border-pink-200">
                Y2K
              </span>
            </div>
            <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase font-mono">
              3D GLITTER PHONE STUDIO
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-pink-50/70 p-1 rounded-full border border-pink-200/60">
          <button
            onClick={onScrollToStudio}
            className="px-4 py-1.5 text-xs font-outfit font-bold rounded-full text-pink-700 hover:bg-white hover:text-pink-600 hover:shadow-xs transition-all"
          >
            3D Studio
          </button>
          <button
            onClick={onScrollToShowcase}
            className="px-4 py-1.5 text-xs font-outfit font-bold rounded-full text-zinc-600 hover:bg-white hover:text-pink-600 hover:shadow-xs transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            Signature Drops
          </button>
          <a
            href="#glitter-guide"
            className="px-4 py-1.5 text-xs font-outfit font-bold rounded-full text-zinc-600 hover:bg-white hover:text-pink-600 hover:shadow-xs transition-all"
          >
            Glitter Bar
          </a>
          <a
            href="#craftsmanship"
            className="px-4 py-1.5 text-xs font-outfit font-bold rounded-full text-zinc-600 hover:bg-white hover:text-pink-600 hover:shadow-xs transition-all"
          >
            Craftsmanship
          </a>
        </nav>

        {/* Right actions: Bag button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white font-outfit font-bold text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">Loaded Bag</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-[11px] font-black flex items-center justify-center animate-bounce shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
