import React, { useState } from 'react';
import { X, Check, ShoppingBag, Star, ShieldCheck, Heart, Share2, ThumbsUp, MessageSquarePlus, UserCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const ProductModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, isLoggedIn } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [modalTab, setModalTab] = useState<'details' | 'reviews'>('details');

  // Customer Reviews state
  const [reviews, setReviews] = useState<CustomerReview[]>([
    {
      id: 'rev-1',
      author: 'মোঃ আরিফুল ইসলাম',
      location: 'মিরপুর, ঢাকা',
      rating: 5,
      date: '৩ দিন আগে',
      comment: 'খাঁটি ঘানি ভাঙা সরিষার তেল। বোতল খুললেই ঝাঁঝালো সুবাস ছড়িয়ে পড়ে। ভর্তা ও রান্নায় স্বাদ অতুলনীয় হয়েছে!',
      verified: true
    },
    {
      id: 'rev-2',
      author: 'তানজিলা আক্তার',
      location: 'জিইসি, চট্টগ্রাম',
      rating: 5,
      date: '১ সপ্তাহ আগে',
      comment: 'অর্গানিক ফুড হিসেবে ১০০ তে ১০০। প্যাকেজিং খুব সুরক্ষিত ছিল, কোনো লিকেজ নেই। ডেলিভারিও খুব দ্রুত পেয়েছি।',
      verified: true
    },
    {
      id: 'rev-3',
      author: 'ফারুক আহমেদ',
      location: 'উত্তরা, ঢাকা',
      rating: 4,
      date: '২ সপ্তাহ আগে',
      comment: 'বাজারের সাধারণ তেলের চেয়ে অনেক ভালো মানের ও খাঁটি। পরিবারের সবাই খুব পছন্দ করেছে।',
      verified: true
    }
  ]);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity);
    if (isLoggedIn) {
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
        setQuickViewProduct(null);
      }, 900);
    } else {
      setQuickViewProduct(null);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      location: newReviewLocation.trim() || 'বাংলাদেশ',
      rating: newReviewRating,
      date: 'এইমাত্র',
      comment: newReviewComment.trim(),
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewLocation('');
    setNewReviewComment('');
    setShowReviewForm(false);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200/90 animate-scaleUp h-[88dvh] sm:h-auto max-h-[92dvh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        id="product-quick-view-modal"
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 p-2 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 transition-colors shadow-xs cursor-pointer"
          aria-label="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Body (Images + Details + Reviews) */}
        <div className="flex-1 overflow-y-auto min-h-0 flex flex-col md:flex-row pb-24 sm:pb-0 overscroll-contain">
          
          {/* Left Side: Product Image */}
          <div className="w-full md:w-5/12 bg-stone-50 p-4 sm:p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-stone-100 shrink-0">
            <div className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-none mx-auto">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-inner bg-white">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {quickViewProduct.popular && (
                  <span className="absolute top-3 left-3 bg-[#D97706] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    জনপ্রিয় পছন্দ
                  </span>
                )}
              </div>

              {/* Quality Badges */}
              <div className="grid grid-cols-2 gap-2 mt-3 sm:mt-4 text-[11px]">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200/70">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">শতভাগ বিশুদ্ধ</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span className="font-semibold">{quickViewProduct.rating} রেটিং ({quickViewProduct.reviewsCount})</span>
                </div>
              </div>
            </div>

            <div className="w-full pt-3 sm:pt-4 text-center hidden md:block">
              <p className="text-xs text-stone-500">
                ক্যাশ অন ডেলিভারি • হোম ডেলিভারি সুবিধা
              </p>
            </div>
          </div>

          {/* Right Side: Details & Reviews */}
          <div className="w-full md:w-7/12 p-4 sm:p-6 flex flex-col">
            <div>
              {/* Header / Category */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#B45309] font-bold tracking-wider uppercase">
                  {quickViewProduct.englishName}
                </span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <Check className="w-3.5 h-3.5" /> স্টকে রয়েছে
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C3B2B] mt-1">
                {quickViewProduct.name}
              </h2>

              {/* Star Rating Overview */}
              <div className="flex items-center gap-2 mt-1.5 mb-2.5 sm:mt-2 sm:mb-3">
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${s <= Math.round(quickViewProduct.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-800">{quickViewProduct.rating}</span>
                <span className="text-xs text-stone-500 font-medium">({quickViewProduct.reviewsCount} রিভিউ)</span>
                <span className="text-stone-300">•</span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {quickViewProduct.packageSize}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#1C3B2B]">
                  ৳ {quickViewProduct.price}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-xs sm:text-sm text-stone-400 line-through">
                    ৳ {quickViewProduct.originalPrice}
                  </span>
                )}
              </div>

              {/* Tab Selector: বিস্তারিত vs গ্রাহক রিভিউ */}
              <div className="flex items-center gap-2 border-b border-stone-200 pb-2 mb-4 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setModalTab('details')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    modalTab === 'details'
                      ? 'bg-[#1C3B2B] text-white shadow-xs'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  বিবরণ ও বৈশিষ্ট্য
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab('reviews')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    modalTab === 'reviews'
                      ? 'bg-[#1C3B2B] text-white shadow-xs'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span>গ্রাহক রিভিউ</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    modalTab === 'reviews' ? 'bg-amber-400 text-stone-900' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {reviews.length}
                  </span>
                </button>
              </div>

              {/* TAB 1: DETAILS */}
              {modalTab === 'details' && (
                <div className="space-y-4 animate-fadeIn">
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {quickViewProduct.shortDescription}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EFEAE1]">
                    <h4 className="text-xs font-bold text-[#1C3B2B]">মূল বৈশিষ্ট্যসমূহ:</h4>
                    {quickViewProduct.features.map((feat, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-stone-700 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: CUSTOMER REVIEWS */}
              {modalTab === 'reviews' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Review Header Banner */}
                  <div className="flex items-center justify-between p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl font-black text-amber-950 font-mono">
                          {quickViewProduct.rating}
                        </span>
                        <div className="flex items-center text-amber-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-[11px] text-amber-900">
                        ১০০% যাচাইকৃত দেশি অর্গানিক খাদ্যপ্রেমী ক্রেতা
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="flex items-center gap-1 text-xs font-bold bg-[#1C3B2B] hover:bg-[#142a1e] text-white px-3 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageSquarePlus className="w-3.5 h-3.5 text-amber-300" />
                      <span>{showReviewForm ? 'ফর্ম বন্ধ করুন' : 'রিভিউ দিন'}</span>
                    </button>
                  </div>

                  {reviewSubmitted && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>আপনার মূল্যবান রিভিউটি সফলভাবে যুক্ত হয়েছে! ধন্যবাদ।</span>
                    </div>
                  )}

                  {/* Add Review Form */}
                  {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                      <h4 className="text-xs font-bold text-[#1C3B2B]">আপনার মতামত লিখুন</h4>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-600 font-medium">রেটিং দিন:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewReviewRating(star)}
                              className="p-1 text-stone-300 hover:text-amber-400 cursor-pointer transition-colors"
                            >
                              <Star className={`w-4 h-4 ${star <= newReviewRating ? 'fill-amber-400 text-amber-400' : ''}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="আপনার নাম *"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          required
                          className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-emerald-600"
                        />
                        <input
                          type="text"
                          placeholder="আপনার এলাকা/শহর (যেমন: ঢাকা)"
                          value={newReviewLocation}
                          onChange={(e) => setNewReviewLocation(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-emerald-600"
                        />
                      </div>

                      <textarea
                        placeholder="পণ্যটির স্বাদ, গন্ধ, খাঁটি ভাব বা ডেলিভারি সম্পর্কে আপনার অভিজ্ঞতা লিখুন..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        required
                        rows={3}
                        className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-emerald-600 resize-none"
                      />

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="text-xs font-semibold px-3 py-1.5 text-stone-600 hover:bg-stone-200 rounded-lg cursor-pointer"
                        >
                          বাতিল
                        </button>
                        <button
                          type="submit"
                          className="text-xs font-bold px-4 py-1.5 bg-[#1C3B2B] text-white rounded-lg hover:bg-[#142a1e] shadow-xs cursor-pointer"
                        >
                          রিভিউ পোস্ট করুন
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-3.5 bg-stone-50/80 rounded-xl border border-stone-200/80 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#1C3B2B]">{rev.author}</span>
                            {rev.verified && (
                              <span className="flex items-center gap-0.5 text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-1.5 py-0.2 rounded border border-emerald-200">
                                <UserCheck className="w-3 h-3" /> যাচাইকৃত ক্রেতা
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-stone-400">{rev.date}</span>
                        </div>

                        <div className="flex items-center gap-1 text-amber-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star 
                              key={s} 
                              className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} 
                            />
                          ))}
                          <span className="text-[11px] text-stone-500 font-medium ml-1">{rev.location}</span>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FIXED BOTTOM ACTION BAR - POSITION FIXED / NOT SCROLLING */}
        <div className="fixed bottom-0 inset-x-0 sm:static sm:inset-auto z-30 bg-white/98 backdrop-blur-md border-t border-stone-200/90 px-4 py-3 sm:px-6 sm:py-3.5 shadow-[0_-6px_25px_rgba(0,0,0,0.12)] shrink-0">
          <div className="flex items-center justify-between gap-3 max-w-3xl mx-auto">
            {/* Desktop price breakdown */}
            <div className="hidden md:flex flex-col">
              <span className="text-[11px] text-stone-500 font-medium">মোট প্রদেয় মূল্য</span>
              <span className="text-xl font-extrabold text-[#1C3B2B] leading-none">
                ৳ {quickViewProduct.price * quantity}
              </span>
            </div>

            {/* Mobile & Desktop Action Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 md:flex-initial md:min-w-[360px] justify-end">
              {/* Resized Ergonomic Quantity Stepper (h-12 / 48px) */}
              <div className="flex items-center h-12 border-2 border-stone-200 rounded-xl bg-stone-50 overflow-hidden shrink-0 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-stone-700 hover:bg-stone-200 font-bold transition-colors cursor-pointer text-lg active:bg-stone-300"
                  aria-label="পরিমাণ কমান"
                >
                  -
                </button>
                <span className="w-9 sm:w-11 text-center text-sm sm:text-base font-bold text-stone-800 font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-stone-700 hover:bg-stone-200 font-bold transition-colors cursor-pointer text-lg active:bg-stone-300"
                  aria-label="পরিমাণ বাড়ান"
                >
                  +
                </button>
              </div>

              {/* Resized Ergonomic Add to Cart Button (h-12 / 48px) */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 h-12 px-4 rounded-xl font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer active:scale-[0.98] ${
                  isAdded
                    ? 'bg-emerald-600 text-white shadow-emerald-900/20'
                    : 'bg-[#1C3B2B] hover:bg-[#152D21] text-white shadow-[#1C3B2B]/20'
                }`}
                id="modal-add-to-cart-btn"
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 text-white stroke-[2.5]" />
                    <span>কার্টে যোগ হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-amber-300 stroke-[2.5]" />
                    <span className="truncate">কার্টে যোগ করুন (৳{quickViewProduct.price * quantity})</span>
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
