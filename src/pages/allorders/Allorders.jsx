import React,{ useContext, useEffect, useState } from 'react';
import { userContextProvider } from '../../Context/UserContextProvider';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import NoItem from '../../components/NoItem/NoItem';

export default function Allorders() {
  const { token } = useContext(userContextProvider);
  const { id } = jwtDecode(token);
  const [orders, setOrders] = useState(null);

  async function getAllOrder(id) {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
    setOrders(data);
  }

  useEffect(() => {
    getAllOrder(id);
  }, [id]);
  if (orders == 0) {
    return < NoItem >
      {"There are no orders yet....."}
      {" Add  orders and come back later.."}
    </NoItem>
  }
  console.log(orders)
  return (
    <>
      {!orders ? (
        <Loading />
      ) : (
        <div className="container mx-auto p-5">
          <h1 className="text-2xl font-bold text-gray-800 mb-5">Your Orders</h1>
          <div className="grid gap-6">
            {orders.map((order) => (
              <div className="order bg-white shadow-md border border-gray-200 rounded-lg p-5" key={order._id}>
                {/* Header Section */}
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <div>
                    <h2 className="text-sm text-gray-400">Order ID</h2>
                    <h3 className="text-lg font-semibold text-gray-700">{order.id}</h3>
                  </div>
                  <div className="flex gap-2">
                    {order.isDelivered ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Delivered Successfully
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Not Delivered Yet
                      </span>
                    )}

                    {order.isPaid ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Payment Completed
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Payment Pending
                      </span>
                    )}
                  </div>
                </div>
                {/* Products Section */}
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {order.cartItems.map((product) => (
                    <div key={product.id} className="product bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="w-full h-34 object-cover rounded-md mb-3"
                      />
                      <h3 className="text-sm font-medium text-gray-700 truncate">
                        {product.product.title}
                      </h3>
                      <span className="text-lg font-bold text-gray-900 mt-2">
                        {product.price} L.E
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
