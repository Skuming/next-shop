import axios from "axios";

export async function getProducts() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/products`);
  return response;
}

export async function loginUser(
  username: string | number,
  password: string | number
) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {
    data: {
      username,
      password,
    },
  });
  return response;
}

export async function registerUser(
  username: string | number,
  email: string,
  password: string | number
) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
    data: {
      username,
      email,
      password,
    },
  });
  return response;
}

export async function isAdmin(token: string) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/admin`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
}

interface AdminFeatures {
  user?: string;
  product?: string;
  price?: string;
}

export async function adminFeatures(
  type: string,
  data: AdminFeatures,
  token: string
) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/admin/managing`,
    {
      data: {
        type: type,
        data,
      },
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
}
