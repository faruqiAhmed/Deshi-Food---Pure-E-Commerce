import React from 'react';
import { 
  ShieldCheck, 
  Heart, 
  Award, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  ArrowRight
} from 'lucide-react';

export const StoryAndTrust: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-[#EFEAE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: উৎস থেকে আপনার রান্নাঘরে (Matching video 00:16-00:18) */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#B45309] font-bold text-xs uppercase tracking-wider">
              আমাদের মূল দর্শন
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C3B2B] font-serif mt-1">
              উৎস থেকে আপনার রান্নাঘরে
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2">
              ঐতিহ্যবাহী কৃষক ও স্থানীয় খামার থেকে সরাসরি কাঁচামাল সংগ্রহ, প্রক্রিয়াজাত করা হয় শতভাগ বিশুদ্ধতায়।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: মরিচ */}
            <div className="group relative rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300">
              <div className="aspect-[16/9] overflow-hidden bg-stone-100">
                <img
                  src="/images/chili_powder.jpg"
                  alt="শুকনো মরিচ থেকে খাঁটি গুঁড়া"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 bg-white">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">১০০% প্রাকৃতিক</span>
                <h3 className="text-xl font-bold text-[#1C3B2B] mt-1">
                  শুকনো মরিচ থেকে খাঁটি গুঁড়া
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  বগুড়ার সেরা চরের লাল মরিচ সংগ্রহ করে বোঁটা বাছা হয়। রোদে শুকিয়ে পরিচ্ছন্ন পরিবেশে গুঁড়া করে কোনো ধরনের কৃত্রিম রঙ ছাড়া প্যাক করা হয়।
                </p>
              </div>
            </div>

            {/* Card 2: হলুদ */}
            <div className="group relative rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300">
              <div className="aspect-[16/9] overflow-hidden bg-stone-100">
                <img
                  src="/images/turmeric_powder.jpg"
                  alt="ভাঙা হলুদ থেকে খাঁটি রান্নার গুঁড়া"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 bg-white">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">উচ্চ কারকিউমিনযুক্ত</span>
                <h3 className="text-xl font-bold text-[#1C3B2B] mt-1">
                  ভাঙা হলুদ থেকে খাঁটি রান্নার গুঁড়া
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  পাবনা ও নাটোরের অর্গানিক হলুদ চাষীদের থেকে সরাসরি সংগৃহীত। এতে রয়েছে প্রাকৃতিক ঔষধি গুণ এবং রান্নায় এনে দেয় অপূর্ব সোনালী বর্ণ।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: আমাদের গল্প (Matching video 00:19-00:21) */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#EFEAE1]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Image: Founder & Artisan */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-sm w-full bg-stone-100 group">
                <img
                  src="/images/founder.jpg"
                  alt="Deshi Food উদ্যোগ ও প্রতিষ্ঠাতা"
                  className="w-full h-auto object-cover max-h-[500px] transform group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Bottom caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-white text-center">
                  <p className="font-bold text-sm sm:text-base text-amber-300 font-serif">ঘরোয়া মান ও খাঁটি উদ্যোগ</p>
                  <p className="text-xs text-stone-200 mt-0.5">শতভাগ নিজস্ব তত্ত্বাবধানে উৎপাদিত ও প্যাকিং</p>
                </div>
              </div>
            </div>

            {/* Right Story Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">
                আমাদের শুরু ও লক্ষ্য
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C3B2B] font-serif leading-tight">
                ঘরোয়া মান বজায় রেখে, বিশ্বাসের সাথে তৈরি প্রতিটি পণ্য
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Deshi Food একটি ছোট্ট স্বপ্ন নিয়ে যাত্রা শুরু করেছিল — পরিবারের প্রতিটি সদস্যের মুখে ভেজালমুক্ত খাবার তুলে দেওয়ার প্রত্যয়ে। ঘানি ভাঙা সরিষার তেল, দেশি কাঁচা মসলা এবং খাঁটি মধু নিয়ে আমরা প্রতিটি ঘরে পৌঁছাতে চাই।
              </p>

              {/* Checklist */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700 font-medium">
                    সরাসরি উৎস থেকে সংগ্রহ, কোনো মধ্যস্বত্বভোগী বা প্রিজারভেটিভ নেই
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700 font-medium">
                    প্রতিটি ব্যাচ নিজস্ব ল্যাবে ও স্বাস্থ্যসম্মত পরিবেশে যাচাইকৃত
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700 font-medium">
                    গ্রাহকের সন্তুষ্টি নিশ্চিত না হলে তাৎক্ষণিক পরিবর্তন বা শতভাগ মানিব্যাক গ্যারান্টি
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: WhatsApp Direct Order Banner (Matching video 00:21-00:22) */}
        <div className="bg-[#1C3B2B] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-800">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-700/60 px-3 py-1 rounded-full text-xs font-bold text-emerald-200">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>সহজ অর্ডার পদ্ধতি</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              হোয়াটসঅ্যাপে সরাসরি অর্ডার করুন
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              অনলাইনে ঝামেলা এড়াতে নাম ও ঠিকানা হোয়াটসঅ্যাপে মেসেজ পাঠিয়ে দিন।
            </p>
          </div>

          <a
            href="https://wa.me/8801751279584?text=হ্যালো%20Deshi%20Food,%20আমি%20পণ্য%20অর্ডার%20করতে%20চাই।"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 cursor-pointer active:scale-98"
          >
            <Phone className="w-5 h-5 fill-current" />
            <span className="font-mono text-lg tracking-wide font-extrabold text-white">01751279584</span>
          </a>
        </div>

      </div>
    </section>
  );
};
