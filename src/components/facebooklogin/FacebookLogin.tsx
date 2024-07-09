"use client";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { LoginSocialFacebook } from "reactjs-social-login";
import { AlertDialogAction } from "../ui/alert-dialog";

const FacebookLogin = () => {
  return (
    <>
      <LoginSocialFacebook
        appId="988523922743252"
        onResolve={(response: any) => {
          console.log(response);
        }}
        onReject={(error: any) => {
          console.log(error);
        }}
      >
        <AlertDialogAction className="font-normal text-black bg-white border rounded-none shadow-none outline-none border-neutral-300 hover:bg-gray-100 ">
          <FaFacebook className="mr-2 text-xl text-[#1877F2] " />
          Facebook
        </AlertDialogAction>
      </LoginSocialFacebook>
    </>
  );
};

export default FacebookLogin;
