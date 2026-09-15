import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Package, 
  Calendar,
  ChevronDown,
  AlertTriangle,
  CreditCard,
  Check,
  X
} from 'lucide-react';
import { Order, OrderStatus, PaymentMethod } from '../../types';
import { useStore } from '../../context/StoreContext';

interface AdminOrdersProps {
  onSelectOrder: (order: Order) => void;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({ onSelectOrder }) => {
  const { orders, updateOrderStatus, updateOrderPaymentMethod, updatePaymentStatus, deleteOrder } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentMethod === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Delivered</span>;
      case 'processing':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">Processing</span>;
      case 'confirmed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#6366F1] border border-[#C7D2FE]">Confirmed</span>;
      case 'shipped':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">Shipped</span>;
      case 'out_for_delivery':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">Out for Delivery</span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">Cancelled</span>;
      case 'pending':
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">Pending</span>;
    }
  };

  const getPaymentMethodBadge = (method: PaymentMethod) => {
    switch (method) {
      case 'bkash':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-pink-50 text-[#E2136E] border border-pink-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2136E]" />
            bKash
          </span>
        );
      case 'nagad':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-orange-50 text-[#F7941D] border border-orange-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F7941D]" />
            Nagad
          </span>
        );
      case 'card':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
            <CreditCard className="w-3 h-3 text-blue-600" />
            Card
          </span>
        );
      case 'cod':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Cash on Delivery
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Orders Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time synchronized order tracking and status controls ({orders.length} total orders)
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['all', 'confirmed', 'processing', 'shipped', 'delivered', 'pending', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#6366F1] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {st === 'all' ? 'All Orders' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Search and stats bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID, name, phone..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#6366F1] outline-hidden"
          />
        </div>

        {/* Payment Method Quick Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Payment:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'cod', label: 'COD' },
            { id: 'bkash', label: 'bKash' },
            { id: 'nagad', label: 'Nagad' },
            { id: 'card', label: 'Card' },
          ].map((pm) => (
            <button
              key={pm.id}
              onClick={() => setPaymentFilter(pm.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                paymentFilter === pm.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {pm.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-900">{filteredOrders.length}</strong> of {orders.length} orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Quick Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredOrders.map((order, idx) => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-400">{idx + 1}</td>
                  <td className="py-3.5 px-4 font-bold text-[#6366F1]">
                    <button 
                      onClick={() => onSelectOrder(order)}
                      className="hover:underline cursor-pointer"
                    >
                      {order.id}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{order.customerName}</p>
                    <p className="text-[11px] text-slate-400">{order.customerPhone}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-xs">{order.customerAddress}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="font-bold">{order.items.length}</span> items
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[150px]">
                      {order.items.map((it) => it.product.name).join(', ')}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    ৳ {order.total.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        {getPaymentMethodBadge(order.paymentMethod)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const newStatus = order.paymentStatus === 'paid' ? 'pending_cod' : 'paid';
                            updatePaymentStatus(order.id, newStatus);
                            setToastMessage(`Order #${order.id} payment updated to ${newStatus === 'paid' ? 'Paid' : 'Pending COD'}`);
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          title="Click to toggle payment status"
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                            order.paymentStatus === 'paid'
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                          }`}
                        >
                          {order.paymentStatus === 'paid' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Paid</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>Pending (COD)</span>
                            </>
                          )}
                        </button>

                        {/* Quick Payment Method Selector */}
                        <select
                          value={order.paymentMethod}
                          onChange={(e) => {
                            const newMethod = e.target.value as PaymentMethod;
                            updateOrderPaymentMethod(order.id, newMethod);
                            setToastMessage(`Order #${order.id} payment method set to ${newMethod.toUpperCase()}`);
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-1 py-0.5 rounded cursor-pointer outline-hidden transition-colors"
                          title="Switch payment method"
                        >
                          <option value="cod">COD</option>
                          <option value="bkash">bKash</option>
                          <option value="nagad">Nagad</option>
                          <option value="card">Card</option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(order.orderStatus)}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="px-2 py-1 text-[11px] bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-semibold focus:border-[#6366F1] outline-hidden cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onSelectOrder(order)}
                        className="p-1.5 text-slate-400 hover:text-[#6366F1] hover:bg-[#EEF2FF] rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setOrderToDelete(order)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Order"
                        id={`delete-order-btn-${order.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* In-App Delete Order Confirmation Modal */}
      {orderToDelete && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          id="delete-order-confirm-modal"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-scaleUp">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  অর্ডার ডিলিট নিশ্চিতকরণ
                </h3>
                <p className="text-xs text-slate-500">
                  Delete Order #{orderToDelete.id}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
              <p className="font-bold text-slate-900">গ্রাহক: {orderToDelete.customerName}</p>
              <p className="text-slate-500">ফোন: {orderToDelete.customerPhone}</p>
              <p className="font-semibold text-[#6366F1]">মোট মূল্য: ৳ {orderToDelete.total}</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              আপনি কি নিশ্চিতভাবে এই অর্ডারটি ডাটাবেজ থেকে মুছে ফেলতে চান?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOrderToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = orderToDelete.id;
                  deleteOrder(id);
                  setOrderToDelete(null);
                  setToastMessage(`অর্ডার #${id} সফলভাবে ডিলিট করা হয়েছে!`);
                  setTimeout(() => setToastMessage(null), 3500);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>হ্যাঁ, ডিলিট করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order toast */}
      {toastMessage && (
        <div 
          className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white text-xs font-semibold rounded-2xl shadow-xl border border-slate-800 animate-fadeIn"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
