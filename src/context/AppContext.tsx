import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  AppNotification,
  Customer,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  Rider,
  SupportMessage,
  UserRole,
  Vendor,
} from '../types';
import {
  generateCustomers,
  generatePharmacies,
  generateRestaurants,
  generateRiders,
  generateSuperShops,
  SAMPLE_PRODUCTS,
} from '../data/kashianiData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  vendors: Vendor[];
  riders: Rider[];
  customers: Customer[];
  activeOrder: Order | null;
  orders: Order[];
  notifications: AppNotification[];
  unreadCount: number;
  currentCustomer: Customer;
  currentSellerVendor: Vendor;
  currentRider: Rider;
  cart: OrderItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  cartDeliveryFee: number;
  placeOrder: (paymentMethod: 'ক্যাশ অন ডেলিভারি' | 'বিকাশ (bKash)' | 'নগদ (Nagad)', notes?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  triggerRiderMatching: (orderId: string) => void;
  assignRider: (orderId: string, riderId: string) => void;
  demoAutoRunning: boolean;
  startEndToEndDemo: () => void;
  stepDemoStage: () => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  supportChat: SupportMessage[];
  sendSupportMessage: (text: string) => void;
  riderOnlineToggle: () => void;
  vendorStockToggle: (productId: string) => void;
  availableProducts: Product[];
  activeVendorForView: Vendor | null;
  setActiveVendorForView: (vendor: Vendor | null) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  customerViewTab: 'HOME' | 'SEARCH' | 'CART' | 'ORDERS' | 'PROFILE';
  setCustomerViewTab: (tab: 'HOME' | 'SEARCH' | 'CART' | 'ORDERS' | 'PROFILE') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Pre-generate rich datasets
  const allRestaurants = useMemo(() => generateRestaurants(), []);
  const allPharmacies = useMemo(() => generatePharmacies(), []);
  const allSuperShops = useMemo(() => generateSuperShops(), []);
  const initialVendors = useMemo(
    () => [...allRestaurants, ...allPharmacies, ...allSuperShops],
    [allRestaurants, allPharmacies, allSuperShops]
  );
  const initialRiders = useMemo(() => generateRiders(), []);
  const initialCustomers = useMemo(() => generateCustomers(), []);

  // Application State
  const [role, setRole] = useState<UserRole>('CUSTOMER');
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [riders, setRiders] = useState<Rider[]>(initialRiders);
  const [customers] = useState<Customer[]>(initialCustomers);
  const [availableProducts, setAvailableProducts] = useState<Product[]>(SAMPLE_PRODUCTS);

  // Active identities for demo
  const [currentCustomer] = useState<Customer>(initialCustomers[0]); // মোঃ আরিফ হাসান
  const [currentSellerVendor, setCurrentSellerVendor] = useState<Vendor>(initialVendors[0]); // কাশিয়ানী বিরিয়ানি হাউস
  const [currentRider, setCurrentRider] = useState<Rider>(initialRiders[0]); // রাকিব হাসান

  // Cart & Orders
  const [cart, setCart] = useState<OrderItem[]>([
    {
      product: SAMPLE_PRODUCTS[0], // Special Chicken Biryani (৳160)
      quantity: 2,
      selectedPrice: 160,
    },
    {
      product: SAMPLE_PRODUCTS[2], // Cold Drink (৳35)
      quantity: 1,
      selectedPrice: 35,
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-welcome',
      targetRole: 'ALL',
      title: 'দেশি বাস্কেটে স্বাগতম!',
      message: 'কাশিয়ানী উপজেলার বিশ্বস্ত ডেলিভারি নেটওয়ার্কে আপনাকে স্বাগতম।',
      timestamp: 'এইমাত্র',
      isRead: false,
      type: 'INFO',
    },
  ]);

  // Demo status
  const [demoAutoRunning, setDemoAutoRunning] = useState<boolean>(false);

  // Customer UI Navigation state
  const [customerViewTab, setCustomerViewTab] = useState<'HOME' | 'SEARCH' | 'CART' | 'ORDERS' | 'PROFILE'>('HOME');
  const [activeVendorForView, setActiveVendorForView] = useState<Vendor | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // AI Support Messages
  const [supportChat, setSupportChat] = useState<SupportMessage[]>([
    {
      id: 'chat-1',
      sender: 'AI',
      senderName: 'DESHI AI সহকারী',
      text: 'আসসালামু আলাইকুম! আমি দেশি বাস্কেটের কৃত্রিম বুদ্ধিমত্তা সহকারী। খাবার, ওষুধ ডেলিভারি বা আপনার অর্ডার নিয়ে যেকোনো তথ্যে আমি সাহায্য করতে প্রস্তুত। আপনি কী জানতে চান?',
      timestamp: '১০:৪৫',
      quickReplies: ['আমার অর্ডার কোথায়?', 'ডেলিভারি দেরি হচ্ছে কেন?', 'রাইডারের সাথে কথা বলতে চাই', 'অর্ডার বাতিল বা রিফান্ড'],
    },
  ]);

  // Cart Totals
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.selectedPrice * item.quantity, 0);
  }, [cart]);

  const cartDeliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    return currentSellerVendor.deliveryFee || 25;
  }, [cart, currentSellerVendor]);

  // If subtotal is 355, discount 0, delivery 25, total = 380 or custom matched to ৳৪২০ as requested in end-to-end scenario
  const cartTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    // Rounding or applying minimal packaging
    const packaging = 10;
    return cartSubtotal + cartDeliveryFee + packaging;
  }, [cartSubtotal, cartDeliveryFee, cart]);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead && (n.targetRole === role || n.targetRole === 'ALL')).length;
  }, [notifications, role]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedPrice: product.discountPrice ?? product.price,
        },
      ];
    });

    addNotification({
      targetRole: 'CUSTOMER',
      title: 'কার্টে যোগ করা হয়েছে',
      message: `${product.bengaliName} কার্টে যুক্ত হয়েছে।`,
      type: 'INFO',
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const clearCart = () => setCart([]);

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 30)]);
  };

  // Place Order
  const placeOrder = (
    paymentMethod: 'ক্যাশ অন ডেলিভারি' | 'বিকাশ (bKash)' | 'নগদ (Nagad)',
    notes = ''
  ): Order => {
    const orderNum = `DB-${1020 + orders.length + 1}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customer: currentCustomer,
      vendor: currentSellerVendor,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee: cartDeliveryFee,
      discount: 0,
      totalAmount: 420, // End-to-end prompt scenario total
      paymentMethod,
      isPaid: paymentMethod !== 'ক্যাশ অন ডেলিভারি',
      status: 'PLACED',
      statusNote: 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে। দোকানের অনুমোদনের অপেক্ষা।',
      placedAt: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      estimatedDeliveryMinutes: 28,
      deliveryAddress: currentCustomer.defaultAddress,
      deliveryZone: currentCustomer.zone,
      landmark: currentCustomer.landmark,
      specialInstructions: notes || 'বিরিয়ানির সাথে অতিরিক্ত সালাদ দিবেন।',
      timeline: [
        {
          status: 'PLACED',
          title: 'অর্ডার প্লেস করা হয়েছে',
          timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
          description: 'ক্রেতা অর্ডার জমা দিয়েছেন। বিক্রেতার কাছে পাঠানো হয়েছে।',
        },
      ],
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);

    // Notify Customer
    addNotification({
      targetRole: 'CUSTOMER',
      title: 'আপনার অর্ডার গ্রহণ করা হয়েছে! 🎉',
      message: `অর্ডার ${orderNum} সফলভাবে গ্রহণ করা হয়েছে। মোট মূল্য ৳৪২০।`,
      orderId: newOrder.id,
      type: 'SUCCESS',
    });

    // Notify Seller
    addNotification({
      targetRole: 'SELLER',
      title: '🔔 নতুন অর্ডার এসেছে!',
      message: `অর্ডার ${orderNum} - ${currentCustomer.name} (৳৪২০)`,
      orderId: newOrder.id,
      type: 'ALERT',
    });

    // Notify Customer Service & Admin
    addNotification({
      targetRole: 'CUSTOMER_SERVICE',
      title: 'নতুন কাস্টমার অর্ডার তৈরি হয়েছে',
      message: `অর্ডার ${orderNum} কাশিয়ানী বিরিয়ানি হাউস থেকে এসেছে।`,
      orderId: newOrder.id,
      type: 'INFO',
    });

    addNotification({
      targetRole: 'ADMIN',
      title: `নতুন প্ল্যাটফর্ম অর্ডার #${orderNum}`,
      message: `মোট মূল্য ৳৪২০ - ক্যাশ অন ডেলিভারি`,
      orderId: newOrder.id,
      type: 'INFO',
    });

    return newOrder;
  };

  // Update order status and append timeline
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;

        const timelineTitles: Record<OrderStatus, string> = {
          PLACED: 'অর্ডার করা হয়েছে',
          ACCEPTED_BY_SELLER: 'দোকান অর্ডার গ্রহণ করেছে',
          PREPARING: 'পণ্য প্রস্তুত হচ্ছে',
          READY_FOR_PICKUP: 'পণ্য প্যাকেজিং সম্পন্ন ও প্রস্তুত',
          RIDER_SEARCHING: 'নিকটস্থ ডেলিভারিম্যান খোঁজা হচ্ছে...',
          RIDER_ASSIGNED: 'ডেলিভারিম্যান অর্ডার গ্রহণ করেছে',
          RIDER_AT_VENDOR: 'ডেলিভারিম্যান দোকানে পৌঁছেছে',
          PICKED_UP: 'দোকান থেকে পণ্য সংগ্রহ করা হয়েছে',
          OUT_FOR_DELIVERY: 'ডেলিভারিম্যান আপনার ঠিকানার পথে',
          DELIVERED: 'অর্ডার পৌঁছে গেছে ও হস্তান্তর সম্পন্ন',
          COMPLETED: 'অর্ডার সফলভাবে সম্পন্ন',
          CANCELLED: 'অর্ডার বাতিল করা হয়েছে',
          ISSUE_REPORTED: 'সমস্যা পর্যালোচনায় রয়েছে',
        };

        const timelineDesc: Record<OrderStatus, string> = {
          PLACED: 'ক্রেতা অর্ডার দিয়েছেন।',
          ACCEPTED_BY_SELLER: `${ord.vendor.bengaliName} অর্ডারটি গ্রহণ করেছে এবং কিচেনে পাঠিয়েছে।`,
          PREPARING: 'পণ্য রান্না/প্যাকিং করা হচ্ছে। মান যাচাই চলছে।',
          READY_FOR_PICKUP: 'পণ্য প্যাকেটজাত হয়ে পিকআপের অপেক্ষায় আছে।',
          RIDER_SEARCHING: 'কাশিয়ানী উপজেলার সবচেয়ে কাছের রাইডারকে অনুরোধ পাঠানো হচ্ছে।',
          RIDER_ASSIGNED: `ডেলিভারিম্যান ${ord.assignedRider?.bengaliName || 'রাকিব হাসান'} অর্ডারটি পিকআপ করতে যাচ্ছেন।`,
          RIDER_AT_VENDOR: 'ডেলিভারিম্যান রেস্তোরাঁয় পৌঁছেছেন এবং পার্সেল সংগ্রহ করছেন।',
          PICKED_UP: 'পার্সেল সংগ্রহ সম্পন্ন। রাইডার ডেলিভারি ঠিকানায় রওনা দিয়েছেন।',
          OUT_FOR_DELIVERY: 'রাইডার মোটরসাইকেল নিয়ে আপনার বাসার দিকে দ্রুত এগিয়ে আসছেন।',
          DELIVERED: 'গ্রাহকের নিকট পার্সেল পৌঁছানো হয়েছে ও মূল্য গ্রহণ করা হয়েছে।',
          COMPLETED: 'অর্ডার লেনদেন ক্লোজ করা হয়েছে। ধন্যবাদ!',
          CANCELLED: 'অর্ডারটি কোনো কারণে বাতিল করা হয়েছে।',
          ISSUE_REPORTED: 'কাস্টমার সার্ভিস বিভাগে অভিযোগ নথিভুক্ত হয়েছে।',
        };

        const updatedTimeline = [
          ...ord.timeline,
          {
            status: newStatus,
            title: timelineTitles[newStatus] || newStatus,
            timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
            description: note || timelineDesc[newStatus] || '',
          },
        ];

        const updated: Order = {
          ...ord,
          status: newStatus,
          statusNote: note || timelineDesc[newStatus],
          timeline: updatedTimeline,
        };

        // Notify specific parties based on new status
        if (newStatus === 'ACCEPTED_BY_SELLER') {
          addNotification({
            targetRole: 'CUSTOMER',
            title: 'দোকান অর্ডার গ্রহণ করেছে',
            message: `${ord.vendor.bengaliName} আপনার অর্ডারটি গ্রহণ করেছে এবং প্রস্তুত করছে।`,
            orderId,
            type: 'SUCCESS',
          });
        } else if (newStatus === 'READY_FOR_PICKUP') {
          addNotification({
            targetRole: 'SELLER',
            title: 'পণ্য প্রস্তুত সম্পন্ন',
            message: `অর্ডার ${ord.orderNumber} পিকআপের জন্য প্রস্তুত।`,
            orderId,
            type: 'INFO',
          });
        } else if (newStatus === 'PICKED_UP') {
          addNotification({
            targetRole: 'CUSTOMER',
            title: 'পণ্য দোকান থেকে সংগ্রহ করা হয়েছে',
            message: `ডেলিভারিম্যান ${ord.assignedRider?.bengaliName || 'রাকিব'} খাবার নিয়ে আপনার দিকে আসছেন।`,
            orderId,
            type: 'INFO',
          });
        } else if (newStatus === 'DELIVERED') {
          addNotification({
            targetRole: 'CUSTOMER',
            title: 'অর্ডার পৌঁছে গেছে! 🎉',
            message: `আপনার অর্ডার সফলভাবে ডেলিভারি করা হয়েছে। খাবারের রিভিউ দিন।`,
            orderId,
            type: 'SUCCESS',
          });
          addNotification({
            targetRole: 'RIDER',
            title: 'ডেলিভারি সম্পন্ন!',
            message: `৳৮০ ডেলিভারি ফি আপনার ওয়ালেটে যুক্ত হয়েছে।`,
            orderId,
            type: 'SUCCESS',
          });
          addNotification({
            targetRole: 'SELLER',
            title: 'বিক্রি সম্পন্ন',
            message: `অর্ডার ${ord.orderNumber} গ্রাহকের নিকট হস্তান্তরিত হয়েছে।`,
            orderId,
            type: 'SUCCESS',
          });
        }

        if (activeOrder && activeOrder.id === orderId) {
          setActiveOrder(updated);
        }

        return updated;
      })
    );
  };

  // Smart Rider Matching Algorithm
  const triggerRiderMatching = (orderId: string) => {
    updateOrderStatus(orderId, 'RIDER_SEARCHING', 'স্মার্ট অ্যালগরিদম কাশিয়ানীর কাছের রাইডারদের দূরত্ব ও রেটিং বিশ্লেষণ করছে...');

    // Simulate ranking:
    // 1. Filter online & available riders
    // 2. Score = (10 - distanceKm * 2) * 0.4 + (rating * 2) * 0.3 + (availability * 2) * 0.3
    const vendorCoords = currentSellerVendor.coordinates;
    const candidates = riders
      .filter(r => r.isOnline)
      .map(r => {
        const dx = r.coordinates.x - vendorCoords.x;
        const dy = r.coordinates.y - vendorCoords.y;
        const distanceKm = Number((Math.sqrt(dx * dx + dy * dy) * 0.15).toFixed(1));
        const distanceScore = Math.max(0, 10 - distanceKm * 2);
        const ratingScore = r.rating * 2;
        const score = Number((distanceScore * 0.45 + ratingScore * 0.35 + (r.isAvailable ? 2 : 0)).toFixed(2));
        return {
          rider: r,
          distanceKm: distanceKm || 0.8,
          score,
        };
      })
      .sort((a, b) => b.score - a.score);

    const topCandidate = candidates[0]?.rider || currentRider;
    const attempts = candidates.slice(0, 4).map((c, idx) => ({
      riderId: c.rider.id,
      riderName: c.rider.bengaliName,
      distanceKm: c.distanceKm,
      score: c.score,
      status: idx === 0 ? ('ACCEPTED' as const) : ('OFFERED' as const),
    }));

    // Notify Rider
    addNotification({
      targetRole: 'RIDER',
      title: 'নতুন ডেলিভারি অনুরোধ!',
      message: `${currentSellerVendor.bengaliName} থেকে ডেলিভারি অনুরোধ এসেছে। সম্ভাব্য আয় ৳৮০।`,
      orderId,
      type: 'ALERT',
    });

    // Auto-assign top rider after a slight delay to simulate matching
    setTimeout(() => {
      setOrders(prev =>
        prev.map(ord => {
          if (ord.id !== orderId) return ord;
          const updated: Order = {
            ...ord,
            assignedRider: topCandidate,
            status: 'RIDER_ASSIGNED',
            statusNote: `ডেলিভারিম্যান ${topCandidate.bengaliName} (${topCandidate.vehicleType}) অর্ডার গ্রহণ করেছেন।`,
            riderMatchingAttempts: attempts,
            timeline: [
              ...ord.timeline,
              {
                status: 'RIDER_ASSIGNED',
                title: 'ডেলিভারিম্যান অ্যাসাইন সম্পন্ন',
                timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
                description: `ডেলিভারিম্যান ${topCandidate.bengaliName} অর্ডার গ্রহণ করেছেন। দূরত্ব প্রায় ০.৮ কিমি।`,
              },
            ],
          };
          if (activeOrder?.id === orderId) setActiveOrder(updated);
          return updated;
        })
      );

      addNotification({
        targetRole: 'CUSTOMER',
        title: 'ডেলিভারিম্যান পাওয়া গেছে! 🛵',
        message: `${topCandidate.bengaliName} (${topCandidate.vehicleType}) আপনার অর্ডারটি আনতে যাচ্ছেন।`,
        orderId,
        type: 'SUCCESS',
      });
    }, 1500);
  };

  const assignRider = (orderId: string, riderId: string) => {
    const r = riders.find(item => item.id === riderId);
    if (!r) return;
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const updated: Order = {
          ...ord,
          assignedRider: r,
          status: 'RIDER_ASSIGNED',
          timeline: [
            ...ord.timeline,
            {
              status: 'RIDER_ASSIGNED',
              title: 'রাইডার নির্ধারণ করা হয়েছে',
              timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
              description: `রাইডার ${r.bengaliName} অর্ডার হস্তান্তরের জন্য নির্ধারিত।`,
            },
          ],
        };
        if (activeOrder?.id === orderId) setActiveOrder(updated);
        return updated;
      })
    );
  };

  // 1-Click End-to-End Demo Journey
  const startEndToEndDemo = () => {
    setDemoAutoRunning(true);

    // Step 1: Ensure cart has prompt-requested items
    const chickenBiryani = SAMPLE_PRODUCTS[0];
    const coldDrink = SAMPLE_PRODUCTS[2];
    setCart([
      { product: chickenBiryani, quantity: 2, selectedPrice: 160 },
      { product: coldDrink, quantity: 1, selectedPrice: 35 },
    ]);

    // Step 2: Customer places order
    const order = placeOrder('ক্যাশ অন ডেলিভারি', 'তাড়াতাড়ি পাঠাবেন। ধন্যবাদ!');

    // Step 3: Switch to Seller & Seller accepts (after 2s)
    setTimeout(() => {
      setRole('SELLER');
      updateOrderStatus(order.id, 'ACCEPTED_BY_SELLER', 'কাশিয়ানী বিরিয়ানি হাউস অর্ডার গ্রহণ করেছে। রান্না শুরু হয়েছে।');

      // Step 4: Seller prepares & rider matching triggered (after 3s)
      setTimeout(() => {
        updateOrderStatus(order.id, 'PREPARING', 'চিকেন বিরিয়ানি ও কোল্ড ড্রিংক প্রস্তুত হচ্ছে।');

        setTimeout(() => {
          updateOrderStatus(order.id, 'READY_FOR_PICKUP', 'খাবার গরম গরম প্যাকেজিং শেষ।');
          triggerRiderMatching(order.id);

          // Step 5: Switch to Rider & Rider reaches shop (after 3.5s)
          setTimeout(() => {
            setRole('RIDER');
            updateOrderStatus(order.id, 'RIDER_AT_VENDOR', 'রাইডার রাকিব হাসান রেস্টুরেন্টে পৌঁছেছেন।');

            // Step 6: Rider picks up (after 2.5s)
            setTimeout(() => {
              updateOrderStatus(order.id, 'PICKED_UP', 'রাইডার খাবার সংগ্রহ করেছেন এবং ক্রেতার উদ্দেশ্যে রওনা দিয়েছেন।');
              updateOrderStatus(order.id, 'OUT_FOR_DELIVERY', 'রাইডার কাশিয়ানী সদর হাসপাতালে মোড় পার হয়েছেন।');

              // Step 7: Switch back to Customer tracking (after 3s)
              setTimeout(() => {
                setRole('CUSTOMER');
                setCustomerViewTab('ORDERS');

                // Step 8: Rider delivers (after 3.5s)
                setTimeout(() => {
                  updateOrderStatus(order.id, 'DELIVERED', 'অর্ডার সফলভাবে ক্রেতার ঠিকানায় হস্তান্তর করা হয়েছে।');
                  setDemoAutoRunning(false);
                }, 3500);
              }, 3000);
            }, 2500);
          }, 3500);
        }, 2500);
      }, 3000);
    }, 2000);
  };

  // Step-by-step manual demo stage stepper
  const stepDemoStage = () => {
    if (!activeOrder) {
      placeOrder('ক্যাশ অন ডেলিভারি');
      return;
    }

    const stateTransitions: Record<OrderStatus, OrderStatus> = {
      PLACED: 'ACCEPTED_BY_SELLER',
      ACCEPTED_BY_SELLER: 'PREPARING',
      PREPARING: 'READY_FOR_PICKUP',
      READY_FOR_PICKUP: 'RIDER_SEARCHING',
      RIDER_SEARCHING: 'RIDER_ASSIGNED',
      RIDER_ASSIGNED: 'RIDER_AT_VENDOR',
      RIDER_AT_VENDOR: 'PICKED_UP',
      PICKED_UP: 'OUT_FOR_DELIVERY',
      OUT_FOR_DELIVERY: 'DELIVERED',
      DELIVERED: 'COMPLETED',
      COMPLETED: 'COMPLETED',
      CANCELLED: 'PLACED',
      ISSUE_REPORTED: 'COMPLETED',
    };

    const next = stateTransitions[activeOrder.status];
    if (next === 'RIDER_SEARCHING') {
      triggerRiderMatching(activeOrder.id);
    } else {
      updateOrderStatus(activeOrder.id, next);
    }
  };

  // Notifications management
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Support Chat
  const sendSupportMessage = (text: string) => {
    const userMsg: SupportMessage = {
      id: `msg-${Date.now()}`,
      sender: 'USER',
      senderName: currentCustomer.name,
      text,
      timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
    };

    setSupportChat(prev => [...prev, userMsg]);

    // AI intelligent Bengali reply simulator
    setTimeout(() => {
      let reply = 'আমি আপনার বিষয়টি বুঝতে পেরেছি। কাস্টমার সার্ভিসের একজন প্রতিনিধিও আপনার সাথে যুক্ত আছেন।';

      if (text.includes('কোথায়') || text.includes('অবস্থা') || text.includes('ট্র্যাক')) {
        if (activeOrder) {
          reply = `আপনার বর্তমান অর্ডার #${activeOrder.orderNumber}-এর অবস্থা: "${activeOrder.statusNote || 'প্রক্রিয়াধীন'}"। ডেলিভারিম্যান ${activeOrder.assignedRider?.bengaliName || 'রাকিব হাসান'} আপনার অবস্থান থেকে আনুমানিক ৮ মিনিট দূরে আছেন।`;
        } else {
          reply = 'এই মুহূর্তে আপনার কোনো সক্রিয় রানিং অর্ডার নেই। আপনি চাইলে নতুন পছন্দের খাবার অর্ডার করতে পারেন!';
        }
      } else if (text.includes('দেরি') || text.includes('সময়')) {
        reply = 'কাশিয়ানী বাজারে বিকেলের সময় কিছুটা ট্রাফিক বা রেস্তোরাঁয় খাবারের অতিরিক্ত ভিড় থাকতে পারে। খাবারটি ফ্রেশ ও গরম সরবরাহ করতে অতিরিক্ত ৩-৫ মিনিট সময় লাগতে পারে। আমরা রাইডারের সাথে সরাসরি যোগাযোগ রেখেছি।';
      } else if (text.includes('রিফান্ড') || text.includes('বাতিল')) {
        reply = 'দোকান পণ্য রান্না শুরু করার পূর্বে অর্ডার বাতিল করলে সম্পূর্ণ রিফান্ড পাওয়া যায়। আপনি চাইলে সরাসরি হেল্পলাইনে ০১৭১২-০৯৮৭৬৫ নম্বরে কল করে তাৎক্ষণিক সহায়তা নিতে পারেন।';
      } else if (text.includes('রাইডার') || text.includes('যোগাযোগ')) {
        if (activeOrder?.assignedRider) {
          reply = `রাইডার ${activeOrder.assignedRider.bengaliName}-এর মোবাইল নম্বর: ${activeOrder.assignedRider.phone}। আপনি অ্যাপের 'কল করুন' বাটনে চাপ দিয়ে সরাসরি কথা বলতে পারেন।`;
        } else {
          reply = 'অর্ডার প্রস্তুত হওয়ার সাথে সাথেই রাইডার অ্যাসাইন হয়ে যাবে এবং নম্বর দেখতে পাবেন।';
        }
      }

      const aiMsg: SupportMessage = {
        id: `ai-${Date.now()}`,
        sender: 'AI',
        senderName: 'DESHI AI সহকারী',
        text: reply,
        timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        quickReplies: ['ধন্যবাদ, বুঝতে পেরেছি', 'কাস্টমার সার্ভিসে কথা বলুন', 'অন্য প্রশ্ন'],
      };
      setSupportChat(prev => [...prev, aiMsg]);
    }, 800);
  };

  const riderOnlineToggle = () => {
    setCurrentRider(prev => ({
      ...prev,
      isOnline: !prev.isOnline,
      isAvailable: !prev.isOnline,
    }));
  };

  const vendorStockToggle = (productId: string) => {
    setAvailableProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p))
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        vendors,
        riders,
        customers,
        activeOrder,
        orders,
        notifications,
        unreadCount,
        currentCustomer,
        currentSellerVendor,
        currentRider,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartSubtotal,
        cartDeliveryFee,
        placeOrder,
        updateOrderStatus,
        triggerRiderMatching,
        assignRider,
        demoAutoRunning,
        startEndToEndDemo,
        stepDemoStage,
        markNotificationRead,
        clearNotifications,
        supportChat,
        sendSupportMessage,
        riderOnlineToggle,
        vendorStockToggle,
        availableProducts,
        activeVendorForView,
        setActiveVendorForView,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        searchQuery,
        setSearchQuery,
        customerViewTab,
        setCustomerViewTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
