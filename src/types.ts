export type Category = 'all' | 'oil' | 'spices' | 'health';

export interface Product {
  id: string;
  name: string;
  englishName: string;
  nameBn?: string;
  category: 'oil' | 'spices' | 'health' | 'honey' | 'dates' | 'snacks' | string;
  price: number;
  originalPrice?: number;
  packageSize: string;
  weightInKg: number;
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount?: number;
  soldCount?: number;
  shortDescription: string;
  fullDescription: string;
  description?: string;
  features: string[];
  popular?: boolean;
  badge?: string;
  origin?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'bkash' | 'nagad' | 'card' | 'cod';

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'packaging'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface AdminCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  avatar?: string;
  status: 'Active' | 'VIP' | 'Inactive';
}

export type AdminSubTab = 
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'categories'
  | 'customers'
  | 'inventory'
  | 'coupons'
  | 'reviews'
  | 'analytics'
  | 'settings';

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp?: string;
  location?: string;
  completed: boolean;
  current: boolean;
}

export interface CourierDetails {
  partner: 'Steadfast' | 'Pathao' | 'RedX' | 'Paperfly';
  consignmentId: string;
  trackingUrl?: string;
  riderName?: string;
  riderPhone?: string;
  estimatedDeliveryDate: string;
}

export interface Order {
  id: string; // e.g. DF-1408
  date: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: 'Dhaka' | 'Outside Dhaka' | string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  loyaltyPointsRedeemed: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending_cod' | 'pending' | 'failed';
  transactionId?: string;
  orderStatus: OrderStatus;
  courierDetails: CourierDetails;
  totalWeightKg: number;
  trackingHistory: {
    title: string;
    description: string;
    time: string;
  }[];
}

export type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface LoyaltyReward {
  id: string;
  code: string;
  title: string;
  discountTaka: number;
  pointsRequired: number;
  expiryDate: string;
  isRedeemed: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  loyaltyPoints: number;
  tier: LoyaltyTier;
  totalSpent: number;
  joinedDate: string;
  savedAddresses: {
    id: string;
    tag: 'Home' | 'Office' | 'Other';
    address: string;
    city: 'Dhaka' | 'Outside Dhaka';
  }[];
  activeRewards: LoyaltyReward[];
}
