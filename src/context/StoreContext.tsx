import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  UserProfile, 
  PaymentMethod, 
  OrderStatus,
  CourierDetails,
  AdminCustomer,
  AdminSubTab
} from '../types';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  // Navigation & Modals
  activeTab: 'shop' | 'tracking' | 'dashboard' | 'shipping_hub' | 'story' | 'admin';
  setActiveTab: (tab: 'shop' | 'tracking' | 'dashboard' | 'shipping_hub' | 'story' | 'admin') => void;
  dashboardSubTab: 'orders' | 'addresses';
  setDashboardSubTab: (subTab: 'orders' | 'addresses') => void;
  adminSubTab: AdminSubTab;
  setAdminSubTab: (subTab: AdminSubTab) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  shippingLabelOrder: Order | null;
  setShippingLabelOrder: (order: Order | null) => void;
  loginPromptReason: 'cart' | 'checkout' | 'orders' | null;
  setLoginPromptReason: (reason: 'cart' | 'checkout' | 'orders' | null) => void;

  // Products & Inventory Synchronization
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number, inStock?: boolean) => void;
  resetProductsToDefault: () => void;

  // Admin Customers Synchronization
  customers: AdminCustomer[];
  addCustomer: (customer: AdminCustomer) => void;
  updateCustomer: (id: string, updated: Partial<AdminCustomer>) => void;

  // Admin Order Actions
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartWeightKg: number;

  // Delivery & Discounts
  deliveryCity: 'Dhaka' | 'Outside Dhaka';
  setDeliveryCity: (city: 'Dhaka' | 'Outside Dhaka') => void;
  deliveryCharge: number;
  appliedCoupon: string;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  pointsToRedeem: number;
  setPointsToRedeem: (pts: number) => void;
  pointsDiscount: number;
  cartTotal: number;

  // User Profile & Loyalty
  isLoggedIn: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  loginWithPhoneOtp: (phone: string, name?: string) => Promise<boolean>;
  logout: () => void;
  currentUser: UserProfile;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  redeemVoucher: (rewardId: string) => boolean;

  // Orders & Tracking
  orders: Order[];
  currentTrackingOrderId: string;
  setCurrentTrackingOrderId: (id: string) => void;
  currentTrackingOrder: Order | undefined;
  lastPlacedOrder: Order | null;
  pendingPaymentMethod: PaymentMethod;
  setPendingPaymentMethod: (pm: PaymentMethod) => void;
  pendingCheckoutData: {
    name: string;
    phone: string;
    address: string;
    city: 'Dhaka' | 'Outside Dhaka';
    notes?: string;
  };
  setPendingCheckoutData: React.Dispatch<React.SetStateAction<{
    name: string;
    phone: string;
    address: string;
    city: 'Dhaka' | 'Outside Dhaka';
    notes?: string;
  }>>;

  // Order Actions
  initiateCheckout: (formData: {
    name: string;
    phone: string;
    address: string;
    city: 'Dhaka' | 'Outside Dhaka';
    paymentMethod: PaymentMethod;
    notes?: string;
  }) => void;
  completeOrder: (transactionId?: string) => Order;
  advanceOrderStatus: (orderId: string) => void;
  updateOrderCourier: (orderId: string, courier: Partial<CourierDetails>, newStatus?: OrderStatus) => void;
  reorderItems: (order: Order) => void;
}

const INITIAL_USER: UserProfile = {
  id: 'usr-faruq-01',
  name: 'মো. ওমর ফারুক',
  phone: '01842078717',
  email: 'faruqdeveloper@gmail.com',
  loyaltyPoints: 240,
  tier: 'Silver',
  totalSpent: 4850,
  joinedDate: '১৫ জানুয়ারি, ২০২৪',
  savedAddresses: [
    {
      id: 'addr-1',
      tag: 'Home',
      address: 'বাড়ি নং ৪২, রোড নং ৭, সেক্টর ৪, উত্তরা',
      city: 'Dhaka',
    },
    {
      id: 'addr-2',
      tag: 'Office',
      address: 'লেভেল ৬, প্লট ১৬, মতিঝিল বা/এ',
      city: 'Dhaka',
    },
  ],
  activeRewards: [
    {
      id: 'rw-1',
      code: 'DESHI50',
      title: 'যেকোনো সরিষার তেলে ৫০ টাকা ছাড়',
      discountTaka: 50,
      pointsRequired: 100,
      expiryDate: '৩১ ডিসেম্বর, ২০২৬',
      isRedeemed: false,
    },
    {
      id: 'rw-2',
      code: 'FREESHIP',
      title: 'ফ্রি হোম ডেলিভারি ভাউচার',
      discountTaka: 60,
      pointsRequired: 150,
      expiryDate: '১৫ নভেম্বর, ২০২৬',
      isRedeemed: false,
    },
  ],
};

