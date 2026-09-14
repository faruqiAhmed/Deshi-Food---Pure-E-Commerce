import React, { useState, useEffect } from 'react';
import { X, Upload, Check, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductModalProps {
  product: Product | null; // null means adding a new product
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addProduct, updateProduct } = useStore();

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    nameBn: '',
    category: 'oil',
    price: 0,
    originalPrice: 0,
    packageSize: '',
    weightInKg: 0.5,
    inStock: true,
    stockCount: 50,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600',
    description: '',
    badge: 'নিত্য প্রয়োজনীয়',
    rating: 5.0,
    reviewCount: 1,
    origin: 'বাংলাদেশ',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        nameBn: '',
        category: 'oil',
        price: 350,
        originalPrice: 400,
        packageSize: '500g',
        weightInKg: 0.5,
        inStock: true,
        stockCount: 50,
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600',
        description: '১০০% খাঁটি এবং প্রাকৃতিক উপাদান দিয়ে তৈরি।',
        badge: 'বেস্ট সেলার',
        rating: 5.0,
        reviewCount: 12,
        origin: 'বাংলাদেশ',
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (product) {
      updateProduct(product.id, formData);
    } else {
      const newProduct: Product = {
        id: `df-${Date.now()}`,
        name: formData.name || 'New Product',
        englishName: formData.name || 'New Product',
        nameBn: formData.nameBn || formData.name || '',
        category: formData.category || 'oil',
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        packageSize: formData.packageSize || '500g',
        weightInKg: Number(formData.weightInKg || 0.5),
        inStock: formData.inStock ?? true,
        stockCount: Number(formData.stockCount || 20),
        soldCount: 0,
        image: formData.image || 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600',
        shortDescription: formData.description || '১০০% প্রাকৃতিক ও স্বাস্থ্যসম্মত খাঁটি দেশি পণ্য।',
        fullDescription: formData.description || '১০০% প্রাকৃতিক ও স্বাস্থ্যসম্মত খাঁটি দেশি পণ্য।',
        description: formData.description || '',
        features: ['১০০% খাঁটি ও নির্ভেজাল', 'রাসায়নিক ও প্রিজারভেটিভ মুক্ত', 'স্বাস্থ্যসম্মত প্যাকেজিং'],
        badge: formData.badge,
        rating: 5.0,
        reviewsCount: 1,
        origin: formData.origin || 'বাংলাদেশ',
      };
      addProduct(newProduct);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <h2 className="text-lg font-bold text-slate-900">
            {product ? 'পণ্য এডিট করুন' : 'নতুন পণ্য যোগ করুন'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                পণ্যের নাম (English) *
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Pure Mustard Oil"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden focus:ring-2 focus:ring-[#6366F1]/10"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                পণ্যের নাম (বাংলা)
              </label>
              <input
                type="text"
                value={formData.nameBn || ''}
                onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                placeholder="যেমন: খাঁটি সরিষার তেল"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden focus:ring-2 focus:ring-[#6366F1]/10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                বিক্রয় মূল্য (৳) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                আগের মূল্য (৳)
              </label>
              <input
                type="number"
                min="0"
                value={formData.originalPrice || ''}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                স্টক সংখ্যা *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stockCount || ''}
                onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value), inStock: Number(e.target.value) > 0 })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ক্যাটাগরি
              </label>
              <select
                value={formData.category || 'oil'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden bg-white"
              >
                <option value="oil">তেল ও ঘি (Oils & Ghee)</option>
                <option value="spices">মশলা (Spices)</option>
                <option value="honey">মধু (Honey)</option>
                <option value="dates">খেজুর ও বাদাম (Dates & Nuts)</option>
                <option value="snacks">হালকা খাবার (Snacks)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                প্যাকেজ সাইজ
              </label>
              <input
                type="text"
                value={formData.packageSize || ''}
                onChange={(e) => setFormData({ ...formData, packageSize: e.target.value })}
                placeholder="e.g. 500g, 1L, 2L"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ওজন (কেজি)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={formData.weightInKg || ''}
                onChange={(e) => setFormData({ ...formData, weightInKg: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              পণ্যের ছবির URL
            </label>
            <input
              type="url"
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
            />
            {formData.image && (
              <div className="mt-2 flex items-center gap-2">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-12 h-12 rounded-lg object-cover border border-slate-200" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600';
                  }}
                />
                <span className="text-[11px] text-slate-400">ছবির প্রিভিউ</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ব্যাজ / হাইলাইট
            </label>
            <input
              type="text"
              value={formData.badge || ''}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="e.g. বেস্ট সেলার, খাঁটি ও প্রাকৃতিক"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              বিবরণ (Description)
            </label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="পণ্যের গুণাগুণ ও বিশেষত্ব লিখুন..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#6366F1] outline-hidden resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="inStockCheck"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              className="w-4 h-4 rounded text-[#6366F1] focus:ring-[#6366F1] border-slate-300"
            />
            <label htmlFor="inStockCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
              স্টকে উপলব্ধ (In Stock)
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              {product ? 'পরিবর্তন সংরক্ষণ করুন' : 'পণ্য যুক্ত করুন'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
