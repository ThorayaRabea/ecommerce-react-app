import axios from "axios";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode"

export let CartContext = createContext();

export default function CartContextProvider(props) {

  const [cartId, setCartId] = useState(null)
  const [numbersOfCartItems, setNumbersOfCartItems] = useState('0')

  const [cartOwner, setCartOwner] = useState('')

  let headers = {
    token: localStorage.getItem("user Token"),
  };

  async function addProductToCart(productId) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v2/cart`,
        { productId: productId },
        {headers:{token: localStorage.getItem("user Token"),} },
      )
      .then((res) => {
        setNumbersOfCartItems(res.data.numOfCartItems)
        return res
      })
      .catch((err) => err);
  }

  async function getLoggedUserCart() {
    return await axios
      .get('https:ecommerce.routemisr.com/api/v2/cart', { headers:{token: localStorage.getItem("user Token"),} })
      .then((res) => {
        const token = localStorage.getItem("user Token");
        if (token) {
          const decoded = jwtDecode(token);
          setCartOwner(decoded.id); 
          console.log("User ID from Token:", decoded.id);
        }

        setCartId(res.data.data._id);
        setNumbersOfCartItems(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }

  async function deleteSpecificItem(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
        headers:{token: localStorage.getItem("user Token"),}
      })
      .then((res) =>{
        setNumbersOfCartItems(res.data.numOfCartItems)
        return res
      })
      .catch((err) => err);
  }

  async function updateCartProduct(productId, newCount) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        { count: newCount },
        { headers:{token: localStorage.getItem("user Token"),} },
      )
      .then((res) => res)
      .catch((err) => err);
  }

  async function clearUserCart() {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v2/cart`, { headers:{token: localStorage.getItem("user Token"),} })
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateCartProduct,
        deleteSpecificItem,
        clearUserCart,
        setNumbersOfCartItems,
        numbersOfCartItems,
        cartId,
        cartOwner
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
