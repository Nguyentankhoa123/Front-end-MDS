process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import SwiperImage from "@/components/swiper/Swiper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import drugstore from "@images/drugstore.svg";
import dynamic from "next/dynamic";
import { ProductProps } from "@/components/productlist/ProductList";
import Chat from "@/components/chat/Chat";
import Comment from "@/components/comment/Comment";

const Button = dynamic(
  () => import("@/components/buttonProduct/ButtonProduct"),
  { ssr: true }
);

const DrugStore = dynamic(() => import("@/components/drugstore/Drugstore"), {
  ssr: true,
});

const urlProductType: { [key: string]: string } = {
  Thuốc: "/duoc-pham",
  "Thực phẩm chức năng": "/thuc-pham-chuc-nang",
  "Chăm sóc cá nhân": "/cham-soc-ca-nhan",
  "Mẹ và bé": "/me-va-be",
  "Chăm sóc sắc đẹp": "/cham-soc-sac-dep-co-the",
  "Sản phẩm tiện lợi": "/san-pham-tien-loi",
};

const urlCategoryName: { [key: string]: string } = {
  "Thuốc không kê đơn": "/thuoc-khong-ke-don",
  "Thuốc kê đơn": "/thuoc-ke-don",
  "Chăm sóc sắc đẹp": "/cham-soc-sac-dep",
  "Sản phẩm khử mùi": "/san-pham-khu-mui",
  "Chăm sóc cơ thể": "/cham-soc-co-the",
  "Chăm sóc em bé": "/cham-soc-em-be",
  "Chăm sóc da mặt": "/cham-soc-mat",
  "Sản phẩm chóng nắng": "/",
  "Hàng tổng hợp": "/hang-tong-hop",
};

function getUrlProductType(productType: string) {
  return urlProductType[productType] || "/default-path";
}

function getUrlCategoryName(categoryName: string) {
  return urlCategoryName[categoryName] || "/default-path";
}

const DetailProduct = async ({ params }: { params: { id: number } }) => {
  const res = await fetch(`${process.env.API_URL}/Product/${params.id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const product: ProductProps = data.data;

  const breadcrumbPaths = [
    { url: "/", label: "Trang chủ" },
    {
      url: getUrlProductType(product.productType),
      label: `${product.productType}`,
    },
    {
      url: getUrlCategoryName(product.categoryName),
      label: `${product.categoryName}`,
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
                      {product?.activeIngredient && (
                        <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,285px]">
                          <p className="font-semibold">Hoạt chất</p>
                          <p>{product?.activeIngredient}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,285px]">
                        <p className="font-semibold">Chỉ định</p>
                        <p>{product?.use}</p>
                      </div>
                      {product?.dosageForm && (
                        <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,285px]">
                          <p className="font-semibold">Dạng bào chế</p>
                          <p>{product?.dosageForm}</p>
                        </div>
                      )}
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
            <div className="bg-neutral-300 h-[1px]"></div>
            <div
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></div>
            <div className="bg-neutral-300 h-[1px]"></div>
            <Comment product={product} />
          </div>
          <DrugStore product={product} />
          <Chat />
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
