import React from 'react';
import { Phone, Mail, MapPin, Heart, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useStore();

  const handleNav = (tab: 'shop' | 'tracking' | 'dashboard' | 'shipping_hub' | 'story') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact-section" className="bg-[#1C3B2B] text-white pt-14 pb-8 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Grid matching video 00:22 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Brand & Slogan (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-900 border border-[#EAB308] text-[#EAB308] font-bold text-lg flex items-center justify-center">
                DF
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-white">Deshi Food</h3>
                <p className="text-xs text-stone-300">খাঁটি পণ্য, সুস্থ জীবনের কথা</p>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              ঘরোয়া পদ্ধতিতে তৈরি ১০০% খাঁটি পণ্য যা স্বাস্থ্যসম্মত ও বিশুদ্ধ। খাঁটি সরিষার তেল, হলুদ গুঁড়া, মরিচ গুঁড়া ও ছাতু — হাজারো পরিবারের আস্থার নাম।
            </p>

            <div className="flex items-center gap-3 text-xs text-amber-300 pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>ল্যাব সার্টিফাইড ১০০% কেমিক্যালমুক্ত খাদ্য</span>
            </div>
          </div>

          {/* Column 2: ক্যাটালগ (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-serif border-b border-emerald-800/80 pb-2">
              পণ্য ক্যাটালগ
            </h4>
            <ul className="text-xs space-y-2 text-stone-300">
              <li>
                <button 
                  onClick={() => handleNav('shop')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  খাঁটি সরিষার তেল (২ লিটার ও ৫ লিটার)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('shop')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  দেশি হলুদ গুঁড়া (৫০০ গ্রাম)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('shop')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  দেশি মরিচ গুঁড়া (৫০০ গ্রাম)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('shop')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  খাঁটি ছাতু গুঁড়া (৫০০ গ্রাম)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('shop')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  সুন্দরবনের প্রাকৃতিক মধু ও গাওয়া ঘি
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: প্রতিষ্ঠান ও সেবাসমূহ (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-serif border-b border-emerald-800/80 pb-2">
              প্রতিষ্ঠান
            </h4>
            <ul className="text-xs space-y-2 text-stone-300">
              <li>
                <button 
                  onClick={() => handleNav('story')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  আমাদের গল্প
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleNav('shop');
                    setTimeout(() => {
                      const el = document.getElementById('customer-reviews-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }} 
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  গ্রাহকদের রিভিউ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('tracking')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  অর্ডার ট্র্যাকিং
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('dashboard')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  লয়ালটি রিওয়ার্ডস
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('shipping_hub')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-emerald-300 font-semibold"
                >
                  শিপিং ডিসপ্যাচ হাব
                </button>
              </li>
              <li>
                <span className="text-stone-400">রিটার্ন ও রিফান্ড পলিসি</span>
              </li>
            </ul>
          </div>

          {/* Column 4: যোগাযোগ (Col 3 matching video 00:22) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-serif border-b border-emerald-800/80 pb-2">
              যোগাযোগ
            </h4>
            <div className="text-xs space-y-2.5 text-stone-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>হটলাইন/হোয়াটসঅ্যাপ: <strong className="font-mono text-white text-sm">01842-078717</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>সারাদেশে ক্যাশ অন ডেলিভারি</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>উত্তরা, ঢাকা - ১২৩০, বাংলাদেশ</span>
              </p>
              <p className="text-stone-400 text-[11px] pt-1">
                গ্রাহক সেবা: প্রতিদিন সকাল ৯:০০ - রাত ১০:০০
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar matching video 00:23 */}
        <div className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© Deshi Food. সর্বস্বত্ব সংরক্ষিত  খাঁটি পণ্য, সুস্থ জীবনের কথা ।</p>
          <p className="text-amber-300 font-medium font-serif">
            Development  By Nexcent Tech 
          </p>
        </div>

      </div>
    </footer>
  );
};
