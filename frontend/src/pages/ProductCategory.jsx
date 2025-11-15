import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/useFetch";

function ProductCategory() {
  const { category } = useParams();
  console.log("Category:", category);

  const {
    data: products,
    error,
    isError,
    isLoading,
  } = useFetch('category',`/product/list/${category}`);

  console.log("Products:", products);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error}</h1>;

  return (
    <div className="container mt-16">
      {products && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium">
            {category.toUpperCase()}
          </p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
      )}

      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
          {products.map((product, index) => (
            <ProductCard key={product._id || index} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No Product Found</p>
        </div>
      )}
    </div>
  );
}

export default ProductCategory;
