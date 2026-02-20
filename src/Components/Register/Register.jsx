import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";

export default function Register() {
  const [IsLoading, setIsLoading] = useState(false);
  const [ApiErrors, setApiErrors] = useState("");
  const navigate = useNavigate();

  async function handleRegister(values) {
    //response data will let me know if the submitted data is suceesed or not and Api has this message
    setIsLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("user Token", res.data.token);
          navigate("/Login");
        }
      })
      .catch((res) => {
        setIsLoading(false);
        console.log(res.response.data.message);
        setApiErrors(res.response.data.message);
      });
  }
  //validation check if data matching the condition before being send to the server
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min length is 3")
      .max(9, "max length is 9")
      .required("name is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Za-z0-9]{6,9}$/, "password should be between 6-9 char")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword and password are not the same ")
      .required("rePassword is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone number")
      .required("phone number is required"),
  });

  let formik = useFormik({
    initialValues: {
      //recieve data coming from Form
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <div className="flex justify-start px-10 pt-16">
        {IsLoading ? <FullScreenLoader /> : null}

        <div className="w-full">
          <h1 className="text-3xl font-medium mb-3 text-start ">
            register now
          </h1>
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
                htmlFor="name"
                className="block mb-2 text-base font-normal text-gray-900 text-start"
              >
                {" "}
                Name :
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                name="name"
                type="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 focus:bg-white focus:ring-2 focus:ring-offset-0 focus:outline-none "
                required
              />

              {formik.errors.name && formik.touched.name ? (
                <div
                  className="p-4 mb-4 text-sm text-red-500 rounded-md bg-red-100 mt-2 "
                  role="alert"
                >
                  <span className="font-medium ">{formik.errors.name}</span>
                </div>
              ) : null}
            </div>

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

            <div className="mb-5">
              <label
                htmlFor="re-password"
                className="block mb-2 text-base font-normal text-gray-900 text-start"
              >
                {" "}
                Re-Password :
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                name="rePassword"
                type="password"
                id="rePassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 focus:bg-white focus:ring-2 focus:ring-offset-0 focus:outline-none "
                required
              />

              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div
                  className="p-4 mb-4 text-sm text-red-500 rounded-md bg-red-100 mt-2"
                  role="alert"
                >
                  <span className="font-medium ">
                    {formik.errors.rePassword}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-base font-normal text-gray-900 text-start"
              >
                {" "}
                Phone :
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

              {formik.errors.phone && formik.touched.phone ? (
                <div
                  className="p-4 mb-4 text-sm text-red-500 rounded-md bg-red-100 mt-2"
                  role="alert"
                >
                  <span className="font-medium ">{formik.errors.phone}</span>
                </div>
              ) : null}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={` border-2 border-gray-500 font-light rounded-lg text-lg w-full sm:w-auto px-7 py-3 ${formik.isValid && formik.dirty ? "bg-green-600 text-slate-100" : "bg-white text-slate-400"} `}
                disabled={!(formik.isValid && formik.dirty)}
              >
                Register now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
