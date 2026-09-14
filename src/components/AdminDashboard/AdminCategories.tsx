import React from 'react';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminCategories: React.FC = () => {
  const { products, setAdminSubTab } = useStore();

  const categories = [
    {
      id: 'oil',
      name: 'তেল ও ঘি (Oils & Ghee)',
      description: 'Cold pressed organic mustard oil, homemade bilona ghee, pure sesame & coconut oils.',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'spices',
      name: 'মশলা ও উপাদান (Pure Spices)',
      description: 'Traditional turmeric, red chilli, cumin, coriander powder and whole aromatic spices.',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'honey',
      name: 'প্রাকৃতিক মধু (Natural Honey)',
      description: 'Raw Sundarban mangrove honey, black cumin seed flower honey, and mustard blossom honey.',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'dates',
      name: 'খেজুর ও বাদাম (Dates & Dry Fruits)',
      description: 'Saudi Ajwa, Medjool, Mabroom dates, cashew nuts, roasted almonds, and walnuts.',
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'snacks',
      name: 'হালকা নাস্তা (Deshi Snacks)',
      description: 'Handmade chanachur, muri, chira bhaja, and crunchy traditional rural evening snacks.',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Product Categories</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Organize your product hierarchy, banner images, and live storefront displays
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.id).length;

          return (
            <div 
              key={cat.id} 
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-bold text-base leading-tight">{cat.name}</h3>
                  <span className="text-xs text-emerald-300 font-semibold">{count} Products</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{cat.description}</p>
                <button
                  onClick={() => setAdminSubTab('products')}
                  className="w-full py-2 bg-slate-50 hover:bg-[#EDE9FE] text-[#6366F1] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>পণ্যসমূহ পরিচালনা করুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
