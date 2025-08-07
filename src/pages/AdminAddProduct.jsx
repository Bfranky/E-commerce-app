import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    thumbnail: '',
    price: '',
    category: '',
    stock: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) }),
    });
    navigate('/admin');
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'description', 'thumbnail', 'price', 'category', 'stock'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
