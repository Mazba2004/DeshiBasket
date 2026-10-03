import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { DemoDock } from './components/common/DemoDock';
import { AiAssistantModal } from './components/common/AiAssistantModal';
import { CustomerHome } from './components/customer/CustomerHome';
import { VendorDetail } from './components/customer/VendorDetail';
import { CartDrawer } from './components/customer/CartDrawer';
import { CheckoutModal } from './components/customer/CheckoutModal';
import { OrderTrackingView } from './components/customer/OrderTrackingView';
import { CustomerProfile } from './components/customer/CustomerProfile';
import { SellerDashboard } from './components/seller/SellerDashboard';
import { RiderDashboard } from './components/rider/RiderDashboard';
import { CustomerServiceDashboard } from './components/customerService/CustomerServiceDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Home, Search, ShoppingBag, Package, User } from 'lucide-react';
import { Vendor } from './types';

const MainAppContent: React.FC = () => {
  const {
    role,
    cart,
    activeOrder,
    customerViewTab,
    setCustomerViewTab,
    activeVendorForView,
    setActiveVendorForView,
  } = useApp();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Universal Top Bar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAi={() => setIsAiModalOpen(true)}
      />

      {/* Main Role Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5 pb-20">
        {/* Role 1: CUSTOMER */}
        {role === 'CUSTOMER' && (
          <div>
            {activeVendorForView ? (
              <VendorDetail
                vendor={activeVendorForView}
                onBack={() => setActiveVendorForView(null)}
                onOpenCart={() => setIsCartOpen(true)}
              />
            ) : (
              <>
                {customerViewTab === 'HOME' && (
                  <CustomerHome
                    onSelectVendor={(v: Vendor) => setActiveVendorForView(v)}
                    onOpenCart={() => setIsCartOpen(true)}
                  />
                )}

                {customerViewTab === 'SEARCH' && (
                  <CustomerHome
                    onSelectVendor={(v: Vendor) => setActiveVendorForView(v)}
                    onOpenCart={() => setIsCartOpen(true)}
                  />
                )}

                {customerViewTab === 'CART' && (
                  <div className="max-w-2xl mx-auto py-4">
                    <CartDrawer
                      isOpen={true}
                      onClose={() => setCustomerViewTab('HOME')}
                      onProceedToCheckout={() => setIsCheckoutOpen(true)}
                    />
                  </div>
                )}

                {customerViewTab === 'ORDERS' && (
                  <OrderTrackingView
                    order={activeOrder}
                    onOpenAi={() => setIsAiModalOpen(true)}
                  />
                )}

                {customerViewTab === 'PROFILE' && <CustomerProfile />}
              </>
            )}
          </div>
        )}

        {/* Role 2: SELLER */}
        {role === 'SELLER' && <SellerDashboard />}

        {/* Role 3: RIDER */}
        {role === 'RIDER' && <RiderDashboard />}

        {/* Role 4: CUSTOMER SERVICE */}
        {role === 'CUSTOMER_SERVICE' && <CustomerServiceDashboard />}

        {/* Role 5: ADMIN */}
        {role === 'ADMIN' && <AdminDashboard />}
      </main>

      {/* Customer Mobile Bottom Navigation Bar (When in CUSTOMER role and not in vendor detail) */}
      {role === 'CUSTOMER' && (
        <nav
          aria-label="মোবাইল নেভিগেশন"
          className="md:hidden fixed bottom-12 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-4 flex items-center justify-around shadow-lg"
        >
          <button
            onClick={() => {
              setActiveVendorForView(null);
              setCustomerViewTab('HOME');
            }}
            className={`flex flex-col items-center py-1 transition-colors ${
              customerViewTab === 'HOME' && !activeVendorForView
                ? 'text-emerald-700 font-bold'
                : 'text-slate-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">হোম</span>
          </button>

          <button
            onClick={() => {
              setActiveVendorForView(null);
              setCustomerViewTab('SEARCH');
            }}
            className={`flex flex-col items-center py-1 transition-colors ${
              customerViewTab === 'SEARCH'
                ? 'text-emerald-700 font-bold'
                : 'text-slate-500'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">খুঁজুন</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex flex-col items-center py-1 text-slate-500"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[9px] font-bold">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">কার্ট</span>
          </button>

          <button
            onClick={() => {
              setActiveVendorForView(null);
              setCustomerViewTab('ORDERS');
            }}
            className={`relative flex flex-col items-center py-1 transition-colors ${
              customerViewTab === 'ORDERS'
                ? 'text-emerald-700 font-bold'
                : 'text-slate-500'
            }`}
          >
            <Package className="w-5 h-5" />
            {activeOrder && activeOrder.status !== 'COMPLETED' && (
              <span className="absolute top-1 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            )}
            <span className="text-[10px] mt-0.5">অর্ডার</span>
          </button>

          <button
            onClick={() => {
              setActiveVendorForView(null);
              setCustomerViewTab('PROFILE');
            }}
            className={`flex flex-col items-center py-1 transition-colors ${
              customerViewTab === 'PROFILE'
                ? 'text-emerald-700 font-bold'
                : 'text-slate-500'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">প্রোফাইল</span>
          </button>
        </nav>
      )}

      {/* Cart Slideover Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={() => {
          setCustomerViewTab('ORDERS');
          setActiveVendorForView(null);
        }}
      />

      {/* DESHI AI Support Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Persistent 🎮 DEMO MODE Control Center Dock */}
      <DemoDock />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
