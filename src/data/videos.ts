export interface ProductVideo {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  description: string;
  category: 'mustard_oil' | 'spices' | 'cooking' | 'health';
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl?: string;
  youtubeId?: string;
  productId: string;
  badge: string;
  keyHighlights: string[];
}

export const PRODUCT_VIDEOS: ProductVideo[] = [
  {
    id: 'vid-ghani-press',
    title: 'কাঠের ঘানিতে খাঁটি সরিষার তেল নিষ্কাশন প্রক্রিয়া',
    titleEn: 'Cold Pressed Mustard Oil Extraction in Traditional Wooden Ghani',
    subtitle: 'কোনো তাপ বা কেমিক্যাল ছাড়া ১০০% খাঁটি ধীরগতির ভাঙানো',
    description: 'গ্রামের ঐতিহ্যবাহী কাঠের ঘানিতে দেশি কালো ও হলুদ সরিষা থেকে তেল নিংড়ানো হচ্ছে। কোল্ড প্রেস পদ্ধতিতে ঘানির ধীর ঘূর্ণনের ফলে তেলের প্রাকৃতিক পুষ্টি, ওমেগা ফ্যাটি অ্যাসিড এবং ঝাঁঝ শতভাগ অটুট থাকে।',
    category: 'mustard_oil',
    duration: '২:১৫ মিনিট',
    views: '১২.৮ হাজার ভিউ',
    thumbnail: '/images/ghani_video.jpg',
    youtubeId: 'd6nU-J_m27E', // Traditional mustard oil extraction
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    productId: 'df-oil-2l',
    badge: 'উৎপাদন ও বিশুদ্ধতা',
    keyHighlights: [
      '১০০% কাঠের ঘানি ভাঙা (Kachi Ghani)',
      'জিরো কেমিক্যাল ও কোনো কৃত্রিম প্রিজারভেটিভ নেই',
      'প্রাকৃতিক গাড় সোনালী বর্ণ ও তীব্র ঝাঁঝ'
    ]
  },
  {
    id: 'vid-cooking-sizzle',
    title: 'খাঁটি সরিষার তেলে ইলিশ মাছ ভাজা ও আলু-বেগুন ভর্তা',
    titleEn: 'Cooking Sizzle Test with Pure Mustard Oil',
    subtitle: 'কড়াইয়ে খাঁটি তেলের বুদবুদ, ধোঁয়া ও মন মাতানো সুবাস',
    description: 'খাঁটি সরিষার তেলে ইলিশ মাছের ভাজা এবং কাঁচা মরিচ-পেঁয়াজ সহযোগে ঐতিহ্যবাহী ভর্তা তৈরির বাস্তব মুহূর্ত। খাঁটি সরিষার তেলের ঝাঁঝালো স্বাদ খাবারের স্বাদ বাড়িয়ে দেয় বহুগুণ।',
    category: 'cooking',
    duration: '১:৫০ মিনিট',
    views: '১৮.৪ হাজার ভিউ',
    thumbnail: '/images/cooking_video.jpg',
    youtubeId: 'oefAI2x2CQM', // Cooking with authentic mustard oil
    productId: 'df-oil-1l',
    badge: 'রান্নার রেসিপি ও স্বাদ',
    keyHighlights: [
      'ধোঁয়া ওঠার সময় প্রাকৃতিক খাঁটি সুবাস',
      'ভর্তা ও ভুনা রান্নায় অতুলনীয় বাঙালি স্বাদ',
      'হজমশক্তি বৃদ্ধি ও হার্টের জন্য উপকারী'
    ]
  },
  {
    id: 'vid-turmeric-grinding',
    title: 'দেশি কাঁচা হলুদ শুকিয়ে খাঁটি গুঁড়া তৈরির দৃশ্য',
    titleEn: 'Pure Turmeric Roots Sourcing & Grinding',
    subtitle: 'ভেজালমুক্ত সোনালী গুঁড়া, উজ্জ্বল প্রাকৃতিক রঙ',
    description: 'মাঠ থেকে সংগৃহীত অর্গানিক কাঁচা হলুদ প্রাকৃতিকভাবে রোদে শুকিয়ে পরিষ্কার করে মেশিনে গুঁড়া করা হচ্ছে। এতে কোনো ক্ষতিকর টেক্সটাইল রঙ, লেড ক্রোমেট বা ময়দা মেশানো হয় না।',
    category: 'spices',
    duration: '১:৩০ মিনিট',
    views: '৯.৫ হাজার ভিউ',
    thumbnail: '/images/turmeric_powder.jpg',
    youtubeId: '1la40W9Brdg',
    productId: 'df-turmeric-500g',
    badge: 'মসলা প্রসেসিং',
    keyHighlights: [
      '১০০% নির্ভেজাল খাঁটি দেশি হলুদ',
      'উচ্চ কারকিউমিন (Curcumin) সমৃদ্ধ',
      'কোনো কৃত্রিম রঙ বা প্রিজারভেটিভ নেই'
    ]
  },
  {
    id: 'vid-chili-processing',
    title: 'রোদে শুকানো আস্ত মরিচ থেকে তীব্র লাল মরিচ গুঁড়া',
    titleEn: 'Sun-dried Red Chili to Pure Hot Powder',
    subtitle: 'বোটাসহ বাছাইকৃত মরিচের প্রাকৃতিক ঝাল ও রঙ',
    description: 'নদীর চরে রোদে শুকানো বোঁটা ছাড়ানো লাল শুকনো মরিচ ধুয়ে পরিষ্কার করে ভাঙানো হচ্ছে। খাঁটি মরিচের স্বাভাবিক ঝাল ও তরকারিতে লোভনীয় প্রাকৃতিক লাল আভা এনে দেয়।',
    category: 'spices',
    duration: '১:৪০ মিনিট',
    views: '১১.২ হাজার ভিউ',
    thumbnail: '/images/chili_powder.jpg',
    youtubeId: '7X8II6J-6mU',
    productId: 'df-chili-500g',
    badge: 'মসলা প্রসেসিং',
    keyHighlights: [
      'বোঁটাহীন বাছাই করা পরিষ্কার শুকনো মরিচ',
      'কোনো কৃত্রিম লাল রঙ বা ইটের গুঁড়া নেই',
      'রান্নায় আনে নিখুঁত ঝাঁঝ ও পারফেক্ট ঝাল'
    ]
  },
  {
    id: 'vid-chhatu-prep',
    title: 'ভাজা ছোলা ও যব দিয়ে পুষ্টিকর ছাতু তৈরির প্রক্রিয়া',
    titleEn: 'Multigrain Roasted Chhatu Preparation',
    subtitle: 'সকালের আদর্শ হাই-প্রোটিন এনার্জি ড্রিংক ও নাশতা',
    description: 'বালির তাওয়ায় খাঁটি ছোলা, যব ও ভাজা শস্যদানা ভেজে স্বাস্থ্যসম্মত পরিবেশে গুঁড়া করা হচ্ছে। ডায়াবেটিস রোগী ও কর্মব্যস্ত মানুষের জন্য এটি পুষ্টিকর ও হালকা নাস্তার সেরা সমাধান।',
    category: 'health',
    duration: '১:২৫ মিনিট',
    views: '৭.৮ হাজার ভিউ',
    thumbnail: '/images/chhatu_powder.jpg',
    productId: 'df-chhatu-500g',
    badge: 'স্বাস্থ্য ও পুষ্টি',
    keyHighlights: [
      'উচ্চ উদ্ভিজ্জ প্রোটিন ও ফাইবার সমৃদ্ধ',
      'ডায়াবেটিস ও ওজন নিয়ন্ত্রণে অত্যন্ত সহায়ক',
      'সহজে পানি বা দুধে গুলে খাওয়ার উপযোগী'
    ]
  }
];
