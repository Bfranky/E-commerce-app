// src/components/Footer.jsx
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Branding & Links */}
        <div>
          <h3 className="text-xl font-bold mb-2">Local Threads</h3>
          <p className="text-sm text-gray-400 mb-4">
            Curated fashion from independent designers. Discover your next favorite piece.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* Right: Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h4>
          <p className="text-sm text-gray-400 mb-4">Get updates on our latest collections and exclusive offers.</p>
          <form className="flex flex-col sm:flex-row items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto flex-1 px-4 py-2 mb-2 sm:mb-0 sm:mr-2 rounded bg-gray-800 border border-gray-700 text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} Local Threads. All rights reserved.
      </div>
    </footer>
  );
}
