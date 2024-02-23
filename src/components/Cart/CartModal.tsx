import CartItem from "@/components/Cart/CartItem";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearCart, selectCart, toggleCart } from "@/lib/redux/cartSlice";
import { createModalShowFunc } from "@/lib/utils";
import { Button, Carousel, Divider, Modal, Typography } from "antd";
import { MouseEvent, MouseEventHandler, useRef, useState } from "react";
import ClearButton from "./ClearButton";
import Form from "./CartForm";
import { CarouselRef } from "antd/es/carousel";

export default function CartModal() {
  const dispatch = useAppDispatch();
  const cartIsOpen = useAppSelector(state => state.cart.isOpen);
  const cart = useAppSelector(selectCart);
  const showModal = createModalShowFunc();
  const carouselRef = useRef<CarouselRef>(null);
  const [rerender, setRerender] = useState(false);

  // the modal doesn't update on its own when children update
  const rerenderModal = () => {
    setRerender(!rerender);
  };

  const handleSubmit: MouseEventHandler<HTMLElement> = event => {
    if (carouselRef.current === null) {
      return;
    }
    carouselRef.current.next();
  };

  function handleToggleCart() {
    if (carouselRef.current === null) {
      return;
    }
    carouselRef.current.goTo(0);
    dispatch(toggleCart());
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

  if (cartIsOpen && cart.bouquets.length <= 0) {
    handleToggleCart();
  }

  function handleBackClick(event: MouseEvent<HTMLButtonElement>): void {
    if (carouselRef.current === null) {
      return;
    }
    carouselRef.current.prev();
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
      <Carousel
        ref={carouselRef}
        dots={false}
        infinite={false}
        adaptiveHeight={true}
        touchMove={false}
      >
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

        <Form onBackClick={handleBackClick} rerenderParent={rerenderModal} />
      </Carousel>
    </Modal>
  );
}
