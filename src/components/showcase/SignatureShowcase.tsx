import React, { useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  SlidersHorizontal,
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
    const nextIndex = (index + PRESET_COLLECTIONS.length) % PRESET_COLLECTIONS.length;
    setSelectedIndex(nextIndex);
    setActiveTab('details');
    setReaction(null);
  };

  const moveSelection = (direction: -1 | 1) => {
    selectPreset(selectedIndex + direction);
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
      className="relative overflow-hidden border-t border-zinc-100 bg-white py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-4 border-b border-zinc-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-pink-600 sm:text-[11px]">
              Vault Collection <span className="px-1.5 text-pink-300">•</span> Drop 01
            </span>
            <h2
              id="signature-showcase-title"
              className="font-outfit text-3xl font-extrabold leading-none tracking-[-0.045em] text-zinc-950 sm:text-4xl"
            >
              Curated Signature Drops
            </h2>
            <p className="mt-2 max-w-xl font-jakarta text-xs leading-relaxed text-zinc-500 sm:text-sm">
              Four signature case designs, ready to make yours. Find your favourite finish, then take it into the 3D Studio.
            </p>
          </div>

          <button
            type="button"
            onClick={onScrollToStudio}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 font-jakarta text-xs font-semibold text-zinc-700 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
          >
            Build in 3D Studio
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
          </button>
        </div>

        <div className="grid items-center gap-x-8 gap-y-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)_240px] lg:gap-x-10">
          <div className="relative flex min-h-[290px] items-center justify-center sm:min-h-[350px] lg:min-h-[390px]">
            <div
              className="pointer-events-none absolute left-[8%] top-[16%] h-[65%] w-[110%] rotate-[-13deg] rounded-[48%_52%_58%_42%] opacity-90 transition-colors duration-500"
              style={{ backgroundColor: selectedPreset.accent }}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-x-8 bottom-8 h-8 rounded-full bg-zinc-900/10 blur-2xl" aria-hidden="true" />
            <img
              key={selectedPreset.id}
              src={selectedPreset.image}
              alt={`${selectedPreset.title} ${selectedPreset.subtitle} phone case`}
              className="relative z-10 h-[285px] w-full max-w-[300px] object-contain drop-shadow-[0_22px_22px_rgba(24,24,27,0.18)] transition-transform duration-500 hover:scale-[1.035] sm:h-[340px] lg:h-[370px]"
            />
            <div className="absolute -left-1 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex" aria-label={`Drop ${selectedIndex + 1} of ${PRESET_COLLECTIONS.length}`}>
              <span className="h-6 w-0.5 rounded-full bg-zinc-800" />
              {PRESET_COLLECTIONS.map((preset, index) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => selectPreset(index)}
                  aria-label={`Show ${preset.title}`}
                  aria-current={selectedIndex === index ? 'true' : undefined}
                  className={`h-1.5 w-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${selectedIndex === index ? 'scale-125 bg-pink-500' : 'bg-zinc-300 hover:bg-pink-300'}`}
                />
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center pb-2 lg:py-8">
            <p className="mb-2 font-outfit text-xs font-bold text-zinc-800">{selectedPreset.label}</p>
            <h3 className="font-outfit text-5xl font-light uppercase leading-[0.94] tracking-[-0.055em] text-zinc-950 sm:text-6xl xl:text-[4.25rem]">
              {selectedPreset.title}
            </h3>
            <p className="mt-2 font-outfit text-2xl font-extrabold uppercase leading-tight tracking-[-0.035em] text-zinc-800 sm:text-3xl">
              {selectedPreset.subtitle}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
              <button
                type="button"
                onClick={openSelectedPreset}
                className="inline-flex items-center gap-2 font-jakarta text-xs font-bold text-zinc-800 transition hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-4"
              >
                <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                Preview in 3D
              </button>
              <button
                type="button"
                onClick={openSelectedPreset}
                className="inline-flex items-center gap-2 font-jakarta text-xs font-bold text-zinc-800 transition hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-4"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                Customize Case
              </button>
            </div>
          </div>

          <aside className="overflow-hidden rounded-[26px] border border-zinc-100 bg-white shadow-[0_16px_45px_rgba(24,24,27,0.07)] lg:self-center">
            <div className="flex border-b border-zinc-100 px-4">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                aria-pressed={activeTab === 'details'}
                className={`flex-1 border-b-2 px-2 py-4 font-jakarta text-[11px] font-bold transition ${activeTab === 'details' ? 'border-pink-500 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-700'}`}
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                aria-pressed={activeTab === 'specs'}
                className={`flex-1 border-b-2 px-2 py-4 font-jakarta text-[11px] font-bold transition ${activeTab === 'specs' ? 'border-pink-500 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-700'}`}
              >
                Charms &amp; Specs
              </button>
            </div>

            <div className="min-h-[300px] p-5 sm:p-6">
              {activeTab === 'details' ? (
                <>
                  <div className="mb-5 flex items-center gap-2">
                    <span className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-pink-500 text-white">
                      <span className="font-outfit text-2xl font-black leading-none">{selectedPreset.rating.toFixed(1)}</span>
                      <Star className="mt-1 h-3 w-3 fill-current" aria-hidden="true" />
                    </span>
                    <span className="font-jakarta text-[10px] text-zinc-400">Signature rating</span>
                  </div>
                  <h4 className="font-outfit text-lg font-extrabold leading-tight text-zinc-900">{selectedPreset.chef}</h4>
                  <p className="mt-1 font-jakarta text-[10px] text-zinc-400">{selectedPreset.kitchen}</p>
                  <p className="mt-4 font-jakarta text-xs leading-[1.65] text-zinc-700">{selectedPreset.description}</p>
                </>
              ) : (
                <>
                  <p className="mb-4 font-outfit text-sm font-extrabold text-zinc-900">Inside this drop</p>
                  <ul className="space-y-3">
                    {(selectedPreset.ingredients ?? []).map((ingredient) => (
                      <li key={ingredient} className="flex items-start gap-2 font-jakarta text-xs leading-relaxed text-zinc-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-5 flex items-center gap-2 border-t border-zinc-100 pt-4">
                <button
                  type="button"
                  onClick={() => setReaction(reaction === 'love' ? null : 'love')}
                  aria-pressed={reaction === 'love'}
                  aria-label="Love this design"
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-jakarta text-[10px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${reaction === 'love' ? 'bg-pink-100 text-pink-700' : 'bg-zinc-100 text-zinc-700 hover:bg-pink-50'}`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
                  {selectedPreset.likes + (reaction === 'love' ? 1 : 0)} loves
                </button>
                <button
                  type="button"
                  onClick={() => setReaction(reaction === 'dislike' ? null : 'dislike')}
                  aria-pressed={reaction === 'dislike'}
                  aria-label="Not for me"
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${reaction === 'dislike' ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                >
                  <ThumbsDown className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-2 font-jakarta text-[9px] text-zinc-400">Community reactions are a preview in this demo.</p>
            </div>
          </aside>

          <div className="flex items-center gap-2 lg:col-span-2">
            <button
              type="button"
              onClick={() => moveSelection(-1)}
              aria-label="Previous signature drop"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full text-zinc-500 transition hover:bg-pink-50 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 sm:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="grid min-w-0 flex-1 grid-cols-4 gap-2 sm:gap-3">
              {PRESET_COLLECTIONS.map((preset, index) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => selectPreset(index)}
                  aria-pressed={selectedIndex === index}
                  className={`group min-w-0 rounded-2xl border p-2 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 sm:p-3 ${selectedIndex === index ? 'border-transparent bg-white shadow-[0_8px_25px_rgba(24,24,27,0.08)]' : 'border-transparent hover:border-zinc-100 hover:bg-zinc-50'}`}
                >
                  <img
                    src={preset.image}
                    alt=""
                    loading="lazy"
                    className="mx-auto h-16 w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:h-20"
                  />
                  <span className="mt-1 block font-jakarta text-[9px] font-medium leading-snug text-zinc-700 sm:text-[10px]">
                    {preset.subtitle}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => moveSelection(1)}
              aria-label="Next signature drop"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full text-zinc-500 transition hover:bg-pink-50 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 sm:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureShowcase;
