

import { useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-20 px-4 md:px-8">
      {/* Premium Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500">
        Best Sellers
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;

