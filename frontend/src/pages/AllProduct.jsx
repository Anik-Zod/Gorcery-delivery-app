import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import useDebounce from '../hooks/useDebounce'

function AllProduct() {
const { data:products, isLoading, isError, error, refetch } = useFetch('products', '/product/list');
const searchQuery = useSelector(state=>state.products.searchQuery)
const [filterProducts,setFilterProducts] = useState([])
const debouncedText = useDebounce(searchQuery,400)

useEffect(()=>{
  if(!products)return
   if(debouncedText?.length > 0){
     setFilterProducts(products.filter(
        product=>product.name.toLowerCase().includes(debouncedText.toLowerCase())))
   }else{
     setFilterProducts(products)
   }
},[products,debouncedText])

if(isLoading)return <h1>Loading...</h1>
if(isError)return <h1>{error}</h1>
    return (
    <div className='mt-16 flex flex-col'>
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>All Products</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
            {filterProducts?.filter(product=>product.inStock).map((product,index)=>(
                <ProductCard key={index} product={product}/>
            ))}
        </div>
    </div>
  )
}

export default AllProduct