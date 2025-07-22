
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";

const Products = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-white py-12 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b pb-4 border-gray-300">
        <h1 className="text-4xl font-bold text-gray-800 tracking-wider">
          All Products
        </h1>
        <span className="mt-2 md:mt-0 text-sm text-gray-500">
          {filteredProducts.filter((product) => product.inStock).length} items
          found
        </span>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      ) : (
        <div className="mt-24 flex flex-col items-center justify-center h-64 bg-white shadow-inner rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            No products match your search
          </h2>
          <p className="text-gray-500">Try adjusting your search keyword</p>
        </div>
      )}
    </div>
  );
};

export default Products;
