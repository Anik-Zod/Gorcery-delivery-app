import { Clock, CloudLightning, Heart, Star } from "lucide-react";

 export default function FeaturesSection() {
  const features = [
    {
      icon: <CloudLightning/>,
      color: "text-yellow-500",
      border: "border-yellow-200",
      bg: "bg-yellow-50",
      title: "Lightning Deals",
      desc: "Flash sales with limited time offers",
    },
    {
      icon: <Star/>,
      color: "text-purple-500",
      border: "border-purple-200",
      bg: "bg-purple-50",
      title: "Premium Quality",
      desc: "Top-rated products with best reviews",
    },
    {
      icon: <Heart/>,
      color: "text-pink-500",
      border: "border-pink-200",
      bg: "bg-pink-50",
      title: "Customer Favorites",
      desc: "Most loved items by our customers",
    },
    {
      icon: <Clock/>,
      color: "text-red-500",
      border: "border-red-200",
      bg: "bg-red-50",
      title: "Limited Time",
      desc: "Hurry! These deals won't last long",
    },
  ];

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-4  gap-6 p-6">
      {features.map((item, i) => (
        <div
          key={i}
          className={`rounded-3xl border-2 ${item.border} shadow-sm ${item.bg} p-10 flex flex-col items-center text-center gap-4`}
        >
          <div className={`text-4xl ${item.color}`}>{item.icon}</div>
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-gray-600 max-w-[250px]">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}