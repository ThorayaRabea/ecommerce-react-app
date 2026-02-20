import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { OrdersContext } from "../../Context/OrdersContext";
import { CartContext } from "../../Context/CartContext";

export default function CheckOut() {
  let { checkOut } = useContext(OrdersContext);
  let { cartId, getLoggedUserCart } = useContext(CartContext);

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => handleCheckOut(cartId, window.location.origin),
  });

  const isFormFilled =
    formik.values.details && formik.values.phone && formik.values.city;

  async function handleCheckOut(id, url) {
    let currentCartId = id;

    if (!currentCartId) {
      console.log("CartId is null, fetching...");
      const res = await getLoggedUserCart();

      currentCartId = res?.data?.data?._id;
    }

    if (!currentCartId) {
      alert("عذراً، لم نتمكن من العثور على عربة التسوق الخاصة بك.");
      return;
    }

    try {
      console.log("Sending Request with ID:", currentCartId);
      let { data } = await checkOut(currentCartId, url, formik.values);

      if (data?.status === "success") {
        window.location.href = data.session.url;
      } else {
        console.log("API response but not success:", data);
      }
    } catch (error) {
      console.log("CheckOut Error inside Catch:", error);
    }
  }

  return (
    <>
      <div className="flex justify-start px-10 pt-16">
        <div className="w-full">
          <h1 className="text-3xl font-medium mb-3 text-start ">Check Out</h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="details"
                className="block mb-2 text-base font-normal text-gray-900 text-start"
              >
                {" "}
                details :
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.details}
                name="details"
                type="text"
                id="details"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 focus:bg-white focus:ring-2 focus:ring-offset-0 focus:outline-none "
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-base font-normal text-gray-900 text-start"
              >
                {" "}
                phone :
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                name="phone"
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 focus:bg-white focus:ring-2 focus:ring-offset-0 focus:outline-none "
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="city"
                className="block mb-2 text-base font-normal text-gray-900 text-start"
              >
                {" "}
                city :
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
                name="city"
                type="text"
                id="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 focus:bg-white focus:ring-2 focus:ring-offset-0 focus:outline-none "
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className={`border-2 border-gray-300 font-light rounded-lg text-lg w-full px-7 py-3 transition-all duration-300 
  ${isFormFilled ? "bg-green-600 text-white border-green-600" : "bg-white text-black cursor-not-allowed"}`}
                disabled={!isFormFilled}
              >
                Pay Online
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
