"use client";

import BouquetModal from "@/components/BouquetModal";
import { Bouquet } from "@/interfaces/Bouquet";
import { changeAmount, createOrder, fetchBouquets } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCart, selectCart } from "@/lib/redux/cartSlice";
import { dummyPickupOrder } from "@/shared/dummyData";
import { useState } from "react";
import Card from "./Card";

interface Props {
  bouquets: Bouquet[];
}

export default function Home({ bouquets }: Props) {
  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null);
  const [bouquetIsOpened, setBouquetIsOpened] = useState(false);
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  function handleAddToCartClick(bouquet: Bouquet) {
    dispatch(
      addToCart({
        ...bouquet,
        amountOrdered: 1,
        note: "with Love",
      })
    );
  }

  async function handleFetchClick() {
    try {
      const flowers = await fetchBouquets();
      console.log("TODO: Fetch is successful: ", flowers);
    } catch (error) {
      console.log("TODO: display in UI:", error);
    }
  }

  async function handleCreateOrderClick() {
    try {
      const result = await createOrder(dummyPickupOrder);
      console.log("TODO: Create is successful: ", result);
    } catch (error) {
      console.log("TODO: display in UI:", error);
    }
  }

  async function handleChangeAmount() {
    try {
      const result = await changeAmount(10, "b2e45f0b1db848c0a745e5888bed52fb");
      console.log("TODO: Change amount is successful: ", result);
    } catch (error) {
      console.log("TODO: display in UI:", error);
    }
  }

  function openBouquet(bouquet: Bouquet) {
    setSelectedBouquet(bouquet);
    setBouquetIsOpened(true);
  }

  // TODO remove dev mode
  const isDev = true;

  return (
    <main>
      {isDev && (
        <section className="p-4 text-center">
          <h3 className="bold text-3xl">Test buttons</h3>
          <div className="flex gap-4 mb-4 justify-center border-b-1 border-black">
            <button type="button" onClick={handleFetchClick}>
              Fetch Bouquets
            </button>
            <button type="button" onClick={handleChangeAmount}>
              Change amount
            </button>
            <button type="button" onClick={handleCreateOrderClick}>
              Create Order
            </button>
            <button
              type="button"
              onClick={() => handleAddToCartClick(bouquets[0])}
            >
              Add to cart
            </button>
          </div>
        </section>
      )}
      <ul
        className={`p-10 grid justify-center items-start grid-cols-[repeat(1,minmax(0,18.75rem))] sm:grid-cols-[repeat(2,minmax(0,18.75rem))] md:grid-cols-[repeat(3,minmax(0,18.75rem))] lg:grid-cols-[repeat(4,minmax(0,18.75rem))] lg:p-20 gap-10`}
      >
        {bouquets.map(bouquet => (
          <li key={bouquet.id}>
            <Card
              bouquet={bouquet}
              key={bouquet.id}
              onCardClick={openBouquet}
              onAddToCartClick={handleAddToCartClick}
            />
          </li>
        ))}
      </ul>

      <BouquetModal
        bouquet={selectedBouquet}
        isOpen={bouquetIsOpened}
        closeModal={() => setBouquetIsOpened(false)}
      />
    </main>
  );
}
