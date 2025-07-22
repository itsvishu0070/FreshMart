
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false); // State to control mobile menu open/close
  const {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    cartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  // Mobile menu band karne ke liye jab screen resize ho
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        // 'sm' breakpoint
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // Navbar Container: Premium styling, high z-index, subtle shadow
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-100 bg-gray-50 shadow-xl relative z-50 transition-all duration-300">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500">
          FreshMart
        </h2>{" "}
        {/* Premium logo style */}
      </Link>

      {/* Desktop Menu (Visible on sm screens and larger) */}
      <div className="hidden sm:flex items-center gap-10">
        {" "}
        {/* Premium gap */}
        <Link
          to={"/"}
          className="text-gray-700 hover:text-indigo-600 font-medium text-lg transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to={"/products"}
          className="text-gray-700 hover:text-indigo-600 font-medium text-lg transition-colors duration-200"
        >
          All Products
        </Link>
        {/* Search Bar (Hidden on smaller screens, shown on lg screens) */}
        <div className="hidden lg:flex items-center text-base gap-3 border border-gray-200 px-4 py-2 rounded-full bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:bg-white transition-all duration-200">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-700 text-base"
            type="text"
            placeholder="Search products"
            value={searchQuery}
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* Cart Icon (Desktop) */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer group"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-indigo-600 group-hover:text-indigo-800 transition-colors duration-200 transform group-hover:scale-105"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button className="absolute -top-1 -right-2 text-xs text-white bg-red-500 w-[20px] h-[20px] rounded-full flex items-center justify-center font-bold border-2 border-white transform group-hover:scale-110 transition-transform duration-200">
            {cartCount()}
          </button>
        </div>
        {/* User/Login/Admin Login Buttons (Desktop) */}
        {user ? (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-10 h-10 rounded-full object-cover cursor-pointer ring-2 ring-indigo-400 group-hover:ring-indigo-600 transition-all duration-200"
            />
            {/* FIX: Profile Dropdown Menu */}
            <ul className="hidden group-hover:block absolute top-full right-0 bg-white shadow-lg border border-gray-100 py-2 w-48 rounded-lg z-40 text-base overflow-hidden">
              {" "}
              {/* Changed top-12 to top-full, w-30 to w-48 */}
              <li
                onClick={() => navigate("/my-orders")}
                className="p-2 cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200"
              >
                My Orders
              </li>
              <li
                className="cursor-pointer p-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 text-white rounded-full font-semibold shadow-md hover:shadow-lg"
            >
              Login
            </button>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/seller");
              }}
              className="cursor-pointer px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-all duration-200 text-white rounded-full shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
            >
              Admin Login
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle (Hamburger Icon) and Cart (Visible on sm screens and smaller) */}
      <div className="flex items-center gap-6 sm:hidden">
        {/* Cart Icon (Mobile) */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer group"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-indigo-600 group-hover:text-indigo-800 transition-colors duration-200 transform group-hover:scale-105"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button className="absolute -top-1 -right-2 text-xs text-white bg-red-500 w-[20px] h-[20px] rounded-full flex items-center justify-center font-bold border-2 border-white transform group-hover:scale-110 transition-transform duration-200">
            {cartCount()}
          </button>
        </div>

        {/* Hamburger Menu Icon */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-700"
          >
            <rect width="21" height="1.5" rx=".75" fill="currentColor" />
            <rect
              x="8"
              y="6"
              width="13"
              height="1.5"
              rx=".75"
              fill="currentColor"
            />
            <rect
              x="6"
              y="13"
              width="15"
              height="1.5"
              rx=".75"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown Content (Slides in from the top) */}
      <div
        className={`${
          open
            ? "flex translate-y-0 opacity-100"
            : "hidden -translate-y-full opacity-0"
        }
        flex-col items-start gap-4 
        absolute top-0 left-0 w-full h-screen bg-white shadow-xl p-6
        transition-all duration-300 ease-in-out transform
        z-40 sm:hidden /* Visible only on mobile */
        `}
      >
        {/* Close button for mobile menu */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x text-gray-700"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Navigation Links (Mobile) */}
        <Link
          onClick={() => setOpen(false)}
          to={"/"}
          className="w-full py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200 rounded-md px-3 font-semibold text-xl"
        >
          Home
        </Link>
        <Link
          onClick={() => setOpen(false)}
          to={"/products"}
          className="w-full py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200 rounded-md px-3 font-semibold text-xl"
        >
          Products
        </Link>

        {/* User/Login/Admin Login Buttons (Mobile) */}
        {user ? (
          <div className="flex flex-col items-start gap-3 w-full mt-4">
            {/* Profile info in mobile menu */}
            <div className="flex items-center gap-3 w-full py-2 px-3 rounded-md hover:bg-gray-50 transition-colors duration-200">
              <img
                src={assets.profile_icon}
                alt=""
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-400"
              />
              <span className="text-gray-700 font-semibold text-lg">
                {user.name || "My Account"}
              </span>
            </div>
            {/* My Orders link */}
            <Link
              onClick={() => {
                setOpen(false);
                navigate("/my-orders");
              }}
              className="w-full py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200 rounded-md px-3 font-semibold text-xl"
            >
              My Orders
            </Link>
            {/* Logout button */}
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="w-full py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200 rounded-md px-3 font-semibold text-xl text-left"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-3 w-full mt-4">
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-3 bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 text-white rounded-full font-semibold shadow-md w-full text-xl"
            >
              Login
            </button>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/seller");
              }}
              className="cursor-pointer px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-all duration-200 text-white rounded-full font-semibold shadow-md w-full text-xl"
            >
              Admin Login
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Backdrop (Click to close when menu is open) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 sm:hidden"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;