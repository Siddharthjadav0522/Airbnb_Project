import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-red-500">Airbnb</div>

        {/* Navigation Links (hidden on mobile) */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Explore
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Host
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Login
          </a>
        </nav>

        {/* Hamburger Menu (visible on mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block md:hidden text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="space-y-4 py-4 px-4">
            <a href="#" className="block text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="block text-gray-600 hover:text-gray-900">
              Explore
            </a>
            <a href="#" className="block text-gray-600 hover:text-gray-900">
              Host
            </a>
            <a href="#" className="block text-gray-600 hover:text-gray-900">
              Login
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
