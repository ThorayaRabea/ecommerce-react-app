import React, { useContext, useEffect, useState } from "react";
import { OrdersContext } from "../../Context/OrdersContext";
import { CartContext } from "../../Context/CartContext";

export default function AllOrders() {
  const [orders, setOrders] = useState(null);
  const { getAllOrders } = useContext(OrdersContext);
  const { cartOwner, getLoggedUserCart } = useContext(CartContext);

  async function getOrders(id) {
    let res = await getAllOrders(id);
    setOrders(res.data);
  }

  useEffect(() => {
    (async () => {
      let id = cartOwner;
      if (!id) {
        let res = await getLoggedUserCart();
        id = res.data?.data?.cartOwner;
      }
      if (id) getOrders(id);
    })();
  }, [cartOwner]);

  if (!orders)
    return (
      <div className="py-20 text-center text-green-600 font-bold text-2xl animate-pulse">
        Loading...
      </div>
    );

  return (
    <div className="container mx-auto p-4 pt-28 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-black text-center mb-10 text-gray-800 tracking-tight">
        MY <span className="text-green-600">ORDERS</span>
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden shadow-green-100"
          >
            {/* رأس الطلب - Header */}
            <div className="p-4 bg-gray-100/50 flex flex-wrap justify-between items-center gap-3 border-b border-gray-100">
              <div className="flex gap-4">
                <div className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tighter">
                  Order ID:{" "}
                  <span className="text-gray-900 ml-1">
                    #{order._id.slice(-8)}
                  </span>
                </div>
                <div className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tighter">
                  Date:{" "}
                  <span className="text-gray-900 ml-1">
                    {order.createdAt.split("T")[0]}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                  {order.paymentMethodType}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                  Paid
                </span>
              </div>
            </div>

            {/* محتويات الطلب - Items */}
            <div className="p-4 md:p-6 divide-y divide-gray-50">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 md:gap-6 py-4 first:pt-0 last:pb-0"
                >
                  {/* الصورة: أصبحت متغيرة الحجم للموبايل */}
                  <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
                    <img
                      src={item.product.imageCover}
                      className="w-full h-full object-contain"
                      alt={item.product.title}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xs md:text-sm font-extrabold text-gray-800 line-clamp-2 md:line-clamp-1">
                      {item.product.title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-400 mt-0.5 md:mt-1 uppercase font-bold tracking-widest">
                      {item.product.category.name}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs md:text-sm font-black text-green-600">
                        {item.price} EGP
                      </span>
                      <span className="text-[10px] md:text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-500">
                        Qty: {item.count}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* إجمالي السعر - Footer */}
            <div className="bg-gray-50 p-4 px-6 flex justify-between items-center border-t border-gray-100">
              <span className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                Total Price
              </span>
              <span className="text-lg md:text-xl font-black text-gray-900">
                {order.totalOrderPrice}{" "}
                <span className="text-[10px] md:text-xs text-green-600 font-bold">
                  EGP
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
