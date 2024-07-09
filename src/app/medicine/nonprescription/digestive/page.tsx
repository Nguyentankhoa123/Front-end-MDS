"use server";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import ProductList, {
  ProductProps,
} from "@/components/productlist/ProductList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Digestive = async () => {
  const breadcrumbPaths = [
    { url: "/", label: "Trang chủ" },
    { url: "/medicine", label: "Thuốc" },
    { url: "/medicine/nonprescription", label: "Thuốc không kê đơn" },
  ];
  const currentPage = "Thuốc tiêu hóa";

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
      </div>
      <ProductList
        products={products ? products : []}
        filterType={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default Digestive;
