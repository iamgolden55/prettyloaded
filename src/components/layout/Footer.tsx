import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="brand-footer" className="bg-zinc-950 text-white pt-16 pb-12 border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center font-outfit font-black text-sm text-white shadow-md shadow-pink-500/30">
                PL
              </div>
              <span className="font-outfit font-black text-xl tracking-tight text-white">
                PRETTY LOADED
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-jakarta leading-relaxed">
              A playful Y2K phone-case studio combining glitter-inspired finishes, chrome accents, decorative charms and personalised monograms.
            </p>
            <div className="flex items-center gap-2 text-xs text-pink-400 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handcrafted with love & sparkles</span>
            </div>
          </div>

          {/* Supported Devices */}
          <div className="space-y-3">
            <h4 className="font-outfit font-bold text-sm uppercase tracking-wider text-pink-400">
              Flagship Dimensions
            </h4>
            <ul className="text-xs text-zinc-400 space-y-2 font-jakarta">
              <li className="hover:text-white transition-colors cursor-pointer">iPhone 16 Pro Max (6.9&quot;)</li>
              <li className="hover:text-white transition-colors cursor-pointer">iPhone 16 Pro (6.3&quot;)</li>
              <li className="hover:text-white transition-colors cursor-pointer">iPhone 16 (6.1&quot;)</li>
              <li className="hover:text-white transition-colors cursor-pointer">Samsung Galaxy S24 Ultra</li>
              <li className="hover:text-white transition-colors cursor-pointer">Google Pixel 9 Pro</li>
            </ul>
          </div>

          {/* Charms & Customizations */}
          <div className="space-y-3">
            <h4 className="font-outfit font-bold text-sm uppercase tracking-wider text-pink-400">
              Customizer Elements
            </h4>
            <ul className="text-xs text-zinc-400 space-y-2 font-jakarta">
              <li className="hover:text-white transition-colors cursor-pointer">Disco Mirror Sparkle</li>
              <li className="hover:text-white transition-colors cursor-pointer">Barbie Holographic Flakes</li>
              <li className="hover:text-white transition-colors cursor-pointer">Cyber Chrome Bow & Locket</li>
              <li className="hover:text-white transition-colors cursor-pointer">Y2K Metallic Orbit Ring</li>
              <li className="hover:text-white transition-colors cursor-pointer">Hot Pink & Silver Foil Deboss</li>
            </ul>
          </div>

          {/* Newsletter signup will be enabled after connecting a mailing-list provider. */}
          <div className="space-y-3">
            <h4 className="font-outfit font-bold text-sm uppercase tracking-wider text-pink-400">
              VIP Drop Club
            </h4>
            <p className="text-xs text-zinc-400 font-jakarta">
              Follow Pretty Loaded for new drops and product announcements. Email sign-up will be available here once our mailing list is connected.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-jakarta">
          <p>© {new Date().getFullYear()} Pretty Loaded™. All rights reserved. Designed for lovers of extra glam.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-zinc-300 cursor-pointer flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> & Glitters
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
