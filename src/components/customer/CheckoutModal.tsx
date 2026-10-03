import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { CheckCircle2, ShieldCheck, MapPin, Phone, User, FileText, X } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const { currentCustomer, placeOrder, cartTotal, currentSellerVendor } = useApp();

  const [name, setName] = useState(currentCustomer.name);
  const [phone, setPhone] = useState(currentCustomer.phone);
  const [address, setAddress] = useState(currentCustomer.defaultAddress);
  const [zone, setZone] = useState(currentCustomer.zone);
  const [landmark, setLandmark] = useState(currentCustomer.landmark);
  const [notes, setNotes] = useState('গরম গরম খাবার দ্রুত পাঠাবেন। ধন্যবাদ!');
  const [paymentMethod, setPaymentMethod] = useState<'ক্যাশ অন ডেলিভারি' | 'বিকাশ (bKash)' | 'নগদ (Nagad)'>(
    'ক্যাশ অন ডেলিভারি'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder(paymentMethod, notes);
      setIsSubmitting(false);
      setConfirmedOrder(order);
    }, 1200);
  };

  const handleFinish = () => {
    if (confirmedOrder) {
      onOrderSuccess(confirmedOrder);
    }
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-fade-in">
        {/* If Order Confirmed State */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-4xl shadow-inner animate-bounce">
              🎉
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে! 🎉
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                অর্ডার নিশ্চিতকরণ এসএমএস এবং বিজ্ঞপ্তির মাধ্যমে আপনার ফোনে পাঠানো হয়েছে।
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">অর্ডার নম্বর:</span>
                <span className="font-bold text-emerald-700">#{confirmedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">দোকান/রেস্টুরেন্ট:</span>
                <span className="font-semibold text-slate-900">{confirmedOrder.vendor.bengaliName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">মোট মূল্য:</span>
                <span className="font-bold text-slate-900 tabular-nums">৳{confirmedOrder.totalAmount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">পেমেন্ট পদ্ধতি:</span>
                <span className="font-medium text-slate-800">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">সম্ভাব্য ডেলিভারি সময়:</span>
                <span className="font-semibold text-emerald-600">২৫ - ৩৫ মিনিট</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-700/20 active:scale-95 transition-all"
            >
              অর্ডার লাইভ ট্র্যাক করুন →
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base sm:text-lg">অর্ডার নিশ্চিতকরণ ও চেকআউট</h3>
                <p className="text-xs text-emerald-200">
                  {currentSellerVendor.bengaliName} · কাশিয়ানী ডেলিভারি জোন
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Customer Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-1">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>গ্রাহকের তথ্য ও যোগাযোগের নম্বর</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      আপনার পূর্ণ নাম
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      মোবাইল নম্বর (SMS আপডেট যাবে)
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-1">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>ডেলিভারি ঠিকানা ও এলাকা</span>
                </h4>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    সম্পূর্ণ ঠিকানা (বাসা/রোড)
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">এলাকা / ইউনিয়ন</label>
                    <select
                      value={zone}
                      onChange={e => setZone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                    >
                      <option value="কাশিয়ানী বাজার">কাশিয়ানী বাজার</option>
                      <option value="রামদিয়া বাজার">রামদিয়া বাজার</option>
                      <option value="ভাটিয়াপাড়া মোড়">ভাটিয়াপাড়া মোড়</option>
                      <option value="ওড়াকান্দি ঠাকুরবাড়ি রোড">ওড়াকান্দি ঠাকুরবাড়ি রোড</option>
                      <option value="সাজাইল ইউনিয়ন মোড়">সাজাইল ইউনিয়ন মোড়</option>
                      <option value="ফুকরা বাজার">ফুকরা বাজার</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      ল্যান্ডমার্ক / পরিচিত স্থান
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={e => setLandmark(e.target.value)}
                      placeholder="যেমন: মসজিদের পূর্ব পাশে"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    অতিরিক্ত নির্দেশনা (রাইডার / দোকানের জন্য)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>পেমেন্ট পদ্ধতি নির্বাচন করুন</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'ক্যাশ অন ডেলিভারি', label: 'ক্যাশ অন ডেলিভারি', sub: 'পণ্য পেয়ে টাকা দিন', icon: '💵' },
                    { id: 'বিকাশ (bKash)', label: 'বিকাশ পেমেন্ট', sub: 'bKash (DEMO)', icon: '📱' },
                    { id: 'নগদ (Nagad)', label: 'নগদ পেমেন্ট', sub: 'Nagad (DEMO)', icon: '⚡' },
                  ].map(method => (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === method.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-lg">{method.icon}</span>
                      <div className="mt-1">
                        <div className="font-semibold text-xs">{method.label}</div>
                        <div className="text-[10px] text-slate-500">{method.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Final Total Display and Submit CTA */}
              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="text-slate-600 font-medium">মোট প্রদেয় টাকা:</span>
                  <span className="text-lg font-bold text-emerald-700 tabular-nums">৳{cartTotal}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-emerald-700/20 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>অর্ডার প্লেস করা হচ্ছে...</span>
                    </span>
                  ) : (
                    <span>অর্ডার নিশ্চিত করুন (৳{cartTotal})</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
