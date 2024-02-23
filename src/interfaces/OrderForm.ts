import { Form } from "antd";

export type ValidateStatus = Parameters<typeof Form.Item>[0]["validateStatus"];

export type Phone = string;
