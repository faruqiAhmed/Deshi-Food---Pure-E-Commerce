import React, { useState } from 'react';
import { 
  Boxes, 
  AlertTriangle, 
  Search, 
  Plus, 
  Minus, 
  Check, 
  TrendingDown,
  RefreshCw
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const AdminInventory: React.FC = () => {
  const { products, updateStock } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'low' | 'out'>('all');

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const stock = p.stockCount ?? 20;
    if (filterType === 'low') return matchesSearch && stock <= 15 && stock > 0;
    if (filterType === 'out') return matchesSearch && (!p.inStock || stock === 0);
    return matchesSearch;
  });

  const totalUnits = products.reduce((sum, p) => sum + (p.stockCount ?? 20), 0);
  const totalValue = products.reduce((sum, p) => sum + ((p.stockCount ?? 20) * p.price), 0);
  const lowStockCount = products.filter((p) => (p.stockCount ?? 20) <= 15).length;

  const handleAdjustStock = (productId: string, currentStock: number, delta: number) => {
    const newStock = Math.max(0, currentStock + delta);
    updateStock(productId, newStock, newStock > 0);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Inventory & Stock</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time warehouse inventory, automated alerts, and quick restock controls
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">Total Units in Stock</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{totalUnits} units</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Across {products.length} products</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">Inventory Valuation</span>
          <p className="text-2xl font-black text-slate-900 mt-1">৳ {totalValue.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Current wholesale retail value</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">Low Stock Alerts</span>
          <p className="text-2xl font-black text-rose-600 mt-1">{lowStockCount} items</p>
          <p className="text-[11px] text-rose-500 font-medium mt-0.5">Under 15 units threshold</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter inventory by product..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#6366F1] outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            onClick={() => setFilterType('low')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'low'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Low Stock ({lowStockCount})
          </button>
          <button
            onClick={() => setFilterType('out')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'out'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Out of Stock
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((product) => {
                const stock = product.stockCount ?? 20;
                const isCritical = stock <= 8;
                const isLow = stock <= 15;

                return (
                  <tr key={product.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-100 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{product.name}</p>
                          <p className="text-[11px] text-slate-400">{product.packageSize}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600 capitalize">
                      {product.category}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      ৳ {product.price}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-black text-sm ${
                          stock === 0 ? 'text-rose-600' : isCritical ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-slate-800'
                        }`}>
                          {stock}
                        </span>
                        <span className="text-[11px] text-slate-400">units</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {stock === 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Out of Stock
                        </span>
                      ) : isCritical ? (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Critical ({stock})</span>
                        </span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 w-fit">
                          Low Stock ({stock})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
                          Healthy Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleAdjustStock(product.id, stock, -1)}
                          disabled={stock <= 0}
                          className="w-7 h-7 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold disabled:opacity-40 transition-colors cursor-pointer"
                          title="Reduce 1 unit"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleAdjustStock(product.id, stock, 1)}
                          className="w-7 h-7 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          title="Add 1 unit"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleAdjustStock(product.id, stock, 10)}
                          className="px-2.5 py-1 bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#6366F1] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          title="Add 10 units"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => handleAdjustStock(product.id, stock, 50)}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          title="Bulk restock 50 units"
                        >
                          +50
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
