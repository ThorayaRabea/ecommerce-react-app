import React, { useContext, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function WishList() {
  let { wishListInfo, deleteItemFromWishList, addProductToWishList } =
    useContext(WishListContext);
  let { data, isLoading, refetch } = wishListInfo;
  let { addProductToCart } = useContext(CartContext);
  const [deletingId, setDeletingId] = useState(null);

  async function addToCart(id) {
    const toastId = toast.loading("Adding to your cart...", {
      style: {
        minWidth: "300px",
        padding: "16px",
        fontSize: "22px",
      },
    });

    try {
      const res = await addProductToCart(id);

      if (res?.data?.status === "success") {
        toast.success("Product added successfully! 🛒", {
          id: toastId,
          duration: 3000,
          style: {
            minWidth: "300px",
            padding: "16px",
            fontSize: "17px",
            border: "1px solid #bdf0d2",
            background: "#f0fdf4",
            color: "#166534",
            fontWeight: "500",
          },
          icon: "✅",
        });
      } else {
        toast.error("Failed!", { id: toastId });
      }
    } catch (error) {
      toast.error("Server Error", { id: toastId });
    }
  }

  async function deleteItem(id) {
    setDeletingId(id);

    let res = await deleteItemFromWishList(id);
    if (res.data.status == "success") {
      await refetch();
    }
    setDeletingId(null);
  }

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="container mx-auto px-4 mt-12">
      <div className="bg-gray-50 p-6 md:p-10 rounded-sm">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              My Wish List
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {data?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center border-b border-gray-200 pb-6 gap-6"
            >
              <div className="w-full md:w-1/6">
                <img
                  src={item.imageCover}
                  className="w-full h-auto rounded-sm object-cover shadow-sm"
                  alt={item.title}
                />
              </div>

              <div className="w-full md:w-4/6 flex flex-col justify-center text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {item.title.split(" ").slice(0, 3).join(" ")}
                </h3>
                <p className="text-gray-700 font-bold mb-3">{item.price} EGP</p>
                <button
                  className="text-red-500 flex items-center justify-center md:justify-start gap-1 hover:text-red-700 transition-all font-medium"
                  onClick={() => deleteItem(item.id)}
                >
                  {deletingId == item.id ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fa-solid fa-trash-can text-sm"></i>
                  )}
                </button>
              </div>

              <div className="w-full md:w-1/6 flex items-center justify-center md:justify-end gap-4">
                <button
                  className="btn w-full rounded-full bg-green-700 py-2 text-white"
                  onClick={() => addToCart(item.id)}
                >
                  +Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
