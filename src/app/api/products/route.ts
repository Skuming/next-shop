import { NextResponse } from "next/server";
import { getProducts } from "../DB/DB";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
  }
}
