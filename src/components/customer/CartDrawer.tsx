import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout,
}) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    currentSellerVendor,
  } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">আপনার শপিং কার্ট</h3>
              <p className="text-xs text-slate-500">
                {currentSellerVendor.bengaliName} ({cart.length} পদ পণ্য)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl mb-3">
                🧺
              </div>
              <p className="font-semibold text-slate-700 text-base">আপনার কার্ট খালি রয়েছে</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                কাশিয়ানীর সেরা রেস্টুরেন্ট বা দোকান থেকে পছন্দসই খাবার ও পণ্য যোগ করুন।
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2 rounded-xl bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-500 transition-colors"
              >
                কেনাকাটা শুরু করুন
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-lg">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.bengaliName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Resilient fallback container if external url fails
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      '🍲'
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                      {item.product.bengaliName}
                    </h4>
                    <div className="text-xs text-slate-500 tabular-nums">
                      ৳{item.selectedPrice} × {item.quantity} ={' '}
                      <span className="font-semibold text-slate-800">
                        ৳{item.selectedPrice * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg shrink-0">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, -1)}
                    className="w-7 h-7 rounded-md bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center shadow-xs transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-slate-900 tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, 1)}
                    className="w-7 h-7 rounded-md bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  title="মুছুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pricing Summary & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>পণ্যের উপ-মোট (Subtotal)</span>
                <span className="font-semibold text-slate-900 tabular-nums">৳{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ (কাশিয়ানী সদর)</span>
                <span className="font-semibold text-slate-900 tabular-nums">৳{cartDeliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span>প্যাকেজিং ও অন্যান্য</span>
                <span className="font-semibold text-slate-900 tabular-nums">৳১০</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>সর্বমোট প্রদেয়</span>
                <span className="text-emerald-700 tabular-nums text-base">৳{cartTotal}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={onClose}
                className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-100 transition-colors"
              >
                আরও পণ্য যোগ করুন
              </button>
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
              >
                <span>অর্ডার নিশ্চিত করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
