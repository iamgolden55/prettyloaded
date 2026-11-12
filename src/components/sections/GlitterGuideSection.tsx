import React from 'react';
import { Sparkles, Shield, Droplets, Gem, Zap, CheckCircle2 } from 'lucide-react';
import { GLITTER_MIXES, GlitterMix } from '../../data/caseCustomizerData';

interface GlitterGuideSectionProps {
  currentGlitterId: string;
  onSelectGlitter: (glitterId: string) => void;
  onScrollToStudio: () => void;
}

export const GlitterGuideSection: React.FC<GlitterGuideSectionProps> = ({
  currentGlitterId,
  onSelectGlitter,
  onScrollToStudio,
}) => {
  return (
    <section id="glitter-guide" className="py-20 bg-white relative overflow-hidden border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-widest font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>The Science of Sparkle</span>
          </div>
          <h2 className="font-outfit font-black text-3xl sm:text-5xl text-zinc-900 tracking-tight">
            Hand-Poured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">Glitter Formulations</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-jakarta mt-3">
            Explore the finishes, colours and decorative effects available for your custom case.
          </p>
        </div>

        {/* Glitter Mixes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {GLITTER_MIXES.map((glitter: GlitterMix) => {
            const isSelected = glitter.id === currentGlitterId;
            return (
              <div
                key={glitter.id}
                className={`group relative p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-pink-500 bg-gradient-to-b from-pink-50/80 to-white shadow-xl shadow-pink-500/10'
                    : 'border-pink-100 bg-white hover:border-pink-300 hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Swatch Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-2xl shadow-inner border border-white/60 flex items-center justify-center text-lg relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${glitter.colors[0]}, ${glitter.colors[1] || glitter.colors[0]})`,
                        }}
                      >
                        <span className="relative z-10">✨</span>
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
                      </div>
                      <div>
                        <h3 className="font-outfit font-bold text-base text-zinc-900">{glitter.name}</h3>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-pink-600">
                          {glitter.particleType}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {glitter.colors.map((color: string, idx: number) => (
                        <span
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 font-jakarta leading-relaxed mb-4">
                    {glitter.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-pink-100/80 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-zinc-400">Sparkle:</span>{' '}
                    <span className="font-semibold text-zinc-700">{(glitter.sparkleIntensity * 100).toFixed(0)}% Intensity</span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectGlitter(glitter.id);
                      onScrollToStudio();
                    }}
                    className={`px-3 py-1.5 rounded-xl font-outfit text-xs font-bold transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-pink-500 text-white shadow-xs'
                        : 'bg-pink-50 text-pink-700 hover:bg-pink-500 hover:text-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active in 3D</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Try on Phone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Craftsmanship Features Grid */}
        <div id="craftsmanship" className="rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-pink-950 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mb-10">
            <span className="text-pink-400 font-mono text-xs uppercase tracking-widest font-bold">
              Materials × Aesthetics
            </span>
            <h3 className="font-outfit font-black text-2xl sm:text-4xl tracking-tight mt-1">
              Pretty on the Outside. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-pink-200">
                A Little Extra Everything.
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-jakarta mt-2">
              Discover the design details and materials planned for the Pretty Loaded collection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-outfit font-bold text-base text-white">Protective Case Design</h4>
              <p className="text-xs text-zinc-400 font-jakarta leading-relaxed">
                Case construction and protection specifications will be published once product testing is complete.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="font-outfit font-bold text-base text-white">Clear Finish Options</h4>
              <p className="text-xs text-zinc-400 font-jakarta leading-relaxed">
                Explore clear and tinted finishes. Material performance details will be added after supplier verification.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300">
                <Gem className="w-5 h-5" />
              </div>
              <h4 className="font-outfit font-bold text-base text-white">Statement Accessories</h4>
              <p className="text-xs text-zinc-400 font-jakarta leading-relaxed">
                Add decorative charms, metallic accents and personal details to your design.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-outfit font-bold text-base text-white">Device Compatibility</h4>
              <p className="text-xs text-zinc-400 font-jakarta leading-relaxed">
                Compatibility and wireless-charging specifications will be confirmed for each physical case model.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
