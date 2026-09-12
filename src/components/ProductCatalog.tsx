import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  Check, 
  Sparkles, 
  Filter, 
  Star,
  Flame,
  Search
} from 'lucide-react';
import { Product, Category } from '../types';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const ProductCatalog: React.FC = () => {
  const { addToCart, setQuickViewProduct } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [searchFilter, setSearchFilter] = useState('');

  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'all', label: 'সব পণ্য', icon: '✨' },
    { id: 'oil', label: 'খাঁটি তেল', icon: '🫒' },
    { id: 'spices', label: 'খাঁটি মসলা', icon: '🌶️' },
    { id: 'health', label: 'স্বাস্থ্যকর খাদ্য', icon: '🌾' },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      product.englishName.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="products-section" className="py-12 md:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Authentic copy matching user video) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#D97706] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>১০০% প্রাকৃতিক সংকলন</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C3B2B] font-serif">
              আমাদের পণ্যসমূহ
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] mt-2 max-w-2xl">
              প্রতিটি পণ্য আমরা তৈরি করি পরিবারের যত্ন নিয়ে, প্রতিটি পরিবারে আসল রান্না করার জন্য খাঁটি উপকরণ সরবরাহ নিশ্চিত করি।
            </p>
          </div>

          {/* Quick Search in catalog */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="পণ্য খুঁজুন (যেমন: তেল, হলুদ)..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-[#E5E0D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C3B2B]/20 focus:border-[#1C3B2B] transition-all placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1C3B2B] text-white shadow-sm scale-102'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-[#EFEAE1]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = addedItemIds[product.id];

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#EFEAE1] hover:border-[#D4CBBE] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
                id={`product-card-${product.id}`}
              >
                {/* Product Image Container */}
                <div 
                  className="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer"
                  onClick={() => setQuickViewProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badges */}
                  {product.popular && (
                    <span className="absolute top-2.5 left-2.5 bg-[#D97706] text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Flame className="w-3 h-3 fill-current" />
                      জনপ্রিয়
                    </span>
                  )}

                  {/* Package Size Badge */}
                  <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                    {product.packageSize}
                  </span>

                  {/* Hover Quick View overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-white/95 text-[#1C3B2B] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      বিস্তারিত দেখুন
                    </span>
                  </div>
                </div>

                {/* Product Info (Matching video structure) */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 mb-1">
                      <div className="flex items-center">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold ml-1 text-stone-800">{product.rating}</span>
                      </div>
                      <span className="text-stone-400">({product.reviewsCount})</span>
                      <span className="text-stone-300">•</span>
                      <span className="text-[11px] text-emerald-700 font-medium">ইন স্টক</span>
                    </div>

                    {/* Titles */}
                    <h3 
                      onClick={() => setQuickViewProduct(product)}
                      className="font-bold text-base text-[#1C3B2B] group-hover:text-[#D97706] transition-colors cursor-pointer line-clamp-1"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#6B7280] font-medium mb-2">
                      {product.englishName}
                    </p>

                    {/* "বিস্তারিত দেখুন" Link (As explicitly demonstrated in the video at 00:03-00:05) */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="text-xs font-semibold text-[#1C3B2B] hover:text-[#D97706] underline underline-offset-2 flex items-center gap-1 mb-3 cursor-pointer"
                    >
                      <span>বিস্তারিত দেখুন</span>
                    </button>
                  </div>

                  {/* Price & Add to Cart Footer */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-extrabold text-[#1C3B2B]">
                          ৳ {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ৳ {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* "কার্টে যোগ করুন" Button (As in video: dark green pill button with icon) */}
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`px-3 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#1C3B2B] hover:bg-[#152D21] text-white shadow-xs'
                      }`}
                      id={`add-to-cart-${product.id}`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                          <span>যুক্ত হয়েছে</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-[#EAB308]" />
                          <span>কার্টে যোগ করুন</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-200">
            <p className="text-stone-500 font-medium">কোনো পণ্য পাওয়া যায়নি!</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchFilter('');
              }}
              className="mt-3 text-xs text-[#1C3B2B] font-bold underline"
            >
              সব পণ্য রিসেট করুন
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
