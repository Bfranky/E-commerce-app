import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { add } = useCart();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5010/products/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProduct(data);
        setMainImage((data.images && data.images[0]) || data.image);
      } catch (e) {
        console.error('Failed to load product', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading product...</div>;
  if (!product) return <div className="p-8">Product not found.</div>;

  const inStock = product.inStock;
  const displayPrice = (product.price / 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <nav className="text-sm mb-4">
          <Link to="/products" className="text-gray-500 hover:underline">
            Products
          </Link>{' '}
          &gt; <span className="font-medium">{product.name}</span>
        </nav>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <div className="border rounded-md overflow-hidden mb-4">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
            {product.images && (
              <div className="flex gap-3">
                {product.images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(src)}
                    className={`border rounded p-1 ${
                      mainImage === src ? 'ring-2 ring-green-800' : ''
                    }`}
                  >
                    <img
                      src={src}
                      alt={`thumb-${idx}`}
                      className="w-24 h-16 object-cover rounded"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="text-3xl font-bold text-green-800 mb-2">
              ${displayPrice}
            </div>
            <div className="mb-4">
              {inStock ? (
                <div className="text-sm">
                  <span className="font-medium text-gray-700">In Stock</span>
                </div>
              ) : (
                <div className="text-sm text-red-600 font-medium">Out of Stock</div>
              )}
            </div>

            <button
              disabled={!inStock}
              onClick={() => add(product)}
              className={`w-full py-3 rounded text-white font-semibold ${
                inStock
                  ? 'bg-green-800 hover:bg-green-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>

        {product && (
          <RelatedProducts category={product.category} currentId={product.id} />
        )}
      </div>
    </div>
  );
}

function RelatedProducts({ category, currentId }) {
  const [related, setRelated] = useState([]);
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `http://localhost:5010/products?category=${encodeURIComponent(
            category
          )}&_limit=4`
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setRelated(data.filter(p => p.id !== currentId));
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [category, currentId]);

  if (related.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map(p => (
          <ProductCardFallback key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

function ProductCardFallback({ product }) {
  const displayPrice = (product.price / 100).toFixed(2);
  return (
    <div className="border rounded-md p-4 bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover rounded mb-2"
        loading="lazy"
      />
      <div className="font-medium">{product.name}</div>
      <div className="text-green-700 font-bold">${displayPrice}</div>
    </div>
  );
}
