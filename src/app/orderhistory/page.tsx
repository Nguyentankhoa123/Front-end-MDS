"use client";
import React, { useEffect, useState } from "react";
import image from "@images/category/beauty-care-1.png";
import Image from "next/image";
import { useCookies } from "next-client-cookies";
import { JwtPayload, jwtDecode } from "jwt-decode";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Store, X } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { Console } from "console";
import { toast } from "sonner";
import Link from "next/link";

interface MyToken extends JwtPayload {
  given_name: string;
  family_name: string;
  nameid: string;
}

interface OrderDetail {
  pictureUrls: string;
  price: number;
  quantity: number;
  total: number;
  name: string;
  orderStatus: string;
  drugstoreId: string;
  isReviewed: boolean;
  productId: number;
  drugstoreName: string;
}

interface OrderHistoryItem {
  carrier: string;
  createOn: string;
  paymentStatus: string;
  shippingType: string;
  totalPrice: number;
  orderDetails: OrderDetail[];
}

const OrderHistory = () => {
  const [isActive, setIsActive] = useState("all");
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState<string>("");
  const [ratingDescription, setRatingDescription] = useState<string>("");
  const [currentDrugstoreId, setCurrentDrugstoreId] = useState<string>("");
  const [currentProductId, setCurrentProductId] = useState<number>();
  const descriptions = [
    "Rất không hài lòng",
    "Không hài lòng",
    "Bình thường",
    "Hài lòng",
    "Rất hài lòng",
  ];

  const cookies = useCookies();
  const token = cookies.get("accessToken");
  let userId: string | undefined;
  if (token) {
    const decodeToken = jwtDecode<MyToken>(token);
    userId = decodeToken.nameid;
  }

  const getOrderHistory = async () => {
    const res = await fetch(`https://localhost:7151/api/Order/${userId}`, {
      cache: "no-store",
    });

    if (res.status === 200) {
      const data = await res.json();
      const allOrders = data.data;
      let filteredOrders;

      if (isActive === "all") {
        filteredOrders = allOrders;
      } else {
        filteredOrders = allOrders.filter((order: OrderHistoryItem) =>
          order.orderDetails.some((detail) => detail.orderStatus === isActive)
        );
      }

      setOrderHistory(filteredOrders);
    }
  };

  useEffect(() => {
    getOrderHistory();
  }, [isActive]);

  const handleFeedback = async () => {
    try {
      const res = await fetch(`https://localhost:7151/api/Feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: userId,
          DrugstoreId: currentDrugstoreId,
          ProductId: currentProductId,
          Rating: rating,
          review: review,
          RatingDescription: descriptions[rating - 1],
        }),
      });
      if (res.ok) {
        setIsOpenFeedback(false);
        setRating(0);
        setReview("");
        setRatingDescription("");
        toast.success("Đánh giá đã được gửi");

        getOrderHistory();
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="bg-[#F7F7F7]">
        <div className="container max-w-[1232px] mx-auto">
          <div className="py-5">
            <h1 className="text-base font-semibold text-neutral-900 md:text-2xl md:font-bold">
              Lịch sử đơn hàng
            </h1>
            {/* <div className="w-full mt-5 bg-white rounded-md h-fit"> */}
            <div className="relative flex mt-5 bg-white">
              <div
                className={`${
                  isActive === "all" && "font-medium text-black !opacity-100"
                } py-3 px-4 w-1/6 flex justify-center cursor-pointer opacity-50`}
                onClick={() => setIsActive("all")}
              >
                <div>Tất cả</div>
              </div>
              <div
                className={`${
                  isActive === "Đang xử lý" &&
                  "font-medium text-black !opacity-100"
                } py-3 px-4 w-1/6 flex justify-center cursor-pointer opacity-50`}
                onClick={() => setIsActive("Đang xử lý")}
              >
                <div>Đang xử lý</div>
              </div>
              <div
                className={`${
                  isActive === "Đang giao" &&
                  "font-medium text-black !opacity-100"
                } py-3 px-4 w-1/6 flex justify-center cursor-pointer opacity-50`}
                onClick={() => setIsActive("Đang giao")}
              >
                <div>Đang giao</div>
              </div>
              <div
                className={`${
                  isActive === "Đã giao" &&
                  "font-medium text-black !opacity-100"
                } py-3 px-4 w-1/6 flex justify-center cursor-pointer opacity-50`}
                onClick={() => setIsActive("Đã giao")}
              >
                <div>Đã giao</div>
              </div>
              <div
                className={`${
                  isActive === "Đã hủy" && "font-medium text-black !opacity-100"
                } py-3 px-4 w-1/6 flex justify-center cursor-pointer opacity-50`}
                onClick={() => setIsActive("Đã hủy")}
              >
                <div>Đã hủy</div>
              </div>
              <div
                className={`${
                  isActive === "Trả hàng" &&
                  "font-medium text-black !opacity-100"
                } py-3 px-4 w-1/6 flex justify-center cursor-pointer opacity-50`}
                onClick={() => setIsActive("Trả hàng")}
              >
                <div>Trả hàng</div>
              </div>
              <div
                className={`border-b-2 border-[#0072bc] w-1/6 absolute bottom-0 transition-all duration-300 ease-in-out ${
                  isActive === "all"
                    ? "left-0"
                    : isActive === "Đang xử lý"
                    ? "left-[16.666%]"
                    : isActive === "Đang giao"
                    ? "left-[33.333%]"
                    : isActive === "Đã giao"
                    ? "left-[50%]"
                    : isActive === "Đã hủy"
                    ? "left-[66.666%]"
                    : isActive === "Trả hàng"
                    ? "left-[83.333%]"
                    : ""
                }`}
              ></div>
            </div>
            {orderHistory.map((item) => (
              <div className="relative mt-5 bg-white ">
                <div className="grid gap-6 py-3 pl-12 pr-16 mt-5">
                  {item.orderDetails.map((detail) => (
                    <div>
                      <Link
                        href={`/danh-sach-nha-thuoc/${detail.drugstoreId}`}
                        className="flex items-center gap-2"
                      >
                        <Store size={16} />
                        <p className="text-blue-500">{detail.drugstoreName}</p>
                      </Link>
                      <div className="flex justify-between mt-6">
                        <div className="flex items-center">
                          {item.orderDetails.length > 0 && (
                            <Image
                              src={detail.pictureUrls}
                              alt=""
                              width={100}
                              height={100}
                            />
                          )}
                          <div className="ml-3">
                            <p>{detail.name}</p>
                            <span>x{detail.quantity}</span>
                            <div className="mt-1 py-1 px-2 bg-[#eaeffa] w-fit text-[#1250dc] font-medium rounded-lg flex justify-center items-center text-[15px]">
                              {detail.orderStatus}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm font-semibold line-clamp-2 text-neutral-900">
                            {detail.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="h-[1px] w-full bg-neutral-200 hidden md:block"></div>
                  <div>
                    <p className="float-right text-[16px] font-semibold line-clamp-2 text-neutral-900">
                      Thành tiền:{" "}
                      <span className="text-red-500">
                        {item.totalPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </p>
                  </div>
                  {/* {item.orderDetails.every(
                    (detail) => detail.orderStatus === "Đã giao"
                  ) && (
                    <div className="mb-2">
                      <button
                        className="float-end w-fit px-4 py-2 text-sm text-white outline-none border border-solid bg-[#0072bc] rounded-lg hover:bg-[#005596]"
                        onClick={() => setIsOpenFeedback(true)}
                      >
                        <span>Đánh giá sản phẩm</span>
                      </button>
                    </div>
                  )} */}
                  {item.orderDetails.map((detail) => (
                    <div>
                      {detail.orderStatus === "Đã giao" &&
                        !detail.isReviewed && (
                          <div className="mb-2">
                            <button
                              className="float-end w-fit px-4 py-2 text-sm text-white outline-none border border-solid bg-[#0072bc] rounded-lg hover:bg-[#005596]"
                              onClick={() => {
                                setCurrentDrugstoreId(detail.drugstoreId);
                                setCurrentProductId(detail.productId);
                                setIsOpenFeedback(true);
                              }}
                            >
                              <span>Đánh giá sản phẩm</span>
                            </button>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* </div> */}
          </div>
        </div>
      </div>

      <AlertDialog open={isOpenFeedback}>
        <AlertDialogContent className="p-0">
          <AlertDialogTitle className="flex items-center px-6 pt-6 text-center">
            <span className="flex-1">Đánh giá trải nghiệm mua hàng</span>
            <X
              onClick={() => setIsOpenFeedback(false)}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <div className="h-[1px] w-full bg-neutral-200 hidden md:block"></div>
          <div className="px-6 pt-1 pb-5">
            <p className="text-xl font-semibold text-center">
              {rating > 0 ? descriptions[rating - 1] : ""}
            </p>
            <div className="flex justify-between gap-4 mt-3">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      className="hidden"
                    />
                    <FaStar
                      color={ratingValue <= rating ? "#FFDB04" : "#c1c8d2"}
                      size={40}
                      className="transition-all duration-300 ease-out cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <div className="px-6 py-2">
            <textarea
              name=""
              id=""
              className="w-full px-4 py-3 border rounded-lg resize-none focus:border-[#1250dc] outline-none"
              rows={5}
              placeholder="Hãy để chúng tôi hiểu hơn"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
          <div className="px-6 pt-2 pb-4">
            <button
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-xl"
              onClick={handleFeedback}
            >
              <span>Gửi đánh giá</span>
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrderHistory;
