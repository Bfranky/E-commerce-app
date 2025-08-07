import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  const [products, setProducts] = useState([]);

  // Fetch all products
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  // Delete product
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    });
    setProducts(products.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Panel</h2>
        <Link
          to="/admin/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col"
          >
            <img src={product.thumbnail} alt={product.title} className="h-40 object-cover mb-4 rounded" />
            <h3 className="font-bold text-lg">{product.title}</h3>
            <p className="text-sm text-gray-500 truncate">{product.description}</p>
            <p className="font-semibold mt-2">₦{product.price.toLocaleString()}</p>
            <div className="mt-4 flex justify-between">
              <Link
                to={`/admin/edit/${product.id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
