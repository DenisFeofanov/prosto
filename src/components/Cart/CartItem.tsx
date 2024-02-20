import { CartItem, Size } from "@/interfaces/Order";
import useDebouncedFunction, {
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import {
  removeCartItem,
  selectCart,
  updateCartItem,
} from "@/lib/redux/cartSlice";
import {
  calculateRemainingAmount,
  createModalShowFunc,
  formatPrice,
} from "@/lib/utils";
import { DEFAULT_SIZE, IMAGE_HEIGHT, IMAGE_WIDTH } from "@/shared/constants";
import { Typography } from "antd";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useState } from "react";
import NoteInput from "../NoteInput";
import SizeDropdown from "../SizeDropdown";
import ClearItemButton from "./ClearItemButton";

interface Props {
  cartItem: CartItem;
}

export default function CartItem({ cartItem }: Props) {
  const [note, setNote] = useState<string>(cartItem.note || "");
  const [size, setSize] = useState<Size>(DEFAULT_SIZE);
  const dispatch = useAppDispatch();
  const debouncedDispatch = useDebouncedFunction(dispatch, 1000);
  const cart = useAppSelector(selectCart);
  const showModal = createModalShowFunc();

  function handleNoteChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newNote = event.target.value;
    setNote(newNote);
    debouncedDispatch(updateCartItem({ ...cartItem, note: newNote }));
  }

  function handleSizeSelect(size: Size) {
    setSize(size);
    debouncedDispatch(updateCartItem({ ...cartItem, size }));
  }

  const bouquet = cartItem.data;

  function handleRemoveClick(event: MouseEvent<HTMLElement>): void {
    showModal({
      maskClosable: true,
      title: "Удалить товар из корзины?",
      okText: "Да",
      cancelText: "Нет",
      onOk() {
        dispatch(removeCartItem(cartItem));
      },
    });
  }

  return (
    <>
      <ClearItemButton
        onClick={handleRemoveClick}
        className="ml-auto block mb-2 lg:hidden"
      />

      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,4fr)]">
        <Image
          className="rounded-md"
          src={bouquet.photos[0]}
          alt="Превью букета"
          // not wider than 500px
          sizes="400px"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
        />

        <div className="flex flex-col justify-between gap-3">
          <div className="flex flex-col-reverse flex-wrap lg:justify-between lg:flex-row lg:gap-3">
            <div>
              <Typography.Title
                level={4}
                style={{
                  margin: 0,
                }}
              >
                {bouquet.name}
              </Typography.Title>

              {bouquet.hasSize && (
                <SizeDropdown
                  disabled={calculateRemainingAmount(bouquet, cart) <= 0}
                  selectedSize={size}
                  onSelect={handleSizeSelect}
                />
              )}

              <Typography.Text className="block">
                {formatPrice(bouquet.price)}
              </Typography.Text>
            </div>

            <ClearItemButton
              onClick={handleRemoveClick}
              className="hidden lg:inline-block"
            />
          </div>

          <NoteInput note={note} onChange={handleNoteChange} />
        </div>
      </div>
    </>
  );
}
