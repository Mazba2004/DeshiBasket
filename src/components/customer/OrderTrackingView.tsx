import React from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { InteractiveMap } from '../common/InteractiveMap';
import {
  Phone,
  MessageSquare,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  Bike,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface OrderTrackingViewProps {
  order: Order | null;
  onOpenAi?: () => void;
}

const TIMELINE_STAGES: { status: OrderStatus; label: string; desc: string }[] = [
  { status: 'PLACED', label: '১. অর্ডার করা হয়েছে', desc: 'অর্ডার সিস্টেমে গৃহীত হয়েছে' },
  { status: 'ACCEPTED_BY_SELLER', label: '২. দোকান অর্ডার গ্রহণ করেছে', desc: 'দোকান প্রস্তুতকরণ শুরু করেছে' },
  { status: 'PREPARING', label: '৩. পণ্য প্রস্তুত হচ্ছে', desc: 'রান্না ও প্যাকিং চলছে' },
  { status: 'RIDER_SEARCHING', label: '৪. ডেলিভারিম্যান খুঁজছি...', desc: 'কাছের রাইডারকে অফার দেওয়া হচ্ছে' },
  { status: 'RIDER_ASSIGNED', label: '৫. ডেলিভারিম্যান অর্ডার গ্রহণ করেছে', desc: 'রাইডার দোকানের উদ্দেশ্যে রওনা দিয়েছেন' },
  { status: 'PICKED_UP', label: '৬. দোকান থেকে পণ্য সংগ্রহ করা হয়েছে', desc: 'খাবার/পণ্য রাইডারের ব্যাগে উঠেছে' },
  { status: 'OUT_FOR_DELIVERY', label: '৭. আপনার কাছে আসছে', desc: 'রাইডার আপনার ঠিকানার পথে' },
  { status: 'DELIVERED', label: '৮. অর্ডার পৌঁছে গেছে 🎉', desc: 'অর্ডার সফলভাবে পৌঁছে দেওয়া হয়েছে' },
];

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({ order, onOpenAi }) => {
  const { currentRider } = useApp();

  if (!order) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-md mx-auto my-12 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl mx-auto mb-3">
          📦
        </div>
        <h3 className="font-bold text-slate-900 text-lg">কোনো সক্রিয় অর্ডার পাওয়া যায়নি</h3>
        <p className="text-xs text-slate-500 mt-1">
          আপনি মেনু থেকে পছন্দমতো খাবার বা পণ্য অর্ডার করে লাইভ ট্র্যাকিং দেখতে পারেন।
        </p>
      </div>
    );
  }

  // Active rider: from order or fallback
  const rider = order.assignedRider || currentRider;
  const hasRider = ['RIDER_ASSIGNED', 'RIDER_AT_VENDOR', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED'].includes(
    order.status
  );

  const getStageIndex = (currentStatus: OrderStatus) => {
    switch (currentStatus) {
      case 'PLACED':
        return 0;
      case 'ACCEPTED_BY_SELLER':
        return 1;
      case 'PREPARING':
      case 'READY_FOR_PICKUP':
        return 2;
      case 'RIDER_SEARCHING':
        return 3;
      case 'RIDER_ASSIGNED':
      case 'RIDER_AT_VENDOR':
        return 4;
      case 'PICKED_UP':
        return 5;
      case 'OUT_FOR_DELIVERY':
        return 6;
      case 'DELIVERED':
      case 'COMPLETED':
        return 7;
      default:
        return 0;
    }
  };

  const currentStageIndex = getStageIndex(order.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-fade-in">
      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              সক্রিয় লাইভ ট্র্যাকিং
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-bold text-slate-800">অর্ডার #{order.orderNumber}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {order.vendor.bengaliName}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            অর্ডারের সময়: {order.placedAt} · প্রদেয় মোট: <span className="font-bold text-slate-800">৳{order.totalAmount}</span> ({order.paymentMethod})
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
          <Clock className="w-5 h-5 text-emerald-600 animate-spin-slow" />
          <div>
            <div className="text-[10px] text-slate-500">সম্ভাব্য ডেলিভারি সময়</div>
            <div className="text-sm font-bold text-slate-900 tabular-nums">প্রায় ১২-১৫ মিনিট</div>
          </div>
        </div>
      </div>

      {/* Simulated 3D Interactive Kashiani Map View */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <h3 className="font-bold text-sm text-slate-900">কাশিয়ানী উপজেলা লাইভ রুট ম্যাপ</h3>
          </div>
          <span className="text-xs text-emerald-600 font-medium">লাইভ জিপিএস সক্রিয়</span>
        </div>

        <InteractiveMap
          vendor={order.vendor}
          rider={rider}
          customerAddress={order.deliveryAddress}
          orderStatus={order.status}
        />
      </div>

      {/* Rider Information Card (When rider is assigned) */}
      {hasRider && (
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-emerald-700/50">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>আপনার অর্ডারের জন্য ডেলিভারিম্যান পাওয়া গেছে!</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-inner shrink-0">
                🛵
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-white">{rider.bengaliName}</h4>
                  <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-xs font-semibold border border-amber-500/30">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{rider.rating}</span>
                  </div>
                </div>

                <div className="text-xs text-emerald-200 mt-1 flex flex-wrap items-center gap-2">
                  <span>{rider.vehicleType}</span>
                  <span>·</span>
                  <span className="font-mono text-[11px] text-white/90 bg-white/10 px-1.5 py-0.5 rounded">
                    {rider.vehicleNumber}
                  </span>
                  <span>·</span>
                  <span className="text-emerald-300 font-medium">প্রায় ৮ মিনিট দূরে</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${rider.phone}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>কল করুন</span>
              </a>

              <button
                onClick={onOpenAi}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium text-xs border border-white/20 transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>মেসেজ করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8-Stage Bengali Order Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
          অর্ডারের বর্তমান অবস্থা ও অগ্রগতি (Timeline)
        </h3>

        <div className="space-y-4 pt-1">
          {TIMELINE_STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isFuture = idx > currentStageIndex;

            return (
              <div key={stage.status} className="flex items-start gap-3 relative">
                {/* Vertical connecting line */}
                {idx < TIMELINE_STAGES.length - 1 && (
                  <div
                    className={`absolute left-3.5 top-7 bottom-0 w-0.5 -mb-4 transition-colors ${
                      isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                )}

                {/* Node icon */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isCurrent
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 animate-pulse'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                </div>

                <div className="flex-1 pb-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        isCurrent
                          ? 'text-emerald-700'
                          : isCompleted
                          ? 'text-slate-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {stage.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        চলমান
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ordered Items Summary */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
        <h4 className="font-bold text-sm text-slate-900">অর্ডারকৃত পণ্য তালিকা:</h4>
        <div className="divide-y divide-slate-100 text-xs">
          {order.items.map((item, i) => (
            <div key={i} className="py-2 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800">{item.product.bengaliName}</span>
                <span className="text-slate-400 ml-2">× {item.quantity}</span>
              </div>
              <span className="font-semibold text-slate-900 tabular-nums">
                ৳{item.selectedPrice * item.quantity}
              </span>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
          <span>সর্বমোট পরিশোধ:</span>
          <span className="text-emerald-700 tabular-nums">৳{order.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};
