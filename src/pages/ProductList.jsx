import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function ProductList() {
  // -------------------------------
  // 🛒 State
  // -------------------------------
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 8;

  // -------------------------------
  // 📦 Fetch Products
  // -------------------------------
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // -------------------------------
  // 🧠 Apply Filters
  // -------------------------------
  useEffect(() => {
    let data = [...allProducts];

    if (search.trim()) {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      data = data.filter((item) => item.category === category);
    }

    if (inStockOnly) {
      data = data.filter((item) => item.inStock === true || item.stock > 0);
    }

    if (maxPrice !== 20000) {
      data = data.filter((item) => item.price <= maxPrice);
    }

    setFiltered(data);
    setCurrentPage(1);
  }, [search, category, inStockOnly, maxPrice, allProducts]);

  // -------------------------------
  // 📄 Pagination
  // -------------------------------
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const categories = [
    ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
  ];

  // -------------------------------
  // 🖼️ UI
  // -------------------------------
  return (
    <main className="flex flex-col sm:flex-row min-h-screen bg-[#f4f4f4] mt-8">
      {/* Sidebar Filters */}
      <aside className="sm:w-1/4 p-6 bg-white border-r shadow-lg lg:w-1/5">
        <h2 className="text-2xl font-semibold mb-6">Filters</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border p-2 rounded mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <select
          className="w-full border p-2 rounded mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        {/* In Stock */}
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          In Stock Only
        </label>

        {/* Max Price */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Max Price: ₦{maxPrice.toLocaleString()}
          </label>
          <input
            type="range"
            min="0"
            max="20000"
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            setSearch('');
            setCategory('');
            setInStockOnly(false);
            setMaxPrice(20000);
          }}
          className="mt-4 w-full bg-gray-800 text-white py-2 rounded"
        >
          Reset Filters
        </button>
      </aside>

      {/* Main Product Display */}
      <section className="sm:w-3/4 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Product Listing
        </h1>

        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">
            No products match your filters.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2 flex-wrap">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded text-sm ${
                  currentPage === idx + 1
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
