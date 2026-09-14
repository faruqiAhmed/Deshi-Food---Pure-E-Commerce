import React from 'react';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Users, CreditCard } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminAnalytics: React.FC = () => {
  const { orders, products, customers } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sales & Growth Analytics</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Detailed metrics on sales channel performance, customer retention, and logistics fulfillment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Methods Breakdown */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-base font-bold text-slate-900 mb-4">Payment Methods Share</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>bKash (Instant Payment)</span>
                <span>54%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#E2136E] rounded-full" style={{ width: '54%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Cash on Delivery (COD)</span>
                <span>28%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Nagad</span>
                <span>18%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#F7931E] rounded-full" style={{ width: '18%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Destination Share */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-base font-bold text-slate-900 mb-4">Delivery Geographic Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Dhaka Metro (Same day / 24h)</span>
                <span>68%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#6366F1] rounded-full" style={{ width: '68%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Outside Dhaka (Courier 2-3 days)</span>
                <span>32%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-600 rounded-full" style={{ width: '32%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
