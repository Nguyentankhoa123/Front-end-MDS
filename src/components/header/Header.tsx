"use client";
import React from "react";
import dynamic from "next/dynamic";
const Nav = dynamic(() => import("@/components/nav/Nav"), { ssr: true });
const Header = () => {
  return (
    <div>
      <Nav />
    </div>
  );
};

export default Header;
