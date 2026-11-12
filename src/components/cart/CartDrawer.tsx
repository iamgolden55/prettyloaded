import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { CartItem, CharmOption } from '../../data/caseCustomizerData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountAmount = subtotal * promoDiscount;
  const freeShippingThreshold = 50;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'PRETTY15' || code === 'Y2KGLAM') {
      setPromoDiscount(0.15);
      setPromoMessage('✨ 15% VIP discount applied!');
    } else if (code === 'GLITTER20') {
      setPromoDiscount(0.20);
      setPromoMessage('💖 20% Glitter Bomb coupon applied!');
    } else {
      setPromoMessage('❌ Invalid promo code (Try "PRETTY15")');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-zinc-900 shadow-2xl flex flex-col border-l border-pink-200">
          
          {/* Header */}
          <div className="p-5 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50 via-white to-pink-50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-300 flex items-center justify-center text-pink-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-outfit text-lg font-bold tracking-tight text-zinc-900">Your Loaded Bag</h3>
                <p className="text-xs text-zinc-500 font-jakarta">
                  {items.length === 0 ? 'Empty bag' : `${items.reduce((acc, i) => acc + i.quantity, 0)} custom pieces`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-pink-100/60 px-5 py-2.5 border-b border-pink-200/60 text-xs font-jakarta">
            {subtotal >= freeShippingThreshold ? (
              <span className="text-pink-700 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
                Yay! You unlocked FREE Standard Shipping!
              </span>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-zinc-600">
                  <span>Add <strong className="text-pink-600 font-bold">${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more for FREE shipping</span>
                  <span className="font-semibold">{Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%</span>
                </div>
                <div className="h-1.5 w-full bg-pink-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart contents remain available until real payment processing is integrated. */}
          <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-zinc-400">
                    <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-pink-300">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="font-outfit font-semibold text-zinc-700">Your bag is empty</div>
                    <p className="text-xs text-zinc-500 max-w-xs">
                      Pick a phone model, blend your dream glitters, slap on some Y2K charms, and make it Pretty Loaded!
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-2 text-xs font-bold text-pink-600 hover:text-pink-700 underline"
                    >
                      Start Customizing Now →
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl border border-pink-100 bg-white shadow-xs hover:border-pink-300 transition-all flex gap-3.5"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-24 rounded-xl bg-gradient-to-b from-pink-50 to-pink-100/60 border border-pink-200/60 flex items-center justify-center overflow-hidden shrink-0">
                        {item.snapshotImage ? (
                          <img
                            src={item.snapshotImage}
                            alt={item.device.name}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <div className="text-center p-1">
                            <span className="text-xl">✨</span>
                            <div className="text-[9px] font-bold text-pink-600 truncate">{item.glitter.name}</div>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-outfit font-bold text-sm text-zinc-900 truncate">
                              {item.device.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-zinc-400 hover:text-rose-500 p-1 rounded-md transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                            Color: <span className="font-semibold text-zinc-700">{item.color.name}</span> • Glitter: <span className="font-semibold text-zinc-700">{item.glitter.name}</span>
                          </p>
                          
                          {item.monogramText && (
                            <p className="text-[10px] text-amber-600 font-semibold truncate mt-0.5">
                              Deboss: &quot;{item.monogramText}&quot; ({item.monogramFoil})
                            </p>
                          )}

                          {item.charms.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {item.charms.map((c: CharmOption) => (
                                <span
                                  key={c.id}
                                  className="text-[9px] px-1.5 py-0.5 rounded-md bg-pink-50 border border-pink-200 text-pink-600 font-semibold"
                                >
                                  +{c.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100">
                          <span className="font-outfit font-bold text-sm text-zinc-900">
                            ${(item.unitPrice * item.quantity).toFixed(2)}
                          </span>

                          <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="px-2 py-1 text-zinc-600 hover:bg-zinc-200 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-zinc-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="px-2 py-1 text-zinc-600 hover:bg-zinc-200 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Checkout Panel */}
              {items.length > 0 && (
                <div className="p-5 border-t border-pink-100 bg-pink-50/40 space-y-3.5">
                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (PRETTY15)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-pink-500 uppercase tracking-wider font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold font-outfit hover:bg-zinc-800 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {promoMessage && (
                    <div className="text-[11px] font-medium text-pink-700">{promoMessage}</div>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-zinc-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-pink-600 font-semibold">
                        <span>VIP Discount ({(promoDiscount * 100)}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-base font-outfit font-extrabold text-zinc-900 pt-2 border-t border-pink-200/70">
                      <span>Total Due</span>
                      <span className="text-pink-600">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout remains disabled until a real payment provider is connected. */}
                  <button
                    type="button"
                    disabled
                    aria-describedby="checkout-unavailable"
                    className="w-full py-3.5 rounded-xl bg-zinc-300 text-zinc-600 font-outfit font-bold text-sm tracking-wide cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Checkout coming soon
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p id="checkout-unavailable" className="text-[11px] text-zinc-500 text-center">
                    Your bag is a preview. No orders or payments can be placed yet.
                  </p>

                  {/* Trust badges */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-zinc-500 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      <Truck className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Fast Shipping</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Drop Tested</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
                      <span>30-Day Love It</span>
                    </div>
                  </div>
                </div>
              )}
          </>

        </div>
      </div>
    </div>
  );
};
