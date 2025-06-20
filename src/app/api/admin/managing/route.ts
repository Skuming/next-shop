import { NextResponse } from "next/server";
import validateJwt from "../../jwt/jwtvalidation";
import { addAdmin, addProduct, getAdmin } from "../../DB/DB";

export async function POST(req: Request) {
  const body = await req.json();
  const token = await req.headers.get("Authorization");
  if (token && body) {
    const validate = validateJwt(token);
    if (validate && typeof validate === "string") {
      const isAdmin = await getAdmin(validate);
      if (isAdmin) {
        switch (body.data.type) {
          case "admin":
            const adminAdd = await addAdmin(body.data.data.user);
            console.log("Back admin");
            console.log(adminAdd);
            return adminAdd
              ? NextResponse.json({ status: "succses" })
              : NextResponse.json({ status: "error" });
          case "product":
            const productAdd = await addProduct(
              body.data.data.product,
              body.data.data.price
            );
            return productAdd
              ? NextResponse.json({ status: "succses" })
              : NextResponse.json({ status: "error" });
          default:
            console.log("error");
        }
      }
      return NextResponse.json({ status: "You are not admin!" });
    }
    return NextResponse.json({ status: "Error while validate!" });
  }
  return NextResponse.json({ status: "No token!" });
}
