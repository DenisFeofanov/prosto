import { Size } from "@/interfaces/Order";
import { SizeType } from "antd/es/config-provider/SizeContext";

export const IMAGE_WIDTH = 400;
export const IMAGE_HEIGHT = 500;
export const SIZES = ["S", "M", "L"] as const;
export const DEFAULT_SIZE: Size = "M";
