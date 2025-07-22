
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/product/${product.category.toLowerCase()}/${product?._id}`
          );
          scrollTo(0, 0);
        }}
        className="bg-white border border-gray-200 hover:shadow-xl shadow-md rounded-2xl p-4 transition-all duration-300 ease-in-out cursor-pointer w-full max-w-[250px] min-w-[230px]"
      >
        {/* Image */}
        <div className="flex items-center justify-center h-[140px]">
          <img
            src={`https://freshmart-v07o.onrender.com/images/${product.image[0]}`}
            alt={product.name}
            className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="mt-4 text-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <p className="text-base font-semibold text-gray-800 truncate">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="rating"
                  className="w-3.5"
                />
              ))}
            <p className="text-xs text-gray-500">(4)</p>
          </div>

          {/* Price + Cart */}
          <div className="flex items-end justify-between mt-4">
            <div>
              <p className="text-lg font-bold text-indigo-600 leading-tight">
                ₹{product.offerPrice}
              </p>
              <p className="text-xs text-gray-400 line-through">
                ₹{product.price}
              </p>
            </div>

            {/* Cart Buttons */}
            <div onClick={(e) => e.stopPropagation()}>
              {!cartItems?.[product?._id] ? (
                <button
                  onClick={() => addToCart(product?._id)}
                  className="flex items-center gap-1 bg-indigo-100 hover:bg-indigo-200 transition px-3 py-1.5 rounded-full text-sm text-indigo-600 font-semibold"
                >
                  <img src={assets.cart_icon} alt="cart icon" className="w-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center bg-indigo-100 rounded-full overflow-hidden text-sm text-indigo-600 font-semibold">
                  <button
                    onClick={() => removeFromCart(product?._id)}
                    className="px-3 py-1 hover:bg-indigo-200"
                  >
                    -
                  </button>
                  <span className="px-2">{cartItems[product?._id]}</span>
                  <button
                    onClick={() => addToCart(product?._id)}
                    className="px-3 py-1 hover:bg-indigo-200"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
