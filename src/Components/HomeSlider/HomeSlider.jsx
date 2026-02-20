import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import useCategories from '../../Hooks/useCategories';



export default function HomeSlider() {
  
  let{data,isLoading}=useCategories()

  if(isLoading){
    return <FullScreenLoader/>
  }

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 6,
    autoplay:true,
    autoplaySpeed:2000,
    arrows:false,
    responsive:[
      {
        breakpoint:1024,
        settings:{slidesToShow:4,slidesToScroll:1}
      },
      {
        breakpoint:768,
        settings:{slidesToShow:3,slidesToScroll:1}
      },
      {
        breakpoint:480,
        settings:{slidesToShow:2,slidesToScroll:1}
      },


    ]
  };


  return (
    <>
     <div className="slider-container mb-5">
      <Slider {...settings}>
        {data?.map((category)=><div className='px-2' key={category._id}>
          <img src={category.image} className='w-full object-cover h-60' alt="" />
          <h2 className='text-center mt-2 font-medium'>{category.name}</h2>
          </div>
        )}
      </Slider>
      </div>
    
    </>
  )
}
