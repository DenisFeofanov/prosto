import { Size } from "@/interfaces/Bouquet";
import { CartItem } from "@/interfaces/Order";
import useDebouncedFunction, {
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import { selectCart, updateCartItem } from "@/lib/redux/cartSlice";
import { calculateRemainingAmount, formatPrice } from "@/lib/utils";
import { DEFAULT_SIZE } from "@/shared/constants";
import { Typography } from "antd";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import NoteInput from "./NoteInput";
import SizeDropdown from "./SizeDropdown";

interface Props {
  cartItem: CartItem;
}

export default function CartItem({ cartItem }: Props) {
  const [note, setNote] = useState<string>("");
  const [size, setSize] = useState<Size>(DEFAULT_SIZE);
  const dispatch = useAppDispatch();
  const debouncedDispatch = useDebouncedFunction(dispatch, 1000);
  const cart = useAppSelector(selectCart);

  function handleNoteChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newNote = event.target.value;
    setNote(newNote);
    debouncedDispatch(updateCartItem({ ...cartItem, note }));
  }

  function handleSizeSelect(size: Size) {
    setSize(size);
    debouncedDispatch(updateCartItem({ ...cartItem, size }));
  }

  const bouquet = cartItem.data;
  return (
    <div className="flex gap-8 items-center">
      <Image
        className="rounded-md"
        src={bouquet.photos[0]}
        width={100}
        height={80}
        alt="Превью букета"
      />

      <Typography.Title
        level={4}
        style={{
          margin: 0,
        }}
      >
        {bouquet.name}
      </Typography.Title>

      <Typography.Text>{formatPrice(bouquet.price)}</Typography.Text>

      {bouquet.hasSize && (
        <SizeDropdown
          disabled={calculateRemainingAmount(bouquet, cart) <= 0}
          selectedSize={size}
          onSelect={handleSizeSelect}
        />
      )}

      <NoteInput note={note} onChange={handleNoteChange} />
    </div>
  );
}
