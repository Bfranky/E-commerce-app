import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "../CartContext"; // Remove if not using context
import { useState } from "react";
import logo from "../assets/logo.png"; // Adjust the path as necessary

export default function Navbar({ onSearch }) {
  const { cartItems } = useCart(); // Remove if not using cart context
  const [searchText, setSearchText] = useState("");

  return (
    <header className="bg-green-800 text-white px-6 py-4 shadow fixed top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* LEFT: Logo and Search */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Link to="/" className="mr-8 flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
          </Link>
          <div className="relative w-full">
            <Search className="absolute left-2 top-2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              className="pl-8 pr-3 py-1.5 rounded-md text-black w-full focus:outline-none"
            />
          </div>
        </div>

        {/* CENTER: Nav */}
        <div className="flex items-center justify-center flex-1">
        
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/products" className="hover:text-gray-200">
              Products
            </Link>
            <Link to="/cart" className="hover:text-gray-200">
              Shopping Cart
            </Link>
          </nav>
        </div>

        {/* RIGHT: Login + Cart */}
        <div className="flex items-center gap-4 flex-1 justify-end min-w-[200px]">
          <Link to="/" className="hover:text-gray-200 font-medium">
            Login
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
