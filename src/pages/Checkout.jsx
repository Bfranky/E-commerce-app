import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('userData'));
    if (saved) setUserData(saved);
  }, []);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    const { name, email, phone, address } = userData;
    if (!name || !email || !phone || !address) {
      alert('Please fill in all details before payment.');
      return;
    }

    localStorage.setItem('userData', JSON.stringify(userData));

    const handler = window.PaystackPop.setup({
      key: 'pk_test_4edbcd5293ab0ec86b3f698a14b84c3d37d4295c',
      email,
      amount: total * 100,
      currency: 'NGN',
      ref: '' + Math.floor(Math.random() * 1000000000 + 1),
      callback: function (response) {
        alert('Payment complete! Reference: ' + response.reference);
        const receipt = {
          reference: response.reference,
          name,
          email,
          phone,
          address,
          items: cartItems,
          total
        };
        clearCart();
        navigate("/receipt", { state: { receipt } });
      },
      onClose: function () {
        alert('Transaction was not completed.');
      },
    });

    handler.openIframe();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Checkout</h2>
        <p className="mb-6 text-gray-600">Confirm your details and proceed with payment.</p>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full p-2 border rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-2 border rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              placeholder="08012345678"
              className="w-full p-2 border rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Delivery Address</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              placeholder="123 Example Street"
              className="w-full p-2 border rounded-xl"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
              <span>{item.title} × {item.quantity}</span>
              <span>₦{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="font-bold text-right mt-2">Total: ₦{total.toLocaleString()}</div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-2 rounded-xl"
        >
          Pay with Paystack
        </button>
      </div>
    </div>
  );
}
