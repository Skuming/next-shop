import { NextResponse } from "next/server";
import validateJwt from "../jwt/jwtvalidation";
import { getAdmin } from "../DB/DB";

export async function POST(req: Request) {
  const token = await req.headers.get("Authorization");
  //   console.log(token);
  if (token) {
    const validate = validateJwt(token);

    if (validate && typeof validate === "string") {
      const isAdmin = await getAdmin(validate);
      if (isAdmin) {
        return NextResponse.json({ status: "succses" }, { status: 200 });
      }
      return NextResponse.json({ staus: "deny" }, { status: 403 });
    }
    return NextResponse.json({ staus: "deny" }, { status: 403 });
  }
  return NextResponse.json({ staus: "deny" }, { status: 403 });
}
