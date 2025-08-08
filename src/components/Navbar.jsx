// components/Navbar.jsx
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useCart } from "../CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Hide navbar on login page
  if (location.pathname === "/login") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-green-700 text-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
         <img src="src/assets/logo.png" alt="Logo" className="inline-block h-14 w-20 mr-2" /> 
        </Link>

        {/* Nav Links */}
        <nav className="flex gap-6 text-sm font-medium">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "font-bold underline" : "hover:underline"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "font-bold underline" : "hover:underline"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "font-bold underline" : "hover:underline"
            }
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? "font-bold underline" : "hover:underline"
            }
          >
            History
          </NavLink>

          {/* Admin Link - Only for Admin */}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "font-bold underline" : "hover:underline"
              }
            >
              Admin Dashboard
            </NavLink>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search & Cart */}
          <div className="relative">
            <FiSearch className="absolute top-2.5 left-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-8 pr-3 py-1.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring focus:ring-green-400 text-black w-48 sm:w-64"
            />
          </div>
          <Link to="/cart" className="relative">
            <FiShoppingCart className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-green-700 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "font-bold underline" : "hover:underline"
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
