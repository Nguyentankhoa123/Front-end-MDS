import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import medicine from "@images/category/medicine.png";
import functionalFood from "@images/category/functional food.png";
import personalCare from "@images/category/personal care.png";
import mombaby from "@images/category/mombaby.png";
import beautyCare from "@images/category/beauty care.png";
import nonprescription from "@images/category/nonprescription.png";
import prescription from "@images/category/prescription.png";
import imageCategory from "@images/category/image-category.png";
import functionalFood1 from "@images/category/functional-food-1.png";
import functionalFood2 from "@images/category/functional-food-2.png";
import personalCare1 from "@images/category/personal-care-1.png";
import personalCare2 from "@images/category/personal-care-2.png";
import mombaby1 from "@images/category/mombaby-1.png";
import beautyCare1 from "@images/category/beauty-care-1.png";
import beautyCare2 from "@images/category/beauty-care-2.png";
import MedicalEquipme from "@images/category/MedicalEquipme.png";
import medicalEquipme1 from "@images/category/medical-Equipme-1.png";
import convenientProd from "@images/category/convenientProd.png";
import convenientProd1 from "@images/category/convenientProd-1.png";
import healLife from "@images/category/healthLife.png";
import healLife1 from "@images/category/healthLife-1.png";
import { CircleChevronDown } from "lucide-react";
import Link from "next/link";

