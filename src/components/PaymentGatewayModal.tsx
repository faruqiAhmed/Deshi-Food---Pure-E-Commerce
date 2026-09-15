import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Check, Smartphone, CreditCard, ArrowRight, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';

export const PaymentGatewayModal: React.FC = () => {
  const { 
    isPaymentModalOpen, 
    setIsPaymentModalOpen, 
    cartTotal, 
    pendingPaymentMethod,
    pendingCheckoutData,
    completeOrder 
  } = useStore();

  const [step, setStep] = useState<'details' | 'otp' | 'pin' | 'processing'>('details');
  const [walletNumber, setWalletNumber] = useState(pendingCheckoutData.phone || '01842078717');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [cardName, setCardName] = useState(pendingCheckoutData.name || '');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('892');
  const [isAgreed, setIsAgreed] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isPaymentModalOpen) return null;

  const handleProceedToOtp = () => {
    if (!walletNumber || walletNumber.length < 11) {
      setErrorMessage('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন');
      return;
    }
    setErrorMessage('');
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length < 4) {
      setErrorMessage('অনুগ্রহ করে ৪ ডিজিটের ওটিপি কোড লিখুন (টেস্ট কোড: 1234)');
      return;
    }
    setErrorMessage('');
    setStep('pin');
  };

  const handleFinalPayment = () => {
    if (pendingPaymentMethod !== 'card' && (!pin || pin.length < 4)) {
      setErrorMessage('অনুগ্রহ করে গোপন পিন কোড দিন (টেস্ট পিন: 12345)');
      return;
    }

    setErrorMessage('');
    setStep('processing');

    setTimeout(() => {
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      const generatedTxId = pendingPaymentMethod === 'bkash' 
        ? `TRX-BK-${Math.floor(100000 + Math.random() * 900000)}` 
        : pendingPaymentMethod === 'nagad'
        ? `TRX-NG-${Math.floor(100000 + Math.random() * 900000)}`
        : `TXN-CARD-${Math.floor(100000 + Math.random() * 900000)}`;

      completeOrder(generatedTxId, pendingPaymentMethod, pendingCheckoutData);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
        id="secure-payment-gateway-dialog"
      >
        {/* Gateway Branded Header */}
        <div 
          className={`p-5 text-white flex items-center justify-between transition-colors ${
            pendingPaymentMethod === 'bkash' 
              ? 'bg-[#E2136E]' 
              : pendingPaymentMethod === 'nagad'
              ? 'bg-[#F7941D]'
              : 'bg-[#1C3B2B]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-lg">
              {pendingPaymentMethod === 'bkash' ? 'bK' : pendingPaymentMethod === 'nagad' ? 'নগদ' : '💳'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-wide">
                  {pendingPaymentMethod === 'bkash' 
                    ? 'bKash Payment Gateway' 
                    : pendingPaymentMethod === 'nagad'
                    ? 'Nagad Online Payment'
                    : 'SSLCommerz Secure Pay'}
                </h3>
              </div>
              <p className="text-xs text-white/80">
                মার্চেন্ট: Deshi Food (01751279584)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Banner */}
        <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-600">পরিশোধযোগ্য সর্বমোট:</span>
          <span className="text-xl font-extrabold text-[#1C3B2B]">৳ {cartTotal}</span>
        </div>

        {/* Dynamic Payment Body */}
        <div className="p-6 space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Processing State */}
          {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <h4 className="text-base font-bold text-stone-800">
                পেমেন্ট যাচাই করা হচ্ছে...
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                অনুগ্রহ করে পেজটি রিফ্রেশ করবেন না। আপনার লেনদেনটি নিরাপদে সম্পন্ন হচ্ছে।
              </p>
            </div>
          )}

          {/* bKash / Nagad Step 1: Wallet Number */}
          {step === 'details' && pendingPaymentMethod !== 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  আপনার {pendingPaymentMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} অ্যাকাউন্ট নম্বর
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={walletNumber}
                    onChange={(e) => setWalletNumber(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full pl-9 pr-3 py-2.5 font-mono text-base font-bold bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  নম্বরটিতে একটি ৪ ডিজিটের ওটিপি ভেরিফিকেশন কোড পাঠানো হবে।
                </p>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  সুরক্ষিত পেমেন্ট প্রটোকল। কোনো পিন বা গোপন তথ্য আমরা সংরক্ষণ করি না।
                </span>
              </div>

              <button
                type="button"
                onClick={handleProceedToOtp}
                className="w-full bg-[#E2136E] hover:bg-[#c2105e] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>পরবর্তী (ওটিপি গ্রহণ)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* bKash / Nagad Step 2: OTP Entry */}
          {step === 'otp' && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs text-stone-500">
                  {walletNumber} নম্বরে ভেরিফিকেশন কোড পাঠানো হয়েছে
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 text-center">
                  ওটিপি (OTP) কোড লিখুন
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="1 2 3 4"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center tracking-widest text-2xl font-mono font-bold py-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                />
                <div className="flex justify-between items-center text-xs mt-2">
                  <span className="text-stone-400">কোড পাননি?</span>
                  <button
                    type="button"
                    onClick={() => setOtp('1234')}
                    className="text-pink-600 hover:underline font-semibold"
                  >
                    ডেমো ওটিপি বসান (1234)
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full bg-[#E2136E] hover:bg-[#c2105e] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>কোড নিশ্চিত করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* bKash / Nagad Step 3: PIN Entry */}
          {step === 'pin' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 text-center">
                  {pendingPaymentMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} পিন (PIN) নম্বর দিন
                </label>
                <input
                  type="password"
                  maxLength={5}
                  placeholder="• • • • •"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full text-center text-3xl font-mono tracking-widest py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                />
                <div className="flex justify-center mt-2">
                  <button
                    type="button"
                    onClick={() => setPin('12345')}
                    className="text-xs text-pink-600 hover:underline font-semibold"
                  >
                    ডেমো পিন বসান (12345)
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinalPayment}
                className="w-full bg-[#E2136E] hover:bg-[#c2105e] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="gateway-confirm-pay-btn"
              >
                <ShieldCheck className="w-5 h-5 text-white" />
                <span>৳ {cartTotal} পরিশোধ নিশ্চিত করুন</span>
              </button>
            </div>
          )}

          {/* Card / SSLCommerz Interface */}
          {step === 'details' && pendingPaymentMethod === 'card' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  কার্ডধারীর নাম
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1C3B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  কার্ড নম্বর
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 font-mono text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1C3B2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    মেয়াদ (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono text-center bg-white border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono text-center bg-white border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinalPayment}
                className="w-full bg-[#1C3B2B] hover:bg-[#152D21] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <ShieldCheck className="w-5 h-5 text-amber-300" />
                <span>৳ {cartTotal} নিরাপদ পরিশোধ করুন</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer Security Badges */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-center text-[11px] text-stone-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>PCI-DSS সার্টিফাইড ও বাংলাদেশ ব্যাংক অনুমোদিত পেমেন্ট গেটওয়ে</span>
        </div>

      </div>
    </div>
  );
};
