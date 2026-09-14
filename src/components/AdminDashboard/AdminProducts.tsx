import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Layers, 
  AlertCircle,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface AdminProductsProps {
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({ 
  onAddProduct, 
  onEditProduct 
}) => {
  const { 
    products, 
    deleteProduct, 
    updateProduct, 
    setActiveTab, 
    setQuickViewProduct,
    resetProductsToDefault 
  } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetCatalog = () => {
    resetProductsToDefault();
    setShowResetConfirm(false);
    setToastMessage('সকল পূর্বনির্ধারিত পণ্য সফলভাবে রিস্টোর ও ওয়েবসাইটের সাথে সিঙ্ক হয়েছে।');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.nameBn && p.nameBn.includes(searchTerm)) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleStock = (product: Product) => {
    updateProduct(product.id, { inStock: !product.inStock });
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    const deletedName = productToDelete.name;
    deleteProduct(productToDelete.id);
    setProductToDelete(null);
    setToastMessage(`"${deletedName}" সফলভাবে ক্যাটালগ থেকে মুছে ফেলা হয়েছে!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast feedback */}
      {toastMessage && (
        <div 
          className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white text-xs font-semibold rounded-2xl shadow-xl border border-slate-800 animate-fadeIn"
          id="product-delete-toast"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Products Catalog</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your store inventory, pricing, and product specifications ({products.length} products)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => {
                const el = document.getElementById('products-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            title="ওয়েবসাইটে ক্যাটালগ সরাসরি দেখুন"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>ওয়েবসাইটে লাইভ দেখুন</span>
          </button>

          {showResetConfirm ? (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2 py-1 rounded-xl">
              <span className="text-[11px] font-bold text-amber-800">সব পণ্য রিস্টোর করবেন?</span>
              <button
                onClick={handleResetCatalog}
                className="px-2 py-0.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-bold transition-colors cursor-pointer"
              >
                হ্যাঁ
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-1.5 py-0.5 text-slate-500 hover:text-slate-700 text-[11px] cursor-pointer"
              >
                না
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              title="পূর্বনির্ধারিত ডেমো পণ্যসমূহ পুনরুদ্ধার করুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ডিফল্ট রিস্টোর</span>
            </button>
          )}

          <button
            onClick={onAddProduct}
            className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            id="admin-add-product-btn"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন পণ্য যোগ করুন</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by title..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#6366F1] outline-hidden"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'oil', label: 'Oils & Ghee' },
            { id: 'spices', label: 'Spices' },
            { id: 'honey', label: 'Honey' },
            { id: 'dates', label: 'Dates & Nuts' },
            { id: 'snacks', label: 'Snacks' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <p className="font-semibold">কোন পণ্য পাওয়া যায়নি</p>
                    <p className="text-[11px] text-slate-400 mt-1">অনুসন্ধানের কি-ওয়ার্ড বা ফিল্টার পরিবর্তন করুন</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const stock = product.stockCount ?? 20;
                  const isLowStock = stock <= 10;

                  return (
                    <tr key={product.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600';
                            }}
                          />
                          <div>
                            <p className="font-bold text-slate-900">{product.name}</p>
                            <p className="text-[11px] text-slate-400">{product.nameBn || product.packageSize}</p>
                            {product.badge && (
                              <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#EDE9FE] text-[#6366F1]">
                                {product.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-600 capitalize">
                        {product.category}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-black text-slate-900">৳ {product.price}</span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through ml-1.5">
                            ৳ {product.originalPrice}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`font-bold ${isLowStock ? 'text-rose-600' : 'text-slate-700'}`}>
                          {stock} units
                        </span>
                        {isLowStock && (
                          <span className="block text-[10px] text-rose-500 font-semibold">Low Stock</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleStock(product)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                            product.inStock
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {product.inStock ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>In Stock</span>
                            </>
                          ) : (
                            <>
                              <X className="w-3 h-3" />
                              <span>Out of Stock</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setQuickViewProduct(product);
                              setActiveTab('shop');
                            }}
                            className="p-1.5 text-slate-400 hover:text-[#6366F1] hover:bg-[#EEF2FF] rounded-lg transition-colors cursor-pointer"
                            title="View on Storefront"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEditProduct(product)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setProductToDelete(product)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Product"
                            id={`delete-product-btn-${product.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* In-App Delete Confirmation Modal (Bypasses iframe window.confirm restriction) */}
      {productToDelete && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          id="delete-product-confirm-modal"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-scaleUp">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  পণ্য ডিলিট করার নিশ্চিতকরণ
                </h3>
                <p className="text-xs text-slate-500">
                  Are you sure you want to delete this product?
                </p>
              </div>
            </div>

            {/* Product card preview */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3.5">
              <img
                src={productToDelete.image}
                alt={productToDelete.name}
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600';
                }}
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-slate-900 text-sm truncate">
                  {productToDelete.name}
                </h4>
                <p className="text-xs text-slate-500">
                  {productToDelete.packageSize} • Category: <span className="capitalize">{productToDelete.category}</span>
                </p>
                <p className="text-xs font-extrabold text-[#6366F1] mt-0.5">
                  ৳ {productToDelete.price}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              এই পণ্যটি মুছে ফেললে তা অবিলম্বে আপনার এডমিন ইনভেন্টরি এবং অনলাইন স্টোরফ্রন্ট থেকে অপসারিত হবে। এই পরিবর্তন অপরিবর্তনযোগ্য।
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
                id="cancel-delete-product-btn"
              >
                বাতিল করুন
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20 cursor-pointer"
                id="confirm-delete-product-btn"
              >
                <Trash2 className="w-4 h-4" />
                <span>হ্যাঁ, ডিলিট করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