type Category =
  | "medicine"
  | "functionalFood"
  | "personalCare"
  | "mombaby"
  | "beautyCare"
  | "medicalEquipment"
  | "convenientProduct"
  | "healLife";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    "medicine"
  );

  const handleCategoryHover = (category: Category) => {
    setSelectedCategory(category);
  };

  const renderCategorys = () => {
    switch (selectedCategory) {
      case "medicine":
        return (
          <>
            <Link
              href="/thuoc-khong-ke-don"
              className="flex flex-col items-center w-[130px]"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F6FCFF] border">
                <Image src={nonprescription} alt="Thuốc không kê đơn" />
              </div>
              <p className="w-full text-center text-wrap">Thuốc không kê đơn</p>
            </Link>
            <Link
              href="/thuoc-ke-don"
              className="flex flex-col items-center w-[130px]"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F6FCFF] border">
                <Image src={prescription} alt="Thuốc kê đơn" />
              </div>
              <p className="w-full text-center text-wrap">Thuốc kê đơn</p>
            </Link>
            <Link
              href="/duoc-pham"
              className="flex flex-col items-center w-[130px]"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F7F7F7] flex justify-center border items-center">
                <CircleChevronDown strokeWidth={1} size={30} />
              </div>
              <p>Xem tất cả</p>
            </Link>
          </>
        );

      case "functionalFood":
        return (
          <>
            <Link
              href="/cham-soc-sac-dep"
              className="flex flex-col items-center w-[130px]"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F6FCFF] border">
                <Image src={functionalFood1} alt="Chăm sóc sắc đẹp" />
              </div>
              <p className="w-full text-center text-wrap">Chăm sóc sắc đẹp</p>
            </Link>
            {/* <Link href="" className="flex flex-col items-center w-[130px]">
              <div className="my-2 rounded-md h-24 w-24 bg-[#F6FCFF] border">
                <Image src={functionalFood2} alt="Nhóm dạ dày" />
              </div>
              <p className="w-full text-center text-wrap">Nhóm dạ dày</p>
            </Link> */}
            <Link
              href="/thuc-pham-chuc-nang"
              className="flex flex-col items-center w-[130px]"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F7F7F7] flex justify-center border items-center">
                <CircleChevronDown strokeWidth={1} size={30} />
              </div>
              <p>Xem tất cả</p>
            </Link>
          </>
        );

      case "personalCare":
        return (
          <>
            <Link
              href="/san-pham-khu-mui"
              className="flex flex-col items-center w-[130px]"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F6FCFF] border">
                <Image src={personalCare1} alt="Sản phẩm khử mùi" />
              </div>
              <p className="w-full text-center text-wrap">Sản phẩm khử mùi</p>
            </Link>
            <Link
              href="/cham-soc-co-the"
              className="flex flex-col items-center w-[130px]"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F6FCFF] border">
                <Image src={personalCare2} alt="Chăm sóc cơ thể" />
              </div>
              <p className="w-full text-center text-wrap">Chăm sóc cơ thể</p>
            </Link>
            <Link
              href="/cham-soc-ca-nhan"
              className="flex flex-col items-center  w-[130px]"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F7F7F7] flex justify-center border items-center">
                <CircleChevronDown strokeWidth={1} size={30} />
              </div>
              <p>Xem tất cả</p>
            </Link>
          </>
        );

      case "mombaby":
        return (
          <>
            <Link
              href="/cham-soc-em-be"
              className="flex flex-col items-center w-[130px]"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F6FCFF] border">
                <Image src={mombaby1} alt="Chăm sóc em bé" />
              </div>
              <p className="w-full text-center text-wrap">Chăm sóc em bé</p>
            </Link>
            <Link
              href="/me-va-be"
              className="flex flex-col items-center w-[130px]"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F7F7F7] flex justify-center border items-center">
                <CircleChevronDown strokeWidth={1} size={30} />
              </div>
              <p>Xem tất cả</p>
            </Link>
          </>
        );

      case "beautyCare":
        return (
          <>
            <Link
              href="/cham-soc-mat"
              className="flex flex-col items-center w-[130px]"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F6FCFF] border">
                <Image src={beautyCare1} alt="Chăm sóc da mặt" />
              </div>
              <p className="w-full text-center text-wrap">Chăm sóc da mặt</p>
            </Link>
            {/* <Link href="" className="flex flex-col items-center w-[130px]">
              <div className="my-2 rounded-md h-24 w-24 bg-[#F6FCFF] border">
                <Image src={beautyCare2} alt="Sản phẩm chống nắng" />
              </div>
              <p className="w-full text-center text-wrap">
                Sản phẩm chống nắng
              </p>
            </Link> */}
            <Link
              href="/cham-soc-sac-dep-co-the"
              className="flex flex-col items-center"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F7F7F7] flex justify-center border items-center">
                <CircleChevronDown strokeWidth={1} size={30} />
              </div>
              <p>Xem tất cả</p>
            </Link>
          </>
        );

      case "medicalEquipment":
        return (
          <>
            <div className="flex flex-col items-center w-[130px]">
              <div className="my-2 rounded-md h-24 w-24 bg-[#F6FCFF] border">
                <Image src={medicalEquipme1} alt="Dụng cụ kiểm tra" />
              </div>
              <p className="w-full text-center text-wrap">Dụng cụ kiểm tra</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="my-2 rounded-md h-24 w-24 bg-[#F7F7F7] flex justify-center border items-center">
                <CircleChevronDown strokeWidth={1} size={30} />
              </div>
              <p>Xem tất cả</p>
            </div>
          </>
        );

      case "convenientProduct":
        return (
          <>
            <Link
              href="/hang-tong-hop"
              className="flex flex-col items-center w-[130px]"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F6FCFF] border">
                <Image src={convenientProd1} alt="Dụng cụ kiểm tra" />
              </div>
              <p className="w-full text-center text-wrap">Hàng tổng hợp</p>
            </Link>
            <Link
              href="/san-pham-tien-loi"
              className="flex flex-col items-center"
            >
              <div className="my-2 rounded-md h-24 w-24 bg-[#F7F7F7] flex justify-center border items-center">
                <CircleChevronDown strokeWidth={1} size={30} />
              </div>
              <p>Xem tất cả</p>
            </Link>
          </>
        );

      case "healLife":
        return (
          <>
            <div className="flex flex-col items-center w-[130px]">
              <div className="my-2 rounded-md h-24 w-24 bg-[#F6FCFF] border">
                <Image src={healLife1} alt="Thực phẩm dinh dưỡng" />
              </div>
              <p className="w-full text-center text-wrap">
                Thực phẩm dinh dưỡng
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="my-2 rounded-md h-24 w-24 bg-[#F7F7F7] flex justify-center border items-center">
                <CircleChevronDown strokeWidth={1} size={30} />
              </div>
              <p>Xem tất cả</p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-white absolute w-full z-[999999]">
      <div className="border">
        <div className="container max-w-[1232px] flex gap-2  h-[350px]">
          <div className="flex-shrink-0">
            <ScrollArea className="h-full py-2 pr-3 border-r w-fit">
              <div
                className={`p-2 gap-2 rounded-md  flex items-center transition my-2  duration-200 cursor-pointer ${
                  selectedCategory === "medicine" ? "bg-[#E0F5FE]" : ""
                }`}
                onClick={() => handleCategoryHover("medicine")}
              >
                <Image src={medicine} alt="Thuốc" height={40} width={40} />
                Thuốc
              </div>
              <div
                className={`p-2 gap-2 rounded-md flex items-center transition duration-200 cursor-pointer my-2 ${
                  selectedCategory === "functionalFood" ? "bg-[#E0F5FE]" : ""
                }`}
                onClick={() => handleCategoryHover("functionalFood")}
              >
                <Image
                  src={functionalFood}
                  alt="Thực phẩm chức năng"
                  height={40}
                  width={40}
                />
                Thực phẩm chức năng
              </div>
              <div
                className={`p-2 gap-2 rounded-md flex items-center transition duration-200 cursor-pointer my-2 ${
                  selectedCategory === "personalCare" ? "bg-[#E0F5FE]" : ""
                }`}
                onClick={() => handleCategoryHover("personalCare")}
              >
                <Image
                  src={personalCare}
                  alt="Chăm sóc cá nhân"
                  height={40}
                  width={40}
                />
                Chăm sóc cá nhân
              </div>
              <div
                className={`p-2 gap-2 rounded-md flex items-center transition duration-200 cursor-pointer my-2 ${
                  selectedCategory === "mombaby" ? "bg-[#E0F5FE]" : ""
                }`}
                onClick={() => handleCategoryHover("mombaby")}
              >
                <Image src={mombaby} alt="mombaby" height={40} width={40} />
                Mẹ và bé
              </div>
              <div
                className={`p-2 gap-2 rounded-md flex items-center transition duration-200 cursor-pointer my-2 ${
                  selectedCategory === "beautyCare" ? "bg-[#E0F5FE]" : ""
                }`}
                onClick={() => handleCategoryHover("beautyCare")}
              >
                <Image
                  src={beautyCare}
                  alt="Chăm sóc sắc đẹp"
                  height={40}
                  width={40}
                />
                Chăm sóc sắc đẹp
              </div>
              {/* <div
                className={`p-2 gap-2 rounded-md flex items-center transition duration-200 cursor-pointer my-2 ${
                  selectedCategory === "medicalEquipment" ? "bg-[#E0F5FE]" : ""
                }`}
                onClick={() => handleCategoryHover("medicalEquipment")}
              >
                <Image
                  src={MedicalEquipme}
                  alt="Thiết bị y tế"
                  height={40}
                  width={40}
                />
                Thiêt bị y tế
              </div> */}
              <div
                className={`p-2 gap-2 rounded-md flex items-center transition duration-200 cursor-pointer my-2 ${
                  selectedCategory === "convenientProduct" ? "bg-[#E0F5FE]" : ""
                }`}
                onClick={() => handleCategoryHover("convenientProduct")}
              >
                <Image
                  src={convenientProd}
                  alt="Sản phẩm tiện lợi"
                  height={40}
                  width={40}
                />
                Sản phẩm tiện lợi
              </div>
              {/* <div
                className={`p-2 gap-2 rounded-md flex items-center transition duration-200 cursor-pointer my-2 ${
                  selectedCategory === "healLife" ? "bg-[#E0F5FE]" : ""
                }`}
                onClick={() => handleCategoryHover("healLife")}
              >
                <Image
                  src={healLife}
                  alt="Chăm sóc sức khỏe"
                  height={40}
                  width={40}
                />
                Chăm sóc sức khỏe
              </div> */}
            </ScrollArea>
          </div>
          <div className="grid grid-cols-5 gap-5 py-2 pl-3 h-fit">
            {renderCategorys()}
          </div>
          <div className="float-right py-4 overflow-hidden ">
            <Image
              src={imageCategory}
              alt="imageCategory"
              className="w-full h-full rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
