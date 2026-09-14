import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, Product } from '../../types';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopHeader } from './AdminTopHeader';
import { AdminOverview } from './AdminOverview';
import { AdminOrders } from './AdminOrders';
import { AdminProducts } from './AdminProducts';
import { AdminInventory } from './AdminInventory';
import { AdminCustomers } from './AdminCustomers';
import { AdminCoupons } from './AdminCoupons';
import { AdminCategories } from './AdminCategories';
import { AdminReviews } from './AdminReviews';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminSettings } from './AdminSettings';
import { OrderDetailsModal } from './OrderDetailsModal';
import { ProductModal } from './ProductModal';

export const AdminDashboard: React.FC = () => {
  const { adminSubTab, updateStock } = useStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Quick Restock handler
  const handleRestockProduct = (product: Product) => {
    const current = product.stockCount ?? 10;
    updateStock(product.id, current + 20, true);
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans flex">
      {/* 1. Left Fixed Sidebar */}
      <AdminSidebar 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Sticky Header */}
        <AdminTopHeader
          onOpenMobileMenu={() => setIsMobileOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Dynamic Page Content */}
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex-1">
          {adminSubTab === 'dashboard' && (
            <AdminOverview
              onSelectOrder={(order) => setSelectedOrder(order)}
              onRestockProduct={handleRestockProduct}
            />
          )}

          {adminSubTab === 'orders' && (
            <AdminOrders
              onSelectOrder={(order) => setSelectedOrder(order)}
            />
          )}

          {adminSubTab === 'products' && (
            <AdminProducts
              onAddProduct={handleOpenAddProduct}
              onEditProduct={handleOpenEditProduct}
            />
          )}

          {adminSubTab === 'inventory' && (
            <AdminInventory />
          )}

          {adminSubTab === 'customers' && (
            <AdminCustomers />
          )}

          {adminSubTab === 'categories' && (
            <AdminCategories />
          )}

          {adminSubTab === 'coupons' && (
            <AdminCoupons />
          )}

          {adminSubTab === 'reviews' && (
            <AdminReviews />
          )}

          {adminSubTab === 'analytics' && (
            <AdminAnalytics />
          )}

          {adminSubTab === 'settings' && (
            <AdminSettings />
          )}
        </main>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Product Add / Edit Modal */}
      <ProductModal
        product={editingProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />
    </div>
  );
};
