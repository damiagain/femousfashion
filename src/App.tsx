import React, { useEffect, Component } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminReviews } from './pages/admin/AdminReviews';
// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
// Layout for storefront
function StoreLayout({ children }: {children: React.ReactNode;}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <WhatsAppButton />
    </div>);

}
export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-center" />
      <Routes>
        {/* Storefront Routes */}
        <Route
          path="/"
          element={
          <StoreLayout>
              <HomePage />
            </StoreLayout>
          } />
        
        <Route
          path="/shop"
          element={
          <StoreLayout>
              <ShopPage />
            </StoreLayout>
          } />
        
        <Route
          path="/shop/:categorySlug"
          element={
          <StoreLayout>
              <ShopPage />
            </StoreLayout>
          } />
        
        <Route
          path="/product/:id"
          element={
          <StoreLayout>
              <ProductPage />
            </StoreLayout>
          } />
        
        <Route
          path="/cart"
          element={
          <StoreLayout>
              <CartPage />
            </StoreLayout>
          } />
        

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}