
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    !isSeller && (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center bg-black/60 backdrop-blur-sm px-4">
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-4 w-[90%] max-w-sm items-start p-8 py-10 rounded-2xl shadow-xl border border-white/20 text-gray-100 backdrop-blur-md bg-white/10"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute top-2 right-2 text-white hover:text-red-400 text-xl"
          >
            <IoMdClose />
          </button>

          <h2 className="text-2xl font-semibold w-full text-center text-white mb-4">
            <span className="text-indigo-400">Seller</span> Login
          </h2>

          <div className="w-full">
            <label className="text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="type here"
              required
              className="w-full mt-1 p-2 rounded-md bg-white/80 text-black outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="w-full">
            <label className="text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="type here"
              required
              className="w-full mt-1 p-2 rounded-md bg-white/80 text-black outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 transition-all text-white py-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;



