import React from "react";
import drugStore from "@images/drugstore.svg";
import Image from "next/image";
const DrugStore = () => {
  return (
    <>
      <div className="container max-w-[1232px] mx-auto">
        <div className="grid grid-cols-4 gap-3 mt-5">
          <div className="col-span-1">
            <p>Test</p>
          </div>
          <div className="col-span-3">
            <h3>Danh sách nhà thuốc</h3>
            <div className="grid grid-cols-4 gap-4 mt-5">
              <div>
                <div className="flex flex-col items-center gap-2 px-3 pt-4 border rounded-md">
                  <Image src={drugStore} width={60} height={60} alt="" />
                  <div className="flex flex-col items-center w-full gap-1">
                    <p>Nhà thuốc 24h</p>
                    <p className="font-normal text-neutral-400">
                      Đồng Phú, Vĩnh Long
                    </p>
                    <div>
                      <span>Đánh giá: </span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col items-center gap-2 px-3 pt-4 border rounded-md">
                  <Image src={drugStore} width={60} height={60} alt="" />
                  <div className="flex flex-col items-center w-full gap-1">
                    <p>Nhà thuốc 24h</p>
                    <p className="font-normal text-neutral-400">
                      Đồng Phú, Vĩnh Long
                    </p>
                    <div>
                      <span>Đánh giá: </span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col items-center gap-2 px-3 pt-4 border rounded-md">
                  <Image src={drugStore} width={60} height={60} alt="" />
                  <div className="flex flex-col items-center w-full gap-1">
                    <p>Nhà thuốc 24h</p>
                    <p className="font-normal text-neutral-400">
                      Đồng Phú, Vĩnh Long
                    </p>
                    <div>
                      <span>Đánh giá: </span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col items-center gap-2 px-3 pt-4 border rounded-md">
                  <Image src={drugStore} width={60} height={60} alt="" />
                  <div className="flex flex-col items-center w-full gap-1">
                    <p className="font-semibold">Nhà thuốc 24h</p>
                    <p className="font-normal text-neutral-400">
                      Đồng Phú, Vĩnh Long
                    </p>
                    <div>
                      <span>Đánh giá: </span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrugStore;
