"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const sessionCookie = Cookies.get("session");
    if (!sessionCookie) {
      router.push("/");
    } else {
      Cookies.remove("session");
    }
  }, [router]);
}
