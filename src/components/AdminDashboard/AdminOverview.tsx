import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  ChevronDown, 
  Eye, 
  ArrowUpRight, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Truck, 
  PackageCheck,
  ChevronRight,
  ExternalLink,
  Plus
} from 'lucide-react';
import { Order, OrderStatus, Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface AdminOverviewProps {
  onSelectOrder: (order: Order) => void;
  onRestockProduct: (product: Product) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ 
  onSelectOrder, 
  onRestockProduct 
}) => {
  const { orders, products, customers, setAdminSubTab, setActiveTab } = useStore();
  const [chartTab, setChartTab] = useState<'sales' | 'orders' | 'customers'>('sales');

  // Real-time computed stats synchronized with store
  const totalSalesAmount = orders.reduce((sum, o) => sum + o.total, 0) + 248750;
  const totalOrdersCount = orders.length + 184;
  const totalCustomersCount = customers.length + 136;
  const totalProductsCount = products.length;

  // Chart data
  const chartDays = [
    { day: 'Sep 12', sales: 32000, orders: 24, customers: 18, height: 40 },
    { day: 'Sep 13', sales: 28500, orders: 21, customers: 15, height: 35 },
    { day: 'Sep 14', sales: 41200, orders: 32, customers: 24, height: 60 },
    { day: 'Sep 15', sales: 36800, orders: 28, customers: 20, height: 50 },
    { day: 'Sep 16', sales: 48900, orders: 38, customers: 29, height: 75 },
    { day: 'Sep 17', sales: 52400, orders: 42, customers: 33, height: 85 },
    { day: 'Sep 18', sales: 62500, orders: 48, customers: 38, height: 95 },
  ];

  // Top selling products
  const topProducts = [
    {
      id: 'df-dates-ajwa',
      name: 'Premium Dates (Ajwa)',
      category: 'Dates & Nuts',
      soldCount: 1245,
      revenue: 48750,
      percentage: 24,
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 'df-honey-500g',
      name: 'Pure Honey (500g)',
      category: 'Honey',
      soldCount: 892,
      revenue: 35600,
      percentage: 18,
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 'df-ghee-1kg',
      name: 'Deshi Ghee (1kg)',
      category: 'Oils & Ghee',
      soldCount: 756,
      revenue: 30240,
      percentage: 15,
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 'df-spices-combo',
      name: 'Spices Combo Pack',
      category: 'Spices',
      soldCount: 624,
      revenue: 24960,
      percentage: 12,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 'df-muri-chanachur',
      name: 'Muri & Chanachur',
      category: 'Snacks',
      soldCount: 512,
      revenue: 18200,
      percentage: 10,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=300',
    },
  ];

  // Low stock products from real inventory
  const lowStockProducts = products
    .filter((p) => (p.stockCount ?? 20) <= 20)
    .slice(0, 4);

  // Status badge styling helper
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Delivered</span>;
      case 'processing':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">Processing</span>;
      case 'confirmed':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#6366F1] border border-[#C7D2FE]">Confirmed</span>;
      case 'shipped':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">Shipped</span>;
      case 'out_for_delivery':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">Out for Delivery</span>;
      case 'pending':
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">Pending</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header with greeting and date range picker matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, Omar! 👋
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-0.5">
            Here's what's happening with your store today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Sep 12, 2025 - Sep 18, 2025</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 2. Top 4 Stat KPI Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Sales</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>12.5%</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              ৳ {totalSalesAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">vs. last 7 days</p>

          {/* Mini Sparkline Chart */}
          <div className="mt-3 h-8 w-full flex items-end gap-1 pt-1">
            {[40, 35, 60, 50, 75, 85, 95].map((val, idx) => (
              <div 
                key={idx} 
                className="flex-1 bg-[#EEF2FF] hover:bg-[#6366F1] rounded-xs transition-colors" 
                style={{ height: `${val}%` }} 
              />
            ))}
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Orders</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>18.2%</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {totalOrdersCount}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">vs. last 7 days</p>

          <div className="mt-3 h-8 w-full flex items-end gap-1 pt-1">
            {[30, 45, 55, 60, 70, 80, 90].map((val, idx) => (
              <div 
                key={idx} 
                className="flex-1 bg-[#EEF2FF] hover:bg-[#6366F1] rounded-xs transition-colors" 
                style={{ height: `${val}%` }} 
              />
            ))}
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Customers</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>14.6%</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {totalCustomersCount}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">vs. last 7 days</p>

          <div className="mt-3 h-8 w-full flex items-end gap-1 pt-1">
            {[35, 40, 50, 65, 70, 85, 92].map((val, idx) => (
              <div 
                key={idx} 
                className="flex-1 bg-[#EEF2FF] hover:bg-[#6366F1] rounded-xs transition-colors" 
                style={{ height: `${val}%` }} 
              />
            ))}
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Products</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>6.7%</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {totalProductsCount}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">vs. last 7 days</p>

          <div className="mt-3 h-8 w-full flex items-end gap-1 pt-1">
            {[50, 55, 60, 65, 75, 80, 85].map((val, idx) => (
              <div 
                key={idx} 
                className="flex-1 bg-[#EEF2FF] hover:bg-[#6366F1] rounded-xs transition-colors" 
                style={{ height: `${val}%` }} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Sales Overview Chart & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Overview Area & Bar Chart matching screenshot */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Sales Overview</h3>
              <p className="text-xs text-slate-400">Daily revenue and order growth rate</p>
            </div>
            
            {/* Tabs matching screenshot */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setChartTab('sales')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  chartTab === 'sales'
                    ? 'bg-[#6366F1] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sales
              </button>
              <button
                onClick={() => setChartTab('orders')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  chartTab === 'orders'
                    ? 'bg-[#6366F1] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setChartTab('customers')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  chartTab === 'customers'
                    ? 'bg-[#6366F1] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Customers
              </button>
            </div>
          </div>

          {/* Chart Canvas */}
          <div className="h-64 w-full relative flex flex-col justify-end">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-300">
              <div className="border-b border-slate-100 w-full flex justify-between">
                <span>৳ 70,000</span>
              </div>
              <div className="border-b border-slate-100 w-full flex justify-between">
                <span>৳ 50,000</span>
              </div>
              <div className="border-b border-slate-100 w-full flex justify-between">
                <span>৳ 30,000</span>
              </div>
              <div className="border-b border-slate-100 w-full flex justify-between">
                <span>৳ 10,000</span>
              </div>
              <div className="border-b border-slate-100 w-full" />
            </div>

            {/* Bars and Line Overlay */}
            <div className="relative z-10 flex items-end justify-between h-48 px-2 sm:px-6">
              {chartDays.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-md pointer-events-none whitespace-nowrap shadow-lg">
                    {item.day}: ৳ {item.sales.toLocaleString('en-IN')}
                  </div>
                  
                  {/* Bar */}
                  <div className="w-8 sm:w-12 bg-slate-50 hover:bg-[#EDE9FE] rounded-t-lg transition-all relative flex flex-col justify-end overflow-hidden" style={{ height: '100%' }}>
                    <div 
                      className="w-full bg-[#6366F1]/80 hover:bg-[#6366F1] rounded-t-lg transition-all duration-500"
                      style={{ height: `${item.height}%` }}
                    />
                  </div>
                  
                  <span className="text-[11px] font-medium text-slate-500 mt-2">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Selling Products matching screenshot */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Top Selling Products</h3>
                <p className="text-xs text-slate-400">By units sold this week</p>
              </div>
              <span className="text-[11px] font-semibold text-[#6366F1] bg-[#EDE9FE] px-2 py-0.5 rounded-full">
                This Week
              </span>
            </div>

            <div className="space-y-3.5">
              {topProducts.map((prod, idx) => (
                <div key={prod.id} className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-slate-400 w-4">
                    #{idx + 1}
                  </span>
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-10 h-10 rounded-xl object-cover border border-slate-100 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{prod.name}</p>
                    <p className="text-[11px] text-slate-400">{prod.soldCount.toLocaleString()} sold</p>
                    {/* Progress line */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-[#6366F1] rounded-full" 
                        style={{ width: `${prod.percentage * 3.5}%` }} 
                      />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-slate-900">৳ {prod.revenue.toLocaleString('en-IN')}</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">{prod.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setAdminSubTab('products')}
            className="w-full mt-4 py-2 text-xs font-bold text-[#6366F1] bg-[#EDE9FE]/60 hover:bg-[#EDE9FE] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>সব পণ্য দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 4. Order Status (Donut) & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Order Status Breakdown */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900">Order Status</h3>
            <span className="text-xs text-slate-400">Total 186</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Stylized SVG Donut Chart */}
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#F1F5F9" strokeWidth="4" />
                {/* Confirmed 42% (Indigo) */}
                <circle 
                  cx="18" cy="18" r="14" fill="transparent" stroke="#6366F1" strokeWidth="4" 
                  strokeDasharray="36.9 88" strokeDashoffset="0" 
                />
                {/* Processing 25% (Blue) */}
                <circle 
                  cx="18" cy="18" r="14" fill="transparent" stroke="#3B82F6" strokeWidth="4" 
                  strokeDasharray="22 88" strokeDashoffset="-36.9" 
                />
                {/* Shipped 14% (Orange) */}
                <circle 
                  cx="18" cy="18" r="14" fill="transparent" stroke="#F97316" strokeWidth="4" 
                  strokeDasharray="12.3 88" strokeDashoffset="-58.9" 
                />
                {/* Pending 13% (Amber) */}
                <circle 
                  cx="18" cy="18" r="14" fill="transparent" stroke="#F59E0B" strokeWidth="4" 
                  strokeDasharray="11.4 88" strokeDashoffset="-71.2" 
                />
                {/* Delivered 6% (Green) */}
                <circle 
                  cx="18" cy="18" r="14" fill="transparent" stroke="#10B981" strokeWidth="4" 
                  strokeDasharray="5.4 88" strokeDashoffset="-82.6" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-slate-900">186</span>
                <span className="text-[10px] text-slate-400 font-medium">Orders</span>
              </div>
            </div>

            {/* Legend matching screenshot */}
            <div className="space-y-2 flex-1 w-full">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
                  <span className="font-semibold text-slate-700">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">78</span>
                  <span className="text-slate-400 text-[11px]">(42%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                  <span className="font-semibold text-slate-700">Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">46</span>
                  <span className="text-slate-400 text-[11px]">(25%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                  <span className="font-semibold text-slate-700">Shipped</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">26</span>
                  <span className="text-slate-400 text-[11px]">(14%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="font-semibold text-slate-700">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">24</span>
                  <span className="text-slate-400 text-[11px]">(13%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span className="font-semibold text-slate-700">Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">12</span>
                  <span className="text-slate-400 text-[11px]">(6%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Alerts matching screenshot */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Inventory Alerts</h3>
              <p className="text-xs text-slate-400">Products requiring immediate restock</p>
            </div>
            <button
              onClick={() => setAdminSubTab('inventory')}
              className="text-xs font-bold text-[#6366F1] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Manage Inventory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {lowStockProducts.map((p) => {
              const count = p.stockCount ?? 10;
              const isCritical = count <= 8;

              return (
                <div 
                  key={p.id} 
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                    isCritical 
                      ? 'bg-rose-50/40 border-rose-100' 
                      : 'bg-amber-50/40 border-amber-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-12 h-12 rounded-lg object-cover border border-white shrink-0" 
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                      <p className="text-[11px] text-slate-500">{p.packageSize}</p>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full ${
                        isCritical ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        <AlertTriangle className="w-2.5 h-2.5" />
                        <span>Only {count} left in stock</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRestockProduct(p)}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:border-[#6366F1] hover:bg-[#6366F1] hover:text-white text-xs font-bold text-slate-700 rounded-lg shadow-2xs transition-all shrink-0 cursor-pointer"
                  >
                    Restock
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5. Recent Orders Table matching screenshot */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Orders</h3>
            <p className="text-xs text-slate-400">Latest customer purchases from web and mobile</p>
          </div>
          <button 
            onClick={() => setAdminSubTab('orders')}
            className="text-xs font-bold text-[#6366F1] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Orders ({orders.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {orders.slice(0, 6).map((order, idx) => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-400">{idx + 1}</td>
                  <td className="py-3.5 px-4 font-bold text-[#6366F1]">
                    <button 
                      onClick={() => onSelectOrder(order)}
                      className="hover:underline cursor-pointer"
                    >
                      {order.id}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{order.customerName}</p>
                    <p className="text-[11px] text-slate-400">{order.customerPhone}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {order.items.length} {order.items.length > 1 ? 'items' : 'item'}
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    ৳ {order.total.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-extrabold ${
                        order.paymentMethod === 'bkash'
                          ? 'bg-pink-50 text-[#E2136E] border border-pink-200'
                          : order.paymentMethod === 'nagad'
                          ? 'bg-orange-50 text-[#F7941D] border border-orange-200'
                          : order.paymentMethod === 'card'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-300'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          order.paymentMethod === 'bkash'
                            ? 'bg-[#E2136E]'
                            : order.paymentMethod === 'nagad'
                            ? 'bg-[#F7941D]'
                            : order.paymentMethod === 'card'
                            ? 'bg-blue-600'
                            : 'bg-amber-600'
                        }`} />
                        {order.paymentMethod === 'cod'
                          ? 'Cash on Delivery'
                          : order.paymentMethod === 'bkash'
                          ? 'bKash'
                          : order.paymentMethod === 'nagad'
                          ? 'Nagad'
                          : 'Card'}
                      </span>
                      <span className={`block text-[10px] font-bold ${
                        order.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {order.paymentStatus === 'paid' ? '• Paid' : '• Pending (COD)'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(order.orderStatus)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                    {order.date}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onSelectOrder(order)}
                      className="p-1.5 text-slate-400 hover:text-[#6366F1] hover:bg-[#EEF2FF] rounded-lg transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Authentic Deshi Food Banner matching screenshot */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-900 via-orange-900 to-amber-950 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold backdrop-blur-xs mb-3">
            Pure & 100% Organic
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Authentic Deshi Food
          </h3>
          <p className="text-amber-100 text-sm mb-4 leading-relaxed font-light">
            Fresh. Natural. Healthy. Handcrafted mustard oil, organic Sundarban honey, and pure ghee directly from village farms to urban homes.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAdminSubTab('products')}
              className="px-4 py-2 bg-white text-amber-950 font-bold text-xs rounded-xl hover:bg-amber-50 transition-colors shadow-xs cursor-pointer"
            >
              Manage Products
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-xl backdrop-blur-xs transition-colors cursor-pointer"
            >
              View Live Storefront
            </button>
          </div>
        </div>

        {/* Visual product illustration */}
        <div className="absolute right-4 bottom-0 top-0 hidden md:flex items-center opacity-40 lg:opacity-75 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400"
            alt="Deshi Food Jars"
            className="w-48 h-48 rounded-2xl object-cover shadow-2xl border-2 border-white/20 rotate-6"
          />
        </div>
      </div>

    </div>
  );
};
