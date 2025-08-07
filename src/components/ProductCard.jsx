import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import { Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { id, title, price, image, rating = 0, reviewCount = 0 } = product;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col">
      <Link to={`/product/${id}`} className="flex-1">
        <img
          src={image}
          alt={title}
          className="h-52 w-full object-cover rounded-t-xl"
        />
        <div className="p-4">
          <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center text-yellow-500 text-sm mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.round(rating) ? 'currentColor' : 'none'}
                stroke="currentColor"
              />
            ))}
            <span className="ml-1 text-gray-600">({reviewCount})</span>
          </div>

          {/* Price */}
          <p className="text-green-700 font-bold text-lg">
            ₦{price.toLocaleString()}
          </p>
        </div>
      </Link>

      <button
        onClick={() => addToCart(product)}
        className="bg-green-700 text-white py-2 rounded-b-xl hover:bg-green-800 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
