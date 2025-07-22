
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const SingleProduct = () => {
  const { products, navigate, addToCart } = useAppContext();
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const product = products.find((product) => product._id === id);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (p) => p.category === product?.category && p._id !== product._id
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    setThumbnail(product?.image[0] || null);
  }, [product]);

  return (
    product && (
      <div className="mt-20 px-4 lg:px-16">
        <p className="text-sm text-gray-600 mb-4">
          <Link to="/" className="text-indigo-500 hover:underline">
            Home
          </Link>{" "}
          /
          <Link to="/products" className="text-indigo-500 hover:underline">
            {" "}
            Products
          </Link>{" "}
          /
          <Link
            to={`/products/${product.category.toLowerCase()}`}
            className="text-indigo-500 hover:underline"
          >
            {" "}
            {product.category}
          </Link>{" "}
          /<span className="text-gray-900 font-medium"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Side - Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <img
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`w-20 h-20 border rounded-lg object-cover cursor-pointer transition-transform duration-200 hover:scale-105 ${
                    thumbnail === image ? "ring-2 ring-indigo-500" : ""
                  }`}
                  src={`http://localhost:5000/images/${image}`}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
            </div>
            <div className="w-[300px] h-[300px] border rounded-lg overflow-hidden shadow-md">
              <img
                src={`http://localhost:5000/images/${thumbnail}`}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-3xl font-semibold text-gray-800">
              {product.name}
            </h1>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="w-4 h-4"
                />
              ))}
              <span className="ml-2 text-gray-600 text-sm">(4)</span>
            </div>

            <div className="space-y-1 mt-4">
              <p className="text-gray-400 line-through">
                MRP: ₹{product.price}
              </p>
              <p className="text-2xl font-semibold text-green-600">
                MRP: ₹{product.offerPrice}
              </p>
              <span className="text-sm text-gray-500">
                (inclusive of all taxes)
              </span>
            </div>

            <div className="mt-6">
              <p className="text-lg font-medium text-gray-800">About Product</p>
              <ul className="list-disc ml-5 text-gray-600 mt-2">
                {product.description.map((desc, index) => (
                  <li key={index} className="text-sm">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full py-3 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                  scrollTo(0, 0);
                }}
                className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Related Products
            </h2>
            <div className="w-16 h-1 bg-indigo-500 rounded mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {relatedProducts
              .filter((p) => p.inStock)
              .map((p, index) => (
                <ProductCard key={index} product={p} />
              ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                navigate("/products");
                scrollTo(0, 0);
              }}
              className="px-8 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition"
            >
              See More
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SingleProduct;
