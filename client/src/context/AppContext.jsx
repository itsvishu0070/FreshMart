
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets"; // Make sure dummyProducts is used or remove if not needed
import toast from "react-hot-toast";
import axios from "axios";

// Axios default settings (these were already correct in your original code)
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // check seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
      // FIX 1: Agar 401 error hai, toh toast mat dikhao. Console mein log kar do.
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        console.log(
          "Seller auth check failed: 401 Unauthorized (expected if not logged in)"
        );
      } else {
        toast.error(error.message); // Any other error will still show a toast
      }
    }
  };

  // fetch user auth status ,user Data and cart items
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cart);
      } else {
        // Original behavior: toast.error(data.message);
        // FIX 2a: Agar backend se 'success: false' aaya hai (but not 401 status),
        // toh user state clear karo. Toast dikha sakte ho.
        toast.error(data.message);
        setUser(null);
        setCartItems({});
      }
    } catch (error) {
      // FIX 2b: Agar error hai (jaise 401), toh user state clear karo
      setUser(null);
      setCartItems({});

      // FIX 2c: Agar 401 Unauthorized error hai
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        console.log("User authentication failed: 401 Unauthorized.");
        // YAHAN PAR navigate("/login") NAHI KARENGE agar home page par rehna hai.
        // AppContext bas user ko null kar dega.
        // Protected routes ko apne component level par hi check karna padega (user === null)
        // aur wahan se redirect karna hoga agar woh route protected hai.
      } else {
        toast.error(error.message); // Dusre errors (network, 500 etc.) ke liye toast
      }
    }
  };

  // fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems || {}); // safeguard for undefined

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success(`cart updated`);
  };

  // total cart items
  const cartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };
  // total cart amount
  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += cartItems[items] * itemInfo.offerPrice;
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };
  // remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      toast.success(`remove from cart`);
      setCartItems(cartData);
    }
  };
  useEffect(() => {
    fetchSeller();
    fetchProducts();
    fetchUser();
  }, []);

  // update database cart items
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });

        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        // FIX 3: Cart update ke 401 error ke liye toast band karo
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          console.log(
            "Cart update failed: 401 Unauthorized (user logged out or session expired)"
          );
        } else {
          toast.error(error.message);
        }
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems, user]); // Dependency array mein 'user' add kiya for correctness

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    cartCount,
    totalCartAmount,
    axios,
    fetchProducts,
    setCartItems,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};