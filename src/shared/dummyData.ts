// import { Bouquet } from "@/interfaces/Order";
// import { OrderedBouquet, Order } from "@/interfaces/Order";

// export const dummyOrderedItems: OrderedBouquet[] = [
//   {
//     data: {
//       id: "3782d2e3-9027-442f-8322-664814ebf8b7",
//       price: 30000,
//       name: "Сумерки",
//       description: "Тоже ничего такой",
//       amountAvailable: 10,
//       hasSize: false,
//       photos: ["https://prosto.na4u.ru/photo_2024-02-13_12-28-33.jpg"],
//     },
//     size: "M",
//     note: "with Love",
//   },
//   {
//     data: {
//       id: "3782d2e3-9027-442f-8322-664814ebf8b7",
//       price: 30000,
//       name: "Сумерки",
//       description: "Тоже ничего такой",
//       amountAvailable: 10,
//       hasSize: false,
//       photos: ["https://prosto.na4u.ru/photo_2024-02-13_12-28-33.jpg"],
//     },
//     size: "M",
//     note: "with Love",
//   },
// ];

// export const dummyPickupOrder: Order = {
//   kind: "pickup",
//   clientName: "Prosto",
//   clientPhone: "1234567890",
//   pickupTime: "2022-01-01T12:00:00Z",
//   total: 4000,
//   items: dummyOrderedItems,
// };

// export const dummyDeliveryOrder: Order = {
//   kind: "delivery",
//   clientName: "Prosto",
//   clientPhone: "1234567890",
//   recipientName: "John Doe",
//   recipientPhone: "1234567890",
//   address: "123 Main St",
//   deliveryTime: "12:00 - 15:00",
//   total: 4000,
//   items: dummyOrderedItems,
// };

// export const dummyBouquets: Bouquet[] = [
//   {
//     id: "7479dc18-e69e-44ce-ab0e-f970f10edf37",
//     price: 2000,
//     name: "Букет с очень-очень длиииииинным названиием",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, itaque. Nobis expedita ab totam similique quaerat voluptatibus nostrum recusandae modi. Aliquid neque laborum delectus, temporibus magnam et repellendus a autem.",
//     amountAvailable: 12,
//     hasSize: true,
//     photos: [
//       "https://prosto.na4u.ru/TEST_photo.jpg",
//       "https://prosto.na4u.ru/TEST_photo2.jpg",
//       "https://prosto.na4u.ru/TEST_photo.jpg",
//     ],
//   },
//   {
//     id: "59cc3179-e1cc-4115-b0af-d25c9c30aa35",
//     price: 2000,
//     name: "Вдохновение",
//     description: "Крутой роскошный букет",
//     amountAvailable: 12,
//     hasSize: true,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "5a80dfb2-5d9f-457c-aa7d-15e18acd0315",
//     price: 2000,
//     name: "Вдохновение",
//     description: "Крутой роскошный букет",
//     amountAvailable: 12,
//     hasSize: true,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "aa166f40-3bfb-411d-b9d8-c26feb81068f",
//     price: 2000,
//     name: "Вдохновение",
//     description: "Крутой роскошный букет",
//     amountAvailable: 12,
//     hasSize: true,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "fc4208ef-4ff3-4beb-91a9-7c9e58c4154e",
//     price: 2000,
//     name: "Вдохновение",
//     description: "Крутой роскошный букет",
//     amountAvailable: 12,
//     hasSize: true,
//     photos: ["https://prosto.na4u.ru/TEST_photo2.jpg"],
//   },
//   {
//     id: "4c4f0482-b508-495e-a8c4-d85babdac399",
//     price: 2000,
//     name: "Вдохновение",
//     description: "Крутой роскошный букет",
//     amountAvailable: 12,
//     hasSize: true,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "832cdabd-7f6b-474d-bb04-9b27f6ea58d5",
//     price: 2000,
//     name: "Вдохновение",
//     description: "Крутой роскошный букет",
//     amountAvailable: 12,
//     hasSize: true,
//     photos: ["https://prosto.na4u.ru/TEST_photo2.jpg"],
//   },
//   {
//     id: "c27ba8c6-a99f-4eb8-9704-e368fff0ce4c",
//     price: 2000,
//     name: "Вдохновение",
//     description: "Крутой роскошный букет",
//     amountAvailable: 12,
//     hasSize: true,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "4d89c37c-cd35-4ae5-863b-e4a36a193238",
//     price: 2000,
//     name: "Вдохновение",
//     description: "Крутой роскошный букет",
//     amountAvailable: 12,
//     hasSize: true,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "3ca4cbbf-40b7-42e8-8cf2-7806a0e7b021",
//     price: 2000,
//     name: "Вдохновение",
//     description: "Крутой роскошный букет",
//     amountAvailable: 12,
//     hasSize: true,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "90a8a660-afd3-4c31-8445-8fa933abef10",
//     price: 3000,
//     name: "Сумерки",
//     description: "Тоже ничего такой",
//     amountAvailable: 10,
//     hasSize: false,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "b8b97657-0713-4536-a053-59ef7fd846ad",
//     price: 3000,
//     name: "Сумерки",
//     description: "Тоже ничего такой",
//     amountAvailable: 10,
//     hasSize: false,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "32b0c9ae-979c-4982-948c-829280423d5b",
//     price: 3000,
//     name: "Сумерки",
//     description: "Тоже ничего такой",
//     amountAvailable: 10,
//     hasSize: false,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "b36accc7-217b-41d3-b1b4-a6acce1d544e",
//     price: 3000,
//     name: "Сумерки",
//     description: "Тоже ничего такой",
//     amountAvailable: 10,
//     hasSize: false,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "ebe442d8-6a26-4e7a-9471-13100efc92fd",
//     price: 3000,
//     name: "Сумерки",
//     description: "Тоже ничего такой",
//     amountAvailable: 10,
//     hasSize: false,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "bff96fea-cca9-41e6-9336-49e0dd0e5b0f",
//     price: 3000,
//     name: "Сумерки",
//     description: "Тоже ничего такой",
//     amountAvailable: 10,
//     hasSize: false,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "7c313856-af00-4e73-8f88-5353c6a53bb2",
//     price: 3000,
//     name: "Сумерки",
//     description: "Тоже ничего такой",
//     amountAvailable: 10,
//     hasSize: false,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "9f6f1378-dc22-4dbd-a3a4-073707455d19",
//     price: 3000,
//     name: "Сумерки",
//     description: "Тоже ничего такой",
//     amountAvailable: 10,
//     hasSize: false,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "57dbbec9-86d2-4e78-bb12-46fe6369e2f2",
//     price: 3000,
//     name: "Сумерки",
//     description: "Тоже ничего такой",
//     amountAvailable: 10,
//     hasSize: false,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
//   {
//     id: "b2e45f0b-1db8-48c0-a745-e5888bed52fb",
//     price: 3000,
//     name: "Сумерки",
//     description: "Тоже ничего такой",
//     amountAvailable: 10,
//     hasSize: false,
//     photos: ["https://prosto.na4u.ru/TEST_photo.jpg"],
//   },
// ];
