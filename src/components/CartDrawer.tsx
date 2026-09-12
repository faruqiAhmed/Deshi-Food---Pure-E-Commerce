import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartCount,
    setIsCheckoutOpen,
    deliveryCharge
  } = useStore();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeDeliveryThreshold = 2500;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slideLeft"
          id="cart-drawer-panel"
        >
          {/* Header matching video 00:08 */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1C3B2B]" />
              <h2 className="text-lg font-extrabold text-[#1C3B2B]">আপনার কার্ট</h2>
              <span className="bg-[#1C3B2B] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
              aria-label="কার্ট বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-5 py-3 bg-amber-50/70 border-b border-amber-100 text-xs">
            {remainingForFreeDelivery > 0 ? (
              <p className="text-amber-900 font-medium flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>আর <strong>৳{remainingForFreeDelivery}</strong> টাকার পণ্য কিনলেই ফ্রি ডেলিভারি!</span>
              </p>
            ) : (
              <p className="text-emerald-800 font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>অভিনন্দন! আপনি পাচ্ছেন ফ্রি ডেলিভারি সুবিধা।</span>
              </p>
            )}
            <div className="w-full bg-stone-200 rounded-full h-1.5 mt-2 overflow-hidden">
              <div 
                className="bg-[#D97706] h-full rounded-full transition-all duration-300"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-stone-700">কার্ট খালি রয়েছে</h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  আপনার পছন্দের সরিষার তেল ও খাঁটি মসলা নির্বাচন করে কার্টে যোগ করুন।
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 text-xs font-bold text-[#1C3B2B] bg-[#F8F5EE] px-4 py-2 rounded-lg hover:bg-stone-200 transition-colors"
                >
                  পণ্য ক্যাটালগে ফিরুন
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id} 
                  className="pt-4 first:pt-0 flex items-center gap-3.5"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#1C3B2B] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-stone-500">
                      {item.product.packageSize}
                    </p>
                    <p className="text-xs font-semibold text-stone-700 mt-0.5">
                      ৳ {item.product.price} × {item.quantity}
                    </p>

                    {/* Quantity Stepper (As seen in video 00:26-00:32) */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200 rounded-l"
                          aria-label="কমান"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-stone-800 min-w-[1.75rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200 rounded-r"
                          aria-label="বাড়ান"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Total for this item */}
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#1C3B2B]">
                      ৳ {item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal and Checkout Button (Matching video 00:33) */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF8F5] space-y-3">
              <div className="flex items-center justify-between text-stone-700">
                <span className="text-sm font-semibold">সাবটোটাল</span>
                <span className="text-lg font-extrabold text-[#1C3B2B]">
                  ৳ {cartSubtotal}
                </span>
              </div>

              <p className="text-[11px] text-stone-500">
                * ডেলিভারি চার্জ চেকআউটের সময় শহর অনুযায়ী নির্ধারিত হবে।
              </p>

              {/* "চেকআউট করুন" Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-[#1C3B2B] hover:bg-[#152D21] text-white font-bold text-base py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                id="cart-proceed-checkout-btn"
              >
                <span>চেকআউট করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
