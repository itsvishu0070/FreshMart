

import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ProductList = () => {
  const { products, fetchProducts, axios } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 py-10 flex flex-col items-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl md:px-10 px-4">
        <h2 className="pb-6 text-2xl font-semibold text-gray-800">
          All Products
        </h2>
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white">
          <table className="w-full table-auto text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold hidden md:table-cell">
                  Price
                </th>
                <th className="px-6 py-4 font-semibold">In Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={`http://localhost:5000/images/${product.image[0]}`}
                      alt="Product"
                      className="w-14 h-14 object-cover rounded-md border"
                    />
                    <span className="font-medium line-clamp-1">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 capitalize">{product.category}</td>
                  <td className="px-6 py-4 hidden md:table-cell text-indigo-600 font-semibold">
                    ₹{product.offerPrice}
                  </td>
                  <td className="px-6 py-4">
                    <label className="inline-flex items-center cursor-pointer relative">
                      <input
                        type="checkbox"
                        onClick={() =>
                          toggleStock(product._id, !product.inStock)
                        }
                        checked={product.inStock}
                        readOnly
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all duration-300"></div>
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-6"></span>
                    </label>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
