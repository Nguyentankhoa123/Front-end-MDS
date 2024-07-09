"use server";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import ProductList, {
  ProductProps,
} from "@/components/productlist/ProductList";
import { usePathname } from "next/navigation";
import React from "react";

const Antibiotics = async () => {
  const breadcrumbPaths = [
    { url: "/", label: "Trang chủ" },
    { url: "/medicine", label: "Thuốc" },
    { url: "/medicine/prescription", label: "Thuốc kê đơn" },
  ];
  const currentPage = "Thuốc kháng sinh";

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

export default Antibiotics;
