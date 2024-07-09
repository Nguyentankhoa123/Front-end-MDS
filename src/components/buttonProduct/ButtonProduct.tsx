"use client";
import { useCartStore } from "@/store/cart";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Minus, Plus } from "lucide-react";
import { useCookies } from "next-client-cookies";
import React, { useState } from "react";
import { toast } from "sonner";

interface MyToken extends JwtPayload {
  nameid: string;
}

const ButtonProduct = ({ productId }: { productId: number }) => {
  const [quantity, setQuantity] = useState(1);

  const cookies = useCookies();
  const { cartItems } = useCartStore();

  const addToCart = async (productId: number) => {
    const token = cookies.get("accessToken");
    let userId: string | undefined;
    if (token) {
      const decodeToken = jwtDecode<MyToken>(token);
      userId = decodeToken.nameid;
    }
    const res = await fetch(
      `https://localhost:7151/api/Cart?userId=${userId}&productId=${productId}&quantity=${quantity}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (userId) {
      await useCartStore.getState().fetchCart(userId);
    }

    if (res.status === 200) {
      toast.success("Đã thêm với giỏ hàng");
    } else {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <>
      <div className="mt-3">
        <div className="flex w-[calc(117rem/16)] items-center justify-end  self-end md:justify-center md:self-center">
          <button
            className={`${
              quantity === 1
                ? "bg-neutral-100 cursor-not-allowed"
                : "bg-neutral-300 hover:bg-neutral-200"
            } flex justify-center p-1 text-2xl text-center rounded-full `}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <span className=" inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-4 h-4 items-center">
              <Minus />
            </span>
          </button>
          <input
            type="text"
            value={quantity}
            className="w-6 h-6 mx-2 text-[16px] text-center"
          />
          <button
            className="flex justify-center p-1 text-2xl text-center rounded-full bg-neutral-300 hover:bg-neutral-200"
            onClick={() => setQuantity(quantity + 1)}
          >
            <span className=" inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-4 h-4 items-center">
              <Plus />
            </span>
          </button>
        </div>
      </div>
      <div className="mt-4 ">
        <button
          className="w-full px-4 py-2 text-sm text-blue-600 outline-none border border-solid border-[#0072bc] rounded-lg hover:text-[#6dc0e3]"
          onClick={() => addToCart(productId)}
        >
          <span className="font-semibold">Thêm vào giỏ hàng</span>
        </button>
        {/* <button className="w-[180px] px-4 py-2 text-sm text-white outline-none border border-solid bg-[#0072bc] rounded-lg hover:bg-[#005596]">
          <span className="font-semibold">Mua ngay</span>
        </button> */}
      </div>
    </>
  );
};

export default ButtonProduct;
