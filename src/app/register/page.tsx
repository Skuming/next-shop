"use client";

import Link from "next/link";
import ModalLayout from "../components/Modals/Modal";
import { useState } from "react";
import { registerUser } from "../services/api";
import { useRouter } from "next/router";
export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [apiResponse, setApiResponse] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await registerUser(
      formData.username,
      formData.email,
      formData.password
    );
    setApiResponse(result.data);

    await console.log(apiResponse);

    if (result.status === 200) {
      router.push("/me");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <ModalLayout>
        <Link
          href="/"
          className="absolute top-[2%] right-[3%] text-xl p-1 cursor-pointer"
        >
          ✕
        </Link>
        <h1 className="text-4xl">Регистрация</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-[15px] items-center "
          method="post"
        >
          <input
            className="bg-[#F5F7FA] h-[42px] p-[10px] rounded-sm w-full"
            type="text"
            name="username"
            placeholder="Логин"
            onChange={handleChange}
          />
          <input
            className="bg-[#F5F7FA] h-[42px] p-[10px] rounded-sm w-full"
            type="text"
            name="email"
            placeholder="Почта"
            onChange={handleChange}
          />
          <input
            className="bg-[#F5F7FA] h-[42px] p-[10px] rounded-sm w-full"
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-fit p-[5px] h-[40px] bg-[#353535] rounded-sm text-white cursor-pointer"
          >
            Зерегистрироваться
          </button>
        </form>

        <p>
          Есть аккаунт?{" "}
          <Link href={"/login"} className="text-blue-500 text-center">
            Войди!
          </Link>
        </p>
      </ModalLayout>
    </>
  );
}
