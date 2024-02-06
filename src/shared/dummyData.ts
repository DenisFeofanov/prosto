import { OrderedItem, Order } from "@/interfaces/Order";

export const dummyOrderedItems: OrderedItem[] = [
  {
    bouquet: "Вдохновение",
    amount: 1,
    size: "L",
    price: 2000,
    note: "with Love",
  },
  {
    bouquet: "Сумерки",
    amount: 1,
    price: 2000,
    note: "от Души",
  },
];

export const dummyPickupOrder: Order = {
  kind: "pickup",
  clientName: "Prosto",
  clientPhone: "1234567890",
  pickupTime: "2022-01-01T12:00:00Z",
  total: 4000,
  items: dummyOrderedItems,
};

export const dummyDeliveryOrder: Order = {
  kind: "delivery",
  clientName: "Prosto",
  clientPhone: "1234567890",
  recipientName: "John Doe",
  recipientPhone: "1234567890",
  address: "123 Main St",
  deliveryTime: "12:00 - 15:00",
  total: 4000,
  items: dummyOrderedItems,
};
