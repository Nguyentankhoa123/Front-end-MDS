"use client";
import React from "react";
import drugstore from "@images/drugstore.svg";
import { useChatStore } from "@/store/chat";
import { ProductProps } from "../productlist/ProductList";
import Image from "next/image";
import { useCookies } from "next-client-cookies";
import { JwtPayload, jwtDecode } from "jwt-decode";
import Link from "next/link";

interface MyToken extends JwtPayload {
  given_name: string;
  family_name: string;
  nameid: string;
}

type IProps = {
  product: ProductProps;
};

const Drugstore = (props: IProps) => {
  const { product } = props;
  const { setIsOpenChat, setRoomName, setDrugstore } = useChatStore();

  // lấy id người dùng
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  let userId: string;
  if (token) {
    const decodeToken = jwtDecode<MyToken>(token);
    userId = decodeToken?.nameid;
  }

  const handleOpenChat = () => {
    const room = `${userId}+${product.drugstoreId}`;
    setRoomName(product.drugstoreId);
    setDrugstore(product.drugstoreName);
    setIsOpenChat(true);
  };
  return (
    <>
      <div>
        <div className="w-full h-auto p-2 border border-solid">
          <div className="flex gap-3">
            <div className="w-14 h-14">
              <Image
                src={drugstore}
                alt=""
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
            <div>
              <p className="font-bold">{product?.drugstoreName}</p>
              <Link
                href={`/danh-gia-nha-thuoc/${product.drugstoreId}`}
                className="text-blue-500"
              >
                Xem đánh giá
              </Link>
            </div>
          </div>
          <div className="flex gap-3 mt-3">
            <button className="w-[140px] px-2 py-2 text-xs text-blue-600 outline-none border border-solid border-[#0072bc] rounded-lg hover:text-[#6dc0e3]">
              <Link href={`/danh-sach-nha-thuoc/${product.drugstoreId}`}>
                <span className="font-semibold">Xem sản phẩm</span>
              </Link>
            </button>
            <button
              className="w-[140px] px-2 py-2 text-xs text-white outline-none border border-solid bg-[#0072bc] rounded-lg hover:bg-[#005596]"
              onClick={handleOpenChat}
            >
              <span className="font-semibold">Nhận tư vấn</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drugstore;
