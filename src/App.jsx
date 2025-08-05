import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./CartContext";
import Header from "./Navbar";
import PaymentPage from "./PaymentPage";
import ProductDetailPage from "./Productdetails";
import PaymentSuccess from './SuccessPage';

const ProductListPage = lazy(() => import("./ProductList"));
const CartPage = lazy(() => import("./Carts"));

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div className="p-8">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<PaymentPage />} />{" "}
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
