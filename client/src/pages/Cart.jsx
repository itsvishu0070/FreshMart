
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyAddress } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    navigate,
    cartCount,
    totalCartAmount,
    cartItems,
    setCartItems,
    removeFromCart,
    updateCartItem,
    axios,
    user,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((product) => product._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddress(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getAddress();
    }
  }, [user]);

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">({cartCount()} Items)</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-600 text-base font-semibold pb-3 border-b">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium pt-4 border-b py-4"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(`/product/${product.category}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border rounded-md overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:5000/images/${product.image[0]}`}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-500">
                  Weight: {product.weight || "N/A"}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <p className="text-sm">Qty:</p>
                  <select
                    onChange={(e) =>
                      updateCartItem(product._id, Number(e.target.value))
                    }
                    value={cartItems[product._id]}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {Array(
                      cartItems[product._id] > 9 ? cartItems[product._id] : 9
                    )
                      .fill("")
                      .map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-700 font-medium">
              ₹{product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="mx-auto"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate("/products")}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#615fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-white shadow-md rounded-lg p-6 max-md:mt-16">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>

        <div className="mb-6">
          <p className="text-sm font-semibold uppercase text-gray-600">
            Delivery Address
          </p>
          <div className="relative flex justify-between items-start mt-2 text-sm">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No Address Found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 hover:underline ml-2"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-12 left-0 py-2 bg-white border border-gray-300 shadow-md w-full z-10 rounded-md">
                {address.map((addr, i) => (
                  <p
                    key={i}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setShowAddress(false);
                    }}
                    className="text-gray-600 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {addr.street}, {addr.city}, {addr.state}, {addr.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-indigo-500 text-center p-2 hover:bg-indigo-50 cursor-pointer"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-semibold uppercase text-gray-600 mt-6">
            Payment Method
          </p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <div className="text-gray-600 space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Price</span>
            <span>₹{totalCartAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₹{(totalCartAmount() * 2) / 100}</span>
          </p>
          <p className="flex justify-between text-base font-semibold pt-2">
            <span>Total Amount</span>
            <span>₹{totalCartAmount() + (totalCartAmount() * 2) / 100}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md font-semibold transition duration-300"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
