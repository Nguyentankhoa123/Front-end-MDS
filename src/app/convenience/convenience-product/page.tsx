process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import ProductList, {
  ProductProps,
} from "@/components/productlist/ProductList";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import tissue from "@images/category/convenientProd-1.png";

const ConvenienceProduct = async () => {
  const breadcrumbPaths = [
    { url: "/", label: "Trang chủ" },
    { url: "/san-pham-tien-loi", label: "Sản phẩm tiện lợi" },
  ];
  const currentPage = "Hàng tổng hợp";

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
            href="/khan-giay-khan-uot"
            className="flex flex-col items-center w-[130px]"
          >
            <div className="my-2 rounded-full h-20 w-20 md:h-36 md:w-36 bg-[#F6FCFF] ">
              <Image
                src={tissue}
                alt="Khăn giấy khăn ướt"
                className="rounded-full"
              />
            </div>
            <p className="w-full text-center text-wrap">Khăn giấy khăn ướt</p>
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

export default ConvenienceProduct;