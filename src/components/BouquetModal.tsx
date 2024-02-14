import { Bouquet, Size } from "@/interfaces/Bouquet";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCart, selectCart } from "@/lib/redux/cartSlice";
import { calculateRemainingAmount, formatPrice } from "@/lib/utils";
import { BUTTON_SIZE, DEFAULT_SIZE } from "@/shared/constants";
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
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [size, setSize] = useState<Size>(DEFAULT_SIZE);
  const [amountOrdered, setAmountOrdered] = useState(1);
  const [note, setNote] = useState("");
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
    setSize(DEFAULT_SIZE);
    setNote("");
    dispatch(
      addToCart({
        data: bouquet,
        amountOrdered,
        size,
        note,
      })
    );
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

  const remainingAmount = calculateRemainingAmount(bouquet, cart);
  const isDisabled = remainingAmount === 0;

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
      <div className="pt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:pt-0 lg:gap-16">
        <BouquetCarousel photos={bouquet.photos} />

        <div className="mt-4 lg:m-0">
          <Typography.Title level={2}>{bouquet.name}</Typography.Title>
          <p className="text-gray-600 mb-4 text-base">{bouquet.description}</p>
          <p className="text-lg font-bold mb-4">{formatPrice(bouquet.price)}</p>

          <Space direction="vertical" className="w-full">
            <Space>
              <InputNumber
                min={1}
                max={remainingAmount || 1}
                keyboard={true}
                value={amountOrdered}
                onChange={handleChangeAmount}
                size={BUTTON_SIZE}
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

            <NoteInput note={note} onChange={handleNoteChange} />
          </Space>

          <div>
            <Button
              className="mt-4"
              onClick={() => handleAddToCartClick(bouquet)}
              size={BUTTON_SIZE}
              type="primary"
              disabled={isDisabled}
            >
              Купить
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
