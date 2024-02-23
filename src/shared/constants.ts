import { Size } from "@/interfaces/Order";
import { SizeType } from "antd/es/config-provider/SizeContext";

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
