import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, CheckCircle } from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const [reviews] = useState([
    {
      id: 'rev-1',
      customer: 'মাহমুদুল হাসান',
      product: 'খাঁটি সরিষার তেল (২ লিটার)',
      rating: 5,
      date: 'গতকাল',
      comment: 'তেলের ঝাঁঝ এবং খাঁটি ঘ্রাণ অসাধারণ! রান্নায় ব্যবহার করে পরিবারের সবাই খুব প্রশংসা করেছে। প্যাকেজিংও অনেক ভালো ছিল।',
      verified: true,
    },
    {
      id: 'rev-2',
      customer: 'ফারহানা ইসলাম',
      product: 'সুন্দরবনের প্রাকৃতিক খলিশা মধু',
      rating: 5,
      date: '৩ দিন আগে',
      comment: 'খাঁটি সুন্দরবনের মধু এর আগে অনেক জায়গা থেকে নিয়েছি কিন্তু দেশি ফুডের মতো আসল টেস্ট পাইনি। ধন্যবাদ দেশি ফুড টিমকে।',
      verified: true,
    },
    {
      id: 'rev-3',
      customer: 'তানভীর আহমেদ',
      product: 'গাওয়া ঘি (১ কেজি)',
      rating: 5,
      date: '৫ দিন আগে',
      comment: 'ঘিয়ের সুঘ্রাণ পুরো রান্নাঘর ভরিয়ে দেয়। পরোটা বা গরম ভাতে একদম পারফেক্ট টেস্ট।',
      verified: true,
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Customer Reviews</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Public feedback and quality ratings from verified buyers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">Average Rating</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl font-black text-slate-900">4.9</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Based on 1,420+ verified reviews</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">Customer Satisfaction</span>
          <p className="text-3xl font-black text-emerald-600 mt-1">98.4%</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Would recommend to friends</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400">Verified Badges</span>
          <p className="text-3xl font-black text-[#6366F1] mt-1">100%</p>
          <p className="text-[11px] text-slate-400 mt-1">Only purchased orders can review</p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">{rev.customer}</span>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    <span>ভেরিফাইড ক্রেতা</span>
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400">{rev.date}</span>
            </div>

            <p className="text-xs font-semibold text-[#6366F1] mb-2">{rev.product}</p>

            <div className="flex text-amber-400 mb-2">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
