import React, { useState } from 'react';
import { X, Check, ShoppingBag, Star, ShieldCheck, Heart, Share2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-scaleUp max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
        id="product-quick-view-modal"
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-stone-100 text-stone-700 transition-colors shadow-xs"
          aria-label="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Image (Replicated from video) */}
        <div className="md:w-1/2 bg-stone-50 p-6 flex items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-stone-100">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-inner">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {quickViewProduct.popular && (
              <span className="absolute top-3 left-3 bg-[#D97706] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                জনপ্রিয় পছন্দ
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Details matching video 00:05-00:07 */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            <span className="text-xs text-[#B45309] font-bold tracking-wider uppercase">
              {quickViewProduct.englishName}
            </span>
            <h2 className="text-2xl font-extrabold text-[#1C3B2B] mt-0.5">
              {quickViewProduct.name}
            </h2>

            {/* Package Size badge */}
            <div className="flex items-center gap-2 mt-1 mb-3">
              <span className="bg-stone-100 text-stone-700 text-xs font-medium px-2 py-0.5 rounded">
                {quickViewProduct.packageSize}
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> স্টকে রয়েছে
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-extrabold text-[#1C3B2B]">
                ৳ {quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  ৳ {quickViewProduct.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
              {quickViewProduct.shortDescription}
            </p>

            {/* Feature Checklist (Exact bullet layout seen in video) */}
            <div className="space-y-2 mb-6 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EFEAE1]">
              {quickViewProduct.features.map((feat, index) => (
                <div key={index} className="flex items-start gap-2 text-xs text-stone-700 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-200 font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-2 text-sm font-bold text-stone-800 min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-200 font-bold transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#1C3B2B] hover:bg-[#152D21] text-white active:scale-98'
                }`}
                id="modal-add-to-cart-btn"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>কার্টে যোগ হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#EAB308]" />
                    <span>কার্টে যোগ করুন (৳{quickViewProduct.price * quantity})</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
