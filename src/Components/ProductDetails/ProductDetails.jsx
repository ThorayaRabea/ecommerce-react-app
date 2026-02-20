import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const [allRelatedProducts, setAllRelatedProducts] = useState([]);
  let { addProductToCart } = useContext(CartContext);

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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  async function getProductDetails(id) {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setProduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  async function getAllRelatedProducts() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let relatedProducts = res.data.data.filter((product) => {
          return product.category.name == category;
        });
        //console.log(relatedProducts);
        setAllRelatedProducts(relatedProducts);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    setProduct(null);
    getProductDetails(id);
    getAllRelatedProducts();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  return (
    <>
      {product ? (
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-1/4 mb-4 ">
            <Slider {...settings}>
              {product?.images.map((src) => (
                <img src={src} className="w-full object-cover" />
              ))}
            </Slider>
          </div>

          <div className="w-full lg:w-2/4 flex justify-center items-center">
            <div>
              <h2 className="font-bold text-2xl text-start mb-2">
                {product?.title}
              </h2>
              <h3 className="font-light text-xl mb-2 text-start">
                {product?.description}
              </h3>
              <div className="flex justify-between">
                <span>{product?.price} EGP</span>
                <span>
                  {" "}
                  <i className="fas fa-star text-yellow-500"></i>
                  {product?.ratingsAverage}{" "}
                </span>
              </div>
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
        </div>
      ) : (
        <FullScreenLoader />
      )}

      <div className="flex flex-wrap mt-3">
        {allRelatedProducts.length > 0 ? (
          allRelatedProducts.map((product) => (
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
          <FullScreenLoader />
        )}
      </div>
    </>
  );
}
