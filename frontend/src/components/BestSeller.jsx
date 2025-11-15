import React from 'react';
import ProductCard from './ProductCard';
import useFetch from '../hooks/useFetch';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function BestSeller() {
  const { data: products, error, isError, isLoading } = useFetch("products", "/product/list");

  if (isError) return <h1>{error}</h1>;

  return (
    <div className='mt-16 container mx-auto'>
      <p className='text-2xl md:text-3xl font-medium'>Best Seller</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <Skeleton height={200} />
              <Skeleton height={20} className='mt-2' />
              <Skeleton height={20} width={80} className='mt-1' />
            </div>
          ))
        ) : (
          products
            .filter((product) => product.inStock)
            .slice(0, 5)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
        )}
      </div>
    </div>
  );
}

export default BestSeller;
