import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCart } from "@/lib/redux/cartSlice";
import { Divider, Modal, Typography } from "antd";
import Image from "next/image";
import { useEffect, useRef } from "react";

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
      <section className="flex flex-col gap-8 items-start">
        {cart.bouquets.map(cartItem => {
          const bouquet = cartItem.data;
          return (
            <div key={cartItem.cartId}>
              <div className="flex gap-8 items-center">
                <Image
                  className="rounded-md"
                  src={bouquet.photos[0]}
                  width={100}
                  height={80}
                  alt="Превью букета"
                />

                <Typography.Title level={4}>{bouquet.name}</Typography.Title>

                <p>price {bouquet.price}</p>
                <p>size {cartItem.size}</p>
                <p>note {cartItem.note || "none"}</p>
              </div>
            </div>
          );
        })}
      </section>
      <Divider />
    </Modal>
  );
}
