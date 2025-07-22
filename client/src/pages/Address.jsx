
import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Address = () => {
  const [address, setAddress] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const { axios, user, navigate } = useContext(AppContext);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitHanlder = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="mt-12 flex flex-col md:flex-row gap-10 p-6 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-xl border border-gray-200">
      {/* Address Form */}
      <div className="flex-1 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          🏠 Address Details
        </h2>

        <form
          onSubmit={submitHanlder}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Email", name: "email", type: "email", colSpan: 2 },
            { label: "Street", name: "street", type: "text", colSpan: 2 },
            { label: "City", name: "city", type: "text" },
            { label: "State", name: "state", type: "text" },
            { label: "Zip Code", name: "zipCode", type: "number" },
            { label: "Country", name: "country", type: "text" },
            { label: "Phone", name: "phone", type: "number", colSpan: 2 },
          ].map(({ label, name, type, colSpan }) => (
            <div key={name} className={colSpan === 2 ? "col-span-2" : ""}>
              <label className="block text-sm text-gray-600 font-medium mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={address[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
          ))}

          <div className="col-span-2 mt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={assets.add_address_iamge}
          alt="Address Illustration"
          className="w-full max-w-sm rounded-xl shadow-md border"
        />
      </div>
    </div>
  );
};

export default Address;
