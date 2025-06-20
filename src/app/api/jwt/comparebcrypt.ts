import bcrypt from "bcrypt";

export default async function Check(password: string, hashedPassword: string) {
  const verify = await bcrypt.compare(password, hashedPassword);
  return await verify;
}
