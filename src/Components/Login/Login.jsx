import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  let { userLongin, setUserLogin } = useContext(UserContext);

  const [IsLoading, setIsLoading] = useState(false);

  const [ApiErrors, setApiErrors] = useState("");
  const navigate = useNavigate();

  async function handleLogIn(values) {
    setIsLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setIsLoading(false);

        if (res.data.message == "success") {
          localStorage.setItem("user Token", res.data.token);
          setUserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        setIsLoading(false);
        console.log(res.response.data.message);
        setApiErrors(res.response.data.message);
      });
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Za-z0-9]{6,9}$/, "password should be between 6-9 char")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleLogIn,
  });

  return (
    <>
      <div className="flex justify-start px-10 pt-16">
        {IsLoading ? <FullScreenLoader /> : null}

        <div className="w-full">
          <h1 className="text-3xl font-medium mb-3 text-start ">login now</h1>
          {ApiErrors ? (
            <div
              className="p-4 mb-4 text-sm text-red-500 rounded-md bg-red-100 mt-2 "
              role="alert"
            >
              <span className="font-medium ">{ApiErrors}</span>
            </div>
          ) : null}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-normal text-gray-900 text-start"
              >
                {" "}
                Email :
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 focus:bg-white focus:ring-2 focus:ring-offset-0 focus:outline-none "
                required
              />

              {formik.errors.email && formik.touched.email ? (
                <div
                  className="p-4 mb-4 text-sm text-red-500 rounded-md bg-red-100 mt-2"
                  role="alert"
                >
                  <span className="font-medium ">{formik.errors.email}</span>
                </div>
              ) : null}
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-base font-normal text-gray-900 text-start"
              >
                {" "}
                Password :
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 focus:bg-white focus:ring-2 focus:ring-offset-0 focus:outline-none "
                required
              />

              {formik.errors.password && formik.touched.password ? (
                <div
                  className="p-4 mb-4 text-sm text-red-500 rounded-md bg-red-100 mt-2"
                  role="alert"
                >
                  <span className="font-medium ">{formik.errors.password}</span>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 mt-4">
              <NavLink
                to="/forget-password"
                className="text-lg md:text-xl font-semibold hover:text-green-500 transition duration-500 text-center md:text-start"
              >
                forget your password ?
              </NavLink>

              <button
                type="submit"
                className={`border-2 border-gray-500 font-light rounded-lg text-lg w-full md:w-auto px-10 py-3 transition-all duration-300 ${
                  formik.isValid && formik.dirty
                    ? "bg-green-600 text-slate-100 border-green-600"
                    : "bg-white text-slate-400 cursor-not-allowed"
                }`}
                disabled={!(formik.isValid && formik.dirty)}
              >
                Login now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
