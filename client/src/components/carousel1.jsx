import { Carousel, Typography } from "@material-tailwind/react";
import React from "react";
import "../index.css";



export function CarouselCustomNavigation() {
  return (
    <Carousel
      className="pt-[0px] h-[725px] z-1"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-6 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      autoplay={true}
      autoplayInterval={2000} // 2 seconds interval
      autoplayReverse={true} // Reverse direction when reaching the end
      infinite={true} // Infinite loop
    >
      <div className="relative h-full w-full">
        <img
          src="./src/assets/images/i1.jpg"
          alt="image 1"
          className="h-[725px] w-screen object-image"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Baked with Freshness
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              We  make delicious bakery product using fresh, high-quality ingredients. Order the product of your choice and taste the flavors of Asia at our bakery.   
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="./src/assets/images/i2.jpg"
          alt="image 2"
          className="h-[725px] w-screen object-image"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Baked with Love. Made Fresh Daily.
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Experience the joy of homemade goodness. Baked with love, just for you. Indulge in our delicious creations, where every bite is bursting with love.
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="./src/assets/images/i3.jpg"
          alt="image 2"
          className="h-[725px] w-screen object-image"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Served with Taste
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80 "
            >
              Fresh flavors, masterfully prepared.We elevate your dining experience. Fresh ingredients, bursting with flavor.
            </Typography>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
