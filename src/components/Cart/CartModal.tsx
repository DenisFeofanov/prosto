import CartItem from "@/components/Cart/CartItem";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearCart, selectCart, toggleCart } from "@/lib/redux/cartSlice";
import {
  calculateFullPrice,
  createModalShowFunc,
  formatPrice,
} from "@/lib/utils";
import { Button, Carousel, Divider, Modal, Typography } from "antd";
import { MouseEvent, MouseEventHandler, useRef, useState } from "react";
import ClearButton from "./ClearButton";
import Form from "./CartForm";
import { CarouselRef } from "antd/es/carousel";
import Success from "./Success";

const DEFAULT_STEP = 1;

export default function CartModal() {
  const dispatch = useAppDispatch();
  const cartIsOpen = useAppSelector(state => state.cart.isOpen);
  const cart = useAppSelector(selectCart);
  const showModal = createModalShowFunc();
  const carouselRef = useRef<CarouselRef>(null);
  const [rerender, setRerender] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(DEFAULT_STEP);

  // the modal doesn't update on its own when children update
  const rerenderModal = () => {
    setRerender(!rerender);
  };

  const handleSubmit: MouseEventHandler<HTMLElement> = event => {
    setStep(step + 1);
  };

  function handleToggleCart() {
    if (isSuccess) {
      setIsSuccess(false);
    }

    // cancel cart toggle when loading
    if (isLoading) {
      return;
    }

    dispatch(toggleCart());
    setStep(DEFAULT_STEP);
  }

  const handleClearCart = () => {
    showModal({
      maskClosable: true,
      title: "Удалить все товары в корзине?",
      okText: "Да",
      cancelText: "Нет",
      onOk() {
        dispatch(clearCart());
        handleToggleCart();
        Modal.destroyAll();
      },
    });
  };

  if (cartIsOpen && !isSuccess && cart.bouquets.length <= 0) {
    handleToggleCart();
  }

  function handleBackClick(event: MouseEvent<HTMLButtonElement>): void {
    setStep(step - 1);
  }

  function handleSuccess() {
    setIsSuccess(true);
  }

  let content;
  switch (step) {
    case 1:
      content = (
        <section>
          <div className="flex justify-between items-center flex-wrap gap-2 mt-8 lg:mt-0">
            <Typography.Title className="mb-2" level={2}>
              Корзина
            </Typography.Title>

            <ClearButton className="lg:hidden" onClick={handleClearCart} />
          </div>

          <Divider />
          <ul className="flex flex-col items-start gap-10">
            {cart.bouquets.map(cartItem => {
              return (
                <li key={cartItem.cartId}>
                  <CartItem cartItem={cartItem} />
                </li>
              );
            })}
          </ul>
          <Divider />

          <div className="flex justify-between items-center mb-4">
            <Typography.Text className="text-lg font-semibold">
              Итого:
            </Typography.Text>
            <Typography.Text className="text-lg font-semibold">
              {formatPrice(calculateFullPrice(cart))}
            </Typography.Text>
          </div>

          <div className="flex justify-between flex-wrap gap-6">
            <ClearButton
              className="hidden lg:inline-block"
              onClick={handleClearCart}
            />

            <Button
              className="block w-full lg:inline-block lg:w-auto"
              type="primary"
              onClick={handleSubmit}
              size="middle"
            >
              Далее
            </Button>
          </div>
        </section>
      );
      break;
    case 2:
      content = (
        <Form
          onBackClick={handleBackClick}
          rerenderParent={rerenderModal}
          onSuccess={handleSuccess}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      );
      break;
    default:
      content = <p>{`Error: step ${step} doesn't exit`}</p>;
      break;
  }

  return (
    <Modal
      open={cartIsOpen}
      onOk={handleToggleCart}
      onCancel={handleToggleCart}
      className="w-auto max-w-[30rem] lg:max-w-[50rem]"
      footer={null}
      style={{
        top: "2rem",
      }}
    >
      {isSuccess ? <Success onClick={handleToggleCart} /> : content}
    </Modal>
  );
}
