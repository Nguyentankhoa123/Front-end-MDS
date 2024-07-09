"use client";
import { useCartStore } from "@/store/cart";
import {
  Minus,
  Plus,
  TicketPercent,
  Trash2,
  CirclePlus,
  Store,
} from "lucide-react";
import cod from "@images/Cod.png";
import vnpay from "@images/vnpay.png";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import provinceData from "../../../public/address/province.json";
import districtData from "../../../public/address/district.json";
import wardData from "../../../public/address/wards.json";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCookies } from "next-client-cookies";
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-dropdown-menu";
import dayjs from "dayjs";
import EmptyCart from "@/components/emptycart/page";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/loading";
import SkeletonLoading from "@/components/skeletonCheckout/SkeletonLoading";
import Link from "next/link";

type Province = {
  Mã: string;
  Tên: string;
  Cấp: string;
};

type District = {
  Mã: string;
  Tên: string;
  Cấp: string;
  "Mã TP": string;
  "Tỉnh / Thành Phố": string;
};

type Ward = {
  Mã: string;
  Tên: string;
  Cấp: string;
  "Mã QH": string;
  "Quận Huyện": string;
  "Mã TP": string;
  "Tỉnh / Thành Phố": string;
};

interface MyToken extends JwtPayload {
  nameid: string;
}

type Address = {
  name: string;
  contact: string;
  street: string;
  ward: string;
  district: string;
  province: string;
  userId: string;
  id: number;
  isDefault: boolean;
};

type Discount = {
  name: string;
  percent: number;
  maxDiscountAmount: number;
  endDate: string;
  code: string;
};

