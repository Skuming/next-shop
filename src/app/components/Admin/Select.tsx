"use client";
import { useState } from "react";
import { adminFeatures } from "@/app/services/api";
import Cookies from "js-cookie";

export default function Select() {
  const [selected, setSelected] = useState("product");
  const [inputAdmin, setInputAdmin] = useState("");
  const [inputProduct, setInputProduct] = useState("");
  const [inputPrice, setInputPrice] = useState("");

  const handleSubmit = async (select: string) => {
    const cookie = Cookies.get("session");

    if (cookie) {
      if (select === "admin") {
        const response = await adminFeatures(
          select,
          { user: inputAdmin },
          cookie
        );
        console.log(response);
      } else if (select === "product") {
        const response = await adminFeatures(
          select,
          { product: inputProduct, price: inputPrice },
          cookie
        );
        console.log(response);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(selected);
        e.preventDefault();
      }}
      method="post"
      className="flex flex-col gap-[10px] w-1/2 shadow-2xl rounded-2xl p-[10px] items-center"
    >
      <select
        name="chooseadmin"
        id=""
        onChange={(e) => setSelected(e.target.value)}
        className="shadow-md p-[5px] rounded-2xl"
      >
        <option value="product">Добавить товар</option>
        <option value="admin">Добавить админа</option>
      </select>
      {selected === "admin" ? (
        <input
          name="admin"
          type="text"
          placeholder="Имя пользователя"
          className="w-full p-[5px] border-2 rounded-2xl"
          required
          onChange={(e) => setInputAdmin(e.target.value)}
        />
      ) : (
        <>
          <input
            name="name"
            type="text"
            placeholder="Название"
            className="w-full p-[5px] border-2 rounded-2xl"
            required
            onChange={(e) => setInputProduct(e.target.value)}
          />
          <input
            name="price"
            type="number"
            placeholder="Цена"
            className="w-full p-[5px] border-2 rounded-2xl"
            required
            min={0}
            onChange={(e) => setInputPrice(e.target.value)}
          />
        </>
      )}
      <button
        type="submit"
        className="bg-green-500 text-white p-[7px] rounded-2xl cursor-pointer"
      >
        Отправить
      </button>
    </form>
  );
}
