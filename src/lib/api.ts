import { Bouquet } from "@/interfaces/Bouquet";
import { Order } from "@/interfaces/Order";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { parseBouquets } from "./utils";
import { isNotionClientError, ClientErrorCode } from "@notionhq/client";

export async function fetchBouquets(): Promise<Bouquet[]> {
  try {
    const response = await fetch("/api/notion/databases/query", {
      cache: "no-store",
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${await response.text()}`
      );
    }
    const data: QueryDatabaseResponse = await response.json();

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
    throw error;
  }
}

export async function changeAmount(amount: number, id: string) {
  try {
    const response = await fetch("api/notion/pages", {
      headers: {
        contentType: "application/json",
        accept: "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        amount,
        id,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const data = response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function handleNotionApiError(error: unknown) {
  console.error(error);
  if (isNotionClientError(error)) {
    if (error.code === ClientErrorCode.RequestTimeout) {
      return new Response(error.message, {
        status: 408,
      });
    }

    return new Response(error.message, {
      status: error.status,
    });
  }
  return new Response(
    "An unknown error occurred while querying the Notion database",
    {
      status: 500,
    }
  );
}
