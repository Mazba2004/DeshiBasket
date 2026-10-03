import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodCategory, Product, Vendor } from '../../types';
import { getProductsForVendor } from '../../data/kashianiData';
import {
  ArrowLeft,
  Star,
  Clock,
  Bike,
  MapPin,
  Phone,
  Plus,
  Check,
  Search,
} from 'lucide-react';

interface VendorDetailProps {
  vendor: Vendor;
  onBack: () => void;
  onOpenCart: () => void;
}

const CATEGORIES: FoodCategory[] = [
  'জনপ্রিয়',
  'বিরিয়ানি',
  'ভাত',
  'মাছ',
  'মাংস',
  'ফাস্টফুড',
  'মিষ্টি ও ডেজার্ট',
  'পানীয়',
  'ওষুধ',
  'মুদি বাজার',
];

export const VendorDetail: React.FC<VendorDetailProps> = ({
  vendor,
  onBack,
  onOpenCart,
}) => {
  const { addToCart, availableProducts, cart } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('সব');
  const [vendorSearch, setVendorSearch] = useState<string>('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Fetch or dynamically generate products for this vendor
  const vendorProducts = getProductsForVendor(vendor.id, vendor.category);

  const filteredProducts = vendorProducts.filter(p => {
    const matchesCat = selectedCat === 'সব' || p.category === selectedCat || (selectedCat === 'জনপ্রিয়' && p.isPopular);
    const matchesSearch =
      !vendorSearch ||
      p.bengaliName.toLowerCase().includes(vendorSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(vendorSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1000);
  };

  return (
    <div className="pb-24 animate-fade-in">
      {/* Top Bar with Back Button */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল দোকানে ফিরে যান</span>
        </button>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${vendor.phone}`}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium hover:bg-emerald-100 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>কল করুন</span>
          </a>
        </div>
      </div>

      {/* Vendor Hero Banner (3D-inspired glassmorphic header card) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white shadow-xl mb-6">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl shadow-inner shrink-0">
              {vendor.category === 'RESTAURANT' ? '🍲' : vendor.category === 'PHARMACY' ? '💊' : '🛒'}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-emerald-400">
                  {vendor.category === 'RESTAURANT'
                    ? 'হোটেল ও রেস্তোরাঁ'
                    : vendor.category === 'PHARMACY'
                    ? 'ওষুধের দোকান / ফার্মেসি'
                    : 'সুপার শপ ও গ্রোসারি'}
                </span>
                <span className="text-slate-500">·</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${vendor.isOpen ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300'}`}>
                  {vendor.isOpen ? 'খোলা আছে' : 'সাময়িক বন্ধ'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {vendor.bengaliName}
              </h1>

              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{vendor.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Badge Cluster */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 text-center shrink-0">
            <div>
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-sm">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="tabular-nums">{vendor.rating}</span>
              </div>
              <div className="text-[10px] text-slate-300">({vendor.totalReviews} রিভিউ)</div>
            </div>

            <div className="w-px h-8 bg-white/20"></div>

            <div>
              <div className="flex items-center justify-center gap-1 text-emerald-400 font-bold text-sm">
                <Clock className="w-3.5 h-3.5" />
                <span className="tabular-nums">{vendor.deliveryTimeMin}-{vendor.deliveryTimeMax} মি.</span>
              </div>
              <div className="text-[10px] text-slate-300">ডেলিভারি সময়</div>
            </div>

            <div className="w-px h-8 bg-white/20"></div>

            <div>
              <div className="flex items-center justify-center gap-1 text-emerald-400 font-bold text-sm tabular-nums">
                <Bike className="w-3.5 h-3.5" />
                <span>৳{vendor.deliveryFee}</span>
              </div>
              <div className="text-[10px] text-slate-300">ডেলিভারি ফি</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs & In-Store Search */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category horizontal scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full w-full sm:w-auto">
          <button
            onClick={() => setSelectedCat('সব')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCat === 'সব'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            সব মেনু ({vendorProducts.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCat === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search inside shop */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="মেনু খুঁজুন..."
            value={vendorSearch}
            onChange={e => setVendorSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Product Grid (3D interactive cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProducts.map(product => {
          const cartItem = cart.find(i => i.product.id === product.id);
          const isJustAdded = justAddedId === product.id;

          return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex gap-4">
                {/* Product Image slot with fallback */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100 relative">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.bengaliName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center text-3xl pointer-events-none -z-10">
                    🍲
                  </div>
                  {product.discountPrice && (
                    <div className="absolute top-1.5 left-1.5 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      ছাড় ৳{product.price - product.discountPrice}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-emerald-600">{product.category}</div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight mt-0.5">
                    {product.bengaliName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
                    ৳{product.discountPrice ?? product.price}
                  </span>
                  {product.discountPrice && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      ৳{product.price}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAdd(product)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 ${
                    isJustAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200'
                  }`}
                >
                  {isJustAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>যোগ হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ যোগ করুন</span>
                    </>
                  )}
                  {cartItem && cartItem.quantity > 0 && (
                    <span className="ml-1 w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] flex items-center justify-center">
                      {cartItem.quantity}
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
