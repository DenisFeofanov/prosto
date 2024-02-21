import { Bouquet } from "@/interfaces/Order";
import { Order } from "@/interfaces/Order";
import {
  AMOUNT,
  DESCRIPTION,
  NAME,
  PHOTOS,
  PRICE,
} from "@/shared/bouquetsDatabaseProperties";
import { NOTION_STOCK_DATABASE_ID, NOTION_TOKEN } from "@/shared/envVariables";
import { Client, ClientErrorCode, isNotionClientError } from "@notionhq/client";
import { parseBouquets } from "./utils";

// Initialize Notion client
const notionClient = new Client({
  auth: NOTION_TOKEN,
});

export async function fetchBouquets(): Promise<Bouquet[]> {
  const databaseId = NOTION_STOCK_DATABASE_ID;

  if (!databaseId) {
    throw new Error("Missing environment variable NOTION_STOCK_DATABASE_ID");
  }

  try {
    const data = await notionClient.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: NAME,
          direction: "ascending",
        },
      ],
      filter: {
        and: [
          {
            property: NAME,
            title: {
              is_not_empty: true,
            },
          },
          {
            property: AMOUNT,
            number: {
              greater_than: 0,
            },
          },
          {
            property: DESCRIPTION,
            rich_text: {
              is_not_empty: true,
            },
          },
          {
            property: PRICE,
            number: {
              greater_than: 0,
            },
          },
          {
            property: PHOTOS,
            files: {
              is_not_empty: true,
            },
          },
        ],
      },
    });

    return parseBouquets(data);
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      if (error.code === ClientErrorCode.RequestTimeout) {
        throw new Error(`408: ${error.message}`);
      }

      throw new Error(`${error.status} ${error.message}`);
    }

    console.error(error);
    throw new Error(
      "An unknown error occurred while querying the Notion database"
    );
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
