import { Bouquet } from "@/interfaces/Bouquet";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeAmount, selectCart } from "@/lib/redux/cartSlice";
import { Divider, InputNumber, Modal, Typography } from "antd";
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

  function handleChangeAmount(amount: number | null, bouquet: Bouquet): void {
    if (amount === null) {
      return;
    }

    dispatch(changeAmount({ ...bouquet, amountOrdered: amount }));
  }

  return (
    <Modal
      open={isOpen}
      onOk={closeModal}
      onCancel={closeModal}
      className="w-auto max-w-[30rem] lg:min-w-[80vw]"
      footer={null}
      centered
    >
      <Typography.Title level={2}>Корзина</Typography.Title>

      <Divider />
      <section className="flex flex-col gap-8 items-start">
        {cart.bouquets.map(bouquet => (
          <div key={bouquet.id}>
            <div className="flex gap-8 items-center">
              <Image
                className="rounded-md"
                src={bouquet.photos[0]}
                width={100}
                height={80}
                alt="Превью букета"
              />

              <Typography.Title level={4}>{bouquet.name}</Typography.Title>

              <InputNumber
                min={1}
                max={bouquet.amountAvailable}
                keyboard={true}
                value={bouquet.amountOrdered}
                onChange={value => handleChangeAmount(value, bouquet)}
                size="large"
              />
            </div>
          </div>
        ))}
      </section>
      <Divider />
    </Modal>
  );
}
