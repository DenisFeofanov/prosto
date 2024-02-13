import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCart } from "@/lib/redux/cartSlice";
import { Modal } from "antd";
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
      centered
    >
      Cart content
    </Modal>
  );
}
