// src/utils/api.js
export async function fetchProducts() {
  const res = await fetch('http://localhost:5000/products'); // your db.json endpoint
  return res.json();
}