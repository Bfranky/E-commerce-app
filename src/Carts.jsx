
import { useCart } from './CartContext';

export default function CartPage() {
  const { cart, remove, add, clear } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity) / 100, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-6">
          {cart.length === 0 && <div>Your cart is empty.</div>}
          {cart.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-6 border rounded-lg p-4 bg-white"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-24 object-cover rounded"
                loading="lazy"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg">{item.name}</div>
                <div className="text-gray-600">${(item.price / 100).toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => add({ ...item, quantity: 1 })}
                  aria-label="increase"
                  className="border rounded px-3 py-1"
                >
                  +
                </button>
                <div className="px-2">{item.quantity}</div>
                <button
                  onClick={() => remove(item.id)}
                  aria-label="decrease or remove"
                  className="border rounded px-3 py-1"
                >
                  -
                </button>
              </div>
              <div>
                <button
                  onClick={() => clear()}
                  className="text-red-600 ml-4"
                  aria-label="remove all"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3">
          <div className="border rounded-lg p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <div>Subtotal:</div>
              <div>${subtotal.toFixed(2)}</div>
            </div>
            <div className="flex justify-between mb-4">
              <div>Shipping:</div>
              <div className="text-green-700 font-medium">Free</div>
            </div>
            <div className="border-t pt-4 flex justify-between items-center mb-6">
              <div className="text-lg font-bold">Total:</div>
              <div className="text-2xl font-bold text-green-800">
                ${subtotal.toFixed(2)}
              </div>
            </div>
            <button className="w-full py-3 bg-green-800 text-white font-semibold rounded mb-2">
              Proceed to Checkout
            </button>
            <button className="w-full py-2 text-center text-sm text-green-800 underline">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}