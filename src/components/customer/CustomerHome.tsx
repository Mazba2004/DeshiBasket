import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Vendor, VendorCategory } from '../../types';
import {
  Search,
  MapPin,
  Star,
  Clock,
  Bike,
  Filter,
  ArrowUpDown,
  Flame,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface CustomerHomeProps {
  onSelectVendor: (vendor: Vendor) => void;
  onOpenCart: () => void;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  onSelectVendor,
  onOpenCart,
}) => {
  const {
    vendors,
    currentCustomer,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    activeOrder,
    setCustomerViewTab,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('সব');
  const [selectedSort, setSelectedSort] = useState<'POPULAR' | 'NEARBY' | 'FAST' | 'RATING'>('POPULAR');

  // Categories list
  const mainCategories = [
    { id: 'সব', label: 'সব ক্যাটাগরি', icon: '✨' },
    { id: 'RESTAURANT', label: 'খাবার ও রেস্তোরাঁ', icon: '🍔' },
    { id: 'SUPER_SHOP', label: 'মুদি বাজার', icon: '🛒' },
    { id: 'PHARMACY', label: 'জরুরি ওষুধ', icon: '💊' },
    { id: 'DRINK', label: 'পানীয় ও মিষ্টি', icon: '🥤' },
    { id: 'OFFER', label: 'বিশেষ অফার', icon: '🔥' },
  ];

  // Filter vendors based on category & search
  const filteredVendors = vendors.filter(v => {
    // Category match
    let matchesCategory = true;
    if (activeCategory === 'RESTAURANT') matchesCategory = v.category === 'RESTAURANT';
    if (activeCategory === 'SUPER_SHOP') matchesCategory = v.category === 'SUPER_SHOP';
    if (activeCategory === 'PHARMACY') matchesCategory = v.category === 'PHARMACY';

    // Search query match
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchesSearch =
        v.bengaliName.toLowerCase().includes(q) ||
        v.cuisineOrType.toLowerCase().includes(q) ||
        v.address.toLowerCase().includes(q) ||
        v.name.toLowerCase().includes(q);
    }

    return matchesCategory && matchesSearch;
  });

  // Sort logic
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (selectedSort === 'POPULAR') return b.totalReviews - a.totalReviews;
    if (selectedSort === 'RATING') return b.rating - a.rating;
    if (selectedSort === 'FAST') return a.deliveryTimeMin - b.deliveryTimeMin;
    return 0; // NEARBY
  });

  const featuredVendors = vendors.filter(v => v.isFeatured).slice(0, 4);

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Active Running Order Floating Banner (if order in flight) */}
      {activeOrder && activeOrder.status !== 'COMPLETED' && (
        <div
          onClick={() => setCustomerViewTab('ORDERS')}
          className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white rounded-2xl p-3.5 sm:p-4 shadow-lg flex items-center justify-between cursor-pointer hover:shadow-xl transition-all active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl shrink-0">
              🛵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-200">লাইভ ডেলিভারি চলছে</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
                  #{activeOrder.orderNumber}
                </span>
              </div>
              <p className="text-sm font-semibold mt-0.5 truncate max-w-xs sm:max-w-md">
                {activeOrder.vendor.bengaliName} · {activeOrder.statusNote || 'প্রস্তুত হচ্ছে'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold bg-white text-emerald-900 px-3 py-1.5 rounded-xl shadow-xs shrink-0">
            <span>ট্র্যাক করুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* Greeting & Location Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
            <span>আসসালামু আলাইকুম 👋</span>
            <span className="text-slate-400">·</span>
            <span>{currentCustomer.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            আজ কী খাবেন বা কী প্রয়োজন?
          </h1>
        </div>

        {/* Location chip */}
        <div className="flex items-center gap-2 text-xs bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-xs">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400">আপনার ডেলিভারি ঠিকানা</div>
            <div className="font-bold text-slate-800">{currentCustomer.zone}, কাশিয়ানী</div>
          </div>
        </div>
      </div>

      {/* Search Bar with 3D-styled input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="কাশিয়ানীর খাবার, ওষুধ বা মুদি পণ্য খুঁজুন (যেমন: বিরিয়ানি, নাপা, ডিম)..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium shadow-xs focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
          >
            মুছুন
          </button>
        )}
      </div>

      {/* Main Categories Row */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
        {mainCategories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20 ring-2 ring-emerald-400'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 shadow-xs'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-semibold whitespace-nowrap">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Hero Promotional Banner (Special Kashiani campaign) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-2.5 py-1 rounded-md">
            🔥 আজকের স্পেশাল ডিল
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            কাশিয়ানী বিরিয়ানি হাউসের স্পেশাল কাচ্চি ও চিকেন বিরিয়ানি
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            গরম গরম তাজা বিরিয়ানি আর ফ্রি কোল্ড ড্রিংকসহ ২০ মিনিটে দ্রুততম হোম ডেলিভারি!
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                const target = vendors.find(v => v.id === 'vendor-rest-1');
                if (target) onSelectVendor(target);
              }}
              className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              এখনই অর্ডার করুন (৳১৮০) →
            </button>
          </div>
        </div>
      </div>

      {/* Featured / Popular Sellers Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 fill-current" />
            <h2 className="text-lg font-bold text-slate-900">কাশিয়ানীর শীর্ষ রেস্তোরাঁ ও সুপারশপ</h2>
          </div>
          <span className="text-xs text-emerald-700 font-semibold cursor-pointer hover:underline">
            সকল ১০০+ দোকান দেখুন
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredVendors.map(vendor => (
            <div
              key={vendor.id}
              onClick={() => onSelectVendor(vendor)}
              className="group bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-32 rounded-xl bg-slate-100 flex items-center justify-center text-4xl mb-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                  <span>
                    {vendor.category === 'RESTAURANT' ? '🍛' : vendor.category === 'PHARMACY' ? '💊' : '🛒'}
                  </span>
                  <div className="absolute bottom-2 left-2 z-20 text-[10px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded">
                    {vendor.deliveryTimeMin}-{vendor.deliveryTimeMax} মি.
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-emerald-600">
                    {vendor.category === 'RESTAURANT' ? 'রেস্টুরেন্ট' : vendor.category === 'PHARMACY' ? 'ফার্মেসি' : 'মুদি শপ'}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{vendor.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {vendor.bengaliName}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{vendor.cuisineOrType}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ডেলিভারি ৳{vendor.deliveryFee}</span>
                </span>
                <span className="font-semibold text-emerald-700">মেনু দেখুন →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Sorting Bar */}
      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-bold text-slate-900">
          সকল দোকান ও প্রতিষ্ঠান ({sortedVendors.length}টি পাওয়া গেছে)
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-slate-400 text-[11px] mr-1">সাজান:</span>
          {[
            { id: 'POPULAR', label: 'জনপ্রিয়' },
            { id: 'RATING', label: 'সর্বোচ্চ রেটিং' },
            { id: 'FAST', label: 'দ্রুত ডেলিভারি' },
          ].map(sort => (
            <button
              key={sort.id}
              onClick={() => setSelectedSort(sort.id as any)}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                selectedSort === sort.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      {/* Full Vendor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedVendors.map(vendor => (
          <div
            key={vendor.id}
            onClick={() => onSelectVendor(vendor)}
            className="group bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
              {vendor.category === 'RESTAURANT' ? '🍲' : vendor.category === 'PHARMACY' ? '💊' : '🛒'}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-emerald-600">
                  {vendor.category === 'RESTAURANT' ? 'খাবার' : vendor.category === 'PHARMACY' ? 'ওষুধ' : 'বাজার'}
                </span>
                <div className="flex items-center gap-0.5 text-amber-500 font-bold text-xs">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{vendor.rating}</span>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-sm truncate group-hover:text-emerald-700 transition-colors">
                {vendor.bengaliName}
              </h3>
              <p className="text-xs text-slate-500 truncate mt-0.5">{vendor.address}</p>

              <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{vendor.deliveryTimeMin}-{vendor.deliveryTimeMax} মি.</span>
                </span>
                <span>·</span>
                <span>ডেলিভারি ৳{vendor.deliveryFee}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
