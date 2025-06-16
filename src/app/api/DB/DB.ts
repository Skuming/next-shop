import { pool } from "./pool";

export async function getProducts() {
  try {
    const [result] = await pool.query("SELECT * FROM `products`");
    return result;
  } catch (error) {
    console.log(error);
  }
}