const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'c-1',
    name: 'Rafiul Islam',
    phone: '01712-345678',
    email: 'rafiul@example.com',
    totalOrders: 5,
    totalSpent: 7850,
    joinedDate: 'Jan 12, 2025',
    status: 'VIP',
  },
  {
    id: 'c-2',
    name: 'Tashfia Rahman',
    phone: '01819-876543',
    email: 'tashfia.r@example.com',
    totalOrders: 4,
    totalSpent: 9600,
    joinedDate: 'Feb 03, 2025',
    status: 'VIP',
  },
  {
    id: 'c-3',
    name: 'Md. Hasan',
    phone: '01911-223344',
    email: 'hasan.bd@example.com',
    totalOrders: 2,
    totalSpent: 2350,
    joinedDate: 'Mar 15, 2025',
    status: 'Active',
  },
  {
    id: 'c-4',
    name: 'Sadia Akter',
    phone: '01622-334455',
    email: 'sadia.akter@example.com',
    totalOrders: 6,
    totalSpent: 14200,
    joinedDate: 'Dec 20, 2024',
    status: 'VIP',
  },
  {
    id: 'c-5',
    name: 'Imran Hossain',
    phone: '01788-990011',
    email: 'imran.h@example.com',
    totalOrders: 3,
    totalSpent: 4890,
    joinedDate: 'Apr 02, 2025',
    status: 'Active',
  },
  {
    id: 'c-6',
    name: 'মো. ওমর ফারুক',
    phone: '01842078717',
    email: 'faruqdeveloper@gmail.com',
    totalOrders: 8,
    totalSpent: 18450,
    joinedDate: 'Jan 15, 2024',
    status: 'VIP',
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'DF-10086',
    date: 'Sep 18, 2025 04:32 PM',
    customerName: 'Rafiul Islam',
    customerPhone: '01712-345678',
    customerAddress: 'House 12, Road 4, Sector 7, Uttara, Dhaka',
    customerCity: 'Dhaka',
    items: [
      { product: PRODUCTS.find(p => p.id === 'df-dates-ajwa') || PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS.find(p => p.id === 'df-honey-500g') || PRODUCTS[1], quantity: 1 },
    ],
    subtotal: 1600,
    deliveryCharge: 60,
    discount: 410,
    loyaltyPointsRedeemed: 0,
    total: 1250,
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    transactionId: 'TRX-BK-10086',
    orderStatus: 'delivered',
    totalWeightKg: 1.0,
    courierDetails: {
      partner: 'Steadfast',
      consignmentId: 'STDF-10086',
      riderName: 'তানভীর আহমেদ',
      riderPhone: '01711-223344',
      estimatedDeliveryDate: 'Sep 18, 2025',
    },
    trackingHistory: [
      {
        title: 'Delivered',
        description: 'Order successfully delivered to customer',
        time: 'Sep 18, 04:32 PM',
      },
    ],
  },
  {
    id: 'DF-10085',
    date: 'Sep 18, 2025 02:15 PM',
    customerName: 'Tashfia Rahman',
    customerPhone: '01819-876543',
    customerAddress: 'Flat 5B, Concord Tower, Banani, Dhaka',
    customerCity: 'Dhaka',
    items: [
      { product: PRODUCTS.find(p => p.id === 'df-ghee-1kg') || PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS.find(p => p.id === 'df-honey-500g') || PRODUCTS[1], quantity: 1 },
      { product: PRODUCTS.find(p => p.id === 'df-oil-1l') || PRODUCTS[2], quantity: 1 },
    ],
    subtotal: 2420,
    deliveryCharge: 60,
    discount: 0,
    loyaltyPointsRedeemed: 0,
    total: 2680,
    paymentMethod: 'nagad',
    paymentStatus: 'paid',
    transactionId: 'TRX-NG-10085',
    orderStatus: 'processing',
    totalWeightKg: 2.5,
    courierDetails: {
      partner: 'Pathao',
      consignmentId: 'PTH-10085',
      riderName: 'সুমন হোসেন',
      riderPhone: '01822-998877',
      estimatedDeliveryDate: 'Sep 19, 2025',
    },
    trackingHistory: [
      {
        title: 'Processing',
        description: 'Quality check and eco-friendly packing underway',
        time: 'Sep 18, 02:15 PM',
      },
    ],
  },
  {
    id: 'DF-10084',
    date: 'Sep 18, 2025 12:45 PM',
    customerName: 'Md. Hasan',
    customerPhone: '01911-223344',
    customerAddress: 'Block C, Bashundhara R/A, Dhaka',
    customerCity: 'Dhaka',
    items: [
      { product: PRODUCTS.find(p => p.id === 'df-dates-ajwa') || PRODUCTS[0], quantity: 1 },
    ],
    subtotal: 950,
    deliveryCharge: 60,
    discount: 30,
    loyaltyPointsRedeemed: 0,
    total: 980,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'confirmed',
    totalWeightKg: 0.5,
    courierDetails: {
      partner: 'Steadfast',
      consignmentId: 'STDF-10084',
      riderName: 'কামাল উদ্দিন',
      riderPhone: '01733-445566',
      estimatedDeliveryDate: 'Sep 19, 2025',
    },
    trackingHistory: [
      {
        title: 'Confirmed',
        description: 'Order confirmed and scheduled for pickup',
        time: 'Sep 18, 12:45 PM',
      },
    ],
  },
  {
    id: 'DF-10083',
    date: 'Sep 17, 2025 08:22 PM',
    customerName: 'Sadia Akter',
    customerPhone: '01622-334455',
    customerAddress: 'Dhanmondi 27, Dhaka',
    customerCity: 'Dhaka',
    items: [
      { product: PRODUCTS.find(p => p.id === 'df-oil-2l') || PRODUCTS[0], quantity: 2 },
      { product: PRODUCTS.find(p => p.id === 'df-ghee-1kg') || PRODUCTS[1], quantity: 1 },
      { product: PRODUCTS.find(p => p.id === 'df-spices-combo') || PRODUCTS[2], quantity: 1 },
    ],
    subtotal: 3210,
    deliveryCharge: 60,
    discount: 0,
    loyaltyPointsRedeemed: 0,
    total: 3450,
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    transactionId: 'TRX-BK-10083',
    orderStatus: 'shipped',
    totalWeightKg: 5.8,
    courierDetails: {
      partner: 'RedX',
      consignmentId: 'RDX-10083',
      riderName: 'জাকির হোসেন',
      riderPhone: '01511-778899',
      estimatedDeliveryDate: 'Sep 18, 2025',
    },
    trackingHistory: [
      {
        title: 'Shipped',
        description: 'Parcel in transit to customer doorstep',
        time: 'Sep 17, 08:22 PM',
      },
    ],
  },
  {
    id: 'DF-10082',
    date: 'Sep 17, 2025 05:10 PM',
    customerName: 'Imran Hossain',
    customerPhone: '01788-990011',
    customerAddress: 'Mirpur DOHS, Dhaka',
    customerCity: 'Dhaka',
    items: [
      { product: PRODUCTS.find(p => p.id === 'df-honey-500g') || PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS.find(p => p.id === 'df-dates-ajwa') || PRODUCTS[1], quantity: 1 },
    ],
    subtotal: 1600,
    deliveryCharge: 120,
    discount: 0,
    loyaltyPointsRedeemed: 0,
    total: 1720,
    paymentMethod: 'nagad',
    paymentStatus: 'paid',
    transactionId: 'TRX-NG-10082',
    orderStatus: 'delivered',
    totalWeightKg: 1.0,
    courierDetails: {
      partner: 'Steadfast',
      consignmentId: 'STDF-10082',
      riderName: 'তানভীর আহমেদ',
      riderPhone: '01711-223344',
      estimatedDeliveryDate: 'Sep 18, 2025',
    },
    trackingHistory: [
      {
        title: 'Delivered',
        description: 'Delivered and payment collected',
        time: 'Sep 17, 05:10 PM',
      },
    ],
  },
  {
    id: 'DF-1408',
    date: '১২ সেপ্টেম্বর, ২০২৬ ১২:৩০ PM',
    customerName: 'মো. ওমর ফারুক',
    customerPhone: '01842078717',
    customerAddress: 'বাড়ি নং ৪২, রোড নং ৭, সেক্টর ৪, উত্তরা, ঢাকা',
    customerCity: 'Dhaka',
    items: [
      { product: PRODUCTS[0], quantity: 1 }, // Mustard oil 2L
      { product: PRODUCTS[1], quantity: 2 }, // Turmeric powder
    ],
    subtotal: 1000,
    deliveryCharge: 60,
    discount: 50,
    loyaltyPointsRedeemed: 50,
    total: 1010,
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    transactionId: 'TRX-BK-928472',
    orderStatus: 'out_for_delivery',
    totalWeightKg: 3.0,
    courierDetails: {
      partner: 'Steadfast',
      consignmentId: 'STDF-884920',
      riderName: 'তানভীর আহমেদ',
      riderPhone: '01711-223344',
      estimatedDeliveryDate: 'আজ বিকেল ৫:৩০ এর মধ্যে',
    },
    trackingHistory: [
      {
        title: 'অর্ডার গৃহীত ও পেমেন্ট সফল',
        description: 'bKash এর মাধ্যমে ৳ ১০১০ পরিশোধ সম্পন্ন হয়েছে।',
        time: '১২ সেপ্টেম্বর - ১২:৩০ PM',
      },
      {
        title: 'কোয়ালিটি চেক ও ফুড-গ্রেড প্যাকেজিং',
        description: 'সরিষার তেলের সিল ও প্যাকেটের ওজন নিখুঁতভাবে যাচাইকৃত।',
        time: '১২ সেপ্টেম্বর - ০১:১৫ PM',
      },
      {
        title: 'স্টেডফাস্ট কুরিয়ার হাবে স্থানান্তর',
        description: 'পার্সেলটি উত্তরা হাবের কনসাইনমেন্ট আইডিতে নথিভুক্ত।',
        time: '১২ সেপ্টেম্বর - ০২:৪৫ PM',
      },
      {
        title: 'ডেলিভারির উদ্দেশ্যে রাইডার রওনা দিয়েছেন',
        description: 'রাইডার তানভীর আহমেদ (01711-223344) আপনার গন্তব্যের পথে।',
        time: '১২ সেপ্টেম্বর - ০৩:২০ PM',
      },
    ],
  },
  {
    id: 'DF-1290',
    date: '২৮ আগস্ট, ২০২৬ ০৪:১৫ PM',
    customerName: 'মো. ওমর ফারুক',
    customerPhone: '01842078717',
    customerAddress: 'লেভেল ৬, প্লট ১৬, মতিঝিল বা/এ, ঢাকা',
    customerCity: 'Dhaka',
    items: [
      { product: PRODUCTS[4], quantity: 1 }, // Honey
      { product: PRODUCTS[5], quantity: 1 }, // Ghee
    ],
    subtotal: 1300,
    deliveryCharge: 60,
    discount: 0,
    loyaltyPointsRedeemed: 0,
    total: 1360,
    paymentMethod: 'cod',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    totalWeightKg: 1.4,
    courierDetails: {
      partner: 'Pathao',
      consignmentId: 'PTH-748291',
      riderName: 'সুমন হোসেন',
      riderPhone: '01822-998877',
      estimatedDeliveryDate: '২৯ আগস্ট, ২০২৬',
    },
    trackingHistory: [
      {
        title: 'অর্ডার সম্পন্ন',
        description: 'ক্যাশ অন ডেলিভারিতে নগদ ৳ ১৩৬০ পরিশোধ করা হয়েছে।',
        time: '২৯ আগস্ট - ০২:১০ PM',
      },
    ],
  },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<'shop' | 'tracking' | 'dashboard' | 'shipping_hub' | 'story' | 'admin'>('shop');
  const [dashboardSubTab, setDashboardSubTab] = useState<'orders' | 'addresses'>('orders');
  const [adminSubTab, setAdminSubTab] = useState<AdminSubTab>('dashboard');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpenState] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [shippingLabelOrder, setShippingLabelOrder] = useState<Order | null>(null);
  const [loginPromptReason, setLoginPromptReason] = useState<'cart' | 'checkout' | 'orders' | null>(null);
  const [pendingCartItem, setPendingCartItem] = useState<{ product: Product; quantity: number } | null>(null);

  // Products & Inventory State (Synchronized between Admin and Storefront)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('deshifood_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('deshifood_products', JSON.stringify(products));
  }, [products]);

  // Cross-tab synchronization for products
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'deshifood_products' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setProducts(parsed);
          }
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem('deshifood_products', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save products to localStorage:', err);
      }
      return updated;
    });

    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.product.id !== id);
      try {
        localStorage.setItem('deshifood_cart', JSON.stringify(updatedCart));
      } catch (err) {
        console.error('Failed to save cart to localStorage:', err);
      }
      return updatedCart;
    });

    setQuickViewProduct((prev) => (prev?.id === id ? null : prev));
  };

  const updateStock = (id: string, newStock: number, inStock?: boolean) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              stockCount: Math.max(0, newStock),
              inStock: inStock !== undefined ? inStock : newStock > 0,
            }
          : p
      )
    );
  };

  const resetProductsToDefault = () => {
    setProducts(PRODUCTS);
    try {
      localStorage.setItem('deshifood_products', JSON.stringify(PRODUCTS));
    } catch (err) {
      console.error('Failed to reset products:', err);
    }
  };

  // Customers State (Synchronized between Admin and Storefront)
  const [customers, setCustomers] = useState<AdminCustomer[]>(() => {
    try {
      const saved = localStorage.getItem('deshifood_customers');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_CUSTOMERS;
  });

  useEffect(() => {
    localStorage.setItem('deshifood_customers', JSON.stringify(customers));
  }, [customers]);

  const addCustomer = (customer: AdminCustomer) => {
    setCustomers((prev) => [customer, ...prev]);
  };

  const updateCustomer = (id: string, updated: Partial<AdminCustomer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  // Cart State (Initialized with 1 Mustard Oil so user immediately sees real data like in demo video)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('deshifood_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [{ product: PRODUCTS[0], quantity: 1 }];
  });

  useEffect(() => {
    localStorage.setItem('deshifood_cart', JSON.stringify(cart));
  }, [cart]);

  // Delivery & Discount State
  const [deliveryCity, setDeliveryCity] = useState<'Dhaka' | 'Outside Dhaka'>('Dhaka');
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);

  // User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('deshifood_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_USER;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('deshifood_is_logged_in');
      if (saved !== null) return saved === 'true';
    } catch {
      // ignore
    }
    return false; // Default guest: require login for add-to-cart & checkout as requested
  });

  const setIsCheckoutOpen = (open: boolean) => {
    if (open && !isLoggedIn) {
      setLoginPromptReason('checkout');
      setIsLoginModalOpen(true);
      return;
    }
    setIsCheckoutOpenState(open);
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('deshifood_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('deshifood_is_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('deshifood_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('deshifood_orders', JSON.stringify(orders));
  }, [orders]);

  const [currentTrackingOrderId, setCurrentTrackingOrderId] = useState<string>('DF-1408');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [pendingPaymentMethod, setPendingPaymentMethod] = useState<PaymentMethod>('bkash');
  const [pendingCheckoutData, setPendingCheckoutData] = useState<{
    name: string;
    phone: string;
    address: string;
    city: 'Dhaka' | 'Outside Dhaka';
    notes?: string;
  }>({
    name: currentUser.name,
    phone: currentUser.phone,
    address: currentUser.savedAddresses[0]?.address || 'বাড়ি নং ৪২, রোড নং ৭, সেক্টর ৪, উত্তরা',
    city: 'Dhaka',
    notes: '',
  });

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartWeightKg = parseFloat(
    cart.reduce((sum, item) => sum + item.product.weightInKg * item.quantity, 0).toFixed(2)
  );

  // Delivery charge calculation: Dhaka: ৳60, Outside: ৳120; Free if subtotal >= 2500
  const deliveryCharge = cartSubtotal >= 2500 ? 0 : deliveryCity === 'Dhaka' ? 60 : 120;
  const pointsDiscount = pointsToRedeem; // 1 point = 1 Taka
  const cartTotal = Math.max(0, cartSubtotal + deliveryCharge - couponDiscount - pointsDiscount);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    if (!isLoggedIn) {
      setPendingCartItem({ product, quantity });
      setLoginPromptReason('cart');
      setIsLoginModalOpen(true);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setPointsToRedeem(0);
    setAppliedCoupon('');
    setCouponDiscount(0);
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'DESHI10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedCoupon('DESHI10');
      setCouponDiscount(discount);
      return { success: true, message: '১০% বিশেষ ছাড় যুক্ত হয়েছে!' };
    }
    if (trimmed === 'FREESHIP') {
      setAppliedCoupon('FREESHIP');
      setCouponDiscount(deliveryCharge);
      return { success: true, message: 'ফ্রি ডেলিভারি ছাড় প্রযোজ্য হয়েছে!' };
    }
    if (trimmed === 'DESHI50') {
      setAppliedCoupon('DESHI50');
      setCouponDiscount(50);
      return { success: true, message: '৫০ টাকা ছাড় প্রযোজ্য হয়েছে!' };
    }
    return { success: false, message: 'ভুল কুপন কোড! DESHI10 অথবা FREESHIP ব্যবহার করুন।' };
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    setCouponDiscount(0);
  };

  // User Profile & Authentication Actions
  const loginWithPhoneOtp = async (phone: string, name?: string): Promise<boolean> => {
    const updatedName = name && name.trim() ? name.trim() : (currentUser.name || 'সম্মানিত গ্রাহক');
    setCurrentUser((prev) => ({
      ...prev,
      phone,
      name: updatedName,
    }));
    setPendingCheckoutData((prev) => ({
      ...prev,
      phone,
      name: updatedName,
    }));
    setIsLoggedIn(true);

    // If an item was queued during "Add to Cart" while logged out, add it now
    if (pendingCartItem) {
      const itemToAdd = pendingCartItem;
      setCart((prev) => {
        const existing = prev.find((item) => item.product.id === itemToAdd.product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === itemToAdd.product.id
              ? { ...item, quantity: item.quantity + itemToAdd.quantity }
              : item
          );
        }
        return [...prev, { product: itemToAdd.product, quantity: itemToAdd.quantity }];
      });
      setPendingCartItem(null);
      setIsCartOpen(true);
    } else if (loginPromptReason === 'checkout') {
      setIsCheckoutOpenState(true);
    }

    setLoginPromptReason(null);
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('deshifood_is_logged_in', 'false');
    setIsCheckoutOpenState(false);
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...data }));
  };

  const redeemVoucher = (rewardId: string) => {
    const reward = currentUser.activeRewards.find((r) => r.id === rewardId);
    if (!reward || reward.isRedeemed) return false;
    if (currentUser.loyaltyPoints < reward.pointsRequired) return false;

    // Deduct points and mark redeemed
    setCurrentUser((prev) => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints - reward.pointsRequired,
      activeRewards: prev.activeRewards.map((r) =>
        r.id === rewardId ? { ...r, isRedeemed: true } : r
      ),
    }));

    // Apply discount
    setAppliedCoupon(reward.code);
    setCouponDiscount(reward.discountTaka);
    return true;
  };

  // Initiate Checkout
  const initiateCheckout = (formData: {
    name: string;
    phone: string;
    address: string;
    city: 'Dhaka' | 'Outside Dhaka';
    paymentMethod: PaymentMethod;
    notes?: string;
  }) => {
    setPendingCheckoutData(formData);
    setPendingPaymentMethod(formData.paymentMethod);
    setDeliveryCity(formData.city);

    // If online payment (bKash, Nagad, Card), open gateway modal; if COD, complete immediately
    if (formData.paymentMethod === 'cod') {
      completeOrder();
    } else {
      setIsCheckoutOpen(false);
      setIsPaymentModalOpen(true);
    }
  };

  // Complete Order
  const completeOrder = (transactionId?: string): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `DF-${randomNum}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('bn-BD')} ${now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}`;

    const newOrder: Order = {
      id: orderId,
      date: formattedDate,
      customerName: pendingCheckoutData.name || currentUser.name,
      customerPhone: pendingCheckoutData.phone || currentUser.phone,
      customerAddress: pendingCheckoutData.address,
      customerCity: pendingCheckoutData.city,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryCharge: deliveryCharge,
      discount: couponDiscount,
      loyaltyPointsRedeemed: pointsToRedeem,
      total: cartTotal,
      paymentMethod: pendingPaymentMethod,
      paymentStatus: pendingPaymentMethod === 'cod' ? 'pending_cod' : 'paid',
      transactionId: transactionId || (pendingPaymentMethod === 'bkash' ? `TRX-BK-${Math.floor(100000 + Math.random() * 900000)}` : undefined),
      orderStatus: 'confirmed',
      totalWeightKg: cartWeightKg,
      courierDetails: {
        partner: 'Steadfast',
        consignmentId: `STDF-${Math.floor(100000 + Math.random() * 900000)}`,
        riderName: 'অপেক্ষমাণ (প্যাকিং সম্পন্ন হলে নির্ধারিত হবে)',
        riderPhone: '01842-078717',
        estimatedDeliveryDate: pendingCheckoutData.city === 'Dhaka' ? '২৪-৪৮ ঘণ্টার মধ্যে' : '২-৩ কার্যদিবসের মধ্যে',
      },
      trackingHistory: [
        {
          title: 'অর্ডার গৃহীত ও কনফার্ম হয়েছে',
          description: pendingPaymentMethod === 'cod'
            ? 'ক্যাশ অন ডেলিভারিতে অর্ডার নিশ্চিত করা হয়েছে।'
            : `${pendingPaymentMethod.toUpperCase()} পেমেন্ট সফল হয়েছে।`,
          time: formattedDate,
        },
      ],
    };

    // Calculate earned loyalty points: 1 point per 20 Taka spent
    const earnedPoints = Math.floor(cartTotal / 20);

    // Update user stats
    setCurrentUser((prev) => {
      const updatedPoints = Math.max(0, prev.loyaltyPoints - pointsToRedeem) + earnedPoints;
      const updatedTotalSpent = prev.totalSpent + cartTotal;
      let newTier = prev.tier;
      if (updatedTotalSpent >= 10000) newTier = 'Platinum';
      else if (updatedTotalSpent >= 5000) newTier = 'Gold';
      else if (updatedTotalSpent >= 2000) newTier = 'Silver';

      return {
        ...prev,
        loyaltyPoints: updatedPoints,
        totalSpent: updatedTotalSpent,
        tier: newTier,
      };
    });

    // Synchronize Inventory & Sales counts
    setProducts((prev) =>
      prev.map((prod) => {
        const itemInCart = cart.find((ci) => ci.product.id === prod.id);
        if (itemInCart) {
          const newStock = Math.max(0, (prod.stockCount ?? 20) - itemInCart.quantity);
          return {
            ...prod,
            stockCount: newStock,
            soldCount: (prod.soldCount ?? 0) + itemInCart.quantity,
            inStock: newStock > 0,
          };
        }
        return prod;
      })
    );

    // Synchronize Customer record
    setCustomers((prev) => {
      const phone = newOrder.customerPhone;
      const existing = prev.find((c) => c.phone === phone);
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpent: c.totalSpent + newOrder.total,
                name: newOrder.customerName || c.name,
              }
            : c
        );
      } else {
        const newCust: AdminCustomer = {
          id: `c-${Date.now()}`,
          name: newOrder.customerName,
          phone: newOrder.customerPhone,
          email: `${newOrder.customerPhone.replace(/[^0-9]/g, '')}@customer.deshifood.com`,
          totalOrders: 1,
          totalSpent: newOrder.total,
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'Active',
        };
        return [newCust, ...prev];
      }
    });

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setCurrentTrackingOrderId(orderId);
    clearCart();
    setIsCheckoutOpen(false);
    setIsPaymentModalOpen(false);
    setIsOrderSuccessOpen(true);

    return newOrder;
  };

  // Admin Order Status Update
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const now = new Date();
        const timeStr = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
        return {
          ...order,
          orderStatus: newStatus,
          trackingHistory: [
            ...order.trackingHistory,
            {
              title: `Status: ${newStatus.toUpperCase()}`,
              description: `Order marked as ${newStatus} by store admin`,
              time: timeStr,
            },
          ],
        };
      })
    );
  };

  // Admin Delete Order
  const deleteOrder = (orderId: string) => {
    setOrders((prev) => {
      const updated = prev.filter((o) => o.id !== orderId);
      try {
        localStorage.setItem('deshifood_orders', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save orders to localStorage:', err);
      }
      return updated;
    });
  };

  // Live order status simulator for real-time tracking demonstration
  const advanceOrderStatus = (orderId: string) => {
    const statusFlow: OrderStatus[] = ['confirmed', 'packaging', 'shipped', 'out_for_delivery', 'delivered'];
    
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const currentIndex = statusFlow.indexOf(order.orderStatus);
        if (currentIndex < 0 || currentIndex >= statusFlow.length - 1) return order;

        const nextStatus = statusFlow[currentIndex + 1];
        const now = new Date();
        const timeStr = `${now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}`;

        let newLog = { title: '', description: '', time: `আজ ${timeStr}` };
        let updatedCourier = { ...order.courierDetails };

        if (nextStatus === 'packaging') {
          newLog = {
            title: 'ফুড-গ্রেড সিলিং ও কোয়ালিটি প্যাকিং সম্পন্ন',
            description: 'অটোমেটিক ওজন স্কেলে সঠিকতা পরিমাপ ও বাবল র‍্যাপ সিলিং সম্পন্ন।',
            time: `আজ ${timeStr}`,
          };
        } else if (nextStatus === 'shipped') {
          newLog = {
            title: `${order.courierDetails.partner} কুরিয়ার হাবে হস্তান্তর`,
            description: `কনসাইনমেন্ট নং ${order.courierDetails.consignmentId} এ স্ক্যানিং সম্পন্ন।`,
            time: `আজ ${timeStr}`,
          };
        } else if (nextStatus === 'out_for_delivery') {
          updatedCourier.riderName = 'তানভীর আহমেদ (রাইডার)';
          updatedCourier.riderPhone = '01711-223344';
          newLog = {
            title: 'ডেলিভারির উদ্দেশ্যে রাইডার রওনা দিয়েছেন',
            description: `রাইডার তানভীর আহমেদ আপনার ঠিকানায় আসার পথে রয়েছে।`,
            time: `আজ ${timeStr}`,
          };
        } else if (nextStatus === 'delivered') {
          newLog = {
            title: 'সফলভাবে ডেলিভারি সম্পন্ন হয়েছে',
            description: 'গ্রাহক পণ্য গ্রহণ করেছেন এবং সন্তুষ্টি প্রকাশ করেছেন।',
            time: `আজ ${timeStr}`,
          };
        }

        return {
          ...order,
          orderStatus: nextStatus,
          courierDetails: updatedCourier,
          trackingHistory: [...order.trackingHistory, newLog],
        };
      })
    );
  };

  // Update order courier / logistics dispatching
  const updateOrderCourier = (
    orderId: string, 
    courierUpdate: Partial<CourierDetails>, 
    newStatus?: OrderStatus
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const updated = {
          ...order,
          courierDetails: { ...order.courierDetails, ...courierUpdate },
          orderStatus: newStatus || order.orderStatus,
        };
        if (newStatus && newStatus !== order.orderStatus) {
          const now = new Date();
          const timeStr = `${now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}`;
          updated.trackingHistory = [
            ...order.trackingHistory,
            {
              title: `লজিস্টিক আপডেট: ${courierUpdate.partner || order.courierDetails.partner}`,
              description: `কনসাইনমেন্ট আইডি: ${courierUpdate.consignmentId || order.courierDetails.consignmentId}`,
              time: `আজ ${timeStr}`,
            },
          ];
        }
        return updated;
      })
    );
  };

  // Reorder items
  const reorderItems = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity);
    });
    setIsCartOpen(true);
  };

  const currentTrackingOrder = orders.find((o) => o.id === currentTrackingOrderId) || orders[0];

  return (
    <StoreContext.Provider
      value={{
        activeTab,
        setActiveTab,
        dashboardSubTab,
        setDashboardSubTab,
        adminSubTab,
        setAdminSubTab,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetProductsToDefault,
        customers,
        addCustomer,
        updateCustomer,
        updateOrderStatus,
        deleteOrder,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        quickViewProduct,
        setQuickViewProduct,
        shippingLabelOrder,
        setShippingLabelOrder,
        loginPromptReason,
        setLoginPromptReason,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartWeightKg,
        deliveryCity,
        setDeliveryCity,
        deliveryCharge,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        pointsToRedeem,
        setPointsToRedeem,
        pointsDiscount,
        cartTotal,
        isLoggedIn,
        isLoginModalOpen,
        setIsLoginModalOpen,
        loginWithPhoneOtp,
        logout,
        currentUser,
        updateUserProfile,
        redeemVoucher,
        orders,
        currentTrackingOrderId,
        setCurrentTrackingOrderId,
        currentTrackingOrder,
        lastPlacedOrder,
        pendingPaymentMethod,
        setPendingPaymentMethod,
        pendingCheckoutData,
        setPendingCheckoutData,
        initiateCheckout,
        completeOrder,
        advanceOrderStatus,
        updateOrderCourier,
        reorderItems,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
