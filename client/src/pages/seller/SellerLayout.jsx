import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const SellerLayout = () => {
  const { isSeller, setIsSeller, axios, navigate } = useAppContext();
  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        setIsSeller(false);
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
        <Link to={"/"}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500">
            FreshMart
          </h1>
        </Link>
        <div className="flex items-center gap-4 text-gray-600">
          <p className="text-sm md:text-base font-medium">
            Hi! <span className="text-indigo-600">Admin</span>
          </p>
          <button
            onClick={logout}
            className="bg-white border border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-medium rounded-full text-sm px-4 py-1.5 shadow-sm transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col ">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${
                              isActive
                                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                : "hover:bg-gray-100/90 border-white "
                            }`}
            >
              <img src={item.icon} alt="" className="w-7 h-7" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};
export default SellerLayout;



