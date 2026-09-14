import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Trash2, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Package, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';
import { useStore } from '../../context/StoreContext';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  const { updateOrderStatus, deleteOrder } = useStore();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order?.orderStatus || 'confirmed');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!order) return null;

  const handleStatusChange = (newStatus: OrderStatus) => {
    setSelectedStatus(newStatus);
    setIsUpdating(true);
    updateOrderStatus(order.id, newStatus);
    setTimeout(() => setIsUpdating(false), 500);
  };

  const handleDelete = () => {
    deleteOrder(order.id);
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  const statusOptions: { value: OrderStatus; label: string; color: string }[] = [
    { value: 'pending', label: 'Pending (অপেক্ষমাণ)', color: 'bg-amber-100 text-amber-800' },
    { value: 'confirmed', label: 'Confirmed (নিশ্চিতকৃত)', color: 'bg-purple-100 text-purple-800' },
    { value: 'processing', label: 'Processing (প্রসেসিং চলছে)', color: 'bg-blue-100 text-blue-800' },
    { value: 'shipped', label: 'Shipped (শিপিং সম্পন্ন)', color: 'bg-orange-100 text-orange-800' },
    { value: 'out_for_delivery', label: 'Out for Delivery (ডেলিভারির পথে)', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'delivered', label: 'Delivered (সম্পন্ন)', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'cancelled', label: 'Cancelled (বাতিল)', color: 'bg-rose-100 text-rose-800' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">অর্ডার #{order.id}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-slate-200 text-slate-700">
                {order.orderStatus}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{order.date}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
              title="Print Order Invoice"
            >
              <Printer className="w-4 h-4" />
            </button>
            {showDeleteConfirm ? (
              <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-2 py-1 rounded-xl">
                <span className="text-[11px] font-bold text-rose-700">মুছে ফেলবেন?</span>
                <button
                  onClick={handleDelete}
                  className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-[11px] font-bold transition-colors cursor-pointer"
                >
                  হ্যাঁ
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-1.5 py-0.5 text-slate-500 hover:text-slate-700 text-[11px] cursor-pointer"
                >
                  না
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                title="Delete Order"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Status Quick Update Bar */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-800">অর্ডার স্ট্যাটাস আপডেট করুন:</p>
              <p className="text-[11px] text-slate-500">পরিবর্তন করার সাথে সাথে গ্রাহক তার ড্যাশবোর্ডে লাইভ দেখতে পাবেন</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-[#6366F1] outline-hidden cursor-pointer"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {isUpdating && (
                <span className="text-xs text-emerald-600 font-bold animate-pulse">সংরক্ষিত!</span>
              )}
            </div>
          </div>

          {/* Customer & Delivery Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-100 bg-white">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2.5">
                <User className="w-4 h-4 text-[#6366F1]" />
                <span>গ্রাহকের বিবরণ</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{order.customerName}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <a href={`tel:${order.customerPhone}`} className="hover:text-[#6366F1]">
                  {order.customerPhone}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 bg-white">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>ডেলিভারি ঠিকানা ({order.customerCity})</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{order.customerAddress}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                <Truck className="w-3.5 h-3.5 text-slate-400" />
                <span>কুরিয়ার: {order.courierDetails?.partner || 'Steadfast'} ({order.courierDetails?.consignmentId || 'Pending'})</span>
              </div>
            </div>
          </div>

          {/* Ordered Products Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              অর্ডারের পণ্যসমূহ ({order.items.length} টি আইটেম)
            </h3>
            <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between gap-3 bg-white hover:bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-12 h-12 rounded-lg object-cover border border-slate-100 shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{item.product.name}</h4>
                      <p className="text-xs text-slate-500">{item.product.packageSize} • ৳ {item.product.price} × {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">
                      ৳ {item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Payment Summary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>সাবটোটাল</span>
              <span>৳ {order.subtotal}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>ডেলিভারি চার্জ</span>
              <span>৳ {order.deliveryCharge}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-xs text-emerald-600 font-medium">
                <span>ছাড় (কুপন/পয়েন্ট)</span>
                <span>- ৳ {order.discount}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
              <span>সর্বমোট প্রদেয়</span>
              <span className="text-[#6366F1]">৳ {order.total}</span>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                <span>পেমেন্ট মেথড: <strong className="uppercase text-slate-700">{order.paymentMethod}</strong></span>
              </span>
              <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {order.paymentStatus}
              </span>
            </div>
            {order.transactionId && (
              <p className="text-[11px] text-slate-500">
                ট্রানজ্যাকশন আইডি: <strong className="text-slate-800">{order.transactionId}</strong>
              </p>
            )}
          </div>

          {/* Tracking History */}
          {order.trackingHistory && order.trackingHistory.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                ট্র্যাকিং ইতিহাস
              </h3>
              <div className="space-y-2 border-l-2 border-[#6366F1]/30 ml-2 pl-4 py-1">
                {order.trackingHistory.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
                    <p className="text-xs font-bold text-slate-800">{step.title}</p>
                    <p className="text-[11px] text-slate-500">{step.description}</p>
                    <span className="text-[10px] text-slate-400">{step.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
