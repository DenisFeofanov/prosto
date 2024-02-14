import { CartItem } from "@/interfaces/Order";
import useDebouncedFunction, { useAppDispatch } from "@/lib/hooks";
import { updateCartItem } from "@/lib/redux/cartSlice";
import { formatPrice } from "@/lib/utils";
import { Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

interface Props {
  cartItem: CartItem;
}

export default function CartItem({ cartItem }: Props) {
  const [note, setNote] = useState<string>("");
  const dispatch = useAppDispatch();
  const debouncedDispatch = useDebouncedFunction(dispatch, 1000);

  function handleNoteChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newNote = event.target.value;
    setNote(newNote);
    debouncedDispatch(updateCartItem({ ...cartItem, note }));
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

      <Typography.Text>Размер {cartItem.size}</Typography.Text>

      <TextArea
        value={note}
        onChange={handleNoteChange}
        placeholder="Открытка к букету"
        autoSize={{ minRows: 3, maxRows: 10 }}
      />
    </div>
  );
}
