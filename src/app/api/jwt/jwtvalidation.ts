import jwt from "jsonwebtoken";

export default function validateJwt(token: string) {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("No key");
    }
    const validate = jwt.verify(token, process.env.JWT_KEY);
    return validate;
  } catch (error) {
    console.log(error);
    return null;
  }
}
