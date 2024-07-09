"use client";
import React, { FormEvent, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { X } from "lucide-react";

type RegisterProps = {
  isOpenRegister: boolean;
  setIsOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const Register: React.FC<RegisterProps> = ({
  isOpenRegister,
  setIsOpenRegister,
  setIsOpenDialog,
}) => {
  const [detailRegister, setDetailRegister] = useState({
    UserName: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailRegister({
      ...detailRegister,
      [event.target.name]: event.target.value,
    });
  };

  const handleOpenLogin = () => {
    setIsOpenDialog(true);
    setIsOpenRegister(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      "https://localhost:7151/api/Account/RegisterCustomer",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detailRegister),
      }
    );

    if (res.status === 201) {
      toast.success("Đăng ký thành công");
      handleOpenLogin();
    }

    if (res.status !== 201) {
      toast.error("Đăng ký không thành công");
    }
  };

  return (
    <>
      <div>
        <AlertDialog open={isOpenRegister}>
          <AlertDialogContent>
            <AlertDialogTitle className="flex justify-between text-xl text-center">
              <p>Đăng ký</p>
              <X
                size={30}
                className="cursor-pointer "
                onClick={() => setIsOpenRegister(false)}
              />
            </AlertDialogTitle>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <p className="font-medium">Họ và tên</p>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="FirstName"
                    id=""
                    placeholder="Họ"
                    className="px-3 py-2 text-[16px] border outline-none text-neutral-900 border-neutral-300 focus:border-neutral-700 rounded-lg"
                    value={detailRegister.FirstName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="LastName"
                    id=""
                    placeholder="Tên"
                    className="px-3 py-2 text-[16px] border outline-none text-neutral-900 border-neutral-300 focus:border-neutral-700 rounded-lg"
                    value={detailRegister.LastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <p className="font-medium">Nhập tên tài khoản</p>
                  <input
                    type="text"
                    name="UserName"
                    id=""
                    placeholder="Nhập tên tài khoản"
                    className="px-3 py-2 text-[16px] border outline-none text-neutral-900 border-neutral-300 focus:border-neutral-700 rounded-lg"
                    value={detailRegister.UserName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <p className="font-medium">Nhập Email</p>
                  <input
                    type="email"
                    name="Email"
                    id=""
                    placeholder="Nhập Email"
                    className="px-3 py-2 text-[16px] border outline-none text-neutral-900 border-neutral-300 focus:border-neutral-700 rounded-lg"
                    value={detailRegister.Email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <p className="font-medium">Nhập mật khẩu</p>
                  <input
                    type="password"
                    name="Password"
                    id=""
                    placeholder="Nhập mật khẩu"
                    className="px-3 py-2 text-[16px] border outline-none text-neutral-900 border-neutral-300 focus:border-neutral-700 rounded-lg"
                    value={detailRegister.Password}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <p className="font-medium">Nhập lại mật khẩu</p>
                  <input
                    type="password"
                    name="ConfirmPassword"
                    id=""
                    placeholder="Nhập lại mật khẩu"
                    className="px-3 py-2 text-[16px] border outline-none text-neutral-900 border-neutral-300 focus:border-neutral-700 rounded-lg"
                    value={detailRegister.ConfirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <AlertDialogAction
                  className="bg-[#0072bc] hover:bg-blue-900  rounded-none mt-3"
                  type="submit"
                >
                  Đăng ký
                </AlertDialogAction>
              </div>
              <div className="flex items-center justify-center pt-3">
                <div className="text-[#ccc]">
                  <p>
                    Bạn đã có tài khoản?{" "}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={handleOpenLogin}
                    >
                      {" "}
                      Đăng nhập
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Register;
