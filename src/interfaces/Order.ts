import { DELIVERY_TIME_OPTIONS, SIZES } from "@/shared/constants";

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
  size?: string;
  note?: string;
}

export interface CartItem {
  cartId: string;
  data: Bouquet;
  size?: string;
  note?: string;
}

interface BaseOrder {
  total: number;
  items: CartItem[];
  clientName: string;
  clientPhone: string;
  comment?: string;
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
  deliveryTime: DeliveryTime;
}

export type DeliveryTime = (typeof DELIVERY_TIME_OPTIONS)[number];

export type Order = PickupOrder | DeliveryOrder;
