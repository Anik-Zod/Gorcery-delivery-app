 

 import { Star } from "lucide-react";

export default function ProductReview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10 mt-16">
      
      {/* LEFT SIDE */}
      <div>
        <h2 className="text-2xl font-semibold text-green-900 border-l-5 px-5 border-primary-dull">Customer Reviews</h2>

        {/* Avg rating */}
        <div className="mt-10">
          <p className="text-5xl font-semibold text-green-900">4.7</p>

          {/* Stars */}
          <div className="flex mt-1">
            {Array(5).fill(0).map((_, i) => (
              <Star
                key={i}
                size={22}
                className="fill-green-600 text-green-600"
              />
            ))}
          </div>

          <p className="text-gray-600 text-sm mt-1">Based on 231 reviews</p>
        </div>

        {/* Recent Review */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-green-900">Recent Reviews</h3>

          <div className="mt-4 space-y-6">

            {/* ONE STATIC REVIEW */}
            <div className="flex gap-3 pb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-semibold text-green-900">
                NM
              </div>

              <div>
                <p className="font-semibold text-green-900">Noor Mohammad</p>

                <div className="flex items-center gap-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-green-600 text-green-600"
                    />
                  ))}
                  <span className="text-gray-500 text-sm ml-2">11/1/2025</span>
                </div>

                <p className="mt-1 text-gray-700 font-medium">Product overview</p>
                <p className="text-gray-600 text-sm">Really cool features and love it</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE — STATIC RATING BREAKDOWN */}
      <div className="mt-8 md:mt-18 flex flex-col gap-3">
        
        {[
          { star: 5, width: 90 },
          { star: 4, width: 40 },
          { star: 3, width: 30 },
          { star: 2, width: 20 },
          { star: 1, width: 10 },
        ].map((item) => (
          <div key={item.star} className="flex items-center gap-3">
            <span className="w-6 text-sm">{item.star}★</span>

            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{ width: `${item.width}%` }}
              ></div>
            </div>

            <span className="w-4 text-sm text-gray-600">
              {Math.round(item.width / 10)}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}
