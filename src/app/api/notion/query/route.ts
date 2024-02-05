import { AMOUNT, DESCRIPTION, NAME, PRICE } from "@/shared/databaseProperties";
import { Client, ClientErrorCode, isNotionClientError } from "@notionhq/client";
import { NOTION_DATABASE_ID, NOTION_TOKEN } from "@/shared/envVariables";
import { formatApiError } from "@/lib/utils";

// Initialize Notion client
const notionClient = new Client({
  auth: NOTION_TOKEN,
});

/**
 * Handles the POST request to query the Notion database
 */
export async function POST(): Promise<Response> {
  const databaseId = NOTION_DATABASE_ID;

  if (!databaseId) {
    return Response.json(
      {
        error: {
          message: "Missing environment variable NOTION_DATABASE_ID",
        },
      },
      {
        status: 500,
        statusText: "An error occurred while querying the Notion database",
      }
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
        ],
      },
    });

    return Response.json({ data });
  } catch (error) {
    console.error(error);
    if (isNotionClientError(error)) {
      if (error.code === ClientErrorCode.RequestTimeout) {
        return formatApiError(
          error,
          408,
          "Request timed out while querying the Notion database"
        );
      }
      return formatApiError(
        error,
        500,
        "An error occurred while querying the Notion database"
      );
    }
    return formatApiError(
      error,
      500,
      "An unknown error occurred while querying the Notion database"
    );
  }
}
