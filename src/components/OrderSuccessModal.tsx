import React from 'react';
import { Check, ArrowRight, Printer, MapPin, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderSuccessModal: React.FC = () => {
  const { 
    isOrderSuccessOpen, 
    setIsOrderSuccessOpen, 
    lastPlacedOrder, 
    setActiveTab, 
    setCurrentTrackingOrderId 
  } = useStore();

  if (!isOrderSuccessOpen || !lastPlacedOrder) return null;

  const handleTrackOrder = () => {
    setCurrentTrackingOrderId(lastPlacedOrder.id);
    setIsOrderSuccessOpen(false);
    setActiveTab('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClose = () => {
    setIsOrderSuccessOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 text-center shadow-2xl border border-stone-200 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
        id="order-success-confirmation-dialog"
      >
        {/* Large Green Checkmark (Exactly matching video 00:56) */}
        <div className="w-20 h-20 bg-emerald-100 border-4 border-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        {/* Heading from video 00:56 */}
        <h2 className="text-2xl font-extrabold text-[#1C3B2B] mb-2 font-serif">
          ধন্যবাদ! আপনার অর্ডার গ্রহণ করা হয়েছে
        </h2>

        {/* Subtitle from video 00:56 */}
        <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
          আমরা শীঘ্রই আপনার সাথে যোগাযোগ করে অর্ডার নিশ্চিত করব।
        </p>

        {/* Order ID Pill matching video 00:56: #DF-1408 */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-2 rounded-full font-mono font-extrabold text-base mb-6 shadow-2xs">
          <span>#{lastPlacedOrder.id}</span>
        </div>

        {/* Order Details Brief */}
        <div className="bg-stone-50 rounded-2xl p-4 text-xs text-stone-600 space-y-2 text-left mb-6 border border-stone-200">
          <div className="flex justify-between">
            <span className="text-stone-500">গ্রাহক:</span>
            <span className="font-bold text-stone-800">{lastPlacedOrder.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">
              {lastPlacedOrder.paymentMethod === 'cod' ? 'পেমেন্ট মেথড (ক্যাশ কালেকশন):' : 'মোট পরিশোধিত:'}
            </span>
            <span className="font-bold text-stone-800">
              ৳ {lastPlacedOrder.total} (
              {lastPlacedOrder.paymentMethod === 'cod' 
                ? 'Cash on Delivery' 
                : lastPlacedOrder.paymentMethod === 'bkash'
                ? 'bKash'
                : lastPlacedOrder.paymentMethod === 'nagad'
                ? 'Nagad'
                : 'Card'}
              )
            </span>
          </div>
          {lastPlacedOrder.transactionId && (
            <div className="flex justify-between">
              <span className="text-stone-500">ট্রানজেকশন আইডি:</span>
              <span className="font-mono font-bold text-stone-700">{lastPlacedOrder.transactionId}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-stone-500">কুরিয়ার ট্র্যাকিং:</span>
            <span className="font-mono font-bold text-emerald-700">{lastPlacedOrder.courierDetails.consignmentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">আনুমানিক ডেলিভারি:</span>
            <span className="font-bold text-amber-800">{lastPlacedOrder.courierDetails.estimatedDeliveryDate}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleTrackOrder}
            className="w-full bg-[#1C3B2B] hover:bg-[#152D21] text-white font-extrabold text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            id="success-track-order-btn"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>লাইভ অর্ডার ট্র্যাক করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleClose}
            className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm py-3 px-4 rounded-xl transition-colors cursor-pointer"
            id="success-modal-close-btn"
          >
            ঠিক আছে
          </button>
        </div>

      </div>
    </div>
  );
};
