"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";

import Image from "next/image";
import { ProductProps } from "../productlist/ProductList";
const SwiperImage = ({ id }: { id: number }) => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [swiperIndex, setSwiperIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://localhost:7151/api/Product/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProduct();
  }, [id]);
  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        onSlideChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
      >
        {product?.pictureUrls.map((url) => (
          <SwiperSlide key={url}>
            <Image
              src={url}
              alt=""
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        className="mt-2 mySwiper"
      >
        {product?.pictureUrls.map((url, index) => (
          <SwiperSlide key={url}>
            <Image
              src={url}
              alt=""
              width={500}
              height={500}
              className={`w-full h-auto cursor-pointer ${
                swiperIndex === index ? "border-2 border-blue-500" : ""
              }`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperImage;
