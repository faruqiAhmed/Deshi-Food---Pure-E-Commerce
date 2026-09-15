import React, { useState } from 'react';
import { Save, Store, Truck, Phone, Mail, ShieldCheck } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'দেশি ফুড (Deshi Food)',
    supportPhone: '01751279584',
    supportEmail: 'contact@deshifood.com',
    warehouseAddress: 'বাড়ি নং ৪২, রোড নং ৭, সেক্টর ৪, উত্তরা, ঢাকা-১২৩০',
    dhakaDeliveryFee: 60,
    outsideDeliveryFee: 120,
    freeDeliveryThreshold: 2500,
    bkashMerchantNumber: '01751279584',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Store Settings</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure storefront contact info, default delivery fees, and automated courier policies
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Store className="w-4 h-4 text-[#6366F1]" />
            <span>সাধারণ স্টোর তথ্য</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">স্টোরের নাম</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">হেল্পলাইন নম্বর</label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">সেন্ট্রাল ওয়্যারহাউস ঠিকানা</label>
              <input
                type="text"
                value={settings.warehouseAddress}
                onChange={(e) => setSettings({ ...settings, warehouseAddress: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>ডেলিভারি ফি ও শিপিং পলিসি</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ঢাকা সিটির ভেতর (৳)</label>
              <input
                type="number"
                value={settings.dhakaDeliveryFee}
                onChange={(e) => setSettings({ ...settings, dhakaDeliveryFee: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ঢাকার বাইরে (৳)</label>
              <input
                type="number"
                value={settings.outsideDeliveryFee}
                onChange={(e) => setSettings({ ...settings, outsideDeliveryFee: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ফ্রি ডেলিভারি ন্যূনতম কেনাকাটা (৳)</label>
              <input
                type="number"
                value={settings.freeDeliveryThreshold}
                onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {saved ? (
            <span className="text-xs font-bold text-emerald-600 animate-pulse">
              ✓ সেটিংস সফলভাবে আপডেট হয়েছে!
            </span>
          ) : <span />}

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>পরিবর্তন সংরক্ষণ করুন</span>
          </button>
        </div>
      </form>
    </div>
  );
};
