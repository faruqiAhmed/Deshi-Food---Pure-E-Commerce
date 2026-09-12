import React, { useState } from 'react';
import { 
  Award, 
  Clock, 
  MapPin, 
  ShoppingBag, 
  Gift, 
  ArrowRight, 
  Check, 
  User, 
  Sparkles, 
  CreditCard,
  Plus,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomerDashboard: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    redeemVoucher, 
    reorderItems, 
    setCurrentTrackingOrderId, 
    setActiveTab,
    updateUserProfile
  } = useStore();

  const [activeSubTab, setActiveSubTab] = useState<'loyalty' | 'orders' | 'addresses'>('loyalty');
  const [newAddressInput, setNewAddressInput] = useState('');
  const [newAddressTag, setNewAddressTag] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [newAddressCity, setNewAddressCity] = useState<'Dhaka' | 'Outside Dhaka'>('Dhaka');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const nextTierTarget = 5000;
  const progressToNextTier = Math.min(100, Math.round((currentUser.totalSpent / nextTierTarget) * 100));

  const handleRedeem = (rewardId: string) => {
    const success = redeemVoucher(rewardId);
    if (success) {
      setFeedbackMsg('ভাউচার সফলভাবে সক্রিয় হয়েছে! চেকআউটে স্বয়ংক্রিয়ভাবে ছাড় প্রযোজ্য হবে।');
      setTimeout(() => setFeedbackMsg(''), 4000);
    } else {
      setFeedbackMsg('পর্যাপ্ত লয়ালটি পয়েন্ট নেই!');
      setTimeout(() => setFeedbackMsg(''), 3000);
    }
  };

  const handleTrack = (orderId: string) => {
    setCurrentTrackingOrderId(orderId);
    setActiveTab('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressInput.trim()) return;

    const newAddr = {
      id: `addr-${Date.now()}`,
      tag: newAddressTag,
      address: newAddressInput.trim(),
      city: newAddressCity,
    };

    updateUserProfile({
      savedAddresses: [...currentUser.savedAddresses, newAddr],
    });

    setNewAddressInput('');
    setShowAddAddress(false);
  };

  return (
    <div className="py-10 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Customer Profile Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1C3B2B] text-[#EAB308] font-bold text-2xl flex items-center justify-center shadow-md">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C3B2B]">
                    {currentUser.name}
                  </h1>
                  <span className="bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>{currentUser.tier} মেম্বার</span>
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  {currentUser.email} • {currentUser.phone}
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  নিবন্ধিত সদস্য: {currentUser.joinedDate}
                </p>
              </div>
            </div>

            {/* Loyalty Quick Stats Box */}
            <div className="flex items-center gap-3 bg-amber-50/80 p-4 rounded-2xl border border-amber-200 shrink-0">
              <div className="p-3 bg-[#D97706] text-white rounded-xl shadow-xs">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-900 block">
                  মোট রিওয়ার্ড পয়েন্ট
                </span>
                <span className="text-2xl font-black text-amber-950 font-mono">
                  {currentUser.loyaltyPoints} পয়েন্ট
                </span>
                <span className="text-[11px] text-amber-800 block">
                  মূল্য: <strong>৳{currentUser.loyaltyPoints}</strong> সমপরিমাণ ছাড়
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto text-sm font-bold">
          <button
            onClick={() => setActiveSubTab('loyalty')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'loyalty'
                ? 'bg-[#1C3B2B] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>লয়ালটি রিওয়ার্ডস ও ভাউচার</span>
          </button>

          <button
            onClick={() => setActiveSubTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'orders'
                ? 'bg-[#1C3B2B] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>পূর্বের অর্ডার হিস্টোরি ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('addresses')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'addresses'
                ? 'bg-[#1C3B2B] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>সংরক্ষিত ডেলিভারি ঠিকানা</span>
          </button>
        </div>

        {feedbackMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Tab 1: Loyalty & Rewards */}
        {activeSubTab === 'loyalty' && (
          <div className="space-y-6">
            
            {/* Tier Progress Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-[#1C3B2B]">
                    টিয়ার অগ্রগতি: {currentUser.tier} থেকে Gold টিয়ারে আপগ্রেড
                  </h3>
                  <p className="text-xs text-stone-500">
                    আর মাত্র ৳{Math.max(0, nextTierTarget - currentUser.totalSpent)} টাকার পণ্য কিনলেই গোল্ড মেম্বারশিপ এবং বিশেষ ছাড় আনলক হবে!
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-stone-100 text-stone-800 px-3 py-1 rounded-full">
                  ব্যয়: ৳{currentUser.totalSpent} / ৳{nextTierTarget}
                </span>
              </div>

              <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-[#D97706] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressToNextTier}%` }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200">
                  <span className="block text-stone-400 font-medium">ব্রোঞ্জ</span>
                  <span className="font-bold text-stone-700">৳০+ ব্যয়</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-300">
                  <span className="block text-amber-700 font-bold">সিলভার (বর্তমান)</span>
                  <span className="font-bold text-amber-900">৳২,০০০+ ব্যয়</span>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200">
                  <span className="block text-stone-400 font-medium">গোল্ড</span>
                  <span className="font-bold text-stone-700">৳৫,০০০+ ব্যয়</span>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200">
                  <span className="block text-stone-400 font-medium">প্লাটিনাম</span>
                  <span className="font-bold text-stone-700">৳১০,০০০+ ব্যয়</span>
                </div>
              </div>
            </div>

            {/* Redeemable Loyalty Vouchers */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1C3B2B] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>আপনার জন্য উপলব্ধ রিওয়ার্ড ভাউচার</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentUser.activeRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      reward.isRedeemed
                        ? 'bg-stone-50 border-stone-200 opacity-60'
                        : 'bg-white border-amber-200 shadow-xs hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md">
                          {reward.code}
                        </span>
                        <span className="text-xs text-stone-400">
                          মেয়াদ: {reward.expiryDate}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[#1C3B2B] mt-2">
                        {reward.title}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        প্রয়োজনীয় পয়েন্ট: {reward.pointsRequired} পয়েন্ট (মূল্য: ৳{reward.discountTaka} ছাড়)
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-800">
                        {reward.isRedeemed ? 'অলরেডি সক্রিয়' : `${reward.pointsRequired} পয়েন্ট খরচ হবে`}
                      </span>

                      <button
                        onClick={() => handleRedeem(reward.id)}
                        disabled={reward.isRedeemed || currentUser.loyaltyPoints < reward.pointsRequired}
                        className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                          reward.isRedeemed
                            ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                            : currentUser.loyaltyPoints < reward.pointsRequired
                            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                            : 'bg-[#D97706] hover:bg-[#B45309] text-white shadow-xs'
                        }`}
                      >
                        {reward.isRedeemed ? 'সক্রিয়কৃত' : 'পয়েন্ট দিয়ে রিডিম করুন'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How Loyalty Program Works */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#EFEAE1] space-y-3">
              <h4 className="font-bold text-sm text-[#1C3B2B]">
                💡 Deshi Food লয়ালটি রিওয়ার্ডস কিভাবে কাজ করে?
              </h4>
              <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
                <li>প্রতি <strong>৳২০ টাকার অর্ডারে ১টি লয়ালটি পয়েন্ট</strong> স্বয়ংক্রিয়ভাবে জমা হয়।</li>
                <li>১টি লয়ালটি পয়েন্ট = <strong>৳১ টাকা সরাসরি নগদ ছাড়</strong> পরবর্তী যেকোনো অর্ডারে।</li>
                <li>চেকআউটের সময় স্লাইডারের মাধ্যমে সরাসরি পয়েন্ট ব্যবহার করে মূল্য ছাড় পেতে পারেন।</li>
                <li>গোল্ড ও প্লাটিনাম মেম্বাররা ফ্রি শিপিং ও বিশেষ উপহার সামগ্রী লাভ করেন।</li>
              </ul>
            </div>

          </div>
        )}

        {/* Tab 2: Orders History */}
        {activeSubTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1C3B2B]">
              আপনার পূর্বের অর্ডার সমূহ
            </h3>

            {orders.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-stone-200">
                <p className="text-stone-500 text-sm">কোনো অর্ডার হিস্টোরি পাওয়া যায়নি!</p>
              </div>
            ) : (
              orders.map((o) => (
                <div
                  key={o.id}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-base text-[#1C3B2B]">
                          #{o.id}
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          o.orderStatus === 'delivered' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {o.orderStatus === 'delivered' ? 'ডেলিভারি সম্পন্ন' : 'প্রক্রিয়াধীন'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{o.date}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-extrabold text-[#1C3B2B]">৳ {o.total}</span>
                      <span className="block text-[11px] text-stone-400 uppercase font-medium">
                        {o.paymentMethod} ({o.paymentStatus === 'paid' ? 'Paid' : 'COD'})
                      </span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="flex items-center gap-3 overflow-x-auto py-1">
                    {o.items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-2 shrink-0 bg-stone-50 p-2 rounded-xl border border-stone-200">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-xs">
                          <p className="font-bold text-stone-800 truncate max-w-[120px]">{item.product.name}</p>
                          <p className="text-stone-500">{item.quantity}টি • ৳{item.product.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                    <span className="text-stone-500">
                      কুরিয়ার আইডি: <strong className="font-mono text-emerald-700">{o.courierDetails.consignmentId}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTrack(o.id)}
                        className="bg-emerald-50 hover:bg-emerald-100 text-[#1C3B2B] font-bold px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>লাইভ ট্র্যাক</span>
                      </button>

                      <button
                        onClick={() => reorderItems(o)}
                        className="bg-[#1C3B2B] hover:bg-[#152D21] text-white font-bold px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#EAB308]" />
                        <span>পুনরায় অর্ডার</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Saved Delivery Addresses */}
        {activeSubTab === 'addresses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1C3B2B]">
                সংরক্ষিত ঠিকানা সমূহ
              </h3>
              <button
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="bg-[#1C3B2B] hover:bg-[#152D21] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ঠিকানা যোগ করুন</span>
              </button>
            </div>

            {/* Add Address Form */}
            {showAddAddress && (
              <form onSubmit={handleAddAddress} className="bg-white p-5 rounded-2xl border border-stone-300 shadow-xs space-y-3">
                <h4 className="font-bold text-sm text-[#1C3B2B]">নতুন ডেলিভারি ঠিকানা যোগ করুন</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">লেবেল</label>
                    <select
                      value={newAddressTag}
                      onChange={(e) => setNewAddressTag(e.target.value as any)}
                      className="w-full text-xs p-2 bg-stone-50 border rounded-lg"
                    >
                      <option value="Home">বাসা (Home)</option>
                      <option value="Office">অফিস (Office)</option>
                      <option value="Other">অন্যান্য (Other)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">এলাকা / শহর</label>
                    <select
                      value={newAddressCity}
                      onChange={(e) => setNewAddressCity(e.target.value as any)}
                      className="w-full text-xs p-2 bg-stone-50 border rounded-lg"
                    >
                      <option value="Dhaka">ঢাকা শহর</option>
                      <option value="Outside Dhaka">ঢাকার বাইরে</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">পূর্ণ ঠিকানা</label>
                  <input
                    type="text"
                    required
                    placeholder="বাড়ি নং, রোড নং, এলাকা / থানা..."
                    value={newAddressInput}
                    onChange={(e) => setNewAddressInput(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border rounded-lg"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(false)}
                    className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-lg"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs bg-[#1C3B2B] text-white font-bold rounded-lg"
                  >
                    সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            )}

            {/* Addresses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentUser.savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold bg-stone-100 text-stone-800 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#1C3B2B]" />
                        <span>{addr.tag}</span>
                      </span>
                      <span className="text-xs text-stone-500 font-medium">
                        {addr.city === 'Dhaka' ? 'ঢাকা শহর' : 'ঢাকার বাইরে'}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-stone-800 mt-3">
                      {addr.address}
                    </p>
                  </div>

                  <p className="text-[11px] text-emerald-700 font-medium pt-2 border-t border-stone-100">
                    ✓ চেকআউটে এক ক্লিকে নির্বাচনযোগ্য
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
