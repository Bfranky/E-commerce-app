import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import { Star } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);

        // Fetch related products based on same category (excluding current)
        fetch(`http://localhost:5000/products?category=${data.category}`)
          .then((res) => res.json())
          .then((rel) => {
            const filtered = rel.filter((item) => item.id !== data.id);
            setRelated(filtered.slice(0, 4)); // Limit to 4
          });
      })
      .catch((err) => {
        console.error('Error loading product:', err);
      });
  }, [id]);

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  const {
    title,
    price,
    description,
    image,
    images = [],
    stock,
    rating = 0,
    reviewCount = 0,
    category,
  } = product;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 py-10">
      {/* Product Info */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Main Image */}
        <div>
          <img
            src={image}
            alt={title}
            className="w-full h-[400px] object-cover rounded-lg cursor-pointer"
            onClick={() => setShowModal(true)}
          />
          {/* Thumbnail images */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i}`}
                  className="h-20 w-full object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

          {/* Rating */}
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={i < Math.round(rating) ? 'currentColor' : 'none'}
                stroke="currentColor"
                className="text-yellow-500"
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="text-2xl text-green-700 font-bold mb-4">
            ₦{price.toLocaleString()}
          </p>

          {/* Stock + Category */}
          <p className="text-sm text-gray-500 mb-1">Category: {category}</p>
          <p
            className={`mb-4 text-sm font-semibold ${
              stock > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-6">{description}</p>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            disabled={stock === 0}
            className={`w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition ${
              stock === 0 && 'opacity-50 cursor-not-allowed'
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">You Might Also Like</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {related.length > 0 ? (
            related.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-md transition p-4"
              >
                <img
                  src={
                    item.images?.[0] ||
                    item.image ||
                    item.thumbnail ||
                    '/placeholder.png'
                  }
                  alt={`Image of ${item.title}`}
                  className="h-40 w-full object-cover rounded mb-2"
                />
                <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                <p className="text-green-600 font-semibold">
                  ₦{item.price.toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <img
            src={image}
            alt="Zoomed Product"
            className="max-h-[90%] max-w-[90%] object-contain rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
