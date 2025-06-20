import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Header from "../components/Header";
import style from "../scss/main.module.css";
import userImg from "../../../public/img/User.jpg";

export default async function Me() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return redirect("/login");
  }

  return (
    <>
      <Header />
      <main className={style.user__page}>
        <div className={style.user__background}>
          <Image src={userImg} alt="user" className={style.user__photo} />
          <div className={style.user__info}>
            <ul>
              <li className={style.user__name}>Name</li>
              <li>Количество заказов: </li>
              <li>Дата регистрации: </li>
              <li>Количество заказов: </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
