import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Menu } from "lucide-react";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { setNumbersOfCartItems, numbersOfCartItems } = useContext(CartContext);
  let { userLongin, setUserLogin } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  let { getLoggedUserCart } = useContext(CartContext);
  let navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("user Token");
    setUserLogin(null);
    console.log("hello");
    navigate("/login");
  }

  useEffect(() => {
    if (localStorage.getItem("user Token")) {
      getLoggedUserCart();
    }
  }, []);

  return (
    <>
      <nav className=" border-gray-200 bg-slate-100 fixed top-0 left-0 right-0 h-16 z-50">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 ">
          <a
            href=""
            className="flex items-center space-x-1 rtl:space-x-reverse k"
          >
            <img src={logo} className="h-8 -scale-x-100" alt="Fresh Cart" />
            <span className="self-center text-2xl font-semibold  ">
              Fresh Cart
            </span>
          </a>

          <button
            className="lg:hidden text-2xl "
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Menu />
          </button>

          <div
            className={`
  absolute top-16 left-0 w-full lg:static lg:w-auto  lg:bg-transparent transition-all duration-300 
  ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}
  lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto
  bg-slate-100 
`}
          >
            {userLongin && (
              <ul className="flex flex-col gap-3 items-start lg:flex-row ps-2  lg:mb-0  mb-2 mt-16 lg:mt-auto">
                <li>
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-900 font-semibold"
                        : "hover:text-gray-900"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-900 font-semibold"
                        : "hover:text-gray-900"
                    }
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/wishlist"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-900 font-semibold"
                        : "hover:text-gray-900"
                    }
                  >
                    Wish List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-900 font-semibold"
                        : "hover:text-gray-900"
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-900 font-semibold"
                        : "hover:text-gray-900"
                    }
                  >
                    Categories
                  </NavLink>
                </li>
             
              </ul>
            )}
          </div>

          <div
            className={`
  absolute top-[calc(100%)] lg:top-0 left-0 w-full lg:static lg:w-auto bg-slate-100 lg:bg-transparent transition-all duration-300 
  ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}
  lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto
  flex flex-col items-center lg:flex-row lg:items-center lg:justify-between 
`}
          >
            {userLongin && (
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                <Link to="/cart" className="relative flex items-center group">
                  <i className="fa-solid fa-cart-shopping text-2xl text-gray-700 group-hover:text-green-600 transition-all"></i>

                  <span className="absolute -top-3 -right-2.5 bg-[#4fa74f] text-white text-[11px] font-bold h-5 w-5 flex items-center justify-center rounded-lg shadow-sm">
                    {numbersOfCartItems}
                  </span>
                </Link>

                <button
                  onClick={signOut}
                  className="text-gray-600 hover:text-red-600 font-medium transition-all"
                >
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>

          {!userLongin ? (
            <div
              className={`
  absolute top-16 left-0 w-full lg:static lg:w-auto  lg:bg-transparent transition-all duration-300 
  ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}
  lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto
  bg-slate-100 
`}
            >
              <ul className="flex flex-col gap-4  lg:flex-row ">
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-900 font-semibold"
                        : "hover:text-gray-900"
                    }
                  >
                    Log In
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-900 font-semibold"
                        : "hover:text-gray-900"
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
}
