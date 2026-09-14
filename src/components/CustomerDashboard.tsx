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
  Lock,
  Pencil,
  Trash2,
  Home,
  Building2,
  CheckCircle2,
  X
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

  // Editing state for saved addresses
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [editAddressTag, setEditAddressTag] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [editAddressCity, setEditAddressCity] = useState<'Dhaka' | 'Outside Dhaka'>('Dhaka');
  const [editAddressInput, setEditAddressInput] = useState('');

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
    setFeedbackMsg('নতুন ঠিকানা সফলভাবে যোগ করা হয়েছে!');
    setTimeout(() => setFeedbackMsg(''), 3500);
  };

  const handleStartEdit = (addr: { id: string; tag: 'Home' | 'Office' | 'Other'; address: string; city: 'Dhaka' | 'Outside Dhaka' }) => {
    setEditingAddressId(addr.id);
    setEditAddressTag(addr.tag);
    setEditAddressCity(addr.city);
    setEditAddressInput(addr.address);
    setShowAddAddress(false);
  };

  const handleCancelEdit = () => {
    setEditingAddressId(null);
  };

  const handleSaveEdit = (e: React.FormEvent, addrId: string) => {
    e.preventDefault();
    if (!editAddressInput.trim()) return;

    const updated = currentUser.savedAddresses.map((a) => {
      if (a.id === addrId) {
        return {
          ...a,
          tag: editAddressTag,
          city: editAddressCity,
          address: editAddressInput.trim(),
        };
      }
      return a;
    });

    updateUserProfile({ savedAddresses: updated });
    setEditingAddressId(null);
    setFeedbackMsg('ঠিকানা সফলভাবে আপডেট করা হয়েছে!');
    setTimeout(() => setFeedbackMsg(''), 3500);
  };

  const handleDeleteAddress = (addrId: string) => {
    if (window.confirm('আপনি কি এই ঠিকানাটি নিশ্চিতভাবে মুছে ফেলতে চান?')) {
      const updated = currentUser.savedAddresses.filter((a) => a.id !== addrId);
      updateUserProfile({ savedAddresses: updated });
      if (editingAddressId === addrId) {
        setEditingAddressId(null);
      }
      setFeedbackMsg('ঠিকানা সফলভাবে মুছে ফেলা হয়েছে।');
      setTimeout(() => setFeedbackMsg(''), 3500);
    }
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
        <div className="flex items-center gap-2.5 border-b border-stone-200 pb-2.5 overflow-x-auto text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveSubTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer border ${
              activeSubTab === 'orders'
                ? 'bg-[#1C3B2B] text-white border-[#1C3B2B] shadow-xs'
                : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400 hover:bg-stone-50 shadow-2xs'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>পূর্বের অর্ডার হিস্টোরি {isLoggedIn ? `(${orders.length})` : ''}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('addresses')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer border ${
              activeSubTab === 'addresses'
                ? 'bg-[#1C3B2B] text-white border-[#1C3B2B] shadow-xs'
                : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400 hover:bg-stone-50 shadow-2xs'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>সংরক্ষিত ঠিকানা সমূহ</span>
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
            {/* Feedback notification toast */}
            {feedbackMsg && (
              <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold shadow-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feedbackMsg}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFeedbackMsg('')}
                  className="p-1 hover:bg-emerald-100 rounded-md text-emerald-700 cursor-pointer"
                  aria-label="Close notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-[#1C3B2B] flex items-center gap-2">
                  <span>সংরক্ষিত ঠিকানা সমূহ</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                    {currentUser.savedAddresses.length}টি
                  </span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  আপনার সংরক্ষিত ডেলিভারি ঠিকানা সহজে এডিট, আপডেট বা নতুন ঠিকানা যোগ করুন।
                </p>
              </div>

              <button
                onClick={() => {
                  setShowAddAddress(!showAddAddress);
                  setEditingAddressId(null);
                }}
                className="bg-[#1C3B2B] hover:bg-[#152D21] text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ঠিকানা যোগ করুন</span>
              </button>
            </div>

            {/* Add Address Form */}
            {showAddAddress && (
              <form onSubmit={handleAddAddress} className="bg-white p-5 rounded-2xl border-2 border-[#1C3B2B]/30 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h4 className="font-bold text-sm text-[#1C3B2B] flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-600" />
                    <span>নতুন ডেলিভারি ঠিকানা যোগ করুন</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(false)}
                    className="text-stone-400 hover:text-stone-600 p-1 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">ঠিকানার ধরন (লেবেল)</label>
                    <select
                      value={newAddressTag}
                      onChange={(e) => setNewAddressTag(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C3B2B]/20"
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
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C3B2B]/20"
                    >
                      <option value="Dhaka">ঢাকা শহর</option>
                      <option value="Outside Dhaka">ঢাকার বাইরে</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">পূর্ণ ঠিকানা *</label>
                  <input
                    type="text"
                    required
                    placeholder="বাড়ি নং, ফ্ল্যাট নং, রোড নং, এলাকা / থানা..."
                    value={newAddressInput}
                    onChange={(e) => setNewAddressInput(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C3B2B]/20"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(false)}
                    className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-lg font-medium cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs bg-[#1C3B2B] hover:bg-[#152D21] text-white font-bold rounded-lg cursor-pointer transition-colors shadow-2xs"
                  >
                    ঠিকানা সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            )}

            {/* Empty state if no addresses */}
            {currentUser.savedAddresses.length === 0 && !showAddAddress && (
              <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-stone-700 text-sm">কোনো সংরক্ষিত ঠিকানা পাওয়া যায়নি</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  আপনার বাসার বা অফিসের ঠিকানা সংরক্ষণ করে রাখলে চেকআউটে প্রতিবার নতুন করে ঠিকানা লিখতে হবে না।
                </p>
                <button
                  type="button"
                  onClick={() => setShowAddAddress(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1C3B2B] text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-[#152D21] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>প্রথম ঠিকানা যোগ করুন</span>
                </button>
              </div>
            )}

            {/* Addresses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentUser.savedAddresses.map((addr) => {
                const isEditing = editingAddressId === addr.id;

                if (isEditing) {
                  return (
                    <form
                      key={addr.id}
                      onSubmit={(e) => handleSaveEdit(e, addr.id)}
                      className="bg-white p-5 rounded-2xl border-2 border-amber-400 shadow-md flex flex-col justify-between space-y-3 relative"
                    >
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                          <Pencil className="w-3.5 h-3.5 text-amber-600" />
                          <span>ঠিকানা এডিট করুন</span>
                        </span>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="text-stone-400 hover:text-stone-600 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold text-stone-700 mb-0.5">লেবেল</label>
                            <select
                              value={editAddressTag}
                              onChange={(e) => setEditAddressTag(e.target.value as any)}
                              className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                            >
                              <option value="Home">বাসা (Home)</option>
                              <option value="Office">অফিস (Office)</option>
                              <option value="Other">অন্যান্য (Other)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-stone-700 mb-0.5">শহর / এলাকা</label>
                            <select
                              value={editAddressCity}
                              onChange={(e) => setEditAddressCity(e.target.value as any)}
                              className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                            >
                              <option value="Dhaka">ঢাকা শহর</option>
                              <option value="Outside Dhaka">ঢাকার বাইরে</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-0.5">পূর্ণ ঠিকানা *</label>
                          <textarea
                            required
                            rows={2}
                            value={editAddressInput}
                            onChange={(e) => setEditAddressInput(e.target.value)}
                            className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                            placeholder="বাড়ি নং, রোড নং, এলাকা / থানা..."
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-lg font-medium cursor-pointer"
                        >
                          বাতিল
                        </button>
                        <button
                          type="submit"
                          className="px-3.5 py-1.5 text-xs bg-[#1C3B2B] hover:bg-[#152D21] text-white font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>আপডেট করুন</span>
                        </button>
                      </div>
                    </form>
                  );
                }

                return (
                  <div
                    key={addr.id}
                    className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                            {addr.tag === 'Home' ? (
                              <Home className="w-3.5 h-3.5 text-emerald-700" />
                            ) : addr.tag === 'Office' ? (
                              <Building2 className="w-3.5 h-3.5 text-blue-700" />
                            ) : (
                              <MapPin className="w-3.5 h-3.5 text-amber-700" />
                            )}
                            <span>{addr.tag === 'Home' ? 'বাসা' : addr.tag === 'Office' ? 'অফিস' : 'অন্যান্য'}</span>
                          </span>
                          <span className="text-xs text-stone-500 font-medium">
                            {addr.city === 'Dhaka' ? 'ঢাকা শহর' : 'ঢাকার বাইরে'}
                          </span>
                        </div>

                        {/* Edit & Delete Action Buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(addr)}
                            className="px-2.5 py-1 text-xs font-bold text-stone-700 hover:text-[#1C3B2B] bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                            title="ঠিকানা এডিট করুন"
                          >
                            <Pencil className="w-3 h-3 text-amber-600" />
                            <span>এডিট</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="ঠিকানা মুছে ফেলুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-stone-800 mt-3.5 leading-relaxed">
                        {addr.address}
                      </p>
                    </div>

                    <p className="text-[11px] text-emerald-700 font-medium pt-2.5 border-t border-stone-100 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>চেকআউটে এক ক্লিকে নির্বাচনযোগ্য</span>
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
