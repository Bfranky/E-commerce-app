// src/PaymentPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

export default function PaymentPage() {
  const { cart, clear } = useCart();
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity) / 100, 0);

  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.cardNumber || form.cardNumber.replace(/\s+/g, '').length < 16) errs.cardNumber = 'Valid card number required';
    if (!form.expiry) errs.expiry = 'Expiry required';
    if (!form.cvv || form.cvv.length < 3) errs.cvv = 'CVV required';
    if (!form.email || !form.email.includes('@')) errs.email = 'Valid email required';
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setProcessing(true);

    // Simulate payment delay
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      clear(); // empty cart on success
      // Optionally redirect after short delay
      setTimeout(() => navigate('/products'), 1500);
    }, 1500);
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button onClick={() => navigate('/products')} className="mt-2 px-4 py-2 bg-green-800 text-white rounded">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>

      {success ? (
        <div className="bg-green-100 border border-green-300 p-6 rounded">
          <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
          <p>Thank you for your purchase. You will receive an email confirmation shortly.</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 px-4 py-2 bg-green-800 text-white rounded"
          >
            Back to Shopping
          </button>
        </div>
      ) : (
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
              <div>${subtotal.toFixed(2)}</div>
            </div>
          </div>

          {/* Payment form */}
          <form onSubmit={handleSubmit} className="border rounded-lg p-6 bg-white space-y-4">
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="John Doe"
              />
              {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="you@example.com"
              />
              {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
            </div>

            <div>
              <label className="block font-medium">Card Number</label>
              <input
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {errors.cardNumber && <div className="text-red-600 text-sm">{errors.cardNumber}</div>}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium">Expiry</label>
                <input
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="MM/YY"
                />
                {errors.expiry && <div className="text-red-600 text-sm">{errors.expiry}</div>}
              </div>
              <div className="flex-1">
                <label className="block font-medium">CVV</label>
                <input
                  name="cvv"
                  value={form.cvv}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="123"
                  maxLength={4}
                />
                {errors.cvv && <div className="text-red-600 text-sm">{errors.cvv}</div>}
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 bg-green-800 text-white font-semibold rounded"
            >
              {processing ? 'Processing...' : `Pay $${subtotal.toFixed(2)}`}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
