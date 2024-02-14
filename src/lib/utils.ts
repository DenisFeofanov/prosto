import { Bouquet } from "@/interfaces/Bouquet";
import { OrderedBouquet } from "@/interfaces/Order";
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

export function convertOrderToString(order: OrderedBouquet[]): string {
  return order
    .reduce((acc, order) => {
      const size = order.size ? `размер ${order.size}, ` : "";
      const note = order.note ? `открытка "${order.note}"` : "";
      return `${acc}- ${order.data.name}, ${order.amountOrdered} шт., ${size}цена ${order.data.price}р, ${note}\n`;
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
