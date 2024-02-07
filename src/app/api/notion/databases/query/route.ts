import { handleNotionApiError } from "@/lib/api";
import {
  AMOUNT,
  DESCRIPTION,
  NAME,
  PHOTOS,
  PRICE,
} from "@/shared/bouquetsDatabaseProperties";
import { NOTION_STOCK_DATABASE_ID, NOTION_TOKEN } from "@/shared/envVariables";
import { Client } from "@notionhq/client";

// Initialize Notion client
const notionClient = new Client({
  auth: NOTION_TOKEN,
});

/**
 * Handles the POST request to query the Notion database
 */
export async function POST(): Promise<Response> {
  const databaseId = NOTION_STOCK_DATABASE_ID;

  if (!databaseId) {
    return new Response(
      "Missing environment variable NOTION_STOCK_DATABASE_ID",
      { status: 500 }
    );
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
              is_not_empty: true,
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

    return Response.json(data);
  } catch (error: unknown) {
    return handleNotionApiError(error);
  }
}
