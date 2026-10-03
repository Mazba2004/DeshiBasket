import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Play, FastForward, RotateCcw, Shield, Store, Bike, Headset, Users, ChevronUp, ChevronDown } from 'lucide-react';

export const DemoDock: React.FC = () => {
  const {
    role,
    setRole,
    activeOrder,
    demoAutoRunning,
    startEndToEndDemo,
    stepDemoStage,
    placeOrder,
  } = useApp();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const rolesList: { id: UserRole; label: string; icon: React.ReactNode; countLabel?: string }[] = [
    { id: 'CUSTOMER', label: 'ক্রেতা (Customer)', icon: <Users className="w-4 h-4" /> },
    { id: 'SELLER', label: 'দোকানদার (Seller)', icon: <Store className="w-4 h-4" /> },
    { id: 'RIDER', label: 'ডেলিভারিম্যান (Rider)', icon: <Bike className="w-4 h-4" /> },
    { id: 'CUSTOMER_SERVICE', label: 'হেল্পডেস্ক (Support)', icon: <Headset className="w-4 h-4" /> },
    { id: 'ADMIN', label: 'অ্যাডমিন (Admin)', icon: <Shield className="w-4 h-4" /> },
  ];

  const statusBengaliMap: Record<string, string> = {
    PLACED: 'অর্ডার প্লেস করা হয়েছে',
    ACCEPTED_BY_SELLER: 'দোকান অর্ডার গ্রহণ করেছে',
    PREPARING: 'রান্না / প্রস্তুত হচ্ছে',
    READY_FOR_PICKUP: 'পিকআপের জন্য প্রস্তুত',
    RIDER_SEARCHING: 'রাইডার খোঁজা হচ্ছে...',
    RIDER_ASSIGNED: 'রাইডার পাওয়া গেছে',
    RIDER_AT_VENDOR: 'রাইডার রেস্তোরাঁয় পৌঁছেছে',
    PICKED_UP: 'পণ্য সংগ্রহ সম্পন্ন',
    OUT_FOR_DELIVERY: 'ডেলিভারির পথে',
    DELIVERED: 'ডেলিভারি সম্পন্ন 🎉',
    COMPLETED: 'অর্ডার সম্পন্ন',
  };

  return (
    <aside
      aria-label="ডেমো কন্ট্রোল সেন্টার"
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md text-white border-t border-emerald-500/40 shadow-2xl transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        {/* Dock Header with toggle */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              🎮 DEMO MODE কন্ট্রোল
            </span>

            {activeOrder && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-emerald-300">অর্ডার #{activeOrder.orderNumber}:</span>
                <span className="text-amber-300 font-medium">
                  {statusBengaliMap[activeOrder.status] || activeOrder.status}
                </span>
                <span className="text-slate-400">· ৳{activeOrder.totalAmount}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* 1-Click End-to-End Walkthrough */}
            <button
              onClick={startEndToEndDemo}
              disabled={demoAutoRunning}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all ${
                demoAutoRunning
                  ? 'bg-amber-600/80 text-white cursor-wait animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{demoAutoRunning ? 'স্বয়ংক্রিয় ডেমো চলছে...' : '১-ক্লিকে ফুল ডেমো চালান'}</span>
            </button>

            {/* Step to Next Stage */}
            <button
              onClick={stepDemoStage}
              disabled={demoAutoRunning}
              title="পরবর্তী ধাপে যান"
              className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 active:scale-95"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>পরবর্তী ধাপ</span>
            </button>

            {/* Reset / New Order */}
            <button
              onClick={() => placeOrder('ক্যাশ অন ডেলিভারি')}
              title="নতুন ডেমো অর্ডার তৈরি করুন"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Toggle Dock */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? 'কন্ট্রোল প্যানেল সংক্ষেপ করুন' : 'কন্ট্রোল প্যানেল প্রসারিত করুন'}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Panel: Quick Role Switcher Buttons */}
        {isExpanded && (
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs text-slate-400 whitespace-nowrap mr-1">ভূমিকা পরিবর্তন করুন:</span>
              {rolesList.map(r => {
                const isActive = role === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-emerald-500 text-white font-semibold shadow-sm ring-1 ring-emerald-300'
                        : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {r.icon}
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-400">
              <span>📍 কাশিয়ানী সদর, গোপালগঞ্জ</span>
              <span>·</span>
              <span>🏪 ১০০ হোটেল · ৩০ ফার্মেসি · ২০ সুপারশপ</span>
              <span>·</span>
              <span>🛵 ১০০+ রাইডার অনলাইন</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
