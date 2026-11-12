import React, { useState } from 'react';
import { X, Download, Share2, Check, Sparkles, Smartphone, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SnapshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  deviceName: string;
  glitterName: string;
}

export const SnapshotModal: React.FC<SnapshotModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  deviceName,
  glitterName,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !imageUrl) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `pretty-loaded-${deviceName.toLowerCase().replace(/\s+/g, '-')}-custom.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF4DB8', '#FFCFE6', '#C0C0C0'],
    });
  };

  const handleCopy = async () => {
    try {
      // Fetch the blob from data url and write to clipboard if supported
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: copy data url text or just show feedback
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border-2 border-pink-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top ribbon */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 px-6 py-3.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-200 animate-spin" />
            <span className="font-outfit font-bold text-sm tracking-wide">3D Studio HD Render</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Render Preview Frame */}
          <div className="relative rounded-2xl bg-radial from-pink-100/70 via-pink-50/40 to-white border border-pink-200/80 p-4 flex items-center justify-center overflow-hidden min-h-[300px]">
            <img
              src={imageUrl}
              alt="Custom Pretty Loaded Phone Case"
              className="max-h-[320px] object-contain drop-shadow-2xl"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-pink-200 text-[10px] font-bold text-pink-600 flex items-center gap-1">
              <Smartphone className="w-3 h-3" />
              <span>{deviceName}</span>
            </div>
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-sm text-[10px] font-bold text-pink-300 flex items-center gap-1">
              <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
              <span>{glitterName}</span>
            </div>
          </div>

          <div className="text-center space-y-1">
            <h4 className="font-outfit font-extrabold text-lg text-zinc-900">Your Loaded Masterpiece</h4>
            <p className="text-xs text-zinc-500 font-jakarta">
              Download your custom 3D rendering to share on Instagram, TikTok, or show your besties!
            </p>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleDownload}
              className="py-3 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 active:scale-[0.99] text-white font-outfit font-bold text-xs tracking-wide shadow-md shadow-pink-500/30 flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res</span>
            </button>

            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 active:scale-[0.99] text-pink-700 font-outfit font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Copy Image</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
