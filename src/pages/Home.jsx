// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('All Categories');
  const [sortOption, setSortOption] = useState('default');
  const [priceRange, setPriceRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      });
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (category !== 'All Categories') {
      updated = updated.filter(item => item.category === category);
    }

    if (priceRange === '0-50') {
      updated = updated.filter(item => item.price <= 50);
    } else if (priceRange === '50-100') {
      updated = updated.filter(item => item.price > 50 && item.price <= 100);
    } else if (priceRange === '100+') {
      updated = updated.filter(item => item.price > 100);
    }

    if (sortOption === 'asc') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'desc') {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
    setCurrentPage(1);
  }, [category, sortOption, priceRange, products]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="src/assets/black-friday-concept-with-space-middle.jpg"
          alt="Hero Banner"
          className="w-full h-full object-cover filter brightness-34"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Discover Local Threads</h1>
          <p className="text-lg mb-4 max-w-xl">
            Explore unique fashion curated from independent designers in your community. Find your next favorite piece today.
          </p>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 max-w-7xl mx-auto">
        {/* Header row */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
    <h2 className="text-2xl font-bold mb-4 md:mb-0">Our Latest Collection</h2>

    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
      {/* Category Dropdown */}
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="p-2 border rounded-lg w-full sm:w-auto"
      >
        <option>All Categories</option>
        <option>Electronics</option>
        <option>Office</option>
        <option>Fitness</option>
      </select>

      {/* Price Range Dropdown */}
      <select
        value={priceRange}
        onChange={e => setPriceRange(e.target.value)}
        className="p-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Prices</option>
        <option value="0-50">₦0 - ₦50</option>
        <option value="50-100">₦50 - ₦100</option>
        <option value="100+">₦100+</option>
      </select>

      {/* Sort Dropdown */}
      <select
        value={sortOption}
        onChange={e => setSortOption(e.target.value)}
        className="p-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="default">Sort Products</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
        </div>

        {/* Products */}
        <div className="grid md:grid-cols-3 gap-6">
          {paginatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
