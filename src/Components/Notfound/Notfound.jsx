import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-20">
      <div className="text-center px-4">
        <h1 className="text-9xl font-black text-green-600 animate-bounce">
          404
        </h1>

        <div className="mt-4">
          <h2 className="text-3xl font-bold text-gray-800 md:text-4xl mb-2">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>
        </div>

        <Link
          to="/"
          className="relative inline-block px-8 py-3 font-bold text-white transition-all bg-green-600 rounded-full hover:bg-green-700 active:scale-95 shadow-lg shadow-green-200"
        >
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-house text-sm"></i>
            Back To Home
          </span>
        </Link>

        <div className="mt-12 opacity-20">
          <i className="fa-solid fa-cart-shopping text-[150px] text-gray-300"></i>
        </div>
      </div>
    </div>
  );
}
