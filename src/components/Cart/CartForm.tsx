"use client";

import { FieldType, Phone, SubmittedValues } from "@/interfaces/OrderForm";
import { createOrder } from "@/lib/api";
import useDebouncedFunction, {
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import { clearCart, selectCart } from "@/lib/redux/cartSlice";
import { calculateFullPrice, validatePhoneNumber } from "@/lib/utils";
import { DELIVERY_TIME_OPTIONS } from "@/shared/constants";
import { LeftOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { ChangeEvent, MouseEvent, useState } from "react";
import TimePicker from "../TimePicker";
import TextArea from "antd/es/input/TextArea";

interface Props {
  onBackClick: (event: MouseEvent<HTMLButtonElement>) => void;
  rerenderParent: () => void;
  onSuccess: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const debounceTime = 500;

export default function CartForm({
  onBackClick,
  rerenderParent,
  onSuccess,
  setIsLoading,
  isLoading,
}: Props) {
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
    setIsLoading(true);
    try {
      if (values.isDelivery) {
        const {
          username,
          clientPhone,
          recipientName,
          recipientPhone,
          address,
          deliveryTime,
          comment,
        } = values;

        const result = await createOrder({
          kind: "delivery",
          clientName: username,
          clientPhone,
          recipientName,
          recipientPhone,
          address,
          deliveryTime,
          total: calculateFullPrice(cart),
          items: cart.bouquets,
          comment,
        });
      } else {
        const { username, clientPhone, pickupDate, pickupTime, comment } =
          values;
        const combinedDateTime = pickupDate
          .set("hour", pickupTime.hour())
          .set("minute", pickupTime.minute());

        const result = await createOrder({
          kind: "pickup",
          clientName: username,
          clientPhone,
          pickupTime: combinedDateTime.toISOString(),
          total: calculateFullPrice(cart),
          items: cart.bouquets,
          comment,
        });
      }

      dispatch(clearCart());
      onSuccess();
    } catch (error) {
      console.log("TODO: display in UI:", error);
    }

    setIsLoading(false);
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
        initialValues={{
          isDelivery: false,
        }}
        onFinish={handleSubmit}
        autoComplete="on"
      >
        <Form.Item<FieldType>
          label="ФИО"
          name="username"
          rules={[{ required: true, message: "Пожалуйста введите ФИО" }]}
          hasFeedback
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Ваш телефон"
          name="clientPhone"
          hasFeedback
          validateStatus={clientPhone.validateStatus}
          help={clientPhone.errorMsg}
          rules={[
            { required: true, message: "Пожалуйста введите номер телефона" },
          ]}
        >
          <Input
            value={clientPhone.value}
            onChange={onClientPhoneChange}
            size="large"
          />
        </Form.Item>

        <div className="flex gap-4 items-baseline">
          <Form.Item<FieldType> name="isDelivery" valuePropName="checked">
            <Switch
              onChange={toggleDelivery}
              value={isDelivery}
              id="isDelivery"
            />
          </Form.Item>
          <label htmlFor="isDelivery">Нужна доставка</label>
        </div>

        {isDelivery ? (
          <div>
            <Form.Item<FieldType>
              label="ФИО получателя"
              name="recipientName"
              rules={[{ required: true, message: "Пожалуйста введите ФИО" }]}
              hasFeedback
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Телефон получателя"
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
                size="large"
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Адрес доставки"
              name="address"
              rules={[{ required: true, message: "Пожалуйста введите адрес" }]}
              hasFeedback
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType> name="deliveryTime" label="Время доставки">
              <Select size="large">
                {DELIVERY_TIME_OPTIONS.map(deliveryTime => (
                  <Select.Option key={deliveryTime} value={deliveryTime}>
                    {deliveryTime}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        ) : (
          <>
            <Form.Item<FieldType>
              label={"Дата самовывоза"}
              name={"pickupDate"}
              rules={[{ required: true, message: "Пожалуйста укажите дату" }]}
            >
              <DatePicker
                size="large"
                locale={locale}
                format={"DD/MM/YYYY"}
                minDate={dayjs()}
                placeholder=""
                inputReadOnly={true}
                allowClear={false}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={"Время самовывоза"}
              name={"pickupTime"}
              rules={[{ required: true, message: "Пожалуйста укажите время" }]}
            >
              <TimePicker />
            </Form.Item>
          </>
        )}

        <Form.Item<FieldType> label={"Комментарий"} name={"comment"}>
          <TextArea
            placeholder="Как проехать, пожелания и прочее"
            autoSize={{ minRows: 2, maxRows: 10 }}
            allowClear
          />
        </Form.Item>

        <Form.Item className="text-right">
          <Button
            className="bg-[#00aa00] hover:bg-[#00c800] block w-full lg:inline-block lg:w-auto"
            type="primary"
            size="middle"
            htmlType="submit"
            loading={isLoading}
          >
            Оформить заказ
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}
