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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 6,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 400, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px", 
        },
      },
    ],
  };

  return (
    <>
      <div className="slider-container mb-10 mt-5 container mx-auto px-4">
        <Slider {...settings}>
          {data?.map((category) => (
            <div className="px-2 focus:outline-none" key={category._id}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 mx-1">
                <img
                  src={category.image}
                  className="w-full h-[250px] object-contain bg-gray-50"
                  alt={category.name}
                />
                <div className="p-3 bg-white">
                  <h2 className="text-center font-bold text-base text-gray-800 uppercase">
                    {category.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
