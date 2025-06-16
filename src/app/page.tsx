"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import style from "./scss/main.module.css";
import { Product } from "./interfaces/interfaces";
import { getProducts } from "./services/api";

import starImg from "../../public/img/Star.svg";
import chatImg from "../../public/img/Chat.svg";
import cartImg from "../../public/img/Buy.svg";
import LoginModal from "./components/Modals/LoginModal";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<Product[]>([]);

  const [id, setId] = useState(new Set());

  const handleClick = async (picked: number) => {
    setId((prev) => {
      if (!prev.has(picked)) {
        const tempSet = new Set(prev);
        tempSet.add(picked);
        return tempSet;
      } else {
        const tempSet = new Set(prev);
        tempSet.delete(picked);
        return tempSet;
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts();
        setApiResponse(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);
  if (apiResponse.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className={style.loader}></div>
      </div>
    );
  }

  return (
    <>
      <Header></Header>
      <div className={style.products}>
        {apiResponse.map((item, index) => (
          <div className={style.product} key={index}>
            <Image
              src={starImg}
              alt="product"
              className={style.product__view}
            />
            <div className={style.product__bottom}>
              <div className={style.price__container}>
                <span>{item.price} ₽</span>
              </div>
              <span className={style.name}>{item.name}</span>
              <div className={style.feedback__container}>
                <Image src={starImg} alt="star" />
                <span>{item.rate}</span>
                <Image src={chatImg} alt="chat" />
                <span>{item.feedback}</span>
              </div>
              <button
                className={style.add__cart}
                onClick={() => handleClick(item.id)}
              >
                <span>
                  В корзину
                  <Image src={cartImg} alt="" />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <LoginModal></LoginModal>
    </>
  );
}
