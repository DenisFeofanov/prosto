import { Bouquet } from "@/interfaces/Bouquet";
import { AMOUNT, DESCRIPTION, NAME, PRICE } from "@/shared/databaseProperties";
import { isFullPage } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export async function fetchDatabase(): Promise<Bouquet[]> {
  try {
    const response = await fetch("/api/notion/query", {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }
    const { data }: { data: QueryDatabaseResponse } = await response.json();

    const parsedData = data.results.map(flower => {
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

    return parsedData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
