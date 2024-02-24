import { Form } from "antd";
import { DeliveryTime } from "./Order";
import { Dayjs } from "dayjs";

export type ValidateStatus = Parameters<typeof Form.Item>[0]["validateStatus"];

export interface Phone {
  value: string;
  validateStatus?: ValidateStatus;
  errorMsg?: string | null;
}

export interface FieldType {
  username?: string;
  clientPhone?: string;
  pickupDate?: Dayjs;
  pickupTime?: Dayjs;
  isDelivery?: boolean;
  recipientName?: string;
  recipientPhone?: string;
  address?: string;
  deliveryTime?: DeliveryTime;
  comment?: string;
}

export type SubmittedValues = Required<FieldType>;
