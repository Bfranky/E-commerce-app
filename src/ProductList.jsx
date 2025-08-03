// src/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { fetchProducts } from './utils/api'; // adjust if your api.js is elsewhere
import ProductCard from './Productcart';



function FilterSidebar({ filters, setFilters, onApply, onClear, categories }) {
  const update = partial => setFilters(prev => ({ ...prev, ...partial }));

  return (
    <div className="border rounded p-4 bg-white space-y-6 w-full max-w-xs">
      <div>
        <h4 className="font-semibold mb-1">Category</h4>
        <select
          value={filters.category}
          onChange={e => update({ category: e.target.value })}
          className="w-full border px-2 py-1 rounded"
        >
          <option>All</option>
          {categories.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <h4 className="font-semibold mb-1">Price Range</h4>
        <div className="flex items-center gap-2 text-sm mb-1">
          <div>${(filters.minPrice / 100).toFixed(0)}</div>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="50000"
              step="500"
              value={filters.maxPrice}
              onChange={e => update({ maxPrice: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>${(filters.maxPrice / 100).toFixed(0)}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="inStock"
          checked={filters.inStock}
          onChange={e => update({ inStock: e.target.checked })}
        />
        <label htmlFor="inStock">Only In Stock</label>
      </div>

      <div className="flex gap-2">
        <button onClick={onClear} className="flex-1 border px-3 py-2 rounded">
          Clear
        </button>
        <button onClick={onApply} className="flex-1 bg-green-800 text-white px-3 py-2 rounded">
          Apply
        </button>
      </div>
    </div>
  );
}

// Simple Pagination component
function Pagination({ current, totalPages, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex items-center gap-2 justify-center mt-8 flex-wrap">
      <button
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
        className="px-3 py-1 border rounded"
      >
        &lt; Previous
      </button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 border rounded ${p === current ? 'bg-gray-100 font-bold' : ''}`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={current === totalPages}
        onClick={() => onPageChange(current + 1)}
        className="px-3 py-1 border rounded"
      >
        Next &gt;
      </button>
    </div>
  );
}

const CATEGORIES = ['Electronics', 'Fashion', 'Accessories'];

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get('page') || 1);
  const categoryParam = searchParams.get('category') || 'All';
  const inStockParam = searchParams.get('inStock') === 'true';
  const searchParam = searchParams.get('search') || '';
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');

  const [filters, setFilters] = useState({
    category: categoryParam,
    inStock: inStockParam,
    search: searchParam,
    minPrice: minPriceParam ? Number(minPriceParam) : 0,
    maxPrice: maxPriceParam ? Number(maxPriceParam) : 50000,
  });

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Sync local filters when URL changes (e.g., back/forward)
  useEffect(() => {
    setFilters({
      category: categoryParam,
      inStock: inStockParam,
      search: searchParam,
      minPrice: minPriceParam ? Number(minPriceParam) : 0,
      maxPrice: maxPriceParam ? Number(maxPriceParam) : 50000,
    });
  }, [categoryParam, inStockParam, searchParam, minPriceParam, maxPriceParam]);

  // Fetch products when dependencies change
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data, total } = await fetchProducts({
          page,
          limit: 8,
          category: filters.category === 'All' ? undefined : filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          inStock: filters.inStock,
          search: filters.search,
        });
        setProducts(data);
        setTotalCount(total);
      } catch (e) {
        console.error('Failed to load products', e);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [page, filters]);

  const totalPages = Math.ceil(totalCount / 8) || 1;

  const applyFilters = () => {
    const sp = new URLSearchParams();
    if (filters.category && filters.category !== 'All') sp.set('category', filters.category);
    if (filters.inStock) sp.set('inStock', 'true');
    if (filters.search) sp.set('search', filters.search);
    sp.set('minPrice', filters.minPrice);
    sp.set('maxPrice', filters.maxPrice);
    sp.set('page', '1');
    setSearchParams(sp);
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      inStock: false,
      search: '',
      minPrice: 0,
      maxPrice: 50000,
    });
    setSearchParams({ page: '1' });
  };

  const handlePageChange = newPage => {
    const sp = new URLSearchParams(searchParams);
    sp.set('page', newPage);
    navigate(`/products?${sp.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onApply={applyFilters}
              onClear={clearFilters}
              categories={CATEGORIES}
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Product List</h1>
              <div>
                {/* simple search inline */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={filters.search}
                  onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                  className="border rounded px-3 py-2"
                  onKeyDown={e => {
                    if (e.key === 'Enter') applyFilters();
                  }}
                />
                <button
                  onClick={applyFilters}
                  className="ml-2 bg-green-800 text-white px-4 py-2 rounded"
                >
                  Go
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20">Loading...</div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="text-center py-10">No products found.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
                <Pagination
                  current={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import ProductCart from "./Productcart";
// import Filters from "./Filter";

// function ProductList({ addToCart }) {
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState({
//     category: "",
//     price: "",
//     available: false,
//   });

//   // Fetch products
//   useEffect(() => {
//     fetch("http://localhost:5010/products")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         setFiltered(data);
//       });
//   }, []);

//   // Handle filtering
//   useEffect(() => {
//     let result = [...products];

//     if (filters.category) {
//       result = result.filter((p) =>
//         p.category?.toLowerCase().includes(filters.category.toLowerCase())
//       );
//     }

//     if (filters.price) {
//       result = result.filter((p) => p.price <= Number(filters.price));
//     }

//     if (filters.available) {
//       result = result.filter((p) => p.available === true);
//     }

//     if (search) {
//       result = result.filter((p) =>
//         p.name?.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     setFiltered(result);
//   }, [filters, search, products]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition duration-300">
//       <div className="w-full md:w-1/4 space-y-6">
//         <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
//           <label className="block font-semibold mb-2">Search</label>
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="w-full p-2 border rounded"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <Filters filters={filters} handleChange={handleChange} />
//       </div>

//       <div className="w-full md:w-3/4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((product) => (
//             <ProductCart key={product.id} product={product} addToCart={addToCart} />
//           ))}
//         </div>
//         <div className="flex justify-center items-center space-x-4 mt-6">
//           <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Previous</button>
//           <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">1</button>
//           <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">2</button>
//           <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductList;


