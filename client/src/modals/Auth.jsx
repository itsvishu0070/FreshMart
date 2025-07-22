import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
const Auth = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-5 px-6 py-10 w-[90%] max-w-sm rounded-2xl shadow-2xl border border-white/10 bg-white/10 backdrop-blur-md"
      >
        <p className="text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-600 to-purple-600">
          {state === "login" ? "User Login" : "Create Account"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <label className="block text-sm font-medium text-white mb-1">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-indigo-400 outline-none"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <label className="block text-sm font-medium text-white mb-1">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-white mb-1">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="password"
            required
          />
        </div>

        <p className="text-sm text-gray-300 text-center">
          {state === "register"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            onClick={() =>
              setState(state === "register" ? "login" : "register")
            }
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Click here
          </span>
        </p>

        <button className="w-full py-2 rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all font-semibold tracking-wide">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );

};
export default Auth;
