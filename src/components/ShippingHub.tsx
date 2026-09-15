import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  Printer, 
  Check, 
  ExternalLink, 
  Search, 
  Filter, 
  ShieldCheck, 
  Clock, 
  QrCode, 
  MapPin, 
  Phone, 
  FileText,
  Send,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';

export const ShippingHub: React.FC = () => {
  const { 
    orders, 
    updateOrderCourier, 
    advanceOrderStatus, 
    shippingLabelOrder, 
    setShippingLabelOrder 
  } = useStore();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courierSelect, setCourierSelect] = useState<'Steadfast' | 'Pathao' | 'RedX' | 'Paperfly'>('Steadfast');
  const [successToast, setSuccessToast] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'all') return true;
    return o.orderStatus === statusFilter;
  });

  const handlePrintLabel = (order: Order) => {
    setShippingLabelOrder(order);
  };

  const handleQuickStatusChange = (orderId: string, nextStatus: OrderStatus) => {
    advanceOrderStatus(orderId);
    setSuccessToast(`অর্ডার #${orderId} এর স্ট্যাটাস সফলভাবে আপডেট হয়েছে!`);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const handleAssignCourier = (order: Order, courier: 'Steadfast' | 'Pathao' | 'RedX' | 'Paperfly') => {
    const prefix = courier === 'Steadfast' ? 'STDF' : courier === 'Pathao' ? 'PTH' : courier === 'RedX' ? 'RDX' : 'PFLY';
    const newConsignment = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

    updateOrderCourier(
      order.id,
      {
        partner: courier,
        consignmentId: newConsignment,
        riderName: courier === 'Pathao' ? 'রাকিবুল হাসান (পাঠাও)' : 'তানভীর আহমেদ (স্টেডফাস্ট)',
        riderPhone: '01711-223344',
      },
      'shipped'
    );

    setSuccessToast(`কুরিয়ার ${courier} কনসাইনমেন্ট ${newConsignment} তৈরি হয়েছে!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  // Metrics
  const pendingPack = orders.filter((o) => o.orderStatus === 'confirmed').length;
  const readyDispatch = orders.filter((o) => o.orderStatus === 'packaging').length;
  const inTransit = orders.filter((o) => o.orderStatus === 'shipped' || o.orderStatus === 'out_for_delivery').length;
  const completed = orders.filter((o) => o.orderStatus === 'delivered').length;

  return (
    <div className="py-10 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Logistics Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold mb-1">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>স্মার্ট লজিস্টিক ও কুরিয়ার অটোমেশন</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C3B2B] font-serif">
              শিপিং প্রসেস ও ডিসপ্যাচ সেন্টার
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              অটোমেটিক ওজন হিসাব, স্টেডফাস্ট ও পাঠাও কনসাইনমেন্ট তৈরি এবং এয়ারওয়ে বিল প্রিন্ট সুবিধা।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-stone-600 hidden sm:inline">
              ডিফল্ট কুরিয়ার:
            </span>
            <select
              value={courierSelect}
              onChange={(e) => setCourierSelect(e.target.value as any)}
              className="text-xs font-bold bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-[#1C3B2B]"
            >
              <option value="Steadfast">Steadfast Courier (স্টেডফাস্ট)</option>
              <option value="Pathao">Pathao Logistics (পাঠাও)</option>
              <option value="RedX">RedX Express (রেডএক্স)</option>
              <option value="Paperfly">Paperfly Delivery</option>
            </select>
          </div>
        </div>

        {successToast && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs animate-fadeIn">
            <Check className="w-5 h-5 text-emerald-700" />
            <span>{successToast}</span>
          </div>
        )}

        {/* 4 Logistics Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => setStatusFilter('confirmed')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'confirmed' ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200' : 'bg-white border-stone-200 hover:shadow-xs'
            }`}
          >
            <span className="text-xs font-semibold text-stone-500 block">প্যাকিং বাকি</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-700 font-mono mt-1 block">
              {pendingPack} টি
            </span>
            <span className="text-[11px] text-amber-800 mt-1 block">ফুড-গ্রেড সিলিং প্রয়োজন</span>
          </div>

          <div 
            onClick={() => setStatusFilter('packaging')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'packaging' ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200' : 'bg-white border-stone-200 hover:shadow-xs'
            }`}
          >
            <span className="text-xs font-semibold text-stone-500 block">ডিসপ্যাচ প্রস্তুত</span>
            <span className="text-2xl sm:text-3xl font-black text-blue-700 font-mono mt-1 block">
              {readyDispatch} টি
            </span>
            <span className="text-[11px] text-blue-800 mt-1 block">কুরিয়ার কনসাইনমেন্ট রেডি</span>
          </div>

          <div 
            onClick={() => setStatusFilter('shipped')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'shipped' ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-200' : 'bg-white border-stone-200 hover:shadow-xs'
            }`}
          >
            <span className="text-xs font-semibold text-stone-500 block">ট্রানজিটে রয়েছে</span>
            <span className="text-2xl sm:text-3xl font-black text-purple-700 font-mono mt-1 block">
              {inTransit} টি
            </span>
            <span className="text-[11px] text-purple-800 mt-1 block">রাইডার ডেলিভারির পথে</span>
          </div>

          <div 
            onClick={() => setStatusFilter('delivered')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'delivered' ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200' : 'bg-white border-stone-200 hover:shadow-xs'
            }`}
          >
            <span className="text-xs font-semibold text-stone-500 block">সফল ডেলিভারি</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono mt-1 block">
              {completed} টি
            </span>
            <span className="text-[11px] text-emerald-800 mt-1 block">টাকা সংগ্রহ সম্পন্ন</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-stone-200 overflow-x-auto text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-stone-500">ফিল্টার:</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'all' ? 'bg-[#1C3B2B] text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              সব অর্ডার ({orders.length})
            </button>
            <button
              onClick={() => setStatusFilter('confirmed')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'confirmed' ? 'bg-[#1C3B2B] text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              নতুন অর্ডার
            </button>
            <button
              onClick={() => setStatusFilter('out_for_delivery')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'out_for_delivery' ? 'bg-[#1C3B2B] text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              ডেলিভারির পথে
            </button>
          </div>
          
          <span className="text-stone-400 text-[11px]">
            {filteredOrders.length}টি অর্ডার প্রদর্শিত
          </span>
        </div>

        {/* Orders Fulfillment Table / Cards */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isCod = order.paymentMethod === 'cod';

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-stone-300 transition-all space-y-4"
              >
                {/* Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-[#1C3B2B] font-mono">
                      #{order.id}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      order.orderStatus === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                      order.orderStatus === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                      order.orderStatus === 'shipped' ? 'bg-purple-100 text-purple-800' :
                      order.orderStatus === 'packaging' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {order.orderStatus}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">
                      {order.date}
                    </span>
                  </div>

                  {/* Parcel Weight & COD Collection Badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg">
                      📦 ওজন: {order.totalWeightKg} কেজি
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      isCod ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {isCod ? `ক্যাশ সংগ্রহ: ৳${order.total}` : 'অনলাইন পরিশোধিত (৳০ সংগ্রহ)'}
                    </span>
                  </div>
                </div>

                {/* Middle Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                  {/* Recipient details */}
                  <div className="md:col-span-4 space-y-1">
                    <span className="text-stone-400 font-semibold block uppercase tracking-wider text-[10px]">
                      প্রাপকের তথ্য:
                    </span>
                    <p className="font-bold text-stone-800 text-sm">{order.customerName}</p>
                    <p className="text-stone-600 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-stone-400" />
                      <span className="font-mono">{order.customerPhone}</span>
                    </p>
                    <p className="text-stone-600 flex items-start gap-1">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
                      <span>{order.customerAddress} ({order.customerCity})</span>
                    </p>
                  </div>

                  {/* Items list */}
                  <div className="md:col-span-4 space-y-1 md:border-l md:border-stone-100 md:pl-4">
                    <span className="text-stone-400 font-semibold block uppercase tracking-wider text-[10px]">
                      প্যাকেটের ভেতরের পণ্য:
                    </span>
                    <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                      {order.items.map((it) => (
                        <div key={it.product.id} className="flex justify-between text-stone-700">
                          <span className="font-medium truncate max-w-[170px]">{it.product.name}</span>
                          <span className="font-mono font-bold">× {it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Courier & Tracking Assignment */}
                  <div className="md:col-span-4 space-y-2 md:border-l md:border-stone-100 md:pl-4">
                    <span className="text-stone-400 font-semibold block uppercase tracking-wider text-[10px]">
                      কুরিয়ার পার্টনার ও ট্র্যাকিং:
                    </span>
                    <p className="text-stone-800 font-medium">
                      কুরিয়ার: <strong className="text-emerald-800">{order.courierDetails.partner}</strong>
                    </p>
                    <p className="font-mono font-bold text-xs text-stone-700 bg-stone-50 p-1.5 rounded border border-stone-200">
                      আইডি: {order.courierDetails.consignmentId}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Row: Logistics Shortcuts */}
                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  
                  {/* Status Progression buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    {order.orderStatus === 'confirmed' && (
                      <button
                        onClick={() => handleQuickStatusChange(order.id, 'packaging')}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>প্যাকিং সম্পন্ন করুন</span>
                      </button>
                    )}

                    {order.orderStatus === 'packaging' && (
                      <button
                        onClick={() => handleAssignCourier(order, courierSelect)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{courierSelect} এ বুকিং দিন ও ট্র্যাকিং বানান</span>
                      </button>
                    )}

                    {order.orderStatus === 'shipped' && (
                      <button
                        onClick={() => handleQuickStatusChange(order.id, 'out_for_delivery')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>রাইডারকে বুঝিয়ে দিন (ডেলিভারির পথে)</span>
                      </button>
                    )}

                    {order.orderStatus === 'out_for_delivery' && (
                      <button
                        onClick={() => handleQuickStatusChange(order.id, 'delivered')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>ডেলিভারি সম্পন্ন মার্ক করুন</span>
                      </button>
                    )}
                  </div>

                  {/* Print Airway Bill / Shipping Label Button */}
                  <button
                    onClick={() => handlePrintLabel(order)}
                    className="bg-stone-800 hover:bg-black text-white font-bold px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-300" />
                    <span>শিপিং লেবেল ও চালান প্রিন্ট</span>
                  </button>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Printable Shipping Label Modal */}
      {shippingLabelOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-stone-300 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-bold text-base text-[#1C3B2B] flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <span>এয়ারওয়ে বিল ও শিপিং স্টিকার প্রিভিউ</span>
              </h3>
              <button
                onClick={() => setShippingLabelOrder(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                বন্ধ
              </button>
            </div>

            {/* The Actual Label to Print */}
            <div 
              id="printable-shipping-label"
              className="border-2 border-dashed border-stone-800 p-5 rounded-xl bg-white font-sans text-xs text-stone-900 space-y-3"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-stone-800 pb-2">
                <div>
                  <h2 className="text-base font-black tracking-tight text-stone-900">
                    DESHI FOOD (DF)
                  </h2>
                  <p className="text-[10px] text-stone-600">খাঁটি পণ্য, সুস্থ জীবনের কথা</p>
                  <p className="text-[10px] font-mono">হটলাইন: 01751279584</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider block">
                    {shippingLabelOrder.courierDetails.partner} COURIER
                  </span>
                  <span className="font-mono font-black text-sm block">
                    {shippingLabelOrder.courierDetails.consignmentId}
                  </span>
                  <span className="text-[10px] font-bold bg-stone-100 px-2 py-0.5 rounded border border-stone-400">
                    ওজন: {shippingLabelOrder.totalWeightKg} KG
                  </span>
                </div>
              </div>

              {/* Barcode Mock */}
              <div className="text-center py-1 bg-stone-50 border border-stone-300 rounded">
                <div className="h-8 flex items-center justify-center space-x-1">
                  {[4,2,6,1,5,3,2,6,1,4,2,5,3,1,6,2,4,3,5,2].map((w, i) => (
                    <div 
                      key={i} 
                      className="bg-black h-full" 
                      style={{ width: `${w}px` }} 
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] tracking-widest block mt-0.5">
                  *{shippingLabelOrder.id}-{shippingLabelOrder.courierDetails.consignmentId}*
                </span>
              </div>

              {/* Recipient & COD Details */}
              <div className="grid grid-cols-2 gap-3 border-b-2 border-stone-800 pb-3">
                <div className="space-y-1">
                  <span className="font-bold text-[10px] text-stone-500 uppercase block">
                    ডেলিভারি প্রাপক (CUSTOMER):
                  </span>
                  <p className="font-black text-sm">{shippingLabelOrder.customerName}</p>
                  <p className="font-mono font-bold">{shippingLabelOrder.customerPhone}</p>
                  <p className="text-[11px] leading-snug">{shippingLabelOrder.customerAddress}</p>
                  <p className="font-bold text-[11px]">শহর: {shippingLabelOrder.customerCity}</p>
                </div>

                <div className="border-l-2 border-stone-800 pl-3 flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-[10px] text-stone-500 uppercase block">
                      ক্যাশ কালেকশন (COD):
                    </span>
                    <div className="text-lg font-black text-stone-900 mt-1">
                      {shippingLabelOrder.paymentMethod === 'cod' 
                        ? `৳ ${shippingLabelOrder.total}` 
                        : 'পরিশোধিত (৳০)'}
                    </div>
                    <span className="text-[10px] font-semibold text-stone-600 block">
                      পেমেন্ট: {shippingLabelOrder.paymentMethod.toUpperCase()}
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-stone-500 block">অর্ডার আইডি:</span>
                    <span className="font-mono font-black text-sm">#{shippingLabelOrder.id}</span>
                  </div>
                </div>
              </div>

              {/* Items in Parcel */}
              <div className="text-[10px]">
                <span className="font-bold text-stone-700 block mb-1">প্যাকেটস্থ খাদ্যদ্রব্য:</span>
                <ul className="list-disc list-inside space-y-0.5 text-stone-600">
                  {shippingLabelOrder.items.map((it) => (
                    <li key={it.product.id}>
                      {it.product.name} ({it.product.packageSize}) × {it.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-[9px] text-stone-500 border-t border-stone-300 pt-1 text-center">
                ভেঙ্গলে বা ক্ষতিগ্রস্ত হলে অবিলম্বে হটলাইনে (01842-078717) যোগাযোগ করুন।
              </div>
            </div>

            {/* Print Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShippingLabelOrder(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                বাতিল
              </button>
              <button
                onClick={() => window.print()}
                className="bg-[#1C3B2B] hover:bg-[#152D21] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#EAB308]" />
                <span>প্রিন্ট করুন (Ctrl + P)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
