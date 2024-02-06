import { Bouquet } from "@/interfaces/Bouquet";
import { OrderedItem } from "@/interfaces/Order";
import {
  AMOUNT,
  DESCRIPTION,
  NAME,
  PRICE,
} from "@/shared/bouquetsDatabaseProperties";
import { isFullPage } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

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
      flower.properties[DESCRIPTION].type === "rich_text"
    ) {
      return {
        id: flower.id,
        price: flower.properties[PRICE].number as number,
        name: flower.properties[NAME].title[0].plain_text,
        description: flower.properties[DESCRIPTION].rich_text[0].plain_text,
        amount: flower.properties[AMOUNT].number as number,
      };
    } else {
      throw new Error(
        "Failed to parse data. Check that the data is in the correct format."
      );
    }
  });
}

export function formatApiError(
  error: any,
  code: number,
  message: string
): Response {
  return Response.json(
    { error },
    {
      status: code,
      statusText: message,
    }
  );
}

export function convertOrderToString(order: OrderedItem[]): string {
  return order
    .reduce((acc, order) => {
      const size = order.size ? `размер ${order.size}, ` : "";
      return `${acc}- ${order.bouquet}, ${order.amount} шт., ${size}цена ${order.price}р, открытка "${order.note}"\n`;
    }, "")
    .trimEnd();
}
