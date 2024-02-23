"use client";

import { Phone, ValidateStatus } from "@/interfaces/OrderForm";
import { createOrder } from "@/lib/api";
import useDebouncedFunction, {
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import { clearCart, selectCart, toggleCart } from "@/lib/redux/cartSlice";
import { calculateFullPrice, validatePhoneNumber } from "@/lib/utils";
import { LeftOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Switch } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, MouseEvent, useState } from "react";

interface Props {
  onBackClick: (event: MouseEvent<HTMLButtonElement>) => void;
  rerenderParent: () => void;
}

interface FieldType {
  username?: string;
  clientPhone?: string;
  pickupDate?: string;
  isDelivery?: boolean;
  recipientPhone?: string;
}

interface SubmittedValues {
  username: string;
  clientPhone: string;
  pickupDate: Dayjs;
}

const dateFormat = "DD/MM/YYYY HH:mm";
const debounceTime = 500;

export default function CartForm({ onBackClick, rerenderParent }: Props) {
  const [clientPhone, setClientPhone] = useState<Phone>({ value: "" });
  const [recipientPhone, setRecipientPhone] = useState<Phone>({ value: "" });
  const [isDelivery, setIsDelivery] = useState(false);
  const setClientPhoneDebounced = useDebouncedFunction(
    setClientPhone,
    debounceTime
  );
  const setRecipientPhoneDebounced = useDebouncedFunction(
    setRecipientPhone,
    debounceTime
  );
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  async function handleSubmit(values: SubmittedValues) {
    const { username, clientPhone, pickupDate } = values;
    try {
      const result = await createOrder({
        kind: "pickup",
        clientName: username,
        clientPhone,
        pickupTime: pickupDate.toISOString(),
        total: calculateFullPrice(cart),
        items: cart.bouquets,
      });

      Modal.destroyAll();
      dispatch(clearCart());
      dispatch(toggleCart());
    } catch (error) {
      console.log("TODO: display in UI:", error);
    }
  }

  const toggleDelivery = (checked: boolean) => {
    setIsDelivery(checked);
    rerenderParent();
  };

  const onClientPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setClientPhone({
        ...validatePhoneNumber(value),
        value,
      });
      return;
    }

    setClientPhone({
      ...clientPhone,
      validateStatus: "validating",
      errorMsg: null,
    });
    setClientPhoneDebounced({
      ...validatePhoneNumber(value),
      value,
    });
  };

  const onRecipientPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setRecipientPhone({
        ...validatePhoneNumber(value),
        value,
      });
      return;
    }

    setRecipientPhone({
      ...clientPhone,
      validateStatus: "validating",
      errorMsg: null,
    });
    setRecipientPhoneDebounced({
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
        initialValues={{ pickupDate: dayjs().add(3, "hour") }}
        onFinish={handleSubmit}
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
          name="clientPhone"
          hasFeedback
          validateStatus={clientPhone.validateStatus}
          help={clientPhone.errorMsg}
          rules={[
            { required: true, message: "Пожалуйста введите номер телефона" },
          ]}
        >
          <Input value={clientPhone.value} onChange={onClientPhoneChange} />
        </Form.Item>

        <Form.Item<FieldType>
          label={"Дата самовывоза"}
          name={"pickupDate"}
          hasFeedback
          rules={[{ required: true, message: "Пожалуйста укажите дату" }]}
        >
          <DatePicker
            placement="bottomLeft"
            showTime={{
              format: "HH:mm",
            }}
            format={dateFormat}
            minDate={dayjs()}
            placeholder=""
            inputReadOnly={true}
          />
        </Form.Item>

        <Form.Item<FieldType> name="isDelivery" valuePropName="checked">
          <div className="flex gap-4">
            <Switch
              onChange={toggleDelivery}
              value={isDelivery}
              id="isDelivery"
            />
            <label htmlFor="isDelivery">Нужна доставка</label>
          </div>
        </Form.Item>

        {isDelivery && (
          <div>
            <Form.Item<FieldType>
              label="Телефон"
              name="recipientPhone"
              hasFeedback
              validateStatus={recipientPhone.validateStatus}
              help={recipientPhone.errorMsg}
              rules={[
                {
                  required: true,
                  message: "Пожалуйста введите номер телефона",
                },
              ]}
            >
              <Input
                value={recipientPhone.value}
                onChange={onRecipientPhoneChange}
              />
            </Form.Item>
          </div>
        )}

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
