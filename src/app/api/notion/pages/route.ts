import { NOTION_ORDERS_DATABASE_ID, NOTION_TOKEN } from "@/shared/envVariables";
import {
  ADDRESS,
  CLIENT_NAME,
  CLIENT_PHONE,
  DELIVERY_TIME,
  DELIVERY_TIME_OPTIONS,
  NOTE,
  PICKUP_TIME,
  RECIPIENT_NAME,
  RECIPIENT_PHONE,
} from "@/shared/ordersDatabaseProperties";
import { Client } from "@notionhq/client";

const notionClient = new Client({
  auth: NOTION_TOKEN,
});

export async function POST() {
  const databaseId = NOTION_ORDERS_DATABASE_ID;

  if (!databaseId) {
    return Response.json(
      {
        error: {
          message: "Missing environment variable NOTION_ORDERS_DATABASE_ID",
        },
      },
      {
        status: 500,
        statusText: "An error occurred while querying the Notion database",
      }
    );
  }

  try {
    const response = await notionClient.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        [CLIENT_NAME]: {
          title: [
            {
              text: {
                content: "Prosto",
              },
            },
          ],
        },
        [CLIENT_PHONE]: {
          phone_number: "1234567890",
        },
        [PICKUP_TIME]: {
          date: {
            start: "2022-01-01T12:00:00Z",
          },
        },
        [RECIPIENT_NAME]: {
          rich_text: [
            {
              text: {
                content: "Recipient",
              },
            },
          ],
        },
        [RECIPIENT_PHONE]: {
          phone_number: "1234567890",
        },
        [ADDRESS]: {
          rich_text: [
            {
              text: {
                content: "123 Main St",
              },
            },
          ],
        },
        [DELIVERY_TIME]: {
          select: {
            name: DELIVERY_TIME_OPTIONS[3],
          },
        },
        [NOTE]: {
          rich_text: [
            {
              text: {
                content: "Note",
              },
            },
          ],
        },
      },
    });

    return Response.json(response);
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }
}
