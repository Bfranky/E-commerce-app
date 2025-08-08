import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, checkout, purchaseHistory } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Load saved user data from localStorage
  const savedUser = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="min-h-screen p-4 bg-gray-50 mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

      {/* User Info Summary */}
      {savedUser.fullName && (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h3 className="text-lg font-semibold mb-2">Customer Info</h3>
          <p><strong>Name:</strong> {savedUser.fullName}</p>
          <p><strong>Email:</strong> {savedUser.email}</p>
          <p><strong>Phone:</strong> {savedUser.phone}</p>
          <p><strong>Address:</strong> {savedUser.address}</p>
        </div>
      )}

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow flex items-center gap-4"
            >
              <img
                src={
                  item.thumbnail ||
                  item.image ||
                  (item.images && item.images[0])
                }
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-gray-500">
                  ₦{item.price.toLocaleString()} x {item.quantity}
                </p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="border p-1 mt-1 w-20"
                />
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6 font-bold text-xl">
            Total: ₦{total.toLocaleString()}
          </div>
        </div>
      )}

      {/* Purchase History Preview */}
      {purchaseHistory.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Recent Purchases</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {purchaseHistory.map((item, index) => (
              <div key={index} className="bg-white p-2 rounded shadow text-center">
                <img
                  src={item.image || item.thumbnail || item.images?.[0]}
                  alt={item.title}
                  className="h-20 w-full object-cover rounded"
                />
                <p className="text-sm mt-2">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checkout Link */}
      {cartItems.length > 0 && (
        <Link
          to="/checkout"
          className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
}
