import { Bouquet } from "./Bouquet";

export interface OrderedBouquet extends Bouquet {
  size?: string;
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
