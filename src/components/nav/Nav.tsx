"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import notification from "@images/empty-notification.png";
import {
  User,
  Search,
  Bell,
  ShoppingCart,
  ChevronDown,
  X,
  MapPin,
  TicketPercent,
  NotepadText,
  AlignJustify,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Category from "../category/Category";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import Register from "../register/Register";
import { redirect, useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useUserStore } from "@/store/user";
import { useCookies } from "next-client-cookies";
import { useCartStore } from "@/store/cart";
import SkeletonUser from "../skeletonUser/SkeletonUser";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";

import tes from "@images/banner/bg-header.png";
import logo from "@images/banner/logo-mds.png";
import logoLeft from "@images/banner/logo-left.png";
import bgLeftMenu from "@images/banner/bg-left-menu.png";
import dynamic from "next/dynamic";
import { LoginSocialFacebook } from "reactjs-social-login";
const DynamicLoginSocialFacebook = dynamic(
  () => import("reactjs-social-login").then((mod) => mod.LoginSocialFacebook),
  { ssr: false } // This will load the component only on client side
);
import { useGoogleOneTapLogin } from "@react-oauth/google";

interface MyToken extends JwtPayload {
  given_name: string;
  family_name: string;
  nameid: string;
}

type CartItem = {
  productId: number;
  name: string;
  pictureUrls: string[];
  price: number;
};

type Cart = {
  userId: string;
  cartItems: CartItem[];
};

type Product = {
  id: number;
  name: string;
};

const Nav = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdownCart, setOpenDropdownCart] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenInformation, setIsOpenInformation] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [OpenInformation, setOpenInformation] = useState(false);
  const [fullName, setFullName] = useState("");
  const [provider, setProvider] = useState("");
  const [idToken, setIdToken] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const [detailsLogin, setDetailsLogin] = useState({
    UserName: "",
    Password: "",
  });

  //Skeleton
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const { Name, setName, setUserId } = useUserStore();
  const { cartItems, fetchCart } = useCartStore();

  const cookies = useCookies();
  const token = cookies.get("accessToken");
  let userId: string | undefined;
  if (token) {
    const decodeToken = jwtDecode<MyToken>(token);
    userId = decodeToken.nameid;
  }

  const router = useRouter();

  const handleCategoryOpen = () => {
    setIsOpenCategory((prev) => !prev);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleOpenRegister = () => {
    setIsOpenRegister(true);
    setIsOpenDialog(false);
  };

  const handleOpenLogin = () => {
    setIsOpenDialog(true);
    setIsOpenRegister(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("https://localhost:7151/api/Account/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(detailsLogin),
    });

    if (res.status === 200) {
      const data = await res.json();

      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      cookies.set("accessToken", data.data.accessToken);
      cookies.set("refreshToken", data.data.refreshToken);

      const decodedToken = jwtDecode<MyToken>(data.data.accessToken);

      const fullName = `${decodedToken?.given_name} ${decodedToken?.family_name}`;
      setName(fullName);

      const userId = decodedToken?.nameid;
      setUserId(userId);

      toast.success("Đăng nhập thành công");
      setIsOpenDialog(false);
      router.push("/");
    }

    if (res.status !== 200) {
      toast.error("Đăng nhập không thành công");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailsLogin({
      ...detailsLogin,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && token) {
      setIsLoadingUser(true);
      try {
        const decodedToken = jwtDecode<MyToken>(token);
        const fullName = `${decodedToken?.given_name} ${decodedToken?.family_name}`;
        setName(fullName);
        const userId = decodedToken?.nameid;
        setUserId(userId);
      } finally {
        setIsLoadingUser(false);
      }
    } else {
      setIsLoadingUser(false);
    }
  }, [token]);

  const logOut = () => {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    setName("");
    setIsLoadingUser(false);
  };

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [fetchCart, userId]);

  const handleSearch = async () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://localhost:7151/api/Product/search?nameQuery=${encodeURIComponent(
          searchTerm
        )}&pageNumber=1&pageSize=5`
      );

      if (res.status === 200) {
        const data = await res.json();

        if (data.data && data.data.length > 0) {
          setSearchResults(data.data);
        } else {
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsInputFocused(false);
      setSearchTerm("");
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const highlightKeyword = (name: string, keyword: string) => {
    const parts = name.split(new RegExp(`(${keyword})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <span key={index} className="text-[#0072bc] font-bold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const LoginGoogle = async () => {
    try {
      const res = await fetch(
        `https://localhost:7151/api/Account/Login-Google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Provider: provider,
            IdToken: idToken,
          }),
        }
      );

      if (res.status === 200) {
        const data = await res.json();

        cookies.set("accessToken", data.data.accessToken);
        cookies.set("refreshToken", data.data.refreshToken);

        toast.success("Đăng nhập thành công");
        setIsOpenDialog(false);
        router.push("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const LoginFacebook = async (data: any) => {
    try {
      const res = await fetch(
        `https://localhost:7151/api/Account/Login-Facebook
`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Provider: data.provider,
            IdToken: data.data.accessToken,
          }),
        }
      );

      if (res.status === 200) {
        const data = await res.json();

        cookies.set("accessToken", data.data.accessToken);
        cookies.set("refreshToken", data.data.refreshToken);

        toast.success("Đăng nhập thành công");
        setIsOpenDialog(false);
        router.push("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLoginGoogle = (credentialResponse: any) => {
    console.log(credentialResponse);
    setProvider(credentialResponse.clientId);
    setIdToken(credentialResponse.credential);
    LoginGoogle();
  };
  const responseFacebook = (response: any) => {
    console.log(response);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      console.log(userInfo);
    },
  });

  return (
    <>
      <div className="relative z-50 bg-[#0072bc]">
        {/* <Image src={tes} alt="" /> */}
        <div className="container max-w-[1232px] py-3 mx-auto">
          <div className="grid items-center grid-cols-3 gap-5 mb-2 md:grid-cols-4">
            <div className="block md:hidden">
              <Drawer
                direction="right"
                onOpenChange={() => {
                  setTimeout(
                    () => (document.body.style.pointerEvents = ""),
                    100
                  );
                }}
              >
                <DrawerTrigger>
                  <AlignJustify color="white" size={30} />
                </DrawerTrigger>
                <DrawerContent className="top-0 mt-0 rounded-none">
                  <DrawerHeader>
                    <DrawerTitle className="flex items-center justify-between p-4">
                      <Link href="/">
                        <DrawerClose>
                          <Image
                            src={logoLeft}
                            alt=""
                            className="w-[150px] h-18"
                          />
                        </DrawerClose>
                      </Link>
                      <DrawerClose>
                        <button>
                          <X size={28} />
                        </button>
                      </DrawerClose>
                    </DrawerTitle>
                    <div
                      className="w-full p-4 h-fit text-start"
                      style={{
                        backgroundImage: `url('${bgLeftMenu.src}')`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      {Name ? (
                        <div className="flex items-center justify-between">
                          <p className="text-[16px] text-white line-clamp-1">
                            {Name}
                          </p>
                          <button
                            className="flex items-center justify-center border border-white py-2 px-[12px] rounded-3xl cursor-pointer"
                            onClick={logOut}
                          >
                            <span className="text-[14px] text-white">
                              Đăng xuất
                            </span>
                          </button>
                        </div>
                      ) : (
                        <div>
                          <span className="text-[14px] text-white">
                            Đăng nhập để hưởng những đặc quyền dành riêng cho
                            hội viên
                          </span>
                          <div className="flex gap-2 mt-2 ">
                            <DrawerClose>
                              <button
                                className="flex items-center justify-center bg-[#eaeffa] py-2 px-[12px] rounded-3xl cursor-pointer"
                                onClick={() => setIsOpenDialog(true)}
                              >
                                <span className="text-[14px] text-[#1250dc]">
                                  Đăng nhập
                                </span>
                              </button>
                            </DrawerClose>
                            <DrawerClose>
                              <button
                                className="flex items-center justify-center bg-[#225FE0] py-2 px-[12px] rounded-3xl cursor-pointer"
                                onClick={handleOpenRegister}
                              >
                                <span className="text-[14px] text-white">
                                  Đăng ký
                                </span>
                              </button>
                            </DrawerClose>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-full h-fit text-start">
                      <div className="p-4 font-semibold">
                        <Link href="/duoc-pham">
                          <DrawerClose>Thuốc</DrawerClose>
                        </Link>
                      </div>
                      <div className="p-4 font-semibold">
                        <Link href="/thuc-pham-chuc-nang">
                          <DrawerClose>Thực phẩm chức năng</DrawerClose>
                        </Link>
                      </div>
                      <div className="p-4 font-semibold">
                        <Link href="/cham-soc-ca-nhan">
                          <DrawerClose>Chăm sóc cá nhân</DrawerClose>
                        </Link>
                      </div>
                      <div className="p-4 font-semibold">
                        <Link href="/san-pham-tien-loi">
                          <DrawerClose>Sản phẩm tiện lợi</DrawerClose>
                        </Link>
                      </div>
                      <div className="p-4 font-semibold">
                        <Link href="/me-va-be">
                          <DrawerClose>Mẹ và bé</DrawerClose>
                        </Link>
                      </div>
                      <div className="p-4 font-semibold">
                        <Link href="/cham-soc-sac-dep-co-the">
                          <DrawerClose>Chăm sóc sắc đẹp</DrawerClose>
                        </Link>
                      </div>
                      {/* <div className="p-4 font-semibold">
                        <Link href="/danh-sach-nha-thuoc">
                          <DrawerClose>Nhà thuốc</DrawerClose>
                        </Link>
                      </div> */}
                    </div>
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>
            </div>
            <Link href="/" className="col-span-1">
              <Image src={logo} alt="" className="w-[180px] h-[50px]" />
            </Link>
            <div className="relative hidden w-full col-span-2 md:block">
              <form className="flex items-center overflow-hidden bg-white rounded-[35px] transition">
                <button
                  className={`p-2 m-2 h-full rounded-full  ${
                    isInputFocused ? "bg-[#215EE0]" : "bg-[#c1d0f6]"
                  }`}
                >
                  <Search
                    strokeWidth={1.5}
                    className={`text-2xl transition ${
                      isInputFocused ? "text-white" : "text-[#1250dc]"
                    }`}
                  />
                </button>
                <input
                  type="text"
                  name=""
                  id=""
                  className="pl-[10px] py-1 flex-1 outline-none"
                  placeholder={
                    isInputFocused ? "" : "Tên thuốc, triệu chứng và vitamin"
                  }
                  value={searchTerm}
                  onChange={handleInputSearchChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                />
              </form>
              {isInputFocused || searchTerm ? (
                <div className="absolute flex flex-col w-full gap-3 p-6 transition delay-1000 translate-y-2 bg-white shadow-lg rounded-2xl h-fit ">
                  {searchResults && searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <Link
                        key={result.id}
                        href={`/${result.id}`}
                        onClick={() => {
                          setSearchTerm("");
                        }}
                      >
                        <div className="hover:bg-[#e3f7fc] py-1 px-2 rounded-sm cursor-pointer transition ">
                          {highlightKeyword(result.name, searchTerm)}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="hover:bg-[#e3f7fc] py-1 px-2 rounded-sm cursor-pointer transition ">
                      Tìm kiếm sản phẩm
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            <div className="items-center col-span-1">
              <div className="flex items-center float-right gap-3">
                <div className="flex items-center gap-3 text-[30px] text-white lg:border-r">
                  <DropdownMenu
                    open={openDropdownCart}
                    onOpenChange={() => setOpenDropdownCart(false)}
                  >
                    <DropdownMenuTrigger
                      style={{ outline: "none" }}
                      onClick={() => setOpenDropdownCart(true)}
                      className="hidden md:block"
                    >
                      <ShoppingCart className="lg:mr-6" />
                      {userId && cartItems.length > 0 && (
                        <div className="absolute top-[-9px] w-5 h-5 translate-x-3 ">
                          <span className="inline-flex items-center justify-center w-full h-full p-1 text-[12px] bg-red-500 rounded-full border border-white ">
                            {cartItems.length}
                          </span>
                        </div>
                      )}
                    </DropdownMenuTrigger>
                    <Link href="/cart" className="block md:hidden">
                      <ShoppingCart className="lg:mr-6" />
                      {userId && cartItems.length > 0 && (
                        <div className="absolute top-[-9px] w-5 h-5 translate-x-3 ">
                          <span className="inline-flex items-center justify-center w-full h-full p-1 text-[12px] bg-red-500 rounded-full border border-white ">
                            {cartItems.length}
                          </span>
                        </div>
                      )}
                    </Link>
                    <DropdownMenuContent
                      className="mt-2 max-w-[500px] h-fit  flex-col hidden md:flex"
                      onMouseLeave={() => setOpenDropdownCart(false)}
                    >
                      <DropdownMenuLabel>Sản phẩm mới thêm</DropdownMenuLabel>
                      <ScrollArea className="w-full px-2 py-2 h-52">
                        {cartItems.map((item) => (
                          <Link
                            href={`/medicine/${item.productId}`}
                            key={item.productId}
                            className="flex items-center justify-center gap-5 py-3"
                            onClick={() => setOpenDropdownCart(false)}
                          >
                            <Image
                              src={item.pictureUrls[0]}
                              alt={item.name}
                              width={500}
                              height={500}
                              className="w-[60px] h-[60px]"
                            />
                            <div className="text-[15px] work-break pl-3 pr-5">
                              {item.name}
                            </div>
                            <div className="font-semibold">
                              {item.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </div>
                          </Link>
                        ))}
                      </ScrollArea>
                      <div className="flex items-end justify-between flex-1 gap-6 py-2 ">
                        <div>
                          <DropdownMenuLabel>
                            {cartItems.length} sản phẩm trong giỏ hàng
                          </DropdownMenuLabel>
                        </div>
                        <div>
                          <Button
                            variant="outline"
                            className="mt-1 text-white bg-blue-500 hover:text-white hover:bg-blue-600"
                          >
                            <Link
                              href={"/cart"}
                              onClick={() => setOpenDropdownCart(false)}
                            >
                              Xem giỏ hàng
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {isLoadingUser ? (
                  <SkeletonUser />
                ) : Name ? (
                  <DropdownMenu
                    open={OpenInformation}
                    onOpenChange={() => setOpenInformation(false)}
                  >
                    <DropdownMenuTrigger
                      style={{ outline: "none", width: "180px" }}
                      className="hidden md:block"
                    >
                      <div
                        className="flex items-center justify-center gap-1 p-2 bg-white rounded-full cursor-pointer"
                        onClick={() => {
                          setIsOpenInformation(true);
                          setOpenInformation(true);
                        }}
                      >
                        <User strokeWidth={1.5} className="text-2xl" />
                        <p className="text-sm line-clamp-1">{Name}</p>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      onMouseLeave={() => setOpenInformation(false)}
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="py-3">
                          <User className="w-5 h-5 mr-2" />
                          <span className="text-[16px] font-medium">
                            Thông tin cá nhân
                          </span>
                        </DropdownMenuItem>{" "}
                        <DropdownMenuSeparator />
                        <Link href="/lich-su-don-hang">
                          <DropdownMenuItem className="py-3">
                            <NotepadText className="w-5 h-5 mr-2" />
                            <span className="text-[16px] font-medium">
                              Lịch sử mua hàng
                            </span>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="py-3">
                          <TicketPercent className="w-5 h-5 mr-2" />
                          <span className="text-[16px] font-medium">
                            Mã giảm giá
                          </span>
                        </DropdownMenuItem>{" "}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="py-3">
                          <MapPin className="w-5 h-5 mr-2" />
                          <span className="text-[16px] font-medium">
                            Địa chỉ nhận hàng{" "}
                          </span>
                        </DropdownMenuItem>{" "}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="py-3" onClick={logOut}>
                          <span className="text-[16px] font-medium text-neutral-400">
                            Đăng xuất
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div
                    className="hidden md:flex w-[180px] items-center gap-2 p-2 bg-white rounded-full cursor-pointer"
                    onClick={() => setIsOpenDialog(true)}
                  >
                    <User strokeWidth={1.5} className="text-2xl" />
                    <p className="text-sm">Đăng ký/Đăng nhập</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* responsive search */}
          <div className="relative block w-full col-span-2 md:hidden ">
            <form className="flex items-center overflow-hidden bg-white rounded-[35px] transition">
              <button
                className={`p-1 m-2 h-full rounded-full  ${
                  isInputFocused ? "bg-[#215EE0]" : "bg-[#c1d0f6]"
                }`}
              >
                <Search
                  strokeWidth={1.5}
                  className={`text-2xl transition ${
                    isInputFocused ? "text-white" : "text-[#1250dc]"
                  }`}
                />
              </button>
              <input
                type="text"
                name=""
                id=""
                className="pl-[10px] py-1 flex-1 outline-none"
                placeholder={
                  isInputFocused ? "" : "Tên thuốc, triệu chứng và vitamin"
                }
                value={searchTerm}
                onChange={handleInputSearchChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
              />
            </form>
            {isInputFocused || searchTerm ? (
              <div className="absolute flex flex-col w-full gap-3 p-6 transition delay-1000 translate-y-2 bg-white shadow-lg rounded-2xl h-fit ">
                {searchResults && searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={`/${result.id}`}
                      onClick={() => {
                        setSearchTerm("");
                      }}
                    >
                      <div className="hover:bg-[#e3f7fc] py-1 px-2 rounded-sm cursor-pointer transition ">
                        {highlightKeyword(result.name, searchTerm)}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="hover:bg-[#e3f7fc] py-1 px-2 rounded-sm cursor-pointer transition ">
                    Tìm kiếm sản phẩm
                  </div>
                )}
              </div>
            ) : null}
          </div>
          <div className="items-center hidden gap-1 mt-2 lg:gap-5 md:flex">
            <div>
              <button
                className="flex items-center gap-1 p-1 font-semibold bg-white rounded-sm lg:p-2 group"
                onClick={handleCategoryOpen}
              >
                <span className="flex gap-2 group-hover:text-blue-700 text-[12px] lg:text-[14px]">
                  <AlignJustify className="text-2xl" />
                  Danh mục
                </span>
                <span className="group-hover:text-blue-700">
                  <ChevronDown
                    className={` duration-200 ${
                      isOpenCategory ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
            <div className=" hidden flex-1 md:flex justify-between text-[12px] lg:text-[16px] text-white ">
              <Link
                href="/duoc-pham"
                prefetch={false}
                className="cursor-pointer"
              >
                Thuốc
              </Link>
              <Link href="/thuc-pham-chuc-nang" className="cursor-pointer">
                Thực phẩm chức năng
              </Link>
              <Link href="/cham-soc-ca-nhan" className="cursor-pointer">
                Chăm sóc cá nhân
              </Link>
              <Link href="/san-pham-tien-loi" className="cursor-pointer">
                Sản phẩm tiện lợi
              </Link>
              <Link href="/me-va-be" className="cursor-pointer">
                Mẹ và bé
              </Link>
              <Link href="/cham-soc-sac-dep-co-the" className="cursor-pointer">
                Chăm sóc sắc đẹp
              </Link>
              {/* <Link href="/danh-sach-nha-thuoc" className="cursor-pointer">
                Nhà thuốc
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      {isOpenCategory && <Category />}
      {isOpenCategory && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={handleCategoryOpen}
        ></div>
      )}
      <AlertDialog open={isOpenDialog}>
        <AlertDialogContent>
          <AlertDialogTitle className="flex justify-between text-xl text-center">
            <p>Xin chào,</p>
            <X
              size={30}
              className="cursor-pointer "
              onClick={() => setIsOpenDialog(false)}
            />
          </AlertDialogTitle>
          <p>Vui lòng đăng nhập để tiếp tục</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col mt-2">
                <input
                  type="text"
                  name="UserName"
                  id=""
                  placeholder="Nhập tên tài khoản"
                  className="px-3 py-2 text-[16px] border outline-none text-neutral-900 border-neutral-300 focus:border-neutral-700"
                  value={detailsLogin.UserName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mt-2">
                <input
                  type="password"
                  name="Password"
                  id=""
                  placeholder="Nhập mật khẩu"
                  className="px-3 py-2 text-[16px] border outline-none text-neutral-900 border-neutral-300 focus:border-neutral-700"
                  value={detailsLogin.Password}
                  onChange={handleChange}
                />
              </div>
              <AlertDialogAction
                className="bg-[#0072bc] hover:bg-blue-900  rounded-none mt-3"
                type="submit"
              >
                Đăng nhập
              </AlertDialogAction>
            </div>
          </form>

          <div className="py-2">
            <p className="text-[14px] text-blue-500">Quên mật khẩu</p>
          </div>
          <div className="flex items-center">
            <div className="bg-neutral-300 h-[1px] flex-1"></div>
            <div className="px-4 text-[#ccc]">Hoặc</div>
            <div className="bg-neutral-300 h-[1px] flex-1"></div>
          </div>
          <div className="grid grid-cols-2 gap-10 pt-5">
            {/* <AlertDialogAction className="font-normal text-black bg-white border rounded-none shadow-none outline-none border-neutral-300 hover:bg-gray-100 ">
              <FaFacebook className="mr-2 text-xl text-[#1877F2] " />
              Facebook
            </AlertDialogAction> */}
            <DynamicLoginSocialFacebook
              appId="988523922743252"
              onResolve={async (response: any) => {
                console.log(response);
                await LoginFacebook(response);
              }}
              onReject={(error: any) => {
                console.log(error);
              }}
            >
              <AlertDialogAction className="rounded-sm h-[40px]  text-[#3c4043] font-medium bg-white border  shadow-none outline-none border-neutral-300 hover:bg-[#f8faff] text-[13px] px-[9.5px]">
                <FaFacebook className="mr-2 text-[18px] text-[#1877F2] " />
                Đăng nhập bằng Facebook
              </AlertDialogAction>
            </DynamicLoginSocialFacebook>
            <GoogleLogin
              width={100}
              onSuccess={handleLoginGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          <div className="flex items-center justify-center pt-3">
            <div className="text-[#ccc]">
              <p>
                Bạn mới đến MDS?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={handleOpenRegister}
                >
                  {" "}
                  Đăng ký
                </span>
              </p>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* MenuBar shadcn */}

      <Register
        isOpenRegister={isOpenRegister}
        setIsOpenRegister={setIsOpenRegister}
        setIsOpenDialog={setIsOpenDialog}
      />
    </>
  );
};

export default Nav;
