import { ModalOptions } from "@/interfaces/Modal";
import { Bouquet, CartItem, Size } from "@/interfaces/Order";
import {
  AMOUNT,
  DESCRIPTION,
  HAS_SIZE,
  NAME,
  PHOTOS,
  PRICE,
} from "@/shared/bouquetsDatabaseProperties";
import { isFullPage } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { Modal } from "antd";
import { CartState } from "./redux/cartSlice";

/**
 * Parses the response from the API into an array of Bouquet objects
 */
export function parseBouquets(data: QueryDatabaseResponse): Bouquet[] {
  return data.results.map(flower => {
    if (
      isFullPage(flower) &&
      flower.properties[PRICE].type === "number" &&
      flower.properties[NAME].type === "title" &&
      flower.properties[AMOUNT].type === "number" &&
      flower.properties[DESCRIPTION].type === "rich_text" &&
      flower.properties[HAS_SIZE].type === "checkbox" &&
      flower.properties[PHOTOS].type === "files"
    ) {
      return {
        id: flower.id,
        price: flower.properties[PRICE].number as number,
        name: flower.properties[NAME].title[0].plain_text,
        description: flower.properties[DESCRIPTION].rich_text[0].plain_text,
        amountAvailable: flower.properties[AMOUNT].number as number,
        hasSize: flower.properties[HAS_SIZE].checkbox,
        photos: flower.properties[PHOTOS].files.map(file => {
          if (file.type === "external") {
            return file.external.url;
          }

          if (file.type === "file") {
            return file.file.url;
          }

          throw new Error(
            "Failed to parse photos. Check that the photos are in the correct format."
          );
        }),
      };
    } else {
      throw new Error(
        "Failed to parse data. Check that the data is in the correct format."
      );
    }
  });
}

export function convertOrderToString(orderedBouquets: CartItem[]): string {
  return orderedBouquets
    .reduce((acc, orderedBouquet) => {
      const size = orderedBouquet.size ? `размер ${orderedBouquet.size}, ` : "";
      const note = orderedBouquet.note
        ? `открытка "${orderedBouquet.note}", `
        : "";
      return `${acc}- ${orderedBouquet.data.name}, ${size}${note}цена ${orderedBouquet.data.price}р\n`;
    }, "")
    .trimEnd();
}

export function formatPrice(price: number): string {
  return `${price} руб.`;
}

export function calculateRemainingAmount(
  bouquet: Bouquet,
  cart: CartState
): number {
  if (bouquet === null) {
    return 0;
  }

  const sameIdBouquets = cart.bouquets.filter(
    orderedBouquet => orderedBouquet.data.id === bouquet.id
  );

  const alreadyOrderedAmount = sameIdBouquets.length;

  return bouquet.amountAvailable - alreadyOrderedAmount;
}

export function isSize(value: string): value is Size {
  return value === "S" || value === "M" || value === "L";
}

export function createModalShowFunc() {
  let modal: any = null;

  return (options: ModalOptions) => {
    if (modal !== null) {
      return;
    }

    modal = Modal.confirm({
      ...options,
      afterClose() {
        modal = null;
        if (options.afterClose === undefined) {
          return;
        }
        options.afterClose();
      },
    });
  };
}

export function calculateFullPrice(cart: CartState): number {
  return cart.bouquets.reduce((acc, { data }) => acc + data.price, 0);
}
