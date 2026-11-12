import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CustomCaseConfig,
  PHONE_MODELS,
  CASE_COLORS,
  GLITTER_MIXES,
  Y2K_CHARMS,
  LIGHTING_PRESETS,
  PhoneModel,
  CaseColor,
  GlitterMix,
} from '../../data/caseCustomizerData.ts';
import {
  Sparkles,
  Smartphone,
  Palette,
  Camera,
  ShoppingBag,
  Sliders,
  Type,
  Sun,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  Download,
  Share2,
} from 'lucide-react';

interface CustomizerControlsProps {
  config: CustomCaseConfig;
  onChange: (updated: Partial<CustomCaseConfig>) => void;
  onAddToCart: (customizedCase: { config: CustomCaseConfig; price: number; name: string }) => void;
  onCaptureSnapshot: () => void;
  onReset: () => void;
}

export function CustomizerControls({
  config,
  onChange,
  onAddToCart,
  onCaptureSnapshot,
  onReset,
}: CustomizerControlsProps) {
  const [activeTab, setActiveTab] = useState<'device' | 'color' | 'glitter' | 'charms' | 'monogram' | 'lighting'>('device');
  const [selectedBrand, setSelectedBrand] = useState<'Apple' | 'Samsung' | 'Google'>('Apple');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedModel = PHONE_MODELS.find((m) => m.id === config.phoneModelId) || PHONE_MODELS[0];
  const selectedColor = CASE_COLORS.find((c) => c.id === config.colorId) || CASE_COLORS[0];
  const selectedGlitter = GLITTER_MIXES.find((g) => g.id === config.glitterMixId) || GLITTER_MIXES[0];

  // Calculate live price
  const calculateTotalPrice = (): number => {
    let total = selectedModel.basePrice;
    total += selectedColor.price;
    total += selectedGlitter.price;

    config.activeCharms.forEach((charmId) => {
      const charm = Y2K_CHARMS.find((c) => c.id === charmId);
      if (charm) total += charm.price;
    });

    if (config.monogramText.trim().length > 0) {
      total += 5; // Custom debossing fee
    }

    return total;
  };

  const totalPrice = calculateTotalPrice();

  const handleCharmToggle = (charmId: string) => {
    const exists = config.activeCharms.includes(charmId);
    let updatedCharms: string[];
    if (exists) {
      updatedCharms = config.activeCharms.filter((id) => id !== charmId);
    } else {
      updatedCharms = [...config.activeCharms, charmId];
    }
    onChange({ activeCharms: updatedCharms });
  };

  const triggerAddWithCelebration = () => {
    // Fireworks confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#FF4DB8', '#FFCFE6', '#C0C0C0', '#FFFFFF', '#FF1493'],
    });

    onAddToCart({
      config,
      price: totalPrice,
      name: `${selectedModel.name} - ${selectedColor.name} (${selectedGlitter.name})`,
    });

    setToastMessage('Added to your Pretty Loaded Bag!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredModels = PHONE_MODELS.filter((m) => m.brand === selectedBrand);

  return (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-xl border border-pink-200/60 rounded-3xl shadow-xl overflow-hidden">
      {/* Top Header / Price Bar */}
      <div className="p-4 sm:p-5 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50/80 via-white to-pink-50/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 bg-pink-100/70 px-2.5 py-0.5 rounded-full">
              Custom Studio
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {selectedModel.name}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 mt-0.5">
            ${totalPrice.toFixed(2)}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCaptureSnapshot}
            title="Download 3D Snapshot"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold border border-pink-200 transition-all shadow-sm"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Photo</span>
          </button>

          <button
            onClick={onReset}
            title="Reset Customization"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 p-2 bg-pink-50/50 border-b border-pink-100 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('device')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'device'
              ? 'bg-pink-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Device</span>
        </button>

        <button
          onClick={() => setActiveTab('color')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'color'
              ? 'bg-pink-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Case Base</span>
        </button>

        <button
          onClick={() => setActiveTab('glitter')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'glitter'
              ? 'bg-pink-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Glitter Mix</span>
        </button>

        <button
          onClick={() => setActiveTab('charms')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'charms'
              ? 'bg-pink-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <span>🎀 Charms ({config.activeCharms.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('monogram')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'monogram'
              ? 'bg-pink-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Name Deboss</span>
        </button>

        <button
          onClick={() => setActiveTab('lighting')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'lighting'
              ? 'bg-pink-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Lighting</span>
        </button>
      </div>

      {/* Main Tab Content Panel */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
        {/* TAB 1: DEVICE & MODEL */}
        {activeTab === 'device' && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                1. Select Phone Brand
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(['Apple', 'Samsung', 'Google'] as const).map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSelectedBrand(brand);
                      const firstOfBrand = PHONE_MODELS.find((m) => m.brand === brand);
                      if (firstOfBrand) onChange({ phoneModelId: firstOfBrand.id });
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      selectedBrand === brand
                        ? 'bg-pink-50 border-pink-500 text-pink-600 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                2. Select Model & Dimensions
              </p>
              <div className="space-y-2">
                {filteredModels.map((model) => {
                  const isSelected = config.phoneModelId === model.id;
                  return (
                    <div
                      key={model.id}
                      onClick={() => onChange({ phoneModelId: model.id })}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50/70 shadow-sm ring-1 ring-pink-400'
                          : 'border-slate-200 bg-white hover:border-pink-200 hover:bg-pink-50/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{model.name}</span>
                          <span className="text-[10px] font-semibold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                            {model.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Precision fit: {model.dimensions.width * 25}mm × {model.dimensions.height * 25}mm
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700">${model.basePrice}</span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                            isSelected ? 'bg-pink-500 border-pink-500 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CASE BASE COLOR & FINISH */}
        {activeTab === 'color' && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Case Base Color & Metalness
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {CASE_COLORS.map((color) => {
                  const isSelected = config.colorId === color.id;
                  return (
                    <div
                      key={color.id}
                      onClick={() => onChange({ colorId: color.id })}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50/70 shadow-sm ring-1 ring-pink-400'
                          : 'border-slate-200 bg-white hover:border-pink-200 hover:bg-pink-50/30'
                      }`}
                    >
                      <div
                        className="w-9 h-9 rounded-xl border border-black/10 shadow-inner flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-4 h-4 stroke-[3] ${
                              color.id === 'noir-black' ? 'text-white' : 'text-slate-900'
                            }`}
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{color.name}</div>
                        <div className="text-[10px] text-slate-500">
                          {color.price > 0 ? `+$${color.price}` : 'Free'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Top Coat Finish
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'glossy', name: 'Ultra High Gloss', desc: 'Glassy mirror shine' },
                  { id: 'frosted', name: 'Satin Frosted', desc: 'Soft-touch velvet' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onChange({ finishType: f.id as 'glossy' | 'frosted' })}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      config.finishType === f.id
                        ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{f.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GLITTER MIX */}
        {activeTab === 'glitter' && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Glitter Density Slider
                </p>
                <span className="text-xs font-extrabold text-pink-600">
                  {Math.round(config.glitterDensity * 100)}% Loaded
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={config.glitterDensity}
                onChange={(e) => onChange({ glitterDensity: parseFloat(e.target.value) })}
                className="w-full accent-pink-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Subtle Shimmer</span>
                <span>Balanced</span>
                <span>Fully Loaded</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Glitter Blend Recipes
              </p>
              <div className="space-y-2.5">
                {GLITTER_MIXES.map((glitter) => {
                  const isSelected = config.glitterMixId === glitter.id;
                  return (
                    <div
                      key={glitter.id}
                      onClick={() => onChange({ glitterMixId: glitter.id })}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50/70 shadow-sm ring-1 ring-pink-400'
                          : 'border-slate-200 bg-white hover:border-pink-200 hover:bg-pink-50/30'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{glitter.name}</span>
                          <span className="text-[10px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                            +${glitter.price}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{glitter.tagline}</p>
                        {/* Color Dots */}
                        <div className="flex items-center gap-1.5 pt-1">
                          {glitter.colors.map((c, i) => (
                            <span
                              key={i}
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border flex-shrink-0 ${
                          isSelected ? 'bg-pink-500 border-pink-500 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Y2K CHARMS & ATTACHMENTS */}
        {activeTab === 'charms' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select 3D Charms To Attach
              </p>
              <span className="text-xs font-medium text-pink-600">
                {config.activeCharms.length} of {Y2K_CHARMS.length} Attached
              </span>
            </div>

            <div className="space-y-2.5">
              {Y2K_CHARMS.map((charm) => {
                const isActive = config.activeCharms.includes(charm.id);
                return (
                  <div
                    key={charm.id}
                    onClick={() => handleCharmToggle(charm.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'border-pink-500 bg-pink-50/80 shadow-sm ring-1 ring-pink-400'
                        : 'border-slate-200 bg-white hover:border-pink-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-pink-100/60 border border-pink-200/50 flex-shrink-0">
                        {charm.previewIcon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{charm.name}</span>
                          <span className="text-[10px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                            +${charm.price}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{charm.description}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-pink-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-pink-100 hover:text-pink-600'
                      }`}
                    >
                      {isActive ? 'Attached' : 'Add'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: NAME / MONOGRAM DEBOSS */}
        {activeTab === 'monogram' && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Personalized Case Text (Foil Debossed)
              </p>
              <div className="relative">
                <input
                  type="text"
                  maxLength={10}
                  value={config.monogramText}
                  onChange={(e) => onChange({ monogramText: e.target.value.toUpperCase() })}
                  placeholder="e.g. BABY, QUEEN, EMMA"
                  className="w-full px-4 py-3 rounded-2xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-base font-extrabold uppercase tracking-widest text-slate-900 bg-white shadow-inner"
                />
                <span className="absolute right-3 top-3.5 text-xs text-slate-400 font-semibold">
                  {config.monogramText.length}/10
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Debossed with 3D metallic foil highlights on the lower case.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Foil Color Choice
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { color: '#FFFFFF', label: 'Silver Chrome Foil' },
                  { color: '#FF4DB8', label: 'Hot Pink Chrome Foil' },
                ].map((item) => (
                  <button
                    key={item.color}
                    onClick={() => onChange({ monogramColor: item.color })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                      config.monogramColor === item.color
                        ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Font Style
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onChange({ monogramFont: 'chrome' })}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    config.monogramFont === 'chrome'
                      ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <div className="text-sm font-extrabold font-display tracking-widest">BOLD CHROME</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Y2K Streetwear Vibe</div>
                </button>

                <button
                  onClick={() => onChange({ monogramFont: 'cursive' })}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    config.monogramFont === 'cursive'
                      ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <div className="text-sm font-serif italic font-bold">Luxury Script</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Editorial Elegance</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: LIGHTING PRESET */}
        {activeTab === 'lighting' && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              3D Studio Lighting Environment
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {LIGHTING_PRESETS.map((preset) => {
                const isSelected = config.lightingPresetId === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => onChange({ lightingPresetId: preset.id })}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-pink-500 bg-pink-50/70 shadow-sm ring-1 ring-pink-400'
                        : 'border-slate-200 bg-white hover:border-pink-200 hover:bg-pink-50/30'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{preset.icon}</span>
                      <span className="text-xs font-bold text-slate-900">{preset.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-snug">{preset.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="mx-4 mb-2 p-2.5 rounded-xl bg-pink-600 text-white text-xs font-bold text-center shadow-lg animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Bottom Sticky Action Footer */}
      <div className="p-4 sm:p-5 border-t border-pink-100 bg-white flex items-center gap-3">
        <button
          onClick={triggerAddWithCelebration}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 hover:from-pink-600 hover:to-pink-600 text-white font-display font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-pink-500/25 transition-all transform active:scale-[0.98]"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Add to Bag • ${totalPrice.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}
