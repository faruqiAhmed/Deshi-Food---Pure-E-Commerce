import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Store, 
  Menu, 
  CheckCircle2, 
  PackageCheck, 
  AlertTriangle,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface AdminTopHeaderProps {
  onOpenMobileMenu: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const AdminTopHeader: React.FC<AdminTopHeaderProps> = ({
  onOpenMobileMenu,
  searchQuery,
  setSearchQuery,
}) => {
  const { setActiveTab, setAdminSubTab, orders } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar matching screenshot */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, products, customers..."
            className="w-full pl-10 pr-14 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200/80 focus:border-[#6366F1] rounded-xl text-sm text-slate-800 placeholder-slate-400 transition-all outline-hidden focus:ring-2 focus:ring-[#6366F1]/10"
          />
          <kbd className="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs">
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* Right: Actions, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Quick View Store Link */}
        <button
          onClick={() => setActiveTab('shop')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6366F1] bg-[#EDE9FE]/70 hover:bg-[#EDE9FE] rounded-lg transition-colors cursor-pointer"
        >
          <Store className="w-3.5 h-3.5" />
          <span>ওয়েবসাইট দেখুন</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl relative transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">নোটিফিকেশন (৩ টি নতুন)</span>
                <span className="text-[10px] text-[#6366F1] font-semibold cursor-pointer">সব পড়া হয়েছে</span>
              </div>
              <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                <div 
                  onClick={() => { setAdminSubTab('orders'); setShowNotifications(false); }}
                  className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer flex items-start gap-3 transition-colors"
                >
                  <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg shrink-0 mt-0.5">
                    <PackageCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">নতুন bKash অর্ডার তৈরি হয়েছে</p>
                    <p className="text-[11px] text-slate-500">অর্ডার #DF-10086 সফলভাবে পেমেন্ট হয়েছে</p>
                    <span className="text-[10px] text-slate-400">১০ মিনিট আগে</span>
                  </div>
                </div>

                <div 
                  onClick={() => { setAdminSubTab('inventory'); setShowNotifications(false); }}
                  className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer flex items-start gap-3 transition-colors"
                >
                  <div className="p-1.5 bg-rose-100 text-rose-600 rounded-lg shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">আজওয়া খেজুরের স্টক কম</p>
                    <p className="text-[11px] text-slate-500">মাত্র ৫ টি বাকি আছে, দ্রুত রিস্টক করুন</p>
                    <span className="text-[10px] text-slate-400">২৫ মিনিট আগে</span>
                  </div>
                </div>

                <div 
                  onClick={() => { setAdminSubTab('inventory'); setShowNotifications(false); }}
                  className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer flex items-start gap-3 transition-colors"
                >
                  <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">সুন্দরবনের মধুর স্টক কম</p>
                    <p className="text-[11px] text-slate-500">মাত্র ৮ টি বাকি আছে</p>
                    <span className="text-[10px] text-slate-400">১ ঘণ্টা আগে</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown matching screenshot */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1 sm:px-2 py-1 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#6366F1] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              OF
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">Omar Faruq</p>
              <p className="text-[11px] font-medium text-slate-400">Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">Omar Faruq</p>
                <p className="text-[11px] text-slate-500">faruqdeveloper@gmail.com</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { setAdminSubTab('settings'); setShowProfileMenu(false); }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>প্রোফাইল ও সেটিংস</span>
                </button>
                <button
                  onClick={() => { setActiveTab('shop'); setShowProfileMenu(false); }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <Store className="w-3.5 h-3.5 text-slate-400" />
                  <span>ওয়েবসাইটে ফিরে যান</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
