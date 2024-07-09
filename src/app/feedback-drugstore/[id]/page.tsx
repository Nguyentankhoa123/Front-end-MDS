process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import drugstore from "@images/drugstore.svg";
import { User, CircleCheck } from "lucide-react";

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

const FeedBackDrugstore = async ({ params }: { params: { id: number } }) => {
  const res = await fetch(`${process.env.API_URL}/FeedBack/${params.id}`, {
    cache: "no-store",
  });

  const data = await res.json();

  const feedbacks: FeedBack[] = data.data;

  const totalPages = data.totalPages;

  const totalRating = feedbacks.reduce(
    (total, feedback) => total + feedback.rating,
    0
  );
  const averageRating = (totalRating / feedbacks.length).toFixed(1);

  const starCounts = [0, 0, 0, 0, 0];
  feedbacks.forEach((feedback) => {
    starCounts[feedback.rating - 1]++;
  });
  const totalReviews = feedbacks.length;

  return (
    <>
      <div className="container max-w-[1232px] mx-auto  pb-4">
        <div className="bg-[#F3F8FB] h-fit w-full">
          <div className="p-5">
            <div className="">
              <div className="flex items-center justify-center gap-3">
                <Image src={drugstore} alt="" className="w-[60px] h-[60px]" />
                <div className="flex flex-col">
                  <div className="flex gap-2 font-medium">
                    <span className="text-[16px]">
                      {feedbacks[0]?.drugstoreName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-3 ">
                <div className="flex flex-col items-center px-3 border-r border-solid border-r-neutral-300">
                  <p className="text-gray-400">Đánh giá</p>
                  {feedbacks.length > 0 ? (
                    <div className="flex gap-1">
                      <FaStar color="#FFDB04" />
                      <p>
                        {averageRating}/
                        <span className="text-gray-400">
                          {feedbacks.length}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-400">Chưa có đánh giá</p>
                  )}
                </div>
                <div className="flex flex-col items-center px-3 border-r border-solid border-r-neutral-300">
                  <p className="text-gray-400">Khoảng cách</p>
                  <span className="font-semibold">{"<"}1Km</span>
                </div>
                <div className="flex flex-col items-center px-3">
                  <p className="text-gray-400">Phản hồi chat</p>
                  <span className="font-semibold">Dưới 1 phút</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 mb-8">
          <p className="text-xl font-semibold text-center">
            Đánh giá của khách hàng
          </p>
          <div className="grid grid-cols-1 mt-5 lg:gap-14 lg:grid-cols-4">
            <div className="col-span-1">
              <p className="text-gray-400">Tổng {totalReviews} lượt đánh giá</p>
              <div>
                {[...Array(5)].map((star, i) => {
                  const starRating = 5 - i;
                  const count = starCounts[starRating - 1];
                  const widthPercentage =
                    totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                  return (
                    <div
                      className="flex items-center justify-between gap-2 my-2"
                      key={i}
                    >
                      <p className="w-[42px]">{starRating} sao</p>
                      <div className="flex items-start bg-[#d9dfe5] font-normal overflow-hidden rounded-lg h-2 text-caption w-[180px]">
                        <div
                          className="flex justify-end items-center h-full text-white rounded-lg bg-[#f99c12]"
                          style={{ width: `${widthPercentage}%` }}
                        ></div>
                      </div>
                      <span>{count}</span>
                    </div>
                  );
                })}
              </div>
              <div className="bg-neutral-100 h-[1px]"></div>
              <div className="mt-3">
                <p className="py-2 font-semibold">Đánh giá chi tiết</p>
                <div>
                  <div className="flex justify-between gap-6 py-2">
                    <p className="text-[14px]">Rất không hài lòng</p>
                    <div className="flex">
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#c1c8d2" size={20} />
                      <FaStar color="#c1c8d2" size={20} />
                      <FaStar color="#c1c8d2" size={20} />
                      <FaStar color="#c1c8d2" size={20} />
                    </div>
                  </div>
                  <div className="flex justify-between gap-6 py-2">
                    <p className="text-[14px]">Không hài lòng</p>
                    <div className="flex">
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#c1c8d2" size={20} />
                      <FaStar color="#c1c8d2" size={20} />
                      <FaStar color="#c1c8d2" size={20} />
                    </div>
                  </div>
                  <div className="flex justify-between gap-6 py-2">
                    <p className="text-[14px]">Bình thường</p>
                    <div className="flex">
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#c1c8d2" size={20} />
                      <FaStar color="#c1c8d2" size={20} />
                    </div>
                  </div>
                  <div className="flex justify-between gap-6 py-2">
                    <p className="text-[14px]">Hài lòng</p>
                    <div className="flex">
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#c1c8d2" size={20} />
                    </div>
                  </div>
                  <div className="flex justify-between gap-6 py-2">
                    <p className="text-[14px]">Hài lòng</p>
                    <div className="flex">
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#FFDB04" size={20} />
                      <FaStar color="#FFDB04" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              {feedbacks.map((feedback) => (
                <div key={feedback.id}>
                  <div className="my-5">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center rounded-full h-9 w-9 md:h-12 md:w-12 bg-[#C1C8D1]">
                        <User color="white" size={30} />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium">{feedback.userName}</p>
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
                    <div className="flex items-center gap-1 mt-2">
                      <CircleCheck size={16} color="#f60b8a" />
                      <span className="text-[14px] text-[#f60b8a]">
                        Đã mua hàng
                      </span>
                    </div>
                    <div className="mt-2">
                      <p>{feedback.review}</p>
                    </div>
                  </div>
                  <div className="bg-neutral-100 h-[1px]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBackDrugstore;
