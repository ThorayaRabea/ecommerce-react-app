import axios from "axios";
import { createContext, useContext } from "react";


export let OrdersContext = createContext();

export default function OrdersContextProvider(props) {

 

  async function checkOut(cartId, url, formValues) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formValues },
        { headers: { token: localStorage.getItem("user Token") } },
      )
      .then((res) => res)
      .catch((res) => res);
  }

  async function getAllOrders(cartOwner) {
    return await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`,
        { headers:{token: localStorage.getItem("user Token"),} },
       
      )
      .then((res) => res)
      .catch((res) => res);
  }




  return (
    <OrdersContext.Provider value={{checkOut,getAllOrders}}>{props.children}</OrdersContext.Provider>
  );
}
