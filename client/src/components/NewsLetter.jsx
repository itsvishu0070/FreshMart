
import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";

const NewsLetter = () => {
  const { products } = useAppContext();
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchInput, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Nothing extra needed here since filtering is handled in useEffect
  };

  return (
    <>
      <div className="relative my-20 px-6 w-full flex flex-col items-center justify-center text-center">
        <div className="bg-white/30 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl max-w-3xl w-full p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 drop-shadow-sm">
            Find Your Favorite Products
          </h1>
          <p className="mt-3 md:text-lg text-sm text-gray-700">
            Search by product name and explore the best deals available on{" "}
            <span className="font-semibold text-green-600">FreshMart</span>.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full"
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for fruits, vegetables, groceries..."
              className="w-full sm:w-[70%] px-4 h-12 text-sm text-gray-800 bg-white/90 rounded-lg shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 h-12 bg-gradient-to-r from-green-600 to-lime-500 text-white rounded-lg font-medium hover:brightness-110 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Search Results */}
      <div className="px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))
        ) : searchInput.trim() ? (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        ) : null}
      </div>
    </>
  );
};

export default NewsLetter;
