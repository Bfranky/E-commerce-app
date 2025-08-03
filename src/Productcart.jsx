// src/Productcart.jsx

import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

export default function ProductCard({ product }) {
  if (!product) {
    return null; 
  }

  const { add } = useCart();
  const isOut = !product.inStock;
  const displayPrice = (product.price / 100).toFixed(2);

  return (
    <div className="border rounded-md p-4 relative bg-white flex flex-col">
      <div className="mb-2">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded"
            loading="lazy"
          />
        </Link>
      </div>
      <div className="flex-1">
        <Link to={`/products/${product.id}`} className="font-medium text-lg block hover:underline">
          {product.name}
        </Link>
        <div className="mt-2">
          <span className="font-bold text-green-700">${displayPrice}</span>
        </div>
      </div>
      <div className="mt-4">
        <button
          disabled={isOut}
          onClick={() => add(product)}
          className={`w-full py-2 rounded text-white font-semibold ${
            isOut ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-800 hover:bg-green-700'
          }`}
        >
          {isOut ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}


