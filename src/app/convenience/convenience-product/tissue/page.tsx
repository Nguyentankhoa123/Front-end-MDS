process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import ProductList, {
  ProductProps,
} from "@/components/productlist/ProductList";
import React from "react";

const Tissue = async () => {
  const breadcrumbPaths = [
    { url: "/", label: "Trang chủ" },
    { url: "/san-pham-tien-loi", label: "Sản phẩm tiện lợi" },
    { url: "/hang-tong-hop", label: "Hàng tổng hợp" },
  ];
  const currentPage = "Khăn giấy, khăn ướt";

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

export default Tissue;
