
import Skeleton from "react-loading-skeleton";

export default function CardSkeleton() {
  return (
    <div className=" h-[240px] w-[200px] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="aspect-w-1 aspect-h-1 bg-gray-200">
        <Skeleton height="100%" width="100%" />
      </div>

      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton height={20} width="80%" />

        {/* Category or short text */}
        <Skeleton height={16} width="60%" />

        {/* Price */}
        <Skeleton height={28} width="40%" className="mt-4" />

        {/* Button / Add to cart */}
        <Skeleton height={40} className="rounded-md w-full" />
      </div>
    </div>
  );
}