import axios from "axios";

export async function getProducts() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/products`);
  return response;
}
