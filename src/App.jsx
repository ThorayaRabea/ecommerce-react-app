import { Children, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import WishList from "./Components/Wish List/WishList";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import WhishListContextProvider from "./Context/WishListContext";
import CheckOut from "./Components/CheckOut/CheckOut";
import OrdersContextProvider from "./Context/OrdersContext";
import AllOrders from "./Components/AllOrders/AllOrders";

let query = new QueryClient();

let R = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      { path: "forget-password", element: <ForgetPassword /> },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={query}>
          <WhishListContextProvider>
            <CartContextProvider>
              <OrdersContextProvider>
                <RouterProvider router={R}></RouterProvider>
                <Toaster />
              </OrdersContextProvider>
            </CartContextProvider>
          </WhishListContextProvider>

          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
