export type UserRole = 'CUSTOMER' | 'SELLER' | 'RIDER' | 'CUSTOMER_SERVICE' | 'ADMIN';

export type VendorCategory = 'RESTAURANT' | 'PHARMACY' | 'SUPER_SHOP';

export type FoodCategory = 'জনপ্রিয়' | 'বিরিয়ানি' | 'ভাত' | 'মাছ' | 'মাংস' | 'ফাস্টফুড' | 'মিষ্টি ও ডেজার্ট' | 'পানীয়' | 'ওষুধ' | 'মুদি বাজার';

export type OrderStatus =
  | 'PLACED'              // অর্ডার করা হয়েছে
  | 'ACCEPTED_BY_SELLER'  // দোকান অর্ডার গ্রহণ করেছে
  | 'PREPARING'           // পণ্য প্রস্তুত হচ্ছে
  | 'READY_FOR_PICKUP'    // ডেলিভারির জন্য প্রস্তুত
  | 'RIDER_SEARCHING'     // ডেলিভারিম্যান খোঁজা হচ্ছে
  | 'RIDER_ASSIGNED'      // ডেলিভারিম্যান অর্ডার গ্রহণ করেছে
  | 'RIDER_AT_VENDOR'     // রাইডার দোকানে পৌঁছেছে
  | 'PICKED_UP'           // দোকান থেকে পণ্য সংগ্রহ করা হয়েছে
  | 'OUT_FOR_DELIVERY'    // আপনার কাছে আসছে
  | 'DELIVERED'           // অর্ডার পৌঁছে গেছে
  | 'COMPLETED'           // সম্পন্ন
  | 'CANCELLED'           // বাতিল
  | 'ISSUE_REPORTED';     // সমস্যা রিপোর্ট করা হয়েছে

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  bengaliName: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: FoodCategory;
  image: string;
  isAvailable: boolean;
  unit?: string;
  tags?: string[];
  isPopular?: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  bengaliName: string;
  category: VendorCategory;
  rating: number;
  totalReviews: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  deliveryFee: number;
  minOrder: number;
  isOpen: boolean;
  address: string;
  zone: string;
  phone: string;
  image: string;
  logo: string;
  cuisineOrType: string;
  isFeatured?: boolean;
  coordinates: { x: number; y: number }; // Simulated Kashiani map grid coordinates (0-100)
}

export interface Rider {
  id: string;
  name: string;
  bengaliName: string;
  phone: string;
  photo: string;
  rating: number;
  totalDeliveries: number;
  vehicleType: 'মোটরসাইকেল' | 'সাইকেল' | 'ইলেকট্রিক বাইক';
  vehicleNumber: string;
  isOnline: boolean;
  isAvailable: boolean;
  currentZone: string;
  todayEarnings: number;
  coordinates: { x: number; y: number };
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  defaultAddress: string;
  zone: string;
  landmark: string;
  totalOrders: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  selectedPrice: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. DB-1024
  customer: Customer;
  vendor: Vendor;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: 'ক্যাশ অন ডেলিভারি' | 'বিকাশ (bKash)' | 'নগদ (Nagad)';
  isPaid: boolean;
  status: OrderStatus;
  statusNote?: string;
  placedAt: string;
  estimatedDeliveryMinutes: number;
  deliveryAddress: string;
  deliveryZone: string;
  landmark: string;
  specialInstructions?: string;
  assignedRider?: Rider;
  timeline: {
    status: OrderStatus;
    title: string;
    timestamp: string;
    description: string;
  }[];
  riderMatchingAttempts?: {
    riderId: string;
    riderName: string;
    distanceKm: number;
    score: number;
    status: 'OFFERED' | 'ACCEPTED' | 'PASSED';
  }[];
  issueReport?: {
    type: string;
    description: string;
    status: 'OPEN' | 'RESOLVED';
    internalNotes?: string;
  };
}

export interface AppNotification {
  id: string;
  targetRole: UserRole | 'ALL';
  title: string;
  message: string;
  timestamp: string;
  orderId?: string;
  isRead: boolean;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
}

export interface SupportMessage {
  id: string;
  sender: 'USER' | 'AI' | 'AGENT';
  senderName: string;
  text: string;
  timestamp: string;
  quickReplies?: string[];
}
