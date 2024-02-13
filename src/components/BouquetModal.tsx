import { Bouquet, Size } from "@/interfaces/Bouquet";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/redux/cartSlice";
import { formatPrice } from "@/lib/utils";
import { Button, InputNumber, Modal, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import BouquetCarousel from "./BouquetCarousel";
import SizeDropdown from "./SizeDropdown";

interface Props {
  bouquet: Bouquet | null;
  isOpen: boolean;
  closeModal: () => void;
}

export default function BouquetModal({ bouquet, isOpen, closeModal }: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [size, setSize] = useState<Size>("S");
  const [amountOrdered, setAmountOrdered] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  function handleAddToCartClick(bouquet: Bouquet) {
    dispatch(
      addToCart({
        ...bouquet,
        amountOrdered,
        size,
      })
    );
  }

  function handleSizeSelect({ selectedKeys }: { selectedKeys: string[] }) {
    // forgive me. Dropdown just can't accept Size[] for some reason
    setSize(selectedKeys[0] as Size);
  }

  function handleChangeAmount(value: number | null) {
    if (value !== null) {
      setAmountOrdered(value);
    }
  }

  return (
    <>
      {bouquet && (
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

              <Space>
                <InputNumber
                  min={1}
                  max={bouquet.amountAvailable}
                  keyboard={true}
                  defaultValue={1}
                  value={amountOrdered}
                  onChange={handleChangeAmount}
                  size="large"
                />

                {bouquet.hasSize && (
                  <SizeDropdown
                    selectedSize={size}
                    onSelect={handleSizeSelect}
                  />
                )}
              </Space>

              <div>
                <Button
                  className="mt-4"
                  onClick={() => handleAddToCartClick(bouquet)}
                  size="large"
                  type="primary"
                >
                  Купить
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
