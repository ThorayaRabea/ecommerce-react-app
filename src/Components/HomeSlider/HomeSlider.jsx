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
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600, // أي حاجة أصغر من 600 (زي موبايلك)
        settings: {
          slidesToShow: 1, // صورة واحدة بس عشان تبان عملاقة
          centerMode: true,
          centerPadding: "30px", // تظهر حواف الصور اللي بعدها
        },
      },
    ],
  };

  return (
    <div className="slider-container mb-10 mt-5 container mx-auto px-4 overflow-hidden">
      <Slider {...settings}>
        {data?.map((category) => (
          <div className="px-2 focus:outline-none" key={category._id}>
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <img
                src={category.image}
                className="w-full h-[350px] object-cover bg-gray-50"
                alt={category.name}
              />
              <div className="p-4 bg-white">
                <h2 className="text-center font-black text-xl text-gray-800 uppercase tracking-tighter">
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