const CheckOut = () => {
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const router = useRouter();

  let userId: string | undefined;
  if (token) {
    const decodeToken = jwtDecode<MyToken>(token);
    userId = decodeToken.nameid;
  }
  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState<Address[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string | undefined>(
    ""
  );

  const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(
    ""
  );
  const [selectedWard, setSelectedWard] = useState<string | undefined>("");

  const [districtOptions, setDistrictOptions] = useState<District[]>([]);
  const [wardOptions, setWardOptions] = useState<Ward[]>([]);

  const [detailAddress, setdetailAddress] = useState({
    Name: "",
    Contact: "",
    Street: "",
    Ward: "",
    District: "",
    Province: "",
    UserId: userId,
    IsDefault: false,
  });

  // Address
  const [defaultAddress, setDefaultAddress] = useState<Address | undefined>();
  const [selectedDefaultAddress, setSelectedDefaultAddress] = useState<
    Address | undefined
  >();
  const [isOpenAddAddress, setIsOpenAddAddress] = useState(false);
  const [isOpenChangeAddress, setIsOpenChangeAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | undefined>();

  //Discount
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [isOpenDiscount, setIsOpenDiscount] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount>();

  //Order
  const [detailOrder, setDetailOrder] = useState({
    createOn: new Date().toISOString(),
    orderStatus: "Giao hàng nhanh",
    shippingType: "COD",
    shippingDate: new Date().toISOString(),
    carrier: "Giao hàng nhanh",
    paymentType: "",
    paymentStatus: "Đang xử lý",
    paymentDate: new Date().toISOString(),
  });

  const { cartItems, fetchCart } = useCartStore();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleUpdateClick = (address: Address | undefined) => {
    if (address) {
      setCurrentAddress(address);
      setSelectedProvince(
        provinceData.find((p) => p.Tên === address.province)?.Mã || ""
      );
      setSelectedDistrict(
        districtData.find((d) => d.Tên === address.district)?.Mã || ""
      );
      setSelectedWard(wardData.find((w) => w.Tên === address.ward)?.Mã || "");

      setdetailAddress({
        Name: address.name,
        Contact: address.contact,
        Street: address.street,
        Ward: address.ward,
        District: address.district,
        Province: address.province,
        UserId: userId,
        IsDefault: false,
      });

      setIsOpenAddAddress(true);
      setIsOpenChangeAddress(false);
    }
  };

  const handleAddAddress = () => {
    setdetailAddress({
      Name: "",
      Contact: "",
      Street: "",
      Ward: "",
      District: "",
      Province: "",
      UserId: userId,
      IsDefault: false,
    });
    setIsOpenAddAddress(true);
    setIsOpenChangeAddress(false);
  };

  useEffect(() => {
    if (currentAddress) {
      setSelectedProvince(
        provinceData.find((p) => p.Tên === currentAddress.province)?.Mã
      );
      setSelectedDistrict(
        districtData.find((d) => d.Tên === currentAddress.district)?.Mã
      );
      setSelectedWard(wardData.find((w) => w.Tên === currentAddress.ward)?.Mã);
    }
    console.log(currentAddress);
  }, [currentAddress, provinceData, districtData, wardData]);

  useEffect(() => {
    if (selectedProvince) {
      const filteredDistrict = districtData.filter(
        (dt) => dt["Mã TP"] === selectedProvince
      ) as District[];
      setDistrictOptions(filteredDistrict);
    } else {
      setDistrictOptions([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const filteredWard = wardData.filter(
        (w) => w["Mã QH"] === selectedDistrict
      ) as Ward[];
      setWardOptions(filteredWard);
    } else {
      setWardOptions([]);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedWard) {
      setdetailAddress((prev) => ({ ...prev, Ward: selectedWard }));
    }
  }, [selectedWard]);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProvince(event.target.value);
    setSelectedDistrict("");
    setSelectedWard("");
    // console.log(selectedProvince);
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrict(event.target.value);
    // console.log(selectedDistrict);
  };

  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWard(event.target.value);
    // console.log(selectedWard);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdetailAddress({
      ...detailAddress,
      [event.target.name]: event.target.value,
    });
  };

  const handleDefaultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdetailAddress({ ...detailAddress, IsDefault: event.target.checked });
  };

  const fetchAddress = async () => {
    const res = await fetch(`https://localhost:7151/api/Address/${userId}`);
    const data = await res.json();
    setAddress(data.data);
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const province = provinceData.find(
      (province) => province.Mã === selectedProvince
    )?.Tên;
    const district = districtData.find(
      (district) => district.Mã === selectedDistrict
    )?.Tên;
    const ward = wardData.find((ward) => ward.Mã === selectedWard)?.Tên;

    if (!province || !district || !ward) {
      toast.error("Vui lòng chọn đầy đủ thông tin tỉnh, quận, và phường.");
      return;
    }

    const updatedDetailAddress = {
      ...detailAddress,
      Province: province,
      District: district,
      Ward: ward,
    };

    const url = currentAddress
      ? `https://localhost:7151/api/Address/${currentAddress.id}`
      : "https://localhost:7151/api/Address";
    const method = currentAddress ? "PUT" : "POST";

    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDetailAddress),
    });

    if (res.status === 201 || res.status === 200) {
      toast.success(
        currentAddress
          ? "Cập nhật địa chỉ thành công"
          : "Thêm địa chỉ thành công"
      );
      fetchAddress();
      setdetailAddress({
        Name: "",
        Contact: "",
        Street: "",
        Ward: "",
        District: "",
        Province: "",
        UserId: userId,
        IsDefault: false,
      });
    } else {
      toast.error("Cập nhật địa chỉ không thành công");
    }
  };

  useEffect(() => {
    if (address) {
      const defaultAddress = address.find((addr) => addr.isDefault === true);
      if (defaultAddress) {
        setDefaultAddress(defaultAddress);
      }
    }
  }, [address]);

  //Discount

  const fetchDiscount = async () => {
    const res = await fetch(`https://localhost:7151/api/Discount`);
    const data = await res.json();
    setDiscounts(data.data);
  };

  useEffect(() => {
    fetchDiscount();
  }, []);

  const formatDate = (date: string) => {
    const parsedDate = dayjs(date);

    const formattedDate = parsedDate.format("DD/MM/YYYY");
    return formattedDate;
  };

  const calculateDiscountAmount = (
    totalAmount: number,
    percent: number,
    maxDiscountAmount: number
  ): number => {
    const discountAmountPercent = (totalAmount * percent) / 100;
    return discountAmountPercent > maxDiscountAmount
      ? maxDiscountAmount
      : discountAmountPercent;
  };

  const discountAmount = selectedDiscount
    ? calculateDiscountAmount(
        totalPrice,
        selectedDiscount.percent,
        selectedDiscount.maxDiscountAmount
      )
    : 0;

  const totalAfterDiscount = totalPrice - discountAmount;

  const handleChangePaymentType = (paymentType: string) => {
    setDetailOrder((prevOrderDetails) => ({
      ...prevOrderDetails,
      paymentType: paymentType,
    }));
  };

  const handleOrder = async () => {
    setIsLoading(true);

    const addressId =
      selectedDefaultAddress?.id || address.find((addr) => addr.isDefault)?.id;

    const url = selectedDiscount
      ? `https://localhost:7151/api/Order?userId=${userId}&code=${selectedDiscount.code}&addressId=${addressId}`
      : `https://localhost:7151/api/Order?userId=${userId}&addressId=${addressId}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detailOrder),
      });
      const data = await res.json();

      if (res.status === 200) {
        toast.success("Đơn hàng thanh toán");
        const paymentUrl = data.data.paymentUrl;

        if (paymentUrl) {
          router.push(paymentUrl);
        }
        if (!paymentUrl && userId) {
          await useCartStore.getState().fetchCart(userId);
          router.push("/");
        }
      } else {
        toast.error(data.message || "Đã xảy ra lỗi");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderNew = async () => {
    setIsLoading(true);

    const addressId =
      selectedDefaultAddress?.id || address.find((addr) => addr.isDefault)?.id;

    const url = selectedDiscount
      ? `https://localhost:7151/api/Order/OrderDrugstore?userId=${userId}&code=${selectedDiscount.code}&addressId=${addressId}`
      : `https://localhost:7151/api/Order/OrderDrugstore?userId=${userId}&addressId=${addressId}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detailOrder),
      });
      const data = await res.json();

      if (res.status === 200) {
        toast.success("Đơn hàng thanh toán");
        const paymentUrl = data.data.paymentUrl;

        if (paymentUrl) {
          router.push(paymentUrl);
        }
        if (!paymentUrl && userId) {
          await useCartStore.getState().fetchCart(userId);
          router.push("/");
        }
      } else {
        toast.error(data.message || "Đã xảy ra lỗi");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  const [isLoadingCallAPI, setIsLoadingCallAPI] = useState(true);

  // useEffect(() => {
  //   // Giả lập việc tải dữ liệu bằng cách sử dụng setTimeout
  //   const timer = setTimeout(() => {
  //     setIsLoadingCheckout(false);
  //   }, 5000000); // Đặt thời gian chờ là 5 giây

  //   // Dọn dẹp timer khi component unmount
  //   return () => clearTimeout(timer);
  // }, []);
  useEffect(() => {
    if (userId) {
      fetchCart(userId).finally(() => {
        setIsLoadingCallAPI(false);
      });
    }
  }, [fetchCart, userId]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="bg-[#F7F7F7]">
        {isLoadingCallAPI ? (
          <SkeletonLoading />
        ) : (
          cartItems.length > 0 && (
            <div className="container max-w-[1232px] mx-auto ">
              <div className="relative grid items-start gap-4 md:container md:grid-cols-1 md:pb-4 md:pt-6 lg:grid-cols-[min(72%,calc(896rem/16)),1fr]">
                <div className="grid gap-4">
                  <div className="grid gap-6 p-4 bg-white rounded-sm md:p-6">
                    <div className="items-center justify-between hidden grid-flow-col gap-4 md:grid">
                      <h1 className="text-base font-semibold text-neutral-900 md:text-2xl md:font-bold">
                        Thanh toán
                      </h1>
                    </div>
                    <div className="grid gap-2 md:gap-6">
                      <div className="grid gap-2 md:gap-6">
                        {cartItems.map((item) => (
                          <div className="grid gap-2 md:gap-6">
                            <Link
                              href={`/danh-sach-nha-thuoc/${item.drugstoreId}`}
                              className="flex items-center gap-2"
                            >
                              <Store size={16} />
                              <p className="text-blue-500">
                                {item.drugstoreName}
                              </p>
                            </Link>
                            <div
                              className="grid grid-cols-[calc(68rem/16)_1fr] items-start gap-2"
                              key={item.productId}
                            >
                              <div className="relative h-[calc(68rem/16)] w-[calc(68rem/16)] rounded-sm border border-neutral-100">
                                <Image
                                  src={item.pictureUrls[0]}
                                  alt=""
                                  width={500}
                                  height={500}
                                  className="w-[60px] h-[60px]"
                                />
                              </div>
                              <div className="flex flex-col items-center justify-between h-full md:flex-row md:space-x-4">
                                <div className="grid content-start flex-1 gap-1">
                                  <p className="text-sm font-semibold line-clamp-2 text-neutral-900">
                                    {item.name}
                                  </p>
                                </div>
                                <div className="flex items-center justify-between space-x-4 h-fit md:justify-center">
                                  <p className="flex flex-col justify-center md:w-[calc(160rem/16)] md:flex-row md:space-x-1">
                                    <span className="text-sm font-normal line-clamp-2 text-neutral-900">
                                      x{item.quantity}
                                    </span>
                                  </p>

                                  <p className="hidden w-[calc(120rem/16)] items-center justify-end md:flex">
                                    <span className="text-sm font-semibold line-clamp-2 text-neutral-900">
                                      {(
                                        item.price * item.quantity
                                      ).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="float-end text-[14px] text-[#05a] cursor-pointer">
                                Chọn Voucher của shop
                              </p>
                            </div>
                            <div className="h-[1px] w-full bg-neutral-200 hidden md:block"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid gap-6 p-4 bg-white rounded-sm md:p-6">
                      <div className="items-center justify-between hidden grid-flow-col gap-4 md:grid">
                        <h1 className="text-base text-neutral-900 md:text-[16px] md:font-semibold">
                          Hình thức nhận hàng
                        </h1>
                      </div>
                      <div className="flex">
                        <div>
                          <button className="relative inline-flex items-center justify-center w-auto px-4 py-2 mb-4 mr-2 text-sm font-semibold border-0 rounded-full outline-none hover:bg-neutral-300 focus:ring-neutral-300 h-9 whitespace-nowrap bg-[#e3f7fc] text-[#0072bc]">
                            <span>Giao hàng tận nơi</span>
                          </button>
                          <button className="relative inline-flex items-center justify-center w-auto px-4 py-2 mb-4 text-sm font-semibold border-0 rounded-full outline-none bg-neutral-200 hover:bg-neutral-300 focus:ring-neutral-300 text-neutral-900 h-9 whitespace-nowrap">
                            <span>Nhận tại nhà thuốc</span>
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {defaultAddress ? (
                          <div>
                            <div className="flex item-center">
                              <div className="flex-1 space-y-2 font-normal">
                                <p className="font-semibold">
                                  Thông tin vận chuyển
                                </p>
                                <p>{`${defaultAddress.name} | ${defaultAddress.contact}`}</p>
                                <p>{`${defaultAddress.street}, ${defaultAddress.ward}, ${defaultAddress.district}, ${defaultAddress.province}`}</p>
                                {defaultAddress.isDefault && (
                                  <div>
                                    <span className="text-[#1b51a3] bg-[#ebf3fa] px-2 py-1 rounded-sm">
                                      Mặc định
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <p
                                  className="text-blue-500 cursor-pointer"
                                  onClick={() => setIsOpenChangeAddress(true)}
                                >
                                  Thay đổi
                                </p>
                              </div>
                            </div>
                            <div className="h-[1px] w-full bg-neutral-200 hidden md:block my-4"></div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex item-center">
                              <button
                                className="flex items-center gap-3"
                                onClick={() => setIsOpenAddAddress(true)}
                              >
                                <CirclePlus color="#0072BC" strokeWidth={1.5} />
                                <span className="text-blue-500">
                                  Cập nhật địa chỉ giao hàng
                                </span>
                              </button>
                            </div>
                            <div className="h-[1px] w-full bg-neutral-200 hidden md:block my-4"></div>
                          </div>
                        )}

                        {/* <div className="flex">
                          <div className="flex-1 space-y-2">
                            <p className="font-semibold">Đơn vị vận chuyển</p>
                          </div>
                          <div>
                            <p className="text-blue-500">Thay đổi</p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid gap-6 p-4 bg-white rounded-sm md:p-6">
                      <div className="items-center justify-between hidden grid-flow-col gap-4 md:grid">
                        <h1 className="text-base text-neutral-900 md:text-[16px] md:font-semibold">
                          Phương thức thanh toán
                        </h1>
                      </div>
                      <div className="grid items-center col-span-1 gap-4 md:cursor-pointer">
                        <div>
                          <div className="flex gap-4">
                            <input
                              type="radio"
                              name="paymentType"
                              onChange={() => handleChangePaymentType("cod")}
                              checked={detailOrder.paymentType === "cod"}
                            />
                            <div className="flex items-center gap-4">
                              <Image
                                src={cod}
                                alt=""
                                width={500}
                                height={500}
                                className="w-[40px]"
                              />
                              <p>Tiền mặt</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex gap-4">
                            <input
                              type="radio"
                              name="paymentType"
                              id=""
                              onChange={() => handleChangePaymentType("VnPay")}
                              checked={detailOrder.paymentType === "VnPay"}
                            />
                            <div className="flex items-center gap-4">
                              <Image
                                src={vnpay}
                                alt=""
                                width={500}
                                height={500}
                                className="w-[40px] h-[40px]"
                              />
                              <p>Ví VNPay</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="gap-4 md:grid">
                    <div>
                      <div className="flex flex-col px-4 space-y-3 bg-white rounded-sm md:p-3">
                        <div className="grid items-center justify-between w-full grid-flow-col">
                          <div className="grid grid-cols-[24px_1fr] items-center justify-start gap-1">
                            <TicketPercent color="#0072BC" />
                            <p className="font-semibold">Khuyễn mãi</p>
                          </div>
                          <div>
                            <button
                              className="text-blue-500"
                              onClick={() => setIsOpenDiscount(true)}
                            >
                              Chọn mã
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid items-center grid-flow-col gap-2 bg-white rounded-sm md:grid-flow-row md:items-start md:gap-4 md:p-4">
                      <div className="grid gap-4">
                        <div className="items-center justify-between hidden grid-flow-col gap-2 md:grid">
                          <h1 className="text-[16px] font-semibold text-neutral-900">
                            Chi tiết thanh toán
                          </h1>
                        </div>
                        <div className="items-center justify-between hidden grid-flow-col gap-2 md:grid">
                          <p className="text-sm text-neutral-900">Tạm tính</p>
                          <p className="text-sm font-semibold text-neutral-900">
                            {totalPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        </div>
                        <div className="items-center justify-between hidden grid-flow-col gap-2 md:grid">
                          <p className="text-sm text-neutral-900">Giảm giá</p>

                          {selectedDiscount ? (
                            <p className="text-sm font-semibold text-neutral-900">
                              {discountAmount.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </p>
                          ) : (
                            "-"
                          )}
                        </div>
                        <div className="items-center justify-between hidden grid-flow-col gap-2 md:grid">
                          <p className="text-sm text-neutral-900">
                            Phí vận chuyển
                          </p>
                          <p className="text-sm font-semibold text-neutral-900">
                            -
                          </p>
                        </div>

                        <div className="bg-neutral-200 h-[1px] hidden md:block"></div>
                        <div className="grid items-center justify-items-end gap-0.5 md:grid-flow-col md:justify-between md:gap-2">
                          <p className="text-sm text-neutral-900 md:text-base md:font-semibold">
                            Tổng tiền
                          </p>
                          <p className="text-xl font-bold leading-8 text-red-500 no-underline md:text-2xl">
                            {totalAfterDiscount.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        </div>
                      </div>
                      <button
                        className="w-full px-4 py-2 text-sm text-white outline-none border border-solid bg-[#0072bc] rounded-lg hover:bg-[#005596]"
                        onClick={handleOrder}
                      >
                        Mua hàng cũ ({cartItems.length})
                      </button>
                      <button
                        className="w-full px-4 py-2 text-sm text-white outline-none border border-solid bg-[#0072bc] rounded-lg hover:bg-[#005596]"
                        onClick={handleOrderNew}
                      >
                        Mua hàng mới ({cartItems.length})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        <AlertDialog open={isOpenAddAddress} onOpenChange={setIsOpenAddAddress}>
          <AlertDialogContent>
            <AlertDialogTitle className="flex justify-between text-xl text-center">
              <p>Địa chỉ mới</p>
            </AlertDialogTitle>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 rounded-lg">
                <div className="flex flex-col gap-3 mt-2">
                  <p className="font-medium">Họ và tên</p>
                  <input
                    value={detailAddress.Name}
                    onChange={handleChange}
                    type="text"
                    name="Name"
                    placeholder="Nhập họ và tên"
                    className="px-3 py-2 text-[16px] border outline-none text-neutral-900 border-neutral-300 focus:border-neutral-700 rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <p className="font-medium">Số điện thoại</p>
                  <input
                    value={detailAddress.Contact}
                    onChange={handleChange}
                    type="text"
                    name="Contact"
                    placeholder="Số điện thoại"
                    className="px-3 py-2 text-[16px] border outline-none text-neutral-900 border-neutral-300 focus:border-neutral-700 rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <p className="font-medium">Địa chỉ</p>
                  <select
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    className="px-3 py-2
                    text-[16px] border outline-none text-neutral-900
                    border-neutral-300 focus:border-neutral-700 rounded-lg"
                  >
                    {!selectedProvince && (
                      <option value="">Chọn tỉnh/Thành phố</option>
                    )}
                    {provinceData.map((province) => {
                      return (
                        <option value={province.Mã} key={province.Mã}>
                          {province.Tên}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col mt-2">
                  <select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="px-3 py-2
                    text-[16px] border outline-none text-neutral-900
                    border-neutral-300 focus:border-neutral-700 rounded-lg"
                  >
                    {!selectedDistrict && (
                      <option value="">Chọn Quận/Huyện</option>
                    )}
                    {districtOptions.map((district) => {
                      return (
                        <option value={district.Mã} key={district.Mã}>
                          {district.Tên}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col mt-2">
                  <select
                    value={selectedWard}
                    onChange={handleWardChange}
                    className="px-3 py-2
                    text-[16px] border outline-none text-neutral-900
                    border-neutral-300 focus:border-neutral-700 rounded-lg"
                  >
                    {!selectedWard && <option value="">Chọn Phường/Xã</option>}
                    {wardOptions.map((ward) => {
                      return (
                        <option value={ward.Mã} key={ward.Mã}>
                          {ward.Tên}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <input
                    value={detailAddress.Street}
                    onChange={handleChange}
                    type="text"
                    name="Street"
                    placeholder="Nhập số nhà, tên đường"
                    className="px-3 py-2 text-[16px] border outline-none text-neutral-900 border-neutral-300 focus:border-neutral-700 rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={detailAddress.IsDefault}
                    onChange={handleDefaultChange}
                  />
                  <span>Đặt làm địa chỉ mặc định</span>
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel>Quay lại</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-[#0072bc] hover:bg-blue-900"
                    type="submit"
                  >
                    Lưu lại
                  </AlertDialogAction>
                </AlertDialogFooter>
              </div>
            </form>
          </AlertDialogContent>
        </AlertDialog>

        <div>
          <AlertDialog
            open={isOpenChangeAddress}
            onOpenChange={setIsOpenChangeAddress}
          >
            <AlertDialogContent>
              <AlertDialogTitle className="flex justify-between text-xl text-center">
                <p>Địa chỉ giao hàng</p>
              </AlertDialogTitle>

              <form>
                <div className="flex flex-col gap-1 rounded-lg">
                  {address && address.length > 0 ? (
                    <ScrollArea className="h-[350px] py-2 pr-3 border-r w-fit">
                      {address.map((a, index) => (
                        <div
                          onClick={() => setSelectedDefaultAddress(a)}
                          className="cursor-pointer"
                        >
                          <div className="flex gap-2">
                            <div>
                              <input
                                type="radio"
                                name="address"
                                checked={selectedDefaultAddress === a}
                                onChange={() => setSelectedDefaultAddress(a)}
                              />
                            </div>

                            <div className="flex-1 space-y-2 font-normal">
                              <p>{`${a.name} | ${a.contact}`}</p>
                              <p>{`${a.street}, ${a.ward}, ${a.district}, ${a.province}`}</p>
                            </div>
                            <div>
                              <p
                                className="text-blue-500 cursor-pointer"
                                onClick={() => handleUpdateClick(a)}
                              >
                                Cập nhật
                              </p>
                            </div>
                          </div>
                          <div className="h-[1px] w-full bg-neutral-200 hidden md:block my-4"></div>
                        </div>
                      ))}
                    </ScrollArea>
                  ) : (
                    <p>Không có địa chỉ</p>
                  )}
                  <div>
                    <button
                      className="text-[#0072bc] font-semibold py-[7px] px-4 border border-[#0072bc] rounded-lg flex gap-2"
                      type="button"
                    >
                      <CirclePlus color="#0072BC" strokeWidth={1.5} />
                      <span onClick={() => handleAddAddress()}>
                        Thêm địa chỉ
                      </span>
                    </button>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Quay lại</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[#0072bc] hover:bg-blue-900"
                      type="button"
                      onClick={() => setDefaultAddress(selectedDefaultAddress)}
                    >
                      Áp dụng
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </div>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div>
          <Sheet open={isOpenDiscount} onOpenChange={setIsOpenDiscount}>
            <SheetContent className="flex flex-col">
              <SheetHeader>
                <SheetTitle>Chọn mã giảm giá</SheetTitle>
              </SheetHeader>
              <div>
                {discounts.map((discount) => (
                  <div className="grid pb-3 first:pt-4">
                    <div className="grid gap-1">
                      <div className="group grid cursor-pointer grid-cols-[calc(74rem/16)_1fr] data-[disabled=true]:cursor-not-allowed border border-[#0072bc]">
                        <div className="relative flex h-full w-[calc(74rem/16)] items-center justify-center bg-[#0072bc]"></div>
                        <div className="content grid gap-3 h-full  rounded-r-[2px] border border-neutral-100 p-3 shadow-yPlus">
                          <p className="line-clamp-2 text-sm font-semibold text-neutral-900 group-data-[disabled=true]:text-neutral-600">
                            {discount.name}
                          </p>
                          <div className="text-[15px]">
                            <p>Giảm {discount.percent}%</p>
                            <div className="flex items-center justify-between">
                              <div className="">
                                <p>
                                  Tối đa:
                                  {discount.maxDiscountAmount.toLocaleString(
                                    "vi-VN",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}
                                </p>
                              </div>
                              <input
                                type="radio"
                                className="w-5 h-5"
                                checked={selectedDiscount === discount}
                                onChange={() => setSelectedDiscount(discount)}
                              />
                            </div>
                            <p className="text-neutral-400">
                              HSD: {formatDate(discount.endDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <SheetFooter className="mt-auto">
                <SheetClose asChild>
                  <Button
                    type="button"
                    className="w-full bg-[#0072bc] hover:bg-blue-900"
                  >
                    Áp dụng
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
