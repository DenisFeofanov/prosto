"use client";

import BouquetModal from "@/components/BouquetModal";
import { Bouquet } from "@/interfaces/Order";
import { useState } from "react";
import Card from "./Card";
import ShopFooter from "./Footer";

interface Props {
  bouquets: Bouquet[];
}

export default function Home({ bouquets }: Props) {
  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null);
  const [bouquetIsOpened, setBouquetIsOpened] = useState(false);

  function openBouquet(bouquet: Bouquet) {
    setSelectedBouquet(bouquet);
    setBouquetIsOpened(true);
  }

  return (
    <>
      <main className="px-10 pt-10 lg:px-20 lg:pt-20">
        <ul
          className={`grid justify-center items-start grid-cols-[repeat(1,minmax(0,18.75rem))] sm:grid-cols-[repeat(2,minmax(0,18.75rem))] md:grid-cols-[repeat(3,minmax(0,18.75rem))] lg:grid-cols-[repeat(4,minmax(0,18.75rem))] gap-10`}
        >
          {bouquets.map(bouquet => (
            <li key={bouquet.id}>
              <Card
                bouquet={bouquet}
                key={bouquet.id}
                onCardClick={openBouquet}
              />
            </li>
          ))}
        </ul>

        <BouquetModal
          key={selectedBouquet?.id}
          bouquet={selectedBouquet}
          isOpen={bouquetIsOpened}
          closeModal={() => setBouquetIsOpened(false)}
        />
      </main>

      <section className="mt-40 px-10 py-20 lg:p-40 bg-[#f5f5f5]">
        <div className="mx-auto max-w-[40rem] text-center">
          <h3 className="font-bold uppercase">Доставка</h3>
          <p className="mt-10">
            Вы можете самостоятельно забрать букет из магазина или заказать
            доставку курьером по Нижнему Тагилу и Свердловской области
          </p>
        </div>
      </section>

      <ShopFooter />
    </>
  );
}
