import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Phone, 
  MessageCircle, 
  Zap, 
  ShieldCheck, 
  Flame, 
  Heart,
  Droplet,
  Maximize2,
  X,
  Film
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

const FALLBACK_OIL_PRODUCT: Product = {
  id: 'df-oil-2l',
  name: 'ঘানি ভাঙা সরিষার তেল',
  englishName: 'Cold Pressed Mustard Oil',
  category: 'oil',
  price: 940,
  packageSize: '২ লিটার',
  weightInKg: 2,
  image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600',
  rating: 4.9,
  reviewsCount: 142,
  inStock: true,
  shortDescription: '১০০% খাঁটি দেশি সরিষার তেল',
  fullDescription: 'প্রাচীন কাঠের ঘানিতে ধীরগতিতে ভাঙা খাঁটি সরিষার তেল।',
  features: ['১০০% কোল্ড প্রেস ঘানি ভাঙা', 'প্রাকৃতিক ঝাঁঝ ও গন্ধ', 'কোনো রাসায়নিক উপাদান নেই']
};

export const FeaturedMustardOil: React.FC = () => {
  const { products, addToCart, setIsCheckoutOpen, isLoggedIn, setIsLoginModalOpen, setLoginPromptReason } = useStore();
  const [added, setAdded] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  // Available mustard oil sizes from live catalog
  const oilProducts: Product[] = products.filter(p => p.category === 'oil');
  const displayProducts: Product[] = oilProducts.length > 0 ? oilProducts : products;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const activeProduct: Product = 
    (selectedProduct && displayProducts.some(p => p.id === selectedProduct.id)
      ? displayProducts.find(p => p.id === selectedProduct.id)!
      : (displayProducts.find(p => p.id === 'df-oil-2l') || displayProducts[0])) || FALLBACK_OIL_PRODUCT;

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(activeProduct, quantity);
    if (isLoggedIn) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  const handleInstantBuy = () => {
    if (!isLoggedIn) {
      addToCart(activeProduct, quantity);
      setLoginPromptReason('checkout');
      setIsLoginModalOpen(true);
      return;
    }
    addToCart(activeProduct, quantity);
    setIsCheckoutOpen(true);
  };

  const totalAmount = activeProduct.price * quantity;

  return (
    <section 
      id="mustard-oil-section" 
      className="py-16 lg:py-24 bg-gradient-to-b from-[#112419] via-[#162e21] to-[#0d1a12] text-white relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Top Header Badge & Tagline Matching Poster */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-amber-500/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-inner mb-4">
            <Droplet className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>ঠান্ডা পদ্ধতিতে নিষ্কাশিত খাঁটি সরিষার তেল</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 tracking-tight leading-tight">
            খাঁটি সরিষার তেল
          </h2>

          <p className="mt-3 text-base sm:text-lg text-amber-100/90 font-medium font-serif italic">
            “খাঁটি স্বাদে প্রতিটি রান্না, সুস্থতায় প্রতিটি পরিবার।”
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 text-xs font-semibold text-amber-300/80">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-amber-400" /> ১০০% প্রাকৃতিক ঘানি ভাঙা</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-amber-400" /> তীব্র ঝাঁঝ ও স্বাদ</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-amber-400" /> স্বাস্থ্যকর জীবনধারা</span>
          </div>
        </div>

        {/* Main Grid: Poster Showcase & Order Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Official Poster Visual with Zoom option */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative max-w-md w-full group">
              {/* Glowing Aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/40 via-yellow-500/30 to-emerald-500/40 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative bg-[#183525] rounded-3xl border-2 border-amber-400/40 shadow-2xl overflow-hidden p-3 sm:p-4 text-center">
                
                {/* Poster Artwork Container */}
                <div 
                  className="relative aspect-[3/4.5] sm:aspect-[3/4.2] rounded-2xl overflow-hidden cursor-pointer shadow-inner bg-black"
                  onClick={() => setIsPosterModalOpen(true)}
                  title="ক্লিক করে পুরো পোস্টার বড় করে দেখুন"
                >
                  <img
                    src="/images/mustard_oil_poster.jpg"
                    alt="Deshi Food খাঁটি সরিষার তেল পোস্টার"
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 px-3 py-1 rounded-full text-xs font-bold">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>অরিজিনাল কোল্ড প্রেস</span>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPosterModalOpen(true);
                    }}
                    className="absolute top-3 right-3 bg-black/60 backdrop-blur-md hover:bg-amber-500 text-white p-2 rounded-full border border-white/20 transition-colors shadow-lg cursor-pointer"
                    title="বড় করে দেখুন"
                    aria-label="বড় করে দেখুন"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Bottom Text Inside Poster Container */}
                  <div className="absolute bottom-4 inset-x-4 text-left pointer-events-none">
                    <p className="text-amber-400 font-serif text-lg font-bold">
                      Deshi Food
                    </p>
                    <p className="text-xs text-stone-200 line-clamp-1">
                      ঐতিহ্যবাহী কাঠের ঘানিতে ভাঙা খাঁটি সরিষার তেল
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-amber-200">
                      <span>WhatsApp / কল: 01642031736</span>
                    </div>
                  </div>
                </div>

                {/* Sub banner footer */}
                <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-300 px-2">
                  <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    খাঁটি পণ্য, সুস্থ দেহ
                  </span>
                  <button 
                    onClick={() => setIsPosterModalOpen(true)}
                    className="text-amber-300 hover:text-amber-200 font-medium underline cursor-pointer"
                  >
                    পোস্টার ভিউ
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Interactive Size Selector, Features & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Section description */}
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
                কোল্ড প্রেস ঘানি ভাঙা পদ্ধতি
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                প্রাকৃতিক পুষ্টি ও ঝাঁঝালো স্বাদ সম্পূর্ণ অটুট
              </h3>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                কোনো তাপ বা কেমিক্যাল ছাড়া প্রাচীন ঘানি ভাঙা ঠান্ডা পদ্ধতিতে ধীরগতিতে সরিষা পিষে তেল বের করা হয়। ফলে তেলের প্রাকৃতিক ঝাঁঝ, ওমেগা ফ্যাটি অ্যাসিড এবং ভিটামিন-ই শতভাগ সুরক্ষিত থাকে।
              </p>
            </div>

            {/* Packaging Size Options */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                প্যাকেজ সাইজ নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {oilProducts.map((prod) => {
                  const isSelected = activeProduct.id === prod.id;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedProduct(prod)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-900/30'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-stone-300'
                      }`}
                    >
                      {prod.popular && (
                        <span className="absolute -top-2.5 right-2 bg-amber-500 text-stone-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                          জনপ্রিয়
                        </span>
                      )}
                      <div className="font-bold text-sm text-white mb-0.5">{prod.packageSize}</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-amber-400">৳{prod.price}</span>
                        {prod.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">৳{prod.originalPrice}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quality Points Cards */}
            <div className="grid grid-cols-2 gap-3 py-1">
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-white font-bold">১০০% নির্ভেজাল গ্যারান্টি</strong>
                  <span className="text-stone-300">কোনো কৃত্রিম রঙ বা গন্ধ নেই</span>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-start gap-2.5">
                <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-white font-bold">ঘরোয়া তীব্র ঝাঁঝ</strong>
                  <span className="text-stone-300">ভর্তা ও ইলিশ রান্নায় অতুলনীয়</span>
                </div>
              </div>
            </div>

            {/* Quantity and Price Calculation */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-400 block font-medium">মোট মূল্য</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-amber-400">৳ {totalAmount}</span>
                  <span className="text-xs text-stone-300 font-medium">({activeProduct.packageSize} × {quantity})</span>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center bg-white/10 rounded-xl border border-white/20 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition font-bold text-lg cursor-pointer"
                  aria-label="কমান"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-amber-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition font-bold text-lg cursor-pointer"
                  aria-label="বাড়ান"
                >
                  +
                </button>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={`py-3.5 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/15 hover:bg-white/20 border border-white/25 text-white'
                }`}
                id="mustard-oil-add-cart-btn"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>কার্টে যোগ হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-amber-300" />
                    <span>কার্টে যোগ করুন</span>
                  </>
                )}
              </button>

              {/* Instant Buy Now */}
              <button
                onClick={handleInstantBuy}
                className="py-3.5 px-5 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 shadow-lg shadow-amber-900/40 active:scale-98 cursor-pointer"
                id="mustard-oil-instant-buy-btn"
              >
                <Zap className="w-5 h-5 fill-stone-950" />
                <span>এখনই সরাসরি অর্ডার করুন</span>
              </button>
            </div>

            {/* Watch Video Demo Banner Button */}
            <button
              onClick={() => {
                const el = document.getElementById('product-video-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Film className="w-4 h-4 text-amber-400" />
              <span>ঘানি ভাঙানোর বাস্তব ভিডিও ও রান্নার টেস্ট দেখুন</span>
            </button>

            {/* WhatsApp & Call Direct Ordering Support */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <a
                href={`https://wa.me/8801842078717?text=${encodeURIComponent(
                  `আসসালামু আলাইকুম, আমি Deshi Food থেকে ${activeProduct.name} (${activeProduct.packageSize}) ${quantity}টি অর্ডার করতে চাই। মোট মূল্য: ৳${totalAmount}।`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-2 rounded-xl transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/30" />
                <span>হোয়াটসঅ্যাপে অর্ডার করুন</span>
              </a>

              <a
                href="tel:01842078717"
                className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 font-semibold bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>হটলাইন: 01842-078717</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Poster Full Screen Modal */}
      {isPosterModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsPosterModalOpen(false)}
        >
          <div 
            className="relative max-w-lg w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPosterModalOpen(false)}
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src="/images/mustard_oil_poster.jpg"
              alt="Deshi Food খাঁটি সরিষার তেল অফিসিয়াল পোস্টার"
              className="w-auto max-h-[80vh] rounded-2xl shadow-2xl border border-amber-500/40 object-contain"
              referrerPolicy="no-referrer"
            />

            <div className="mt-4 text-center">
              <p className="text-amber-300 font-serif font-bold text-sm">
                Deshi Food • খাঁটি সরিষার তেল • হটলাইন: 01842-078717
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
