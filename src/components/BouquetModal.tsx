import { Bouquet, Size } from "@/interfaces/Bouquet";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCart, selectCart } from "@/lib/redux/cartSlice";
import { formatPrice } from "@/lib/utils";
import { Button, InputNumber, Modal, Space, Typography } from "antd";
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
  const cart = useAppSelector(selectCart);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  function handleAddToCartClick(bouquet: Bouquet) {
    setAmountOrdered(1);
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

  function calculateRemainingAmount() {
    if (bouquet === null) {
      return 0;
    }

    const sameIdBouquets = cart.bouquets.filter(
      orderedBouquet => orderedBouquet.id === bouquet.id
    );

    const alreadyOrderedAmount = sameIdBouquets.reduce(
      (acc, orderedBouquet) => acc + orderedBouquet.amountOrdered,
      0
    );

    return bouquet.amountAvailable - alreadyOrderedAmount;
  }

  const remainingAmount = calculateRemainingAmount();
  const isDisabled = remainingAmount === 0;

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
                  max={remainingAmount}
                  keyboard={true}
                  value={amountOrdered}
                  onChange={handleChangeAmount}
                  size="large"
                  disabled={isDisabled}
                />

                {bouquet.hasSize && (
                  <SizeDropdown
                    disabled={isDisabled}
                    selectedSize={size}
                    onSelect={handleSizeSelect}
                  />
                )}
              </Space>
              {isDisabled && (
                <Typography>
                  В корзине уже максимальное кол-во - {bouquet.amountAvailable}
                </Typography>
              )}

              <div>
                <Button
                  className="mt-4"
                  onClick={() => handleAddToCartClick(bouquet)}
                  size="large"
                  type="primary"
                  disabled={isDisabled}
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
