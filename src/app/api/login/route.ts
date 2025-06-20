import { NextResponse } from "next/server";
import { getFullUser } from "../DB/DB";
import Check from "../jwt/comparebcrypt";
import createToken from "../jwt/generatoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const login = body.data.username;
    const password = body.data.password;
    if (!login || !password) {
      return NextResponse.json(
        { status: "error", message: "Login and password are required" },
        { status: 400 }
      );
    }
    const user = await getFullUser(login);

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const verify = await Check(password, user.password);

    if (verify) {
      const response = NextResponse.json({ status: "ok" }, { status: 200 });

      response.cookies.set("session", `${createToken(user.username)}`, {
        httpOnly: false,
        maxAge: 60 * 60 * 24,
      });

      return response;
    }
  } catch (error) {
    console.error(error);
  }
}
