import CartItem from "@/components/CartItem";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCart } from "@/lib/redux/cartSlice";
import { Button, Divider, Modal, Typography } from "antd";
import { MouseEventHandler, useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export default function CartModal({ isOpen, closeModal }: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const handleSubmit: MouseEventHandler<HTMLElement> = event => {
    console.log("TODO: create new order");
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

      <div className="text-right">
        <Button
          className="bg-[#00aa00] hover:bg-[#00c800]"
          type="primary"
          onClick={handleSubmit}
        >
          Оформить заказ
        </Button>
      </div>
    </Modal>
  );
}
