import { AMOUNT, DESCRIPTION, NAME, PRICE } from "@/shared/databaseProperties";
import { Client, ClientErrorCode, isNotionClientError } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function POST() {
  const databaseId = process.env.NOTION_DATABASE_ID;

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
    const data = await notion.databases.query({
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
    // type guarding
    if (isNotionClientError(error)) {
      if (error.code === ClientErrorCode.RequestTimeout) {
        return Response.json(
          { error },
          {
            status: 408,
            statusText: "Request timed out while querying the Notion database",
          }
        );
      }
      return Response.json(
        { error },
        {
          status: error.status,
          statusText: "An error occurred while querying the Notion database",
        }
      );
    }
    return Response.json(
      { error },
      {
        status: 500,
        statusText:
          "An unknown error occurred while querying the Notion database",
      }
    );
  }
}
