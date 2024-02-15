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

export interface OrderedBouquet {
  data: Bouquet;
  size: string;
  note?: string;
}

export interface CartItem {
  cartId: string;
  data: Bouquet;
  size: string;
  note?: string;
}

interface BaseOrder {
  total: number;
  items: OrderedBouquet[];
  clientName: string;
  clientPhone: string;
}

interface PickupOrder extends BaseOrder {
  kind: "pickup";
  pickupTime: string;
}

interface DeliveryOrder extends BaseOrder {
  kind: "delivery";
  recipientName: string;
  recipientPhone: string;
  address: string;
  deliveryTime:
    | "9:00 - 12:00"
    | "12:00 - 15:00"
    | "15:00 - 17:00"
    | "17:00 - 20:00";
}

export type Order = PickupOrder | DeliveryOrder;
