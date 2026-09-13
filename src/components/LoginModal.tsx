import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Lock, 
  User as UserIcon,
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const LoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    loginWithPhoneOtp, 
    currentUser,
    loginPromptReason,
    setLoginPromptReason
  } = useStore();

  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState<string>('482910');
  const [countdown, setCountdown] = useState<number>(45);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize phone and name when modal opens
  useEffect(() => {
    if (isLoginModalOpen) {
      setStep('phone');
      setPhoneNumber(currentUser.phone || '');
      setCustomerName(currentUser.name || '');
      setOtpDigits(['', '', '', '', '', '']);
      setErrorMsg('');
      setCountdown(45);
    }
  }, [isLoginModalOpen, currentUser]);

  // Resend countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isLoginModalOpen) return null;

  // Clean and format Bangladeshi phone numbers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 11) {
      setPhoneNumber(val);
      if (errorMsg) setErrorMsg('');
    }
  };

  // Generate a random 6-digit OTP
  const generateNewOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    return randomOtp;
  };

  // Step 1: Send OTP
  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 11 || !cleanPhone.startsWith('01')) {
      setErrorMsg('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01842078717)');
      return;
    }

    setErrorMsg('');
    setIsSending(true);

    const newOtp = generateNewOtp();

    setTimeout(() => {
      setIsSending(false);
      setStep('otp');
      setCountdown(45);
      setOtpDigits(['', '', '', '', '', '']);

      // Focus first OTP input
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 150);
    }, 450);
  };

  // Auto-fill OTP on click demo code
  const handleAutoFillDemoOtp = () => {
    const digits = generatedOtp.split('');
    setOtpDigits(digits);
    otpInputsRef.current[5]?.focus();
  };

  // Step 2: Handle OTP input change
  const handleOtpDigitChange = (index: number, value: string) => {
    const numericVal = value.replace(/[^0-9]/g, '');
    
    if (numericVal.length > 1) {
      // Handle paste
      const pastedDigits = numericVal.slice(0, 6).split('');
      const newOtp = [...otpDigits];
      pastedDigits.forEach((d, idx) => {
        if (index + idx < 6) {
          newOtp[index + idx] = d;
        }
      });
      setOtpDigits(newOtp);
      const nextFocus = Math.min(index + pastedDigits.length, 5);
      otpInputsRef.current[nextFocus]?.focus();
      return;
    }

    const newOtp = [...otpDigits];
    newOtp[index] = numericVal;
    setOtpDigits(newOtp);
    if (errorMsg) setErrorMsg('');

    // Advance to next input if filled
    if (numericVal && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Step 3: Verify OTP
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const enteredCode = otpDigits.join('');

    if (enteredCode.length !== 6) {
      setErrorMsg('অনুগ্রহ করে ৬ সংখ্যার সম্পূর্ণ ওটিপি কোড দিন');
      return;
    }

    // Accepts generated code or demo 482910 or any valid 6 digits in prototype mode
    if (enteredCode !== generatedOtp && enteredCode !== '482910') {
      setErrorMsg('ভুল ওটিপি কোড! অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
      return;
    }

    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(async () => {
      setIsVerifying(false);
      await loginWithPhoneOtp(phoneNumber, customerName);
      setStep('success');

      // Auto close after brief success confirmation
      setTimeout(() => {
        setIsLoginModalOpen(false);
      }, 1000);
    }, 500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn"
      onClick={() => {
        setIsLoginModalOpen(false);
        setLoginPromptReason(null);
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div 
        className="bg-white w-full max-w-[370px] sm:max-w-[390px] rounded-2xl shadow-2xl border border-stone-200/90 overflow-hidden relative transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#1C3B2B] text-white px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 id="login-modal-title" className="text-sm sm:text-base font-bold leading-tight">
                {step === 'phone' && (loginPromptReason === 'cart' ? 'লগইন করুন (কার্ট)' : loginPromptReason === 'checkout' ? 'লগইন করুন (চেকআউট)' : 'লগইন / সাইন-আপ')}
                {step === 'otp' && 'ওটিপি (OTP) কোড'}
                {step === 'success' && 'স্বাগতম!'}
              </h3>
              <p className="text-[10px] text-emerald-200">
                দেশি ফুড অ্যাকাউন্ট ভেরিফিকেশন
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsLoginModalOpen(false);
              setLoginPromptReason(null);
            }}
            className="p-1 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5">
          
          {/* REASON BANNERS for Add to Cart vs Checkout */}
          {loginPromptReason === 'cart' && step !== 'success' && (
            <div className="mb-3.5 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2 text-left">
              <ShoppingBag className="w-4 h-4 text-[#1C3B2B] shrink-0 mt-0.5" />
              <div className="flex-1">
                <h5 className="text-xs font-bold text-[#1C3B2B] leading-snug">
                  কার্টে পণ্য যোগ করতে অনুগ্রহ করে লগইন করুন
                </h5>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-tight">
                  লগইন সম্পন্ন হলে আপনার পছন্দের পণ্যটি কার্টে যোগ হবে।
                </p>
              </div>
            </div>
          )}

          {loginPromptReason === 'checkout' && step !== 'success' && (
            <div className="mb-3.5 p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-left">
              <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h5 className="text-xs font-bold text-amber-950 leading-snug">
                  চেকআউট ও অর্ডার করতে লগইন করুন
                </h5>
                <p className="text-[11px] text-amber-900 mt-0.5 leading-tight">
                  ক্যাশ অন ডেলিভারিতে অর্ডার নিশ্চিত করতে আপনার নম্বর দিন।
                </p>
              </div>
            </div>
          )}

          {loginPromptReason === 'orders' && step !== 'success' && (
            <div className="mb-3.5 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2 text-left">
              <ShieldCheck className="w-4 h-4 text-[#1C3B2B] shrink-0 mt-0.5" />
              <div className="flex-1">
                <h5 className="text-xs font-bold text-[#1C3B2B] leading-snug">
                  পূর্বের অর্ডার দেখতে লগইন করুন
                </h5>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-tight">
                  আপনার অর্ডার হিস্টোরি দেখতে মোবাইল নম্বর দিয়ে ওটিপি দিন।
                </p>
              </div>
            </div>
          )}

          {/* STEP 1: Phone Number Input */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-3.5">
              <div className="text-center pb-0.5">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-[#1C3B2B] mb-1.5">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-stone-900">
                  আপনার মোবাইল নম্বর দিন
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  লগইন ও অর্ডারের আপডেট পেতে ফোন নম্বর লিখুন
                </p>
              </div>

              {/* Phone Input Box */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  মোবাইল নম্বর *
                </label>
                <div className="flex rounded-xl border border-stone-300 focus-within:border-[#1C3B2B] focus-within:ring-2 focus-within:ring-[#1C3B2B]/20 overflow-hidden bg-white">
                  <div className="bg-stone-100 px-2.5 py-2 flex items-center gap-1 border-r border-stone-200 select-none">
                    <span className="text-xs font-bold text-stone-700">🇧🇩 +88</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="01XXXXXXXXX"
                    maxLength={11}
                    className="w-full px-2.5 py-2 text-sm font-mono tracking-wider font-semibold focus:outline-none text-stone-900 placeholder:text-stone-400"
                    id="login-phone-input"
                    autoFocus
                  />
                </div>
              </div>

              {/* Name (Optional) */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  আপনার নাম (ঐচ্ছিক)
                </label>
                <div className="relative rounded-xl border border-stone-300 focus-within:border-[#1C3B2B] focus-within:ring-2 focus-within:ring-[#1C3B2B]/20 overflow-hidden bg-white">
                  <UserIcon className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="যেমন: মো. ফারুক"
                    className="w-full pl-8 pr-3 py-2 text-sm focus:outline-none text-stone-900 placeholder:text-stone-400"
                    id="login-name-input"
                  />
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium flex items-center gap-1.5">
                  <span>⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-[#1C3B2B] hover:bg-[#142a1e] text-white font-bold py-2.5 px-4 rounded-xl shadow hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 text-sm"
                id="send-otp-btn"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                    <span>ওটিপি তৈরি হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {loginPromptReason === 'cart' 
                        ? 'লগইন ও কার্টে যোগ করুন' 
                        : loginPromptReason === 'checkout' 
                        ? 'লগইন ও চেকআউটে যান' 
                        : 'ওটিপি (OTP) পাঠান'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 text-center pt-0.5">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>আপনার তথ্য সম্পূর্ণ নিরাপদ ও সুরক্ষিত</span>
              </div>
            </form>
          )}

          {/* STEP 2: OTP Verification Input */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-3.5">
              <div className="flex items-center justify-between pb-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setErrorMsg('');
                  }}
                  className="text-xs text-[#1C3B2B] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>নম্বর পরিবর্তন</span>
                </button>
                <span className="text-xs text-stone-500 font-mono">
                  +88 {phoneNumber}
                </span>
              </div>

              {/* Subtle OTP Notice & Quick fill */}
              <div className="bg-stone-50 border border-stone-200/90 p-2.5 rounded-xl text-center">
                <p className="text-xs text-stone-600">
                  আপনার নম্বরে পাঠানো ৬ সংখ্যার কোড লিখুন
                </p>
                <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-stone-500">
                  <span>ওটিপি কোড:</span>
                  <button
                    type="button"
                    onClick={handleAutoFillDemoOtp}
                    className="font-mono font-bold text-[#1C3B2B] bg-emerald-100 hover:bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded transition-colors cursor-pointer"
                    title="ক্লিক করে কোড বসান"
                  >
                    {generatedOtp}
                  </button>
                </div>
              </div>

              {/* 6 Digits Boxes */}
              <div>
                <div className="flex justify-center gap-1.5 sm:gap-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputsRef.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className={`w-10 h-11 text-center font-mono text-lg font-bold rounded-lg border bg-white focus:outline-none transition-all ${
                        digit
                          ? 'border-[#1C3B2B] bg-emerald-50/50 text-[#1C3B2B] ring-1 ring-[#1C3B2B]'
                          : 'border-stone-300 text-stone-900 focus:border-[#1C3B2B] focus:ring-1 focus:ring-[#1C3B2B]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Error message */}
              {errorMsg && (
                <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium flex items-center gap-1.5">
                  <span>⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Resend OTP */}
              <div className="text-center text-xs">
                {countdown > 0 ? (
                  <span className="text-stone-500 text-[11px]">
                    পুনরায় কোড পাঠানো যাবে: <strong className="font-mono text-stone-700">{countdown}</strong> সেকেন্ড পর
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    className="text-[#1C3B2B] hover:text-emerald-700 font-bold underline cursor-pointer text-xs"
                  >
                    পুনরায় কোড পাঠান
                  </button>
                )}
              </div>

              {/* Verify & Login Button */}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-[#1C3B2B] hover:bg-[#142a1e] text-white font-bold py-2.5 px-4 rounded-xl shadow hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 text-sm"
                id="verify-otp-btn"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                    <span>যাচাই করা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>যাচাই করুন ও লগইন</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 3: Success State */}
          {step === 'success' && (
            <div className="py-4 text-center space-y-2.5 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#1C3B2B]">
                লগইন সফল হয়েছে!
              </h4>
              <p className="text-xs text-stone-600">
                স্বাগতম, <strong>{customerName || currentUser.name || 'গ্রাহক'}</strong>!
              </p>
              <div className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] px-2.5 py-1 rounded-full font-mono font-semibold">
                মোবাইল: +88 {phoneNumber}
              </div>
              {loginPromptReason === 'cart' && (
                <p className="text-xs text-emerald-700 font-bold">
                  ✓ কার্ট খোলা হচ্ছে...
                </p>
              )}
              {loginPromptReason === 'checkout' && (
                <p className="text-xs text-emerald-700 font-bold">
                  ✓ চেকআউট পেজ খোলা হচ্ছে...
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
