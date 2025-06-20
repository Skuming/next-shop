import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { addUser, getUser } from "../DB/DB";
import createToken from "../jwt/generatoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const username = body.data.username;
    const email = body.data.email;
    const password = body.data.password;

    const user = await getUser(body.data.username);

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(body.data.password, salt);
    if (username && email && password !== "") {
      if (user === null) {
        await addUser(body.data.username, body.data.email, hashed);
        const response = await NextResponse.json(
          { status: "ok" },
          { status: 200 }
        );
        response.cookies.set("session", `${createToken(username)}`, {
          httpOnly: false,
          maxAge: 60 * 60 * 24,
        });
        return response;
      }
      return NextResponse.json(
        { status: "User already exists!" },
        { status: 401 }
      );
    }
    return NextResponse.json({ status: "No data!" }, { status: 400 });
  } catch (error) {
    console.error(error);
  }
}
