import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

const SkeletonCart = () => {
  return (
    <SkeletonTheme baseColor="#E0E0E0" highlightColor="#F5F5F5">
      <div className="container max-w-[1232px] mx-auto ">
        <div className="relative grid items-start gap-4 md:container md:grid-cols-1 md:pb-4 md:pt-6 lg:grid-cols-[min(72%,calc(896rem/16)),1fr]">
          <div className="grid gap-4">
            <div className="grid gap-6 p-4 bg-white rounded-sm md:p-6">
              <div className="hidden grid-flow-col gap-4 md:grid">
                <Skeleton height={30} />
              </div>
              <div className="grid gap-2 md:gap-6">
                <div className="grid gap-2 md:gap-6">
                  <div className="grid gap-2 md:gap-6">
                    <div className="grid grid-cols-[calc(68rem/16)_1fr] items-start gap-2">
                      <Skeleton height={60} width={60} />
                      <div className="flex flex-col items-center justify-between h-full md:flex-row md:space-x-4">
                        <div className="grid content-start flex-1 gap-1">
                          <Skeleton height={20} count={2} />
                        </div>
                        <div className="flex items-center justify-between space-x-4 h-fit md:justify-center">
                          <p className="flex flex-col justify-center md:w-[calc(160rem/16)] md:flex-row md:space-x-1">
                            <span className="text-sm font-normal line-clamp-2 text-neutral-900">
                              <Skeleton height={20} width={100} />
                            </span>
                          </p>

                          <p className="hidden w-[calc(120rem/16)] items-center justify-end md:flex">
                            <span className="text-sm font-semibold line-clamp-2 text-neutral-900">
                              <Skeleton height={20} width={100} />
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-[1px] w-full bg-neutral-200 hidden md:block"></div>
                  </div>
                  <div className="grid gap-2 md:gap-6">
                    <div className="grid grid-cols-[calc(68rem/16)_1fr] items-start gap-2">
                      <Skeleton height={60} width={60} />
                      <div className="flex flex-col items-center justify-between h-full md:flex-row md:space-x-4">
                        <div className="grid content-start flex-1 gap-1">
                          <Skeleton height={20} count={2} />
                        </div>
                        <div className="flex items-center justify-between space-x-4 h-fit md:justify-center">
                          <p className="flex flex-col justify-center md:w-[calc(160rem/16)] md:flex-row md:space-x-1">
                            <span className="text-sm font-normal line-clamp-2 text-neutral-900">
                              <Skeleton height={20} width={100} />
                            </span>
                          </p>

                          <p className="hidden w-[calc(120rem/16)] items-center justify-end md:flex">
                            <span className="text-sm font-semibold line-clamp-2 text-neutral-900">
                              <Skeleton height={20} width={100} />
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-[1px] w-full bg-neutral-200 hidden md:block"></div>
                  </div>
                  <div className="grid gap-2 md:gap-6">
                    <div className="grid grid-cols-[calc(68rem/16)_1fr] items-start gap-2">
                      <Skeleton height={60} width={60} />
                      <div className="flex flex-col items-center justify-between h-full md:flex-row md:space-x-4">
                        <div className="grid content-start flex-1 gap-1">
                          <Skeleton height={20} count={2} />
                        </div>
                        <div className="flex items-center justify-between space-x-4 h-fit md:justify-center">
                          <p className="flex flex-col justify-center md:w-[calc(160rem/16)] md:flex-row md:space-x-1">
                            <span className="text-sm font-normal line-clamp-2 text-neutral-900">
                              <Skeleton height={20} width={100} />
                            </span>
                          </p>

                          <p className="hidden w-[calc(120rem/16)] items-center justify-end md:flex">
                            <span className="text-sm font-semibold line-clamp-2 text-neutral-900">
                              <Skeleton height={20} width={100} />
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-[1px] w-full bg-neutral-200 hidden md:block"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="gap-4 md:grid">
              <div>
                <div className="flex flex-col px-4 space-y-3 bg-white rounded-sm md:p-3">
                  <div className="grid w-full grid-flow-col">
                    <Skeleton height={20} count={2} />
                  </div>
                </div>
              </div>
              <div className="grid items-center grid-flow-col gap-2 bg-white rounded-sm md:grid-flow-row md:items-start md:gap-4 md:p-4">
                <div className="grid gap-4">
                  <Skeleton
                    height={20}
                    count={4}
                    style={{ marginTop: "5px", marginBottom: "5px" }}
                  />
                  <div className="bg-neutral-200 h-[1px] hidden md:block"></div>
                  <div className="grid  gap-0.5 md:grid-flow-col  md:gap-2">
                    <Skeleton
                      height={40}
                      count={2}
                      style={{ marginTop: "5px", marginBottom: "5px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonCart;
