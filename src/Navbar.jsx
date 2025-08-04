import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';

export default function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get('search') || '';

  const [q, setQ] = React.useState(search);
  const handleSubmit = e => {
    e.preventDefault();
    const sp = new URLSearchParams(location.search);
    sp.set('search', q);
    navigate(`/products?${sp.toString()}`);
  };

  return (
    <div className="bg-green-800 text-white px-6 py-4 flex items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="font-bold text-xl cursor-pointer" onClick={() => navigate('/products')}>
           <img
            src=" src/assets/logo.png"            
            alt="Store Logo"
            className="h-10 w-auto object-contain" 
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="relative max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={q}
            onChange={e => setQ(e.target.value)}
            className="w-full rounded px-4 py-2 text-black "
          />
          <button type="submit" className="absolute right-1 top-1 bg-white text-green-800 px-3 py-1 rounded">
            Search
          </button>
        </form>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative">
          <div>Cart</div>
          {totalItems > 0 && (
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full text-xs px-2">
              {totalItems}
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}
