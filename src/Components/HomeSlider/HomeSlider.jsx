import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Slider from "react-slick";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import useCategories from "../../Hooks/useCategories";

export default function HomeSlider() {
  let { data, isLoading } = useCategories();

  if (isLoading) return <FullScreenLoader />;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 6, // للشاشات الكبيرة
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600, // من أول هنا ولأي شاشة أصغر (مهما كانت صغيرة)
        settings: {
          slidesToShow: 1, // صورة واحدة بس عشان تبان كبيرة
          centerMode: true,
          centerPadding: "40px", // يظهر أطراف خفيفة جداً من الصور التانية
        },
      },
    ],
  };

  return (
    <div className="slider-container mb-10 mt-5 container mx-auto px-4">
      <Slider {...settings}>
        {data?.map((category) => (
          <div className="px-2 focus:outline-none" key={category._id}>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <img
                src={category.image}
                className="w-full h-[300px] object-cover bg-gray-50"
                alt={category.name}
              />
              <div className="p-4 bg-white">
                <h2 className="text-center font-bold text-lg text-gray-800 uppercase">
                  {category.name}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
