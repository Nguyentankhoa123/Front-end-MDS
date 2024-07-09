import ProductList, {
  ProductProps,
} from "@/components/productlist/ProductList";
import { useSearchParams } from "next/navigation";
import React from "react";

const Search = async ({
  searchParams,
}: {
  searchParams?: { query?: string };
}) => {
  const search = searchParams?.query ?? "";

  const res = await fetch(
    `https://localhost:7151/api/Product/search?nameQuery=${encodeURIComponent(
      search
    )}&pageNumber=1&pageSize=5`
  );
  const data = await res.json();
  const products: ProductProps[] = data.data;

  console.log(search);
  return (
    <>
      <div className="container max-w-[1232px] mx-auto">
        <div className="mt-5">
          Tìm thấy{" "}
          <span className="text-[#0072bc] font-bold">{products.length}</span>{" "}
          sản phẩm với từ khóa{" "}
          <span className="text-[#0072bc] font-bold">"{search}"</span>
        </div>
      </div>
      <ProductList products={products} />
    </>
  );
};

export default Search;
