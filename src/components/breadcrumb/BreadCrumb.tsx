import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type BreadCrumbProps = {
  paths: { url: string; label: string | undefined }[];
  currentPage: string;
};

const BreadCrumb = ({ paths, currentPage }: BreadCrumbProps) => {
  return (
    <>
      <div className="bg-neutral-100">
        <div className="container max-w-[1232px] mx-auto mb-4 py-2">
          <Breadcrumb>
            <BreadcrumbList>
              {paths.map((path, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <Link href={path.url} className="text-[#1250dc]">
                      {path.label}
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </React.Fragment>
              ))}
              {currentPage && (
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </>
  );
};

export default BreadCrumb;
