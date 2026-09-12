import React from 'react';
import { ShieldCheck, Package, Truck, HeartHandshake } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: ShieldCheck,
      title: '১০০% খাঁটি',
      description: 'কোনো ভেজাল বা কৃত্রিম উপাদান নেই',
      color: 'text-amber-700 bg-amber-100',
    },
    {
      icon: Package,
      title: 'সুলভ প্যাকেজিং',
      description: 'স্বাস্থ্যসম্মতভাবে প্যাক করা',
      color: 'text-emerald-700 bg-emerald-100',
    },
    {
      icon: Truck,
      title: 'দ্রুত ডেলিভারি',
      description: 'সারাদেশে দ্রুত ডেলিভারির সুবিধা',
      color: 'text-blue-700 bg-blue-100',
    },
    {
      icon: HeartHandshake,
      title: 'পারিবারিক বিশ্বাস',
      description: 'হাজারো পরিবারের আস্থার নাম',
      color: 'text-rose-700 bg-rose-100',
    },
  ];

  return (
    <section className="bg-white border-b border-[#EFEAE1] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx}
                className="flex items-start sm:items-center gap-3 p-3 rounded-xl hover:bg-[#FAF8F5] transition-colors border border-transparent hover:border-[#EFEAE1]"
              >
                <div className={`p-2.5 rounded-lg shrink-0 ${b.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#1C3B2B] leading-snug">
                    {b.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] mt-0.5 leading-snug">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
