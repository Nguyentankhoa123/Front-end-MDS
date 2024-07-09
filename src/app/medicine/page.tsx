"use server";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import React from "react";
import Link from "next/link";
import nonprescription from "@images/category/nonprescription.png";
import prescription from "@images/category/prescription.png";
import Image from "next/image";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import ProductList, {
  ProductProps,
} from "@/components/productlist/ProductList";

const Medicine = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 100000));

  const breadcrumbPaths = [{ url: "/", label: "Trang chủ" }];
  const currentPage = "Thuốc";

  const res = await fetch(
    `${process.env.API_URL}/Product/search?filterQuery=${currentPage}&pageNumber=1&pageSize=5`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const products: ProductProps[] = data.data;

  const totalPages = data.totalPages;

  return (
    <>
      <BreadCrumb paths={breadcrumbPaths} currentPage={currentPage} />
      <div className="container max-w-[1232px] mx-auto">
        <div>
          <p className="text-2xl font-semibold">Thuốc</p>
        </div>
        <div className="grid grid-cols-4 gap-4 pb-4 pt-4 md:grid-cols-[repeat(auto-fill,136px)] md:pb-6">
          <Link
            href="/thuoc-khong-ke-don"
            className="flex flex-col items-center w-[130px]"
          >
            <div className="my-2 rounded-full h-20 w-20 md:h-36 md:w-36 bg-[#F6FCFF] ">
              <Image
                src={nonprescription}
                alt="Thuốc không kê đơn"
                className="rounded-full"
              />
            </div>
            <p className="w-full text-center text-wrap">Thuốc không kê đơn</p>
          </Link>
          <div className="flex flex-col items-center w-[130px]">
            <Link
              href="/thuoc-ke-don"
              className="my-2 rounded-full h-20 w-20 md:h-36 md:w-36 bg-[#F6FCFF] "
            >
              <Image
                src={prescription}
                alt="Thuốc kê đơn"
                className="rounded-full"
              />
            </Link>
            <p className="w-full text-center text-wrap">Thuốc kê đơn</p>
          </div>
        </div>
      </div>
      <div className="h-3 bg-neutral-100"></div>
      <ProductList
        products={products ? products : []}
        filterType={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default Medicine;
