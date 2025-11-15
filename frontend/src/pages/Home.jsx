import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLatter from '../components/NewsLatter'
import Practice from '../components/Practice'
import Banner from '../components/Banner'
import Deals from "../components/Hotdeal/Deals"

function Home() {
  return (
    <div>
        {/* <Practice/> */}
        <MainBanner/>
        {/* <Banner/> */}
        <Categories/>
        <BestSeller/>
        <div className='container'>
         <Deals/>
        </div>
        <BottomBanner/>
        <NewsLatter/>
    </div>
  )
}

export default Home