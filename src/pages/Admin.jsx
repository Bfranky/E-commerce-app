// pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiLogOut,
  FiPlus,
  FiTrash2,
  FiEdit,
} from "react-icons/fi";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("products");
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        setNewProduct({ title: "", price: "", image: "" });
      });
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" }).then(() =>
      setProducts(products.filter((p) => p.id !== id))
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col justify-between">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
          <nav className="space-y-4">
            <button
              className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left hover:bg-green-800 transition ${
                view === "products" && "bg-green-900"
              }`}
              onClick={() => setView("products")}
            >
              <FiBox /> Products
            </button>
            <button
              className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left hover:bg-green-800 transition ${
                view === "orders" && "bg-green-900"
              }`}
              onClick={() => setView("orders")}
            >
              <FiShoppingBag /> Orders
            </button>
            <button
              className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left hover:bg-green-800 transition ${
                view === "users" && "bg-green-900"
              }`}
              onClick={() => setView("users")}
            >
              <FiUsers /> Users
            </button>
          </nav>
        </div>
        <div className="p-6 border-t border-green-600">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-300 hover:text-red-500 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {view === "products" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

            {/* Add Product Form */}
            <form
              onSubmit={handleAddProduct}
              className="bg-white p-6 rounded-lg shadow-md flex flex-wrap gap-4 mb-8"
            >
              <input
                type="text"
                placeholder="Product Title"
                className="border px-3 py-2 rounded-md flex-1 min-w-[150px]"
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="border px-3 py-2 rounded-md w-32"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                className="border px-3 py-2 rounded-md flex-1 min-w-[200px]"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <FiPlus /> Add Product
              </button>
            </form>

            {/* Product List */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Image</th>
                    <th className="p-3 text-left border">Title</th>
                    <th className="p-3 text-left border">Price</th>
                    <th className="p-3 text-left border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition border-b"
                    >
                      <td className="p-3 border">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-14 h-14 object-cover rounded"
                        />
                      </td>
                      <td className="p-3 border">{product.title}</td>
                      <td className="p-3 border">${product.price}</td>
                      <td className="p-3 border flex gap-3">
                        <button className="text-blue-500 hover:underline flex items-center gap-1">
                          <FiEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:underline flex items-center gap-1"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Customer Orders</h2>
            <p className="text-gray-600">
              Purchase history data can be displayed here.
            </p>
          </div>
        )}

        {view === "users" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">User List</h2>
            <ul className="bg-white p-6 rounded-lg shadow-md space-y-2">
              <li>Diamond (Admin)</li>
              <li>John Doe</li>
              <li>Jane Smith</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
