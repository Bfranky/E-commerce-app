// src/pages/ReceiptPage.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

export default function Receipt() {
  const { cartItems, clearCart, savePurchase } = useCart();

  useEffect(() => {
    if (cartItems.length > 0) {
      savePurchase(cartItems);    // Save to purchase history
      clearCart();                // Clear cart after saving
    }
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Your Receipt</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items to show. Your cart is empty or already processed.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow p-4 flex flex-col items-center bg-gray-50"
            >
              <img
                src={item.thumbnail || item.image || (item.image && item.image[0])}
                alt={item.title}
                className="w-28 h-28 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              <p className="text-green-700 font-semibold mt-1">₦{item.price}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link
          to="/products"
          className="inline-block px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
