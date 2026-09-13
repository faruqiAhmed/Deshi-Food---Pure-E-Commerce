import React, { useState, useEffect } from 'react';
import { 
  X, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  User, 
  Phone, 
  Sparkles, 
  Award, 
  Tag, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    cartCount,
    deliveryCity,
    setDeliveryCity,
    deliveryCharge,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    pointsToRedeem,
    setPointsToRedeem,
    pointsDiscount,
    cartTotal,
    currentUser,
    isLoggedIn,
    setIsLoginModalOpen,
    setLoginPromptReason,
    initiateCheckout 
  } = useStore();

  const [name, setName] = useState(currentUser.name || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [address, setAddress] = useState(currentUser.savedAddresses[0]?.address || '');
  const [city, setCity] = useState<'Dhaka' | 'Outside Dhaka'>(deliveryCity);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setDeliveryCity(city);
  }, [city, setDeliveryCity]);

  useEffect(() => {
    if (currentUser.name) setName(currentUser.name);
    if (currentUser.phone) setPhone(currentUser.phone);
  }, [currentUser]);

  if (!isCheckoutOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন';
    if (!phone.trim()) {
      newErrors.phone = 'মোবাইল নম্বর দেওয়া আবশ্যক';
    } else if (!/^01[3-9]\d{8}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)';
    }
    if (!address.trim() || address.trim().length < 8) {
      newErrors.address = 'পূর্ণ ঠিকানা দিন (বাড়ি নং, রোড, এলাকা)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCouponApply = () => {
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setLoginPromptReason('checkout');
      setIsLoginModalOpen(true);
      return;
    }
    if (!validateForm()) return;

    initiateCheckout({
      name,
      phone,
      address,
      city,
      paymentMethod,
    });
  };

  const handleSavedAddressClick = (savedAddr: string, savedCity: 'Dhaka' | 'Outside Dhaka') => {
    setAddress(savedAddr);
    setCity(savedCity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
        id="checkout-modal-container"
      >
        {/* Header matching video 00:34 */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1C3B2B] text-amber-400 font-bold flex items-center justify-center text-sm">
              DF
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1C3B2B]">
                চেকআউট ও ডেলিভারি তথ্য
              </h2>
              <p className="text-xs text-stone-500">
                নিরাপদ ও দ্রুত হোম ডেলিভারি কনফার্মেশন
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Content Body (Replicating video layout at 00:34-00:54) */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
            
            {/* Left Column (Col 7): Delivery Information */}
            <div className="lg:col-span-7 p-4 sm:p-7 space-y-3.5 sm:space-y-5">
              
              {/* Customer Saved Address Pill Shortcuts */}
              {currentUser.savedAddresses.length > 0 && (
                <div className="bg-stone-50 p-2.5 sm:p-3 rounded-xl border border-stone-200">
                  <span className="text-xs text-stone-600 font-semibold block mb-1.5">
                    সংরক্ষিত ঠিকানা থেকে বেছে নিন:
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentUser.savedAddresses.map((sa) => (
                      <button
                        key={sa.id}
                        type="button"
                        onClick={() => handleSavedAddressClick(sa.address, sa.city)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                          address === sa.address
                            ? 'bg-[#1C3B2B] text-white border-[#1C3B2B] font-bold'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{sa.tag} ({sa.city === 'Dhaka' ? 'ঢাকা' : 'ঢাকার বাইরে'})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  পূর্ণ নাম *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 sm:py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C3B2B]/20 ${
                      errors.name ? 'border-red-500 bg-red-50/20' : 'border-stone-300 focus:border-[#1C3B2B]'
                    }`}
                    id="checkout-name-input"
                  />
                </div>
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              {/* Mobile Number (Matching video placeholder 01XXXXXXXXX) */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  মোবাইল নম্বর *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 sm:py-2.5 text-sm font-mono bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C3B2B]/20 ${
                      errors.phone ? 'border-red-500 bg-red-50/20' : 'border-stone-300 focus:border-[#1C3B2B]'
                    }`}
                    id="checkout-phone-input"
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  সম্পূর্ণ ঠিকানা *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <textarea
                    required
                    rows={2}
                    placeholder="বাড়ি নং, রোড নং, এলাকা / থানা ও পোস্ট কোড"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full pl-9 pr-3 py-1.5 sm:py-2 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C3B2B]/20 ${
                      errors.address ? 'border-red-500 bg-red-50/20' : 'border-stone-300 focus:border-[#1C3B2B]'
                    }`}
                    id="checkout-address-input"
                  />
                </div>
                {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
              </div>

              {/* City Selector (Dhaka / Outside Dhaka) */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  ডেলিভারি এলাকা / শহর *
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setCity('Dhaka')}
                    className={`py-1.5 sm:py-2.5 px-2.5 sm:px-3 rounded-lg sm:rounded-xl border text-left transition-all ${
                      city === 'Dhaka'
                        ? 'bg-emerald-50/80 border-[#1C3B2B] text-[#1C3B2B] font-bold ring-1 ring-[#1C3B2B]'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-sm font-semibold">ঢাকা শহর</span>
                      <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-100 px-1 sm:px-1.5 py-0.5 rounded shrink-0">৳৬০</span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-stone-500 font-normal block leading-tight mt-0.5">২৪ ঘণ্টায় ডেলিভারি</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCity('Outside Dhaka')}
                    className={`py-1.5 sm:py-2.5 px-2.5 sm:px-3 rounded-lg sm:rounded-xl border text-left transition-all ${
                      city === 'Outside Dhaka'
                        ? 'bg-emerald-50/80 border-[#1C3B2B] text-[#1C3B2B] font-bold ring-1 ring-[#1C3B2B]'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-sm font-semibold">ঢাকার বাইরে</span>
                      <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-100 px-1 sm:px-1.5 py-0.5 rounded shrink-0">৳১২০</span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-stone-500 font-normal block leading-tight mt-0.5">২-৩ দিনে হোম ডেলিভারি</span>
                  </button>
                </div>
              </div>

              {/* Payment Method Selector (bKash, Nagad, Card, COD) */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 sm:mb-2">
                  পেমেন্ট পদ্ধতি নির্বাচন করুন *
                </label>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
                  {/* bKash */}
                  <label
                    onClick={() => setPaymentMethod('bkash')}
                    className={`flex items-center gap-2 py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'bkash'
                        ? 'border-[#E2136E] bg-pink-50/70 ring-1 sm:ring-2 ring-[#E2136E]/30'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                      className="accent-[#E2136E] w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] sm:text-xs font-bold text-[#E2136E] truncate">বিকাশ</span>
                        <span className="text-[9px] font-bold bg-[#E2136E] text-white px-1 py-0.2 rounded shrink-0">
                          অনলাইন
                        </span>
                      </div>
                      <span className="text-[9px] sm:text-[11px] text-stone-500 block truncate leading-tight">ইনস্ট্যান্ট পে</span>
                    </div>
                  </label>

                  {/* Nagad */}
                  <label
                    onClick={() => setPaymentMethod('nagad')}
                    className={`flex items-center gap-2 py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'nagad'
                        ? 'border-[#F7941D] bg-orange-50/70 ring-1 sm:ring-2 ring-[#F7941D]/30'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'nagad'}
                      onChange={() => setPaymentMethod('nagad')}
                      className="accent-[#F7941D] w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] sm:text-xs font-bold text-[#F7941D] block truncate">নগদ</span>
                      <span className="text-[9px] sm:text-[11px] text-stone-500 block truncate leading-tight">ওয়ালেট পেমেন্ট</span>
                    </div>
                  </label>

                  {/* Card / Netbanking */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center gap-2 py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#1C3B2B] bg-emerald-50/70 ring-1 sm:ring-2 ring-[#1C3B2B]/30'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#1C3B2B] w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] sm:text-xs font-bold text-stone-800 block truncate">কার্ড / ইন্টারনেট</span>
                      <span className="text-[9px] sm:text-[11px] text-stone-500 block truncate leading-tight">ভিসা / মাস্টারকার্ড</span>
                    </div>
                  </label>

                  {/* Cash on Delivery (Matching video 00:52) */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center gap-2 py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#D97706] bg-amber-50/70 ring-1 sm:ring-2 ring-[#D97706]/30'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#D97706] w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] sm:text-xs font-bold text-stone-800 block truncate">ক্যাশ অন ডেলিভারি</span>
                      <span className="text-[9px] sm:text-[11px] text-stone-500 block truncate leading-tight">পণ্য পেয়ে টাকা</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Loyalty Points Redemption Slider */}
              <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/80">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>লয়ালটি পয়েন্ট রিডিম করুন</span>
                  </div>
                  <span className="text-xs font-semibold text-amber-800">
                    ব্যালেন্স: {currentUser.loyaltyPoints} পয়েন্ট
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max={Math.min(currentUser.loyaltyPoints, 200)}
                    step="10"
                    value={pointsToRedeem}
                    onChange={(e) => setPointsToRedeem(Number(e.target.value))}
                    className="w-full accent-amber-600 h-1.5 bg-amber-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs font-bold text-amber-900 min-w-[4rem] text-right">
                    -৳{pointsToRedeem}
                  </span>
                </div>
                <p className="text-[10px] text-amber-700 mt-1">
                  * ১ পয়েন্ট = ১ টাকা সরাসরি ছাড়। প্রতি অর্ডারে নতুন পয়েন্ট অর্জিত হবে।
                </p>
              </div>

              {/* Coupon Code Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  কুপন বা ভাউচার কোড
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="DESHI10 বা FREESHIP"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1C3B2B]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCouponApply}
                    className="bg-stone-800 hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    প্রয়োগ করুন
                  </button>
                </div>
                {couponMessage && (
                  <p className={`text-xs ${couponMessage.type === 'success' ? 'text-emerald-700 font-semibold' : 'text-red-600'}`}>
                    {couponMessage.text}
                  </p>
                )}
              </div>

            </div>

            {/* Right Column (Col 5): Order Summary (Matching video 00:34-00:54) */}
            <div className="lg:col-span-5 p-6 sm:p-7 bg-[#FAF8F5] flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1C3B2B] border-b border-stone-200 pb-2">
                  অর্ডার সারাংশ
                </h3>

                {/* Items breakdown */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-9 h-9 rounded-lg object-cover border border-stone-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-bold text-stone-800 block truncate max-w-[150px]">
                            {item.product.name}
                          </span>
                          <span className="text-stone-500 font-medium">
                            × {item.quantity} ({item.product.packageSize})
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-stone-800">
                        ৳ {item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculations breakdown matching video 00:34 */}
                <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>সাবটোটাল:</span>
                    <span className="font-bold text-stone-800">৳ {cartSubtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>ডেলিভারি চার্জ:</span>
                    <span className="font-bold text-stone-800">
                      {deliveryCharge === 0 ? (
                        <span className="text-emerald-600 font-bold">ফ্রি!</span>
                      ) : (
                        `৳ ${deliveryCharge}`
                      )}
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>কুপন ছাড় ({appliedCoupon}):</span>
                      <span>-৳ {couponDiscount}</span>
                    </div>
                  )}

                  {pointsDiscount > 0 && (
                    <div className="flex justify-between text-amber-700 font-semibold">
                      <span>লয়ালটি পয়েন্ট ছাড়:</span>
                      <span>-৳ {pointsDiscount}</span>
                    </div>
                  )}

                  {/* Grand Total */}
                  <div className="pt-2 border-t border-stone-300 flex justify-between items-baseline text-sm sm:text-base font-extrabold text-[#1C3B2B]">
                    <span>সর্বমোট প্রদেয়:</span>
                    <span className="text-xl sm:text-2xl text-[#B91C1C]">
                      ৳ {cartTotal}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg mt-2">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>এই অর্ডারে আপনি পাচ্ছেন <strong>{Math.floor(cartTotal / 20)}</strong> লয়ালটি পয়েন্ট!</span>
                  </div>
                </div>
              </div>

              {/* Submit Button (Matching video 00:54 "অর্ডার নিশ্চিত করুন") */}
              <div className="pt-6 space-y-2">
                {!isLoggedIn && (
                  <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between gap-2 text-amber-950 text-xs">
                    <span className="font-medium">⚠️ অর্ডার সম্পন্ন করার পূর্বে লগইন আবশ্যক</span>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginPromptReason('checkout');
                        setIsLoginModalOpen(true);
                      }}
                      className="font-bold text-[#1C3B2B] underline hover:text-[#152D21] cursor-pointer"
                    >
                      লগইন করুন
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#1C3B2B] hover:bg-[#152D21] text-white font-extrabold text-base py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  id="checkout-submit-btn"
                >
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                  <span>
                    {!isLoggedIn 
                      ? 'লগইন করে অর্ডার নিশ্চিত করুন' 
                      : paymentMethod === 'cod' 
                      ? 'অর্ডার নিশ্চিত করুন' 
                      : 'পেমেন্ট গেটওয়েতে এগিয়ে যান'}
                  </span>
                </button>
                <p className="text-[11px] text-center text-stone-400 mt-2">
                  🔒 ২৫৬-বিট এসএসএল এনক্রিপশনের মাধ্যমে শতভাগ নিরাপদ লেনদেন
                </p>
              </div>

            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
