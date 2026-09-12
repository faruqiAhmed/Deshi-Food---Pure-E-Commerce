import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';

export const OrderTrackingView: React.FC = () => {
  const { 
    orders, 
    currentTrackingOrderId, 
    setCurrentTrackingOrderId, 
    advanceOrderStatus,
    reorderItems,
    setActiveTab
  } = useStore();

  const [searchInput, setSearchInput] = useState(currentTrackingOrderId);
  const [isSimulating, setIsSimulating] = useState(false);

  // Find active order or fallback to first
  const order = orders.find((o) => o.id.toLowerCase() === searchInput.trim().toLowerCase()) 
    || orders.find((o) => o.customerPhone.includes(searchInput.trim()))
    || orders.find((o) => o.id === currentTrackingOrderId)
    || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (order) {
      setCurrentTrackingOrderId(order.id);
    }
  };

  const handleSimulateNextStep = () => {
    if (!order) return;
    setIsSimulating(true);
    advanceOrderStatus(order.id);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  // Stepper definition
  const steps: { key: OrderStatus; label: string; desc: string; icon: any }[] = [
    { key: 'confirmed', label: 'অর্ডার গৃহীত', desc: 'কনফার্ম ও ভেরিফাইড', icon: CheckCircle2 },
    { key: 'packaging', label: 'কোয়ালিটি প্যাকড', desc: 'সিলিং ও ওজন নিশ্চিত', icon: Package },
    { key: 'shipped', label: 'কুরিয়ার হাবে', desc: 'স্টেডফাস্ট ট্রান্সফার', icon: Truck },
    { key: 'out_for_delivery', label: 'ডেলিভারির পথে', desc: 'রাইডার গন্তব্যে রওনা', icon: MapPin },
    { key: 'delivered', label: 'সফল ডেলিভারি', desc: 'গ্রাহকের হাতে হস্তান্তর', icon: ShieldCheck },
  ];

  const statusOrder: OrderStatus[] = ['confirmed', 'packaging', 'shipped', 'out_for_delivery', 'delivered'];
  const currentStepIndex = order ? statusOrder.indexOf(order.orderStatus) : 0;

  return (
    <div className="py-10 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>লাইভ জিপিএস ও কুরিয়ার ট্র্যাকিং</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C3B2B] font-serif">
            রিয়েল-টাইম অর্ডার ট্র্যাকিং
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            আপনার পার্সেলের বর্তমান অবস্থান ও ডেলিভারি স্ট্যাটাস সরাসরি ট্র্যাক করুন
          </p>
        </div>

        {/* Search Bar & Order Switcher */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="অর্ডার আইডি (যেমন: DF-1408) বা ফোন নম্বর লিখুন..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C3B2B]/20 focus:border-[#1C3B2B] font-mono"
              />
            </div>
            <button
              type="submit"
              className="bg-[#1C3B2B] hover:bg-[#152D21] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>ট্র্যাক করুন</span>
            </button>
          </form>

          {/* Quick Select from existing orders */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-100 overflow-x-auto text-xs">
            <span className="text-stone-500 font-medium shrink-0">দ্রুত নির্বাচন:</span>
            {orders.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchInput(o.id);
                  setCurrentTrackingOrderId(o.id);
                }}
                className={`px-3 py-1 rounded-lg font-mono font-bold transition-all shrink-0 ${
                  order?.id === o.id
                    ? 'bg-[#1C3B2B] text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                #{o.id} ({o.orderStatus})
              </button>
            ))}
          </div>
        </div>

        {order ? (
          <div className="space-y-6">
            
            {/* Main Order Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-8">
              
              {/* Top Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-[#1C3B2B] font-mono">
                      #{order.id}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      order.orderStatus === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.orderStatus === 'out_for_delivery'
                        ? 'bg-blue-100 text-blue-800 animate-pulse'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.orderStatus === 'delivered' ? 'ডেলিভারি সম্পন্ন' : 
                       order.orderStatus === 'out_for_delivery' ? 'ডেলিভারির পথে (Live)' : 
                       order.orderStatus === 'shipped' ? 'কুরিয়ারে হস্তান্তর' :
                       order.orderStatus === 'packaging' ? 'প্যাকিং চলছে' : 'অর্ডার গৃহীত'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    অর্ডারের সময়: {order.date} • পেমেন্ট: {order.paymentMethod.toUpperCase()} ({order.paymentStatus === 'paid' ? 'পরিশোধিত' : 'ক্যাশ অন ডেলিভারি'})
                  </p>
                </div>

                {/* Real-time simulation action button */}
                <div className="flex items-center gap-2">
                  {order.orderStatus !== 'delivered' && (
                    <button
                      onClick={handleSimulateNextStep}
                      disabled={isSimulating}
                      className="bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                      title="পরবর্তী ধাপে এগিয়ে লাইভ ট্র্যাকিং পরীক্ষা করুন"
                    >
                      <Play className={`w-3.5 h-3.5 fill-amber-600 ${isSimulating ? 'animate-spin' : ''}`} />
                      <span>সিমুলেট করুন (পরবর্তী ধাপ)</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => reorderItems(order)}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-all"
                  >
                    পুনরায় অর্ডার
                  </button>
                </div>
              </div>

              {/* 5-Step Visual Stepper Bar */}
              <div className="py-4">
                <div className="relative">
                  {/* Connecting line */}
                  <div className="absolute top-5 left-4 right-4 h-1 bg-stone-200 -z-0">
                    <div 
                      className="h-full bg-emerald-600 transition-all duration-500"
                      style={{ 
                        width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` 
                      }}
                    />
                  </div>

                  {/* Steps */}
                  <div className="relative z-10 flex justify-between">
                    {steps.map((s, index) => {
                      const Icon = s.icon;
                      const isCompleted = index <= currentStepIndex;
                      const isCurrent = index === currentStepIndex;

                      return (
                        <div key={s.key} className="flex flex-col items-center text-center max-w-[5.5rem] sm:max-w-[7rem]">
                          <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              isCompleted
                                ? 'bg-emerald-600 text-white shadow-md ring-4 ring-emerald-50'
                                : 'bg-stone-100 text-stone-400 border border-stone-300'
                            } ${isCurrent ? 'scale-110 ring-emerald-200 ring-4' : ''}`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-xs font-bold mt-2.5 leading-snug ${
                            isCurrent ? 'text-emerald-800' : isCompleted ? 'text-[#1C3B2B]' : 'text-stone-400'
                          }`}>
                            {s.label}
                          </span>
                          <span className="hidden sm:block text-[10px] text-stone-500 mt-0.5 leading-tight">
                            {s.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Courier & Rider Dispatch Panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-emerald-700" />
                    <h3 className="font-bold text-sm text-[#1C3B2B]">
                      কুরিয়ার পার্টনার: {order.courierDetails.partner} Logistics
                    </h3>
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-600">
                    <p className="flex items-center gap-2">
                      <span className="text-stone-400">কনসাইনমেন্ট নম্বর:</span>
                      <span className="font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-stone-200">
                        {order.courierDetails.consignmentId}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-stone-400">মোট পার্সেল ওজন:</span>
                      <span className="font-bold text-stone-800">{order.totalWeightKg} কেজি</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-stone-400">প্রত্যাশিত ডেলিভারি:</span>
                      <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        {order.courierDetails.estimatedDeliveryDate}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3 md:border-l md:border-stone-200 md:pl-5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-rose-600" />
                    <h3 className="font-bold text-sm text-[#1C3B2B]">
                      ডেলিভারি ঠিকানা ও রাইডার
                    </h3>
                  </div>
                  <div className="space-y-1 text-xs text-stone-600">
                    <p className="font-bold text-stone-800">{order.customerName}</p>
                    <p>{order.customerAddress}</p>
                    <p className="text-stone-500 font-mono">{order.customerPhone}</p>
                    {order.courierDetails.riderName && (
                      <div className="pt-2 flex items-center justify-between border-t border-stone-200 mt-2">
                        <span className="text-[11px] text-emerald-800 font-semibold">
                          🛵 রাইডার: {order.courierDetails.riderName}
                        </span>
                        <a 
                          href={`tel:${order.courierDetails.riderPhone || '01842078717'}`}
                          className="text-xs text-emerald-700 hover:underline font-bold flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" /> কল করুন
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Items in this Order */}
              <div>
                <h4 className="font-bold text-sm text-[#1C3B2B] mb-3">
                  অর্ডারকৃত পণ্যের তালিকা ({order.items.length}টি আইটেম)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {order.items.map((item) => (
                    <div 
                      key={item.product.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-bold text-stone-800 truncate">{item.product.name}</p>
                        <p className="text-stone-500">{item.product.packageSize} • পরিমাণ: {item.quantity}টি</p>
                        <p className="font-semibold text-stone-800 mt-0.5">৳ {item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Tracking Activity Logs */}
              <div>
                <h4 className="font-bold text-sm text-[#1C3B2B] mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span>ট্র্যাকিং হিস্টোরি ও কার্যক্রম লগ</span>
                </h4>
                <div className="space-y-4 border-l-2 border-emerald-500/40 ml-3 pl-4">
                  {order.trackingHistory.slice().reverse().map((log, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                      <div className="text-xs">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="font-bold text-stone-800">{log.title}</span>
                          <span className="text-[11px] text-stone-400 font-mono">{log.time}</span>
                        </div>
                        <p className="text-stone-600 mt-0.5">{log.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-6 space-y-3">
            <p className="text-stone-500 font-medium">কোনো অর্ডার পাওয়া যায়নি!</p>
            <button
              onClick={() => setActiveTab('shop')}
              className="text-xs font-bold text-[#1C3B2B] underline"
            >
              ক্যাটালগ থেকে পণ্য ক্রয় করুন
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
