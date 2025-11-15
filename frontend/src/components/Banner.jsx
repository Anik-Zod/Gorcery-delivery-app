import { useEffect, useRef, useState } from "react";

const images = [
 'banner1.png',
 'banner2.png',
 'banner3.png',
 'banner4.png',
 
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef(null);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  // Auto sliding every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col mt-10 items-center w-full container mx-auto">
      {/* Slider container */}
      <div className="w-full max-w-[1200px] h-[500px] overflow-hidden relative">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full object-fill flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center mt-5 space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              current === index ? "bg-black" : "bg-black/20"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
