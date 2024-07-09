import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import SwiperImage from "@/components/swiper/Swiper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import drugstore from "@images/drugstore.svg";

import dynamic from "next/dynamic";
import { ProductProps } from "@/components/productlist/ProductList";
const Button = dynamic(
  () => import("@/components/buttonProduct/ButtonProduct"),
  { ssr: true }
);
const Detail = async ({ params }: { params: { id: number } }) => {
  const res = await fetch(`${process.env.API_URL}/Product/${params.id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const product: ProductProps = data.data;

  const breadcrumbPaths = [
    { url: "/", label: "Trang chủ" },
    { url: "/cham-soc-ca-nhan", label: "Chăm sóc cá nhân" },
    {
      url: `/${product?.categoryId === 5 && "cham-soc-co-the"}`,
      label: product?.categoryId === 5 ? "Chăm sóc cơ thể" : undefined,
    },
  ];
  const currentPage = product?.detailCategory || "";
  return (
    <>
      <BreadCrumb paths={breadcrumbPaths} currentPage={currentPage} />
      <div className="container max-w-[1232px] mx-auto py-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[min(60%,calc(555rem/16)),1fr] md:pt-6 lg:grid-cols-[min(72%,calc(888rem/16)),1fr]">
          <div className="grid md:gap-6">
            <div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <SwiperImage id={params.id} />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">{product?.name}</h1>
                  <Link href="brand" className="text-blue-500 cursor-pointer">
                    Thương hiệu: {product?.brandName}
                  </Link>
                  <p className="mt-2 text-[#0072bc] font-semibold text-3xl">
                    {product?.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                    /Hộp
                  </p>
                  <div className="bg-neutral-100 h-[1px]"></div>
                  <div className="grid gap-3 mb-3 md:gap-4 md:mb-4">
                    <div className="grid gap-3 md:gap-2">
                      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,285px]">
                        <p className="font-semibold">Danh mục</p>
                        <p>{product?.detailCategory}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,285px]">
                        <p className="font-semibold">Hoạt chất</p>
                        <p>{product?.activeIngredient}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,285px]">
                        <p className="font-semibold">Chỉ định</p>
                        <p>{product?.use}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,285px]">
                        <p className="font-semibold">Dạng bào chế</p>
                        <p>{product?.dosageForm}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,285px]">
                        <p className="font-semibold">Nơi sản xuất</p>
                        <p>{product?.brandName}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,285px]">
                        <p className="font-semibold">Lưu ý</p>
                        <p>{product?.note}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,285px] text-[#707070]">
                        <p className="font-light">Đã bán</p>
                        <p>{product?.soldQuantity}</p>
                      </div>

                      <Button productId={product.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-100 h-[1px]"></div>
            <div>{product?.description}</div>
          </div>
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
                  <p className="font-bold">Nhà thuốc</p>
                  <p className="text-blue-500">Xem đánh giá</p>
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <button className="w-[140px] px-2 py-2 text-xs text-blue-600 outline-none border border-solid border-[#0072bc] rounded-lg hover:text-[#6dc0e3]">
                  <span className="font-semibold">Xem sản phẩm</span>
                </button>
                <button className="w-[140px] px-2 py-2 text-xs text-white outline-none border border-solid bg-[#0072bc] rounded-lg hover:bg-[#005596]">
                  <span className="font-semibold">Nhận tư vấn</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
