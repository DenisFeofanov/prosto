import { Bouquet } from "@/interfaces/Bouquet";
import { Order } from "@/interfaces/Order";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { parseBouquets } from "./utils";

export async function fetchBouquets(): Promise<Bouquet[]> {
  try {
    const response = await fetch("/api/notion/databases/query", {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }
    const { data }: { data: QueryDatabaseResponse } = await response.json();

    return parseBouquets(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createOrder(order: Order) {
  try {
    const response = await fetch("api/notion/pages", {
      headers: {
        contentType: "application/json",
        accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        order,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
