import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Product {
  id: number;
  price: number;
  name: string;
  rate: number;
  feedback: number;
}

export interface Modal {
  setIsOpened?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  isOpened?: boolean;
}
