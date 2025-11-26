import React from 'react'
import {motion} from 'motion/react'
import ProductCard from './Product/ProductCard'

function Practice() {
  return (
    <div className='h-screen w-full'>
       <motion.div
       
       className='size-20 mt-200 ml-200 item bg-primary'> hi
       </motion.div>
       <ProductCard/>
    </div>
  )
}

export default Practice