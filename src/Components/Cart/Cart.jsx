import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import ProductDetails from "../ProductDetails/ProductDetails";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import { Link } from "react-router-dom";
export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartProduct,
    deleteSpecificItem,
    clearUserCart,
    setNumbersOfCartItems,
    numbersOfCartItems,
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [isloading, setIsloading] = useState(false);

  async function getCartItems() {
    try {
      setIsloading(true);
      let res = await getLoggedUserCart();

      // تأكدي إننا بنقرأ البيانات بأمان باستخدام علامة الاستفهام ?
      if (res?.data?.status === "success") {
        setNumbersOfCartItems(res.data.numOfCartItems);
        setCartDetails(res.data.data); // هنا البيانات هتتحط صح
      }
    } catch (err) {
      console.log("Error fetching cart:", err);
      // لو حصل خطأ، خلي العربة فاضية بدل ما يفضل يحمل
      setCartDetails({ products: [] });
    } finally {
      setIsloading(false);
    }
  }

  async function deleteProduct(id) {
    setIsloading(true);
    let res = await deleteSpecificItem(id);
    if (res.data.status === "success") {
      setCartDetails(res.data.data);

      setNumbersOfCartItems(res.data.numOfCartItems);
    }
    setIsloading(false);
  }

  async function clear() {
    setIsloading(true);
    let res = await clearUserCart();
    console.log(res.data);
    setNumbersOfCartItems(0);
    setCartDetails({ products: [] });
    setIsloading(false);
  }

  async function upadateProduct(id, count) {
    setCurrentId(id);
    let res = await updateCartProduct(id, count);
    //console.log(res.data);
    if (res.data.status == "success") {
      setCartDetails(res.data.data);
      setNumbersOfCartItems(res.data.numOfCartItems);
    }

    setCurrentId(null);
  }

  useEffect(() => {
    getCartItems();
  }, []);

  if (isloading) {
    return <FullScreenLoader />;
  }

  // هنشيل شرط الـ !cartDetails عشان ما يعرضش "فاضية" والبيانات لسه جاية في الطريق
  if (!isloading && cartDetails && cartDetails?.products?.length === 0) {
    return (
      <div className="container mx-auto px-4 mt-12 text-center py-20 bg-gray-50 rounded-sm">
        <h2 className="text-3xl font-bold text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-500 my-4">
          Add some products to see them here!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-12">
      <div className="bg-gray-50 p-6 md:p-10 rounded-sm">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">Cart Shop</h2>
            <p className="text-green-600 font-bold text-lg mt-2 italic">
              total price: {cartDetails?.totalCartPrice || 0} EGP
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 w-full md:w-auto">
            <Link to={"/checkout"}>
              <button className="bg-blue-600 text-white px-8 py-2.5 rounded-lg text-lg hover:bg-blue-700 transition-all w-full md:w-auto shadow-sm">
                check out
              </button>
            </Link>

            <p className="text-gray-800 font-bold">
              total number of items:{" "}
              <span className="text-green-600">
                {cartDetails?.products?.length || 0}
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {cartDetails?.products?.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col md:flex-row items-center border-b border-gray-200 pb-6 gap-6"
            >
              <div className="w-full md:w-1/6">
                <img
                  src={item.product.imageCover}
                  className="w-full"
                  alt={item.product.title}
                />
              </div>

              <div className="w-full md:w-4/6 flex flex-col justify-center text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {item.product.title.split(" ").slice(0, 3).join(" ")}
                </h3>
                <p className="text-gray-700 font-bold mb-3">{item.price} EGP</p>
                <button
                  className="text-red-500 flex items-center justify-center md:justify-start gap-1 hover:text-red-700 transition-all font-medium"
                  onClick={() => deleteProduct(item.product.id)}
                >
                  <i className="fa-solid fa-trash-can text-sm"></i> Remove
                </button>
              </div>

              <div className="w-full md:w-1/6 flex items-center justify-center md:justify-end gap-4">
                <button
                  onClick={() =>
                    upadateProduct(item.product.id, item.count + 1)
                  }
                  className="border border-green-500 rounded-md h-9 w-9 flex items-center justify-center text-xl text-gray-700 hover:bg-green-500 hover:text-white transition-all"
                >
                  +
                </button>
                <span className="text-xl font-medium w-6 text-center">
                  {currentId == item.product.id ? (
                    <i className="fas fa-spinner fa-spin text-green-600 text-xl"></i>
                  ) : (
                    item.count
                  )}
                </span>
                <button
                  onClick={() =>
                    upadateProduct(item.product.id, item.count - 1)
                  }
                  className="border border-green-500 rounded-md h-9 w-9 flex items-center justify-center text-xl text-gray-700 hover:bg-green-500 hover:text-white transition-all"
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            className="border border-green-500 text-gray-800 px-10 py-2.5 rounded-lg text-xl hover:bg-green-500 hover:text-white transition-all duration-300 shadow-sm"
            onClick={() => clear()}
          >
            Clear Your Cart
          </button>
        </div>
      </div>
    </div>
  );
}
