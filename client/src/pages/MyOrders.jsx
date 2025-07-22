
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-24 px-4 md:px-10">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          My Orders
        </h2>
        <p className="text-gray-500 mt-1">
          Track and view all your previous orders here
        </p>
      </div>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className="mb-10 bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 px-6 py-4 border-b">
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Order ID:</span> {order._id}
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                {order.paymentType}
              </p>
              <p>
                <span className="font-medium">Total Amount:</span> ₹
                {order.amount}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-600">
              <p>
                <span className="font-medium">Status:</span> {order.status}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {order.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-6 py-5 ${
                order.items.length !== itemIndex + 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000/images/${item.product.image[0]}`}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl border"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-500 text-sm capitalize">
                    {item.product.category}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Qty: {item.quantity || "1"}
                  </p>
                </div>
              </div>

              <div className="text-gray-800 font-semibold text-lg ml-auto">
                ₹{item.product.offerPrice * item.quantity}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;

