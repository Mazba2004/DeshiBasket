import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { ShoppingBag, Bot, Bell, X, Check, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenCart?: () => void;
  onOpenAi?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart, onOpenAi }) => {
  const {
    role,
    setRole,
    cart,
    notifications,
    unreadCount,
    markNotificationRead,
    clearNotifications,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);

  const totalCartItems = cart.reduce((acc, i) => acc + i.quantity, 0);

  const roleLinks: { id: UserRole; label: string }[] = [
    { id: 'CUSTOMER', label: 'ক্রেতা অ্যাপ' },
    { id: 'SELLER', label: 'সেলার ড্যাশবোর্ড' },
    { id: 'RIDER', label: 'রাইডার অ্যাপ' },
    { id: 'CUSTOMER_SERVICE', label: 'সাপোর্ট সেন্টার' },
    { id: 'ADMIN', label: 'অ্যাডমিন প্যানেল' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRole('CUSTOMER')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              🧺
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                DESHI BASKET
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 tracking-wider">
                দেশি বাস্কেট · কাশিয়ানী
              </span>
            </div>
          </button>

          {/* Quick Kashiani location badge */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors ml-2 cursor-pointer">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>কাশিয়ানী সদর, গোপালগঞ্জ</span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Clean text links with hover underline / active indicator) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {roleLinks.map(l => (
            <button
              key={l.id}
              onClick={() => setRole(l.id)}
              className={`transition-colors py-1 relative whitespace-nowrap ${
                role === l.id
                  ? 'text-emerald-700 font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              {l.label}
              {role === l.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Contextual Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Assistant Button */}
          <button
            onClick={onOpenAi}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-xs active:scale-95"
            title="DESHI AI সহকারী"
          >
            <Bot className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">DESHI AI সহকারী</span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="বিজ্ঞপ্তি"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                  <div className="font-semibold text-slate-900 text-sm">বিজ্ঞপ্তি সমূহ</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearNotifications}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      সব মুছুন
                    </button>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-400">
                      কোনো নতুন বিজ্ঞপ্তি নেই
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 text-left hover:bg-slate-50 transition-colors cursor-pointer ${
                          !n.isRead ? 'bg-emerald-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-semibold text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Drawer Trigger for Customer role */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">কার্ট</span>
            {totalCartItems > 0 && (
              <span className="px-1.5 py-0.2 bg-white text-emerald-800 font-bold rounded-full text-[11px] tabular-nums">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
