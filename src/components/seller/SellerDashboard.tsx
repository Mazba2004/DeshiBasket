import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus, Product } from '../../types';
import {
  Bell,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  TrendingUp,
  XCircle,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Bike,
  Plus,
} from 'lucide-react';

export const SellerDashboard: React.FC = () => {
  const {
    currentSellerVendor,
    orders,
    updateOrderStatus,
    triggerRiderMatching,
    availableProducts,
    vendorStockToggle,
    setRole,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ORDERS' | 'PRODUCTS' | 'AI_INSIGHTS'>('ORDERS');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Compute vendor-specific statistics
  const vendorOrders = orders.filter(o => o.vendor.id === currentSellerVendor.id || true); // All demo orders
  const newOrders = vendorOrders.filter(o => o.status === 'PLACED');
  const preparingOrders = vendorOrders.filter(
    o => o.status === 'ACCEPTED_BY_SELLER' || o.status === 'PREPARING'
  );
  const outForDeliveryOrders = vendorOrders.filter(
    o =>
      o.status === 'READY_FOR_PICKUP' ||
      o.status === 'RIDER_SEARCHING' ||
      o.status === 'RIDER_ASSIGNED' ||
      o.status === 'RIDER_AT_VENDOR' ||
      o.status === 'PICKED_UP' ||
      o.status === 'OUT_FOR_DELIVERY'
  );
  const completedOrders = vendorOrders.filter(
    o => o.status === 'DELIVERED' || o.status === 'COMPLETED'
  );

  const todayRevenue = 12850 + completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(
      orderId,
      'ACCEPTED_BY_SELLER',
      `${currentSellerVendor.bengaliName} অর্ডার গ্রহণ করেছে এবং কিচেনে পাঠিয়েছে।`
    );
  };

  const handleStartPreparing = (orderId: string) => {
    updateOrderStatus(orderId, 'PREPARING', 'পণ্য রান্না ও প্যাক করা হচ্ছে।');
  };

  const handleReadyForPickup = (orderId: string) => {
    updateOrderStatus(
      orderId,
      'READY_FOR_PICKUP',
      'পণ্য প্যাকেটজাত সম্পন্ন। রাইডার পিকআপের অপেক্ষায়।'
    );
    // Automatically trigger smart rider matching algorithm
    triggerRiderMatching(orderId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Seller Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-md">
            🏪
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {currentSellerVendor.bengaliName}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                রেস্টুরেন্ট ড্যাশবোর্ড
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              কাশিয়ানী বাজার, গোপালগঞ্জ · হেল্পলাইন: {currentSellerVendor.phone}
            </p>
          </div>
        </div>

        {/* Navigation Tabs for Seller */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('ORDERS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'ORDERS'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            অর্ডার ব্যবস্থাপনা ({newOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('PRODUCTS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'PRODUCTS'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            পণ্য ও স্টক তালিকা
          </button>
          <button
            onClick={() => setActiveTab('AI_INSIGHTS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
              activeTab === 'AI_INSIGHTS'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI বিজনেস অ্যানালাইসিস</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">আজকের মোট অর্ডার</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {vendorOrders.length + 18}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200/80 bg-amber-50/30 shadow-xs">
          <div className="text-xs text-amber-700 font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <span>নতুন অর্ডার</span>
          </div>
          <div className="text-2xl font-bold text-amber-700 mt-1 tabular-nums">
            {newOrders.length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-blue-200/80 bg-blue-50/30 shadow-xs">
          <div className="text-xs text-blue-700 font-medium">প্রস্তুত হচ্ছে</div>
          <div className="text-2xl font-bold text-blue-800 mt-1 tabular-nums">
            {preparingOrders.length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200/80 bg-purple-50/30 shadow-xs">
          <div className="text-xs text-purple-700 font-medium">ডেলিভারির পথে</div>
          <div className="text-2xl font-bold text-purple-800 mt-1 tabular-nums">
            {outForDeliveryOrders.length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">সম্পন্ন অর্ডার</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {completedOrders.length + 14}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 shadow-xs">
          <div className="text-xs text-emerald-800 font-bold">আজকের মোট বিক্রি</div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1 tabular-nums">
            ৳{todayRevenue}
          </div>
        </div>
      </div>

      {/* Tab 1: Orders Management */}
      {activeTab === 'ORDERS' && (
        <div className="space-y-6">
          {/* New Orders Section (Needs immediate action) */}
          {newOrders.length > 0 && (
            <div className="bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-md space-y-4 animate-pulse-gentle">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500 text-white animate-bounce">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-amber-950">
                      🔔 নতুন অর্ডার এসেছে! অনতিবিলম্বে গ্রহণ করুন
                    </h3>
                    <p className="text-xs text-amber-800">
                      অর্ডার গ্রহণ করলে তাৎক্ষণিক ক্রেতা ও নিকটস্থ রাইডারকে নোটিফিকেশন যাবে।
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-900 bg-amber-200 px-3 py-1 rounded-full">
                  {newOrders.length}টি পেন্ডিং
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {newOrders.map(order => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-bold text-slate-900 text-sm">#{order.orderNumber}</span>
                        <span className="text-xs font-semibold text-emerald-700">
                          {order.placedAt}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 mt-2 space-y-1">
                        <p>
                          <span className="font-medium text-slate-500">গ্রাহক: </span>
                          <span className="font-semibold text-slate-900">{order.customer.name}</span> ({order.customer.phone})
                        </p>
                        <p>
                          <span className="font-medium text-slate-500">ঠিকানা: </span>
                          <span className="text-slate-800">{order.deliveryAddress}</span>
                        </p>
                        {order.specialInstructions && (
                          <p className="text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-100 font-medium">
                            নির্দেশনা: {order.specialInstructions}
                          </p>
                        )}
                      </div>

                      {/* Items */}
                      <div className="mt-3 pt-2 border-t border-slate-100 text-xs">
                        <div className="font-semibold text-slate-800 mb-1">অর্ডারকৃত পণ্য:</div>
                        <ul className="space-y-1 text-slate-700">
                          {order.items.map((i, idx) => (
                            <li key={idx} className="flex justify-between">
                              <span>
                                {i.product.bengaliName} × {i.quantity}
                              </span>
                              <span className="font-medium tabular-nums">
                                ৳{i.selectedPrice * i.quantity}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between font-bold text-sm text-slate-900">
                        <span>মোট মূল্য ({order.paymentMethod}):</span>
                        <span className="text-emerald-700 tabular-nums">৳{order.totalAmount}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-3 flex items-center gap-2">
                      <button
                        onClick={() => handleAcceptOrder(order.id)}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>অর্ডার গ্রহণ করুন</span>
                      </button>
                      <button
                        onClick={() =>
                          updateOrderStatus(order.id, 'CANCELLED', 'রেস্টুরেন্টে খাবার বা উপাদান স্টক শেষ।')
                        }
                        className="px-3 py-2.5 rounded-xl border border-slate-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Preparation & Dispatch List */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              প্রস্তুতি ও ডেলিভারি চলমান অর্ডার সমূহ ({preparingOrders.length + outForDeliveryOrders.length})
            </h3>

            {preparingOrders.length === 0 && outForDeliveryOrders.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                এই মুহূর্তে রান্নার বা ডেলিভারির কোনো পেন্ডিং অর্ডার নেই।
              </p>
            ) : (
              <div className="divide-y divide-slate-100 space-y-3">
                {[...preparingOrders, ...outForDeliveryOrders].map(order => (
                  <div
                    key={order.id}
                    className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">#{order.orderNumber}</span>
                        <span className="text-slate-400">·</span>
                        <span className="font-semibold text-slate-800">{order.customer.name}</span>
                        <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-blue-100 text-blue-800">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-slate-500 mt-1">
                        {order.items.map(i => `${i.product.bengaliName} (${i.quantity})`).join(', ')}
                      </p>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        ঠিকানা: {order.deliveryAddress} · মূল্য: ৳{order.totalAmount}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {order.status === 'ACCEPTED_BY_SELLER' && (
                        <button
                          onClick={() => handleStartPreparing(order.id)}
                          className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 shadow-sm"
                        >
                          রান্না / প্রস্তুত করুন
                        </button>
                      )}

                      {order.status === 'PREPARING' && (
                        <button
                          onClick={() => handleReadyForPickup(order.id)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 shadow-sm flex items-center gap-1.5"
                        >
                          <Bike className="w-3.5 h-3.5" />
                          <span>প্যাকেট প্রস্তুত & রাইডার খুঁজুন</span>
                        </button>
                      )}

                      {['READY_FOR_PICKUP', 'RIDER_SEARCHING', 'RIDER_ASSIGNED', 'OUT_FOR_DELIVERY'].includes(
                        order.status
                      ) && (
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium text-xs">
                          {order.assignedRider
                            ? `রাইডার: ${order.assignedRider.bengaliName}`
                            : 'রাইডার খোঁজা হচ্ছে...'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Products & Stock Management */}
      {activeTab === 'PRODUCTS' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">খাবার ও পণ্যের মেনু স্টক নিয়ন্ত্রণ</h3>
              <p className="text-xs text-slate-500">
                পণ্য শেষ হয়ে গেলে অফ করে দিন যাতে ক্রেতারা অর্ডার করতে না পারেন।
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>নতুন পদ যোগ করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {availableProducts.slice(0, 9).map(prod => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                      {prod.category}
                    </span>
                    <button
                      onClick={() => vendorStockToggle(prod.id)}
                      className="text-xs font-bold flex items-center gap-1 text-slate-700 cursor-pointer"
                    >
                      {prod.isAvailable ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <ToggleRight className="w-5 h-5" /> স্টকে আছে
                        </span>
                      ) : (
                        <span className="text-rose-500 flex items-center gap-1">
                          <ToggleLeft className="w-5 h-5" /> স্টক আউট
                        </span>
                      )}
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-2">{prod.bengaliName}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{prod.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm tabular-nums">৳{prod.price}</span>
                  <span className="text-[10px] text-slate-400">কাশিয়ানী কিচেন</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: AI Seller Assistant */}
      {activeTab === 'AI_INSIGHTS' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                AI সেলার ইনসাইটস ও বিজনেস অ্যানালাইসিস
              </h3>
              <p className="text-xs text-slate-500">
                কাশিয়ানী উপজেলার ক্রেতাদের চাহিদার ওপর ভিত্তি করে স্বয়ংক্রিয় পরামর্শ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
              <div className="text-xs font-bold text-emerald-800">🔥 সেরা বিক্রিত পণ্য</div>
              <h4 className="font-extrabold text-sm text-slate-900">চিকেন বিরিয়ানি ও কাচ্চি</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                গত ৭ দিনে কাশিয়ানীতে বিরিয়ানির চাহিদা ৩৪% বৃদ্ধি পেয়েছে। দুপুরের জন্য অতিরিক্ত ৪০ প্যাকেট প্রস্তুত রাখার পরামর্শ।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
              <div className="text-xs font-bold text-amber-800">⚠️ স্টক সতর্কতা</div>
              <h4 className="font-extrabold text-sm text-slate-900">কোল্ড ড্রিংকস (২৫০ মিলি)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                বিরিয়ানীর সাথে কোল্ড ড্রিংক অর্ডারের হার প্রায় ৮৫%। দ্রুত অতিরিক্ত কোল্ড ড্রিংকস স্টক করার অনুরোধ।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1.5">
              <div className="text-xs font-bold text-blue-800">📈 পিক আওয়ার প্রেডিকশন</div>
              <h4 className="font-extrabold text-sm text-slate-900">দুপুর ১:০০ - ৩:০০ ও সন্ধ্যা ৭:০০</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                হাসপাতাল রোড ও রামদিয়া এলাকা থেকে সবচেয়ে বেশি খাবার অর্ডার আসার পূর্বাভাস রয়েছে।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
