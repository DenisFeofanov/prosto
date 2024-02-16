"use client";

import { createOrder } from "@/lib/api";
import useDebouncedFunction, { useAppSelector } from "@/lib/hooks";
import { selectCart } from "@/lib/redux/cartSlice";
import { calculateFullPrice } from "@/lib/utils";
import { LeftOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, MouseEvent, useState } from "react";

interface Props {
  onBackClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface FieldType {
  username?: string;
  phone?: string;
  pickupDate?: string;
}

interface SubmittedValues {
  username: string;
  phone: string;
  pickupDate: Dayjs;
}

type ValidateStatus = Parameters<typeof Form.Item>[0]["validateStatus"];

type Phone = string | "";

const dateFormat = "DD/MM/YYYY";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const validatePhoneNumber = (
  phone: Phone
): {
  validateStatus: ValidateStatus;
  errorMsg: string | null;
} => {
  const phoneRegex = new RegExp(/^(8|\+7)\d{3}\d{3}\d{2}\d{2}$/);
  if (phone === "") {
    return {
      validateStatus: "error",
      errorMsg: null,
    };
  }
  if (phoneRegex.test(phone)) {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
  return {
    validateStatus: "error",
    errorMsg: "Некорректный формат телефона",
  };
};

export default function CartForm({ onBackClick }: Props) {
  const [phone, setPhone] = useState<{
    value: Phone;
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }>({ value: "" });
  const setPhoneDebounced = useDebouncedFunction(setPhone, 500);
  const cart = useAppSelector(selectCart);

  const onPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setPhone({
        ...validatePhoneNumber(value),
        value,
      });
      return;
    }

    setPhone({ ...phone, validateStatus: "validating", errorMsg: null });
    setPhoneDebounced({
      ...validatePhoneNumber(value),
      value,
    });
  };

  async function handleSubmit(values: SubmittedValues) {
    const { username, phone, pickupDate } = values;
    try {
      const result = await createOrder({
        kind: "pickup",
        clientName: username,
        clientPhone: phone,
        pickupTime: pickupDate.toISOString(),
        total: calculateFullPrice(cart),
        items: cart.bouquets,
      });
      console.log("TODO: Create is successful: ", result);
    } catch (error) {
      console.log("TODO: display in UI:", error);
    }
  }

  return (
    <section>
      <Button onClick={onBackClick} icon={<LeftOutlined />}>
        Назад
      </Button>

      <Form
        className="max-w-full mx-auto lg:max-w-[50%] mt-6"
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item<FieldType>
          label="ФИО"
          name="username"
          rules={[{ required: true, message: "Пожалуйста введите ФИО" }]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Телефон"
          name="phone"
          hasFeedback
          validateStatus={phone.validateStatus}
          help={phone.errorMsg}
          rules={[
            { required: true, message: "Пожалуйста введите номер телефона" },
          ]}
        >
          <Input value={phone.value} onChange={onPhoneChange} />
        </Form.Item>

        <Form.Item
          label={"Дата самовывоза"}
          name={"pickupDate"}
          hasFeedback
          rules={[{ required: true, message: "Пожалуйста укажите дату" }]}
        >
          <DatePicker format={dateFormat} minDate={dayjs()} placeholder="" />
        </Form.Item>

        <Form.Item className="text-right">
          <Button
            className="bg-[#00aa00] hover:bg-[#00c800] block w-full lg:inline-block lg:w-auto"
            type="primary"
            size="middle"
            htmlType="submit"
          >
            Оформить заказ
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}
