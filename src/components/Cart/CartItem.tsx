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
    dispatch(updateCartItem({ ...cartItem, size }));
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

  const chosenSizePhotos =
    bouquet[`photosSize${cartItem.size || DEFAULT_SIZE}`];
  let photos = cartItem.size !== undefined ? chosenSizePhotos : bouquet.photos;

  return (
    <>
      <ClearItemButton
        onClick={handleRemoveClick}
        className="ml-auto block mb-4 lg:hidden"
      />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,4fr)]">
        <Image
          className="rounded-md"
          src={photos[0]}
          alt="Превью букета"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          sizes="(max-width: 1024px) 400px, 150px"
        />

        <div className="flex flex-col justify-between gap-3">
          <div className="flex flex-col-reverse flex-wrap lg:justify-between lg:flex-row lg:gap-3">
            <div className="flex flex-col gap-3 items-start">
              <Typography.Title
                level={4}
                style={{
                  margin: 0,
                }}
              >
                {bouquet.name}
              </Typography.Title>

              {cartItem.size !== undefined && (
                <SizeDropdown
                  disabled={calculateRemainingAmount(bouquet, cart) <= 0}
                  selectedSize={cartItem.size}
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
