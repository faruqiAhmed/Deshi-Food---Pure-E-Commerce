import React from 'react';
import { Home, ShoppingBag, Zap, ShoppingCart, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setDashboardSubTab,
    cartCount, 
    cartSubtotal,
    setIsCartOpen,
    setIsCheckoutOpen,
    addToCart,
    isLoggedIn,
    setIsLoginModalOpen,
    setLoginPromptReason,
    products
  } = useStore();

  const handleHomeClick = () => {
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopClick = () => {
    if (activeTab === 'shop') {
      const el = document.getElementById('products-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setActiveTab('shop');
      setTimeout(() => {
        const el = document.getElementById('products-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      setLoginPromptReason('orders');
      setIsLoginModalOpen(true);
    } else {
      setActiveTab('dashboard');
      setDashboardSubTab('orders');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOrderNow = () => {
    if (!isLoggedIn) {
      setLoginPromptReason('checkout');
      setIsLoginModalOpen(true);
      return;
    }
    if (cartCount > 0) {
      // If user has items in cart, proceed straight to Checkout for lightning-fast order!
      setIsCheckoutOpen(true);
    } else {
      // If cart is empty, add the flagship Mustard Oil and open checkout directly
      const flagship = products.find(p => p.id === 'mustard-oil' || p.category === 'oil') || products[0];
      if (flagship) {
        addToCart(flagship, 1);
      }
      setIsCheckoutOpen(true);
    }
  };

  const isHomeActive = activeTab === 'shop';
  const isProfileActive = activeTab === 'dashboard';

  return (
    <nav 
      aria-label="মোবাইল নেভিগেশন"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] h-16 px-2 flex items-center justify-between"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* 1. হোম (Home) */}
      <button
        onClick={handleHomeClick}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
          isHomeActive ? 'text-[#1C3B2B] font-bold' : 'text-stone-500 hover:text-[#1C3B2B]'
        }`}
        id="mobile-bottom-home-btn"
        title="হোম পেজ"
      >
        <Home className={`w-5 h-5 mb-0.5 ${isHomeActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] tracking-tight">হোম</span>
      </button>

      {/* 2. শপ (Shop / পণ্যসমূহ) */}
      <button
        onClick={handleShopClick}
        className="flex-1 flex flex-col items-center justify-center py-1 transition-colors text-stone-500 hover:text-[#1C3B2B]"
        id="mobile-bottom-shop-btn"
        title="সকল পণ্য দেখুন"
      >
        <ShoppingBag className="w-5 h-5 mb-0.5 stroke-2" />
        <span className="text-[10px] tracking-tight">শপ</span>
      </button>

      {/* 3. CENTER HIGHLIGHTED: "অর্ডার" (Order Now) Action Button */}
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
        title="শপিং কার্ট"
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

      {/* 5. Profile / Account (প্রোফাইল) */}
      <button
        onClick={handleProfileClick}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
          isProfileActive ? 'text-[#1C3B2B] font-bold' : 'text-stone-500 hover:text-[#1C3B2B]'
        }`}
        id="mobile-bottom-profile-btn"
        title="গ্রাহক প্রোফাইল ও অর্ডার হিস্টোরি"
      >
        <User className={`w-5 h-5 mb-0.5 ${isProfileActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] tracking-tight">{isLoggedIn ? 'প্রোফাইল' : 'লগইন'}</span>
      </button>
    </nav>
  );
};
