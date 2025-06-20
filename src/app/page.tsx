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

export default function Home() {
  const [apiResponse, setApiResponse] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<number[]>([]);

  const handleClick = (picked: number) => {
    setCartItems((prev) => {
      let newItems;
      if (prev.includes(picked)) {
        newItems = prev.filter((id) => id !== picked);
      } else {
        newItems = [...prev, picked];
      }
      localStorage.setItem("cart", JSON.stringify(newItems));
      return newItems;
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts();
        setApiResponse(result.data);
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
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
              {!localStorage.getItem("cart")?.includes(`${item.id}`) ? (
                <button
                  className={style.add__cart}
                  onClick={() => handleClick(item.id)}
                >
                  <span>
                    В корзину
                    <Image src={cartImg} alt="" />
                  </span>
                </button>
              ) : (
                <button
                  className={style.added__to__cart}
                  onClick={() => handleClick(item.id)}
                >
                  <span>В корзине</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
