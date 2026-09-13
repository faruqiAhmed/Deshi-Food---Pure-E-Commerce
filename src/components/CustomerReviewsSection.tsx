import React, { useState, useRef, useEffect } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquarePlus, 
  UserCheck, 
  ShieldCheck, 
  X, 
  Send, 
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  LayoutGrid,
  Search,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export interface CustomerReviewItem {
  id: string;
  name: string;
  location: string;
  productName: string;
  category: 'oil' | 'spice' | 'all';
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
  highlight?: string;
}

const INITIAL_REVIEWS: CustomerReviewItem[] = [
  {
    id: 'cr-1',
    name: 'ফারহানা চৌধুরী',
    location: 'গুলশান, ঢাকা',
    productName: 'কাঠের ঘানি ভাঙা সরিষার তেল (৫ লিটার জার)',
    category: 'oil',
    rating: 5,
    date: '২ দিন আগে',
    comment: 'বোতল খোলার সাথে সাথেই পুরো ঘর ঝাঁঝালো সুবাসে ভরে গেছে! ইলিশ ভাজা আর ভর্তায় এমন খাঁটি তেলের স্বাদ অনেক বছর পর পেলাম। প্যাকেজিং ছিল চমৎকার, কোনো লিকেজ নেই।',
    verified: true,
    helpfulCount: 28,
    highlight: '১০০% ঘানি ভাঙা খাঁটি ঝাঁঝ'
  },
  {
    id: 'cr-2',
    name: 'তানভীর আহমেদ',
    location: 'হালিশহর, চট্টগ্রাম',
    productName: 'প্রিমিয়াম খাঁটি কাঠের ঘানি সরিষার তেল (১ লিটার)',
    category: 'oil',
    rating: 5,
    date: '৩ দিন আগে',
    comment: 'আগে বাজারের সাধারণ ব্র্যান্ডের তেল ব্যবহার করতাম। এই সরিষার তেল ব্যবহারের পর গ্যাস্ট্রিক বা পেটের কোনো সমস্যা হচ্ছে না। রান্না করার সময় এত সুন্দর ঘ্রাণ আসে যা সত্যিই অসাধারণ।',
    verified: true,
    helpfulCount: 19,
    highlight: 'স্বাস্থ্যসম্মত ও খাঁটি'
  },
  {
    id: 'cr-3',
    name: 'অধ্যাপক ড. রফিকুল ইসলাম',
    location: 'উপশহর, রাজশাহী',
    productName: 'খাঁটি হলুদ গুঁড়া (উচ্চ কারকিউমিনযুক্ত ৫০০ গ্রাম)',
    category: 'spice',
    rating: 5,
    date: '৫ দিন আগে',
    comment: 'বাজারে রঙ মেশানো নকল মসলার ভিড়ে দেশি ফুডের এই হলুদ গুঁড়া যেন আশার আলো। সামান্য একটু দিলেই দারুণ রঙ ও সুবাস পাওয়া যায়। নিয়মিত অর্ডারের সিদ্ধান্ত নিয়েছি।',
    verified: true,
    helpfulCount: 15,
    highlight: 'কৃত্রিম রঙ মুক্ত'
  },
  {
    id: 'cr-4',
    name: 'নাসরিন সুলতানা',
    location: 'জিন্দাবাজার, সিলেট',
    productName: 'দেশি চরের শুকনো মরিচ গুঁড়া (৫০০ গ্রাম)',
    category: 'spice',
    rating: 5,
    date: '১ সপ্তাহ আগে',
    comment: 'মরিচের গুঁড়ায় কৃত্রিম কোনো ঝাঁঝ বা রঙ নেই, একেবারে খাঁটি রোদে শুকানো বোঁটা ছাড়া চরের মরিচের স্বাদ। রান্নায় প্রাকৃতিক গাঢ় লাল রঙ আর চমৎকার সুবাস তৈরি করে।',
    verified: true,
    helpfulCount: 22,
    highlight: 'প্রাকৃতিক স্বাদ ও রঙ'
  },
  {
    id: 'cr-5',
    name: 'মোঃ জহিরুল হক',
    location: 'উত্তরা, ঢাকা',
    productName: 'কাঠের ঘানি ভাঙা সরিষার তেল (২ লিটার)',
    category: 'oil',
    rating: 5,
    date: '১ সপ্তাহ আগে',
    comment: 'অর্ডার দেওয়ার ২৪ ঘণ্টার মধ্যে হোম ডেলিভারি পেয়েছি। কুরিয়ার ট্র্যাকিং সিস্টেম দারুণ ছিল। তেল খেয়ে পরিবারের সবাই খুব প্রশংসা করছে। ধন্যবাদ দেশি ফুডকে।',
    verified: true,
    helpfulCount: 14,
    highlight: 'দ্রুত হোম ডেলিভারি'
  },
  {
    id: 'cr-6',
    name: 'সালমা বেগম',
    location: 'সোনাডাঙ্গা, খুলনা',
    productName: 'খাঁটি জিরা গুঁড়া ও বিশেষ গরম মসলা',
    category: 'spice',
    rating: 5,
    date: '২ সপ্তাহ আগে',
    comment: 'প্যাকেট খুললেই তাজা রোস্টেড জিরার সুবাস মন ভরে দেয়। মাংসে আর বিরিয়ানিতে ব্যবহার করেছি, টেস্ট একদম বাবুর্চির রান্নার মতো পারফেক্ট হয়েছে।',
    verified: true,
    helpfulCount: 17,
    highlight: 'সুগন্ধি খাঁটি মসলা'
  },
  {
    id: 'cr-7',
    name: 'আহমেদ জুবায়ের',
    location: 'কান্দিরপাড়, কুমিল্লা',
    productName: 'কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল (৫ লিটার)',
    category: 'oil',
    rating: 5,
    date: '২ সপ্তাহ আগে',
    comment: 'তেলটা নেওয়ার পর ভর্তা আর খিচুড়িতে ট্রাই করেছি, খাঁটি কাঠের ঘানির যে প্রাকৃতিক ঝাঁঝ তা অতুলনীয়। মা নিজেও খুব প্রশংসা করেছেন।',
    verified: true,
    helpfulCount: 21,
    highlight: 'ঐতিহ্যবাহী স্বাদ'
  },
  {
    id: 'cr-8',
    name: 'মাহমুদা হক',
    location: 'সদর রোড, বরিশাল',
    productName: 'দেশি হলুদ ও শুকনো মরিচ কম্বো',
    category: 'spice',
    rating: 5,
    date: '৩ সপ্তাহ আগে',
    comment: 'প্যাকেজিং অত্যন্ত হাইজেনিক ছিল। তরকারিতে সামান্য পরিমাণে দিলেই চমৎকার স্বাদ ও খাঁটি প্রাকৃতিক রঙ আসে। বারবার নেওয়ার মতো পণ্য।',
    verified: true,
    helpfulCount: 16,
    highlight: 'শতভাগ বিশুদ্ধ'
  }
];

