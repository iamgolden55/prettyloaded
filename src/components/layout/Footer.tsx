import React, { useState } from 'react';
import { Heart, Sparkles, Send, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

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
              The premier bespoke Y2K custom phone case studio. Infusing high-impact shock protection with hand-poured glitters, chrome charms, and signature foil monograms.
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

          {/* VIP Drop Newsletter */}
          <div className="space-y-3">
            <h4 className="font-outfit font-bold text-sm uppercase tracking-wider text-pink-400">
              VIP Drop Club
            </h4>
            <p className="text-xs text-zinc-400 font-jakarta">
              Get secret drop alerts for small-batch glitter pours, limited charm charms, and 15% off your first build.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs transition-colors flex items-center justify-center shrink-0"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-pink-400 font-medium">
                  ✨ Welcome to the Loaded Club! Check your inbox.
                </div>
              )}
            </form>
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
