import { Bouquet } from "@/interfaces/Bouquet";
import { formatPrice } from "@/lib/utils";
import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import BouquetCarousel from "./BouquetCarousel";

interface Props {
  bouquet: Bouquet | null;
  isOpen: boolean;
  closeModal: () => void;
}

export default function BouquetModal({ bouquet, isOpen, closeModal }: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      {bouquet ? (
        <Modal
          open={isOpen}
          onOk={closeModal}
          onCancel={closeModal}
          className="w-auto max-w-[30rem] lg:min-w-[80vw]"
          footer={null}
        >
          <div className="pt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:pt-0 lg:gap-16">
            <BouquetCarousel photos={bouquet.photos} />

            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-4">{bouquet.name}</h2>
              <p className="text-gray-600 mb-4 text-base">
                {bouquet.description}
              </p>
              <p className="text-lg font-bold mb-4">
                {formatPrice(bouquet.price)}
              </p>

              <Button
                onClick={() => console.log("TODO: buy bouquet")}
                size="large"
              >
                Купить
              </Button>
            </div>
          </div>
        </Modal>
      ) : (
        "Error: bouquet is null"
      )}
    </>
  );
}
