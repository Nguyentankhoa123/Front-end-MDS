import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import { User } from "lucide-react";

const SkeletonUser = () => {
  return (
    <>
      <div className="hidden md:block">
        <SkeletonTheme baseColor="#E0E0E0" highlightColor="#F5F5F5">
          <div className="flex items-center h-10 ">
            <Skeleton
              height={40}
              width={180}
              style={{ borderRadius: "9999px", marginBottom: "4px" }}
            />
          </div>
        </SkeletonTheme>
      </div>
    </>
  );
};

export default SkeletonUser;
