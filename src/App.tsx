import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBadges } from './components/TrustBadges';
import { ProductCatalog } from './components/ProductCatalog';
import { FeaturedMustardOil } from './components/FeaturedMustardOil';
import { ProductVideoSection } from './components/ProductVideoSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { StoryAndTrust } from './components/StoryAndTrust';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { LoginModal } from './components/LoginModal';
import { OrderTrackingView } from './components/OrderTrackingView';
import { CustomerDashboard } from './components/CustomerDashboard';
import { ShippingHub } from './components/ShippingHub';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';

const MainContent: React.FC = () => {
  const { activeTab } = useStore();

  return (
    <div className="min-h-screen flex flex-col pb-20 lg:pb-0">
      <Header />

      <main className="flex-1">
        {activeTab === 'shop' && (
          <>
            <Hero />
            <TrustBadges />
            <ProductCatalog />
            <FeaturedMustardOil />
            <ProductVideoSection />
            <CustomerReviewsSection />
            <StoryAndTrust />
          </>
        )}

        {activeTab === 'tracking' && <OrderTrackingView />}

        {activeTab === 'dashboard' && <CustomerDashboard />}

        {activeTab === 'shipping_hub' && <ShippingHub />}

        {activeTab === 'story' && (
          <div className="pt-6">
            <StoryAndTrust />
            <CustomerReviewsSection />
            <ProductVideoSection />
            <FeaturedMustardOil />
          </div>
        )}
      </main>

      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <ProductModal />
      <CheckoutModal />
      <PaymentGatewayModal />
      <OrderSuccessModal />
      <LoginModal />

      {/* Mobile Sticky Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
