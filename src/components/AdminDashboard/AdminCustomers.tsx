import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  Award, 
  ShoppingBag, 
  Calendar,
  DollarSign
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminCustomer } from '../../types';

export const AdminCustomers: React.FC = () => {
  const { customers } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'VIP' | 'Active'>('all');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSpentAll = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const vipCount = customers.filter((c) => c.status === 'VIP').length;
  const avgOrderValue = totalSpentAll / Math.max(1, customers.reduce((sum, c) => sum + c.totalOrders, 0));

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Customer CRM</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered and guest checkout customer profiles, loyalty tier, and lifetime value
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">Total Registered Customers</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{customers.length}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">100% phone verified</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">VIP & Loyal Buyers</span>
          <p className="text-2xl font-black text-[#6366F1] mt-1">{vipCount} VIPs</p>
          <p className="text-[11px] text-slate-400 mt-0.5">3+ completed orders</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">Avg. Order Value</span>
          <p className="text-2xl font-black text-slate-900 mt-1">৳ {Math.round(avgOrderValue).toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Per successful transaction</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name, phone, email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#6366F1] outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            All ({customers.length})
          </button>
          <button
            onClick={() => setStatusFilter('VIP')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              statusFilter === 'VIP'
                ? 'bg-[#6366F1] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            VIP Members
          </button>
          <button
            onClick={() => setStatusFilter('Active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              statusFilter === 'Active'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Active
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Lifetime Spent</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#EDE9FE] text-[#6366F1] font-bold flex items-center justify-center shrink-0">
                        {customer.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{customer.name}</p>
                        <p className="text-[11px] text-slate-400">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">{customer.phone}</p>
                    {customer.email && (
                      <p className="text-[11px] text-slate-400">{customer.email}</p>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900">{customer.totalOrders}</span> orders
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    ৳ {customer.totalSpent.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      customer.status === 'VIP'
                        ? 'bg-[#EDE9FE] text-[#6366F1] border border-[#DDD6FE]'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-400 text-[11px]">
                    {customer.joinedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
