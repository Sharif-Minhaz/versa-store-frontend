import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useApiWithAuth } from "../../hooks/useApiWithAuth";
import { orderApi, useGetUserOrdersQuery } from "../../store/api/orderApi";

export default function Orders() {
  const dispatch = useDispatch();
  useApiWithAuth();
  const { data: ordersData, isLoading } = useGetUserOrdersQuery();

  useEffect(() => {
    return () => {
      dispatch(orderApi.util.invalidateTags(["Orders"]));
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          My Orders
        </h2>

        {ordersData?.orders?.length > 0 ? (
          <div className="space-y-9 mx-9">
            {[...ordersData.orders].reverse().map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <div className="flex flex-col lg:flex-row  gap-6">
                  {/* Order Details */}
                  <div className="lg:flex-1">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          Order #{order.tranxId}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize
                        ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-800" // Use "bg-red-100" for consistency with "text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Products List */}
                    <div className="space-y-4 mt-4">
                      {order.products.map((item) => (
                        <div key={item._id} className="flex items-center gap-4">
                          <img
                            src={item.product.images?.[0]?.url}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">
                              {item.product.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Quantity: {item.count}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className=" shrink-0">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                          Shipping Details
                        </h3>
                        <div className="text-sm space-y-2">
                          <div className="flex">
                            <span className="w-20 text-gray-500 dark:text-gray-400">
                              Name:
                            </span>
                            <span className="text-gray-800 dark:text-white">
                              {order.orderName}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-20 text-gray-500 dark:text-gray-400">
                              Phone:
                            </span>
                            <span className="text-gray-800 dark:text-white">
                              {order.phoneNumber}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-20 text-gray-500 dark:text-gray-400">
                              Address:
                            </span>
                            <span className="text-gray-800 dark:text-white">
                              {order.houseNo}, {order.subDistrict},{" "}
                              {order.district}, {order.division},{" "}
                              {order.postCode}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                          Order Summary
                        </h3>
                        <div className="flex justify-between text-sm mt-4">
                          <span className="text-gray-500 dark:text-gray-400">
                            Total:
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-white">
                            ৳{order.totalPrice.toLocaleString()}
                          </span>
                        </div>
                        {order.status === "pending" && (
                          <a href={order.paymentUrl}>
                            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              PAY NOW
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg">No orders yet</p>
            <p className="text-sm mt-2">
              Your orders will appear here once you make a purchase
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
