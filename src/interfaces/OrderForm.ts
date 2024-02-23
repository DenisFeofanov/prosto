import { Form } from "antd";

export type ValidateStatus = Parameters<typeof Form.Item>[0]["validateStatus"];

export interface Phone {
  value: string;
  validateStatus?: ValidateStatus;
  errorMsg?: string | null;
}
