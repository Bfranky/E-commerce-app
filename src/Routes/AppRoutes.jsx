import { Routes, Route } from "react-router-dom";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetails";
import Cart from "../pages/Carts";
import Login from "../pages/Login";
import Checkout from "../pages/Checkout";
import AdminPanel from "../pages/Admin";
import AdminAddProduct from "../pages/AdminAddProduct";
import AdminEditProduct from "../pages/AdminEditProduct";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/new" element={<AdminAddProduct />} />
      <Route path="/admin/edit/:id" element={<AdminEditProduct />} />
    </Routes>
  );
}
