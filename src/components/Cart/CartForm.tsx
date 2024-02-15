import useDebouncedFunction from "@/lib/hooks";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { ChangeEvent, MouseEvent, useState } from "react";

interface Props {
  onBackClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface FieldType {
  username?: string;
  phone?: string;
}

type ValidateStatus = Parameters<typeof Form.Item>[0]["validateStatus"];

type Phone = string | "";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const validatePhoneNumber = (
  number: Phone
): {
  validateStatus: ValidateStatus;
  errorMsg: string | null;
} => {
  if (number === "") {
    return {
      validateStatus: "error",
      errorMsg: "Поле обязательно для заполнения",
    };
  }
  if (number === "89999999999") {
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
  const setPhoneDebounced = useDebouncedFunction(setPhone, 1000);

  const onPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setPhone({
        ...validatePhoneNumber(value),
        value,
      });
      return;
    }

    setPhoneDebounced({
      ...validatePhoneNumber(value),
      value,
    });
  };

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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="ФИО"
          name="username"
          rules={[{ required: true, message: "Пожалуйста введите ФИО" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Телефон"
          name="phone"
          validateStatus={phone.validateStatus}
          help={phone.errorMsg}
          rules={[{ required: true }]}
        >
          <Input value={phone.value} onChange={onPhoneChange} />
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
