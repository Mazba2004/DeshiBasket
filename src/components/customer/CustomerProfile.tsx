import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, MapPin, Tag, Heart, Clock, Star, Edit3, CheckCircle, Shield } from 'lucide-react';

export const CustomerProfile: React.FC = () => {
  const { currentCustomer, orders, activeOrder } = useApp();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState(currentCustomer.defaultAddress);
  const [landmark, setLandmark] = useState(currentCustomer.landmark);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Ratings modal state for demo
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [vendorRating, setVendorRating] = useState(5);
  const [riderRating, setRiderRating] = useState(5);
  const [reviewText, setReviewText] = useState('খাবার অনেক গরম ও সুস্বাদু ছিল। রাইডার দ্রুত ডেলিভারি দিয়েছেন।');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingAddress(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setShowRatingModal(false);
      setReviewSubmitted(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            {currentCustomer.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{currentCustomer.name}</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                ভেরিফায়েড কাস্টমার
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentCustomer.phone}</span>
              <span>·</span>
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentCustomer.zone}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowRatingModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-xs font-semibold transition-colors"
        >
          <Star className="w-4 h-4 text-amber-500 fill-current" />
          <span>রিভিউ ও রেটিং দিন</span>
        </button>
      </div>

      {/* Address Management Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">আপনার সংরক্ষিত ডেলিভারি ঠিকানা</h3>
          </div>
          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingAddress ? 'বাতিল করুন' : 'ঠিকানা পরিবর্তন করুন'}</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>ঠিকানা সফলভাবে আপডেট করা হয়েছে!</span>
          </div>
        )}

        {isEditingAddress ? (
          <form onSubmit={handleSaveAddress} className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">ঠিকানা</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">ল্যান্ডমার্ক</label>
              <input
                type="text"
                value={landmark}
                onChange={e => setLandmark(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500 transition-colors"
            >
              সংরক্ষণ করুন
            </button>
          </form>
        ) : (
          <div className="text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-800 text-sm">{address}</p>
            <p className="text-slate-500">এলাকা: {currentCustomer.zone}</p>
            <p className="text-slate-500">ল্যান্ডমার্ক: {landmark}</p>
          </div>
        )}
      </div>

      {/* Coupons & Offers */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Tag className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-base">সক্রিয় ডিসকাউন্ট কুপন</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                DESHI50
              </span>
              <p className="text-xs text-slate-700 mt-1.5 font-medium">প্রথম অর্ডারে ৳৫০ ছাড়</p>
              <p className="text-[10px] text-slate-500">সর্বনিম্ন অর্ডার ৳২০০</p>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-1 rounded">
              ব্যবহারযোগ্য
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-300">
                KASHIANI_FREE
              </span>
              <p className="text-xs text-slate-700 mt-1.5 font-medium">ফ্রি ডেলিভারি ভাউচার</p>
              <p className="text-[10px] text-slate-500">কাশিয়ানী সদরের যেকোনো অর্ডারে</p>
            </div>
            <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-2 py-1 rounded">
              ব্যবহারযোগ্য
            </span>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Clock className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-base">পূর্ববর্তী অর্ডারের ইতিহাস</h3>
        </div>

        <div className="space-y-3">
          {orders.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">এখনও কোনো অর্ডার সম্পন্ন হয়নি</p>
          ) : (
            orders.map(ord => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {ord.vendor.bengaliName}
                    </span>
                    <span className="text-slate-400">· #{ord.orderNumber}</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    {ord.items.map(i => `${i.product.bengaliName} (${i.quantity})`).join(', ')}
                  </p>
                  <span className="text-[11px] text-slate-400">{ord.placedAt} · {ord.paymentMethod}</span>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-right">
                    <div className="font-bold text-slate-900 text-sm tabular-nums">৳{ord.totalAmount}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">{ord.status}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Ratings & Reviews Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">ডেলিভারি কেমন হয়েছে? রিভিউ দিন</h3>

            {reviewSubmitted ? (
              <div className="py-8 text-center text-emerald-600 space-y-2">
                <CheckCircle className="w-12 h-12 mx-auto animate-bounce" />
                <p className="font-bold text-base">আপনার মূল্যবান মতামতের জন্য ধন্যবাদ!</p>
              </div>
            ) : (
              <form onSubmit={handleRatingSubmit} className="space-y-4 text-xs">
                {/* Vendor Rating */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    রেস্টুরেন্ট / দোকান রেটিং (কাশিয়ানী বিরিয়ানি হাউস):
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setVendorRating(star)}
                        className="text-2xl text-amber-400 hover:scale-110 transition-transform"
                      >
                        {star <= vendorRating ? '★' : '☆'}
                      </button>
                    ))}
                    <span className="text-slate-500 font-medium ml-2">{vendorRating} / ৫ স্টার</span>
                  </div>
                </div>

                {/* Rider Rating */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    ডেলিভারিম্যান রেটিং (রাকিব হাসান):
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRiderRating(star)}
                        className="text-2xl text-amber-400 hover:scale-110 transition-transform"
                      >
                        {star <= riderRating ? '★' : '☆'}
                      </button>
                    ))}
                    <span className="text-slate-500 font-medium ml-2">{riderRating} / ৫ স্টার</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    আপনার মন্তব্য লিখুন:
                  </label>
                  <textarea
                    rows={3}
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRatingModal(false)}
                    className="w-1/2 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
                  >
                    পরে দেব
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500"
                  >
                    রিভিউ জমা দিন
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
