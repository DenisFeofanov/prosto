import CartItem from "@/components/Cart/CartItem";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearCart, selectCart, toggleCart } from "@/lib/redux/cartSlice";
import { Button, Divider, Modal, Typography } from "antd";
import { MouseEventHandler } from "react";
import ClearButton from "./ClearButton";

export default function CartModal() {
  const dispatch = useAppDispatch();
  const cartIsOpen = useAppSelector(state => state.cart.isOpen);
  const cart = useAppSelector(selectCart);

  const handleSubmit: MouseEventHandler<HTMLElement> = event => {
    console.log("TODO: create new order");
  };

  function handleToggleCart() {
    dispatch(toggleCart());
  }

  const handleClearCart = () => {
    dispatch(clearCart());
    handleToggleCart();
    Modal.destroyAll();
  };

  if (cartIsOpen && cart.bouquets.length <= 0) {
    handleToggleCart();
  }

  return (
    <Modal
      open={cartIsOpen}
      onOk={handleToggleCart}
      onCancel={handleToggleCart}
      className="max-w-[30rem] lg:max-w-[50rem]"
      footer={null}
      style={{
        top: "2rem",
      }}
    >
      <div className="flex justify-between items-center flex-wrap gap-2 mt-8 lg:mt-0">
        <Typography.Title className="mb-2" level={2}>
          Корзина
        </Typography.Title>

        <ClearButton className="lg:hidden" onClick={handleClearCart} />
      </div>

      <Divider />
      <ul className="flex flex-col items-start gap-10">
        {cart.bouquets.map(cartItem => {
          return (
            <li key={cartItem.cartId}>
              <CartItem cartItem={cartItem} />
            </li>
          );
        })}
      </ul>
      <Divider />

      <div className="flex justify-between flex-wrap gap-6">
        <ClearButton
          className="hidden lg:inline-block"
          onClick={handleClearCart}
        />

        <Button
          className="bg-[#00aa00] hover:bg-[#00c800] block w-full lg:inline-block lg:w-auto"
          type="primary"
          onClick={handleSubmit}
          size="middle"
        >
          Оформить заказ
        </Button>
      </div>
    </Modal>
  );
}