export const CustomerReviewsSection: React.FC = () => {
  const { setSelectedCategory } = useStore();
  const [reviews, setReviews] = useState<CustomerReviewItem[]>(INITIAL_REVIEWS);
  const [helpfulMap, setHelpfulMap] = useState<Record<string, boolean>>({});
  
  // Auto-scrolling state for line one review
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // View All Modal state
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);
  const [viewAllSearch, setViewAllSearch] = useState('');
  const [viewAllFilter, setViewAllFilter] = useState<'all' | 'oil' | 'spice' | 'five_star'>('all');

  // Inline view toggle: line (auto-scroll) vs grid
  const [displayMode, setDisplayMode] = useState<'line' | 'grid'>('line');
  const [inPageFilter, setInPageFilter] = useState<'all' | 'oil' | 'spice' | 'five_star'>('all');

  // Modal for adding a review
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [productCategory, setProductCategory] = useState<'oil' | 'spice'>('oil');
  const [productNameInput, setProductNameInput] = useState('কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল');
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  // Manual scroll handler for line one
  const handleScrollManual = (direction: 'left' | 'right') => {
    if (scrollTrackRef.current) {
      const scrollAmount = 360;
      scrollTrackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Continuous auto-scrolling loop using requestAnimationFrame / interval for smooth single line experience
  useEffect(() => {
    const el = scrollTrackRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.8; // px per tick

    const step = () => {
      if (isAutoScrolling && !isHovered && el) {
        el.scrollLeft += speed;
        // When scrolled to the halfway mark (since content is duplicated), loop back to start seamlessly
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoScrolling, isHovered]);

  const handleHelpfulClick = (id: string) => {
    if (helpfulMap[id]) return;
    setReviews((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, helpfulCount: item.helpfulCount + 1 } : item
      )
    );
    setHelpfulMap((prev) => ({ ...prev, [id]: true }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentInput.trim()) return;

    const newReview: CustomerReviewItem = {
      id: `cr-user-${Date.now()}`,
      name: authorName.trim(),
      location: authorLocation.trim() || 'বাংলাদেশ',
      productName: productNameInput,
      category: productCategory,
      rating: ratingInput,
      date: 'এইমাত্র',
      comment: commentInput.trim(),
      verified: true,
      helpfulCount: 1,
      highlight: highlightInput.trim() || 'যাচাইকৃত গ্রাহক অভিজ্ঞতা'
    };

    setReviews([newReview, ...reviews]);
    setIsAddModalOpen(false);
    setSuccessToast(true);

    // Reset form
    setAuthorName('');
    setAuthorLocation('');
    setCommentInput('');
    setHighlightInput('');
    setRatingInput(5);

    setTimeout(() => {
      setSuccessToast(false);
    }, 4000);
  };

  // Filtered reviews for View All modal or grid view
  const modalFilteredReviews = reviews.filter((r) => {
    const matchesFilter = 
      viewAllFilter === 'all' ? true :
      viewAllFilter === 'oil' ? r.category === 'oil' :
      viewAllFilter === 'spice' ? r.category === 'spice' :
      viewAllFilter === 'five_star' ? r.rating === 5 : true;

    const matchesSearch = 
      viewAllSearch.trim() === '' ||
      r.name.toLowerCase().includes(viewAllSearch.toLowerCase()) ||
      r.location.toLowerCase().includes(viewAllSearch.toLowerCase()) ||
      r.productName.toLowerCase().includes(viewAllSearch.toLowerCase()) ||
      r.comment.toLowerCase().includes(viewAllSearch.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Filtered reviews for in-page restored grid
  const inPageFilteredReviews = reviews.filter((r) => {
    if (inPageFilter === 'oil') return r.category === 'oil';
    if (inPageFilter === 'spice') return r.category === 'spice';
    if (inPageFilter === 'five_star') return r.rating === 5;
    return true;
  });

  return (
    <section className="py-14 sm:py-16 bg-[#FDFBF7] border-t border-[#EFEAE1] relative overflow-hidden" id="customer-reviews-section">
      {/* Background Subtle Flourish */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/80 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>১০০% খাঁটি ও সন্তুষ্ট ক্রেতার অভিজ্ঞতা</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C3B2B] font-serif tracking-tight">
              গ্রাহকদের রিভিউ ও ভালোবাসার গল্প
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              সারা বাংলাদেশের ১৫,০০০+ স্বাস্থ্যসচেতন পরিবারের প্রতিদিনের রান্নাঘরের নির্ভরযোগ্য পছন্দ দেশি ফুড।
            </p>
          </div>

          {/* Action Buttons: VIEW ALL + WRITE A REVIEW */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* VIEW ALL BUTTON (User requested) */}
            <button
              onClick={() => setIsViewAllModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white hover:bg-stone-50 text-[#1C3B2B] border-2 border-[#1C3B2B]/30 hover:border-[#1C3B2B] font-extrabold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-98 cursor-pointer"
              id="view-all-reviews-btn"
            >
              <LayoutGrid className="w-4 h-4 text-[#1C3B2B]" />
              <span>সব রিভিউ দেখুন ({reviews.length})</span>
            </button>

            {/* Write Review CTA */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-[#1C3B2B] hover:bg-[#152d21] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              id="write-customer-review-btn"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-300" />
              <span>রিভিউ দিন</span>
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl flex items-center justify-between shadow-md animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">আপনার মূল্যবান রিভিউটি সফলভাবে প্রকাশিত হয়েছে!</p>
                <p className="text-xs text-emerald-700">দেশি ফুড পরিবারের সাথে থাকার জন্য আপনাকে আন্তরিক ধন্যবাদ।</p>
              </div>
            </div>
            <button 
              onClick={() => setSuccessToast(false)} 
              className="p-1.5 text-emerald-700 hover:text-emerald-950 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Trust Stats Mini-Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-stone-200/90 shadow-2xs text-xs">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#1C3B2B] font-bold text-lg shrink-0">
              ৪.৯★
            </div>
            <div>
              <p className="font-extrabold text-stone-800">গড় রেটিং ৪.৯</p>
              <p className="text-[11px] text-stone-500">২,৪৮০+ কাস্টমার রিভিউ</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 border-l border-stone-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-stone-800">১০০% খাঁটি পণ্য</p>
              <p className="text-[11px] text-stone-500">রাসায়নিক ও প্রিজারভেটিভ মুক্ত</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 border-l border-stone-100">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-stone-800">৯৮% রিপিট ক্রেতা</p>
              <p className="text-[11px] text-stone-500">সারা বাংলাদেশে নিয়মিত সরবরাহ</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 border-l border-stone-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-stone-800">যাচাইকৃত পরিবার</p>
              <p className="text-[11px] text-stone-500">প্রকৃত অর্ডারের অভিমত</p>
            </div>
          </div>
        </div>

        {/* LINE ONE: Auto Scrolling Customer Review Controls Header */}
        <div className="flex items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>লাইভ গ্রাহক রিভিউ (অটো স্ক্রোলিং)</span>
            </div>
            <span className="hidden sm:inline text-stone-400 text-xs">| মাউস ধরলে থামবে</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className={`p-2 rounded-xl text-xs font-semibold border transition flex items-center gap-1 cursor-pointer ${
                isAutoScrolling
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}
              title={isAutoScrolling ? 'অটো স্ক্রোল থামান' : 'অটো স্ক্রোল চালু করুন'}
            >
              {isAutoScrolling ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-emerald-800" />
                  <span className="hidden md:inline text-[11px]">পজ</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-amber-800" />
                  <span className="hidden md:inline text-[11px]">প্লে</span>
                </>
              )}
            </button>

            {/* Left Manual Scroll Arrow */}
            <button
              type="button"
              onClick={() => handleScrollManual('left')}
              className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs transition cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Right Manual Scroll Arrow */}
            <button
              type="button"
              onClick={() => handleScrollManual('right')}
              className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs transition cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* "সব দেখুন" Mini link */}
            <button
              type="button"
              onClick={() => setIsViewAllModalOpen(true)}
              className="ml-1 text-xs font-bold text-[#1C3B2B] hover:text-[#D97706] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>সব দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* LINE ONE: AUTO SCROLLING CONTINUOUS HORIZONTAL ROW */}
        <div 
          className="relative group -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {/* Subtle Fade Edges */}
          <div className="absolute left-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none" />

          {/* Smooth Scrollable Line Container */}
          <div
            ref={scrollTrackRef}
            className="flex items-stretch gap-4 overflow-x-auto no-scrollbar py-2 select-none scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Duplicated list for seamless infinite auto-scrolling line */}
            {[...reviews, ...reviews].map((item, idx) => (
              <div
                key={`${item.id}-dup-${idx}`}
                className="w-[300px] sm:w-[350px] shrink-0 bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between space-y-3 relative group/card"
              >
                {/* Header: Author & Verified Badge */}
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#1C3B2B] font-bold text-xs flex items-center justify-center border border-emerald-200 shadow-2xs shrink-0">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#1C3B2B] leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 font-medium">
                          {item.location}
                        </p>
                      </div>
                    </div>

                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>যাচাইকৃত</span>
                      </span>
                    )}
                  </div>

                  {/* Rating Stars & Timestamp */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= item.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 font-medium">
                      {item.date}
                    </span>
                  </div>

                  {/* Product Tag */}
                  <div className="text-[11px] text-amber-900 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/70 font-medium line-clamp-1">
                    পণ্য: {item.productName}
                  </div>

                  {/* Highlight Tag */}
                  {item.highlight && (
                    <div className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      ★ {item.highlight}
                    </div>
                  )}

                  {/* Comment Body */}
                  <p className="text-xs text-stone-700 leading-relaxed italic line-clamp-3">
                    "{item.comment}"
                  </p>
                </div>

                {/* Helpful Button */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="text-[11px]">সহায়ক?</span>
                  <button
                    type="button"
                    onClick={() => handleHelpfulClick(item.id)}
                    disabled={helpfulMap[item.id]}
                    className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border transition-all text-xs font-semibold cursor-pointer ${
                      helpfulMap[item.id]
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${helpfulMap[item.id] ? 'fill-emerald-700 text-emerald-700' : ''}`} />
                    <span>{item.helpfulCount}</span>
                  </button>
                </div>
              </div>
            ))}

            {/* End of Line "View All" Card */}
            <div 
              onClick={() => setIsViewAllModalOpen(true)}
              className="w-[200px] shrink-0 bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl p-5 border-2 border-dashed border-emerald-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-emerald-100/60 transition-colors group/all"
            >
              <div className="w-12 h-12 rounded-full bg-[#1C3B2B] text-amber-400 flex items-center justify-center mb-2 group-hover/all:scale-110 transition-transform">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-[#1C3B2B]">সব রিভিউ দেখুন</h4>
              <p className="text-[11px] text-stone-500 mt-1">সকল {reviews.length}টি গ্রাহক মতামত ব্রাউজ করুন</p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RESTORED: Rating Overview Dashboard Bento */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
          {/* Main Average Score */}
          <div className="lg:col-span-4 flex flex-col justify-center items-center text-center p-6 bg-[#FAF8F5] rounded-2xl border border-amber-200/60">
            <div className="text-5xl sm:text-6xl font-black text-[#1C3B2B] font-mono tracking-tight">
              ৪.৯
            </div>
            <div className="flex items-center gap-1 text-amber-400 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs font-bold text-stone-600">
              ৫ এর মধ্যে ৪.৯ রেটিং (২,৪৮০+ যাচাইকৃত রিভিউ)
            </p>
            <div className="mt-4 pt-4 border-t border-stone-200/80 w-full flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>৯৮% গ্রাহক পুনরায় অর্ডার করেন</span>
            </div>
          </div>

          {/* Star Distribution Bars */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-2.5 px-2 sm:px-4">
            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 font-bold text-stone-700 flex items-center gap-1">
                ৫ স্টার
              </span>
              <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[94%]" />
              </div>
              <span className="w-10 text-right font-mono font-bold text-stone-600">৯৪%</span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 font-bold text-stone-700 flex items-center gap-1">
                ৪ স্টার
              </span>
              <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-300 rounded-full w-[5%]" />
              </div>
              <span className="w-10 text-right font-mono font-bold text-stone-600">৫%</span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 font-bold text-stone-700 flex items-center gap-1">
                ৩ স্টার
              </span>
              <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-300 rounded-full w-[1%]" />
              </div>
              <span className="w-10 text-right font-mono font-bold text-stone-600">১%</span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 font-bold text-stone-700 flex items-center gap-1">
                ২ স্টার
              </span>
              <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-300 rounded-full w-[0%]" />
              </div>
              <span className="w-10 text-right font-mono font-bold text-stone-400">০%</span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 font-bold text-stone-700 flex items-center gap-1">
                ১ স্টার
              </span>
              <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-300 rounded-full w-[0%]" />
              </div>
              <span className="w-10 text-right font-mono font-bold text-stone-400">০%</span>
            </div>
          </div>

          {/* Guarantee Highlights */}
          <div className="lg:col-span-3 flex flex-col justify-center gap-3 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/60 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1C3B2B] block">১০০% ক্যাশ অন ডেলিভারি</span>
                <span className="text-stone-600 text-[11px]">পণ্য হাতে পেয়ে দেখে টাকা পরিশোধের নিশ্চয়তা।</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1C3B2B] block">মানহীনতায় শতভাগ রিফান্ড</span>
                <span className="text-stone-600 text-[11px]">কোনো ভেজাল প্রমাণ হলে তাৎক্ষণিক মূল্য ফেরত।</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1C3B2B] block">যাচাইকৃত প্রকৃত ক্রেতা</span>
                <span className="text-stone-600 text-[11px]">সব রিভিউ রেজিস্টার্ড অর্ডারের ওপর ভিত্তি করে।</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RESTORED: Filter Tabs for In-Page Reviews */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setInPageFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                inPageFilter === 'all'
                  ? 'bg-[#1C3B2B] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              সব রিভিউ ({reviews.length})
            </button>

            <button
              type="button"
              onClick={() => setInPageFilter('oil')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                inPageFilter === 'oil'
                  ? 'bg-[#1C3B2B] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              সরিষার তেল ({reviews.filter((r) => r.category === 'oil').length})
            </button>

            <button
              type="button"
              onClick={() => setInPageFilter('spice')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                inPageFilter === 'spice'
                  ? 'bg-[#1C3B2B] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              খাঁটি মসলা ({reviews.filter((r) => r.category === 'spice').length})
            </button>

            <button
              type="button"
              onClick={() => setInPageFilter('five_star')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                inPageFilter === 'five_star'
                  ? 'bg-[#1C3B2B] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>৫-স্টার রিভিউ ({reviews.filter((r) => r.rating === 5).length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span>প্রদর্শিত হচ্ছে: <strong className="text-stone-800">{inPageFilteredReviews.length}টি রিভিউ</strong></span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RESTORED: Full Customer Reviews 3-Column Grid */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inPageFilteredReviews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Author Info & Verified Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1C3B2B] font-bold text-sm flex items-center justify-center border border-emerald-200 shadow-2xs shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1C3B2B] leading-tight group-hover:text-emerald-800 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-medium">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {item.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>যাচাইকৃত</span>
                    </span>
                  )}
                </div>

                {/* Rating Stars & Timestamp */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= item.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-stone-400 font-medium">
                    {item.date}
                  </span>
                </div>

                {/* Product Tag */}
                <div className="text-xs text-amber-900 bg-amber-50/80 px-3 py-1.5 rounded-xl border border-amber-200/70 font-medium line-clamp-1">
                  পণ্য: {item.productName}
                </div>

                {/* Highlight Tag */}
                {item.highlight && (
                  <div className="inline-block text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    ★ {item.highlight}
                  </div>
                )}

                {/* Comment Body */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Card Footer: Helpful counter */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="text-[11px]">এই রিভিউটি কি সহায়ক ছিল?</span>
                <button
                  type="button"
                  onClick={() => handleHelpfulClick(item.id)}
                  disabled={helpfulMap[item.id]}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all text-xs font-semibold cursor-pointer ${
                    helpfulMap[item.id]
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${helpfulMap[item.id] ? 'fill-emerald-700 text-emerald-700' : ''}`} />
                  <span>{item.helpfulCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action CTA Bar */}
        <div className="bg-gradient-to-r from-[#1C3B2B] via-[#244b37] to-[#1C3B2B] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold font-serif text-amber-300">
              আপনিও খাঁটি খাবারের স্বাদ নিয়ে সন্তুষ্ট গ্রাহকদের তালিকায় যুক্ত হোন!
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              সরাসরি বগুড়া ও নাটোর থেকে কাঠের ঘানিতে ভাঙানো খাঁটি সরিষার তেল ও বাছাইকৃত মসলা পৌঁছে যাবে আপনার দ্বারে।
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsViewAllModalOpen(true)}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition cursor-pointer"
            >
              সব রিভিউ দেখুন ({reviews.length})
            </button>
            <button
              onClick={() => {
                setSelectedCategory('all');
                const el = document.getElementById('product-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 font-extrabold text-xs sm:text-sm shadow-lg transition-all active:scale-98 cursor-pointer"
            >
              অর্ডার করুন
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: VIEW ALL CUSTOMER REVIEWS (User Requested "View All Button") */}
      {/* ========================================================================= */}
      {isViewAllModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div 
            className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-scaleUp h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            id="all-customer-reviews-modal"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5] shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    সকল গ্রাহক মূল্যায়ন
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C3B2B] font-serif mt-0.5">
                  সকল কাস্টমার রিভিউ ({reviews.length})
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsViewAllModalOpen(false);
                    setIsAddModalOpen(true);
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition cursor-pointer"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5 text-amber-300" />
                  <span>রিভিউ দিন</span>
                </button>
                <button
                  onClick={() => setIsViewAllModalOpen(false)}
                  className="p-2 rounded-full bg-white hover:bg-stone-200 text-stone-700 transition cursor-pointer border border-stone-200 shadow-2xs"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter and Search Bar in Modal */}
            <div className="p-4 sm:px-6 bg-white border-b border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                <button
                  onClick={() => setViewAllFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    viewAllFilter === 'all'
                      ? 'bg-[#1C3B2B] text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  সব ({reviews.length})
                </button>
                <button
                  onClick={() => setViewAllFilter('oil')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    viewAllFilter === 'oil'
                      ? 'bg-[#1C3B2B] text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  সরিষার তেল ({reviews.filter(r => r.category === 'oil').length})
                </button>
                <button
                  onClick={() => setViewAllFilter('spice')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    viewAllFilter === 'spice'
                      ? 'bg-[#1C3B2B] text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  মসলা গুঁড়া ({reviews.filter(r => r.category === 'spice').length})
                </button>
                <button
                  onClick={() => setViewAllFilter('five_star')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    viewAllFilter === 'five_star'
                      ? 'bg-[#1C3B2B] text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>৫-স্টার ({reviews.filter(r => r.rating === 5).length})</span>
                </button>
              </div>

              {/* Search input */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="রিভিউ বা এলাকা খুঁজুন..."
                  value={viewAllSearch}
                  onChange={(e) => setViewAllSearch(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-emerald-600"
                />
              </div>
            </div>

            {/* Scrollable Reviews Grid in Modal */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FDFBF7]">
              {modalFilteredReviews.length === 0 ? (
                <div className="text-center py-16 text-stone-500">
                  <p className="font-bold text-sm">কোনো রিভিউ খুঁজে পাওয়া যায়নি!</p>
                  <p className="text-xs text-stone-400 mt-1">অন্য কোনো কীওয়ার্ড লিখে চেষ্টা করুন।</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modalFilteredReviews.map((item) => (
                    <div
                      key={`modal-grid-${item.id}`}
                      className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#1C3B2B] font-bold text-xs flex items-center justify-center border border-emerald-200 shadow-2xs shrink-0">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-xs sm:text-sm text-[#1C3B2B] leading-tight">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-stone-500 font-medium">
                                {item.location}
                              </p>
                            </div>
                          </div>

                          {item.verified && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>যাচাইকৃত ক্রেতা</span>
                            </span>
                          )}
                        </div>

                        {/* Rating Stars & Timestamp */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= item.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-stone-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-stone-400 font-medium">
                            {item.date}
                          </span>
                        </div>

                        {/* Product Tag */}
                        <div className="text-[11px] text-amber-900 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/70 font-medium">
                          পণ্য: {item.productName}
                        </div>

                        {/* Highlight */}
                        {item.highlight && (
                          <div className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            ★ {item.highlight}
                          </div>
                        )}

                        {/* Detailed Comment */}
                        <p className="text-xs text-stone-700 leading-relaxed italic">
                          "{item.comment}"
                        </p>
                      </div>

                      {/* Helpful Button */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                        <span className="text-[11px]">সহায়ক মনে হয়েছে?</span>
                        <button
                          type="button"
                          onClick={() => handleHelpfulClick(item.id)}
                          disabled={helpfulMap[item.id]}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all text-xs font-semibold cursor-pointer ${
                            helpfulMap[item.id]
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${helpfulMap[item.id] ? 'fill-emerald-700 text-emerald-700' : ''}`} />
                          <span>{item.helpfulCount}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-stone-500">
                প্রদর্শিত হচ্ছে {modalFilteredReviews.length} টি রিভিউ
              </span>
              <button
                onClick={() => {
                  setIsViewAllModalOpen(false);
                  setIsAddModalOpen(true);
                }}
                className="inline-flex sm:hidden items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1C3B2B] text-white font-bold text-xs"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-amber-300" />
                <span>রিভিউ দিন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: WRITE A CUSTOMER REVIEW */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div 
            className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-scaleUp p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-5">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                গ্রাহক প্রতিক্রিয়া
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C3B2B] font-serif">
                আপনার মূল্যবান রিভিউ দিন
              </h3>
              <p className="text-xs text-stone-500">
                দেশি ফুডের সাথে আপনার রান্নার অভিজ্ঞতা ও অনুভূতি সবার সাথে শেয়ার করুন।
              </p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Star Rating Select */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950">আপনার রেটিং:</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRatingInput(star)}
                      className="p-1 text-stone-300 hover:text-amber-400 transition cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= ratingInput
                            ? 'fill-amber-400 text-amber-400 scale-110'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মোঃ কামরুল ইসলাম"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    আপনার এলাকা / শহর *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ধানমন্ডি, ঢাকা"
                    value={authorLocation}
                    onChange={(e) => setAuthorLocation(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-emerald-600"
                  />
                </div>
              </div>

              {/* Product Type Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  কোন পণ্যটি ব্যবহার করেছেন?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setProductCategory('oil');
                      setProductNameInput('কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল');
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                      productCategory === 'oil'
                        ? 'bg-[#1C3B2B] text-white border-[#1C3B2B]'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    ঘানি ভাঙা সরিষার তেল
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProductCategory('spice');
                      setProductNameInput('খাঁটি রান্নার মসলা গুঁড়া');
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                      productCategory === 'spice'
                        ? 'bg-[#1C3B2B] text-white border-[#1C3B2B]'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    প্রাকৃতিক মসলা গুঁড়া
                  </button>
                </div>
              </div>

              {/* Short Highlight */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  এক বাক্যে বিশেষত্ব (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  placeholder="যেমন: অসাধারণ ঝাঁঝ ও দ্রুত ডেলিভারি"
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-emerald-600"
                />
              </div>

              {/* Detailed Comment */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  আপনার বিস্তারিত মতামত ও অভিজ্ঞতা *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="পণ্যের খাঁটি ভাব, ঝাঁঝ, রান্নার স্বাদ, প্যাকিং বা কুরিয়ার সার্ভিসের অভিজ্ঞতা সংক্ষেপে লিখুন..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-emerald-600 resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold bg-[#1C3B2B] hover:bg-[#152d21] text-white shadow-md transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>রিভিউ পোস্ট করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
