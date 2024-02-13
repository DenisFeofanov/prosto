import { SIZES } from "@/shared/constants";

export interface Bouquet {
  id: string;
  name: string;
  description: string;
  price: number;
  amountAvailable: number;
  hasSize: boolean;
  photos: string[];
}

export type Size = (typeof SIZES)[number];
