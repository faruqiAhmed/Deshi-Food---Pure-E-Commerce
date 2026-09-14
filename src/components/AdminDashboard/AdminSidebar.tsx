import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  LayoutGrid, 
  Users, 
  Boxes, 
  Ticket, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Store,
  Leaf,
  X
} from 'lucide-react';
import { AdminSubTab } from '../../types';
import { useStore } from '../../context/StoreContext';

interface AdminSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const { adminSubTab, setAdminSubTab, setActiveTab, orders } = useStore();

  const pendingCount = orders.filter(
    (o) => o.orderStatus === 'pending' || o.orderStatus === 'confirmed' || o.orderStatus === 'processing'
  ).length;

  const menuItems: { id: AdminSubTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingCount > 0 ? pendingCount : 12 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: LayoutGrid },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'coupons', label: 'Coupons', icon: Ticket },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="p-5 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1]">
                <Leaf className="w-6 h-6 fill-[#6366F1]/20 stroke-[#6366F1]" />
              </div>
              <div>
                <h1 className="font-extrabold text-lg text-slate-900 leading-tight">Deshi Food</h1>
                <p className="text-[11px] font-medium text-slate-400">Pure • Healthy • Traditional</p>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminSubTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setAdminSubTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#6366F1] text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span 
                      className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
                        isActive 
                          ? 'bg-white/25 text-white' 
                          : 'bg-[#EDE9FE] text-[#6366F1]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Card matching screenshot */}
          <div className="mt-auto p-4">
            <div className="bg-[#FAF5FF] border border-[#DDD6FE]/60 rounded-2xl p-4 text-center relative overflow-hidden group">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <Leaf className="w-4 h-4" />
              </div>
              <p className="text-xs font-medium text-slate-700 mb-1 leading-snug">
                Bringing the <strong className="text-purple-900">true taste of Bangladesh</strong> to your doorstep
              </p>
              
              {/* Line Art Landmark Silhouette */}
              <div className="w-full h-8 opacity-30 my-2 flex items-end justify-center gap-1.5 text-purple-900">
                <div className="w-2 h-4 bg-current rounded-t-xs" />
                <div className="w-3 h-7 bg-current rounded-t-sm" />
                <div className="w-4 h-5 bg-current rounded-t-xs" />
                <div className="w-2 h-6 bg-current rounded-t-sm" />
                <div className="w-5 h-8 bg-current rounded-t-sm" />
                <div className="w-2 h-4 bg-current rounded-t-xs" />
              </div>

              {/* View Storefront Link */}
              <button
                onClick={() => setActiveTab('shop')}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-white border border-[#DDD6FE] hover:border-[#6366F1] hover:bg-[#6366F1] hover:text-white text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <Store className="w-3.5 h-3.5" />
                <span>ওয়েবসাইটে ফিরে যান</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
