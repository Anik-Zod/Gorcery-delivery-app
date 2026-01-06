import React from 'react'
import Deals from '../components/Hotdeal/Deals'
import FeaturesSection from '../components/Hotdeal/FeaturesSection'
import DealsBanner from '../components/Hotdeal/DealsBanner'

function HotDeals() {
  return (
    <div className='sm:px-10 px-3 mt-16'>
        <Deals/>
        <FeaturesSection/>
        <DealsBanner/>
    </div>
  )
}

export default HotDeals