

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-6 bg-gradient-to-br from-gray-100 to-white min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">📦 Orders Summary</h2>

      {orders.map((order, index) => (
        <div
          key={index}
          className="grid md:grid-cols-[2fr_2fr_1fr_1fr] gap-6 items-center bg-white/60 backdrop-blur-md shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
        >
          {/* Product Info */}
          <div className="flex gap-4 items-center">
            <img
              src={`https://freshmart-v07o.onrender.com/images/${order.items[0].product.image[0]}`}
              alt="product"
              className="w-14 h-14 rounded-lg object-cover shadow"
            />
            <div>
              {order.items.map((item, idx) => (
                <p key={idx} className="text-gray-800 font-semibold">
                  {item.product.name}{" "}
                  {item.quantity > 1 && (
                    <span className="text-indigo-500 font-medium">
                      × {item.quantity}
                    </span>
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="text-sm text-gray-700">
            <p className="font-semibold">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}, {order.address.zipcode},{" "}
              {order.address.country}
            </p>
          </div>

          {/* Amount */}
          <div className="text-lg font-bold text-emerald-600">
            ₹{order.amount}
          </div>

          {/* Payment & Date */}
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium text-gray-800">Method:</span>{" "}
              {order.paymentType}
            </p>
            <p>
              <span className="font-medium text-gray-800">Date:</span>{" "}
              {order.orderDate}
            </p>
            <p>
              <span className="font-medium text-gray-800">Payment:</span>{" "}
              <span
                className={`font-semibold ${
                  order.isPaid ? "text-green-500" : "text-red-500"
                }`}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
