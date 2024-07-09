import Image from "next/image";
import Link from "next/link";
import React from "react";
import emptyCart from "@images/empty-cart.png";

const EmptyCart = () => {
  return (
    <>
      <div className="flex flex-col justify-center h-screen py-5">
        <div className="flex justify-center w-full">
          <Image
            src={emptyCart}
            alt=""
            width={500}
            height={500}
            className="w-[200px] h-[200px]"
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="text-base font-semibold text-neutral-900">
            <span>Chưa có sản phẩm nào</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="text-base">Hãy khám phá để mua sắm thêm</span>
            <Link href="/">
              <button className="bg-[#1b51a3] px-4 py-2 rounded-lg text-sm w-fit hover:bg-[#0f377d]">
                <span className="font-semibold text-white">Khám phá ngay</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyCart;
