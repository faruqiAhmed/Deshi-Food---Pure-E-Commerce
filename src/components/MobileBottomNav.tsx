import React from 'react';
import { ShoppingBag, Home, MapPin, Award, Zap, ArrowRight, ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const MobileBottomNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    cartCount, 
    cartSubtotal,
    setIsCartOpen,
    setIsCheckoutOpen,
    addToCart
  } = useStore();

  const handleNav = (tab: 'shop' | 'tracking' | 'dashboard' | 'shipping_hub' | 'story') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderNow = () => {
    if (cartCount > 0) {
      // If user has items in cart, proceed straight to Checkout for lightning-fast order!
      setIsCheckoutOpen(true);
    } else {
      // If cart is empty, add the flagship Mustard Oil and open checkout directly
      const flagship = PRODUCTS.find(p => p.id === 'mustard-oil') || PRODUCTS[0];
      if (flagship) {
        addToCart(flagship, 1);
      }
      setIsCheckoutOpen(true);
    }
  };

  return (
    <nav 
      aria-label="মোবাইল নেভিগেশন"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] h-16 px-2 flex items-center justify-between"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* 1. Home / Shop */}
      <button
        onClick={() => handleNav('shop')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
          activeTab === 'shop' ? 'text-[#1C3B2B] font-bold' : 'text-stone-500 hover:text-[#1C3B2B]'
        }`}
      >
        <Home className={`w-5 h-5 mb-0.5 ${activeTab === 'shop' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] tracking-tight">শপ</span>
      </button>

      {/* 2. Real-time Tracking */}
      <button
        onClick={() => handleNav('tracking')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors relative ${
          activeTab === 'tracking' ? 'text-[#1C3B2B] font-bold' : 'text-stone-500 hover:text-[#1C3B2B]'
        }`}
      >
        <div className="relative">
          <MapPin className={`w-5 h-5 mb-0.5 ${activeTab === 'tracking' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
        </div>
        <span className="text-[10px] tracking-tight">ট্র্যাকিং</span>
      </button>

      {/* 3. CENTER HIGHLIGHTED: "এখনই অর্ডার" (Order Now) Action Button */}
      <div className="flex-1 flex justify-center -mt-4">
        <button
          onClick={handleOrderNow}
          className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#991B1B] via-[#B91C1C] to-[#DC2626] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all ring-4 ring-white cursor-pointer relative"
          id="mobile-order-now-cta"
          title="এখনই অর্ডার সম্পন্ন করুন"
        >
          <Zap className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-tighter mt-0.5">অর্ডার</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-900 text-[10px] font-extrabold rounded-full h-4 min-w-4 px-1 flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* 4. Cart Action */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex-1 flex flex-col items-center justify-center py-1 transition-colors relative text-stone-500 hover:text-[#1C3B2B]"
        id="mobile-cart-bottom-btn"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5 mb-0.5 text-stone-600" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#B91C1C] text-white text-[9px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight">
          {cartCount > 0 ? `৳${cartSubtotal}` : 'কার্ট'}
        </span>
      </button>

      {/* 5. Loyalty / Account */}
      <button
        onClick={() => handleNav('dashboard')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
          activeTab === 'dashboard' ? 'text-[#1C3B2B] font-bold' : 'text-stone-500 hover:text-[#1C3B2B]'
        }`}
      >
        <Award className={`w-5 h-5 mb-0.5 ${activeTab === 'dashboard' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] tracking-tight">লয়ালটি</span>
      </button>
    </nav>
  );
};
