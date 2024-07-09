process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import ProductList, {
  ProductProps,
} from "@/components/productlist/ProductList";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import beautyCare from "@images/category/beauty-care-1.png";
const BeautyCare = async () => {
  const breadcrumbPaths = [{ url: "/", label: "Trang chủ" }];
  const currentPage = "Chăm sóc sắc đẹp";

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
          <p className="text-2xl font-semibold">Chăm sóc sắc đẹp</p>
        </div>
        <div className="grid grid-cols-4 gap-4 pb-4 pt-4 md:grid-cols-[repeat(auto-fill,136px)] md:pb-6">
          <Link
            href="/cham-soc-mat"
            className="flex flex-col items-center w-[130px]"
          >
            <div className="my-2 rounded-full h-20 w-20 md:h-36 md:w-36 bg-[#F6FCFF] ">
              <Image
                src={beautyCare}
                alt="Chăm sóc mặt"
                className="rounded-full"
              />
            </div>
            <p className="w-full text-center text-wrap">Chăm sóc mặt</p>
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

export default BeautyCare;
