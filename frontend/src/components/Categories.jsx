import { useNavigate } from "react-router-dom";
import useFetch from '../hooks/useFetch';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Move this above the component
const bgColor = [
  "#FEF6DA",
  "#FEE0E0",
  "#F0F5DE",
  "#E1F5EC",
  "#FEE6CD",
  "#E0F6FE",
  "#F1E3F9"
];

function Categories() {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useFetch('category', '/product/getCategory');

  return (
    <div className="container mx-auto mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>

      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 mt-6">
        {isLoading
          ? Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
              >
                <Skeleton height={140} width={140} />
                <Skeleton height={15} width={60} className="mt-2" />
              </div>
            ))
          : categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center hover:shadow-lg transition"
                style={{ backgroundColor: bgColor[index % bgColor.length] }}
                onClick={() => navigate(`/products/${category.category}`)}
              >
                <img
                  src={category.image}
                  alt={category.text}
                  loading="lazy"
                  className="group-hover:scale-110 transition duration-300 max-w-28"
                />
                <p className="text-sm font-medium">{category.category}</p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Categories;
