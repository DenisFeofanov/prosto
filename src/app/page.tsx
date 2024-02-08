"use client";

import Gallery from "@/components/Gallery";
import { changeAmount, createOrder, fetchBouquets } from "@/lib/api";
import { dummyBouquets, dummyPickupOrder } from "@/shared/dummyData";

export default function Home() {
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

  // TODO remove dev mode
  const isDev = false;

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
          </div>
        </section>
      )}

      <Gallery bouquets={dummyBouquets} />
    </main>
  );
}
