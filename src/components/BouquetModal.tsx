import { Bouquet, Size } from "@/interfaces/Order";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCart, selectCart, toggleCart } from "@/lib/redux/cartSlice";
import { calculateRemainingAmount, formatPrice } from "@/lib/utils";
import { DEFAULT_SIZE } from "@/shared/constants";
import { Button, InputNumber, Modal, Space, Typography } from "antd";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import BouquetCarousel from "./BouquetCarousel";
import NoteInput from "./NoteInput";
import SizeDropdown from "./SizeDropdown";

interface Props {
  bouquet: Bouquet | null;
  isOpen: boolean;
  closeModal: () => void;
}

export default function BouquetModal({ bouquet, isOpen, closeModal }: Props) {
  const [size, setSize] = useState<Size>(DEFAULT_SIZE);
  const [amountOrdered, setAmountOrdered] = useState(1);
  const [note, setNote] = useState("");
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  function handleAddToCartClick(bouquet: Bouquet) {
    const orderedBouquets = Array.from({ length: amountOrdered }, () => ({
      data: bouquet,
      note,
      ...(bouquet.hasSize ? { size } : {}),
    }));

    setAmountOrdered(1);
    setSize(DEFAULT_SIZE);
    setNote("");

    dispatch(addToCart(orderedBouquets));
    closeModal();
    dispatch(toggleCart());
  }

  function handleChangeAmount(value: number | null) {
    if (value !== null) {
      setAmountOrdered(value);
    }
  }

  function handleNoteChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newNote = event.target.value;
    setNote(newNote);
  }

  if (bouquet === null) return;

  const chosenSizePhotos = bouquet[`photosSize${size}`];
  const remainingAmount = calculateRemainingAmount(bouquet, cart);
  const isDisabled = remainingAmount <= 0;
  let photos = bouquet.hasSize ? chosenSizePhotos : bouquet.photos;

  return (
    <Modal
      open={isOpen}
      onOk={closeModal}
      onCancel={closeModal}
      className="w-auto max-w-[30rem] lg:max-w-[80vw] lg:min-w-[60rem]"
      footer={null}
      style={{
        top: "2rem",
      }}
    >
      <div className="pt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:pt-0 lg:gap-16">
        <BouquetCarousel photos={photos} />

        <div className="mt-4 lg:m-0">
          <Typography.Title level={2}>{bouquet.name}</Typography.Title>
          <p className="text-gray-600 mb-4 text-base">{bouquet.description}</p>
          <p className="text-lg font-bold">{formatPrice(bouquet.price)}</p>

          <div className="w-full mt-4">
            <Space>
              <InputNumber
                min={1}
                max={remainingAmount || 1}
                keyboard={true}
                value={amountOrdered}
                onChange={handleChangeAmount}
                size="middle"
                disabled={isDisabled}
              />

              {bouquet.hasSize && (
                <SizeDropdown
                  disabled={isDisabled}
                  selectedSize={size}
                  onSelect={setSize}
                />
              )}
            </Space>

            {isDisabled && (
              <Typography>
                В корзине уже максимальное кол-во - {bouquet.amountAvailable}
              </Typography>
            )}

            <div className="mt-4">
              <NoteInput note={note} onChange={handleNoteChange} />
            </div>
          </div>

          <Button
            className="mt-4"
            onClick={() => handleAddToCartClick(bouquet)}
            size="middle"
            type="primary"
            disabled={isDisabled}
          >
            Купить
          </Button>
        </div>
      </div>
    </Modal>
  );
}
