import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Vendor, Rider, Order } from '../../types';
import { InteractiveMap } from '../common/InteractiveMap';
import {
  Shield,
  Users,
  Store,
  Bike,
  DollarSign,
  TrendingUp,
  Package,
  AlertTriangle,
  Sparkles,
  Search,
  CheckCircle,
  Ban,
  Clock,
  Layers,
  MapPin,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { vendors, riders, customers, orders, updateOrderStatus } = useApp();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'VENDORS' | 'RIDERS' | 'ORDERS' | 'AI_SUMMARY'>('OVERVIEW');
  const [vendorFilter, setVendorFilter] = useState<string>('ALL');
  const [vendorSearch, setVendorSearch] = useState<string>('');

  // AI summary state
  const [aiSummary, setAiSummary] = useState<string>(
    'কাশিয়ানী উপজেলায় আজকের ডেলিভারি নেটওয়ার্ক অত্যন্ত সন্তোষজনকভাবে কাজ করছে। সকাল থেকে মোট ৬২টি সফল অর্ডার সম্পন্ন হয়েছে। খাবার বিভাগে বিরিয়ানি ও খিচুড়ির চাহিদা সর্বোচ্চ। মধুমতি নদীর তীরবর্তী ও হাসপাতাল রোড এলাকায় রাইডারদের গড় ডেলিভারি সময় ছিল মাত্র ২১ মিনিট।'
  );
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  // Stats calculation
  const restaurantCount = vendors.filter(v => v.category === 'RESTAURANT').length;
  const pharmacyCount = vendors.filter(v => v.category === 'PHARMACY').length;
  const superShopCount = vendors.filter(v => v.category === 'SUPER_SHOP').length;
  const onlineRidersCount = riders.filter(r => r.isOnline).length;
  const totalRevenue = 48650 + orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleGenerateAiSummary = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setAiSummary(
        `[দেশি বাস্কেট নির্বাহী সারসংক্ষেপ · কাশিয়ানী সদর]\n\n• আজকের সামগ্রিক রেভিনিউ: ৳${totalRevenue.toLocaleString('bn-BD')}\n• সক্রিয় বিক্রেতা: ১০০টি রেস্তোরাঁ, ৩০টি ফার্মেসি এবং ২০টি সুপারশপ পুরোপুরি অনলাইনে সক্রিয়।\n• রাইডার বহর: কাশিয়ানী বাজার এবং ভাটিয়াপাড়া মোড়ে রাইডারদের উপস্থিতি পর্যাপ্ত রয়েছে। সর্বোচ্চ পারফর্মিং রাইডার: রাকিব হাসান (রেটিং ৪.৯)।\n• সমস্যা বা বিলম্ব রিপোর্ট: ০টি স্থগিত টিকিট। কাস্টমার স্যাটিসফ্যাকশন রেট ৯৮.৪%।\n• সুপারিশ: রামদিয়া ও ওড়াকান্দি ঠাকুরবাড়ি এলাকায় আরও ৫ জন ই-বাইক রাইডার যুক্ত করলে ডেলিভারি সময় আরও ৩ মিনিট কমানো সম্ভব।`
      );
      setIsGeneratingAi(false);
    }, 1200);
  };

  const filteredVendors = vendors.filter(v => {
    let matchCat = true;
    if (vendorFilter === 'RESTAURANT') matchCat = v.category === 'RESTAURANT';
    if (vendorFilter === 'PHARMACY') matchCat = v.category === 'PHARMACY';
    if (vendorFilter === 'SUPER_SHOP') matchCat = v.category === 'SUPER_SHOP';

    let matchSearch = true;
    if (vendorSearch.trim()) {
      matchSearch =
        v.bengaliName.toLowerCase().includes(vendorSearch.toLowerCase()) ||
        v.zone.toLowerCase().includes(vendorSearch.toLowerCase());
    }
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-3xl shadow-md">
            🛡️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                DESHI BASKET অ্যাডমিন কন্ট্রোল সেন্টার
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                সুপার অ্যাডমিন
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              কাশিয়ানী উপজেলা সমগ্র ডিজিটাল কমার্স, বিক্রেতা ও রাইডার অপারেশন প্যানেল
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto max-w-full">
          {[
            { id: 'OVERVIEW', label: 'সারসংক্ষেপ' },
            { id: 'VENDORS', label: `দোকান সমূহ (${vendors.length})` },
            { id: 'RIDERS', label: `রাইডার বহর (${riders.length})` },
            { id: 'ORDERS', label: 'অর্ডার মনিটরিং' },
            { id: 'AI_SUMMARY', label: 'AI রিপোর্ট' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">নিবন্ধিত কাস্টমার</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
            {customers.length}+
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">কাশিয়ানী উপজেলার বাসিন্দা</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">রেস্তোরাঁ ও হোটেল</div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1 tabular-nums">
            {restaurantCount}টি
          </div>
          <div className="text-[10px] text-slate-400">১০০% ভেরিফায়েড</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">ফার্মেসি ও ড্রাগ হাউস</div>
          <div className="text-2xl font-extrabold text-blue-700 mt-1 tabular-nums">
            {pharmacyCount}টি
          </div>
          <div className="text-[10px] text-slate-400">জরুরি ওষুধ সেবা</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">সুপার শপ ও মার্ট</div>
          <div className="text-2xl font-extrabold text-amber-700 mt-1 tabular-nums">
            {superShopCount}টি
          </div>
          <div className="text-[10px] text-slate-400">নিত্য মুদি বাজার</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">অনলাইন রাইডার বহর</div>
          <div className="text-2xl font-extrabold text-purple-700 mt-1 tabular-nums">
            {onlineRidersCount} / {riders.length}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">৮৫% অন-ডিউটি</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs bg-emerald-50/30">
          <div className="text-xs text-emerald-800 font-bold">মোট প্ল্যাটফর্ম বিক্রি</div>
          <div className="text-2xl font-black text-emerald-800 mt-1 tabular-nums">
            ৳{totalRevenue.toLocaleString('bn-BD')}
          </div>
          <div className="text-[10px] text-slate-400">আজকের হিসাব</div>
        </div>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          {/* Kashiani Central Operations Map */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">
                  কাশিয়ানী লাইভ ডেলিভারি অপারেশন ও ট্র্যাকিং ম্যাপ
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                ১৫০টি পার্টনার ব্যবসা · ১০০+ সক্রিয় রাইডার
              </span>
            </div>

            <InteractiveMap
              vendor={vendors[0]}
              rider={riders[0]}
              orderStatus="OUT_FOR_DELIVERY"
            />
          </div>

          {/* Quick Business Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-600" />
                <span>পার্টনার দোকান ক্যাটাগরি বিশ্লেষণ</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">হোটেল ও রেস্তোরাঁ</span>
                  <span className="font-bold text-slate-900 tabular-nums">১০০টি (৬৬%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">মেডিকেল ও ফার্মেসি</span>
                  <span className="font-bold text-slate-900 tabular-nums">৩০টি (২০%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">সুপার শপ ও গ্রোসারি</span>
                  <span className="font-bold text-slate-900 tabular-nums">২০টি (১৪%)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Bike className="w-4 h-4 text-emerald-600" />
                <span>ডেলিভারি যানবাহন মিশ্রণ</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">মোটরসাইকেল</span>
                  <span className="font-bold text-slate-900 tabular-nums">৪৫ জন</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">ইলেকট্রিক বাইক (পরিবেশবান্ধব)</span>
                  <span className="font-bold text-slate-900 tabular-nums">৩৫ জন</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">বাইসাইকেল (কাছের বাজার)</span>
                  <span className="font-bold text-slate-900 tabular-nums">২৫ জন</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>ডেলিভারি পারফরম্যান্স মেট্রিক্স</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">গড় ডেলিভারি সময়</span>
                  <span className="font-bold text-emerald-700 tabular-nums">২২ মিনিট</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">অন-টাইম সাকসেস রেট</span>
                  <span className="font-bold text-emerald-700 tabular-nums">৯৯.১%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">গড় গ্রাহক সন্তুষ্টি</span>
                  <span className="font-bold text-amber-600 tabular-nums">৪.৮৫ / ৫.০</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Vendors List & Management */}
      {activeTab === 'VENDORS' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {[
                { id: 'ALL', label: `সব দোকান (${vendors.length})` },
                { id: 'RESTAURANT', label: `রেস্তোরাঁ (${restaurantCount})` },
                { id: 'PHARMACY', label: `ফার্মেসি (${pharmacyCount})` },
                { id: 'SUPER_SHOP', label: `সুপারশপ (${superShopCount})` },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setVendorFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                    vendorFilter === f.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="দোকানের নাম বা এলাকা দিয়ে খুঁজুন..."
                value={vendorSearch}
                onChange={e => setVendorSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[550px] overflow-y-auto pr-1">
            {filteredVendors.map(v => (
              <div
                key={v.id}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 text-sm line-clamp-1">
                    {v.bengaliName}
                  </div>
                  <div className="text-slate-500 mt-0.5">{v.address}</div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                    <span>⭐ {v.rating} ({v.totalReviews})</span>
                    <span>·</span>
                    <span>ফি: ৳{v.deliveryFee}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${v.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                  {v.isOpen ? 'অনুমোদিত' : 'স্থগিত'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Riders Fleet Tracking */}
      {activeTab === 'RIDERS' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                নিবন্ধিত রাইডার বহর ({riders.length} জন রাইডার)
              </h3>
              <p className="text-xs text-slate-500">
                কাশিয়ানী উপজেলার বিভিন্ন ইউনিয়নের রুট ও ট্র্যাকিং তথ্য
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
              অনলাইন: {onlineRidersCount} জন
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[550px] overflow-y-auto pr-1">
            {riders.map(r => (
              <div
                key={r.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-xl shrink-0">
                    🛵
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{r.bengaliName}</h4>
                    <p className="text-slate-500 text-[11px]">{r.vehicleType} · {r.vehicleNumber}</p>
                    <p className="text-emerald-700 text-[10px] font-medium">জোন: {r.currentZone}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-slate-900">৳{r.todayEarnings}</div>
                  <div className="text-[10px] text-amber-500 font-bold">⭐ {r.rating}</div>
                  <span className={`inline-block mt-1 w-2 h-2 rounded-full ${r.isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Orders Journey & Dispute Log */}
      {activeTab === 'ORDERS' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
            প্ল্যাটফর্মের সকল অর্ডার জার্নি লগ
          </h3>

          <div className="space-y-3">
            {orders.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">এখনও কোনো অর্ডার প্লেস হয়নি</p>
            ) : (
              orders.map(order => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">#{order.orderNumber}</span>
                      <span className="text-slate-400">·</span>
                      <span className="font-semibold text-slate-800">{order.vendor.bengaliName}</span>
                      <span className="text-slate-400">→</span>
                      <span className="font-medium text-slate-700">{order.customer.name}</span>
                    </div>
                    <p className="text-slate-500 mt-0.5">
                      ঠিকানা: {order.deliveryAddress} · রাইডার:{' '}
                      <span className="font-semibold text-slate-800">
                        {order.assignedRider?.bengaliName || 'অপেক্ষমাণ'}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-2 md:pt-0 border-slate-200">
                    <div className="text-right">
                      <div className="font-bold text-slate-900 tabular-nums">৳{order.totalAmount}</div>
                      <div className="text-[10px] text-slate-500">{order.paymentMethod}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab: AI Admin Assistant Summary */}
      {activeTab === 'AI_SUMMARY' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-base text-slate-900">
                AI এক্সিকিউটিভ বিজনেস সামারি (Kashiani Operations)
              </h3>
            </div>
            <button
              onClick={handleGenerateAiSummary}
              disabled={isGeneratingAi}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingAi ? 'রিপোর্ট তৈরি হচ্ছে...' : 'তাজা রিপোর্ট তৈরি করুন'}</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line border border-slate-800 shadow-inner">
            {aiSummary}
          </div>
        </div>
      )}
    </div>
  );
};
