import { Size } from "@/interfaces/Order";

export const IMAGE_WIDTH = 400;
export const IMAGE_HEIGHT = 500;
export const SIZES = ["S", "M", "L"] as const;
export const DELIVERY_TIME_OPTIONS = [
  "9:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 17:00",
  "17:00 - 20:00",
] as const;
export const DEFAULT_SIZE: Size = "M";
export const WORKING_HOURS = {
  from: 10,
  to: 20,
};
export const TELEGRAM_URL = "https://t.me/prostoflowerz";
export const VK_URL = "https://vk.com/prosto_flowers";
export const INSTAGRAM_URL = "https://www.instagram.com/prosto__flowers/";
export const PHONE = "+7 (932) 111-11-70";
