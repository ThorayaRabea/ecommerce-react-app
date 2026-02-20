import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  let { addProductToCart } = useContext(CartContext);

  let { data, isLoading, isError, error } = useProducts();

  let { addProductToWishList, wishListInfo } = useContext(WishListContext);

  async function addToWishList(id) {
    const toastId = toast.loading("Adding to your wishlist...", {
      style: {
        minWidth: "300px",
        padding: "16px",
        fontSize: "22px",
      },
    });

    try {
      const res = await addProductToWishList(id);

      if (res?.data?.status === "success") {
        await wishListInfo.refetch();
        toast.success("Product added successfully! ", {
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

  if (isLoading) {
    return <FullScreenLoader />;
  }
  if (isError) {
    return <h2>{error}</h2>;
  }

  let filteredSearch = data?.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  console.log(data);

  return (
    <div className="mt-20">
      <div className="">
        <input
          type="search"
          id="search"
          class="block w-full p-3 ps-9 border border-gray-700  text-sm  focus:border-blue-300 shadow-sm  rounded-lg mb-6 transition-all focus:ring-2 focus:ring-blue-300 outline-none"
          placeholder="Search by name or category...."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-wrap ">
        {filteredSearch?.length > 0 ? (
          filteredSearch.map((product) => (
            <div key={product.id} className="w-full md:w-1/2 lg:w-1/4 mb-3">
              <div className="product text-start hover:shadow-lg   hover:shadow-blue-300 px-3">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    className="w-full  object-cover"
                    alt={product.title}
                  />
                  <h2 className="text-green-400">{product.category.name}</h2>
                  <h2 className="font-semibold">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <div className="flex justify-between">
                    <span>{product.price} EGP</span>
                    <span>
                      {" "}
                      <i className="fas fa-star text-yellow-500"></i>{" "}
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>

                <div className="flex justify-end mt-3">
                  <button onClick={() => addToWishList(product.id)}>
                    <i
                      className={` fa-solid fa-heart text-3xl ${wishListInfo?.data?.some((item) => item.id == product.id) ? "text-red-800" : "text-black"}`}
                    ></i>
                  </button>
                </div>

                <div className="">
                  <button
                    className="btn w-full rounded-full bg-green-700 py-2 text-white"
                    onClick={() => addToCart(product.id)}
                  >
                    +Add
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <i className="fa-solid fa-magnifying-glass text-6xl text-gray-400"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No products found matching "{searchTerm}"
            </h2>
            <p className="text-gray-500">
              Try checking for typos or searching for something else!
            </p>

            <button
              onClick={() => setSearchTerm("")}
              className="mt-6 text-green-600 font-semibold hover:underline"
            >
              Clear search and see all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
