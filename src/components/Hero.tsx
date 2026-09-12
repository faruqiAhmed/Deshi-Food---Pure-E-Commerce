import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Play, Award, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setActiveTab } = useStore();

  const scrollToProducts = () => {
    setActiveTab('shop');
    const el = document.getElementById('products-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#183626] via-[#1C3B2B] to-[#142A1E] text-white py-12 md:py-20">
      {/* Decorative background glow & subtle patterns */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#EAB308_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Authentic Heading and Copy from Video */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Organic Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>১০০% প্রাকৃতিক ও ঐতিহ্যবাহী ঘানি ভাঙা</span>
            </div>

            {/* Headline directly from user's demo video */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-serif text-white">
              প্রতিটি রান্নায় দেশি স্বাদের ছোঁয়া,{' '}
              <span className="text-[#FBBF24] block sm:inline">প্রতিটি পরিবারের জন্য</span>
            </h1>

            {/* Subheading from user's demo video */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              ঘরোয়া পদ্ধতিতে তৈরি ১০০% খাঁটি পণ্য যা স্বাস্থ্যসম্মত ও বিশুদ্ধ। ঐতিহ্যবাহী ঘানি ভাঙা খাঁটি সরিষার তেল ও বাছাইকৃত দেশি মসলা।
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={scrollToProducts}
                className="bg-[#D97706] hover:bg-[#B45309] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-base active:scale-98 cursor-pointer"
                id="hero-see-products-btn"
              >
                <span>পণ্য দেখুন</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="https://www.facebook.com/profile.php?id=61590887032577"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-xl border border-white/20 backdrop-blur-xs transition-all text-base"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>রেসিপি ও ভিডিও দেখুন</span>
              </a>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-4 border-t border-white/15 grid grid-cols-3 gap-2 sm:gap-4 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start gap-2">
                <div className="p-1 rounded bg-amber-500/20 text-amber-300 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">কোল্ড প্রেস</h4>
                  <p className="text-[11px] text-stone-400">পুষ্টিগুণ অক্ষুণ্ণ</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="p-1 rounded bg-amber-500/20 text-amber-300 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">রাসায়নিকমুক্ত</h4>
                  <p className="text-[11px] text-stone-400">কোনো ভেজাল নেই</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="p-1 rounded bg-amber-500/20 text-amber-300 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">ক্যাশ অন ডেলিভারি</h4>
                  <p className="text-[11px] text-stone-400">দেখে মূল্য পরিশোধ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Showcase Hero from Video */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/15 bg-gradient-to-b from-stone-900/60 to-black/80 p-2">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="/images/hero_banner.jpg"
                  alt="Deshi Food খাঁটি সরিষার তেল ও মসলা"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                      বেস্টসেলার পণ্য
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      খাঁটি সরিষার তেল (২ লিটার)
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-[#FBBF24]">৳ ৬২০</span>
                  </div>
                </div>
              </div>

              {/* Floating Quality Seal */}
              <div className="absolute -top-3 -left-3 bg-[#D97706] text-white p-3 rounded-full shadow-lg border-2 border-white flex flex-col items-center justify-center text-center w-16 h-16 transform -rotate-12">
                <Award className="w-5 h-5 text-amber-200" />
                <span className="text-[9px] font-bold leading-tight mt-0.5">১০০% খাঁটি</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
