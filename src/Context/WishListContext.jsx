import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  async function addProductToWishList(productId) {
    return await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: productId },
      { headers: { token: localStorage.getItem("user Token") } },
    );
  }

  async function deleteItemFromWishList(productId) {
    return await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers: { token: localStorage.getItem("user Token") } },
    );
  }

  async function getLoggedUserWishList(productId) {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: { token: localStorage.getItem("user Token") },
    });
  }

  let wishListInfo = useQuery({
    queryKey: ["whishListProducts"],
    queryFn: getLoggedUserWishList,
    select: (data) => data?.data?.data,
    enabled: !!localStorage.getItem("user Token"),
  });

  return (
    <WishListContext.Provider
      value={{ addProductToWishList, wishListInfo, deleteItemFromWishList }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
