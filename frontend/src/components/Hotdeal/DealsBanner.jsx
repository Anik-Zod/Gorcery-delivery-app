export default function DealsBanner() {
  return (
    <div className=" w-full rounded-3xl p-10 md:p-16 bg-gradient-to-r from-green-900 to-green-500 text-white flex flex-col items-center text-center gap-6">
      
      <h2 className="text-3xl md:text-4xl font-bold">
        Don't Miss Out on These Amazing Deals!
      </h2>

      <p className="text-lg max-w-2xl text-gray-200">
        Subscribe to our newsletter to get notified about flash sales, exclusive deals, and new arrivals.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <button className="px-8 py-3 bg-white text-black rounded-lg text-lg font-medium shadow-md hover:opacity-90 transition">
          Explore All Products
        </button>

        <button className="px-8 py-3 border border-white text-white rounded-lg text-lg font-medium hover:bg-white hover:text-black transition">
          Subscribe for Deals
        </button>
      </div>

    </div>
  );
}
