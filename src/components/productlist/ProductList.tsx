"use client";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import test2 from "@images/test2.png";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export type CommentProps = {
  id: number;
  userId: string;
  productId: number;
  content: string;
  date: Date;
  parentId?: number;
  isDeleted: boolean;
  isQuestion: boolean;
  fullName: string;
};

export type ProductProps = {
  id: number;
  name: string;
  categoryId: number;
  brandId: number;
  price: number;
  pictureUrls: string[];
  description: string;
  prescription: boolean;
  activeIngredient: string;
  dosageForm: string;
  use: string;
  quantity: number;
  note: string;
  soldQuantity: number;
  detailCategory: string;
  brandName: string;
  productType: string;
  categoryName: string;
  drugstoreId: string;
  drugstoreName: string;
  comments: CommentProps[];
};

type IProps = {
  products: ProductProps[] | [];
  filterType?: string;
  totalPages: number;
  drugstoreId?: string;
};

const ProductList = (props: IProps) => {
  const { products, filterType, totalPages, drugstoreId } = props;
  const [priceSortOrder, setPriceSortOrder] = useState("");
  const [productsData, setProductsData] = useState(products);
  const [pageNumber, setPageNumber] = useState(1);
  const formatSold = (sold: number): string => {
    if (sold >= 1000) {
      return (sold / 1000).toFixed(1) + "K";
    }
    return sold.toString();
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      let url;
      if (drugstoreId) {
        url = `https://localhost:7151/api/Product/GetProduct?id=${drugstoreId}&pageNumber=${pageNumber}&pageSize=5`;
      } else if (filterType) {
        url = `https://localhost:7151/api/Product/search?filterQuery=${filterType}&priceSortOrder=${priceSortOrder}&pageNumber=${pageNumber}&pageSize=5`;
      } else {
        url = `https://localhost:7151/api/Product/search?priceSortOrder=${priceSortOrder}&pageNumber=${pageNumber}&pageSize=5`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setProductsData(data.data);
    };

    if (priceSortOrder || pageNumber) {
      fetchProductsData();
    }
  }, [priceSortOrder, filterType, pageNumber, drugstoreId]);

  const TotalPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <>
      <div className="container max-w-[1232px] mx-auto grid grid-cols-1 pb-4 ">
        <div className="md:pt-3">
          {!drugstoreId && (
            <div className="flex items-start gap-5 py-4">
              <p className="py-2 font-medium">Sắp xếp theo:</p>
              <div className="flex gap-5">
                <button
                  className={`px-4 ${
                    priceSortOrder === "desc" ? "!px-8" : ""
                  } transition-all ease-out duration-300 py-2 border relative overflow-hidden  border-solid rounded-3xl  font-semibold ${
                    priceSortOrder === "desc"
                      ? "text-[#0072bc] border-[#0072bc]"
                      : "text-neutral-500 border-neutral-500"
                  }`}
                  onClick={() => setPriceSortOrder("desc")}
                >
                  <span>Giá giảm dần</span>
                  {priceSortOrder === "desc" && (
                    <span className="absolute w-7 h-[55px] bg-blue-600 top-[-18px] right-[-3px] -rotate-45 flex items-center justify-center">
                      <span className="absolute text-white right-[10px]">
                        {" "}
                        <Check className="text-xs rotate-45 " size={18} />
                      </span>
                    </span>
                  )}
                </button>
                <button
                  className={`px-4 ${
                    priceSortOrder === "asc" ? "!px-8" : ""
                  } transition-all ease-out duration-300 py-2 border relative overflow-hidden  border-solid rounded-3xl  font-semibold ${
                    priceSortOrder === "asc"
                      ? "text-[#0072bc] border-[#0072bc]"
                      : "text-neutral-500 border-neutral-500"
                  }`}
                  onClick={() => setPriceSortOrder("asc")}
                >
                  <span>Giá tăng dần</span>
                  {priceSortOrder === "asc" && (
                    <span className="absolute w-7 h-[55px] bg-blue-600 top-[-18px] right-[-3px] -rotate-45 flex items-center justify-center ">
                      <span className="absolute text-white right-[10px]">
                        {" "}
                        <Check className="text-xs rotate-45 " size={18} />
                      </span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-5 ">
            {productsData.map((product) => (
              <Link
                href={`/${product.id}`}
                key={product.id}
                className="flex flex-col pb-2  overflow-hidden border rounded-lg shadow-sm ease-out duration-300 transition-all hover:border-[#1250dc]"
              >
                <Image
                  src={product.pictureUrls[0]}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
                <div className="flex flex-col px-2">
                  <h3 className="mt-2 mb-5 text-[16px] font-semibold work-break">
                    {product.name}
                  </h3>
                  <span className="text-[#1250dc] font-semibold">
                    <span>
                      {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <span className="font-normal">/Hộp</span>
                  </span>
                  <span className="text-[14px]">
                    Đã bán {formatSold(product.soldQuantity)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                {pageNumber > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPageNumber(pageNumber - 1)}
                    />
                  </PaginationItem>
                )}
                {TotalPages.map((number) => (
                  <PaginationItem key={number}>
                    <PaginationLink
                      className={`cursor-pointer ${
                        number === pageNumber ? "bg-neutral-200" : ""
                      }`}
                      onClick={(e) => {
                        setPageNumber(number);
                      }}
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {pageNumber < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPageNumber(pageNumber + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
