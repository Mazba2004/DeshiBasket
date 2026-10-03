import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import { InteractiveMap } from '../common/InteractiveMap';
import {
  Bike,
  Power,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Phone,
  CheckCircle,
  Navigation,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';

export const RiderDashboard: React.FC = () => {
  const {
    currentRider,
    riderOnlineToggle,
    orders,
    updateOrderStatus,
    currentSellerVendor,
  } = useApp();

  const [countdown, setCountdown] = useState<number>(20);

  // Find incoming order for rider (Status = RIDER_SEARCHING or offered)
  const incomingOrder = orders.find(
    o => o.status === 'RIDER_SEARCHING' || (o.status === 'READY_FOR_PICKUP' && !o.assignedRider)
  );

  // Active accepted order assigned to this rider
  const activeDelivery = orders.find(
    o =>
      ['RIDER_ASSIGNED', 'RIDER_AT_VENDOR', 'PICKED_UP', 'OUT_FOR_DELIVERY'].includes(o.status) &&
      (!o.assignedRider || o.assignedRider.id === currentRider.id || true)
  );

  // Countdown timer for incoming request
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (incomingOrder && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      setCountdown(20);
    }
    return () => clearInterval(timer);
  }, [incomingOrder, countdown]);

  const handleAcceptDelivery = (orderId: string) => {
    updateOrderStatus(
      orderId,
      'RIDER_ASSIGNED',
      `রাইডার ${currentRider.bengaliName} ডেলিভারি গ্রহণ করেছেন এবং রেস্তোরাঁর দিকে যাচ্ছেন।`
    );
  };

  const handleReachedVendor = (orderId: string) => {
    updateOrderStatus(
      orderId,
      'RIDER_AT_VENDOR',
      `রাইডার ${currentRider.bengaliName} রেস্তোরাঁয় পৌঁছেছেন এবং পার্সেল সংগ্রহ করছেন।`
    );
  };

  const handlePickedUp = (orderId: string) => {
    updateOrderStatus(
      orderId,
      'PICKED_UP',
      `পার্সেল রাইডারের ব্যাগে উঠেছে। রাইডার ডেলিভারি ঠিকানায় রওনা হয়েছেন।`
    );
    // Transition to out for delivery
    setTimeout(() => {
      updateOrderStatus(
        orderId,
        'OUT_FOR_DELIVERY',
        `রাইডার কাশিয়ানী সদরের মধ্য দিয়ে দ্রুত এগিয়ে আসছেন।`
      );
    }, 1500);
  };

  const handleDelivered = (orderId: string) => {
    updateOrderStatus(
      orderId,
      'DELIVERED',
      `পার্সেল গ্রাহকের কাছে হস্তান্তর করা হয়েছে এবং নগদ টাকা গ্রহণ করা হয়েছে।`
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Header & Status Toggle Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-md shrink-0">
            🛵
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {currentRider.bengaliName}
              </h1>
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 font-bold text-xs px-2 py-0.5 rounded border border-amber-200">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                <span>{currentRider.rating}</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              যানবাহন: {currentRider.vehicleType} ({currentRider.vehicleNumber}) · জোন: {currentRider.currentZone}
            </p>
          </div>
        </div>

        {/* Online / Offline Availability Toggle */}
        <button
          onClick={riderOnlineToggle}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-xs transition-all shadow-md active:scale-95 ${
            currentRider.isOnline
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-700/20'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>
            {currentRider.isOnline ? 'আপনি এখন অনলাইন (প্রস্তুত)' : 'আপনি অফলাইনে আছেন'}
          </span>
        </button>
      </div>

      {/* Rider Performance & Earnings Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">আজকের আয়</div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 mt-1 tabular-nums">
            ৳{currentRider.todayEarnings}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">+৳৮০ প্রতি ট্রিপ</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">আজকের ডেলিভারি</div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            ১২টি
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">১০০% সফল ট্রিপ</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">এই সপ্তাহের আয়</div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            ৳৫,৪৫০
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">৬৪টি ডেলিভারি</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">রাইডার স্কোর</div>
          <div className="text-xl sm:text-2xl font-bold text-amber-500 mt-1 tabular-nums">
            ৪.৯ / ৫.০
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">৩৮৪টি কাস্টমার রিভিউ</div>
        </div>
      </div>

      {/* Incoming Delivery Request Card with Countdown */}
      {incomingOrder && (
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-3xl p-6 shadow-xl space-y-4 animate-bounce-short">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
              <h2 className="text-lg sm:text-xl font-black">
                নতুন ডেলিভারি অনুরোধ এসেছে! ({countdown} সে.)
              </h2>
            </div>
            <div className="px-3 py-1 bg-white/20 rounded-full font-mono text-sm font-bold">
              সম্ভাব্য আয়: ৳৮০
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-3 text-xs border border-white/20">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
              <div>
                <span className="text-amber-200">পিকআপ: </span>
                <span className="font-bold text-white text-sm">
                  {incomingOrder.vendor.bengaliName} ({incomingOrder.vendor.address})
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Navigation className="w-4 h-4 text-emerald-200 shrink-0 mt-0.5" />
              <div>
                <span className="text-amber-200">ডেলিভারি গন্তব্য: </span>
                <span className="font-bold text-white text-sm">
                  {incomingOrder.deliveryAddress}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-1 text-amber-100">
              <span>দূরত্ব: প্রায় ০.৮ কিমি</span>
              <span>·</span>
              <span>আনুমানিক সময়: ১২ মিনিট</span>
              <span>·</span>
              <span>ক্যাশ কালেকশন: ৳{incomingOrder.totalAmount}</span>
            </div>
          </div>

          {/* Accept / Decline CTAs */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => handleAcceptDelivery(incomingOrder.id)}
              className="flex-1 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
            >
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>ডেলিভারি গ্রহণ করুন (৳৮০ আয়)</span>
            </button>
            <button
              onClick={() => setCountdown(0)}
              className="px-5 py-3.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs"
            >
              পরে দেখুন
            </button>
          </div>
        </div>
      )}

      {/* Active Trip & Mobile-First Large Step Buttons */}
      {activeDelivery ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                চলমান ডেলিভারি মিশন
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                অর্ডার #{activeDelivery.orderNumber} ({activeDelivery.vendor.bengaliName})
              </h3>
            </div>
            <a
              href={`tel:${activeDelivery.customer.phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>ক্রেতাকে কল করুন</span>
            </a>
          </div>

          {/* Integrated Kashiani Route Map */}
          <InteractiveMap
            vendor={activeDelivery.vendor}
            rider={currentRider}
            customerAddress={activeDelivery.deliveryAddress}
            orderStatus={activeDelivery.status}
          />

          {/* Big Touch-Friendly Rider Step Buttons */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-500">
              বর্তমান অবস্থা: <span className="text-emerald-700">{activeDelivery.statusNote || activeDelivery.status}</span>
            </div>

            {activeDelivery.status === 'RIDER_ASSIGNED' && (
              <button
                onClick={() => handleReachedVendor(activeDelivery.id)}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>১. দোকানে পৌঁছেছি</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {activeDelivery.status === 'RIDER_AT_VENDOR' && (
              <button
                onClick={() => handlePickedUp(activeDelivery.id)}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base shadow-lg shadow-emerald-700/20 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>২. অর্ডার সংগ্রহ করেছি (রওনা দিন)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {(activeDelivery.status === 'PICKED_UP' ||
              activeDelivery.status === 'OUT_FOR_DELIVERY') && (
              <button
                onClick={() => handleDelivered(activeDelivery.id)}
                className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-base shadow-lg shadow-emerald-800/20 active:scale-98 transition-all flex items-center justify-center gap-2 animate-pulse"
              >
                <CheckCircle className="w-6 h-6 text-emerald-300" />
                <span>৩. ক্রেতার কাছে পৌঁছেছি & ডেলিভারি সম্পন্ন</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
            📍
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            আপনি বর্তমানে প্রস্তুত আছেন
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            কাশিয়ানী সদরের কোনো রেস্টুরেন্ট বা ফার্মেসি অর্ডার প্রস্তুত করলেই আপনার স্ক্রিনে সরাসরি ডেলিভারি রিকোয়েস্ট চলে আসবে।
          </p>
        </div>
      )}
    </div>
  );
};
