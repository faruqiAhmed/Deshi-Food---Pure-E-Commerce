import React, { useState } from 'react';
import { 
  Phone, 
  ShoppingBag, 
  Search, 
  User, 
  Menu, 
  X, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  PackageCheck, 
  Heart,
  ChevronRight,
  Film,
  LogIn
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    cartCount, 
    cartSubtotal, 
    setIsCartOpen, 
    setIsCheckoutOpen,
    currentUser,
    addToCart,
    isLoggedIn,
    setIsLoginModalOpen
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavClick = (tab: 'shop' | 'tracking' | 'dashboard' | 'shipping_hub' | 'story') => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-[#EFEAE1]">
      {/* Top Notification Bar */}
      <div className="bg-[#1C3B2B] text-white text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <a 
              href="tel:01842078717" 
              className="flex items-center gap-1.5 hover:text-[#EAB308] transition-colors font-medium shrink-0"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#EAB308]" />
              <span>কল করুন: <strong className="font-mono text-xs sm:text-sm tracking-wide">01842-078717</strong></span>
            </a>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-emerald-200">
              <Truck className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>সারাদেশে হোম ডেলিভারি ও রিয়েল-টাইম ট্র্যাকিং</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-1 text-amber-300 font-medium">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
              <span>১০০% খাঁটি পণ্য</span>
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <button
              onClick={() => handleNavClick('shipping_hub')}
              className="hidden sm:flex items-center gap-1 text-xs bg-emerald-800/80 hover:bg-emerald-700 px-2 py-0.5 rounded text-emerald-100 transition-colors"
            >
              <PackageCheck className="w-3 h-3 text-[#EAB308]" />
              <span>লজিস্টিক শিপিং হাব</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Slogan (Faithfully replicated from video) */}
          <div 
            onClick={() => handleNavClick('shop')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none shrink-0"
            id="brand-logo"
          >
            {/* DF Badge */}
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#1C3B2B] flex items-center justify-center text-[#EAB308] font-bold text-sm sm:text-xl border-2 border-[#EAB308] shadow-xs group-hover:scale-105 transition-transform shrink-0">
              DF
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-lg sm:text-2xl font-bold tracking-tight text-[#1C3B2B] group-hover:text-[#B45309] transition-colors font-serif">
                  Deshi Food
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest bg-amber-100 text-amber-800 px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded">
                  Organic
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#6B7280] font-medium tracking-normal hidden xs:block">
                খাঁটি পণ্য, সুস্থ জীবনের কথা
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links - হোম, শপ, সরিষার তেল, আমাদের গল্প, যোগাযোগ */}
          <nav className="hidden lg:flex items-center gap-2 text-sm font-semibold text-[#374151]">
            <button
              onClick={() => {
                setActiveTab('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'shop' 
                  ? 'text-[#1C3B2B] bg-emerald-50 font-bold border-b-2 border-[#1C3B2B]' 
                  : 'hover:text-[#1C3B2B] hover:bg-[#F8F5EE]'
              }`}
            >
              হোম
            </button>

            <button
              onClick={() => {
                setActiveTab('shop');
                setTimeout(() => {
                  const el = document.getElementById('products-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="px-3.5 py-2 rounded-lg hover:text-[#1C3B2B] hover:bg-[#F8F5EE] transition-colors cursor-pointer"
            >
              শপ
            </button>

            <button
              onClick={() => {
                setActiveTab('shop');
                setTimeout(() => {
                  const el = document.getElementById('mustard-oil-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3.5 py-2 rounded-lg hover:text-[#1C3B2B] hover:bg-[#F8F5EE] transition-colors cursor-pointer"
            >
              সরিষার তেল
            </button>

            <button
              onClick={() => {
                setActiveTab('shop');
                setTimeout(() => {
                  const el = document.getElementById('customer-reviews-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3.5 py-2 rounded-lg hover:text-[#1C3B2B] hover:bg-[#F8F5EE] transition-colors cursor-pointer"
            >
              গ্রাহক রিভিউ
            </button>

            <button
              onClick={() => handleNavClick('story')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'story' 
                  ? 'text-[#1C3B2B] bg-emerald-50 font-bold border-b-2 border-[#1C3B2B]' 
                  : 'hover:text-[#1C3B2B] hover:bg-[#F8F5EE]'
              }`}
            >
              আমাদের গল্প
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('contact-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = 'tel:01842078717';
                }
              }}
              className="px-3.5 py-2 rounded-lg hover:text-[#1C3B2B] hover:bg-[#F8F5EE] transition-colors cursor-pointer"
            >
              যোগাযোগ
            </button>
          </nav>

          {/* Right Action Icons & Checkout CTA */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Cart Button with Counter and Subtotal */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 sm:p-2 text-[#374151] hover:text-[#1C3B2B] hover:bg-[#F8F5EE] rounded-full transition-colors flex items-center shrink-0"
              aria-label="কার্ট দেখুন"
              id="cart-button"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#1C3B2B]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-[#B91C1C] text-white text-[10px] sm:text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Button / Login CTA (Desktop) */}
            {isLoggedIn ? (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="hidden sm:flex items-center gap-1.5 p-2 text-[#374151] hover:text-[#1C3B2B] hover:bg-[#F8F5EE] rounded-full transition-colors"
                title="আমার প্রোফাইল ও অর্ডার"
                id="desktop-profile-btn"
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-bold text-[#1C3B2B] hidden xl:inline">{currentUser.name}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#1C3B2B] border border-emerald-300 font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow-2xs"
                id="desktop-login-btn"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-700" />
                <span>লগইন / ওটিপি</span>
              </button>
            )}

            {/* "এখনই অর্ডার করুন" (Order Now) Primary Crimson Button matching video */}
            <button
              onClick={() => {
                if (cartCount === 0) {
                  const flagship = PRODUCTS.find(p => p.id === 'mustard-oil') || PRODUCTS[0];
                  if (flagship) {
                    addToCart(flagship, 1);
                  }
                }
                setIsCheckoutOpen(true);
              }}
              className="bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs sm:text-base font-bold px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-1 sm:gap-1.5 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              id="header-order-now-btn"
            >
              <span>এখনই অর্ডার</span>
              <span className="hidden xs:inline">করুন</span>
              {cartCount > 0 && (
                <span className="hidden sm:inline-block bg-white/20 text-xs px-1.5 py-0.5 rounded font-mono">
                  ৳{cartSubtotal}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-[#374151] hover:text-[#1C3B2B] hover:bg-stone-100 rounded-lg shrink-0"
              aria-label="মেনু খুলুন"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EFEAE1] px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          {/* User Status Card (Logged in vs Logged out) */}
          {isLoggedIn ? (
            <div className="space-y-2">
              <div 
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 cursor-pointer hover:bg-emerald-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1C3B2B] text-amber-400 font-bold flex items-center justify-center shrink-0">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1C3B2B]">{currentUser.name}</p>
                    <p className="text-xs text-stone-500 font-medium">
                      {currentUser.phone || 'আমার প্রোফাইল ও অর্ডার'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </div>
            </div>
          ) : (
            <div 
              onClick={() => {
                setIsLoginModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-300 cursor-pointer hover:bg-emerald-100 transition-colors shadow-2xs"
              id="mobile-login-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1C3B2B] text-amber-300 font-bold flex items-center justify-center">
                  <LogIn className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1C3B2B]">লগইন / সাইন-আপ</p>
                  <p className="text-xs text-emerald-800">
                    ফোন নম্বর ও ওটিপি (OTP) দিয়ে প্রবেশ করুন
                  </p>
                </div>
              </div>
              <span className="text-xs bg-[#1C3B2B] text-white px-3 py-1.5 rounded-lg font-bold">
                লগইন
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1 text-sm font-medium">
            <button
              onClick={() => {
                setActiveTab('shop');
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`p-3 rounded-lg text-left transition-colors font-medium flex items-center gap-2 ${
                activeTab === 'shop' ? 'bg-[#1C3B2B] text-white font-bold' : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <span>🏠</span>
              <span>হোম</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('shop');
                setIsMobileMenuOpen(false);
                setTimeout(() => {
                  const el = document.getElementById('products-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="p-3 rounded-lg text-left transition-colors bg-stone-100 text-stone-800 hover:bg-stone-200 flex items-center gap-2"
            >
              <span>🛍️</span>
              <span>শপ</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('shop');
                setIsMobileMenuOpen(false);
                setTimeout(() => {
                  const el = document.getElementById('mustard-oil-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="p-3 rounded-lg text-left transition-colors bg-stone-100 text-stone-800 hover:bg-stone-200 flex items-center gap-2"
            >
              <span>🌿</span>
              <span>সরিষার তেল</span>
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className={`p-3 rounded-lg text-left transition-colors font-medium flex items-center gap-2 ${
                activeTab === 'story' ? 'bg-[#1C3B2B] text-white font-bold' : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <span>📖</span>
              <span>আমাদের গল্প</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                const el = document.getElementById('contact-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = 'tel:01842078717';
                }
              }}
              className="col-span-2 p-3 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center gap-2 font-bold hover:bg-emerald-100 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>যোগাযোগ ও সহায়তা</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
