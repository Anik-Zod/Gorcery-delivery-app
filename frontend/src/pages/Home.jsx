import React from 'react'
import MainBanner from '../components/Banners/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/Banners/BottomBanner'
import NewsLatter from '../components/Banners/NewsLatter'
import Practice from '../components/Practice'

import Deals from "../components/Hotdeal/Deals"

function Home() {
  return (
    <div>
        {/* <Practice/> */}
        <MainBanner/>
        <div className='container mt-22'>
         <Deals/>
        </div>
        <Categories/>
        <BestSeller/> 
        <BottomBanner/>
        <NewsLatter/>
    </div>
  )
}

export default Home