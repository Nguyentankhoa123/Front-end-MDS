"use client";
import { useCartStore } from "@/store/cart";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import React, { useEffect } from "react";

interface MyToken extends JwtPayload {
  nameid: string;
}

const PaymentSuccess = () => {
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  let userId: string | undefined;
  if (token) {
    const decodeToken = jwtDecode<MyToken>(token);
    userId = decodeToken.nameid;
  }

  useEffect(() => {
    const fetchCart = async () => {
      if (userId) {
        await useCartStore.getState().fetchCart(userId);
      }
    };

    fetchCart();
  }, [userId]);

  return (
    <>
      <div className="h-screen bg-gray-100">
        <div className="flex flex-col justify-center h-full p-6 bg-white md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="w-16 h-16 mx-auto my-6 text-green-600"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="text-base font-semibold text-center text-gray-900 md:text-2xl">
              Thanh toán VnPay thành công
            </h3>
            <p className="my-2 text-gray-600">
              Quay trở lại trang và tiếp tục mua sắm
            </p>
            <div className="py-5 text-center">
              <Link href="/">
                <button className="bg-[#1b51a3] px-4 py-2 rounded-lg text-sm w-fit hover:bg-[#0f377d]">
                  <span className="font-semibold text-white">Mua ngay</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
