import jwt from "jsonwebtoken";

export default function createToken(username: string) {
  try {
    const token = jwt.sign(username, process.env.JWT_KEY!);
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
}
