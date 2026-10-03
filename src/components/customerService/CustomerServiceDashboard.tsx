import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import {
  Headset,
  Search,
  Filter,
  AlertTriangle,
  Phone,
  MessageSquare,
  CheckCircle,
  FileText,
  Clock,
  DollarSign,
  User,
  Store,
  Bike,
} from 'lucide-react';

export const CustomerServiceDashboard: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [internalNote, setInternalNote] = useState<string>('');
  const [noteSuccess, setNoteSuccess] = useState<boolean>(false);

  // Filter sections
  const filteredOrders = orders.filter(o => {
    let matchFilter = true;
    if (activeFilter === 'NEW') matchFilter = o.status === 'PLACED';
    if (activeFilter === 'RUNNING')
      matchFilter = [
        'ACCEPTED_BY_SELLER',
        'PREPARING',
        'READY_FOR_PICKUP',
        'RIDER_SEARCHING',
        'RIDER_ASSIGNED',
        'OUT_FOR_DELIVERY',
      ].includes(o.status);
    if (activeFilter === 'ISSUES')
      matchFilter = o.status === 'ISSUE_REPORTED' || o.status === 'CANCELLED';
    if (activeFilter === 'COMPLETED')
      matchFilter = o.status === 'DELIVERED' || o.status === 'COMPLETED';

    let matchSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchSearch =
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        o.vendor.bengaliName.toLowerCase().includes(q);
    }

    return matchFilter && matchSearch;
  });

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !internalNote.trim()) return;

    selectedOrder.issueReport = {
      type: 'কাস্টমার কেয়ার নোট',
      description: internalNote,
      status: 'RESOLVED',
      internalNotes: internalNote,
    };
    setNoteSuccess(true);
    setTimeout(() => {
      setNoteSuccess(false);
      setInternalNote('');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-700 text-white flex items-center justify-center text-3xl shadow-md">
            🎧
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                কাস্টমার সার্ভিস & হেল্পডেস্ক সেন্টার
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                ২৪/৭ কেন্দ্রীয় মনিটরিং
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              কাশিয়ানী উপজেলার গ্রাহক, দোকান ও রাইডারদের সকল টিকিট ও রিয়েলটাইম অর্ডার ট্র্যাকিং
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400">সক্রিয় এজেন্ট</div>
            <div className="text-xs font-bold text-slate-800">সুলতানা রহমান (আইডি #৪২২)</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
          {[
            { id: 'ALL', label: 'সব অর্ডার' },
            { id: 'NEW', label: 'নতুন অর্ডার' },
            { id: 'RUNNING', label: 'ডেলিভারি চলমান' },
            { id: 'ISSUES', label: 'সমস্যাযুক্ত / বাতিল' },
            { id: 'COMPLETED', label: 'সম্পন্ন অর্ডার' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                activeFilter === f.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="অর্ডার নং, ফোন বা গ্রাহকের নাম..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-700"
          />
        </div>
      </div>

      {/* Orders Table & Detail Drawer Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table view */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">
              অর্ডারের তালিকা ({filteredOrders.length})
            </h3>
            <span className="text-[11px] text-slate-400">প্রতিটি অর্ডারে ক্লিক করে বিস্তারিত দেখুন</span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="p-3">অর্ডার আইডি</th>
                  <th className="p-3">গ্রাহক</th>
                  <th className="p-3">দোকান</th>
                  <th className="p-3">রাইডার</th>
                  <th className="p-3">মূল্য</th>
                  <th className="p-3">অবস্থা</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400">
                      কোনো ম্যাচিং অর্ডার পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        selectedOrder?.id === order.id ? 'bg-teal-50/70 font-medium' : ''
                      }`}
                    >
                      <td className="p-3 font-bold text-slate-900 tabular-nums">
                        #{order.orderNumber}
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-slate-800">{order.customer.name}</div>
                        <div className="text-[10px] text-slate-400">{order.customer.phone}</div>
                      </td>
                      <td className="p-3 text-slate-700">{order.vendor.bengaliName}</td>
                      <td className="p-3 text-slate-700">
                        {order.assignedRider?.bengaliName || (
                          <span className="text-slate-400 italic">অ্যাসাইন বাকি</span>
                        )}
                      </td>
                      <td className="p-3 font-bold text-slate-900 tabular-nums">
                        ৳{order.totalAmount}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Order Detail & Action Panel */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col">
          {selectedOrder ? (
            <>
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                    অর্ডার পর্যালোচনা
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">
                    #{selectedOrder.orderNumber}
                  </h3>
                </div>
                <div className="text-right text-xs">
                  <div className="font-bold text-slate-900 tabular-nums">
                    ৳{selectedOrder.totalAmount}
                  </div>
                  <div className="text-[10px] text-slate-400">{selectedOrder.paymentMethod}</div>
                </div>
              </div>

              {/* Direct Call / Contact Triggers */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold text-slate-900">{selectedOrder.customer.name}</div>
                      <div className="text-[10px] text-slate-400">{selectedOrder.customer.phone}</div>
                    </div>
                  </div>
                  <a
                    href={`tel:${selectedOrder.customer.phone}`}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-bold text-slate-900">{selectedOrder.vendor.bengaliName}</div>
                      <div className="text-[10px] text-slate-400">{selectedOrder.vendor.phone}</div>
                    </div>
                  </div>
                  <a
                    href={`tel:${selectedOrder.vendor.phone}`}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-amber-700 hover:bg-amber-50"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>

                {selectedOrder.assignedRider && (
                  <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bike className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-bold text-slate-900">
                          {selectedOrder.assignedRider.bengaliName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {selectedOrder.assignedRider.phone} ({selectedOrder.assignedRider.vehicleType})
                        </div>
                      </div>
                    </div>
                    <a
                      href={`tel:${selectedOrder.assignedRider.phone}`}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-blue-700 hover:bg-blue-50"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Internal Note & Complaint Resolution Form */}
              <form onSubmit={handleSaveNote} className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800">
                  এজেন্ট ইন্টারনাল নোট / সমাধান লিখুন:
                </label>
                <textarea
                  rows={3}
                  value={internalNote}
                  onChange={e => setInternalNote(e.target.value)}
                  placeholder="গ্রাহকের সাথে কথা বলা হয়েছে, কোনো সমস্যা থাকলে সমাধান..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-700"
                />

                {noteSuccess && (
                  <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg text-[11px] flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>নোট সফলভাবে সংরক্ষিত হয়েছে!</span>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-600 transition-colors"
                  >
                    নোট সংরক্ষণ করুন
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateOrderStatus(
                        selectedOrder.id,
                        'COMPLETED',
                        'কাস্টমার সার্ভিস দ্বারা সমাধান ও ক্লোজ করা হয়েছে।'
                      )
                    }
                    className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs"
                  >
                    ক্লোজ করুন
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="p-8 text-center text-slate-400 space-y-2 my-auto">
              <Headset className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-xs">বাম পাশের তালিকা থেকে যেকোনো অর্ডার নির্বাচন করুন।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
