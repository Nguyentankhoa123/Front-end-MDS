process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import React from "react";
import Banner from "../Banner/Banner";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import banner1 from "@images/test.png";
import { ProductProps } from "../productlist/ProductList";

const tests = [
  {
    image: banner1,
    title: "Tiep tuc mua hang",
    price: 500000,
    sold: 1000,
  },
  {
    image: banner1,
    title: "San pham moi",
    price: 100000,
    sold: 50000,
  },
  {
    image: banner1,
    title: "San pham moi",
    price: 100000,
    sold: 50000,
  },
  {
    image: banner1,
    title: "San pham moi",
    price: 100000,
    sold: 50000,
  },
  {
    image: banner1,
    title: "San pham moi",
    price: 100000,
    sold: 50000,
  },
  {
    image: banner1,
    title: "San pham moi",
    price: 100000,
    sold: 50000,
  },
];

const formatSold = (sold: number): string => {
  if (sold >= 1000) {
    return (sold / 1000).toFixed(1) + "K";
  }
  return sold.toString();
};

const HomePage = async () => {
  const res = await fetch(
    "https://localhost:7151/api/Product?pageNumber=1&pageSize=999999",
    { cache: "no-store" }
  );

  const data = await res.json();
  const products: ProductProps[] = data.data;

  return (
    <>
      <Banner />
      <div className="w-full h-3 bg-neutral-100"></div>
      <div className="container pb-4 max-w-[1232px] mx-auto">
        <div className="flex items-center p-4 md:px-0">
          <h4 className="flex-1 font-semibold text-base md:text-[20px]">
            Siêu Deals Online
          </h4>
          <Link href="" className="text-sm text-blue-600 md:text-base">
            Xem thêm
          </Link>
        </div>
        <div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent className="h-auto">
              {products.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <div className="p-1">
                    <Link
                      href={`/${product.id}`}
                      className="flex flex-col pb-2  overflow-hidden border rounded-lg shadow-sm ease-out duration-300 transition-all hover:border-[#1250dc] "
                    >
                      <Image
                        src={product.pictureUrls[0]}
                        alt=""
                        className="w-full"
                        width={500}
                        height={500}
                      />
                      <div className="flex flex-col px-2 pb-1">
                        <h3 className="mt-2 mb-5 text-[16px] font-semibold work-break">
                          {product.name}
                        </h3>
                        <div className="flex flex-col mt-auto">
                          <span className="text-[#1250dc] font-semibold">
                            {product.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                            <span className="font-normal">/Hộp</span>
                          </span>
                          <span className="text-[14px]">
                            Đã bán {formatSold(product.soldQuantity)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="w-full h-3 bg-neutral-100"></div>
      <div className="container pb-4 max-w-[1232px] mx-auto">
        <div className="flex items-center p-4 md:px-0">
          <h4 className="flex-1 font-semibold text-base md:text-[20px]">
            Tóp bán chạy toàn quốc
          </h4>
          <Link href="" className="text-sm text-blue-600 md:text-base">
            Xem thêm
          </Link>
        </div>
        <div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent className="h-auto">
              {products.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                  <div className="p-1">
                    <Link
                      href={`/${product.id}`}
                      className="flex flex-col pb-2  overflow-hidden border rounded-lg shadow-sm ease-out duration-300 transition-all hover:border-[#1250dc]"
                    >
                      <Image
                        src={product.pictureUrls[0]}
                        alt=""
                        className="w-full"
                        width={500}
                        height={500}
                      />
                      <div className="flex flex-col px-2 pb-1">
                        <h3 className="mt-2 mb-5 text-[16px] font-semibold work-break">
                          {product.name}
                        </h3>
                        <div className="flex flex-col mt-auto">
                          <span className="text-[#1250dc] font-semibold">
                            {product.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                            <span className="font-normal">/Hộp</span>
                          </span>
                          <span className="text-[14px]">
                            Đã bán {formatSold(product.soldQuantity)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="w-full h-3 bg-neutral-100"></div>
      <div className="container pb-4 max-w-[1232px] mx-auto">
        <div className="flex items-center p-4 md:px-0">
          <h4 className="flex-1 font-semibold text-base md:text-[20px]">
            Tủ thuốc gia đình
          </h4>
          <Link href="" className="text-sm text-blue-600 md:text-base">
            Xem thêm
          </Link>
        </div>
        <div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent className="h-auto">
              {products.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                  <div className="p-1">
                    <Link
                      href={`/${product.id}`}
                      className="flex flex-col pb-2  overflow-hidden border rounded-lg shadow-sm ease-out duration-300 transition-all hover:border-[#1250dc]"
                    >
                      <Image
                        src={product.pictureUrls[0]}
                        alt=""
                        className="w-full"
                        width={500}
                        height={500}
                      />
                      <div className="flex flex-col px-2 pb-1">
                        <h3 className="mt-2 mb-5 text-[16px] font-semibold work-break">
                          {product.name}
                        </h3>
                        <div className="flex flex-col mt-auto">
                          <span className="text-[#1250dc] font-semibold">
                            {product.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                            <span className="font-normal">/Hộp</span>
                          </span>
                          <span className="text-[14px]">
                            Đã bán {formatSold(product.soldQuantity)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="w-full h-3 bg-neutral-100"></div>
      <div className="container pb-4 max-w-[1232px] mx-auto">
        <div className="flex items-center p-4 md:px-0">
          <h4 className="flex-1 font-semibold text-base md:text-[20px]">
            Sản phẩm mới
          </h4>
          <Link href="" className="text-sm text-blue-600 md:text-base">
            Xem thêm
          </Link>
        </div>
        <div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent className="h-auto">
              {products.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                  <div className="p-1">
                    <Link
                      href={`/${product.id}`}
                      className="flex flex-col pb-2  overflow-hidden border rounded-lg shadow-sm ease-out duration-300 transition-all hover:border-[#1250dc]"
                    >
                      <Image
                        src={product.pictureUrls[0]}
                        alt=""
                        className="w-full"
                        width={500}
                        height={500}
                      />
                      <div className="flex flex-col px-2 pb-1">
                        <h3 className="mt-2 mb-5 text-[16px] font-semibold work-break">
                          {product.name}
                        </h3>
                        <div className="flex flex-col mt-auto">
                          <span className="text-[#1250dc] font-semibold">
                            {product.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                            <span className="font-normal">/Hộp</span>
                          </span>
                          <span className="text-[14px]">
                            Đã bán {formatSold(product.soldQuantity)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default HomePage;
