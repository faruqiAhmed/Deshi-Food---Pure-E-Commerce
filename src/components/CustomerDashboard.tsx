import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  User, 
  Plus, 
  ChevronRight, 
  LogIn, 
  LogOut, 
  Smartphone,
  PackageCheck,
  Lock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomerDashboard: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    reorderItems, 
    setCurrentTrackingOrderId, 
    setActiveTab,
    updateUserProfile,
    isLoggedIn,
    setIsLoginModalOpen,
    logout,
    dashboardSubTab: activeSubTab,
    setDashboardSubTab: setActiveSubTab
  } = useStore();

  const [newAddressInput, setNewAddressInput] = useState('');
  const [newAddressTag, setNewAddressTag] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [newAddressCity, setNewAddressCity] = useState<'Dhaka' | 'Outside Dhaka'>('Dhaka');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

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
        {isLoggedIn ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#1C3B2B] text-[#EAB308] font-bold text-2xl flex items-center justify-center shadow-md shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C3B2B]">
                    {currentUser.name}
                  </h1>
                  <p className="text-xs text-stone-500 mt-1 font-mono">
                    {currentUser.phone} • {currentUser.email}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    নিবন্ধিত গ্রাহক • সদস্য: {currentUser.joinedDate}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <div>
                <button
                  onClick={logout}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-stone-100 hover:bg-red-50 text-stone-700 hover:text-red-700 border border-stone-200 hover:border-red-200 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                  title="অ্যাকাউন্ট থেকে লগআউট করুন"
                  id="dashboard-header-logout-btn"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>লগআউট</span>
                </button>
              </div>

            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-300/80 shadow-xs relative overflow-hidden bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-left">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1C3B2B] text-amber-300 flex items-center justify-center text-2xl font-bold shadow-md shrink-0">
                  <Smartphone className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-black text-[#1C3B2B]">
                    অ্যাকাউন্টে লগইন করুন
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                    পূর্বের অর্ডার হিস্ট্রি দেখতে, ডেলিভারি ট্র্যাক করতে এবং দ্রুত কেনাকাটা সম্পন্ন করতে আপনার মোবাইল নম্বর দিয়ে সহজে লগইন করুন।
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="w-full sm:w-auto bg-[#1C3B2B] hover:bg-[#142a1e] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 text-sm"
                id="dashboard-login-btn"
              >
                <LogIn className="w-4 h-4 text-amber-300" />
                <span>মোবাইল ওটিপি দিয়ে লগইন</span>
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto text-sm font-bold">
          <button
            onClick={() => setActiveSubTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'orders'
                ? 'bg-[#1C3B2B] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>পূর্বের অর্ডার হিস্টোরি {isLoggedIn ? `(${orders.length})` : ''}</span>
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

        {/* Orders History Tab */}
        {activeSubTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1C3B2B]">
              আপনার পূর্বের অর্ডার সমূহ
            </h3>

            {!isLoggedIn ? (
              <div 
                className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-emerald-200 shadow-xs space-y-4 max-w-lg mx-auto"
                id="orders-login-gate"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#1C3B2B] flex items-center justify-center mx-auto shadow-inner">
                  <PackageCheck className="w-8 h-8 text-[#1C3B2B]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-extrabold text-[#1C3B2B]">
                    অর্ডার দেখতে লগইন আবশ্যক
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    আপনার পূর্বের অর্ডার সমূহ শুধুমাত্র লগইন করা থাকলে দেখা যাবে। আপনার মোবাইল নম্বর ও দ্রুত ওটিপি (OTP) দিয়ে অ্যাকাউন্টে লগইন করুন।
                  </p>
                </div>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full py-3.5 px-6 bg-[#1C3B2B] hover:bg-[#142a1e] text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  id="dashboard-gate-login-btn"
                >
                  <LogIn className="w-4 h-4 text-amber-300" />
                  <span>মোবাইল ওটিপি দিয়ে লগইন করুন</span>
                </button>
              </div>
            ) : orders.length === 0 ? (
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
