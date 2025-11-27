    import React, { useEffect, useState } from "react";
    import { useSelector } from "react-redux";
    import useFetch from "../hooks/useFetch";

    function MyOrders() {
    const [myOrders, setMyOrders] = useState([]);
    const user = useSelector((state) => state.app.user);

    const { data } = useFetch(
        "orders",
        user?._id ? `/order/myOrder/${user._id}` : null,
        { enabled: !!user?._id }
    );

    // Update local state only when data changes; do not call setState during render
    useEffect(() => {
        if (data) {
        setMyOrders(data.orders || []);
        } else {
        setMyOrders([]);
        }
    }, [data]);

    return (
        <div className="mt-20 pb-20 max-w-5xl mx-auto px-4">
        <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-800 uppercase tracking-wide mb-2">
            My Orders
            </h1>
            <div className="w-20 h-1 bg-primary rounded"></div>
        </div>
        {myOrders.length === 0 ? (
            <div className="text-center text-gray-400 text-lg">
            No orders found.
            </div>
        ) : (
            myOrders.map((order, idx) => (
            <div key={idx} className="bg-white shadow-lg rounded-xl mb-10 p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
                <div>
                    <span className="font-semibold text-gray-700">Order ID:</span>
                    <span className="ml-2 text-gray-500">{order._id}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Payment:</span>
                    <span className="ml-2 text-gray-500">{order.paymentType}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Total:</span>
                    <span className="ml-2 text-primary font-bold">
                    ${order.amount}
                    </span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className="ml-2 text-gray-500">{order.status}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Date:</span>
                    <span className="ml-2 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                </div>
                </div>
                <div className="divide-y divide-gray-200">
                {order.items.map((item, i) => (
                    <div
                    key={i}
                    className="flex flex-col md:flex-row md:items-center py-4 gap-6"
                    >
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                        <img
                            src={item.product.image[0]}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                        />
                        </div>
                        <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {item.product.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Category: {item.product.category}
                        </p>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row md:justify-end md:items-center gap-4">
                        <div>
                        <p className="text-gray-600">
                            Quantity:{" "}
                            <span className="font-medium">
                            {item.quantity || 1}
                            </span>
                        </p>
                        </div>
                        <div>
                        <p className="text-primary font-semibold">
                            Amount: $
                            {item.product.offerPrice * (item.quantity || 1)}
                        </p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            ))
        )}
        </div>
    );
    }

    export default MyOrders;
