// src/pages/PurchaseHistory.jsx
import { useCart } from '../CartContext';

export default function PurchaseHistory() {
  const { purchaseHistory } = useCart();

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Purchase History</h2>

      {purchaseHistory.length === 0 ? (
        <p>You haven't purchased any items yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {purchaseHistory.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={
                  item.thumbnail || item.image || (item.image && item.image [0])
                }
                alt={item.title}
                className="w-32 h-32 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-green-600 font-semibold">₦{item.price}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
