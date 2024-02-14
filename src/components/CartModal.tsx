import CartItem from "@/components/CartItem";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearCart, selectCart } from "@/lib/redux/cartSlice";
import { BUTTON_SIZE } from "@/shared/constants";
import { Button, Divider, Modal, Typography } from "antd";
import { MouseEventHandler, useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export default function CartModal({ isOpen, closeModal }: Props) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  const handleSubmit: MouseEventHandler<HTMLElement> = event => {
    console.log("TODO: create new order");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    closeModal();
    Modal.destroyAll();
  };

  return (
    <Modal
      open={isOpen}
      onOk={closeModal}
      onCancel={closeModal}
      className="w-auto max-w-[30rem] lg:min-w-[80vw]"
      footer={null}
      style={{
        top: "2rem",
      }}
    >
      <Typography.Title level={2}>Корзина</Typography.Title>

      <Divider />
      <ul>
        {cart.bouquets.map(cartItem => {
          return (
            <li key={cartItem.cartId}>
              <CartItem cartItem={cartItem} />
            </li>
          );
        })}
      </ul>
      <Divider />
      <div className="flex justify-between">
        <Button danger onClick={handleClearCart}>
          Очистить корзину
        </Button>

        <Button
          className="bg-[#00aa00] hover:bg-[#00c800]"
          type="primary"
          onClick={handleSubmit}
          size={BUTTON_SIZE}
        >
          Оформить заказ
        </Button>
      </div>
    </Modal>
  );
}
