"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import banner1 from "@images/banner/banner-1.png";
import banner2 from "@images/banner/banner-2.png";
import banner3 from "@images/banner/banner-3.png";
import banner4 from "@images/banner/banner-4.png";
import Image from "next/image";
const images = [banner1, banner2];

const Banner = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <div className="container max-w-[1232px] mx-auto">
      <div className="grid gap-4 md:flex my-5">
        <div className="w-full md:w-[67%]">
          <Carousel className="w-full " plugins={[plugin.current]}>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="">
                    <Image
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="rounded-md h-full w-full "
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="hidden md:w-[33%] w-full md:grid grid-rows-2 gap-4 h-full">
          <div className="h-full w-full">
            <Image
              src={banner3}
              alt=""
              className="h-fit w-full rounded-md"
              width={500}
              height={500}
            />
          </div>
          <div className="h-full w-full">
            <Image
              src={banner4}
              alt=""
              className="h-fit w-full rounded-md"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
