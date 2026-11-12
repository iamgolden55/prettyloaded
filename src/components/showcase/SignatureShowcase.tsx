import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DishOrbitCarousel, Dish } from '../../../components/ui/dish-orbit-carousel';
import { PRESET_COLLECTIONS, PresetEdition, CustomCaseConfig } from '../../data/caseCustomizerData';

interface SignatureShowcaseProps {
  onSelectPreset: (presetConfig: CustomCaseConfig) => void;
  onScrollToStudio: () => void;
}

export const SignatureShowcase: React.FC<SignatureShowcaseProps> = ({
  onSelectPreset,
  onScrollToStudio,
}) => {
  // Map our preset collections into the format expected by DishOrbitCarousel
  const carouselDishes: Dish[] = PRESET_COLLECTIONS.map((preset: PresetEdition, idx: number) => ({
    title: preset.title,
    subtitle: preset.subtitle,
    image: preset.image,
    alt: `${preset.title} ${preset.subtitle} Phone Case`,
    eyebrow: preset.label || `#${idx + 1} Signature Drop`,
    label: preset.subtitle,
    rating: preset.rating,
    chef: preset.chef,
    kitchen: preset.kitchen,
    description: preset.description,
    likes: preset.likes,
    ingredients: preset.ingredients,
    accent: preset.accent,
  }));

  const handlePreviewOrCustomize = (index: number) => {
    const selected = PRESET_COLLECTIONS[index];
    if (selected) {
      onSelectPreset(selected.config);
      onScrollToStudio();
    }
  };

  return (
    <section
      id="signature-showcase"
      className="relative py-16 bg-white overflow-hidden border-t border-zinc-200/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-zinc-100">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-pink-600 font-bold block mb-1">
              Vault Collection • Drop 01
            </span>
            <h2 className="font-outfit font-black text-2xl sm:text-4xl text-zinc-900 tracking-tight">
              Curated Signature Drops
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-jakarta max-w-xl mt-1.5 leading-relaxed">
              Four iconic ready-to-order builds engineered with high-voltage glitter suspensions, liquid chrome hardware, and shock-absorbing bumpers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onScrollToStudio}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:text-pink-600 hover:bg-pink-50/60 border border-zinc-200 transition-all flex items-center gap-1.5"
            >
              <span>Build in 3D Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-pink-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Orbit Carousel Container: Smooth, self-contained, no scroll-hijacking */}
      <div className="w-full">
        <DishOrbitCarousel
          dishes={carouselDishes}
          height="560px"
          loop={true}
          scrollPin={false}
          onPlay={(_dish, index) => handlePreviewOrCustomize(index)}
          onOrder={(_dish, index) => handlePreviewOrCustomize(index)}
        />
      </div>
    </section>
  );
};

export default SignatureShowcase;
