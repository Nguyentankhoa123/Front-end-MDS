"use server";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import digestive from "@images/category/nonprescription-1.png";
import React from "react";
import ProductList, {
  ProductProps,
} from "@/components/productlist/ProductList";

const Nonprescription = async () => {
  const breadcrumbPaths = [
    { url: "/", label: "Trang chủ" },
    { url: "/medicine", label: "Thuốc" },
  ];
  const currentPage = "Thuốc không kê đơn";

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
          <p className="text-2xl font-semibold">{currentPage}</p>
        </div>
        <div className="grid grid-cols-4 gap-4 pb-4 pt-4 md:grid-cols-[repeat(auto-fill,136px)] md:pb-6">
          <Link
            href="/medicine/nonprescription/digestive"
            className="flex flex-col items-center w-[130px]"
          >
            <div className="my-2 rounded-full h-20 w-20 md:h-36 md:w-36 bg-[#F6FCFF] ">
              <Image
                src={digestive}
                alt="Thuốc kê đơn"
                className="rounded-full"
              />
            </div>
            <p className="w-full text-center text-wrap">Thuốc tiêu hóa</p>
          </Link>
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

export default Nonprescription;
