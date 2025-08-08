import { Routes, Route } from "react-router-dom";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetails";
import Home from '../pages/Home';
import Cart from "../pages/Carts";
import Login from "../pages/Login";
import Checkout from "../pages/Checkout";
import AdminDashboard from "../pages/Admin";
import AdminAddProduct from "../pages/AdminAddProduct";
import AdminEditProduct from "../pages/AdminEditProduct";
import PurchaseHistory from "../pages/PurchaseHistory";
import Receipt from "../pages/Reciept";
import ProtectedRoute from "../ProtectedRoute";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AdminRoute from "../components/AdminRoute";
import Admin from "../pages/Admin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/history" element={<PurchaseHistory />} />
       <Route path="/receipt" element={<Receipt />} />
       <Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
       <Route path="/purchase-history" element={
  <ProtectedRoute><PurchaseHistory /></ProtectedRoute>
} />
<Route path="/admin" element={
  <ProtectedRoute><AdminDashboard /></ProtectedRoute>
} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin/>
          </AdminRoute>
        }
      />
      <Route path="/admin/new" element={<AdminAddProduct />} />
      <Route path="/admin/edit/:id" element={<AdminEditProduct />} />
      
    </Routes>
  );
}
