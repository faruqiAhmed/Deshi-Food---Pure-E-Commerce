import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  X, 
  ShoppingBag, 
  Zap, 
  Check, 
  Sparkles, 
  Award, 
  Clock, 
  Eye, 
  ShieldCheck, 
  Flame, 
  Share2, 
  ExternalLink,
  Film
} from 'lucide-react';
import { PRODUCT_VIDEOS, ProductVideo } from '../data/videos';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const ProductVideoSection: React.FC = () => {
  const { addToCart, setIsCheckoutOpen, isLoggedIn, setIsLoginModalOpen, setLoginPromptReason } = useStore();
  const [activeVideo, setActiveVideo] = useState<ProductVideo>(PRODUCT_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Find corresponding product for the active video
  const featuredProduct: Product | undefined = PRODUCTS.find(
    p => p.id === activeVideo.productId
  ) || PRODUCTS[0];

  const filteredVideos = selectedCategory === 'all' 
    ? PRODUCT_VIDEOS 
    : PRODUCT_VIDEOS.filter(v => v.category === selectedCategory);

  const handleVideoSelect = (video: ProductVideo) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    if (isLoggedIn) {
      setAddedProductId(product.id);
      setTimeout(() => setAddedProductId(null), 1500);
    }
  };

  const handleInstantBuy = (product: Product) => {
    if (!isLoggedIn) {
      addToCart(product, 1);
      setLoginPromptReason('checkout');
      setIsLoginModalOpen(true);
      return;
    }
    addToCart(product, 1);
    setIsCheckoutOpen(true);
  };

  const handleShare = (video: ProductVideo) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section 
      id="product-video-section" 
      className="py-16 lg:py-24 bg-[#FAF7F0] text-stone-900 border-y border-[#EAE3D2] relative overflow-hidden"
    >
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#1C3B2B]/10 text-[#1C3B2B] px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-[#1C3B2B]/20">
              <Film className="w-3.5 h-3.5 text-[#B45309]" />
              <span>ভিডিও গ্যালারি ও মেকিং স্টোরি</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C3B2B] font-serif tracking-tight">
              চোখে দেখুন পণ্যের শতভাগ বিশুদ্ধতা
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
              কাঠের ঘানিতে ধীরগতির কোল্ড প্রেস ভাঙানো থেকে শুরু করে কড়াইয়ে ইলিশ ভাজার খাঁটি সুবাস — প্রতিটি ভিডিও সরাসরি আমাদের উৎপাদন ও রান্নার বাস্তব মুহূর্ত।
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#1C3B2B] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              সব ভিডিও ({PRODUCT_VIDEOS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('mustard_oil')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'mustard_oil'
                  ? 'bg-[#1C3B2B] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              সরিষার তেল
            </button>
            <button
              onClick={() => setSelectedCategory('cooking')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'cooking'
                  ? 'bg-[#1C3B2B] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              রান্না ও টেস্ট
            </button>
            <button
              onClick={() => setSelectedCategory('spices')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'spices'
                  ? 'bg-[#1C3B2B] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              মসলা ভাঙানো
            </button>
          </div>
        </div>

        {/* Featured Video Stage & Linked Product Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12">
          
          {/* Main Video Cinema Box (8 cols) */}
          <div className="lg:col-span-8 bg-black rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-800 relative group">
            
            <div className="relative aspect-[16/9] w-full bg-stone-950 flex items-center justify-center overflow-hidden">
              {isPlaying && activeVideo.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1&playsinline=1`}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={activeVideo.thumbnail}
                    alt={activeVideo.title}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                  {/* Play Button Trigger */}
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-2xl transform hover:scale-110 active:scale-95 transition duration-300 z-10 cursor-pointer group/btn"
                    aria-label="ভিডিও চালু করুন"
                  >
                    <span className="absolute -inset-2 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
                    <Play className="w-8 h-8 fill-stone-950 translate-x-0.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  {/* Top Bar on Preview */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white z-10">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-white/10 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {activeVideo.badge}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-white/90 border border-white/10 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activeVideo.duration}
                      </span>
                      <button
                        onClick={() => setIsFullscreenModalOpen(true)}
                        className="bg-black/60 backdrop-blur-md hover:bg-white/20 p-1.5 rounded-full text-white border border-white/10 transition cursor-pointer"
                        title="ফুলস্ক্রিন মোডাল"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Bar on Preview */}
                  <div className="absolute bottom-4 inset-x-4 text-white z-10">
                    <p className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {activeVideo.views}
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold font-serif line-clamp-1">
                      {activeVideo.title}
                    </h3>
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="bg-[#121E17] px-4 py-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition cursor-pointer"
                  title={isPlaying ? 'বিরতি দিন' : 'চালু করুন'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition cursor-pointer"
                  title={isMuted ? 'সাউন্ড চালু করুন' : 'মিউট করুন'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setTimeout(() => setIsPlaying(true), 50);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition cursor-pointer"
                  title="পুনরায় দেখুন"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleShare(activeVideo)}
                  className="text-xs text-stone-300 hover:text-white flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{copiedLink ? 'লিঙ্ক কপি হয়েছে!' : 'শেয়ার'}</span>
                </button>

                <button
                  onClick={() => setIsFullscreenModalOpen(true)}
                  className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>বড় পর্দায় দেখুন</span>
                </button>
              </div>
            </div>

            {/* Video Details & Highlights */}
            <div className="p-5 bg-stone-900 text-stone-200 border-t border-stone-800">
              <h3 className="text-xl font-bold font-serif text-white mb-2">
                {activeVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                {activeVideo.description}
              </p>

              {/* Highlights pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-800">
                {activeVideo.keyHighlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-amber-200 bg-white/5 p-2 rounded-lg border border-white/5">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Featured Product Box (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#EAE3D2] shadow-lg sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                ভিডিওতে প্রদর্শিত পণ্য
              </span>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                স্টকে আছে
              </span>
            </div>

            {/* Product Card */}
            <div className="flex gap-4 items-center mb-5">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-24 h-24 rounded-2xl object-cover border border-stone-200 shadow-xs shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-stone-900 text-base font-serif line-clamp-1">
                  {featuredProduct.name}
                </h4>
                <p className="text-xs text-stone-500 mb-1.5">{featuredProduct.packageSize}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#1C3B2B]">
                    ৳{featuredProduct.price}
                  </span>
                  {featuredProduct.originalPrice && (
                    <span className="text-xs text-stone-400 line-through">
                      ৳{featuredProduct.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Feature points */}
            <div className="space-y-2 mb-6 bg-[#FAF7F0] p-3.5 rounded-xl border border-[#EFEAE1] text-xs text-stone-700">
              <p className="font-semibold text-[#1C3B2B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                ভিডিওতে দেখা এই খাঁটি পণ্যটি আপনার ঘরে পৌঁছে যাবে!
              </p>
              <ul className="space-y-1 text-stone-600 pl-1">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  ক্যাশ অন ডেলিভারি (পণ্য দেখে মূল্য পরিশোধ)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  ঢাকা সিটিতে ২৪ ঘণ্টা ও সারাদেশে ৪৮ ঘণ্টায় ডেলিভারি
                </li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => handleInstantBuy(featuredProduct)}
                className="w-full py-3 px-4 rounded-xl font-extrabold text-sm bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] text-white shadow-md shadow-amber-900/20 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>ভিডিওর পণ্যটি সরাসরি অর্ডার করুন</span>
              </button>

              <button
                onClick={() => handleAddToCart(featuredProduct)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm border transition flex items-center justify-center gap-2 cursor-pointer ${
                  addedProductId === featuredProduct.id
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white hover:bg-stone-50 border-stone-300 text-stone-800'
                }`}
              >
                {addedProductId === featuredProduct.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>কার্টে যোগ হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#B45309]" />
                    <span>কার্টে যোগ করুন</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/8801842078717?text=${encodeURIComponent(
                  `আসসালামু আলাইকুম, আমি ভিডিওতে দেখে ${featuredProduct.name} (${featuredProduct.packageSize}) অর্ডার করতে চাই।`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition flex items-center justify-center gap-2 text-center"
              >
                <span>হোয়াটসঅ্যাপে অর্ডার করতে ক্লিক করুন</span>
              </a>
            </div>

          </div>

        </div>

        {/* Video Playlist Grid / Carousel */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#1C3B2B] font-serif flex items-center gap-2">
              <Film className="w-5 h-5 text-[#B45309]" />
              <span>অন্যান্য ভিডিও প্লেলিস্ট ({filteredVideos.length})</span>
            </h3>
            <span className="text-xs text-stone-500">যে কোনো ভিডিওতে ক্লিক করে সরাসরি দেখুন</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredVideos.map((video) => {
              const isActive = activeVideo.id === video.id;
              const prod = PRODUCTS.find(p => p.id === video.productId);

              return (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className={`rounded-2xl p-3 border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                    isActive
                      ? 'bg-white border-[#B45309] ring-2 ring-[#B45309]/30 shadow-md'
                      : 'bg-white/80 hover:bg-white border-stone-200 hover:border-stone-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-stone-900">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                      {/* Duration */}
                      <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-xs text-[10px] text-white px-2 py-0.5 rounded font-mono font-bold">
                        {video.duration}
                      </span>

                      {/* Mini Play Icon or Active Playing Indicator */}
                      <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white/90 group-hover:bg-amber-500 text-stone-900 group-hover:text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        {isActive && isPlaying ? (
                          <span className="flex gap-0.5 items-center">
                            <span className="w-1 h-3 bg-[#B45309] rounded animate-bounce" />
                            <span className="w-1 h-4 bg-[#B45309] rounded animate-bounce delay-100" />
                            <span className="w-1 h-2 bg-[#B45309] rounded animate-bounce delay-200" />
                          </span>
                        ) : (
                          <Play className="w-4 h-4 fill-current translate-x-0.5" />
                        )}
                      </div>

                      {/* Badge */}
                      <span className="absolute top-2 left-2 bg-[#1C3B2B]/85 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                        {video.badge}
                      </span>
                    </div>

                    <h4 className={`text-sm font-bold line-clamp-2 mb-1.5 transition-colors ${
                      isActive ? 'text-[#B45309]' : 'text-stone-800 group-hover:text-[#1C3B2B]'
                    }`}>
                      {video.title}
                    </h4>

                    <p className="text-[11px] text-stone-500 line-clamp-2 mb-3">
                      {video.subtitle}
                    </p>
                  </div>

                  {/* Linked Product Micro-bar */}
                  {prod && (
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-600 truncate max-w-[120px] font-medium">
                        {prod.name}
                      </span>
                      <span className="font-extrabold text-[#1C3B2B]">
                        ৳{prod.price}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Fullscreen Video Modal */}
      {isFullscreenModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsFullscreenModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-700 shadow-2xl flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 text-white">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-stone-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {activeVideo.badge}
                </span>
                <h3 className="font-bold text-sm sm:text-base truncate max-w-lg">
                  {activeVideo.title}
                </h3>
              </div>

              <button
                onClick={() => setIsFullscreenModalOpen(false)}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition cursor-pointer"
                aria-label="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Video Player */}
            <div className="relative aspect-[16/9] w-full bg-black">
              {activeVideo.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Modal Footer with Product Action */}
            <div className="p-5 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-white">
              <div>
                <p className="text-xs text-stone-400">এই ভিডিওর পণ্যটি পছন্দ হয়েছে?</p>
                <p className="text-sm font-bold text-amber-300">
                  {featuredProduct.name} ({featuredProduct.packageSize}) — ৳{featuredProduct.price}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsFullscreenModalOpen(false);
                    handleInstantBuy(featuredProduct);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-lg cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-stone-950" />
                  <span>এখনই অর্ডার করুন</span>
                </button>

                <button
                  onClick={() => {
                    handleAddToCart(featuredProduct);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/20 transition cursor-pointer"
                >
                  কার্টে যোগ করুন
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
