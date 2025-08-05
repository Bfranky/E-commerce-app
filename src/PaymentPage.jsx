import React, { useState, useMemo } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const { cart, clear } = useCart();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + (item.price * item.quantity) / 100, 0),
    [cart]
  );

  const handleCheckout = async e => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (cart.length === 0) {
      setError('Cart is empty');
      return;
    }

    setProcessing(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4242/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price, // assuming this is already in kobo/lowest unit
            quantity: item.quantity,
          })),
        }),
      });

     
  // First, check if the response is OK
  if (!res.ok) {
    const errorText = await res.text(); // get raw body
    console.error('Server returned non-OK:', errorText);
    throw new Error(`Server error ${res.status}: ${errorText}`);
  }

  const data = await res.json();

  if (data.authorization_url) {
    window.location.href = data.authorization_url;
  } else {
    console.error('No authorization_url in response:', data);
    setError('Failed to initialize payment.');
  }
} catch (err) {
  console.error('Checkout error:', err);
  setError('Something went wrong. Please try again.');
}
  };

  // Optionally display a message if redirected back with reference in query string
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Order summary */}
        <div className="border rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between mb-2">
              <div>
                {item.name} x {item.quantity}
              </div>
              <div>${((item.price * item.quantity) / 100).toFixed(2)}</div>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between font-bold mt-4">
            <div>Total:</div>
            <div>${total.toFixed(2)}</div>
          </div>
        </div>

        {/* Payment form */}
        <form onSubmit={handleCheckout} className="border rounded-lg p-6 bg-white space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <button
            type="submit"
            disabled={processing}
            className="w-full py-3 bg-green-800 text-white font-semibold rounded"
          >
            {processing ? 'Processing...' : `Pay ₦${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}
