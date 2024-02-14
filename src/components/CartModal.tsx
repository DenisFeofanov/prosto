import CartItem from "@/components/CartItem";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearCart, selectCart } from "@/lib/redux/cartSlice";
import { Button, Divider, Modal, Typography } from "antd";
import { MouseEventHandler } from "react";

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

      <div className="flex justify-between flex-wrap gap-4">
        <Button danger onClick={handleClearCart} size="middle">
          Очистить корзину
        </Button>

        <Button
          className="bg-[#00aa00] hover:bg-[#00c800]"
          type="primary"
          onClick={handleSubmit}
          size="middle"
        >
          Оформить заказ
        </Button>
      </div>
    </Modal>
  );
}
