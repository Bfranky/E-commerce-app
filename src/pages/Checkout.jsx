import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = () => {
    const handler = window.PaystackPop.setup({
      key: 'pk_test_4edbcd5293ab0ec86b3f698a14b84c3d37d4295c', // Replace with your Paystack public key
      email: 'customer@example.com',
      amount: total * 100, // in kobo
      currency: 'NGN',
      ref: '' + Math.floor(Math.random() * 1000000000 + 1),
      callback: function (response) {
        alert('Payment complete! Reference: ' + response.reference);
        clearCart();
        navigate('/');
      },
      onClose: function () {
        alert('Transaction was not completed.');
      },
    });

    handler.openIframe();
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
              <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-gray-500">
                  {item.quantity} × ₦{item.price.toLocaleString()} = ₦
                  {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          <div className="text-right mt-6 font-bold text-xl">
            Total: ₦{total.toLocaleString()}
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Pay Now with Paystack
          </button>
        </div>
      )}
    </div>
  );
}


// export default function Checkout() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4 text-green-800">Checkout</h2>
//         <p className="mb-6 text-gray-600">Confirm your details and proceed with payment.</p>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Email</label>
//           <input
//             type="email"
//             placeholder="you@example.com"
//             className="w-full p-2 border rounded-xl"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Full Name</label>
//           <input
//             type="text"
//             placeholder="John Doe"
//             className="w-full p-2 border rounded-xl"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block mb-1 font-medium">Phone Number</label>
//           <input
//             type="tel"
//             placeholder="08012345678"
//             className="w-full p-2 border rounded-xl"
//             required
//           />
//         </div>

//         <button className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-2 rounded-xl">
//           Pay with Paystack
//         </button>
//       </div>
//     </div>
//   );
// }
