import React, { useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  Play,
  Search,
  Star,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { PRESET_COLLECTIONS, PresetEdition, CustomCaseConfig } from '../../data/caseCustomizerData';

interface SignatureShowcaseProps {
  onSelectPreset: (presetConfig: CustomCaseConfig) => void;
  onScrollToStudio: () => void;
}

type DetailsTab = 'details' | 'specs';
type Reaction = 'love' | 'dislike' | null;

export const SignatureShowcase: React.FC<SignatureShowcaseProps> = ({
  onSelectPreset,
  onScrollToStudio,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<DetailsTab>('details');
  const [reaction, setReaction] = useState<Reaction>(null);
  const selectedPreset: PresetEdition = PRESET_COLLECTIONS[selectedIndex] ?? PRESET_COLLECTIONS[0];

  const selectPreset = (index: number) => {
    setSelectedIndex((index + PRESET_COLLECTIONS.length) % PRESET_COLLECTIONS.length);
    setActiveTab('details');
    setReaction(null);
  };

  const openSelectedPreset = () => {
    if (!selectedPreset) return;
    onSelectPreset(selectedPreset.config);
    onScrollToStudio();
  };

  if (!selectedPreset) return null;

  return (
    <section
      id="signature-showcase"
      aria-labelledby="signature-showcase-title"
      className="relative overflow-hidden border-t border-zinc-100 bg-white py-12 sm:py-14"
    >
      {/* Collection heading — deliberately separate from the hero, as in the reference. */}
      <div className="mx-auto mb-7 max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-zinc-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-pink-600 sm:text-[11px]">
              Vault Collection <span className="px-1 text-pink-300">•</span> Drop 01
            </span>
            <h2 id="signature-showcase-title" className="font-outfit text-3xl font-extrabold leading-none tracking-[-0.045em] text-zinc-950 sm:text-4xl">
              Curated Signature Drops
            </h2>
            <p className="mt-2 max-w-xl font-jakarta text-xs leading-relaxed text-zinc-500 sm:text-sm">
              Four iconic ready-to-order builds engineered with high-voltage glitter suspensions,
              liquid chrome hardware, and shock-absorbing bumpers.
            </p>
          </div>
          <button
            type="button"
            onClick={onScrollToStudio}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 font-jakarta text-xs font-semibold text-zinc-700 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-700"
          >
            Build in 3D Studio
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Small utility icons sit above the details panel, not in the collection header. */}
        <div className="mb-3 flex justify-end gap-7 pr-4 sm:pr-8 lg:pr-[6.2rem]">
          <button type="button" aria-label="Search signature drops" className="text-zinc-800 transition hover:text-pink-600">
            <Search className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <button type="button" aria-label="Collection menu" className="text-zinc-800 transition hover:text-pink-600">
            <Menu className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Hero: case on the left, oversized editorial title in the middle, details card on the right. */}
        <div className="grid items-center gap-x-7 gap-y-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)_240px] lg:gap-x-8">
          <div className="relative flex min-h-[290px] items-center justify-center sm:min-h-[350px] lg:min-h-[390px]">
            <div className="absolute -left-1 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
              <span className={`h-6 w-0.5 rounded-full ${selectedIndex === 0 ? 'bg-zinc-800' : 'bg-zinc-300'}`} />
              {PRESET_COLLECTIONS.map((preset, index) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => selectPreset(index)}
                  aria-label={`Go to drop ${index + 1}: ${preset.title}`}
                  aria-current={selectedIndex === index ? 'true' : undefined}
                  className={`h-1 w-1 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${selectedIndex === index ? 'bg-zinc-500' : 'bg-zinc-300 hover:bg-pink-400'}`}
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-8 bottom-7 h-8 rounded-full bg-zinc-900/10 blur-2xl" />
            <img
              key={selectedPreset.id}
              src={selectedPreset.image}
              alt={`${selectedPreset.title} ${selectedPreset.subtitle} phone case`}
              className="relative z-10 h-[285px] w-full max-w-[300px] object-contain drop-shadow-[0_18px_18px_rgba(24,24,27,0.20)] transition-transform duration-500 sm:h-[340px] lg:h-[365px]"
            />
          </div>

          <div className="relative flex min-h-[300px] flex-col justify-center py-5 lg:min-h-[390px] lg:py-0">
            {/* Soft, tapered pink brush stroke behind the product title. */}
            <svg
              className="pointer-events-none absolute left-[-24%] top-[10%] h-[75%] w-[135%] overflow-visible"
              viewBox="0 0 650 330"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M8 190 C115 160 207 142 318 100 C426 58 520 4 605 28 L620 40 C587 113 526 174 440 216 C315 277 190 282 76 252 C34 241 12 219 8 190Z"
                fill={selectedPreset.accent}
                opacity="0.29"
                className="transition-all duration-500"
              />
            </svg>
            <div className="relative z-10">
              <p className="mb-3 font-outfit text-xs font-bold text-zinc-900">{selectedPreset.label}</p>
              <h3 className="font-outfit text-[clamp(2.8rem,5.2vw,4rem)] font-light uppercase leading-[0.94] tracking-[-0.065em] text-zinc-950">
                {selectedPreset.title}
              </h3>
              <p className="mt-2 font-outfit text-[clamp(1.35rem,2.6vw,1.8rem)] font-extrabold uppercase leading-tight tracking-[-0.045em] text-zinc-800">
                {selectedPreset.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
                <button
                  type="button"
                  onClick={openSelectedPreset}
                  className="inline-flex items-center gap-2 font-jakarta text-xs font-bold text-zinc-800 transition hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                >
                  <Play className="h-3 w-3 fill-current" aria-hidden="true" />
                  Preview in 3D
                </button>
                <button
                  type="button"
                  onClick={openSelectedPreset}
                  className="inline-flex items-center gap-2 font-jakarta text-xs font-bold text-zinc-800 transition hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                >
                  <span className="text-sm leading-none" aria-hidden="true">⌃</span>
                  Customize Case
                </button>
              </div>
            </div>
          </div>

          <aside className="relative z-10 min-h-[350px] rounded-[24px] border border-zinc-100 bg-white p-5 shadow-[0_16px_38px_rgba(24,24,27,0.07)] sm:p-6 lg:mt-7">
            <div className="mb-6 flex items-center justify-center gap-8 border-b border-transparent">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                aria-pressed={activeTab === 'details'}
                className={`pb-1 font-jakarta text-[11px] font-bold transition ${activeTab === 'details' ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-700'}`}
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                aria-pressed={activeTab === 'specs'}
                className={`pb-1 font-jakarta text-[11px] font-bold transition ${activeTab === 'specs' ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-700'}`}
              >
                Charms &amp; Specs
              </button>
            </div>

            {activeTab === 'details' ? (
              <>
                <div className="mb-5 flex h-[67px] w-[51px] flex-col items-center justify-center rounded-xl bg-pink-500 text-zinc-950">
                  <span className="font-outfit text-[2.35rem] font-black leading-none">{selectedPreset.rating.toFixed(1)}</span>
                  <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                </div>
                <h4 className="font-outfit text-lg font-extrabold leading-tight text-zinc-900">{selectedPreset.chef}</h4>
                <p className="mt-1 font-jakarta text-[10px] text-zinc-400">{selectedPreset.kitchen}</p>
                <p className="mt-4 font-jakarta text-xs leading-[1.65] text-zinc-800">{selectedPreset.description}</p>
              </>
            ) : (
              <>
                <h4 className="mb-4 font-outfit text-lg font-extrabold text-zinc-900">Charms &amp; Specs</h4>
                <ul className="space-y-3">
                  {(selectedPreset.ingredients ?? []).map((item) => (
                    <li key={item} className="flex gap-2 font-jakarta text-xs leading-relaxed text-zinc-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setReaction(reaction === 'love' ? null : 'love')}
                aria-pressed={reaction === 'love'}
                aria-label="Love this case"
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-jakarta text-[10px] font-semibold transition ${reaction === 'love' ? 'bg-pink-100 text-pink-700' : 'bg-zinc-100 text-zinc-800 hover:bg-pink-50'}`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                {selectedPreset.likes + (reaction === 'love' ? 1 : 0)} loves
              </button>
              <button
                type="button"
                onClick={() => setReaction(reaction === 'dislike' ? null : 'dislike')}
                aria-pressed={reaction === 'dislike'}
                aria-label="Dislike this case"
                className={`flex h-9 w-9 items-center justify-center rounded-full transition ${reaction === 'dislike' ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </aside>

          {/* Product thumbnails sit directly below the hero artwork and title. */}
          <div className="flex items-center gap-2 lg:col-span-2 lg:-mt-1 lg:pl-10">
            <button
              type="button"
              onClick={() => selectPreset(selectedIndex - 1)}
              aria-label="Previous signature drop"
              className="hidden h-9 w-9 shrink-0 items-center justify-center text-zinc-900 transition hover:text-pink-600 sm:flex"
            >
              <ChevronLeft className="h-5 w-5 fill-current" />
            </button>
            <div className="grid min-w-0 flex-1 grid-cols-4 gap-2 sm:gap-4">
              {PRESET_COLLECTIONS.map((preset, index) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => selectPreset(index)}
                  aria-pressed={selectedIndex === index}
                  className={`min-w-0 rounded-2xl px-1.5 py-2 text-center transition-all sm:px-2 sm:py-3 ${selectedIndex === index ? 'bg-white shadow-[0_8px_24px_rgba(24,24,27,0.07)]' : 'hover:bg-zinc-50'}`}
                >
                  <img src={preset.image} alt="" loading="lazy" className="mx-auto h-[58px] w-full object-contain sm:h-[72px]" />
                  <span className="mt-1 block font-jakarta text-[9px] leading-snug text-zinc-700 sm:text-[10px]">
                    {preset.subtitle}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => selectPreset(selectedIndex + 1)}
              aria-label="Next signature drop"
              className="hidden h-9 w-9 shrink-0 items-center justify-center text-zinc-900 transition hover:text-pink-600 sm:flex"
            >
              <ChevronRight className="h-5 w-5 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureShowcase;
