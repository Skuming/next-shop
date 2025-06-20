import { RowDataPacket } from "mysql2";
import { pool } from "./pool";

export async function getProducts() {
  try {
    const [result] = await pool.query("SELECT * FROM `products`");
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(username: string) {
  try {
    const [result] = await pool.query(
      "SELECT `username` FROM `users` where username = ?",
      [username]
    );
    if (!Array.isArray(result) || result.length === 0) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function addUser(
  username: string,
  email: string,
  password: string
) {
  try {
    const [result] = await pool.query(
      "INSERT INTO `users`( `username`, `password`, `email`) VALUES (?,?,?)",
      [username, password, email]
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

interface User extends RowDataPacket {
  username: string;
  email: string;
  password: string;
}
export async function getFullUser(username: string): Promise<User | null> {
  try {
    const [result] = await pool.query<User[]>(
      "SELECT username, email, password FROM `users` WHERE username = ? OR email = ? LIMIT 1",
      [username, username]
    );

    if (!Array.isArray(result) || result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

export async function getAdmin(username: string) {
  try {
    const [result] = await pool.query(
      "SELECT username from admins WHERE username = ?",
      [username]
    );
    if (!Array.isArray(result) || result.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("Ошибка админ проверки", error);
    return false;
  }
}

export async function addAdmin(username: string) {
  try {
    await pool.query("INSERT INTO `admins`(`username`) VALUES (?)", [username]);
    return true;
  } catch (error) {
    console.log("Ошибка добавки админа", error);
    return false;
  }
}

export async function addProduct(product: string, price: number) {
  try {
    await pool.query("INSERT INTO `products`(`name`, `price`) VALUES (?,?)", [
      product,
      price,
    ]);
    return true;
  } catch (error) {
    console.log("Ошидка добавления", error);
    return false;
  }
}
