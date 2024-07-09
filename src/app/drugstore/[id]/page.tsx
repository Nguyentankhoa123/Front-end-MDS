"use server";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import React from "react";
import drugstore from "@images/drugstore.svg";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import reviewer from "@images/feedback/Reviewer.png";
import { User } from "lucide-react";
import freeship from "@images/freeship.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductList, {
  ProductProps,
} from "@/components/productlist/ProductList";

type FeedBack = {
  id: number;
  userId: string;
  drugstoreId: string;
  productId: number;
  drugstoreName: string;
  userName: string;
  rating: number;
  ratingDescription: string;
  review: string;
};

const DrugstoreDetail = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(
    `${process.env.API_URL}/Product/GetProduct?id=${params.id}&pageNumber=1&pageSize=5`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const products: ProductProps[] = data.data;

  const totalPages = data.totalPages;

  const resFeedback = await fetch(
    `${process.env.API_URL}/FeedBack/${params.id}`,
    {
      cache: "no-store",
    }
  );

  const dataFeedback = await resFeedback.json();
  const feedbacks: FeedBack[] = dataFeedback.data;

  return (
    <>
      <div className="container max-w-[1232px] mx-auto  pb-4">
        <div className="bg-[#F3F8FB] h-fit w-full">
          <div className="p-5">
            <div className="grid grid-cols-1 lg:grid-cols-5 ">
              <div className="flex items-center justify-center gap-3 pb-5 lg:pb-0 lg:justify-normal lg:col-span-2">
                <Image src={drugstore} alt="" className="w-[60px] h-[60px]" />
                <div className="flex flex-col">
                  <div className="flex gap-2 font-medium">
                    <span className="text-[16px]">
                      {products[0]?.drugstoreName}
                    </span>
                    <Image src={freeship} alt="" />
                  </div>
                  <Link
                    href={`/danh-gia-nha-thuoc/${params.id}`}
                    className="text-blue-500"
                  >
                    Xem đánh giá
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 pb-5 lg:pb-0 lg:col-span-2">
                <div className="flex flex-col items-center pr-3 border-r border-solid border-r-neutral-300">
                  <p className="text-gray-400">Đánh giá</p>
                  <div className="flex gap-1">
                    {feedbacks.length > 0 ? (
                      [...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                          <FaStar
                            key={i}
                            color={
                              ratingValue <= feedbacks[0].rating
                                ? "#FFDB04"
                                : "#c1c8d2"
                            }
                            size={20}
                          />
                        );
                      })
                    ) : (
                      <p>Chưa có đánh giá</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center pr-3 border-r border-solid border-r-neutral-300">
                  <p className="text-gray-400">Khoảng cách</p>
                  <span className="font-semibold">{"<"}1Km</span>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-gray-400">Phản hồi chat</p>
                  <span className="font-semibold">Dưới 1 phút</span>
                </div>
              </div>
              {/* <div className="flex items-center justify-center col-span-1">
                <button className=" px-2 py-2  text-white outline-none border border-solid bg-[#0072bc] rounded-lg hover:bg-[#005596]">
                  <span className="text-sm">Liên hệ nhà thuốc</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="mt-5 mb-8">
          <p className="text-xl font-semibold">Đánh giá của khách hàng</p>
          <div className="flex gap-3 mt-3">
            <div>
              <Image src={reviewer} alt="" className="h-[220px] w-[295px]" />
            </div>
            <Carousel
              opts={{
                align: "start",
              }}
              className="flex-1"
            >
              <CarouselContent>
                {feedbacks.map((feedback, index) => (
                  <CarouselItem className="basis-1/2 md:basis-1/3 " key={index}>
                    <div className="bg-[#F3F8FB] h-[220px] max-w-[315px] rounded-xl">
                      <div className="p-7">
                        <div className="flex gap-2">
                          <div className="flex items-center justify-center rounded-full h-9 w-9 md:h-12 md:w-12 bg-[#C1C8D1]">
                            <User color="white" size={30} />
                          </div>
                          <div className="flex flex-col ">
                            <p>{feedback.userName}</p>
                            <div className="flex">
                              {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return (
                                  <FaStar
                                    key={i}
                                    color={
                                      ratingValue <= feedback.rating
                                        ? "#FFDB04"
                                        : "#c1c8d2"
                                    }
                                    size={20}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p>{feedback.review}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
      <ProductList
        products={products ? products : []}
        totalPages={totalPages}
        drugstoreId={params.id}
      />
    </>
  );
};

export default DrugstoreDetail;
