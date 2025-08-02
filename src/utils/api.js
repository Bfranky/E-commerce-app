// src/utils/api.js
const BASE = 'http://localhost:5010';

export async function fetchProducts({
  page = 1,
  limit = 8,
  category,
  minPrice,
  maxPrice,
  inStock,
  search,
}) {
  const params = new URLSearchParams();
  params.set('_page', page);
  params.set('_limit', limit);
  if (category && category !== 'All') params.set('category', category);
  if (minPrice != null) params.set('price_gte', minPrice);
  if (maxPrice != null) params.set('price_lte', maxPrice);
  if (inStock) params.set('inStock', true);
  if (search) params.set('q', search);

  const res = await fetch(`${BASE}/products?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  const data = await res.json();
  const totalCount = res.headers.get('X-Total-Count');
  return {
    data,
    total: totalCount ? Number(totalCount) : data.length,
  };
}
