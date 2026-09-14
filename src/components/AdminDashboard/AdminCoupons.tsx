import React, { useState } from 'react';
import { Ticket, Plus, Check, Copy, Trash2 } from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState([
    { code: 'DESHI50', discount: 50, type: 'flat', minOrder: 500, expiry: '31 Dec, 2025', active: true, usageCount: 84 },
    { code: 'FREESHIP', discount: 60, type: 'shipping', minOrder: 1500, expiry: '30 Nov, 2025', active: true, usageCount: 142 },
    { code: 'EID2025', discount: 100, type: 'flat', minOrder: 2000, expiry: '15 Oct, 2025', active: true, usageCount: 65 },
    { code: 'WELCOME10', discount: 10, type: 'percent', minOrder: 800, expiry: '31 Dec, 2025', active: false, usageCount: 29 },
  ]);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleActive = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Coupons & Promo Codes</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Create and monitor promotional vouchers applied during customer checkout
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coupons.map((coupon) => (
          <div key={coupon.code} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  coupon.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  {coupon.active ? 'Active' : 'Expired'}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{coupon.usageCount} uses</span>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                <span className="font-mono font-black text-sm text-[#6366F1]">{coupon.code}</span>
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="p-1 hover:bg-slate-200 rounded text-slate-500 transition-colors cursor-pointer"
                  title="Copy code"
                >
                  {copiedCode === coupon.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <p className="text-xs font-bold text-slate-800 mt-3">
                {coupon.type === 'percent' ? `${coupon.discount}% Discount` : `৳ ${coupon.discount} Flat Discount`}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Min. order: ৳ {coupon.minOrder}</p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">Valid till {coupon.expiry}</span>
              <button
                onClick={() => handleToggleActive(coupon.code)}
                className="text-[11px] font-bold text-[#6366F1] hover:underline cursor-pointer"
              >
                {coupon.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
