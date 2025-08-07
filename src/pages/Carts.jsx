import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

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
                  ₦{item.price} x {item.quantity}
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
            Total: ₦{total.toFixed(2)}
          </div>
        </div>
      )}

      <Link
        to="/checkout"
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
