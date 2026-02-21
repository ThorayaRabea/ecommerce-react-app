import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import useCategories from "../../Hooks/useCategories";

export default function HomeSlider() {
  let { data, isLoading } = useCategories();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 6, // ده للشاشات الكبيرة جداً
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200, // شاشات اللابتوب
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 992, // التابلت
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 600, // الموبايلات الكبيرة
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480, // الموبايلات الصغيرة
        settings: {
          slidesToShow: 2, // أهم سطر: يظهر 2 بس
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      <div className="slider-container mb-10 mt-5 container mx-auto px-4">
        <Slider {...settings}>
          {data?.map((category) => (
            <div className="px-1 md:px-2" key={category._id}>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  className="w-full aspect-square object-contain rounded-full bg-gray-100 p-2"
                  alt={category.name}
                />
              </div>
              <h2 className="text-center mt-2 font-semibold text-sm md:text-base text-gray-700">
                {category.name}
              </h2>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
