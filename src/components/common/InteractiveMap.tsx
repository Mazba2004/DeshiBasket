import React from 'react';
import { Rider, Vendor } from '../../types';

interface InteractiveMapProps {
  vendor?: Vendor;
  rider?: Rider;
  customerAddress?: string;
  orderStatus?: string;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  vendor,
  rider,
  customerAddress = 'হাসপাতাল রোড, কাশিয়ানী সদর',
  orderStatus = 'OUT_FOR_DELIVERY',
  className = '',
}) => {
  // Coords fallback
  const vendorX = vendor?.coordinates?.x || 48;
  const vendorY = vendor?.coordinates?.y || 52;
  const customerX = 35;
  const customerY = 38;

  // Compute rider position based on order status for realistic animation
  let riderX = rider?.coordinates?.x || 50;
  let riderY = rider?.coordinates?.y || 48;

  if (orderStatus === 'RIDER_AT_VENDOR') {
    riderX = vendorX - 2;
    riderY = vendorY + 2;
  } else if (orderStatus === 'OUT_FOR_DELIVERY') {
    // Interpolated midway
    riderX = Math.round(vendorX * 0.45 + customerX * 0.55);
    riderY = Math.round(vendorY * 0.45 + customerY * 0.55);
  } else if (orderStatus === 'DELIVERED' || orderStatus === 'COMPLETED') {
    riderX = customerX + 1;
    riderY = customerY + 1;
  }

  return (
    <div
      className={`relative w-full h-72 md:h-84 bg-emerald-950/90 rounded-2xl overflow-hidden border border-emerald-800/40 shadow-inner select-none ${className}`}
    >
      {/* Kashiani Road & River Grid Simulation */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="kashiani-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.2" />
          </pattern>
          <linearGradient id="river-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#kashiani-grid)" />

        {/* Madhumati River winding through Kashiani */}
        <path
          d="M -20,180 Q 120,240 220,170 T 480,210 T 700,160 T 900,220"
          fill="none"
          stroke="url(#river-grad)"
          strokeWidth="24"
          strokeLinecap="round"
        />

        {/* Major Kashiani Highways (Dhaka-Khulna Highway / Ramdia Road) */}
        <path
          d="M 40,30 Q 180,90 320,150 T 600,240 T 880,310"
          fill="none"
          stroke="#059669"
          strokeWidth="4"
          strokeDasharray="6 3"
        />
        <path
          d="M 320,0 L 320,350"
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeOpacity="0.5"
        />
        <path
          d="M 0,150 L 900,150"
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeOpacity="0.5"
        />

        {/* Live Delivery Route between Vendor, Rider, and Customer */}
        <path
          d={`M ${vendorX}%,${vendorY}% Q ${(vendorX + customerX) / 2}%,${(vendorY + customerY) / 2 - 8}% ${customerX}%,${customerY}%`}
          fill="none"
          stroke="#34d399"
          strokeWidth="3.5"
          strokeDasharray="6 4"
          className="animate-pulse"
        />
      </svg>

      {/* Kashiani Landmark Labels */}
      <div className="absolute top-3 left-4 text-[11px] font-medium text-emerald-400/80 bg-slate-950/60 px-2.5 py-1 rounded backdrop-blur">
        🗺️ কাশিয়ানী উপজেলা লাইভ ম্যাপ
      </div>
      <div className="absolute bottom-3 left-4 text-[10px] text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded">
        মধুমতি নদী তীরবর্তী জোন · কাশিয়ানী বাজার
      </div>

      {/* Vendor Location Pin */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300"
        style={{ left: `${vendorX}%`, top: `${vendorY}%` }}
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-amber-500 rounded-full blur-xs opacity-70 animate-ping"></div>
          <div className="relative w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white">
            🏪
          </div>
        </div>
        <div className="mt-1 bg-slate-900/90 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded shadow whitespace-nowrap border border-amber-500/30">
          {vendor?.bengaliName || 'কাশিয়ানী বিরিয়ানি হাউস'}
        </div>
      </div>

      {/* Customer Location Pin */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300"
        style={{ left: `${customerX}%`, top: `${customerY}%` }}
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white">
            🏠
          </div>
        </div>
        <div className="mt-1 bg-slate-900/90 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded shadow whitespace-nowrap border border-emerald-500/30">
          ক্রেতার ঠিকানা ({customerAddress.split(',')[0]})
        </div>
      </div>

      {/* Moving Rider Pin */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 transition-all duration-1000 ease-in-out"
        style={{ left: `${riderX}%`, top: `${riderY}%` }}
      >
        <div className="relative">
          <div className="absolute -inset-2 bg-emerald-400 rounded-full blur-sm opacity-60 animate-pulse"></div>
          <div className="relative w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg shadow-xl border-2 border-emerald-200">
            🛵
          </div>
        </div>
        <div className="mt-1 bg-emerald-950 text-white text-[11px] font-medium px-2 py-0.5 rounded-full shadow-lg border border-emerald-400 flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{rider?.bengaliName || 'রাকিব হাসান'} (গতি: ২৫ কিমি/ঘ)</span>
        </div>
      </div>

      {/* Live ETA Banner overlay */}
      <div className="absolute top-3 right-4 bg-slate-950/80 backdrop-blur-md border border-emerald-500/30 rounded-xl px-3 py-1.5 text-right shadow-lg">
        <div className="text-[10px] text-emerald-400 font-medium">সম্ভাব্য সময় (ETA)</div>
        <div className="text-sm font-bold text-white tabular-nums">প্রায় ৮-১২ মিনিট</div>
        <div className="text-[9px] text-slate-400">দূরত্ব: ০.৮ কিমি</div>
      </div>
    </div>
  );
};
