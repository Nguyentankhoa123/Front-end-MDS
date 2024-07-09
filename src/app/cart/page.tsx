"use client";
import { useCartStore } from "@/store/cart";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Plus, Minus, Trash2, TicketPercent, Store } from "lucide-react";
import delivery from "@images/Delivery.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { JwtPayload, jwtDecode } from "jwt-decode";
import Link from "next/link";
import emptyCart from "@images/empty-cart.png";
import EmptyCart from "@/components/emptycart/page";
import { resolve } from "path";
import SkeletonCart from "@/components/skeletonCart/SkeletonCart";

interface MyToken extends JwtPayload {
  nameid: string;
}

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isRemoveAll, setIsRemoveAll] = useState(false);

  const { cartItems, fetchCart } = useCartStore();

  const cookies = useCookies();
  const token = cookies.get("accessToken");
  let userId: string | undefined;
  if (token) {
    const decodeToken = jwtDecode<MyToken>(token);
    userId = decodeToken.nameid;
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const removeItem = async (productId: number) => {
    try {
      const res = await fetch(
        `https://localhost:7151/api/Cart/Remove?userId=${userId}&productId=${productId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to remove item");
      }

      if (userId) {
        await useCartStore.getState().fetchCart(userId);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const decreaseQuantity = async (productId: number) => {
    try {
      const item = cartItems.find((item) => item.productId === productId);

      if (item?.quantity === 1) {
        setIsAlertOpen(true);
      }

      const res = await fetch(
        `https://localhost:7151/api/Cart/Decrease?userId=${userId}&productId=${productId}&quantity=1`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to decrease quantity");
      }

      if (userId) {
        await useCartStore.getState().fetchCart(userId);
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const increaseQuantity = async (productId: number) => {
    try {
      const item = cartItems.find((item) => item.productId === productId);

      const res = await fetch(
        `https://localhost:7151/api/Cart?userId=${userId}&productId=${productId}&quantity=1`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to decrease quantity");
      }

      if (userId) {
        await useCartStore.getState().fetchCart(userId);
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const removeAllItem = async () => {
    try {
      const res = await fetch(
        `https://localhost:7151/api/Cart/RemoveAll?userId=${userId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to remove all item");
      }

      if (userId) {
        await useCartStore.getState().fetchCart(userId);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const [isLoadingCallAPI, setIsLoadingCallAPI] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchCart(userId).finally(() => {
        setIsLoadingCallAPI(false);
      });
    }
  }, [fetchCart, userId]);

  return (
    <>
      <div className="bg-[#F7F7F7] ">
        {isLoadingCallAPI ? (
          <SkeletonCart />
        ) : cartItems.length > 0 ? (
          <div className="container max-w-[1232px] mx-auto ">
            <div className="relative grid items-start gap-4 md:container md:grid-cols-1 md:pb-4 md:pt-6 lg:grid-cols-[min(72%,calc(896rem/16)),1fr]">
              <div className="grid gap-4">
                <div className="grid gap-6 p-4 bg-white rounded-sm md:p-6">
                  <div className="items-center justify-between hidden grid-flow-col gap-4 md:grid">
                    <h1 className="text-base font-semibold text-neutral-900 md:text-2xl md:font-bold">
                      Giỏ hàng
                    </h1>
                    <button
                      className="text-blue-500"
                      onClick={() => {
                        setIsAlertOpen(true);
                        setIsRemoveAll(true);
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                  <div className="grid gap-2 md:gap-6">
                    <div className="grid grid-cols-[24px_1fr] items-center gap-2 rounded-xl bg-[#e3f7fc] py-4 pe-4 ps-3 md:rounded-sm md:p-2">
                      <div className="relative w-6 h-6">
                        <Image src={delivery} alt="" />
                      </div>
                      <p className="text-sm font-medium text-neutral-900">
                        Miễn phí vận chuyển cho mọi đơn hàng đến hết tháng 7
                      </p>
                    </div>

                    <div className="hidden gap-2 md:grid md:gap-6">
                      <div className="grid grid-cols-[calc(68rem/16)_1fr] items-start gap-2">
                        <p className="relative h-[calc(30rem/16)] w-[calc(80rem/16)] rounded-sm flex items-center">
                          Sản phẩm
                        </p>
                        <div className="flex flex-col items-center justify-between h-full md:flex-row md:space-x-4">
                          <div className="grid content-start flex-1 gap-1"></div>
                          <div className="flex items-center justify-between space-x-4 h-fit md:justify-center">
                            <p className="flex flex-col justify-center md:w-[calc(160rem/16)] md:flex-row md:space-x-1">
                              Đơn giá
                            </p>
                            <p className="flex w-[calc(117rem/16)] items-center justify-end  self-end md:justify-center md:self-center">
                              Số lượng
                            </p>
                            <p className="hidden w-[calc(120rem/16)] items-center justify-end md:flex">
                              Thành tiền
                            </p>
                            <div className="w-4" />
                          </div>
                        </div>
                      </div>
                      <div className="h-[1px] w-full bg-neutral-200 hidden md:block"></div>
                    </div>

                    <div className="grid gap-2 mt-5 md:mt-0 md:gap-6">
                      {cartItems.map((item) => (
                        <div className="grid gap-2 md:gap-6">
                          <Link
                            href={`/danh-sach-nha-thuoc/${item.drugstoreId}`}
                            className="flex items-center gap-2"
                          >
                            <Store size={16} />
                            <p className="text-blue-500">
                              {item.drugstoreName}
                            </p>
                          </Link>
                          <div
                            className="grid grid-cols-[calc(68rem/16)_1fr] items-start gap-2"
                            key={item.productId}
                          >
                            <div className="relative h-[calc(68rem/16)] w-[calc(68rem/16)] rounded-sm border border-neutral-100">
                              <Image
                                src={item.pictureUrls[0]}
                                alt=""
                                width={500}
                                height={500}
                                className="w-[60px] h-[60px]"
                              />
                            </div>
                            <div className="flex flex-col justify-between h-full md:items-center md:flex-row md:space-x-4">
                              <div className="grid content-start flex-1 gap-1">
                                <p className="text-sm font-semibold line-clamp-2 text-neutral-900">
                                  {item.name}
                                </p>
                              </div>
                              <div className="flex justify-between space-x-4 md:items-center h-fit md:justify-center">
                                <p className="flex flex-col justify-center md:w-[calc(160rem/16)] md:flex-row md:space-x-1">
                                  <span className="text-sm font-semibold line-clamp-2 text-neutral-900">
                                    {item.price.toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </span>
                                </p>
                                <div className="flex w-[calc(117rem/16)] items-center justify-end  self-end md:justify-center md:self-center">
                                  <button
                                    className="flex justify-center p-1 text-2xl text-center rounded-full bg-neutral-300 hover:bg-neutral-200"
                                    onClick={() =>
                                      decreaseQuantity(item.productId)
                                    }
                                  >
                                    <span className=" inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-4 h-4 items-center">
                                      <Minus />
                                    </span>
                                  </button>
                                  <input
                                    type="text"
                                    value={item.quantity}
                                    className="w-6 h-6 mx-2 text-[16px] text-center"
                                  />
                                  <button
                                    className="flex justify-center p-1 text-2xl text-center rounded-full bg-neutral-300 hover:bg-neutral-200"
                                    onClick={() =>
                                      increaseQuantity(item.productId)
                                    }
                                  >
                                    <span className=" inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-4 h-4 items-center">
                                      <Plus />
                                    </span>
                                  </button>
                                </div>
                                <p className="hidden w-[calc(120rem/16)] items-center justify-end md:flex">
                                  <span className="text-sm font-semibold line-clamp-2 text-neutral-900">
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </span>
                                </p>
                                <Trash2
                                  className="w-4 cursor-pointer"
                                  onClick={() => {
                                    setIsAlertOpen(true);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="h-[1px] w-full bg-neutral-200 hidden md:block"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="gap-4 md:grid">
                  <div>
                    <div className="flex flex-col px-4 space-y-3 bg-white rounded-sm md:p-3">
                      <div className="grid items-center justify-between w-full grid-flow-col">
                        <div className="grid grid-cols-[24px_1fr] items-center justify-start gap-1">
                          <TicketPercent color="#0072BC" />
                          <p className="font-semibold">Khuyễn mãi</p>
                        </div>
                        {/* <div>
                          <button className="text-blue-500">Chọn mã</button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="grid items-center grid-flow-col gap-2 bg-white rounded-sm md:grid-flow-row md:items-start md:gap-4 md:p-4">
                    <div className="grid gap-4">
                      <div className="items-center justify-between hidden grid-flow-col gap-2 md:grid">
                        <p className="text-sm text-neutral-900">Tạm tính</p>
                        <p className="text-sm font-semibold text-neutral-900">
                          {totalPrice.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                      <div className="items-center justify-between hidden grid-flow-col gap-2 md:grid">
                        <p className="text-sm text-neutral-900">
                          Giảm giá ưu đãi
                        </p>
                        <p className="text-sm font-semibold text-neutral-900">
                          -
                        </p>
                      </div>
                      <div className="items-center justify-between hidden grid-flow-col gap-2 md:grid">
                        <p className="text-sm text-neutral-900">
                          Giảm giá sản phẩm
                        </p>
                        <p className="text-sm font-semibold text-neutral-900">
                          -
                        </p>
                      </div>
                      <div className="bg-neutral-200 h-[1px] hidden md:block"></div>
                      <div className="grid items-center justify-items-end gap-0.5 md:grid-flow-col md:justify-between md:gap-2">
                        <p className="text-sm text-neutral-900 md:text-base md:font-semibold">
                          Tổng tiền
                        </p>
                        <p className="text-xl font-bold leading-8 text-red-500 no-underline md:text-2xl">
                          {totalPrice.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    </div>
                    <Link href="/checkout">
                      <button className="w-full px-4 py-2 text-sm text-white outline-none border border-solid bg-[#0072bc] rounded-lg hover:bg-[#005596]">
                        Mua hàng ({cartItems.length})
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
      {cartItems.map((item) => (
        <AlertDialog open={isAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xóa sản phẩm</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa sản phẩm này?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                Quay lại
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setIsAlertOpen(false);
                  if (isRemoveAll) {
                    removeAllItem();
                  } else {
                    removeItem(item.productId);
                  }
                }}
              >
                Đồng ý
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ))}
    </>
  );
};

export default Cart;
