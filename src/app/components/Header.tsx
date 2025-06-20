"use client";
import notifyImg from "../../../public/img/Notification.svg";
import searchImg from "../../../public/img/Search.svg";
import accountImg from "../../../public/img/Account.svg";
import packageImg from "../../../public/img/Package.svg";
import favoriteImg from "../../../public/img/Love.svg";
import cartImg from "../../../public/img/ShoppingCart.svg";

import Image from "next/image";
import style from "../scss/main.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Header() {
  const [cookie, setCookie] = useState<string | undefined>(undefined);

  const [cartAmount, setCartAmount] = useState(0);
  useEffect(() => {
    const cartLength = JSON.parse(localStorage.getItem("cart") || "[]").length;
    setCookie(Cookies.get("session"));
    setCartAmount(cartLength);
  }, []);
  return (
    <>
      <header className={style.header__home}>
        <div className={style.top__header}>
          <p>Магазин: Пушкина ул., 6в</p>
          <button className={style.notify}>
            <span>
              <Image
                src={notifyImg}
                alt="notification"
                width={24}
                height={24}
              />
            </span>
          </button>
          {cookie && (
            <Link
              href="/logout"
              className="text-center lg:block hidden text-sm text-black/50"
            >
              Выйти
            </Link>
          )}
        </div>
        <div className={style.bottom__header}>
          <Link href="/" className={style.shop__name}>
            ShopName
          </Link>
          <form action="search" method="GET">
            <input type="text" placeholder="Искать на сайте" name="text" />
            <button className={style.search} type="submit">
              <span>
                <Image src={searchImg} alt="search" width={16} height={16} />
              </span>
            </button>
          </form>
          <div className={style.user__nav}>
            <Link href={cookie ? "/me" : "/login"} className={style.user__btns}>
              <Image src={accountImg} alt="" />
              <span>Профиль</span>
            </Link>
            <Link href="/cart" className={style.user__btns}>
              <Image src={packageImg} alt="" />
              <span>Заказы</span>
            </Link>
            <button className={style.user__btns}>
              <Image src={favoriteImg} alt="" />
              <span>Избранное</span>
            </button>
            <button className={style.user__btns}>
              <Image src={cartImg} alt="" />
              <span>Корзина</span>
              {cartAmount > 0 ? (
                <span className={style.cart__count}>{cartAmount}</span>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
