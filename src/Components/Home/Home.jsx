import React from 'react'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import HomeSlider from '../HomeSlider/HomeSlider'
import HomeSliderT from '../HomeSliderT/HomeSliderT'
export default function Home() {
  return (
    <>
    <div>
      <HomeSliderT/>
      <HomeSlider/>
      <RecentProducts/>
    </div>
    
    </>
  )
}
