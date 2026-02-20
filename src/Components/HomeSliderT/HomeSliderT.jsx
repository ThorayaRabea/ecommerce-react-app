import React from 'react'
import image1 from '../../assets/image1.jpg' 
import image2 from '../../assets/image2.jpg' 
import image3 from '../../assets/image3.jpg' 
import image4 from '../../assets/image4.jpg' 
import image5 from '../../assets/image5.jpg' 
import image6 from '../../assets/image6.png' 
import image7 from '../../assets/image7.jpeg'
import image8 from '../../assets/image8.jpeg'
import image23 from '../../assets/image23.jpeg'
import image10 from '../../assets/image10.jpeg'
import image11 from '../../assets/image11.jpeg'
import image22 from '../../assets/image22.jpeg'


import Slider from "react-slick";

export default function HomeSliderT() {
    
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay:true,
    autoplaySpeed:1500
  };

  return (
    <div className='flex flex-wrap mb-16 w-full   justify-center '>

        
            <div className='w-full md:w-1/4   overflow-hidden'>
          <Slider {...settings}>
            <img src={image7} alt=""  className='w-full object-cover h-[400px]'/>
            <img src={image8} alt=""  className='w-full object-cover h-[400px]'/>
            <img src={image2} alt="" className='w-full object-cover h-[400px]'/>
            <img src={image23} alt=""  className='w-full object-cover h-[400px]'/>
            <img src={image11} alt=""  className='w-full object-cover h-[400px]'/>
           
          </Slider>
        </div>


        <div className='w-full md:w-1/4 flex flex-col'>
        <div>
            <img src={image22} alt="" className='w-full object-cover  h-[200px]'/>
           <img src={image23} alt=""  className='w-full object-cover  h-[200px]'/>  
        </div>
        
       
        </div>

    </div>
  )
}
