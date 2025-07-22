
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-white py-12 px-4 sm:px-8 md:px-16 lg:px-24">
      {searchCategory && (
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b pb-4 border-gray-300">
          <h1 className="text-4xl font-bold text-gray-800 tracking-wider uppercase">
            {searchCategory.text}
          </h1>
          <span className="mt-2 md:mt-0 text-sm text-gray-500">
            {filteredProducts.length} items found
          </span>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-24 flex flex-col items-center justify-center h-64 bg-white shadow-inner rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            No products found
          </h2>
          <p className="text-gray-500">Try browsing a different category</p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
